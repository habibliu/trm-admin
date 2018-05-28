import axios from 'axios';

let base = '';

export const getCoachList = params => { return axios.get(`${base}/Coach/list`, { params: params }); };

export const getCoachListPage = params => { 
  return axios.get(`${base}/Coach/listpage`, { params: params }); 
};

export const removeCoach = params => { return axios.get(`${base}/Coach/remove`, { params: params }); };

export const batchRemoveCoach = params => { return axios.get(`${base}/Coach/batchremove`, { params: params }); };

export const editCoach = params => { return axios.post(`${base}/Coach/edit`, { params: params }); };

export const addCoach = params => { return axios.post(`${base}/Coach/add`, { params: params }); };