import ICategory, { IExtendedCategory } from '@/types/ICategory';
import React from 'react';
import CategoryItem from './CategoryItem';

const Categories = ({ categories = [] }: { categories: ICategory[] }) => {
  const groupCategories: any = (cats: ICategory[]) => {
    return cats.map((cat: ICategory) => {
      const subCategories = categories.filter((c) => c.parentId === cat.id);
      return {
        ...cat,
        subCategories:
          subCategories.length > 0 ? groupCategories(subCategories) : [],
      };
    });
  };

  const groupedCategories = groupCategories(
    categories.filter((i) => !i.parentId)
  );

  return (
    <div className="w-full flex flex-col gap-2">
      {groupedCategories.map((category: IExtendedCategory, index: number) => (
        <CategoryItem key={index} category={category} border={false} />
      ))}
    </div>
  );
};

export default Categories;
