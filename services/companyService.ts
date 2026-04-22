import axios from './baseService';
import { ICompany } from '@/types/ICompany';
import { ICompanyInvite } from '@/types/ICompanyInvite';

export const getCompanies = async () => {
  return axios
    .get('/panel/companies')
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const getCompany = async (id: string) => {
  return axios
    .get(`/panel/companies/${id}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const createCompany = async (data: {
  name: string;
  taxNumber: string;
  taxOffice?: string;
  address?: string;
  priceGroup?: number;
  discountRate?: number;
}) => {
  return axios
    .post('/panel/companies', data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const updateCompany = async (
  id: string,
  data: {
    name?: string;
    taxNumber?: string;
    taxOffice?: string;
    address?: string;
    priceGroup?: number;
    discountRate?: number;
  }
) => {
  return axios
    .put(`/panel/companies/${id}`, data)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const createInvite = async (companyId: string) => {
  return axios
    .post(`/panel/companies/${companyId}/invite`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const getInvites = async (companyId: string) => {
  return axios
    .get(`/panel/companies/${companyId}/invites`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const getCompanyUsers = async (companyId: string) => {
  return axios
    .get(`/panel/companies/${companyId}/users`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};
