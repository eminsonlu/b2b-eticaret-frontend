import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';
import { MultiSelectContext } from './MultiSelect';
import { IoIosClose } from 'react-icons/io';

interface Props {
  children?: ReactNode;
  label: any;
  value: any;
}

const MultiSelectItem = ({ children, value, label }: Props) => {
  const { selecteds, handleOnRemove } = useContext(MultiSelectContext);

  if (selecteds.findIndex((item: any) => item == value) === -1) {
    return null;
  }

  return (
    <div
      className={cn(
        'text-sm bg-slate-100 hover:bg-slate-200',
        'px-3 py-2',
        'rounded',
        'flex items-center gap-2'
      )}
    >
      {children ? children : label}
      <IoIosClose
        className="cursor-pointer"
        onClick={() => handleOnRemove(value)}
      />
    </div>
  );
};

export default MultiSelectItem;
