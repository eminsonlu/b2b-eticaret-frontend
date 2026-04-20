'use client';
import { useAuthStore } from '@/stores/authStore';
import classNames from 'classnames';
import React from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

interface Props {
  className?: string;
}

const UserSection = ({ className }: Props) => {
  const { user, logout } = useAuthStore();

  const fullName = `${user?.firstName} ${user?.lastName}`;
  const shortedName = fullName
    .split(' ')
    .map((name) => String(name[0]).toLocaleUpperCase())
    .join('');

  return (
    <div className={classNames('flex items-center gap-4', className)}>
      <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] shadow-md bg-blue-500 flex items-center justify-center rounded-full">
        <span className="text-white text-xs">{shortedName}</span>
      </div>
      <div className="flex flex-col min-w-max">
        <strong className="text-sm font-semibold">{fullName}</strong>
        <span className="text-xs text-slate-700 -mt-1">
          {user?.role?.title}
        </span>
      </div>
      <AiOutlineLogout
        size={20}
        className="text-slate-600 hover:text-slate-800 cursor-pointer"
        onClick={logout}
      />
    </div>
  );
};

export default UserSection;
