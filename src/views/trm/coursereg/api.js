import axios from '@/common/js/AxiosPlugin'

let base = '';



export const getRegistrationListPage = (params ,page)=> { 
	debugger;
  return axios.get(`${base}/Registion/listPage`, {params:{'params':params,'page':page}}).then(res => res.data); 
};

export const removeRegistration = params => { return axios.get(`${base}/Registion/remove`, { params: params }); };

export const batchRemoveRegistration = params => { return axios.get(`${base}/Registion/batchremove`, { params: params }); };

export const editRegistration = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/Registion/edit`,  par).then(res => res.data); 
};

export const addRegistration = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/Registion/add`, par).then(res => res.data); 
};
//获取课程列表
export const getCourseList = params => { 
	return axios.get(`${base}/Registion/Course/list`, {params:{params:params}}).then(res => res.data); 
};
//获取课程详细信息
export const getCourseDetail = params => { 
	return axios.get(`${base}/Registion/Course/get`, {params:{params:params}}).then(res => res.data); 
};

//获取学校列表
export const getSchoolList = params => { 
	return axios.get(`${base}/Registion/listSchools`, {params:{params:params}}).then(res => res.data); 
}