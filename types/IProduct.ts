import ICategory from './ICategory';
import ITag from './ITag';
import IVariant from './IVariant';

export default interface IProduct {
  id: '';
  title: '';
  slug: '';
  sku: '';
  summary: '';
  description: '';
  price: number;
  stock: number;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  isFeatured: boolean;
  isShowStories: boolean;
  isRequireAttachment: boolean;
  attachmentCount: boolean;
  thumbnail: '';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  type: 'SIMPLE' | 'VARIABLE';
  userId: '';
  createdAt: '';
  updatedAt: '';
  categories: ICategory[];
  tags: ITag[];
  images: string[];
  fields: string[];
  variants: IVariant[];
  children: IProduct[];
}
