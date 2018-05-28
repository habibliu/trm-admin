import axios from 'axios';

let base = '';

export const getAttendanceList = params => { return axios.get(`${base}/Attendance/list`, { params: params }); };

export const getAttendanceListPage = params => { 
  return axios.get(`${base}/Attendance/listpage`, { params: params }); 
};

export const removeAttendance = params => { return axios.get(`${base}/Attendance/remove`, { params: params }); };

export const batchRemoveAttendance = params => { return axios.get(`${base}/Attendance/batchremove`, { params: params }); };

export const editAttendance = params => { return axios.post(`${base}/Attendance/edit`, { params: params }); };

export const addAttendance = params => { return axios.post(`${base}/Attendance/add`, { params: params }); };