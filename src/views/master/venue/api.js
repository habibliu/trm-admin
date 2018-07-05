import axios from '@/common/js/AxiosPlugin'

let base = '';

export const getVenueList = params => { 
	return axios.get(`${base}/Venue/list`, {params:{params:params}}).then(res => res.data); 
};

export const getVenueListPage = params => { 
  return axios.get(`${base}/Venue/listpage`, {params:{params:params}}).then(res => res.data); 
};

export const removeVenue = params => { return axios.get(`${base}/Venue/remove`, { params: params }); };

export const batchRemoveVenue = params => { return axios.get(`${base}/Venue/batchremove`, { params: params }); };

export const editVenue = params => { 
	var par=JSON.stringify(params);
	return axios.post(`${base}/Venue/edit`, par).then(res => res.data);  
};

export const addVenue = params => { 
	var par=JSON.stringify(params);
	debugger;
	return axios.post(`${base}/Venue/add`, par).then(res => res.data);  
};