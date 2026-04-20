'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotificationStore } from '@/stores/notificationStore';
import { createAddress } from '@/services/addressService';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import Textarea from '@/components/shared/Textarea';

interface Props {
  show: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
}

const CreateAddressModal = ({ show, onClose, onCreate }: Props) => {
  const { addNotification } = useNotificationStore();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      address: '',
      city: '',
      district: '',
      country: '',
      zipCode: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Başlık zorunludur')
        .min(3, 'En az 3 karakter olmalıdır'),
      address: Yup.string()
        .typeError('Adres alanı zorunludur')
        .required('Adres zorunludur'),
      city: Yup.string()
        .typeError('Şehir alanı zorunludur')
        .required('Şehir zorunludur'),
      district: Yup.string()
        .typeError('İlçe alanı zorunludur')
        .required('İlçe zorunludur'),
      country: Yup.string()
        .typeError('Ülke alanı zorunludur')
        .required('Ülke zorunludur'),
      zipCode: Yup.number()
        .typeError('Posta kodu sayı olmalıdır')
        .required('Posta kodu zorunludur'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const [err, address] = await createAddress({
        ...values,
        zipCode: Number(values.zipCode),
      });
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      onCreate(address);
      onClose();
    },
  });
  const { errors, touched, handleSubmit, getFieldProps, resetForm } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [resetForm, show]);

  return (
    <Modal title="Adres Ekle" size="xSmall" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Başlık"
          autoFocus
          error={errors.title && touched.title && errors.title}
          {...getFieldProps('title')}
        />

        <div className="flex gap-4">
          <Input
            label="Şehir"
            error={errors.city && touched.city && errors.city}
            {...getFieldProps('city')}
          />

          <Input
            label="İlçe"
            error={errors.district && touched.district && errors.district}
            {...getFieldProps('district')}
          />
        </div>

        <div className="flex gap-4">
          <Input
            label="Ülke"
            error={errors.country && touched.country && errors.country}
            {...getFieldProps('country')}
          />

          <Input
            label="Posta Kodu"
            error={errors.zipCode && touched.zipCode && errors.zipCode}
            {...getFieldProps('zipCode')}
          />
        </div>

        <Textarea
          label="Adres"
          error={errors.address && touched.address && errors.address}
          {...getFieldProps('address')}
        />

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default CreateAddressModal;
