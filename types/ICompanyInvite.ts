export interface ICompanyInvite {
  id: string;
  companyId: string;
  code: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  usedBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  usedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
