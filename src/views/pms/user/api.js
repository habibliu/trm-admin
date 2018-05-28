import axios from 'axios';

let base = '';


export const getUserList = params => { return axios.get(`${base}/User/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/User/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/User/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/User/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/User/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/User/add`, { params: params }); };