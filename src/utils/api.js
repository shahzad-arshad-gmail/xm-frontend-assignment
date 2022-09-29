import axios from 'axios';
import {API_HOST, API_KEY} from "../constants";


const get = (url, headers, respType) => {
  return axios.get(url, {
    headers: {
      ...headers,
      'X-RapidAPI-Key': `${API_KEY}`,
      'X-RapidAPI-Host': `${API_HOST}`,
    },
    responseType: respType ? 'blob' : ''
  });
};

const post = (url, data = {}, headers = {}) => {
  return axios.post(url, data, {
    headers: {
      ...headers,
      'X-RapidAPI-Key': `${API_KEY}`,
      'X-RapidAPI-Host': `${API_HOST}`,
    },
  });
};

const put = (url, data = {}, headers = {}) => {
  return axios.put(url, data, {
    headers: {
      ...headers,
      'X-RapidAPI-Key': `${API_KEY}`,
      'X-RapidAPI-Host': `${API_HOST}`,
    },
  });
};

const deleteApi = (url, data = {}, headers = {}) => {
  return axios.delete(url, {
    data,
    headers: {
      ...headers,
      'X-RapidAPI-Key': `${API_KEY}`,
      'X-RapidAPI-Host': `${API_HOST}`,
    },
  });
};

export default {
  get,
  post,
  put,
  deleteApi,
};
