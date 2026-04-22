import IRole from './IRole';
import { ICompany } from './ICompany';

export default interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: null | IRole;
  companyId: string | null;
  priceGroup: number | null;
  discountRate: number | null;
  isCompanyAdmin: boolean;
  company: ICompany | null;
  createdAt: string;
}
