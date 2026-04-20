import axios from './baseService';

export const fetchWishList = () => {
  return axios
    .get('/wish-list')
    .then((res) => [null, res.data])
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const createWishList = (productId: string) => {
  return axios
    .post(`/wish-list/${productId}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const deleteWishList = (productId: string) => {
  return axios
    .delete(`/wish-list/${productId}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
