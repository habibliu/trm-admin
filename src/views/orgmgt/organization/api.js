import axios from '@/common/js/AxiosPlugin'


export const getTreeData = params => { 
	return axios.get(`/Organization/list`,{params:{params:params}}).then(res => res.data);
};

export const removeOrganization = params => { 
	return axios.get(`/Organization/remove`, { params: params }); 
};

export const editOrganization = params => { 
	return axios.get(`/Organization/edit`, { params: params }); 
};

export const addOrganization = params => { 
	return axios.get(`/Organization/add`, { params: params }); 
};