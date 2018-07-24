import axios from '@/common/js/AxiosPlugin'


export const getVenueList = params => { 
	return axios.get(`/Venue/list`, {params:{params:params}}).then(res => res.data); 
};

export const getVenueListPage = params => { 
  return axios.get(`/Venue/listPage`, {params:{params:params}}).then(res => res.data); 
};

export const removeVenue = params => { return axios.get(`/Venue/remove`, { params: params }); };

export const batchRemoveVenue = params => { return axios.get(`/Venue/batchremove`, { params: params }); };

export const editVenue = params => { 
	var par=JSON.stringify(params);
	return axios.post(`/Venue/edit`, par).then(res => res.data);  
};

export const addVenue = params => { 
	var par=JSON.stringify(params);
	debugger;
	return axios.post(`/Venue/add`, par).then(res => res.data);  
};