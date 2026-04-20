'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPanelVariantValue } from '@/services/variantService';
import IVariant from '@/types/IVariant';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import ColorPicker from '@/components/shared/ColorPicker';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';

interface Props {
  variant: IVariant;
  show: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
}

const CreateVariantValueModal = ({
  variant,
  show,
  onClose,
  onCreate,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const { addNotification } = useNotificationStore();

  const formik = useFormik({
    initialValues: {
      title: '',
      value: '',
    },
    validationSchema: Yup.object({
      value: Yup.string()
        .required('Başlık zorunludur')
        .min(1, 'En az 1 karakter olmalıdır'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const [err] = await createPanelVariantValue({
        ...values,
        variantId: variant.id,
      });
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }
      onCreate(values);
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
  } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [resetForm, show]);

  return (
    <Modal
      title={`${variant.title} Değeri Ekle`}
      size="xSmall"
      show={show}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Başlık"
          autoFocus
          error={errors.title && touched.title && errors.title}
          {...getFieldProps('title')}
        />

        {variant?.type === 'COLOR' ? (
          <ColorPicker
            label="Değer"
            value={values.value}
            error={errors.value && touched.value && errors.value}
            onSelect={(value: string) => setFieldValue('value', value)}
          />
        ) : (
          <Input
            label="Değer"
            error={errors.value && touched.value && errors.value}
            {...getFieldProps('value')}
          />
        )}

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default CreateVariantValueModal;
