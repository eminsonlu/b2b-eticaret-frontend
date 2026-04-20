import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { IoIosArrowDown } from 'react-icons/io';
import { useOnHamburgerMenuClose } from '@/hooks/useOnHamburgerMenuClose';
import SubCategories from './MobileListCategoriesSubCategories';
import type { IExtendedCategory } from './MobileListCategoriesSubCategories';

interface CategoryItemProps {
  category: IExtendedCategory;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const [open, setOpen] = React.useState(false);
  useOnHamburgerMenuClose(() => setOpen(false));

  return (
    <div className="cursor-pointer pb-3">
      <div
        className={classNames(
          'group/categoryItem flex items-center gap-4 justify-between',
          open ? 'pb-3' : ''
        )}
      >
        <Link
          href={`/${category.slug}`}
          className="text-sm font-medium text-slate-600 w-full flex items-center"
        >
          {category.thumbnail && (
            <Image
              loader={({ src }) => src}
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/${category.thumbnail}`}
              width={25}
              height={25}
              alt={category.title}
              title={category.title}
              className="rounded mr-2"
              unoptimized
            />
          )}
          {category.title}
        </Link>
        {category.subCategories.length > 0 && (
          <span
            onClick={() => setOpen(!open)}
            className="ml-auto flex items-center justify-end"
          >
            <IoIosArrowDown
              className={classNames(
                'inline-block transition-transform rotate-0',
                {
                  'rotate-180': open,
                }
              )}
            />
          </span>
        )}
      </div>

      {category.subCategories.length > 0 && (
        <SubCategories open={open} categories={category.subCategories} />
      )}
    </div>
  );
};

export default CategoryItem;
