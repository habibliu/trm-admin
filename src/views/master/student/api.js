import axios from '@/common/js/AxiosPlugin'
//import axios from 'axios';

export const getStudentList = params => {
	return axios.get(`/Student/list`, {params:{params:params}}).then(res => res.data);
};

export const getStudentListPage = params => {
  	return axios.get(`/Student/listPage`,{params:{params:params}}).then(res => res.data);
};

export const removeStudent = params => { return axios.post(`/Student/remove`, { params: params }); };

export const batchRemoveStudent = params => { return axios.post(`/Student/batchremove`, { params: params }); };

export const editStudent = params => {
	var par=JSON.stringify(params);
	return axios.post(`/Student/update`, par).then(res => res.data);
};

export const addStudent = params => {
	var par=JSON.stringify(params);
	return axios.post(`/Student/add`, par).then(res => res.data);
};
//获取学校列表
export const getSchoolList = params => {
	return axios.get(`/Student/listSchools`, {params:{params:params}}).then(res => res.data);
};