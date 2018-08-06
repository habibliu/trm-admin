import axios from '@/common/js/AxiosPlugin'


export const getShiftListPage = (params ,page) => { 
  return axios.get(`/Shift/listPage`,{params:{'params':params,'page':page}}).then(res => res.data);
};
