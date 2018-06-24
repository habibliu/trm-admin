import axios from '@/common/js/AxiosPlugin'

let base = '';

export const getVenueList = params => { 
	return axios.get(`${base}/SportVenue/list`, {params:{params:params}}).then(res => res.data); 
};

export const getVenueListPage = params => { 
  return axios.get(`${base}/SportVenue/listpage`, {params:{params:params}}).then(res => res.data); 
};

export const removeVenue = params => { return axios.get(`${base}/SportVenue/remove`, { params: params }); };

export const batchRemoveVenue = params => { return axios.get(`${base}/SportVenue/batchremove`, { params: params }); };

export const editVenue = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/SportVenue/edit`, par).then(res => res.data);  
};

export const addVenue = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/SportVenue/add`, par).then(res => res.data);  
};