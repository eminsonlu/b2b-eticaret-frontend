'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchPanelTagById, updatePanelTag } from '@/services/tagService';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';

interface Props {
  id: string;
  show: boolean;
  onClose: () => void;
  onEdit: (values: any) => void;
}

const EditTagModal = ({ id, show, onClose, onEdit }: Props) => {
  const { addNotification } = useNotificationStore();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      slug: '',
      userId: '',
      createdAt: '',
      updatedAt: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Başlık zorunludur')
        .min(3, 'En az 3 karakter olmalıdır'),
    }),
    onSubmit: async (values) => {
      const { id, userId, createdAt, updatedAt, slug, ...data } = values;

      setLoading(true);
      const [err, tag] = await updatePanelTag(values.id, data);
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      onEdit(values);
      onClose();
    },
  });
  const { errors, touched, handleSubmit, getFieldProps, resetForm, setValues } =
    formik;

  useEffect(() => {
    if (!show) return;

    resetForm();

    (async () => {
      const [err, data] = await fetchPanelTagById(id);
      setValues(data);
    })();
  }, [show, id, setValues]);

  return (
    <Modal title="Etiket Düzenle" size="xSmall" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

export default EditTagModal;
