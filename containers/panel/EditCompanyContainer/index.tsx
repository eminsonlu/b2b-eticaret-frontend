'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import companyService from '@/services/companyService';
import { useNotificationStore } from '@/stores/notificationStore';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';
import { ICompany } from '@/types/ICompany';
import { ICompanyInvite } from '@/types/ICompanyInvite';

interface Props {
  companyId: string;
}

const EditCompanyContainer = ({ companyId }: Props) => {
  const router = useRouter();
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [invites, setInvites] = useState<ICompanyInvite[]>([]);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [createInviteLoading, setCreateInviteLoading] = useState(false);
  const [company, setCompany] = useState<ICompany | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      taxNumber: '',
      taxOffice: '',
      address: '',
      priceGroup: 1,
      discountRate: 0,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Şirket adı zorunludur'),
      taxNumber: yup.string().required('Vergi numarası zorunludur'),
      taxOffice: yup.string(),
      address: yup.string(),
      priceGroup: yup
        .number()
        .required('Fiyat grubu zorunludur')
        .min(1, 'Fiyat grubu 1-5 arasında olmalıdır')
        .max(5, 'Fiyat grubu 1-5 arasında olmalıdır'),
      discountRate: yup
        .number()
        .required('İskonto oranı zorunludur')
        .min(0, 'İskonto oranı 0-100 arasında olmalıdır')
        .max(100, 'İskonto oranı 0-100 arasında olmalıdır'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const [err, data] = await companyService.updateCompany(companyId, values);
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      addNotification({
        title: 'Başarılı',
        text: 'Şirket başarıyla güncellendi',
        type: 'success',
      });

      setCompany(data);
    },
  });

  const { handleSubmit, getFieldProps, touched, errors, setValues } = formik;

  useEffect(() => {
    fetchCompany();
    fetchInvites();
  }, [companyId]);

  const fetchCompany = async () => {
    const [err, data] = await companyService.getCompany(companyId);
    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }
    setCompany(data);
    setValues(data);
  };

  const fetchInvites = async () => {
    setInvitesLoading(true);
    const [err, data] = await companyService.getInvites(companyId);
    setInvitesLoading(false);

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }

    setInvites(data);
  };

  const handleCreateInvite = async () => {
    setCreateInviteLoading(true);
    const [err, data] = await companyService.createInvite(companyId);
    setCreateInviteLoading(false);

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message,
        type: 'error',
      });
    }

    addNotification({
      title: 'Başarılı',
      text: 'Davet kodu başarıyla oluşturuldu',
      type: 'success',
    });

    fetchInvites();
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    addNotification({
      title: 'Başarılı',
      text: 'Davet kodu kopyalandı',
      type: 'success',
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('tr-TR');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <h1 className="text-3xl font-bold">Şirketi Düzenle</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Şirket Adı"
          placeholder="Şirket Adı"
          {...getFieldProps('name')}
          error={touched.name && errors.name && String(errors.name)}
        />

        <Input
          label="Vergi Numarası"
          placeholder="Vergi Numarası"
          {...getFieldProps('taxNumber')}
          error={
            touched.taxNumber && errors.taxNumber && String(errors.taxNumber)
          }
        />

        <Input
          label="Vergi Müdürlüğü"
          placeholder="Vergi Müdürlüğü"
          {...getFieldProps('taxOffice')}
          error={
            touched.taxOffice && errors.taxOffice && String(errors.taxOffice)
          }
        />

        <Input
          label="Adres"
          placeholder="Adres"
          {...getFieldProps('address')}
          error={touched.address && errors.address && String(errors.address)}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fiyat Grubu
            </label>
            <select
              {...getFieldProps('priceGroup')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seçiniz</option>
              <option value={1}>Fiyat Grubu 1</option>
              <option value={2}>Fiyat Grubu 2</option>
              <option value={3}>Fiyat Grubu 3</option>
              <option value={4}>Fiyat Grubu 4</option>
              <option value={5}>Fiyat Grubu 5</option>
            </select>
            {touched.priceGroup && errors.priceGroup && (
              <span className="text-red-500 text-sm mt-1">
                {String(errors.priceGroup)}
              </span>
            )}
          </div>

          <Input
            label="İskonto Oranı (%)"
            type="number"
            min="0"
            max="100"
            {...getFieldProps('discountRate')}
            error={
              touched.discountRate &&
              errors.discountRate &&
              String(errors.discountRate)
            }
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" color="primary" loading={loading}>
            Güncelle
          </Button>
          <Link href="/panel/companies">
            <Button type="button">Geri</Button>
          </Link>
        </div>
      </form>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Davet Kodları</h2>
          <Button
            color="primary"
            onClick={handleCreateInvite}
            loading={createInviteLoading}
          >
            Yeni Davet Kodu Oluştur
          </Button>
        </div>

        {invitesLoading ? (
          <div className="text-center text-gray-500">Yükleniyor...</div>
        ) : invites.length === 0 ? (
          <div className="text-center text-gray-500">Davet kodu bulunamadı</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Kod
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Oluşturan
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Kullanan
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Kullanım Tarihi
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Oluşturma Tarihi
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody>
                {invites.map((invite) => (
                  <tr
                    key={invite.id}
                    className={`border-b border-gray-100 ${
                      invite.usedAt
                        ? 'bg-gray-100'
                        : 'bg-green-50 hover:bg-green-100'
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-sm">{invite.code}</td>
                    <td className="px-4 py-3 text-sm">
                      {invite.createdBy
                        ? `${invite.createdBy.firstName} ${invite.createdBy.lastName}`
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {invite.usedBy
                        ? `${invite.usedBy.firstName} ${invite.usedBy.lastName}`
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {invite.usedAt ? formatDate(invite.usedAt) : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {formatDate(invite.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="small"
                        onClick={() => handleCopyCode(invite.code)}
                      >
                        Kopyala
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCompanyContainer;
