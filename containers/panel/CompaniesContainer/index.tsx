'use client';
import React, { useEffect, useState } from 'react';
import companyService from '@/services/companyService';
import { useNotificationStore } from '@/stores/notificationStore';
import { ICompany } from '@/types/ICompany';
import Link from 'next/link';
import Button from '@/components/shared/Button';

const CompaniesContainer = () => {
  const { addNotification } = useNotificationStore();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Şirketler</h1>
        <Link href="/panel/companies/new">
          <Button color="primary">Yeni Şirket</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Yükleniyor...</div>
      ) : companies.length === 0 ? (
        <div className="text-center text-gray-500">Şirket bulunamadı</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Şirket Adı
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Vergi No
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Fiyat Grubu
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  İskonto %
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  Kayıt Tarihi
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{company.name}</td>
                  <td className="px-4 py-3">{company.taxNumber}</td>
                  <td className="px-4 py-3 text-center">{company.priceGroup}</td>
                  <td className="px-4 py-3 text-center">{company.discountRate}%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(company.createdAt)}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link href={`/panel/companies/${company.id}`}>
                      <Button size="small">Düzenle</Button>
                    </Link>
                    <Button
                      size="small"
                      color="danger"
                      loading={deleteLoading === company.id}
                      onClick={() => handleDelete(company.id)}
                    >
                      Sil
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompaniesContainer;
