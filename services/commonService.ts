import axios from './baseService';

export const fetchHomePageData = () => {
  return axios
    .get('/')
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const fetchPanelAppData = () => {
  return axios
    .get('/panel/app')
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
