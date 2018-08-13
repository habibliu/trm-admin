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
      <el-table-column label="考勤结果">
        <el-table-column prop="normalCount" label="实到人数" width="120"  sortable>
        </el-table-column>
        <el-table-column prop="leaveCount" label="请假人数" width="120"  sortable>
        </el-table-column>
        <el-table-column prop="absentCount" label="旷课人数" width="120"  sortable>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="handleAttendance(scope.$index, scope.row)">考勤</el-button>
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
    <el-dialog title="详情" :visible.sync="detailFormVisible" :close-on-click-modal="true" width="70%">
      <el-row :gutter="20">
        <el-col :span="10"><div class="grid-content bg-purple"></div>
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
              v-model="detailForm.trainTime"
              range-separator="至"
              class="input-class">
            </el-time-picker>
          </el-form-item>
            <el-form-item label="课程名称" >
              <el-input v-model="detailForm.courseName" auto-complete="off" :disabled="true" class="input-class"></el-input>
            </el-form-item>
            <el-form-item label="教练" prop="coachId">
              <el-select v-model="detailForm.coachId" filterable placeholder="请选择">
                <el-option
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
                  v-for="item in venues"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="14"><div class="grid-content bg-purple"></div>
          <el-table :data="detailForm.students" highlight-current-row v-loading="listLoading" @selection-change="selsChange" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="studentName" label="学员姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="totalSections" label="课程节数" width="120" sortable>
            </el-table-column>
            <el-table-column prop="arrangedSections" label="已排期" min-width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDelStudent(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="detailFormVisible = false">关闭</el-button>
        <el-button type="primary" @click.native="editSubmit" >更新</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="考勤" :visible.sync="attendanceFormVisible" :close-on-click-modal="true" width="50%">
      <el-row :gutter="20">
        <el-col :span="12"><div class="grid-content bg-purple"></div>
          <el-form :model="attendanceForm" label-width="80px"  ref="attendanceForm">
            <el-form-item label="教学日期">
              <el-date-picker type="date"  v-model="attendanceForm.trainDate" :disabled="true" ></el-date-picker>
            </el-form-item>
            <el-form-item label="教学时间">
            <el-time-picker
              is-range
              :disabled="true"
              clear-icon
              value-format="HH:mm"
              v-model="attendanceForm.trainTime"
              range-separator="至"
              class="input-class">
            </el-time-picker>
          </el-form-item>
            <el-form-item label="课程名称" >
              <el-input v-model="attendanceForm.courseName" auto-complete="off" :disabled="true" class="input-class"></el-input>
            </el-form-item>
            <el-form-item label="教练" prop="coachId">
              <el-select v-model="attendanceForm.coachId" filterable placeholder="请选择">
                <el-option
                  v-for="item in coaches"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="场地" prop="venueId">
              <el-select v-model="attendanceForm.venueId" filterable placeholder="请选择">
                <el-option
                  v-for="item in venues"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12"><div class="grid-content bg-purple"></div>
          <el-table :data="attendanceForm.students" highlight-current-row v-loading="listLoading" @selection-change="selsChange" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="studentName" label="学员姓名" width="120" sortable>
            </el-table-column>
            <el-table-column label="考勤结果" width="120" sortable>
              <template slot-scope="scope">
                <el-select v-model="checkingIn"  placeholder="请选择" @change="checkingInChange(scope.$index,scope.row, $event)" >
                  <el-option
                    v-for="item in attendanceTypes"
                    :key="item.id"
                    :label="item.itemName"
                    :value="item.itemCode">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
              
          </el-table>
        </el-col>
      </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="attendanceFormVisible = false">关闭</el-button>
        <el-button type="primary" @click.native="attendanceSubmit" >更新</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import {formatDate,calAge} from '@/common/js/util'
  //import NProgress from 'nprogress'
  import { getShiftListPage,getCoachList,getVenueList,deleteShift,batchDeleteShifts,getAttendanceTypes,getShiftStudents,updateAttendance,updateShift} from './api';

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
          trainTime: '',
          students: []
        },
        attendanceFormVisible:false,
        attendanceForm:{
          courseId: '',
          courseName: '',
          coachId: '',
          venueId: '',
          trainDate: '',
          trainTime: '',
          students: []
        },
        attendanceTypes:[]//出勤类型
      }
    },
    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      
      formatTrainDate: function(row,column){
        return  formatDate(row.trainDate,"yyyy-MM-dd");
      },
      checkingInChange:function(index,row,event){
        row.checkingIn=event;
        this.attendanceForm.students.forEach(student =>{
          if(student.id==row.id){
            student.checkingIn=event;
            return;
          }
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getRegistrations();
      },
      getCoaches(){//获取教练列表
        let para = {
        };
        getCoachList(para).then((res) => {
          if( res && res.data){
            this.coaches = res.data;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getVenues(){//获取场地列表
        let para = {
        };
        getVenueList(para).then((res) => {
          if( res && res.data){
            this.venues = res.data;
          }
        }).catch((error) => {
          console.log(error);
        });
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
        dict.itemName=this.detailForm.school;
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
          deleteShift(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getShifts();
          });
        }).catch(() => {
          this.listLoading = false;
        });
      },
      //删除学员
      handleDelStudent: function(index,row){
        
        this.detailForm.students.splice(index,1);
      },
      clearFormData() {
        this.detailForm = {
          courseId: '',
          courseName: '',
          coachId: '',
          venueId: '',
          trainDate: '',
          trainTimeSpan: '',
          students: []
        };
      },
      getShiftStudents(shiftId,type){
        let para = {
          id: shiftId,
        };
        
        this.loading  = true;
        getShiftStudents(para).then((res) => {
          if( res && res.data){
            if(type==='EDIT'){
              this.detailForm.students = res.data;
            }else{
              this.attendanceForm.students = res.data;
            }
            
          }
          this.loading  = false;
        }).catch((error) => {
          this.loading  = false;
          console.log(error);
        });
      },
      getAttendanceTypes(){
        let para = {
          typeCode: 'ATTENDANCE-TYPE',
        };
        getAttendanceTypes(para).then((res) => {
          if( res && res.data){
            this.attendanceTypes = res.data;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      turnTimeSpanToArray:function(date,timeSpan){
        
        var times=timeSpan.substring(1, timeSpan.length-1).split(',');
        var returnTimes=[];
      
        for(var i=0;i<2;i++){
          var hourMinute=times[i].split(':');
          var tempDate= new Date(date);
          tempDate.setHours(parseInt(hourMinute[0]),parseInt(hourMinute[1]));
          returnTimes.push(tempDate);
        }
        return returnTimes;
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.detailFormVisible = true;
        this.clearFormData();
        this.detailForm = Object.assign({}, row);
        this.detailForm.trainTime=this.turnTimeSpanToArray(row.trainDate,row.trainTime);
        //取排班学生
        this.getShiftStudents(row.id,'EDIT');
      },
      //显示考勤页面
      handleAttendance: function(index,row){
        this.attendanceFormVisible = true;
        this.clearFormData();
        this.attendanceForm = Object.assign({}, row);
        this.attendanceForm.trainTime=this.turnTimeSpanToArray(row.trainDate,row.trainTime);
        //取排班学生
        this.getShiftStudents(row.id,'ATTENDANCE');
      },
    
      //编辑
      editSubmit: function () {
        this.$refs.detailForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              //不传递trainTime到后台
              this.detailForm.trainTime='';
              let para = Object.assign({}, this.detailForm);
              debugger;
              updateShift(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['detailForm'].resetFields();
                this.detailFormVisible = false;
                this.getShifts();
              });
            });
          }
        });
      },
      //新增
      attendanceSubmit: function () {
        this.$refs.attendanceForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //不传递trainTime到后台
              this.attendanceForm.trainTime='';
              let para = Object.assign({}, this.attendanceForm);
              updateAttendance(para).then((res) => {
                this.addLoading = false;
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
                this.$refs['attendanceForm'].resetFields();
                this.attendanceFormVisible = false;
                this.getShifts();
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
          batchDeleteShift(para).then((res) => {
            
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
      this.getCoaches();
      this.getVenues();
      this.getAttendanceTypes();
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