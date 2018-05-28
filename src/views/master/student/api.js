import axios from 'axios';

let base = '';

export const getStudentList = params => { return axios.get(`${base}/Student/list`, { params: params }); };

export const getStudentListPage = params => { 
  return axios.get(`${base}/Student/listpage`, { params: params }); 
};

export const removeStudent = params => { return axios.get(`${base}/Student/remove`, { params: params }); };

export const batchRemoveStudent = params => { return axios.get(`${base}/Student/batchremove`, { params: params }); };

export const editStudent = params => { return axios.get(`${base}/Student/edit`, { params: params }); };

export const addStudent = params => { return axios.get(`${base}/Student/add`, { params: params }); };
//取家长列表
export const getSchoolList = params => { return axios.get(`${base}/Student/listSchools`, { params: params }); };