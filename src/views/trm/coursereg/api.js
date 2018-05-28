import axios from 'axios';

let base = '';

export const getRegistrationList = params => { return axios.get(`${base}/CourseRegistration/list`, { params: params }); };

export const getRegistrationListPage = params => { 
  return axios.get(`${base}/CourseRegistration/listpage`, { params: params }); 
};

export const removeRegistration = params => { return axios.get(`${base}/CourseRegistration/remove`, { params: params }); };

export const batchRemoveRegistration = params => { return axios.get(`${base}/CourseRegistration/batchremove`, { params: params }); };

export const editRegistration = params => { return axios.post(`${base}/CourseRegistration/edit`, { params: params }); };

export const addRegistration = params => { return axios.post(`${base}/CourseRegistration/add`, { params: params }); };
//获取课程列表
export const getCourseList = params => { return axios.get(`${base}/CourseRegistration/Course/list`, { params: params }); };
//获取课程详细信息
export const getCourseDetail = params => { return axios.get(`${base}/CourseRegistration/Course/get`, { params: params }); };

//获取学校列表
export const getSchoolList = params => { return axios.get(`${base}/CourseRegistration/listSchools`, { params: params }); };