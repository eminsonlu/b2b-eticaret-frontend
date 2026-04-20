import ICategory from "@/types/ICategory";
import classNames from "classnames";
import React from "react";
import SubCategoriesItem from "./MobileListCategoriesSubCategoriesItem";

interface IExtendedCategory extends ICategory {
  subCategories: IExtendedCategory[];
}

const SubCategories = ({
  className = "",
  categories = [],
  open,
}: {
  className?: string;
  categories: IExtendedCategory[];
  open: boolean;
}) => {
  return (
    <div
      className={classNames(
        "bg-white w-full",
        "pl-2 pt-2 box-border flex-col border-t border-slate-100",
        "transition-all duration-300",
        open ? "flex" : "hidden",
        className
      )}
    >
      {categories.map((subCategory: IExtendedCategory, index: number) => (
        <SubCategoriesItem key={index} subCategory={subCategory} />
      ))}
    </div>
  );
};

export default SubCategories;
export type { IExtendedCategory };
