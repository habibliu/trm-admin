import axios from '@/common/js/AxiosPlugin'


export const getCoachList = params => {
	return axios.get(`/Coach/list`, {params:{params:params}}).then(res => res.data);
};

export const getCoachListPage = params => {
  return axios.get(`/Coach/listPage`, {params:{params:params}}).then(res => res.data);
};

export const removeCoach = params => { return axios.get(`/Coach/remove`, { params: params }); };

export const batchRemoveCoach = params => { return axios.get(`/Coach/batchremove`, { params: params }); };

export const editCoach = params => {
	var par=JSON.stringify(params);
	return axios.post(`/Coach/update`, par).then(res => res.data);
};

export const addCoach = params => {
	var par=JSON.stringify(params);
	return axios.post(`/Coach/add`, par).then(res => res.data);
};