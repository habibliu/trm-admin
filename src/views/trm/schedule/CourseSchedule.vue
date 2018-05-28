<template>
  <section>
    <!--新增界面-->
    <el-row :gutter="20">
      <el-col :span="7"><div class="grid-content bg-purple" style="padding-top:20px;"></div>
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" >
          <el-form-item label="课程名称" prop="course">
            <el-select v-model="addForm.course" filterable placeholder="请选择" @change="getStudents">
              <el-option
                :remote-method="getCourses"
                v-for="item in courses"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教练" prop="coach">
            <el-select v-model="addForm.coach" filterable placeholder="请选择">
              <el-option
                :remote-method="getCoaches"
                v-for="item in coaches"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="场地" prop="venue">
            <el-select v-model="addForm.venue" filterable placeholder="请选择">
              <el-option
                :remote-method="getVenues"
                v-for="item in venues"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教学日期" prop="date">
            <el-date-picker type="dates" placeholder="选择一个或多个日期" v-model="addForm.dates"></el-date-picker>
          </el-form-item>
        </el-form>
        <el-table :data="students" highlight-current-row v-loading="listLoading" @selection-change="selsChange" ref="studentTable">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="60">
          </el-table-column>
          <el-table-column prop="name" label="学员姓名" width="120" sortable>
          </el-table-column>
          <el-table-column prop="sections" label="课程节数" width="120" sortable>
          </el-table-column>
          <el-table-column prop="beingSchedule" label="待排期" min-width="120" sortable>
          </el-table-column>
          
        </el-table>

      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple"></div>
        <div class="button-container">
          <div class="arrange-button">
            <el-button type="primary"  @click="appendSchedule" >排期>></el-button>
          </div>
          <div class="arrange-button">
            <el-button type="primary" @click="removeSchedule"><<取消</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple"></div>
        <full-calendar 
          :events="calendarOptions.events" 
          lang="zh"
          :firstDay=1
          @changeMonth = "changeMonth()"
          @eventClick = "eventClick($event)"
          @dayClick = "dayClick()">
        </full-calendar>
      </el-col>
    </el-row>

    <el-dialog title="详情" :visible.sync="detailFormVisible" :close-on-click-modal="false">
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple"></div>
          <el-form :model="detailForm" label-width="80px"  ref="detailForm">
            <el-form-item label="教学日期">
              <el-date-picker type="date"  v-model="detailForm.date" :disabled="true"></el-date-picker>
            </el-form-item>
            <el-form-item label="课程名称" >
              <el-input v-model="detailForm.courseName" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="教练" prop="coach">
              <el-select v-model="detailForm.coach" filterable placeholder="请选择">
                <el-option
                  :remote-method="getCoaches"
                  v-for="item in coaches"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="场地" prop="venue">
              <el-select v-model="detailForm.venue" filterable placeholder="请选择">
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
            <el-table-column prop="sections" label="课程节数" width="120" sortable>
            </el-table-column>
            <el-table-column prop="beingSchedule" label="待排期" min-width="120" sortable>
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
    
    <div class="footer">
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading" >提交</el-button>
    </div>

  </section>
</template>

