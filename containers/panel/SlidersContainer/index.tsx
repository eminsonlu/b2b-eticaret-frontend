'use client';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ISlider } from '@/types/ISlider';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { deletePanelSlider } from '@/services/sliderService';
import { useNotificationStore } from '@/stores/notificationStore';
import { TfiLayoutSliderAlt } from 'react-icons/tfi';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import CreateSliderModal from '@/components/panel/CreateSliderModal';
import EditSliderModal from '@/components/panel/EditSliderModal';
import { useAuthStore } from '@/stores/authStore';

const SlidersContainer = ({ sliders = [] }: { sliders: ISlider[] }) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const [selectedSliderId, setSelectedSliderId] = useState<string | null>(null);
  const [showModals, setShowModals] = useState<string[]>([]);

  const handleRemove = async (slider: ISlider) => {
    const [err, data] = await deletePanelSlider(slider.id);
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
      content: (row: ISlider) => row.title,
    },
    {
      title: 'Id',
      content: (row: ISlider) => row.key,
      className: 'w-[150px] max-w-[150px]',
    },
    {
      title: 'Durum',
      content: (row: ISlider) => (row.isActive ? 'Aktif' : 'Pasif'),
      className: 'w-[125px] max-w-[125px]',
    },
    {
      title: 'Oluşturma Tarihi',
      content: (row: ISlider) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[225px] max-w-[225px]',
    },
    {
      title: 'Güncellenme Tarihi',
      content: (row: ISlider) => DateTime.fromISO(row.updatedAt).toRelative(),
      className: 'w-[225px] max-w-[225px]',
    },
  ];

  const actions = [
    {
      icon: <TfiLayoutSliderAlt size={16} />,
      title: 'Öğeler',
      action: (row: ISlider) => {
        router.push(`/panel/sliders/${row.id}/items`);
      },
      hidden: !user?.role?.sliderItem?.includes('READ'),
    },
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: ISlider) => {
        setSelectedSliderId(row.id);
        setShowModals((pre) => [...pre, 'edit']);
      },
      hidden: !user?.role?.slider?.includes('UPDATE'),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: 'Sil',
      action: (row: ISlider) => handleRemove(row),
      hidden: !user?.role?.slider?.includes('DELETE'),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Sliderlar</h1>
        {user?.role?.slider?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => setShowModals((pre) => [...pre, 'create'])}
          >
            Yeni Ekle
          </Button>
        )}
      </div>

      <Table columns={COLUMNS} actions={actions} data={sliders} />

      <CreateSliderModal
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={() => router.refresh()}
      />

      {selectedSliderId && (
        <EditSliderModal
          id={selectedSliderId}
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

export default SlidersContainer;
