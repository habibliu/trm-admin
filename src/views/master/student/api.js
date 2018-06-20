import axios from '@/common/js/AxiosPlugin'
//import axios from 'axios';
import qs from 'qs';

let base = '';

export const getStudentList = params => {
	return axios.get(`${base}/Student/list`, { params: params });
};

export const getStudentListPage = params => {
  	return axios.get(`${base}/Student/listPage`,{params:{params:params}}).then(res => res.data);
};

export const removeStudent = params => { return axios.post(`${base}/Student/remove`, { params: params }); };

export const batchRemoveStudent = params => { return axios.post(`${base}/Student/batchremove`, { params: params }); };

export const editStudent = params => { return axios.post(`${base}/Student/edit`, { params: params }); };

export const addStudent = params => {
	debugger;
	return axios.post(`${base}/Student/add`, qs.stringify(params)).then(res => res.data); 
};
//取家长列表
export const getSchoolList = params => { return axios.get(`${base}/Student/listSchools`, { params: params }); };