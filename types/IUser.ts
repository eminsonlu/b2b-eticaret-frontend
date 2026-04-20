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
  company: ICompany | null;
  createdAt: string;
}
