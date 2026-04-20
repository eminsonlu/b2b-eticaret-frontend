import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';

type BadgeColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'gray'
  | 'pink'
  | 'indigo'
  | 'orange'
  | 'teal';

const cn = classNames.bind({
  red: 'bg-red-400 text-white',
  blue: 'bg-blue-400 text-white',
  green: 'bg-green-400 text-white',
  yellow: 'bg-yellow-400 text-white',
  purple: 'bg-purple-400 text-white',
  gray: 'bg-gray-400 text-white',
  pink: 'bg-pink-400 text-white',
  indigo: 'bg-indigo-400 text-white',
  orange: 'bg-orange-400 text-white',
  teal: 'bg-teal-400 text-white',
});

const Badge = ({
  color = 'blue',
  children,
  square = false,
  className,
}: {
  color?: BadgeColor;
  children: ReactNode;
  square?: boolean;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'text-xs',
        'h-[20px]',
        'px-2 py-2',
        'flex items-center justify-center',
        'rounded',
        {
          'w-[20px] !p-0': square,
        },
        color,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
