import axios from '@/common/js/AxiosPlugin'

let base = '';



export const getRegistrationListPage = (params ,page)=> { 
  return axios.get(`/Registion/listPage`, {params:{'params':params,'page':page}}).then(res => res.data); 
};

export const removeRegistration = params => { return axios.get(`/Registion/remove`, { params: params }); };

export const batchRemoveRegistration = params => { return axios.get(`/Registion/batchremove`, { params: params }); };

export const editRegistration = params => { 
	var par=JSON.stringify(params);
	return axios.post(`/Registion/update`,  par).then(res => res.data); 
};

export const addRegistration = params => { 
	var par=JSON.stringify(params);
	debugger;
	return axios.post(`/Registion/add`, par).then(res => res.data); 
};
//获取课程列表
export const getCourseList = params => {
	return axios.get(`/Course/list`, {params:{params:params}}).then(res => res.data); 
};
//获取数据字典
export const getDictionaryList = params => { 
	debugger;
	return axios.get(`/Dictionary/list`, {params:{params:params}}).then(res => res.data); 
};
