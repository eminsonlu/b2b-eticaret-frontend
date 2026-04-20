'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import * as Yup from 'yup';
import { updateProfile } from '@/services/userService';
import ChangePasswordModal from '@/components/site/ChangePasswordModal';

const ProfileContainer = () => {
  const { user, setUser } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required('Bu alan zorunludur.'),
      lastName: Yup.string()
        .required('Bu alan zorunludur.'),
      email: Yup.string()
        .required('Bu alan zorunludur.')
        .email('Lütfen geçerli bir e-posta adresi giriniz.'),
      phone: Yup.string()
        .required('Bu alan zorunludur.')
        .matches(/^[0-9+\s-()]+$/, 'Lütfen geçerli bir telefon numarası giriniz.'),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const [err, updatedUser] = await updateProfile(values);
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message || 'Profil güncellenirken bir hata oluştu.',
          type: 'error',
        });
      }

      setUser(updatedUser);
      addNotification({
        title: 'Başarılı',
        text: 'Profil bilgileriniz başarıyla güncellendi.',
        type: 'success',
      });
    },
  });

  const { handleSubmit, getFieldProps, errors, touched } = formik;

  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
        <h2 className="text-5xl font-bold relative text-center mt-4">
          Profil Bilgilerim
          <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
      </div>

      <div className="container">
        <div className="max-w-[800px] mx-auto mt-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                size="large"
                type="text"
                label="Ad"
                placeholder="Adınız"
                {...getFieldProps('firstName')}
                error={touched.firstName && errors.firstName}
              />
              <Input
                size="large"
                type="text"
                label="Soyad"
                placeholder="Soyadınız"
                {...getFieldProps('lastName')}
                error={touched.lastName && errors.lastName}
              />
            </div>

            <Input
              size="large"
              type="email"
              label="E-posta"
              placeholder="E-posta adresiniz"
              {...getFieldProps('email')}
              error={touched.email && errors.email}
            />

            <Input
              size="large"
              type="tel"
              label="Telefon"
              placeholder="Telefon numaranız"
              {...getFieldProps('phone')}
              error={touched.phone && errors.phone}
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                color="primary"
                type="submit"
                loading={loading}
                size="large"
                className="flex-1"
              >
                Profil Bilgilerini Güncelle
              </Button>

              <Button
                color="black"
                type="button"
                onClick={() => setShowPasswordModal(true)}
                size="large"
                className="flex-1"
              >
                Şifre Değiştir
              </Button>
            </div>
          </form>
        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </>
  );
};

export default ProfileContainer;