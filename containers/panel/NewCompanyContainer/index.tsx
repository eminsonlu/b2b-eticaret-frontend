'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import companyService from '@/services/companyService';
import { useNotificationStore } from '@/stores/notificationStore';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';

const NewCompanyContainer = () => {
  const router = useRouter();
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);

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
      const [err, data] = await companyService.createCompany(values);
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
        text: 'Şirket başarıyla oluşturuldu',
        type: 'success',
      });

      router.push('/panel/companies');
    },
  });

  const { handleSubmit, getFieldProps, touched, errors } = formik;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Yeni Şirket</h1>

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
              onChange={(e) => formik.setFieldValue('priceGroup', Number(e.target.value))}
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
            onChange={(e) => formik.setFieldValue('discountRate', Number(e.target.value))}
            error={
              touched.discountRate &&
              errors.discountRate &&
              String(errors.discountRate)
            }
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" color="primary" loading={loading}>
            Oluştur
          </Button>
          <Link href="/panel/companies">
            <Button type="button">İptal</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewCompanyContainer;
