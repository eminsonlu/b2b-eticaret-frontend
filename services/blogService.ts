import axios from './baseService';

export const fetchBlogs = () => {
  return axios
    .get('/blogs')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const fetchFeaturedBlogs = () => {
  return axios
    .get('/blogs/featured')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const fetchBlogBySlug = (slug: string) => {
  return axios
    .get(`/blogs/${slug}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const fetchPanelBlogs = () => {
  return axios
    .get('/panel/blogs')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const fetchPanelBlogById = (id: string) => {
  return axios
    .get(`/panel/blogs/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

export const createPanelBlog = (data = {}) => {
  return axios
    .post('/panel/blogs', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const updatePanelBlog = (id: string, data = {}) => {
  return axios
    .put(`/panel/blogs/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const deletePanelBlog = (id: string) => {
  return axios
    .delete(`/panel/blogs/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};