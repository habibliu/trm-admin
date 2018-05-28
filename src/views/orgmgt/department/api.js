import axios from 'axios';

let base = '';

export const getTreeData = params => { return axios.get(`${base}/Department/list`, { params: params }); };

export const removeDempartment = params => { return axios.get(`${base}/Department/remove`, { params: params }); };

export const editDepartment = params => { return axios.get(`${base}/Department/edit`, { params: params }); };

export const addDepartment = params => { return axios.get(`${base}/Department/add`, { params: params }); };