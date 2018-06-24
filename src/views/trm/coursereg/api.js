import axios from '@/common/js/AxiosPlugin'

let base = '';

export const getRegistrationList = params => { 
	return axios.get(`${base}/CourseRegistration/list`, {params:{params:params}}).then(res => res.data); 
};

export const getRegistrationListPage = params => { 
  return axios.get(`${base}/CourseRegistration/listpage`, {params:{params:params}}).then(res => res.data); 
};

export const removeRegistration = params => { return axios.get(`${base}/CourseRegistration/remove`, { params: params }); };

export const batchRemoveRegistration = params => { return axios.get(`${base}/CourseRegistration/batchremove`, { params: params }); };

export const editRegistration = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/CourseRegistration/edit`,  par).then(res => res.data); 
};

export const addRegistration = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/CourseRegistration/add`, par).then(res => res.data); 
};
//获取课程列表
export const getCourseList = params => { 
	return axios.get(`${base}/CourseRegistration/Course/list`, {params:{params:params}}).then(res => res.data); 
};
//获取课程详细信息
export const getCourseDetail = params => { 
	return axios.get(`${base}/CourseRegistration/Course/get`, {params:{params:params}}).then(res => res.data); 
};

//获取学校列表
export const getSchoolList = params => { 
	return axios.get(`${base}/CourseRegistration/listSchools`, {params:{params:params}}).then(res => res.data); 
};