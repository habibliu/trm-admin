import Vue from 'vue'
import Router from 'vue-router'
// 路由文件，引用各业务模块路由
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import Login from './views/login/Login.vue'
import Organization from './views/orgmgt/organization/Organization.vue'
import Department from './views/orgmgt/department/Department.vue'
import Employee from './views/orgmgt/employee/Employee.vue'

import User from './views/pms/user/User.vue'
import Role from './views/pms/role/Role.vue'

import Student from './views/master/student/Student.vue'
import Coach from './views/master/coach/Coach.vue'
import SportVenue from './views/master/venue/SportVenue.vue'
import Course from './views/master/course/Course.vue'

import CourseRegistration from './views/trm/coursereg/CourseRegistration.vue'
import CourseSchedule from './views/trm/schedule/CourseSchedule.vue'
import Attendance from './views/trm/attendance/Attendance.vue'
import RuleSetting from './views/trm/rules/RuleSetting.vue'
import Shift from './views/trm/shift/Shift.vue'
/*
// 配置路由
Vue.use(Router)

// 定义路由实例
export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/login',
        component: Login,
        name: '用户登录',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '参考样例',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '组织管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '组织架构' },
            { path: '/page4', component: Page4, name: '部门管理' },
            { path: '/Employee', component: Employee, name: '员工管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '安全管理',
        iconCls: 'fa fa-address-card',
        //leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '用户管理' },
            { path: '/page6', component: Page6, name: '角色管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '分析报表',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
    ]
});
*/

export default [
    {
        path: '/login',
        component: Login,
        name: '用户登录',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '组织管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/Organization', component: Organization, name: '组织架构' },
            { path: '/Department', component: Department, name: '部门管理' },
            { path: '/Employee', component: Employee, name: '员工管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '安全管理',
        iconCls: 'fa fa-address-card',
        //leaf: true,//只有一个节点
        children: [
            { path: '/User', component: User, name: '用户管理' },
            { path: '/Role', component: Role, name: '角色管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '基础资料',
        iconCls: 'fa fa-address-card',
        //leaf: true,//只有一个节点
        children: [
            { path: '/Student', component: Student, name: '学员资料' },
            { path: '/Coach', component: Coach, name: '教练资料' },
            { path: '/SportVenue', component: SportVenue, name: '场地资料' },
            { path: '/Course', component: Course, name: '课程资料' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '业务管理',
        iconCls: 'fa fa-address-card',
        //leaf: true,//只有一个节点
        children: [
            { path: '/RuleSetting', component: RuleSetting, name: '赠送规则' },
            { path: '/CourseRegistration', component: CourseRegistration, name: '课程报名' },
            { path: '/CourseSchedule', component: CourseSchedule, name: '排期管理' },
            { path: '/Shift', component: Shift, name: '排期结果管理' },
            { path: '/Attendance', component: Attendance, name: '考勤管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '分析报表',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/404', component: echarts, name: '学员考勤' },
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];
/*
export default route;
*/