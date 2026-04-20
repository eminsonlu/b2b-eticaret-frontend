'use client';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import IRole from '@/types/IRole';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { deletePanelUserRole } from '@/services/userRoleService';
import { useNotificationStore } from '@/stores/notificationStore';
import Table from '@/components/shared/Table';
import Button from '@/components/shared/Button';
import { useAuthStore } from '@/stores/authStore';

const UserRolesContainer = ({ roles = [] }: { roles: IRole[] }) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const handleRemove = async (user: IRole) => {
    const [err, data] = await deletePanelUserRole(user.id);
    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }
    router.refresh();
  };

  const COLUMNS = [
    {
      title: 'Başlık',
      content: (row: IRole) => row.title,
    },
    {
      title: 'Admin mi?',
      content: (row: IRole) => (row.isAdmin ? 'Evet' : 'Hayır'),
      className: 'w-[150px] max-w-[150px]',
    },
    {
      title: 'Eklenme Tar.',
      content: (row: IRole) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[225px] max-w-[225px]',
    },
    {
      title: 'Güncellenme Tar.',
      content: (row: IRole) =>
        DateTime.fromISO(row.updatedAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[225px] max-w-[225px]',
    },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: IRole) => {
        router.push(`/panel/users/roles/${row.id}`);
      },
      hidden: !user?.role?.userRole?.includes('UPDATE'),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: 'Sil',
      action: (row: IRole) => handleRemove(row),
      hidden: !user?.role?.userRole?.includes('DELETE'),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Yetkilendirme</h1>
        {user?.role?.userRole?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => router.push('/panel/users/roles/create')}
          >
            Yeni Ekle
          </Button>
        )}
      </div>

      <Table columns={COLUMNS} actions={actions} data={roles} />
    </>
  );
};

export default UserRolesContainer;
