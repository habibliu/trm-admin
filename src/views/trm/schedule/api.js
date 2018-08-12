import axios from '@/common/js/AxiosPlugin'

export const getCourseList = params => { 
	return axios.get(`/Course/list`, {params:{params:params}}).then(res => res.data);
};

export const getCoachList = params => { 
	return axios.get(`/Coach/list`, {params:{params:params}}).then(res => res.data);
};

export const getVenueList = params => { 
	return axios.get(`/Venue/list`, {params:{params:params}}).then(res => res.data);
};

export const getCourseStudents = params => { 
	return axios.get(`/Registion/getCourseStudents`, {params:{params:params}}).then(res => res.data);
};

export const getScheduleListPage = params => { 
  return axios.get(`/CourseSchedule/listpage`, {params:{params:params}}).then(res => res.data);
};
export const addSchedule = params => { 
	var par=JSON.stringify(params);
	return axios.post(`/CourseSchedule/add`, par).then(res => res.data); 
};

export const batchAddSchedule = params => { 
	var par=JSON.stringify(params);
	debugger;
	return axios.post(`/CourseSchedule/batchAdd`, par).then(res => res.data); 
};
