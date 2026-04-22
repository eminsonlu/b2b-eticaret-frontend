'use client';
import React, { useEffect, useState } from 'react';
import * as companyService from '@/services/companyService';
import { useNotificationStore } from '@/stores/notificationStore';
import { ICompany } from '@/types/ICompany';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CompaniesContainer = () => {
  const { addNotification } = useNotificationStore();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    const [err, data] = await companyService.getCompanies();
    setLoading(false);

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }

    setCompanies(data);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu şirketi silmek istediğinizden emin misiniz?')) {
      return;
    }

    setDeleteLoading(id);
    // Note: Delete endpoint would need to be added to companyService
    // For now, this is a placeholder
    setDeleteLoading(null);
    addNotification({
      title: 'Bilgi',
      text: 'Şirket silme işlemi henüz uygulanmadı',
      type: 'info',
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('tr-TR');
  };

  const COLUMNS = [
    { title: 'Şirket Adı', content: (row: ICompany) => row.name },
    { title: 'Vergi No', content: (row: ICompany) => row.taxNumber },
    { title: 'Fiyat Grubu', content: (row: ICompany) => row.priceGroup, className: 'w-[120px] max-w-[120px]' },
    { title: 'İskonto %', content: (row: ICompany) => `${row.discountRate}%`, className: 'w-[120px] max-w-[120px]' },
    { title: 'Kayıt Tarihi', content: (row: ICompany) => formatDate(row.createdAt), className: 'w-[150px] max-w-[150px]' },
  ];

  const actions = [
    {
      icon: <FiEdit size={16} />,
      title: 'Düzenle',
      action: (row: ICompany) => router.push(`/panel/companies/${row.id}`),
    },
    {
      icon: <FiTrash size={16} />,
      title: 'Sil',
      action: (row: ICompany) => handleDelete(row.id),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-5xl">Şirketler</h1>
        <Link href="/panel/companies/new">
          <Button color="primary">Yeni Şirket</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Yükleniyor...</div>
      ) : companies.length === 0 ? (
        <div className="text-center text-gray-500">Şirket bulunamadı</div>
      ) : (
        <Table columns={COLUMNS} actions={actions} data={companies} />
      )}
    </div>
  );
};

export default CompaniesContainer;
