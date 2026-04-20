'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotificationStore } from '@/stores/notificationStore';
import {
  fetchPanelCouponById,
  updatePanelCoupon,
} from '@/services/couponService';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import Select from '@/components/shared/Select';

interface Props {
  id: string;
  show: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const EditCouponModal = ({ id, show, onClose, onEdit }: Props) => {
  const { addNotification } = useNotificationStore();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      code: '',
      quantity: 100,
      type: 'CONSTANT',
      value: 100,
      isActive: true,
      userId: '',
      createdAt: '',
      updatedAt: '',
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required('Kupon Kodu zorunludur')
        .min(5, 'En az 5 karakter olmalıdır'),
      quantity: Yup.number()
        .typeError('Adet sayı olmalıdır')
        .required('Adet zorunludur'),
      value: Yup.number()
        .typeError('Adet sayı olmalıdır')
        .required('Adet zorunludur'),
    }),
    onSubmit: async (values) => {
      const { id, userId, createdAt, updatedAt, ...data } = values;

      setLoading(true);
      const [err] = await updatePanelCoupon(values.id, {
        ...data,
        quantity: Number(data.quantity),
        value: Number(data.type == 'CONSTANT' ? data.value : data.value / 100),
      });
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      onEdit();
      onClose();
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    resetForm,
    values,
    setFieldValue,
    setValues,
  } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [resetForm, show]);

  useEffect(() => {
    if (!show) return;
    (async () => {
      const [err, data] = await fetchPanelCouponById(id);
      setValues({
        ...data,
        value: data.type == 'CONSTANT' ? data.value : data.value * 100,
      });
    })();
  }, [show, id, setValues]);

  return (
    <Modal
      title="Kupon Kodu Düzenle"
      size="xSmall"
      show={show}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Kupon Kodu"
          autoFocus
          error={errors.code && touched.code && errors.code}
          {...getFieldProps('code')}
        />

        <Select
          label="Tip"
          value={values.type}
          options={[
            { value: 'PERCENT', label: 'Yüzde' },
            { value: 'CONSTANT', label: 'Sabit Fiyat' },
          ]}
          onSelect={(val) => setFieldValue('type', val)}
        ></Select>

        <div className="flex gap-4">
          <Input
            label="Adet"
            error={errors.quantity && touched.quantity && errors.quantity}
            {...getFieldProps('quantity')}
          />

          <Input
            label={values.type === 'PERCENT' ? 'Yüzde' : 'Tutar'}
            error={errors.value && touched.value && errors.value}
            {...getFieldProps('value')}
          />
        </div>

        <Select
          label="Aktif mi?"
          value={values.isActive}
          options={[
            { value: true, label: 'Evet' },
            { value: false, label: 'Hayır' },
          ]}
          onSelect={(val) => setFieldValue('isActive', val)}
        ></Select>

        {values.code && (
          <div className="w-full p-3 box-border bg-orange-100 border border-orange-200 rounded-md text-orange-500 text-xs">
            <strong>{values.code}</strong> kupon kodu kullanıldığında
            250TL&lsquo;lik üründe{' '}
            <strong>
              {values.type == 'CONSTANT'
                ? values.value
                : `${(250 * values.value) / 100}`}
              TL
            </strong>{' '}
            indirim yapacaktır.
          </div>
        )}

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default EditCouponModal;
