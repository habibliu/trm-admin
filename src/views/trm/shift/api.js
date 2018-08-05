import axios from '@/common/js/AxiosPlugin'


export const getShiftListPage = params => { 
  return axios.get(`/Shift/listpage`, {params:{params:params}}).then(res => res.data);
};
