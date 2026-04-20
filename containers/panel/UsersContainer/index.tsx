'use client';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import IUser from '@/types/IUser';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import Table from '@/components/shared/Table';
import EditUserModal from '@/components/panel/EditUserModal';
import { useAuthStore } from '@/stores/authStore';

const UsersContainer = ({ users = [] }: { users: IUser[] }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showModals, setShowModals] = useState<string[]>([]);

  const COLUMNS = [
    {
      title: 'Ad Soyad',
      content: (row: IUser) => `${row.firstName} ${row.lastName}`,
    },
    {
      title: 'Rol',
      content: (row: IUser) => (!row.role ? 'Kullanıcı' : row.role.title),
      className: 'w-[250px] max-w-[250px]',
    },
    {
      title: 'Email',
      content: (row: IUser) => row.email,
      className: 'w-[250px] max-w-[250px]',
    },
    {
      title: 'Telefon',
      content: (row: IUser) => row.phone,
      className: 'w-[225px] max-w-[225px]',
    },
    {
      title: 'Kayıt Tarihi',
      content: (row: IUser) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[175px] max-w-[175px]',
    },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: IUser) => {
        setSelectedUserId(row.id);
        setShowModals((pre) => [...pre, 'edit']);
      },
      hidden: !user?.role?.user?.includes('UPDATE'),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Kullanıcılar</h1>
      </div>

      <Table columns={COLUMNS} actions={actions} data={users} />

      {selectedUserId && (
        <EditUserModal
          id={selectedUserId}
          show={showModals.includes('edit')}
          onClose={() =>
            setShowModals((pre) => pre.filter((m) => m !== 'edit'))
          }
          onEdit={() => router.refresh()}
        />
      )}
    </>
  );
};

export default UsersContainer;
