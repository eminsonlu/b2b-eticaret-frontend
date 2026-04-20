'use client';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ISlider, ISliderItem } from '@/types/ISlider';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { deletePanelSliderItem } from '@/services/sliderService';
import { useNotificationStore } from '@/stores/notificationStore';
import Image from 'next/image';
import Link from 'next/link';
import CreateSliderItemModal from '@/components/panel/CreateSliderItemModal';
import EditSliderItemModal from '@/components/panel/EditSliderItemModal';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import { useAuthStore } from '@/stores/authStore';
import { getImageUrl } from '@/utils/imageUtils';

const POSITIONS = {
  'top-left': 'Sol Üst',
  'top-right': 'Sağ Üst',
  'bottom-left': 'Sol Alt',
  'bottom-right': 'Sağ Alt',
};

const SliderItemsContainer = ({
  slider,
  items = [],
}: {
  slider: ISlider;
  items: ISliderItem[];
}) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const [selectedSliderId, setSelectedSliderId] = useState<string | null>(null);
  const [showModals, setShowModals] = useState<string[]>([]);

  const handleRemove = async (sliderItem: ISlider) => {
    const [err, data] = await deletePanelSliderItem(sliderItem.id, slider.id);
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
      title: 'Görsel',
      content: (row: ISliderItem) => (
        <Image
          loader={({ src }) => src}
          src={getImageUrl(row.image)}
          title="Thumbnail"
          alt="Thumbnail"
          width={0}
          height={0}
          className="w-full max-h-[50px] h-auto rounded"
          unoptimized
        />
      ),
      className: 'w-[125px] max-w-[125px]',
    },
    {
      title: 'Başlık',
      content: (row: ISliderItem) => row.title,
    },
    {
      title: 'Pozisyon',
      content: (row: ISliderItem) => POSITIONS[row.position],
      className: 'w-[125px] max-w-[125px]',
    },
    {
      title: 'Link',
      content: (row: ISliderItem) => (
        <Link
          href={row.link}
          target="_blank"
          className="max-w-[110px] truncate text-primary hover:text-primary-500 underline"
          title={row.link}
        >
          {row.link}
        </Link>
      ),
      className: 'w-[125px] max-w-[125px]',
    },
    {
      title: 'Açıklama',
      content: (row: ISliderItem) => (
        <p className="max-w-[110px] truncate" title={row.description}>
          {row.description}
        </p>
      ),
      className: 'w-[125px] max-w-[125px]',
    },
    {
      title: 'Sıra',
      content: (row: ISliderItem) => row.order,
      className: 'w-[75px] max-w-[75px]',
    },
    {
      title: 'Durum',
      content: (row: ISliderItem) => (row.isActive ? 'Aktif' : 'Pasif'),
      className: 'w-[100px] max-w-[100px]',
    },
    {
      title: 'Oluşturma Tarihi',
      content: (row: ISliderItem) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[175px] max-w-[175px]',
    },
    {
      title: 'Güncellenme Tarihi',
      content: (row: ISliderItem) =>
        DateTime.fromISO(row.updatedAt).toRelative(),
      className: 'w-[175px] max-w-[175px]',
    },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: ISlider) => {
        setSelectedSliderId(row.id);
        setShowModals((pre) => [...pre, 'edit']);
      },
      hidden: !user?.role?.sliderItem?.includes('UPDATE'),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: 'Sil',
      action: (row: ISlider) => handleRemove(row),
      hidden: !user?.role?.sliderItem?.includes('DELETE'),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">{`${slider.title} Slider Öğeleri`}</h1>
        {user?.role?.sliderItem?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => setShowModals((pre) => [...pre, 'create'])}
          >
            Yeni Ekle
          </Button>
        )}
      </div>

      <Table columns={COLUMNS} actions={actions} data={items} />

      <CreateSliderItemModal
        sliderId={slider.id}
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={() => router.refresh()}
      />

      {selectedSliderId && (
        <EditSliderItemModal
          id={selectedSliderId}
          sliderId={slider.id}
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

export default SliderItemsContainer;
