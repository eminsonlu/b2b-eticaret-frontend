import { IExtendedCategory } from '@/types/ICategory';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Image from 'next/image';
import { useOnHamburgerMenuClose } from '@/hooks/useOnHamburgerMenuClose';

const SubCategoriesItem = ({
  subCategory,
}: {
  subCategory: IExtendedCategory;
}) => {
  const [subOpen, setSubOpen] = React.useState<boolean>(false);
  useOnHamburgerMenuClose(() => setSubOpen(false));

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href={`/${subCategory.slug}`}
          className={classNames(
            'flex rounded items-center text-sm font-medium text-slate-600 w-full',
            subCategory.thumbnail ? 'min-h-[35px]' : 'py-1'
          )}
        >
          {subCategory.thumbnail && (
            <Image
              loader={({ src }) => src}
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/${subCategory.thumbnail}`}
              width={25}
              height={25}
              alt={subCategory.title}
              title={subCategory.title}
              className="rounded mr-2"
              unoptimized
            />
          )}

          {subCategory.title}
        </Link>
        {subCategory.subCategories.length > 0 && (
          <span
            onClick={() => setSubOpen(!subOpen)}
            className="ml-auto flex items-center justify-end h-full"
          >
            <IoIosArrowDown
              size={16}
              className={`inline-block transition-transform ${
                subOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </span>
        )}
      </div>
      <div className="pt-2">
        {subCategory.subCategories.length > 0 && subOpen && (
          <div className="pl-2">
            {subCategory.subCategories.map((childCategory, idx) => (
              <SubCategoriesItem key={idx} subCategory={childCategory} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategoriesItem;
