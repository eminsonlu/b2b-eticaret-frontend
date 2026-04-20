'use client';
import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import IBlog from '@/types/IBlog';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { deletePanelBlog } from '@/services/blogService';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import CreateBlogModal from '@/components/panel/CreateBlogModal';
import EditBlogModal from '@/components/panel/EditBlogModal';
import { useAuthStore } from '@/stores/authStore';

const BlogsContainer = ({ blogs = [] }: { blogs: IBlog[] }) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showModals, setShowModals] = useState<string[]>([]);

  const handleRemove = async (blog: IBlog) => {
    const [err, data] = await deletePanelBlog(blog.id);
    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }
    router.refresh();
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      DRAFT: 'bg-gray-100 text-gray-800',
      PUBLISHED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-red-100 text-red-800',
    };
    const colorClass =
      colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {status}
      </span>
    );
  };

  const COLUMNS = [
    {
      title: 'Başlık',
      content: (row: IBlog) => row.title,
    },
    {
      title: 'Durum',
      content: (row: IBlog) => getStatusBadge(row.status),
      className: 'w-[120px] max-w-[120px]',
    },
    {
      title: 'Ürün Sayısı',
      content: (row: IBlog) => row.products?.length || 0,
      className: 'w-[120px] max-w-[120px]',
    },
    {
      title: 'Oluşturma Tarihi',
      content: (row: IBlog) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[225px] max-w-[225px]',
    },
    {
      title: 'Güncellenme Tarihi',
      content: (row: IBlog) => DateTime.fromISO(row.updatedAt).toRelative(),
      className: 'w-[225px] max-w-[225px]',
    },
  ];

  const actions = [
    {
      icon: <FiEye size={16} />,
      title: 'Görüntüle',
      action: (row: IBlog) => {
        window.open(`/blog/${row.slug}`, '_blank');
      },
    },
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: IBlog) => {
        setSelectedBlogId(row.id);
        setShowModals((pre) => [...pre, 'edit']);
      },
      hidden: !user?.role?.blog?.includes('UPDATE'),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: 'Sil',
      action: (row: IBlog) => handleRemove(row),
      hidden: !user?.role?.blog?.includes('DELETE'),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Blog Yazıları</h1>
        {user?.role?.blog?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => setShowModals((pre) => [...pre, 'create'])}
          >
            Yeni Ekle
          </Button>
        )}
      </div>

      <Table columns={COLUMNS} actions={actions} data={blogs} />

      <CreateBlogModal
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={() => router.refresh()}
      />

      {selectedBlogId && (
        <EditBlogModal
          id={selectedBlogId}
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

export default BlogsContainer;