import axios from '@/common/js/AxiosPlugin'

export const getPaymentList = params => { return axios.get(`/CoursePayment/list`, { params: params }); };

export const getPaymentListPage = params => { 
  return axios.get(`/CoursePayment/listpage`, { params: params }); 
};

export const removePayment = params => { return axios.get(`/CoursePayment/remove`, { params: params }); };

export const batchRemovePayment = params => { return axios.get(`/CoursePayment/batchremove`, { params: params }); };

export const editPayment = params => { return axios.post(`/CoursePayment/edit`, { params: params }); };

export const addPayment = params => { return axios.post(`/CoursePayment/add`, { params: params }); };