<script>
  import util from '../../../common/js/util'
  //import NProgress from 'nprogress'
  import { getCourseList, getCoachList, getVenueList,getCourseStudents } from './api';

  export default {
    data() {
      return {
        calendarOptions: {
          events :[]
        },
        courses: [],
        coaches: [],
        venues: [],
        students: [],
        listLoading: false,
        sels: [],//列表选中列

        addFormVisible: true,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          course: [
            { required: true, message: '请选择课程名称', trigger: 'blur' }
          ],
          coach: [
            { required: true, message: '请选择教练', trigger: 'blur' }
          ],
          venue: [
            { required: true, message: '请选择场地', trigger: 'blur' }
          ]
          
        },
        //新增界面数据
        addForm: {
          course: '',
          coach: '',
          venue: '',
          dates: [],
        },
        detailFormVisible: false,
        detailForm:{
          courseId: '',
          courseName: '',
          coach: '',
          venue: '',
          date: '',
          students: []
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getSchedules();
      },
      getCourses(){//获取课程列表
        let para = {
          name: '2018',
        };
        getCourseList(para).then((res) => {
          if( res && res.data){
            this.courses = res.data.courses;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getCoaches(){//获取教练列表
        let para = {
        };
        getCoachList(para).then((res) => {
          if( res && res.data){
            this.coaches = res.data.coaches;
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
            this.venues = res.data.venues;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getStudents(){//获取课程报名学员列表
        let para = {
          course:this.addForm.course
        };

        getCourseStudents(para).then((res) => {
          if( res && res.data){
            this.students = res.data.students;
            setTimeout(() => {
              this.students.forEach(item => {
                this.$refs.studentTable.toggleRowSelection(item,true);
              });
            }, 100);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      appendSchedule(){//追加排班
        for(let i=0;i<this.addForm.dates.length;i++){
          let event={
            title:this.getCouserName(this.addForm.course),
            start:this.addForm.dates[i],
            end:this.addForm.dates[i],
            cssClass : ['home', 'work']
          };
          let DATA ={
            courseId:this.addForm.course,
            courseName:this.getCouserName(this.addForm.course),
            date : util.formatDate.format(this.addForm.dates[i],'yyyy-MM-dd'),
            venueId: this.addForm.venue,
            venueName: this.getVenueName(this.addForm.venue),
            coachId: this.addForm.coach,
            coachName: this.getCoachName(this.addForm.coach),
            students: this.sels
          };
          event.DATA=DATA;
          this.calendarOptions.events.push(event);
          this.changeStudentSections(this.sels,true);
        }

      },
      removeSchedule(){//移除排班
        for(let i=0;i<this.addForm.dates.length;i++){
          var deletingDate=util.formatDate.format(this.addForm.dates[i],'yyyy-MM-dd');
          for(let j=0;j<this.calendarOptions.events.length;j++){
            var event=this.calendarOptions.events[j];
            var currentDate=util.formatDate.format(event.start,'yyyy-MM-dd');
            if(currentDate==deletingDate){
              if (event.DATA.courseId==this.addForm.course){
                debugger;
                var event=this.calendarOptions.events.splice(j,1);
                this.changeStudentSections(event.DATA.students,false);
              }
            }
          }
        }
      },
      deleteOneDaySchedule (){

      },
      updateOneDaySchedule (){

      },
      changeMonth: function(start, end, current){//日历月分变更事件
          
      },
      dayClick: function(day, jsEvent){

      },
      eventClick: function(event){
        debugger;
        this.detailFormVisible = true;
        this.detailForm.courseId=event.DATA.courseId;
        this.detailForm.courseName=event.DATA.courseName;
        this.detailForm.coach=event.DATA.coachId;
        this.detailForm.venue=event.DATA.venueId;
        this.detailForm.date=event.DATA.date;
        this.detailForm.students=event.DATA.students;
        console.log(event);

      },
      getCouserName: function(id) {
        for(var i=0;i<this.courses.length; i++){
          if ( this.courses[i].id==id){
            return this.courses[i].name;
          }
        }
      },
      getCoachName: function(id) {
        for(var i=0;i<this.coaches.length; i++){
          if ( this.coaches[i].id==id){
            return this.coaches[i].name;
          }
        }
      },
      getVenueName: function(id) {
        for(var i=0;i<this.venues.length; i++){
          if ( this.venues[i].id==id){
            return this.venues[i].name;
          }
        }
      },
      changeStudentSections:function(students, deduce){
        students.forEach(student =>{
          console.log(student);
          if(deduce){
            student.beingSchedule--;
          }else{
            student.beingSchedule++;
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
              addSchedule(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getSchedules();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      }
    },
    components : {
      'full-calendar': require('vue-fullcalendar')  
    },
    mounted() {//默认页面加截方法
      this.getCourses();
      this.getCoaches();
      this.getVenues();
    }
  }

</script>

<style scoped>
.button-container{
  padding-top: 300px;  
  display: block;  
}
.arrange-button{
  padding-top:10px;
  padding-left:20px;
}
.footer{
  display: table-cell;  
  vertical-align: middle; 
}
</style>