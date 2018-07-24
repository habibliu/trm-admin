import axios from '@/common/js/AxiosPlugin'


export const getEmployeeList = params => { return axios.get(`/Employee/list`, { params: params }); };

export const getEmployeeListPage = params => {
	return axios.get(`/Employee/listpage`, {params:{params:params}}).then(res => res.data);
};

export const removeEmployee = params => { return axios.get(`/Employee/remove`, { params: params }); };

export const batchRemoveEmployee = params => { return axios.get(`/Employee/batchremove`, { params: params }); };

export const editEmployee = params => { return axios.get(`/Employee/edit`, { params: params }); };

export const addEmployee = params => { return axios.get(`/Employee/add`, { params: params }); };