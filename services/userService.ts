import axios from './baseService';

export const fetchPanelUsers = () => {
  return axios
    .get('/panel/users')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelUserById = (id: string) => {
  return axios
    .get(`/panel/users/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelUser = (data = {}) => {
  return axios
    .post('/panel/users', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelUser = (id: string, data = {}) => {
  return axios
    .put(`/panel/users/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelUser = (id: string) => {
  return axios
    .delete(`/panel/users/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const updateProfile = (data = {}) => {
  return axios
    .put('/user/profile', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const changePassword = (data = {}) => {
  return axios
    .put('/user/change-password', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
