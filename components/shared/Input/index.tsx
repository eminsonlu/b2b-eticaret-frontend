import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames/bind';

const cn = classnames.bind({
  small: 'h-[32px] text-xs',
  medium: 'h-[40px] text-sm',
  large: 'h-[48px]',
});

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  label?: string;
  error?: string | boolean;
  size?: 'small' | 'medium' | 'large';
}

const Input = ({
  className,
  label,
  error,
  size = 'medium',
  placeholder,
  ...args
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <span className="text-sm text-black/80">{label}</span>}
      <input
        placeholder={placeholder || label}
        className={cn(
          'w-full px-3 resize-none bg-white',
          'rounded-md box-border border border-slate-200',
          'outline-none focus:border-orange-400',
          'disabled:bg-slate-50',
          { '!border-red-400': error },
          className,
          size
        )}
        spellCheck="false"
        {...args}
      />
      {error && <span className="text-sm italic text-red-400">{error}</span>}
    </div>
  );
};

export default Input;
