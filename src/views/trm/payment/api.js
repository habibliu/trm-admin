import axios from 'axios';

let base = '';

export const getPaymentList = params => { return axios.get(`${base}/CoursePayment/list`, { params: params }); };

export const getPaymentListPage = params => { 
  return axios.get(`${base}/CoursePayment/listpage`, { params: params }); 
};

export const removePayment = params => { return axios.get(`${base}/CoursePayment/remove`, { params: params }); };

export const batchRemovePayment = params => { return axios.get(`${base}/CoursePayment/batchremove`, { params: params }); };

export const editPayment = params => { return axios.post(`${base}/CoursePayment/edit`, { params: params }); };

export const addPayment = params => { return axios.post(`${base}/CoursePayment/add`, { params: params }); };