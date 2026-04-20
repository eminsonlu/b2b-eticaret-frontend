import React from "react";
import ICategory from "@/types/ICategory";
import CategoryItem from "./MobileListCategoriesItem";
import type { IExtendedCategory } from "./MobileListCategoriesSubCategories";

interface ListCategoriesProps {
  categories: ICategory[];
}

const ListCategories: React.FC<ListCategoriesProps> = ({ categories = [] }) => {
  const groupCategories = (cats: ICategory[]): IExtendedCategory[] => {
    return cats?.map((cat: ICategory) => {
      const subCategories = categories.filter((c) => c.parentId === cat.id);
      return {
        ...cat,
        subCategories:
          subCategories.length > 0 ? groupCategories(subCategories) : [],
      };
    });
  };

  const groupedCategories = groupCategories(
    categories?.filter((i) => !i.parentId)
  );

  return (
    <div className="flex flex-col gap-3 divide-y divide-slate-100">
      {groupedCategories.map((category: IExtendedCategory) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default ListCategories;