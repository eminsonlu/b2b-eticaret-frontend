import axios from './baseService';

export const login = (email: string, password: string) => {
  return axios
    .post('/login', { email, password })
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const register = (data = {}) => {
  return axios
    .post('/register', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const fetchMe = () => {
  return axios
    .get('/me')
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const forgotPassword = (email: string) => {
  return axios
    .post('/user/forgot-password', { email })
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const resetPassword = (token: string, newPassword: string) => {
  return axios
    .post('/user/reset-password', { token, newPassword })
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const verifyEmail = (token: string) => {
  return axios
    .post('/user/verify-email', { token })
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const resendEmailVerification = (email: string) => {
  return axios
    .post('/user/resend-verification', { email })
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const sendEmailVerification = () => {
  return axios
    .post('/user/send-email-verification')
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
