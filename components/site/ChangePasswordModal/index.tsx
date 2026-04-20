'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotificationStore } from '@/stores/notificationStore';
import { changePassword } from '@/services/userService';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required('Mevcut şifre zorunludur')
        .min(8, 'En az 8 karakter olmalıdır'),
      newPassword: Yup.string()
        .required('Yeni şifre zorunludur')
        .min(8, 'En az 8 karakter olmalıdır'),
      confirmPassword: Yup.string()
        .required('Şifre onayı zorunludur')
        .oneOf([Yup.ref('newPassword')], 'Şifreler eşleşmiyor'),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const [err, data] = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      setLoading(false);

      if (err) {
        let errorMessage = 'Şifre değiştirme işlemi sırasında bir hata oluştu.';

        if (err.message === 'CURRENT_PASSWORD_INCORRECT') {
          errorMessage = 'Mevcut şifreniz hatalı.';
        } else if (err.message === 'USER_NOT_FOUND') {
          errorMessage = 'Kullanıcı bulunamadı.';
        }

        return addNotification({
          title: 'Hata',
          text: errorMessage,
          type: 'error',
        });
      }

      addNotification({
        title: 'Başarılı',
        text: 'Şifreniz başarıyla değiştirildi.',
        type: 'success',
      });

      onClose();
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, resetForm } = formik;

  useEffect(() => {
    if (!isOpen) return;
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <Modal title="Şifre Değiştir" size="xSmall" show={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="password"
          label="Mevcut Şifre"
          placeholder="Mevcut şifrenizi giriniz"
          autoFocus
          error={errors.currentPassword && touched.currentPassword && errors.currentPassword}
          {...getFieldProps('currentPassword')}
        />

        <Input
          type="password"
          label="Yeni Şifre"
          placeholder="Yeni şifrenizi giriniz"
          error={errors.newPassword && touched.newPassword && errors.newPassword}
          {...getFieldProps('newPassword')}
        />

        <Input
          type="password"
          label="Yeni Şifre Onayı"
          placeholder="Yeni şifrenizi tekrar giriniz"
          error={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
          {...getFieldProps('confirmPassword')}
        />

        <div className="flex gap-3 mt-4">
          <Button
            type="button"
            color="black"
            onClick={onClose}
            className="flex-1"
          >
            İptal
          </Button>

          <Button
            type="submit"
            color="primary"
            loading={loading}
            className="flex-1"
          >
            Şifre Değiştir
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;