<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="学生名称">
          <el-input v-model="filters.studentName" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="filters.courseName" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getShifts">查询</el-button>
        </el-form-item>
       
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="shifts" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="trainDate" label="训练日期" width="120" :formatter="formatTrainDate" sortable>
      </el-table-column>
      <el-table-column prop="trainTime" label="训练时间" width="120"  sortable>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" width="200"  sortable>
      </el-table-column>
      <el-table-column prop="coachName" label="教练姓名" width="120" sortable>
      </el-table-column>
      <el-table-column prop="venueName" label="场地" width="200" sortable>
      </el-table-column>
       <el-table-column prop="studentCount" label="参加人数" width="120"  sortable>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog title="详情" :visible.sync="detailFormVisible" :close-on-click-modal="false" width="70%">
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple"></div>
          <el-form :model="detailForm" label-width="80px"  ref="detailForm">
            <el-form-item label="教学日期">
              <el-date-picker type="date"  v-model="detailForm.trainDate" :disabled="true" ></el-date-picker>
            </el-form-item>
            <el-form-item label="教学时间">
            <el-time-picker
              is-range
              :disabled="true"
              clear-icon
              value-format="HH:mm"
              v-model="detailForm.trainTimeSpan"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              class="input-class">
            </el-time-picker>
          </el-form-item>
            <el-form-item label="课程名称" >
              <el-input v-model="detailForm.courseName" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="教练" prop="coachId">
              <el-select v-model="detailForm.coachId" filterable placeholder="请选择">
                <el-option
                  :remote-method="getCoaches"
                  v-for="item in coaches"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="场地" prop="venueId">
              <el-select v-model="detailForm.venueId" filterable placeholder="请选择">
                <el-option
                  :remote-method="getVenues"
                  v-for="item in venues"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16"><div class="grid-content bg-purple"></div>
          <el-table :data="detailForm.students" highlight-current-row v-loading="listLoading" @selection-change="selsChange" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="学员姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="totalSections" label="课程节数" width="120" sortable>
            </el-table-column>
            <el-table-column prop="arrangeSections" label="已排期" min-width="120" sortable>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="detailFormVisible = false">关闭</el-button>
        <el-button type="primary" @click.native="updateOneDaySchedule" >更新</el-button>
        <el-button type="danger" @click.native="deleteOneDaySchedule" >删除</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import {formatDate,calAge} from '@/common/js/util'
  //import NProgress from 'nprogress'
  import { getShiftListPage} from './api';

  export default {
    data() {
      return {
        filters: {//过滤条件
          studentName: '',
          courseName: ''
        },
        courses: [],
        coaches: [],
        venues: [],
        students: [],
        shifts: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        detailFormVisible: false,//编辑界面是否显示
        //编辑界面数据
        detailForm:{
          courseId: '',
          courseName: '',
          coachId: '',
          venueId: '',
          trainDate: '',
          trainTimeSpan: '',
          students: []
        }

      }
    },
    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      formatPayoff: function (row, column) {
        return row.payoff == 1 ? '已付' : row.payoff == 0 ? '未付' : '未付';
      },
      formatGrade: function (row, column) {
        for(var i = 0,len=this.courseGrades.length; i < len; i++) {
          if(this.courseGrades[i].itemCode==row.courseLevel){
            return this.courseGrades[i].itemName;
          }
        }
        return row.courseLevel
      },
      formatPhase: function (row, column){
        for(var i = 0,len=this.coursePhases.length; i < len; i++) {
          if(this.coursePhases[i].itemCode==row.coursePhase){
            return this.coursePhases[i].itemName;
          }
        }
        return row.coursePhase;
      },
      formatTrainDate: function(row,column){
        return  formatDate(row.trainDate,"yyyy-MM-dd");
      },
     
      handleCurrentChange(val) {
        this.page = val;
        this.getRegistrations();
      },
      birthDateChanged:function(val){
        var  age=calAge(val.getTime());
        this.editForm.age=age;
      },
      periodsChange:function(value){
        this.editForm.totalFee=this.editForm.price * value;
        this.editForm.totalSections =  this.editForm.sections * value + this.editForm.attachSections;
      },
      attachSectionsChange:function(value){
        this.editForm.totalSections =  this.editForm.sections * this.editForm.periods + value;
      },
      //获取排班列表
      getShifts() {
        let para = {
          studentName: this.filters.studentName,
          courseName: this.filters.courseName
        };
        let page={ 'currentPage': this.page,'pageSize':10};
        this.listLoading = true;
        getShiftListPage(para,page).then((res) => {
          if( res && res.data){
            this.total = res.data.total;
            this.shifts = res.data.rows;
          }
          this.listLoading = false;
        }).catch((error) => {
          this.listLoading = false;
          console.log(error);
        });
      },
      getSchools() {//获取学校列表
        let para = {
          typeCode: 'SCHOOL',
        };
        let page={ 'currentPage': this.page,'pageSize':10};
        this.loading  = true;
        getDictionaryList(para,page).then((res) => {
          if( res && res.data){
            this.schools = res.data;
          }
          this.loading  = false;
        }).catch((error) => {
          this.loading  = false;
          console.log(error);
        });
      },
      createSchoolItem(){
        let dict={};
        dict.itemName=this.editForm.school;
        dict.typeCode='SCHOOL';
        dict.typeName='学校';
        addSchool(dict).then((res) => {
          console.log(res.dat);
          this.shools.push(res.data)
        }).catch((error) => {
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
          removeRegistration(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getRegistrations();
          });
        }).catch(() => {
          this.listLoading = false;
        });
      },
      clearFormData() {
        this.editForm = {
          id: 0,
          name: '',
          phone: 0,
          birthDate: '',
          sex: '',
          phone:'',
          age:0,
          school: '',
          parentName: '',
          parentPhone: '',
          parentWX: '',
          courseId:'',
          grade:'',
          phase:'',
          price:'',
          sections:'',
          periods: 0,
          totalFee: 0,
          totalSections:0,
          attachSections:0,
          payoff: 1,
          auto: 1
        };
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.formTitle = '编辑';
        this.editFormVisible = true;
        this.clearFormData();
        this.editForm = Object.assign({}, row);
        var  age=calAge(this.editForm.birthDate);
        this.editForm.age=age;
      },
      //显示新增界面
      handleAdd: function () {
        this.formTitle = '新增';
        this.editFormVisible = true;
        this.clearFormData();
      },
      handleAudit: function(){
        this.formTitle = '审核';
        this.editFormVisible = true;
        this.clearFormData();
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birthDate = (!para.birthDate || para.birthDate == '') ? '' : formatDate(new Date(para.birthDate), 'yyyy-MM-dd');
              editRegistration(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getRegistrations();
              });
            });
          }
        });
      },
      //新增/更新
      handleSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birthDateDate = (!para.birthDateDate || para.birthDateDate == '') ? '' : formatDate(new Date(para.birthDate), 'yyyy-MM-dd');

              if(this.editForm.id !=null && this.editForm.id != ''){
                editRegistration(para).then((res) => {
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.getRegistrations();
                });
              }else{
                addRegistration(para).then((res) => {
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.getRegistrations();
                });
              }
              
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
          batchRemoveRegistration(para).then((res) => {
            
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getRegistrations();
            this.listLoading = false;
          });
        }).catch(() => {
          this.listLoading = false;
        });
      }
    },
    mounted() {//默认页面加截方法
      this.getShifts();

    }
  }

</script>

<style scoped>
.formTitle{
  position: relative;
  top: -40px;
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
.input-class{
    width: 226px;
}
</style>