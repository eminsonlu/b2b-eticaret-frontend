import axios from "./baseService";

export const fetchOrders = (params = {}) => {
  return axios
    .get("/orders", { params: { ...params } })
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchOrderById = (id: string) => {
  return axios
    .get(`/orders/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createOrder = (data = {}) => {
  return axios
    .post("/orders", data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

// panel
export const fetchPanelOrders = (params = {}) => {
  return axios
    .get("/panel/orders", { params: { ...params } })
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelOrderById = (id: string) => {
  return axios
    .get(`/panel/orders/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const updatePanelOrderById = (id: string, data: any = {}) => {
  return axios
    .put(`/panel/orders/${id}`, data)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
