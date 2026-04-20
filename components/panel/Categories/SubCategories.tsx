import React from 'react';
import CategoryItem from './CategoryItem';
import { IExtendedCategory } from '@/types/ICategory';

const SubCategories = ({ categories }: { categories: IExtendedCategory[] }) => {
  return (
    <div className="ml-8 flex flex-col gap-2">
      {categories.map((category: IExtendedCategory, index: number) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  );
};

export default SubCategories;
