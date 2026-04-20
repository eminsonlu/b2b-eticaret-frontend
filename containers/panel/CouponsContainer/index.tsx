'use client';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useNotificationStore } from '@/stores/notificationStore';
import { ICoupon } from '@/types/ICoupon';
import { deletePanelCoupon } from '@/services/couponService';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import CreateCouponModal from '@/components/panel/CreateCouponModal';
import EditCouponModal from '@/components/panel/EditCouponModal';
import { useAuthStore } from '@/stores/authStore';

const CouponsContainer = ({ coupons = [] }: { coupons: ICoupon[] }) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [showModals, setShowModals] = useState<string[]>([]);

  const handleRemove = async (bankInfo: ICoupon) => {
    const [err] = await deletePanelCoupon(bankInfo.id);
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
      title: 'Kupon Kodu',
      content: (row: ICoupon) => (
        <div className="flex items-center gap-2">
          {row.code}

          {!row.isActive && (
            <Badge color="red" className="!text-[10px]">
              Pasif
            </Badge>
          )}
        </div>
      ),
    },
    {
      title: 'Tutar',
      content: (row: ICoupon) =>
        row.type == 'PERCENT' ? `${row.value * 100}%` : `${row.value}TL`,
      className: 'w-[150px] max-w-[150px]',
    },
    {
      title: 'Tip',
      content: (row: ICoupon) =>
        row.type === 'PERCENT' ? 'Yüzde' : 'Sabit Fiyat',
      className: 'w-[150px] max-w-[150px]',
    },
    {
      title: 'Kalan Adet',
      content: (row: ICoupon) => row.quantity,
      className: 'w-[150px] max-w-[150px]',
    },
    {
      title: 'Oluşturma Tarihi',
      content: (row: ICoupon) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[200px] max-w-[200px]',
    },
    {
      title: 'Güncellenme Tarihi',
      content: (row: ICoupon) => DateTime.fromISO(row.updatedAt).toRelative(),
      className: 'w-[200px] max-w-[200px]',
    },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: ICoupon) => {
        setSelectedCouponId(row.id);
        setShowModals((pre) => [...pre, 'edit']);
      },
      hidden: !user?.role?.coupon?.includes('UPDATE'),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: 'Sil',
      action: (row: ICoupon) => handleRemove(row),
      hidden: !user?.role?.coupon?.includes('DELETE'),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Kupon Kodu Yönetimi</h1>
        {user?.role?.coupon?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => setShowModals((pre) => [...pre, 'create'])}
          >
            Yeni Ekle
          </Button>
        )}
      </div>

      <Table columns={COLUMNS} actions={actions} data={coupons} />

      <CreateCouponModal
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={() => router.refresh()}
      />

      {selectedCouponId && (
        <EditCouponModal
          id={selectedCouponId}
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

export default CouponsContainer;
