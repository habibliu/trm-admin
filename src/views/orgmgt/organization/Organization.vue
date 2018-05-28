<template>
  <el-row :gutter="20" v-loading="loading">
    <el-col :span="8" >
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        ref="tree2">
      </el-tree>
    </el-col>
   
    <el-col :span="16">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
        
          <el-form-item>
            <el-button type="primary" @click="handleAdd" :disabled="addFormVisible" icon="el-icon-plus">新增</el-button>
          </el-form-item>
         
        </el-form>
      </el-col>
      
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm"  class="demo-ruleForm" v-show="editFormVisible">
        <el-form-item label="上级单位 ">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="组织名称 " prop="name" required="true" >
          <el-input  v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="组织编号"  prop="code" required="true">
          <el-input  :disabled="true" v-model="editForm.code"></el-input>
        </el-form-item>
        <el-form-item label="组织类型"  prop="type" required="true" >
          <el-radio-group v-model="editForm.type">
            <el-radio class="radio" :label="0">集团公司</el-radio>
            <el-radio class="radio" :label="1">区域公司</el-radio>
            <el-radio class="radio" :label="2">分公司</el-radio>
            <el-radio class="radio" :label="3">管理处</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input   v-model="editForm.director"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input  v-model="editForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>

        <el-form-item >
          <el-button @click="cancelEdit">取消</el-button>
          <el-button type="primary" >提交</el-button>
          <el-button type="danger" @click="handleRemove">删除</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="addForm" label-width="80px" :rules="addFormVisible" ref="addForm"  class="demo-ruleForm" v-show="addFormVisible">
        <el-form-item label="上级单位 ">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="组织名称 " prop="name" required="true" placeholder="请输入组织名称[区域公司|分公司|管理处]">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织编号"  prop="code" required="true">
          <el-input  :disabled="formEditing" placeholder="请输入组织编号"></el-input>
        </el-form-item>
        <el-form-item label="组织类型"  prop="type" required="true">
          <el-radio-group v-model="addForm.type">
            <el-radio class="radio" :label="0">集团公司</el-radio>
            <el-radio class="radio" :label="1">区域公司</el-radio>
            <el-radio class="radio" :label="2">分公司</el-radio>
            <el-radio class="radio" :label="3">管理处</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input  ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input  ></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" ></el-input>
        </el-form-item>

        <el-form-item >
          <el-button @click="cancelAdd">取消</el-button>
          <el-button type="primary" >提交</el-button>
        </el-form-item>
      </el-form>

     
    </el-col>

  </el-row>

</template>

<script>
  
  import { getTreeData, removeOrganization, editOrganization, addOrganization } from './api';
  //import  jp from 'jsonpath';
  var jp = require('JSONPath');
  export default {
   
     watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleAdd(){
        this.editFormVisible=false;
        this.addFormVisible=true;
      },
      cancelAdd(){//取消新增
        this.editFormVisible=true;
        this.addFormVisible=false;
      },
      cancelEdit(){//取消编辑，恢复数据

      },
      handleNodeClick(data){
       
        var parentNode=jp(this.treeData,'$..code[?(@.code==data.code)]');
        this.selectedNode=data;
        console.log(this.selectedNode);
        this.editForm.id=this.selectedNode.id;
        this.editForm.code=this.selectedNode.code;
        this.editForm.name=this.selectedNode.label;
        this.editForm.type=this.selectedNode.type;
        this.editForm.director=this.selectedNode.director;
        this.editForm.telephone=this.selectedNode.telephone;
        this.editForm.addr=this.selectedNode.addr;
        this.editFormVisible=true;
        this.addFormVisible=false;
      },
      initTreeData(){
        let para = {};
        this.loading = true;

        getTreeData(para).then((res) => {
          if( res && res.data){
            this.treeData = res.data.treeData;
          
          }
          this.loading = false;
        }).catch((error) => {
          this.loading = false;
          console.log(error);
        });
      }
    },

    data() {
      return {
        filterText: '',
        treeData: [],
        selectedNode:null,//选中的组织架构节点
        loading: false,
        formEditing : false,
        editFormVisible: true,//编辑界面是否显示
        editFormRules: {
          name: [
            { required: true, message: '请输入组织名称。', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          code:'',
          name: '',
          type:'0',
          director: '',
          telephone: '',
          addr: ''
        },
        addFormVisible: false,//新增界面是否显示
        addForm: {
          id: 0,
          code:'',
          name: '',
          type:'1',
          director: '',
          telephone: '',
          addr: ''
        },
        addFormRules: {
          name: [
            { required: true, message: '请输入组织名称。', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入组织编号。', trigger: 'blur' }
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    mounted() {//默认页面加截方法
      this.initTreeData();
    }
 
  };
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

