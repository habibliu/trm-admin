<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="姓名">
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="账号">
					<el-input v-model="filters.account" placeholder="账号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		
			<el-table :data="users" highlight-current-row v-loading="loading" @selection-change="selsChange"  style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120" sortable>
				</el-table-column>
				<el-table-column prop="account" label="登录账号" width="100"  sortable>
				</el-table-column>
				<el-table-column prop="organization" label="所在单位" width="100" sortable>
				</el-table-column>
				<el-table-column prop="department" label="所在部门" width="120" sortable>
				</el-table-column>
				<el-table-column prop="status" label="状态" min-width="180" sortable>
				</el-table-column>
				<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
			</el-table>
	

	</section>
</template>
<script>
	import { getUserList ,getUserListPage,removeUser,batchRemoveUser,editUser,addUser} from './api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: '',
					account:'',
				},
				loading: false,
				users: [
				],
				total: 0,
				page: 1,
				sels: [],//列表选中列
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			/**
			 * 获取用户列表
			 * @return {[type]} [description]
			 */
			getUser: function () {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
				if( res && res.data){
						this.total = res.data.total;
						this.users = res.data.users;
					
					}
					this.loading = false;
					//NProgress.done();
				}).catch(error=>{
					console.log(error);
					this.loading = false;
				});
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>

</style>