import Axios from '@/common/js/AxiosPlugin'
import qs from 'qs';

let base = 'http://139.159.214.95:8100';

export const requestLogin = params => { 
	debugger;
	//var par=JSON.stringify(params);
	//return Axios.post('/login',par,{'headers':{'Content-Type':'application/x-www-form-urlencoded'}}).then(res => res.data); 
	return Axios.get('/login',{params:{params:params}}).then(res => res.data); 
};

export const getUserList = params => { return Axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return Axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return Axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return Axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return Axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return Axios.get(`${base}/user/add`, { params: params }); };