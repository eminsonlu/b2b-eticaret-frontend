import axios from './baseService';

export const fetchTags = () => {
  return axios
    .get('/tags')
    .then((res) => {
      return [null, res.data];
    })
};

export const fetchPanelTags = () => {
  return axios
    .get('/panel/tags')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelTagById = (id: string) => {
  return axios
    .get(`/panel/tags/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelTag = (data = {}) => {
  return axios
    .post('/panel/tags', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelTag = (id: string, data = {}) => {
  return axios
    .put(`/panel/tags/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelTag = (id: string) => {
  return axios
    .delete(`/panel/tags/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
