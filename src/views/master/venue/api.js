import axios from 'axios';

let base = '';

export const getVenueList = params => { return axios.get(`${base}/SportVenue/list`, { params: params }); };

export const getVenueListPage = params => { 
  return axios.get(`${base}/SportVenue/listpage`, { params: params }); 
};

export const removeVenue = params => { return axios.get(`${base}/SportVenue/remove`, { params: params }); };

export const batchRemoveVenue = params => { return axios.get(`${base}/SportVenue/batchremove`, { params: params }); };

export const editVenue = params => { return axios.post(`${base}/SportVenue/edit`, { params: params }); };

export const addVenue = params => { return axios.post(`${base}/SportVenue/add`, { params: params }); };