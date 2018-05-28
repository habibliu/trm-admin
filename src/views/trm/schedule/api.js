import axios from 'axios';

let base = '';

export const getCourseList = params => { return axios.get(`${base}/CourseSchedule/Course/list`, { params: params }); };

export const getCoachList = params => { return axios.get(`${base}/CourseSchedule/Coach/list`, { params: params }); };

export const getVenueList = params => { return axios.get(`${base}/CourseSchedule/Venue/list`, { params: params }); };

export const getCourseStudents = params => { return axios.get(`${base}/CourseSchedule/Student/list`, { params: params }); };

export const getScheduleListPage = params => { 
  return axios.get(`${base}/CourseSchedule/listpage`, { params: params }); 
};
