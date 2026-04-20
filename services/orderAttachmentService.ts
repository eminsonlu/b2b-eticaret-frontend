import axios from './baseService';

export const fetchOrderAttachments = (orderItemId: string) => {
  return axios
    .get(`/order-attachments/${orderItemId}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const createOrderAttachment = (orderId: string, data = {}) => {
  return axios
    .post(`/order-attachments/${orderId}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

// panel
export const fetchPanelOrderAttachments = (orderItemId: string) => {
  return axios
    .get(`/panel/order-attachments/${orderItemId}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
