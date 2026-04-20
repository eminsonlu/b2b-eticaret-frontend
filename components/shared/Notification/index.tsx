import classNames from 'classnames/bind';
import React, { ReactNode } from 'react';

const cn = classNames.bind({
  red: 'bg-red-50 border-red-100 text-red-500',
  sky: 'bg-sky-50 border-sky-100 text-sky-500',
  purple: 'bg-purple-50 border-purple-100 text-purple-500',
  orange: 'bg-orange-50 border-orange-100 text-orange-500',
  green: 'bg-green-50 border-green-100 text-green-500',
  blue: 'bg-blue-50 border-blue-100 text-blue-500',
  yellow: 'bg-yellow-50 border-yellow-100 text-yellow-500',
});

interface Props {
  children?: ReactNode;
  color?: 'red' | 'sky' | 'purple' | 'orange' | 'green' | 'blue' | 'yellow';
  className?: string;
}

const Notification = ({ children, color = 'green', className }: Props) => {
  return (
    <div
      className={cn(
        'w-full',
        'text-sm font-normal md:text-base',
        'rounded-md p-4 border box-border',
        color,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Notification;
