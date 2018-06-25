<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="课程名称">
          <el-input v-model="filters.name" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="filters.level" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="幼儿班" value="1"></el-option>
            <el-option label="基础班" value="2"></el-option>
            <el-option label="提高班" value="3"></el-option>
            <el-option label="精英班" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="filters.phase" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="第一阶段" value="1"></el-option>
            <el-option label="第二阶段" value="2"></el-option>
            <el-option label="第三阶段" value="3"></el-option>
            <el-option label="第四阶段" value="4"></el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" v-on:click="getCourses">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="courses" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="课程名称" width="140" sortable>
      </el-table-column>
      <el-table-column prop="level" label="级别" width="120" :formatter="formatLevel" sortable>
      </el-table-column>
      <el-table-column prop="phase" label="阶段" width="120" :formatter="formatPhase" sortable>
      </el-table-column>
      <el-table-column prop="ageSection" label="适合年龄段" width="140" :formatter="formatAgeSection" >
      </el-table-column>
      <el-table-column prop="numberPerTerm" label="每期节数" width="120" sortable>
      </el-table-column>
      <el-table-column prop="pricePerTerm" label="每期定价" min-width="120" sortable>
      </el-table-column>
      <el-table-column prop="memo" label="备注" min-width="180" sortable>
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
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="editForm.level" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="幼儿班" value="1"></el-option>
            <el-option label="基础班" value="2"></el-option>
            <el-option label="提高班" value="3"></el-option>
            <el-option label="精英班" value="4"></el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="阶段">
          <el-select v-model="editForm.phase" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="第一阶段" value="1"></el-option>
            <el-option label="第二阶段" value="2"></el-option>
            <el-option label="第三阶段" value="3"></el-option>
            <el-option label="第四阶段" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适合年龄">
          <el-input-number v-model="editForm.ageGradeStart" size="small"></el-input-number>至
          <el-input-number v-model="editForm.ageGradeEnd" size="small"></el-input-number>岁
        </el-form-item>
        <el-form-item label="每期节数">
          <el-input v-model="editForm.numberPerTerm"></el-input>
        </el-form-item>
         <el-form-item label="每期定价">
          <el-input v-model="editForm.pricePerTerm"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.memo" rows="4"></el-input>
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
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="级别">
          <el-select v-model="addForm.level" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="幼儿班" value="1"></el-option>
            <el-option label="基础班" value="2"></el-option>
            <el-option label="提高班" value="3"></el-option>
            <el-option label="精英班" value="4"></el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="阶段">
          <el-select v-model="addForm.phase" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="第一阶段" value="1"></el-option>
            <el-option label="第二阶段" value="2"></el-option>
            <el-option label="第三阶段" value="3"></el-option>
            <el-option label="第四阶段" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适合年龄">
          <el-input-number v-model="addForm.ageGradeStart" size="small"></el-input-number>至
          <el-input-number v-model="addForm.ageGradeEnd" size="small"></el-input-number>岁
        </el-form-item>
        <el-form-item label="每期节数">
          <el-input   v-model="addForm.numberPerTerm"></el-input>
        </el-form-item>
         <el-form-item label="每期定价">
          <el-input v-model="addForm.pricePerTerm"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="addForm.memo" rows="4"></el-input>
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
  //import NProgress from 'nprogress'
  import { getCourseListPage, removeCourse, batchRemoveCourse, editCourse, addCourse } from './api';

  export default {
    data() {
      return {
        filters: {
          name: '',
          level: '',
          phase: ''
        },
        courses: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        levels:[{id:'1',label:'幼儿班'},{id:'2',label:'基础班'},{id:'3',label:'提高班'},{id:'4',label:'精英班'}],
        phases:[{id:'1',label:'第一阶段'},{id:'2',label:'第二阶段'},{id:'3',label:'第三阶段'},{id:'4',label:'第四阶段'}],
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: '',
          name: '',
          level: '',
          phase: '',
          numberPerTerm: '',
          pricePerTerm: '',
          ageGradeStart: '',
          ageGradeEnd: '',
          memo: '',
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          level: '',
          phase: '',
          numberPerTerm: '',
          pricePerTerm: '',
          ageGradeStart: '',
          ageGradeEnd: '',
          memo: '',
        }

      }
    },
    methods: {
      //级别显示转换
      formatLevel: function (row, column) {
        for(var i=0;i<4;i++){
          if(this.levels[i].id==row.level){
            return this.levels[i].label;
          }
        }
        return row.level;
      },
      formatPhase: function (row, column){
        for(var i=0;i<4;i++){
          if(this.phases[i].id==row.phase){
            return this.phases[i].label;
          }
        }
        return row.phase;
      },
      formatAgeSection: function (row, column){
        return row['ageGradeStart']+' - ' + row['ageGradeEnd'];
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getCourses();
      },
      //获取家长列表
      getCourses() {
        let para = {
          page: this.page,
          name: this.filters.name,
          sex: this.filters.sex,
          telphone: this.filters.telphone
        };
        this.listLoading = true;
        getCourseListPage(para).then((res) => {
          if( res && res.data){
            this.total = res.data.total;
            this.courses = res.data.rows;
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
          removeCourse(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getCourses();
          });
        }).catch(() => {
          this.listLoading = false;
        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        debugger;
        //this.editForm.ageGradeStart=row.level.ageGradeStart;
        //this.editForm.ageGradeEnd=row.level.ageGradeEnd;
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          id:'',
          name: '',
          level: 0,
          phase: 0,
          numberPerTerm: '',
          pricePerTerm: '',
          ageGradeStart: '',
          ageGradeEnd: '',
          memo: '',
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
              editCourse(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getCourses();
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
              addCourse(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getCourses();
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
          batchRemoveCourse(para).then((res) => {
            
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getCourses();
            this.listLoading = false;
          });
        }).catch(() => {
          this.listLoading = false;
        });
      }
    },
    mounted() {//默认页面加截方法
      this.getCourses();
    }
  }

</script>

<style scoped>

</style>