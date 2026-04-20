import axios from './baseService';

export const fetchCategories = () => {
  return axios
    .get('/categories')
    .then((res) => {
      // API response bir object içinde array dönebilir (örn: { data: [...] })
      // veya direkt array dönebilir
      let categories = res.data;
      if (categories && typeof categories === 'object' && !Array.isArray(categories)) {
        // Eğer object ise, data veya categories property'sini kontrol et
        categories = categories.data || categories.categories || categories.items || [];
      }
      // Array kontrolü
      const safeCategories = Array.isArray(categories) ? categories : [];
      return [null, safeCategories];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchCategoryBySlug = (slug: string) => {
  return axios
    .get(`/categories/${slug}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

// panel
export const fetchPanelCategories = () => {
  return axios
    .get('/panel/categories')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelCategoryById = (slug: string) => {
  return axios
    .get(`/panel/categories/${slug}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelCategory = (data = {}) => {
  return axios
    .post('/panel/categories', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelCategory = (id: string, data = {}) => {
  return axios
    .put(`/panel/categories/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelCategory = (id: string) => {
  return axios
    .delete(`/panel/categories/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
