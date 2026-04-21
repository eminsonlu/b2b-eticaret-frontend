import baseService from './baseService';
import { ICompany } from '@/types/ICompany';
import { ICompanyInvite } from '@/types/ICompanyInvite';

const companyService = {
  async getCompanies() {
    return baseService
      .get('/panel/companies')
      .then((res) => [null, res.data])
      .catch((error) => [error?.response?.data, null]);
  },

  async getCompany(id: string) {
    return baseService
      .get(`/panel/companies/${id}`)
      .then((res) => [null, res.data])
      .catch((error) => [error?.response?.data, null]);
  },

  async createCompany(data: {
    name: string;
    taxNumber: string;
    taxOffice?: string;
    address?: string;
    priceGroup?: number;
    discountRate?: number;
  }) {
    return baseService
      .post('/panel/companies', data)
      .then((res) => [null, res.data])
      .catch((error) => [error?.response?.data, null]);
  },

  async updateCompany(
    id: string,
    data: {
      name?: string;
      taxNumber?: string;
      taxOffice?: string;
      address?: string;
      priceGroup?: number;
      discountRate?: number;
    }
  ) {
    return baseService
      .put(`/panel/companies/${id}`, data)
      .then((res) => [null, res.data])
      .catch((error) => [error?.response?.data, null]);
  },

  async createInvite(companyId: string) {
    return baseService
      .post(`/panel/companies/${companyId}/invite`)
      .then((res) => [null, res.data])
      .catch((error) => [error?.response?.data, null]);
  },

  async getInvites(companyId: string) {
    return baseService
      .get(`/panel/companies/${companyId}/invites`)
      .then((res) => [null, res.data])
      .catch((error) => [error?.response?.data, null]);
  },
};

export default companyService;
