'use client';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ITag from '@/types/ITag';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { deletePanelTag } from '@/services/tagService';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import CreateTagModal from '@/components/panel/CreateTagModal';
import EditTagModal from '@/components/panel/EditTagModal';
import { useAuthStore } from '@/stores/authStore';

const TagsContainer = ({ tags = [] }: { tags: ITag[] }) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [showModals, setShowModals] = useState<string[]>([]);

  const handleRemove = async (tag: ITag) => {
    const [err, data] = await deletePanelTag(tag.id);
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
      content: (row: ITag) => row.title,
    },
    {
      title: 'Oluşturma Tarihi',
      content: (row: ITag) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[225px] max-w-[225px]',
    },
    {
      title: 'Güncellenme Tarihi',
      content: (row: ITag) => DateTime.fromISO(row.updatedAt).toRelative(),
      className: 'w-[225px] max-w-[225px]',
    },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: ITag) => {
        setSelectedTagId(row.id);
        setShowModals((pre) => [...pre, 'edit']);
      },
      hidden: !user?.role?.tag?.includes('UPDATE'),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: 'Sil',
      action: (row: ITag) => handleRemove(row),
      hidden: !user?.role?.tag?.includes('DELETE'),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Etiketler</h1>
        {user?.role?.tag?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => setShowModals((pre) => [...pre, 'create'])}
          >
            Yeni Ekle
          </Button>
        )}
      </div>

      <Table columns={COLUMNS} actions={actions} data={tags} />

      <CreateTagModal
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={() => router.refresh()}
      />

      {selectedTagId && (
        <EditTagModal
          id={selectedTagId}
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

export default TagsContainer;
