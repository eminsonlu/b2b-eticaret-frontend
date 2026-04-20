'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPanelVariant } from '@/services/variantService';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import Select from '@/components/shared/Select';

interface Props {
  show: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
}

const CreateVariantModal = ({ show, onClose, onCreate }: Props) => {
  const [loading, setLoading] = useState(false);

  const { addNotification } = useNotificationStore();

  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'SELECT',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Başlık zorunludur')
        .min(3, 'En az 3 karakter olmalıdır'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const [err] = await createPanelVariant({ ...values });
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
    <Modal title="Varyant Ekle" size="xSmall" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select
          label="Tip"
          options={[
            {
              label: 'Seçim',
              value: 'SELECT',
            },
            {
              label: 'Düğme',
              value: 'BUTTON',
            },
            {
              label: 'Renk',
              value: 'COLOR',
            },
          ]}
          value={values.type}
          onSelect={(option) => setFieldValue('type', option)}
        />

        <Input
          label="Başlık"
          autoFocus
          error={errors.title && touched.title && errors.title}
          {...getFieldProps('title')}
        />

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default CreateVariantModal;
