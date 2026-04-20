import ITag from '@/types/ITag';
import Link from 'next/link';
import React from 'react';

const ProductTags = ({ tags }: { tags: ITag[] }) => {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {tags.map((tag: any, index: number) => (
        <Link
          href={`/ara?s=${tag.title}`}
          key={index}
          className="px-2 py-1 text-xs bg-primary-200/25 text-primary-500 rounded hover:bg-primary-200/50"
        >
          {tag.title}
        </Link>
      ))}
    </div>
  );
};

export default ProductTags;
