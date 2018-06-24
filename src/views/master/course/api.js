import axios from '@/common/js/AxiosPlugin'

let base = '';

export const getCourseList = params => { return axios.get(`${base}/Course/list`, { params: params }); };

export const getCourseListPage = params => { 
  return axios.get(`${base}/Course/listpage`,{params:{params:params}}).then(res => res.data);
};

export const removeCourse = params => { return axios.get(`${base}/Course/remove`, { params: params }); };

export const batchRemoveCourse = params => { return axios.get(`${base}/Course/batchremove`, { params: params }); };

export const editCourse = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/Course/update`, par); 
};

export const addCourse = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/Course/add`, par); 
};