import React, { TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

interface Props
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  className?: string;
  label?: string;
  error?: string | boolean;
}

const Textarea = ({ className, label, error, placeholder, ...args }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <span className="text-sm text-black/80">{label}</span>}
      <textarea
        placeholder={placeholder || label}
        className={cn(
          'w-full min-h-[100px] p-3 resize-none',
          'rounded-md box-border border border-slate-200',
          'outline-none focus:border-blue-400',
          { '!border-red-400': error },
          className
        )}
        {...args}
      />
      {error && <span className="text-sm italic text-red-400">{error}</span>}
    </div>
  );
};

export default Textarea;
