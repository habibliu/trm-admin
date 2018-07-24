import axios from '@/common/js/AxiosPlugin'


export const getAttendanceList = params => { return axios.get(`/Attendance/list`, { params: params }); };

export const getAttendanceListPage = params => { 
  return axios.get(`/Attendance/listpage`, { params: params }); 
};

export const removeAttendance = params => { return axios.get(`/Attendance/remove`, { params: params }); };

export const batchRemoveAttendance = params => { return axios.get(`/Attendance/batchremove`, { params: params }); };

export const editAttendance = params => { return axios.post(`/Attendance/edit`, { params: params }); };

export const addAttendance = params => { return axios.post(`/Attendance/add`, { params: params }); };