'use client';
import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';
import { SelectContext } from '.';

interface Props {
  children?: ReactNode;
  className?: string;
}

const SelectList = ({ children, className }: Props) => {
  const { show } = useContext(SelectContext);

  if (!show) return null;

  return (
    <div
      className={cn(
        'absolute top-full left-0 z-20',
        'w-full max-h-[250px] overflow-y-auto',
        'bg-white p-2',
        'rounded-b-md box-border border border-t-0 border-slate-200',
        'flex flex-col gap-0.5',
        'no-scrollbar',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SelectList;
