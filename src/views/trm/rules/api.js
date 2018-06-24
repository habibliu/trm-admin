import axios from '@/common/js/AxiosPlugin'

let base = '';

export const getRuleList = params => { 
	return axios.get(`${base}/RuleSetting/list`, {params:{params:params}}).then(res => res.data); 
};

export const getRuleListPage = params => { 
  return axios.get(`${base}/RuleSetting/listpage`, {params:{params:params}}).then(res => res.data); 
};

export const removeRule = params => { return axios.get(`${base}/RuleSetting/remove`, { params: params }); };

export const batchRemoveRule = params => { return axios.get(`${base}/RuleSetting/batchremove`, { params: params }); };

export const editRule = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/RuleSetting/edit`, par).then(res => res.data); 
};

export const addRule = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/RuleSetting/add`, par).then(res => res.data); 
};