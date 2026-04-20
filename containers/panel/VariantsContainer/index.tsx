'use client';
import React, { useState } from 'react';
import IVariant, { IVariantValue } from '@/types/IVariant';
import { useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {
  deletePanelVariant,
  deletePanelVariantValue,
} from '@/services/variantService';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import CreateVariantModal from '@/components/panel/CreateVariantModal';
import CreateVariantValueModal from '@/components/panel/CreateVariantValueModal';
import EditVariantModal from '@/components/panel/EditVariantModal';
import EditVariantValueModal from '@/components/panel/EditVariantValueModal';
import { useAuthStore } from '@/stores/authStore';
import { VARIANT_TYPES } from '@/constants';

const VariantsContainer = ({ variants = [] }: { variants: IVariant[] }) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const [variant, setVariant] = useState<IVariant | null>(null);
  const [variantValueId, setVariantValueId] = useState<string | null>(null);
  const [showModals, setShowModals] = useState<string[]>([]);

  const COLUMNS = [
    {
      title: 'Başlık',
      content: (row: IVariantValue) => row.title || '-',
    },
    {
      title: 'Değer',
      content: (row: IVariantValue) => (
        <div className="flex items-center gap-2">
          {row.value.startsWith('#') && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: row.value }}
            />
          )}
          <span> {row.value}</span>
        </div>
      ),
      className: 'w-[225px] max-w-[225px]',
    },
    {
      title: 'Oluşturma Tarihi',
      content: (row: IVariantValue) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[225px] max-w-[225px]',
    },
    {
      title: 'Güncellenme Tarihi',
      content: (row: IVariantValue) =>
        DateTime.fromISO(row.updatedAt).toRelative(),
      className: 'w-[225px] max-w-[225px]',
    },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: IVariantValue) => {
        const findVariant = variants.find((v) => v.id === row.variantId);
        if (findVariant) {
          setVariant(findVariant);
        }
        setVariantValueId(row.id);
        setShowModals((pre) => [...pre, 'value-edit']);
      },
      hidden: !user?.role?.variantValue?.includes('UPDATE'),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: 'Sil',
      action: (row: IVariantValue) => handleRemoveVariantValue(row),
      hidden: !user?.role?.variantValue?.includes('UPDATE'),
    },
  ];

  const handleRemoveVariant = async (variant: IVariant) => {
    const [err] = await deletePanelVariant(variant.id);

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }

    router.refresh();
  };

  const handleRemoveVariantValue = async (variantValue: IVariantValue) => {
    const [err] = await deletePanelVariantValue(variantValue.id);

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }

    router.refresh();
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Varyantlar</h1>
        {user?.role?.variant?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => setShowModals((pre) => [...pre, 'create'])}
          >
            Yeni Varyant Ekle
          </Button>
        )}
      </div>

      {variants.map((variant, index) => (
        <section key={index} className="flex flex-col  gap-2 mt-8">
          <div className="flex items-center">
            <h2 className="font-semibold text-2xl">
              {variant.title}{' '}
              <span className="font-normal !text-xs text-black/70">
                ({VARIANT_TYPES[variant.type]})
              </span>
            </h2>

            <div className="ml-auto flex gap-2">
              {user?.role?.variantValue?.includes('CREATE') && (
                <Button
                  size="small"
                  color="green"
                  onClick={() => {
                    setShowModals((pre) => [...pre, 'value-create']);
                    setVariant(variant);
                  }}
                >
                  Değer Ekle
                </Button>
              )}
              {user?.role?.variant?.includes('UPDATE') && (
                <Button
                  size="small"
                  color="orange"
                  onClick={() => {
                    setShowModals((pre) => [...pre, 'edit']);
                    setVariant(variant);
                  }}
                >
                  Düzenle
                </Button>
              )}
              {user?.role?.variant?.includes('DELETE') && (
                <Button
                  size="small"
                  color="red"
                  onClick={() => {
                    handleRemoveVariant(variant);
                  }}
                >
                  Sil
                </Button>
              )}
            </div>
          </div>

          <Table
            columns={COLUMNS}
            actions={actions}
            data={variant.variantValues}
          />
        </section>
      ))}

      <CreateVariantModal
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={() => router.refresh()}
      />

      {variant && (
        <EditVariantModal
          id={variant.id}
          show={showModals.includes('edit')}
          onClose={() => {
            setShowModals((pre) => pre.filter((m) => m !== 'edit'));
            setVariant(null);
          }}
          onEdit={() => router.refresh()}
        />
      )}

      {variant && (
        <CreateVariantValueModal
          variant={variant}
          show={showModals.includes('value-create')}
          onClose={() =>
            setShowModals((pre) => pre.filter((m) => m !== 'value-create'))
          }
          onCreate={() => router.refresh()}
        />
      )}

      {variant && variantValueId && (
        <EditVariantValueModal
          id={variantValueId}
          variant={variant}
          show={showModals.includes('value-edit')}
          onClose={() =>
            setShowModals((pre) => pre.filter((m) => m !== 'value-edit'))
          }
          onEdit={() => router.refresh()}
        />
      )}
    </>
  );
};

export default VariantsContainer;
