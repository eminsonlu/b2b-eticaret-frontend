'use client';
import { fetchMe, login } from '@/services/authService';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishListStore } from '@/stores/wishListStore';

export const LoginContainer = () => {
  const { setUser } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const { updateCart } = useCartStore();
  const { updateWishList } = useWishListStore();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Bu alan zorunludur.')
        .email('Lütfen geçerli bir e-posta adresi giriniz.'),
      password: Yup.string()
        .required('Bu alan zorunludur.')
        .min(8, 'Şifreniz en az 8 karakter olmalıdır.'),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      setLoading(true);
      const [err, data] = await login(email, password);
      setLoading(false);

      if (err) {
        if (err.message === 'EMAIL_NOT_VERIFIED') {
          return addNotification({
            title: 'E-posta Doğrulama Gerekli',
            text: 'Giriş yapmak için e-posta adresinizi doğrulamanız gerekiyor.',
            type: 'warning',
          });
        }
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      const t = data.token;
      document.cookie = `token=${encodeURIComponent(t)}; path=/; max-age=14400`;
      if (typeof window !== 'undefined')
        window.localStorage.setItem('token', t);

      const [userDataErr, userData] = await fetchMe();

      if (userDataErr) {
        return addNotification({
          title: 'Hata',
          text: userDataErr.message,
          type: 'error',
        });
      }

      setUser(userData);
      updateCart();
      updateWishList();
      router.push('/');
    },
  });

  const { handleSubmit, getFieldProps, errors, touched } = formik;

  return (
    <>
      <div className="w-full max-w-300 mx-auto flex items-center justify-center group">
        <h2 className="text-5xl font-bold relative text-center mt-4">
          Giriş Yap
          <div className="w-12.5 h-0.5 bg-primary-400 mt-2 transition-all duration-500 absolute top-full left-1/2 -translate-x-1/2 group-hover:w-full"></div>
        </h2>
      </div>

      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-100 mx-auto mt-12"
        >
          <Input
            size="large"
            type="email"
            label="E-posta"
            placeholder="E-posta"
            className="p-2 border border-gray-300 rounded"
            {...getFieldProps('email')}
            error={touched.email && errors.email}
          />
          <Input
            size="large"
            type="password"
            label="Şifre"
            placeholder="Şifre"
            className="p-2 border border-gray-300 rounded"
            {...getFieldProps('password')}
            error={touched.password && errors.password}
          />
          <Button
            color="primary"
            type="submit"
            loading={loading}
            className="w-full mt-2"
            size="large"
          >
            Giriş Yap
          </Button>

          <div className="flex flex-col gap-2 mt-4">
            <Link
              href="/sifremi-unuttum"
              className="text-sm text-gray-600 hover:text-primary-500 hover:underline text-center"
            >
              Şifremi unuttum
            </Link>
            <Link
              href="/kayit-ol"
              className="text-sm text-primary-500 hover:underline text-center"
            >
              Henüz hesabın yok mu? Hemen kayıt ol!
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
