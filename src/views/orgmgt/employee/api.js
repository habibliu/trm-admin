import axios from 'axios';

let base = '';

export const getEmployeeList = params => { return axios.get(`${base}/Employee/list`, { params: params }); };

export const getEmployeeListPage = params => { return axios.get(`${base}/Employee/listpage`, { params: params }); };

export const removeEmployee = params => { return axios.get(`${base}/Employee/remove`, { params: params }); };

export const batchRemoveEmployee = params => { return axios.get(`${base}/Employee/batchremove`, { params: params }); };

export const editEmployee = params => { return axios.get(`${base}/Employee/edit`, { params: params }); };

export const addEmployee = params => { return axios.get(`${base}/Employee/add`, { params: params }); };