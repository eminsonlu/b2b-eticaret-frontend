'use client';
import React, {
  createContext,
  ReactNode,
  SelectHTMLAttributes,
  useState,
} from 'react';
import cn from 'classnames';
import Input from '../Input';
import { IoChevronDownOutline } from 'react-icons/io5';
import SelectList from './SelectList';
import SelectOption from './SelectOption';

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  className?: string;
  label?: string;
  error?: string | boolean;
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  onSelect: (value: any) => void;
  options: any[];
  value?: any;
}

export const SelectContext = createContext<{
  show: boolean;
  setShow: (show: boolean) => void;
  handleOnSelect: (value: any) => void;
  currentValue?: any;
}>({
  show: false,
  setShow: () => {},
  handleOnSelect: () => {},
});

const Select = ({
  className,
  label,
  error,
  size = 'medium',
  children,
  onSelect,
  options = [],
  value,
}: Props) => {
  const [show, setShow] = useState(false);

  const selectedValue = options.find((option) => option.value === value);

  const handleOnSelect = (value: any) => {
    setShow(false);
    onSelect(value);
  };

  return (
    <SelectContext.Provider
      value={{ show, setShow, handleOnSelect, currentValue: value }}
    >
      <div className={cn('w-full flex flex-col gap-1', className)}>
        {label && <span className="text-sm text-black/80">{label}</span>}

        <div className="w-full relative">
          <Input
            size={size}
            value={selectedValue?.label}
            readOnly
            placeholder="Seçiniz"
            className={cn('cursor-pointer', { '!rounded-b-none': show })}
            onClick={() => setShow(!show)}
            autoComplete="off"
          />
          <IoChevronDownOutline
            className={cn(
              'absolute right-2 top-3',
              'transition-all duration-200',
              'text-slate-400',
              { 'rotate-180': show }
            )}
          />

          <SelectList>
            {children
              ? children
              : options.map((option, index) => (
                  <SelectOption key={index} value={option.value}>
                    {option.label}
                  </SelectOption>
                ))}
          </SelectList>
        </div>

        {error && <span className="text-sm italic text-red-400">{error}</span>}
      </div>
    </SelectContext.Provider>
  );
};

Select.SelectList = SelectList;
Select.Option = SelectOption;

export default Select;
