'use client';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';
import { HiArrowSmRight } from 'react-icons/hi';

const Breadcrumb = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { steps } = useBreadcrumbStore();

  return (
    <div className={classNames('w-full flex items-center gap-2', className)}>
      <Link
        href={pathname.startsWith('/panel') ? '/panel' : '/'}
        className="text-sm text-slate-500 hover:text-black"
      >
        Anasayfa
      </Link>

      {steps.map((step, index) => {
        // Ensure title is a string, not an object
        const title = typeof step.title === 'string' ? step.title : String(step.title || '');
        
        return (
          <Fragment key={index}>
            <HiArrowSmRight className="text-slate-400" />
            <Link
              href={step.path}
              className={classNames('text-sm text-slate-500 hover:text-black', {
                'font-medium !text-primary-400': index === steps.length - 1,
              })}
            >
              {title}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
