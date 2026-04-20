import axios from './baseService';

export const fetchCouponByCode = (code: string) => {
  return axios
    .get(`/coupons/${code}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

// panel
export const fetchPanelCoupons = () => {
  return axios
    .get('/panel/coupons')
    .then((res) => [null, res.data])
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelCouponById = (id: string) => {
  return axios
    .get(`/panel/coupons/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelCoupon = (data = {}) => {
  return axios
    .post('/panel/coupons', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelCoupon = (id: string, data = {}) => {
  return axios
    .put(`/panel/coupons/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelCoupon = (id: string) => {
  return axios
    .delete(`/panel/coupons/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
