'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotificationStore } from '@/stores/notificationStore';
import {
  fetchPanelSliderById,
  updatePanelSlider,
} from '@/services/sliderService';
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

const EditSliderModal = ({ id, show, onClose, onEdit }: Props) => {
  const { addNotification } = useNotificationStore();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      key: '',
      isActive: true,
      userId: '',
      createdAt: '',
      updatedAt: '',
      sliderItems: [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Başlık zorunludur')
        .min(3, 'En az 3 karakter olmalıdır'),
    }),
    onSubmit: async (values) => {
      const { id, createdAt, updatedAt, userId, sliderItems, ...data } = values;

      setLoading(true);
      const [err] = await updatePanelSlider(values.id, { ...data });
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
      const [err, data] = await fetchPanelSliderById(id);
      setValues(data);
    })();
  }, [show, id, setValues]);

  return (
    <Modal title="Slider Düzenle" size="xSmall" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Başlık"
          autoFocus
          error={touched.title && errors.title}
          {...getFieldProps('title')}
        />

        <Input
          label="ID"
          error={touched.key && errors.key}
          {...getFieldProps('key')}
        />

        <Select
          label="Aktif mi?"
          value={values.isActive}
          options={[
            { value: true, label: 'Evet' },
            { value: false, label: 'Hayır' },
          ]}
          onSelect={(val) => setFieldValue('isActive', val)}
        ></Select>

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default EditSliderModal;
