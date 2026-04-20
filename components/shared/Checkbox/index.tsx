import React from 'react';
import classNames from 'classnames/bind';
import { BsCheckLg } from 'react-icons/bs';

const cn = classNames.bind({
  small: 'min-w-4 w-4 h-4',
  medium: 'min-w-6 w-6 h-6',
  large: 'min-w-8 w-8 h-8',
});

interface Props {
  className?: string;
  value: boolean;
  onChange: (val: boolean) => void;
  size?: 'small' | 'medium' | 'large';
}

const Checkbox = ({ className, value, onChange, size = 'medium' }: Props) => {
  return (
    <div
      className={cn(
        'group',
        'flex items-center justify-center',
        'border-2  hover:border-primary rounded-md cursor-pointer',
        'aspect-square',
        {
          'border-slate-200': !value,
          'border-primary': value,
        },
        className,
        size
      )}
      onClick={() => onChange(!value)}
    >
      <BsCheckLg
        size={20}
        className={cn('text-primary hidden group-hover:block', {
          '!block': value,
        })}
      />
    </div>
  );
};

export default Checkbox;
