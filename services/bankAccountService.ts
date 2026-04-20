import axios from './baseService';

export const fetchBankAccounts = () => {
  return axios
    .get('/bank-accounts')
    .then((res) => [null, res.data])
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const fetchBankAccountById = (id: string) => {
  return axios
    .get(`/bank-accounts/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

// panel
export const fetchPanelBankAccounts = () => {
  return axios
    .get('/panel/bank-accounts')
    .then((res) => [null, res.data])
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelBankAccountById = (id: string) => {
  return axios
    .get(`/panel/bank-accounts/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelBankAccount = (data = {}) => {
  return axios
    .post('/panel/bank-accounts', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelBankAccount = (id: string, data = {}) => {
  return axios
    .put(`/panel/bank-accounts/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelBankAccount = (id: string) => {
  return axios
    .delete(`/panel/bank-accounts/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
