import axios from './baseService';

export const fetchPanelVariants = () => {
  return axios
    .get('/panel/variants')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelVariantById = (id: string) => {
  return axios
    .get(`/panel/variants/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelVariant = (data = {}) => {
  return axios
    .post('/panel/variants', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelVariant = (id: string, data = {}) => {
  return axios
    .put(`/panel/variants/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelVariant = (id: string) => {
  return axios
    .delete(`/panel/variants/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

// #

export const fetchPanelVariantValues = () => {
  return axios
    .get('/panel/variant-values')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelVariantValueById = (id: string) => {
  return axios
    .get(`/panel/variant-values/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelVariantValue = (data = {}) => {
  return axios
    .post('/panel/variant-values', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelVariantValue = (id: string, data = {}) => {
  return axios
    .put(`/panel/variant-values/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelVariantValue = (id: string) => {
  return axios
    .delete(`/panel/variant-values/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
