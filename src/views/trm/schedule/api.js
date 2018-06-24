import axios from '@/common/js/AxiosPlugin'

let base = '';

export const getCourseList = params => { 
	return axios.get(`${base}/CourseSchedule/Course/list`, {params:{params:params}}).then(res => res.data);
};

export const getCoachList = params => { 
	return axios.get(`${base}/CourseSchedule/Coach/list`, {params:{params:params}}).then(res => res.data);
};

export const getVenueList = params => { 
	return axios.get(`${base}/CourseSchedule/Venue/list`, {params:{params:params}}).then(res => res.data);
};

export const getCourseStudents = params => { 
	return axios.get(`${base}/CourseSchedule/Student/list`, {params:{params:params}}).then(res => res.data);
};

export const getScheduleListPage = params => { 
  return axios.get(`${base}/CourseSchedule/listpage`, {params:{params:params}}).then(res => res.data);
};
