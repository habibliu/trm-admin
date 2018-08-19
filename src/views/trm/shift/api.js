import axios from '@/common/js/AxiosPlugin'


export const getShiftListPage = (params ,page) => { 
  return axios.get(`/Shift/listPage`,{params:{'params':params,'page':page}}).then(res => res.data);
};

export const getCoachList = params => { 
	return axios.get(`/Coach/list`, {params:{params:params}}).then(res => res.data);
};

export const getVenueList = params => { 
	return axios.get(`/Venue/list`, {params:{params:params}}).then(res => res.data);
};

export const getShiftStudents = params => { 
  return axios.get(`/Shift/listShiftStudents`,{params:{params:params}}).then(res => res.data);
};

export const deleteShift = params => { 
	var par=JSON.stringify(params);
	return axios.post(`/Shift/delete`, par).then(res => res.data); 
};


export const batchDeleteShifts = params =>{
	var par=JSON.stringify(params);
	debugger;
	return axios.post(`/Shift/batchDelete`, par).then(res => res.data); 
};

export const getDictionaryList = params =>{
	return axios.get(`/Dictionary/list`, {params:{params:params}}).then(res => res.data); 
};

export const updateAttendance= params =>{
	var par=JSON.stringify(params);
	return axios.post(`/Shift/updateAttendance`, par).then(res => res.data); 
};

export const updateShift= params =>{
	var par=JSON.stringify(params);
	return axios.post(`/Shift/update`, par).then(res => res.data); 
};
