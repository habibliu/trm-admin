import axios from '@/common/js/AxiosPlugin'


export const getCourseList = params => { return axios.get(`/Course/list`, { params: params }); };

export const getCourseListPage = params => { 
  return axios.get(`/Course/listPage`,{params:{params:params}}).then(res => res.data);
};

export const removeCourse = params => { return axios.get(`/Course/remove`, { params: params }); };

export const batchRemoveCourse = params => { return axios.get(`/Course/batchremove`, { params: params }); };

export const editCourse = params => { 
	var par=JSON.stringify(params);
	return axios.post(`/Course/update`, par); 
};

export const addCourse = params => { 
	var par=JSON.stringify(params);
	debugger;
	return axios.post(`/Course/add`, par); 
};