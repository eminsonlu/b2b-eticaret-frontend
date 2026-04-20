import axios from './baseService';

export const uploadFile = (data = {}) => {
  return axios
    .post('/upload', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const uploadMultipleFile = (data = {}, config = {}) => {
  return axios
    .post('/upload-files', data, config)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
