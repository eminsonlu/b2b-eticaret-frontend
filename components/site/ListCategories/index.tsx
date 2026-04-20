import ICategory from '@/types/ICategory';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import Image from 'next/image';

interface IExtendedCategory extends ICategory {
  subCategories: IExtendedCategory[];
}

const SubCategories = ({
  className = '',
  categories = [],
}: {
  className?: string;
  categories: IExtendedCategory[];
}) => {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  return (
    <div
      className={classNames(
        'bg-white w-[275px]',
        'absolute z-20 top-full left-0',
        'border border-slate-200 rounded-md',
        'hidden p-2 box-border shadow-sm flex-col group-hover:flex',
        className
      )}
    >
      {categories.map((subCategory: IExtendedCategory, index: number) => (
        <div
          key={index}
          className="relative"
          onMouseOver={() => setHoverIndex(index)}
          onMouseOut={() => setHoverIndex(null)}
        >
          <Link
            href={`/${subCategory.slug}`}
            className="w-full min-h-[35px] flex p-1.5 rounded items-center text-sm font-medium text-slate-600 hover:text-black hover:bg-primary-100/30"
          >
            {subCategory.thumbnail && (
              <Image
                loader={({ src }) => src}
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/${subCategory.thumbnail}`}
                width={30}
                height={30}
                alt={subCategory.title}
                title={subCategory.title}
                className="rounded mr-2"
                unoptimized
              />
            )}

            {subCategory.title}
            {subCategory.subCategories.length > 0 && (
              <FiChevronRight size={16} className="inline-block ml-auto" />
            )}
          </Link>

          {subCategory.subCategories.length > 0 && (
            <SubCategories
              categories={subCategory.subCategories}
              className={classNames('!left-[80%] top-1/2 -translate-y-1/2', {
                '!hidden': hoverIndex !== index,
              })}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const CategoryItem = ({ category }: any) => {
  return (
    <div className="relative group">
      <Link
        href={`/${category.slug}`}
        className="text-sm font-medium text-slate-600 hover:text-black"
      >
        {category.title}
        {category.subCategories.length > 0 && (
          <IoIosArrowDown className="inline-block ml-1" />
        )}
      </Link>

      {category.subCategories.length > 0 && (
        <SubCategories categories={category.subCategories} />
      )}
    </div>
  );
};

const ListCategories = ({ categories = [] }: { categories: ICategory[] }) => {
  const groupCategories = (cats: ICategory[]): any => {
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

  return groupedCategories.map((category: IExtendedCategory, index: number) => (
    <CategoryItem
      key={index}
      category={category}
      subCategories={category.subCategories ? category.subCategories : []}
    />
  ));
};

export default ListCategories;
