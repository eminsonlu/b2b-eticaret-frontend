'use client';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useNotificationStore } from '@/stores/notificationStore';
import { IBankAccount } from '@/types/IBankAccount';
import { deletePanelBankAccount } from '@/services/bankAccountService';
import Image from 'next/image';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import CreateBankAccountModal from '@/components/panel/CreateBankAccountModal';
import EditBankAccountModal from '@/components/panel/EditBankAccountModal';
import { useAuthStore } from '@/stores/authStore';
import { getImageUrl } from '@/utils/imageUtils';

const BankAccountsContainer = ({
  bankAccounts = [],
}: {
  bankAccounts: IBankAccount[];
}) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [showModals, setShowModals] = useState<string[]>([]);

  const handleRemove = async (bankInfo: IBankAccount) => {
    const [err] = await deletePanelBankAccount(bankInfo.id);
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
      title: 'Banka',
      content: (row: IBankAccount) => (
        <div className="flex items-center gap-2">
          <Image
            src={getImageUrl(row.logo)}
            loader={({ src }) => src}
            title={row.bank}
            alt={row.bank}
            width={0}
            height={0}
            className="w-[35px] h-[35px] object-contain"
            unoptimized
          />
          {row.bank}
        </div>
      ),
    },
    {
      title: 'Şube Kodu',
      content: (row: IBankAccount) => row.branchCode,
      className: 'w-[150px] max-w-[150px]',
    },
    {
      title: 'IBAN',
      content: (row: IBankAccount) => row.iban,
      className: 'w-[250px] max-w-[250px]',
    },
    {
      title: 'Durum',
      content: (row: IBankAccount) => (row.isActive ? 'Aktif' : 'Pasif'),
      className: 'w-[85px] max-w-[85px]',
    },
    {
      title: 'Oluşturma Tarihi',
      content: (row: IBankAccount) =>
        DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
      className: 'w-[200px] max-w-[200px]',
    },
    {
      title: 'Güncellenme Tarihi',
      content: (row: IBankAccount) =>
        DateTime.fromISO(row.updatedAt).toRelative(),
      className: 'w-[200px] max-w-[200px]',
    },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: IBankAccount, index: number) => {
        setSelectedAccountId(row.id);
        setShowModals((pre) => [...pre, 'edit']);
      },
      hidden: !user?.role?.bankAccount?.includes('UPDATE'),
    },
    {
      icon: <FiTrash2 size={16} />,
      title: 'Sil',
      action: (row: IBankAccount, index: number) => handleRemove(row),
      hidden: !user?.role?.bankAccount?.includes('DELETE'),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Havale/EFT Yönetimi</h1>
        {user?.role?.bankAccount?.includes('CREATE') && (
          <Button
            color="green"
            className="ml-auto"
            onClick={() => setShowModals((pre) => [...pre, 'create'])}
          >
            Yeni Ekle
          </Button>
        )}
      </div>

      <Table columns={COLUMNS} actions={actions} data={bankAccounts} />

      <CreateBankAccountModal
        show={showModals.includes('create')}
        onClose={() =>
          setShowModals((pre) => pre.filter((m) => m !== 'create'))
        }
        onCreate={() => router.refresh()}
      />

      {selectedAccountId && (
        <EditBankAccountModal
          id={selectedAccountId}
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

export default BankAccountsContainer;
