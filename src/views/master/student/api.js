import axios from '@/common/js/AxiosPlugin'
//import axios from 'axios';

let base = '';

export const getStudentList = params => {
	return axios.get(`${base}/Student/list`, { params: params });
};

export const getStudentListPage = params => {
  	return axios.get(`${base}/Student/listPage`,{params:{params:params}}).then(res => res.data);
};

export const removeStudent = params => { return axios.post(`${base}/Student/remove`, { params: params }); };

export const batchRemoveStudent = params => { return axios.post(`${base}/Student/batchremove`, { params: params }); };

export const editStudent = params => {
	var par=JSON.stringify(params);
	return axios.post(`${base}/Student/update`, par); 
};

export const addStudent = params => {
	var par=JSON.stringify(params);
	return axios.post(`${base}/Student/add`, par).then(res => res.data);
};
//取家长列表
export const getSchoolList = params => { return axios.get(`${base}/Student/listSchools`, { params: params }); };