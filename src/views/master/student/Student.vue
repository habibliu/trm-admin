<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="filters.sex" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家长">
          <el-input v-model="filters.parentName" placeholder="家长"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getStudents">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="students" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="学员姓名" width="120" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="120" sortable>
      </el-table-column>
      <el-table-column prop="height" label="身高" width="100" sortable>
      </el-table-column>
      <el-table-column prop="school" label="就读学校" width="120" sortable>
      </el-table-column>
      <el-table-column prop="parentName" label="家长姓名" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="parentTelephone" label="家长电话" min-width="120" sortable>
      </el-table-column>
      <el-table-column prop="addr" label="地址" min-width="180" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--底部工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" width="60%">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple"></div>
            <el-form-item label="学员姓名" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="editForm.sex">
                <el-radio class="radio" :label="1">男</el-radio>
                <el-radio class="radio" :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="parentTelephone">
              <el-input v-model="editForm.telephone" placeholder="学员手机号码"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="editForm.age" :disabled=true></el-input-number>
            </el-form-item>
            <el-form-item label="身高">
              <el-input-number v-model="editForm.height" ></el-input-number>
            </el-form-item>
            <el-form-item label="就读学校">
              <el-select v-model="editForm.school" filterable placeholder="请选择">
                <el-option
                  :remote-method="getSchools"
                  :loading="loading"
                  v-for="item in schools"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            
          </el-col>
          <el-col :span="8"><div class="grid-content bg-purple"></div>
            <el-form-item label="家长姓名" prop="parentName">
              <el-input v-model="editForm.parentName" filterable placeholder="请输入家姓名" ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="editForm.parentSex">
                <el-radio class="radio" :label="1">男</el-radio>
                <el-radio class="radio" :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="parentTelephone">
              <el-input v-model="editForm.parentTelephone" placeholder="家长手机号码"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="editForm.parentWx" placeholder="家长微信号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
            <div class="face-pic-preview">
              <img :src="faceImage" ref="img"></img>
            </div>
            <input @change="readFacePic" class="upload-pic-input" ref="uploadFacePicInput" type="file" accept="image/jpeg">
            <div class="face-pic-operation">
              <el-button type="primary" @click="onAddPhoto" size="mini">本机上传</el-button>
            </div>
            <div class="tips">
              <span>上传说明：</span>
              <p>图片应保持五官端正，面部清晰可见</P>
              <p>图片推荐尺寸206*206</p>
              <p>只支持JPG格式，文件大小200Kb以内</P>
            </div>
          </el-col>
        </el-row>
        
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false" width="60%">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">handleCurrentChange
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="parentTelephone">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="家长" prop="parentName">
          <el-select v-model="addForm.parent" filterable placeholder="请选择" >
            <el-option
              v-for="item in parents"
              :key="item.id"
              :label="item.name + (item.sex==1?' 男 ':' 女 ') + item.telephone"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="padding-left: 40px;">{{ item.sex==1?'男':'女' }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.telephone }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
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
  import defaultPicture from './assets/images/james1.jpg'
  import { getStudentListPage, removeStudent, batchRemoveStudent, editStudent, addStudent, getSchoolList } from './api';

  export default {
    data() {
      return {
        filters: {
          name: '',
          sex: '',
          parentName: ''
        },
        students: [],
        schools:[],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        faceImage:defaultPicture,
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入学员姓名', trigger: 'blur' }
          ],
          parentName: [
            { required: true, message: '请输入家长姓名', trigger: 'blur' }
          ],
          parentTelephone: [
            { required: true, message: '请输入家长手机号', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: '',
          telphone: '',
          school: '',
          image: '',
          height: '',
          parentName: '',
          parentTelephone: '',
          parentSex: '',
          parentWx: '',
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入学员姓名', trigger: 'blur' }
          ],
          parentName: [
            { required: true, message: '请输入家长姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: '',
          parent: '',
          telphone: '',
          school: '',
          image: '',
          height: '',
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
        this.getStudents();
      },
      //获取学生列表
      getStudents() {
        let para = {
          page: this.page,
          name: this.filters.name,
          sex: this.filters.sex,
          parent: this.filters.parent
        };
        this.listLoading = true;
        getStudentListPage(para).then((res) => {
          if( res && res.data){
            this.total = res.data.total;
            this.students = res.data.students;
          
          }
          this.listLoading = false;
        }).catch((error) => {
          this.listLoading = false;
          console.log(error);
        });
      },
      getSchools() {
        let para = {
          name: this.filters.name,
        };
        this.loading  = true;
        getSchoolList(para).then((res) => {
          if( res && res.data){
            this.schools = res.data.schools;
          }
          this.loading  = false;
        }).catch((error) => {
          this.loading  = false;
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
          removeStudent(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getStudents();
          });
        }).catch(() => {
          this.listLoading = false;
        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.getSchools();
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //显示新增界面
      handleAdd: function () {
        this.getSchools();
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          age: 0,
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
              editStudent(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getStudents();
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
              addStudent(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getStudents();
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
          batchRemoveStudent(para).then((res) => {
            
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getStudents();
            this.listLoading = false;
          });
        }).catch(() => {
          this.listLoading = false;
        });
      },
      readFacePic: function () {
        var file = this.$refs.uploadFacePicInput.files[0]
        // 判断上传文件类型
        if (file.type === 'image/jpeg') {
          this.form.fileName = file.name
          // 判断图片是否大于200K
          if (file.size < 1024 * 200) {
            const self = this
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (e) {
              var base64Code = this.result
              self.form.facePicBase64 = base64Code
              self.faceImg = base64Code
            }
          } else {
            this.$message({
              message: '请选择小于200KB的图片',
              type: 'warning'
            })
          }
        } else {
          this.$message.error('文件格式错误、请上传JPG图片')
          return false
        }
      },
      onAddPhoto: function () {
        this.$refs.uploadFacePicInput.click()
      }
    },
    mounted() {//默认页面加截方法
      this.getStudents();
    }
  }

</script>

<style scoped>
.upload-pic-input {
  display: none;
}

.face-pic-preview {
  width: 206px;
  height: 206px;
  margin: 0 auto;
  border: 1px solid #ccc;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.face-pic-preview img {
  width: 206px;
}
.face-pic-operation {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
}

.tips {
  width: 215px;
  margin: 8px auto;
  font-size: 10px;
}
</style>