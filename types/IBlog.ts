import IProduct from './IProduct';

export default interface IBlog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  userId: string;
  createdAt: string;
  updatedAt: string;
  products?: IProduct[];
}