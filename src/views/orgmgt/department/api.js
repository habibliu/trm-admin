import axios from '@/common/js/AxiosPlugin'



export const getTreeData = params => { return axios.get(`/Department/list`, {params:{params:params}}); };

export const removeDempartment = params => { return axios.get(`/Department/remove`, { params: params }); };

export const editDepartment = params => { return axios.get(`/Department/edit`, { params: params }); };

export const addDepartment = params => { return axios.get(`/Department/add`, { params: params }); };