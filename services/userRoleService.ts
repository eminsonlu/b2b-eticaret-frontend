import axios from './baseService';

export const fetchPanelUserRoles = () => {
  return axios
    .get('/panel/user-roles')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelUserRoleById = (id: string) => {
  return axios
    .get(`/panel/user-roles/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelUserRole = (data = {}) => {
  return axios
    .post('/panel/user-roles', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelUserRole = (id: string, data = {}) => {
  return axios
    .put(`/panel/user-roles/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelUserRole = (id: string) => {
  return axios
    .delete(`/panel/user-roles/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
