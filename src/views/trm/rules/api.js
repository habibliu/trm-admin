import axios from '@/common/js/AxiosPlugin'

export const getRuleList = params => { 
	return axios.get(`/Rule/list`, {params:{params:params}}).then(res => res.data); 
};

export const getRuleListPage = (params,page) => { 
  return axios.get(`/Rule/listPage`, {params:{'params':params,'page':page}}).then(res => res.data); 
};

export const removeRule = params => { return axios.get(`/Rule/remove`, { params: params }); };

export const batchRemoveRule = params => { return axios.get(`/Rule/batchremove`, { params: params }); };

export const editRule = params => { 
	var par=JSON.stringify(params);
	return axios.post(`/Rule/update`, par).then(res => res.data); 
};

export const addRule = params => { 
	var par=JSON.stringify(params);
	return axios.post(`/Rule/add`, par).then(res => res.data); 
};
//获取课程列表
export const getCourseList = params => {
	return axios.get(`/Course/list`, {params:{params:params}}).then(res => res.data); 
};