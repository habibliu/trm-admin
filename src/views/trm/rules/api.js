import axios from 'axios';

let base = '';

export const getRuleList = params => { return axios.get(`${base}/RuleSetting/list`, { params: params }); };

export const getRuleListPage = params => { 
  return axios.get(`${base}/RuleSetting/listpage`, { params: params }); 
};

export const removeRule = params => { return axios.get(`${base}/RuleSetting/remove`, { params: params }); };

export const batchRemoveRule = params => { return axios.get(`${base}/RuleSetting/batchremove`, { params: params }); };

export const editRule = params => { return axios.post(`${base}/RuleSetting/edit`, { params: params }); };

export const addRule = params => { return axios.post(`${base}/RuleSetting/add`, { params: params }); };