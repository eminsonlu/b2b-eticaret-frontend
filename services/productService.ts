import axios from './baseService';

export const fetchProducts = (params = {}) => {
  return axios
    .get('/products', { params: { ...params } })
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchProductBySlug = (slug: string, params = {}) => {
  return axios
    .get(`/products/${slug}`, {
      params: {
        ...params,
      },
    })
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

// panel
export const fetchPanelProducts = (params = {}) => {
  return axios
    .get('/panel/products', { params: { ...params } })
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelProductById = (id: string, params = {}) => {
  return axios
    .get(`/panel/products/${id}`, {
      params: {
        ...params,
      },
    })
    .then((res) => [null, res.data])
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelVariantProduct = (id: string, params = {}) => {
  return axios
    .get(`/panel/products/${id}/variant`, { params: { ...params } })
    .then((res) => [null, res.data])
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelProduct = (data = {}) => {
  return axios
    .post('/panel/products', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelProduct = (id: string, data = {}) => {
  return axios
    .put(`/panel/products/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelProduct = (id: string) => {
  return axios
    .delete(`/panel/products/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const exportPanelProducts = (fields: string[] = []) => {
  return axios
    .post('/panel/products/export', { fields }, {
      responseType: 'blob',
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `products_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return [null, 'Export completed'];
    })
    .catch((error) => [error?.response?.data, null]);
};

export const exportPanelProductsToGoogleMerchant = () => {
  return axios
    .post('/panel/products/export/google-merchant', {}, {
      responseType: 'blob',
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `google-merchant-products_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return [null, 'Export completed'];
    })
    .catch((error) => [error?.response?.data, null]);
};

export const copyPanelProduct = (id: string, newTitle: string) => {
  return axios
    .post(`/panel/products/${id}/copy`, { newTitle })
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
