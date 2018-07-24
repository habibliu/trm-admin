import Axios from '@/common/js/AxiosPlugin'

export const requestLogin = params => { 
	//var par=JSON.stringify(params);
	//return Axios.post('/login',par,{'headers':{'Content-Type':'application/x-www-form-urlencoded'}}).then(res => res.data); 
	return Axios.get('/login',{params:{params:params}}).then(res => res.data); 

};

export const getUserList = params => { return Axios.get(`/user/list`, { params: params }); };

export const getUserListPage = params => { return Axios.get(`/user/listpage`, { params: params }); };

export const removeUser = params => { return Axios.get(`/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return Axios.get(`/user/batchremove`, { params: params }); };

export const editUser = params => { return Axios.get(`/user/edit`, { params: params }); };

export const addUser = params => { return Axios.get(`/user/add`, { params: params }); };