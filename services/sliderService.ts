import axios from './baseService';

export const fetchSliderByKey = (key: string) => {
  return axios
    .get(`/sliders/${key}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};

// panel
export const fetchPanelSliders = () => {
  return axios
    .get('/panel/sliders')
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelSliderItems = (sliderId: string) => {
  return axios
    .get(`/panel/sliders/${sliderId}/items`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelSliderById = (id: string) => {
  return axios
    .get(`/panel/sliders/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const fetchPanelSliderItem = (id: string, sliderId: string) => {
  return axios
    .get(`/panel/sliders/${sliderId}/items/${id}`)
    .then((res) => {
      return [null, res.data];
    })
    .catch((error) => {
      return [error?.response?.data, null];
    });
};
export const createPanelSlider = (data = {}) => {
  return axios
    .post('/panel/sliders', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const createPanelSliderItem = (sliderId: string, data = {}) => {
  return axios
    .post(`/panel/sliders/${sliderId}/items`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelSlider = (id: string, data = {}) => {
  return axios
    .put(`/panel/sliders/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const updatePanelSliderItem = (
  id: string,
  sliderId: string,
  data = {}
) => {
  return axios
    .put(`/panel/sliders/${sliderId}/items/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelSlider = (id: string) => {
  return axios
    .delete(`/panel/sliders/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
export const deletePanelSliderItem = (id: string, sliderId: string) => {
  return axios
    .delete(`/panel/sliders/${sliderId}/items/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
