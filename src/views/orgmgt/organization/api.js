import axios from 'axios';

let base = '';

export const getTreeData = params => { return axios.get(`${base}/Organization/list`, { params: params }); };

export const removeOrganization = params => { return axios.get(`${base}/Organization/remove`, { params: params }); };

export const editOrganization = params => { return axios.get(`${base}/Organization/edit`, { params: params }); };

export const addOrganization = params => { return axios.get(`${base}/Organization/add`, { params: params }); };