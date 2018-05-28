import axios from 'axios';

let base = '';

export const getParentList = params => { return axios.get(`${base}/Parent/list`, { params: params }); };

export const getParentListPage = params => { 
  return axios.get(`${base}/Parent/listpage`, { params: params }); 
};

export const removeParent = params => { return axios.get(`${base}/Parent/remove`, { params: params }); };

export const batchRemoveParent = params => { return axios.get(`${base}/Parent/batchremove`, { params: params }); };

export const editParent = params => { return axios.post(`${base}/Parent/edit`, { params: params }); };

export const addParent = params => { return axios.post(`${base}/Parent/add`, { params: params }); };