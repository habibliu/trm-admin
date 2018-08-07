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

export const getShifStudents = params => { 
  return axios.get(`/ShiftStudent/list`,{params:{params:params}}).then(res => res.data);
};

export const deleteShift = params => { 
	var par=JSON.stringify(params);
	return axios.post(`/Shift/delete`, par).then(res => res.data); 
};