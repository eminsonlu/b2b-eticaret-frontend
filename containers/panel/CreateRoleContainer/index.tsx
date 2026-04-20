'use client';
import Button from '@/components/shared/Button';
import Checkbox from '@/components/shared/Checkbox';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';
import { createPanelUserRole } from '@/services/userRoleService';
import { useNotificationStore } from '@/stores/notificationStore';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PERMS: any = {
  tag: 'Etiketler',
  category: 'Kategoriler',
  product: 'Ürünler',
  bankAccount: 'Bank Hesapları',
  coupon: 'Kupon Kodları',
  order: 'Siparişler',
  slider: 'Sliderlar',
  sliderItem: 'Slider Öğeleri',
  user: 'Kullanıcılar',
  userRole: 'Kullanıcı Yetkilendirmeleri',
  variant: 'Varyantlar',
  variantValue: 'Varyant Değerleri',
  blog: 'Blog',
};

const CreateRoleContainer = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotificationStore();

  const formik = useFormik<any>({
    initialValues: {
      title: '',
      tag: [],
      category: [],
      product: [],
      bankAccount: [],
      coupon: [],
      order: [],
      slider: [],
      sliderItem: [],
      user: [],
      userRole: [],
      variant: [],
      variantValue: [],
      blog: [],
    },
    onSubmit: async (values) => {
      setLoading(true);
      const [err] = await createPanelUserRole({ ...values });
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      router.push('/panel/users/roles');
    },
  });

  const { values, setFieldValue, getFieldProps, handleSubmit } = formik;

  const handleChangePerm = (perm: string, value: string) => {
    if (values[perm].indexOf(value) === -1) {
      return setFieldValue(perm, [...values[perm], value]);
    }

    setFieldValue(
      perm,
      value == 'READ' ? [] : values[perm].filter((v: string) => v !== value)
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full mt-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-5xl">Yeni Yetkilendirme</h1>
      </div>

      <div className="flex flex-col gap-4 max-w-[450px]">
        <Input label="Başlık" {...getFieldProps('title')} />

        <Select
          label="Admin mi?"
          value={values.isAdmin}
          options={[
            { label: 'Evet', value: true },
            { label: 'Hayır', value: false },
          ]}
          onSelect={(val) => setFieldValue('isAdmin', val)}
        />
      </div>

      <div className="flex flex-col w-fit border border-slate-200 bg-white">
        <div className="flex w-full">
          <div className="w-[450px] h-[50px] px-3"></div>
          <div className="w-[150px] h-[50px] px-3 flex items-center justify-center font-medium border-l border-slate-200">
            Görüntüleme
          </div>
          <div className="w-[150px] h-[50px] px-3 flex items-center justify-center font-medium border-l border-slate-200">
            Ekleme
          </div>
          <div className="w-[150px] h-[50px] px-3 flex items-center justify-center font-medium border-l border-slate-200">
            Güncelleme
          </div>
          <div className="w-[150px] h-[50px] px-3 flex items-center justify-center font-medium border-l border-slate-200">
            Silme
          </div>
        </div>

        {Object.keys(PERMS).map((perm) => (
          <div className="flex w-full border-t border-slate-200" key={perm}>
            <div className="w-[450px] h-[50px] px-3 flex items-center">
              {PERMS[perm]}
            </div>
            <div className="w-[150px] h-[50px] px-3 flex items-center justify-center font-medium border-l border-slate-200">
              <Checkbox
                value={values[perm].includes('READ')}
                size="large"
                onChange={() => handleChangePerm(perm, 'READ')}
              />
            </div>
            <div className="w-[150px] h-[50px] px-3 flex items-center justify-center font-medium border-l border-slate-200">
              <Checkbox
                value={values[perm].includes('CREATE')}
                size="large"
                onChange={() => handleChangePerm(perm, 'CREATE')}
              />
            </div>
            <div className="w-[150px] h-[50px] px-3 flex items-center justify-center font-medium border-l border-slate-200">
              <Checkbox
                value={values[perm].includes('UPDATE')}
                size="large"
                onChange={() => handleChangePerm(perm, 'UPDATE')}
              />
            </div>
            <div className="w-[150px] h-[50px] px-3 flex items-center justify-center font-medium border-l border-slate-200">
              <Checkbox
                value={values[perm].includes('DELETE')}
                size="large"
                onChange={() => handleChangePerm(perm, 'DELETE')}
              />
            </div>
          </div>
        ))}
      </div>

      <Button size="large" loading={loading} onClick={() => handleSubmit()}>
        Kaydet
      </Button>
    </div>
  );
};

export default CreateRoleContainer;
