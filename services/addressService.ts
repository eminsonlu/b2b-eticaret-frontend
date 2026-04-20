import axios from './baseService';

export const fetchAddresses = () => {
  return axios
    .get('/addresses')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const fetchAddressById = (id: string) => {
  return axios
    .get(`/addresses/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const createAddress = (data = {}) => {
  return axios
    .post('/addresses', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const updateAddress = (id: string, data = {}) => {
  return axios
    .put(`/addresses/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const deleteAddress = (id: string) => {
  return axios
    .delete(`/addresses/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
