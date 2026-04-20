import React, { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames/bind';
import { BiLoaderAlt } from 'react-icons/bi';

const cn = classnames.bind({
  small: 'px-4 h-[32px] text-xs',
  medium: 'px-4 h-[40px] text-sm',
  large: 'px-8 h-[48px]',

  black: 'bg-black hover:opacity-90 text-white',
  white: 'bg-white hover:opacity-90 text-black',
  red: 'bg-red-400 hover:bg-red-500 text-white',
  sky: 'bg-sky-400 hover:bg-sky-500 text-white',
  primary: 'bg-primary-400 hover:bg-primary-500 text-white',
  purple: 'bg-purple-400 hover:bg-purple-500 text-white',
  orange: 'bg-orange-400 hover:bg-orange-500 text-white',
  green: 'bg-green-400 hover:bg-green-500 text-white',
  blue: 'bg-blue-400 hover:bg-blue-500 text-white',
  yellow: 'bg-yellow-400 hover:bg-yellow-500 text-white',
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?:
    | 'primary'
    | 'black'
    | 'white'
    | 'red'
    | 'sky'
    | 'purple'
    | 'orange'
    | 'green'
    | 'blue'
    | 'yellow';
  loading?: boolean;
}

const Button = ({
  className,
  children,
  size = 'medium',
  color = 'blue',
  disabled = false,
  loading = false,
  ...args
}: Props) => {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'w-fit rounded-md cursor-pointer',
        'flex items-center justify-center gap-2',
        'text-center',
        'transition-all duration-200',
        'disabled:!opacity-75 disabled:!cursor-not-allowed disabled:!bg-slate-200 disabled:!text-slate-800',
        'font-medium',
        className,
        size,
        color
      )}
      {...args}
    >
      {loading && <BiLoaderAlt size={18} className="animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
