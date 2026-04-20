export default interface ICategory {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  parentId: null | string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
}

export interface IExtendedCategory extends ICategory {
  subCategories: IExtendedCategory[];
}
