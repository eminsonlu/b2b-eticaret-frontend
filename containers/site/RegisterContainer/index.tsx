'use client';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { fetchMe, register } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import * as yup from 'yup';

const RegisterContainer = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { addNotification } = useNotificationStore();
  const { setUser } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      passwordR: '',
      inviteCode: '',
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required('Ad alanı zorunludur'),
      lastName: yup.string().required('Soyad alanı zorunludur'),
      email: yup
        .string()
        .email('Geçerli bir e-posta adresi giriniz')
        .required('E-posta alanı zorunludur'),
      phone: yup.string().required('Telefon numarası alanı zorunludur'),
      password: yup.string().required('Şifre alanı zorunludur'),
      passwordR: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Şifreler uyuşmuyor'),
      inviteCode: yup.string().optional(),
    }),
    onSubmit: async (values: any) => {
      setLoading(true);
      const [err, data] = await register(values);
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      const t = data.token;
      document.cookie = `token=${encodeURIComponent(t)}; path=/; max-age=14400`;
      if (typeof window !== 'undefined') window.localStorage.setItem('token', t);

      const [userDataErr, userData] = await fetchMe();

      if (userDataErr) {
        return addNotification({
          title: 'Hata',
          text: userDataErr.message,
          type: 'error',
        });
      }
      setUser(userData);
      router.push('/');
    },
  });

  const { handleSubmit, getFieldProps, touched, errors } = formik;

  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center group">
        <h2 className="text-5xl font-bold relative text-center mt-4">
          Kayıt Ol
          <div className="w-[50px] h-[2px] bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-[100%]"></div>
        </h2>
      </div>

      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-[400px] mx-auto mt-12"
        >
          <div className="flex items-start gap-4">
            <Input
              size="large"
              label="Ad"
              placeholder="Ad"
              className="p-2 border border-gray-300 rounded"
              {...getFieldProps('firstName')}
              error={
                touched.firstName &&
                errors.firstName &&
                String(errors.firstName)
              }
            />
            <Input
              size="large"
              label="Soyad"
              placeholder="Soyad"
              className="p-2 border border-gray-300 rounded"
              {...getFieldProps('lastName')}
              error={
                touched.lastName && errors.lastName && String(errors.lastName)
              }
            />
          </div>

          <Input
            size="large"
            type="email"
            label="E-posta"
            placeholder="E-posta"
            className="p-2 border border-gray-300 rounded"
            {...getFieldProps('email')}
            error={touched.email && errors.email && String(errors.email)}
          />

          <Input
            size="large"
            label="Telefon Numarası"
            placeholder="Telefon Numarası"
            className="p-2 border border-gray-300 rounded"
            {...getFieldProps('phone')}
            error={touched.phone && errors.phone && String(errors.phone)}
          />

          <Input
            size="large"
            type="password"
            label="Şifre"
            placeholder="Şifre"
            className="p-2 border border-gray-300 rounded"
            {...getFieldProps('password')}
            error={
              touched.password && errors.password && String(errors.password)
            }
          />
          <Input
            size="large"
            type="password"
            label="Şifre Tekrar"
            placeholder="Şifre Tekrar"
            className="p-2 border border-gray-300 rounded"
            {...getFieldProps('passwordR')}
            error={
              touched.passwordR && errors.passwordR && String(errors.passwordR)
            }
          />

          <Input
            size="large"
            label="Şirket Davet Kodu (Opsiyonel)"
            placeholder="Şirket Davet Kodu"
            className="p-2 border border-gray-300 rounded"
            {...getFieldProps('inviteCode')}
            error={
              touched.inviteCode && errors.inviteCode && String(errors.inviteCode)
            }
          />

          <Button
            color="primary"
            type="submit"
            loading={loading}
            className="w-full mt-2"
            size="large"
          >
            Kayıt Ol
          </Button>

          <Link
            href="/giris-yap"
            className="mt-4 text-sm text-primary-500 hover:underline"
          >
            Zaten hesabın var mı? Giriş Yap!
          </Link>
        </form>
      </div>
    </>
  );
};

export default RegisterContainer;
