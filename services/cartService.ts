import axios from './baseService';

export const fetchCart = () => {
  return axios
    .get('/cart')
    .then((res) => [null, res.data])
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const createCart = (productId: string) => {
  return axios
    .post(`/cart/${productId}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const updateCartItemQuantity = (productId: string, data = {}) => {
  return axios
    .put(`/cart/${productId}/quantity`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deleteCart = (productId: string) => {
  return axios
    .delete(`/cart/${productId}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
