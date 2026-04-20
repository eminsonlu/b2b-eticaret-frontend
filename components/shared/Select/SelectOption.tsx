'use client';
import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { SelectContext } from '.';

interface Props {
  children?: ReactNode;
  className?: string;
  value?: string | number | boolean | null;
}

const SelectOption = ({ children, className, value }: Props) => {
  const { handleOnSelect, currentValue } = useContext(SelectContext);

  return (
    <div
      className={classNames(
        'w-full h-[35px]',
        'p-2 box-border',
        'flex items-center gap-2',
        'cursor-pointer rounded',
        'text-sm',
        'border border-transparent',
        'hover:bg-primary-100/30 hover:text-primary-700 hover:border-primary-200',
        {
          'bg-primary-100/30 text-primary-700 !border-primary-200':
            value === currentValue,
        },
        className
      )}
      onClick={() => handleOnSelect(value)}
    >
      {children}
    </div>
  );
};

export default SelectOption;
