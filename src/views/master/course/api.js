import axios from 'axios';

let base = '';

export const getCourseList = params => { return axios.get(`${base}/Course/list`, { params: params }); };

export const getCourseListPage = params => { 
  return axios.get(`${base}/Course/listpage`, { params: params }); 
};

export const removeCourse = params => { return axios.get(`${base}/Course/remove`, { params: params }); };

export const batchRemoveCourse = params => { return axios.get(`${base}/Course/batchremove`, { params: params }); };

export const editCourse = params => { return axios.post(`${base}/Course/edit`, { params: params }); };

export const addCourse = params => { return axios.post(`${base}/Course/add`, { params: params }); };