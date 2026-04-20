'use client';
import classNames from 'classnames/bind';
import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

interface Props {
  title?: string;
  show?: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'xSmall' | 'small' | 'medium' | 'large';
  className?: string;
}

const cn = classNames.bind({
  xSmall: 'md:w-[20vw]',
  small: 'md:w-[30vw]',
  medium: 'md:w-[45vw]',
  large: 'md:w-[60vw]',
});

const Modal = ({
  show,
  title,
  onClose,
  size = 'medium',
  children,
  className,
}: Props) => {
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return;

  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 z-40 cursor-pointer bg-black/40 w-full h-full transition-all duration-500"
        onClick={onClose}
      ></div>

      <div
        className={cn(
          'w-[90vw]',
          'bg-white',
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
          'p-6 rounded-md box-border',
          'flex flex-col gap-4',
          size
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <IoClose
            className="text-black/50 cursor-pointer hover:text-black"
            size={24}
            onClick={onClose}
          />
        </div>

        <div
          className={cn(
            'max-h-[85vh] overflow-y-scroll no-scrollbar md:max-h-[80vh]',
            className
          )}
        >
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
