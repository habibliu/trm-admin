<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="课程名称">
          <el-input v-model="filters.courseName" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getRules">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="rules" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称 " width="180" sortable>
      </el-table-column>
      <el-table-column prop="periods" label="报名期数" width="120"  sortable>
      </el-table-column>
      <el-table-column prop="freeSections" label="赠送节数" width="120" sortable>
      </el-table-column>
      <el-table-column prop="memo" label="备注" width="200" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="editForm.courseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="报名期数">
          <el-input-number  v-model="editForm.periods"></el-input-number>
        </el-form-item>
        <el-form-item label="赠送节数">
          <el-input-number v-model="editForm.freeSections"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.memo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="addForm.courseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="报名期数">
          <el-input-number v-model="addForm.periods"></el-input-number>
        </el-form-item>
        <el-form-item label="赠送节数">
          <el-input-number v-model="addForm.freeSections" ></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="addForm.memo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../../common/js/util'
  //import NProgress from 'nprogress'
  import { getRuleListPage, removeRule, batchRemoveRule, editRule, addRule } from './api';

  export default {
    data() {
      return {
        filters: {
          courseName: '',
        },
        rules: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          courseName: '',
          periods: -1,
          freeSections: 0,
          memo: '',
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          courseName: '',
          periods: -1,
          freeSections: 0,
          memo: '',
        }

      }
    },
    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getRules();
      },
      //获取家长列表
      getRules() {
        let para = {
          page: this.page,
          courseName: this.filters.courseName,
        };
        this.listLoading = true;
        getRuleListPage(para).then((res) => {
          debugger;
          if( res && res.data){
            this.total = res.data.total;
            this.rules = res.data.rules;
          
          }
          this.listLoading = false;
        }).catch((error) => {
          this.listLoading = false;
          console.log(error);
        });
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeRule(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getRules();
          });
        }).catch(() => {
          this.listLoading = false;
        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          telphone: 0,
          birth: '',
          addr: ''
        };
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editRule(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getRules();
              });
            });
          }
        });
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addRule(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getRules();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveRule(para).then((res) => {
            
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getRules();
            this.listLoading = false;
          });
        }).catch(() => {
          this.listLoading = false;
        });
      }
    },
    mounted() {//默认页面加截方法
      this.getRules();
    }
  }

</script>

<style scoped>

</style>