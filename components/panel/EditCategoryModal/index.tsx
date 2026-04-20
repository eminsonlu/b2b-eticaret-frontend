'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  fetchPanelCategoryById,
  updatePanelCategory,
} from '@/services/categoryService';
import { useNotificationStore } from '@/stores/notificationStore';
import { uploadFile } from '@/services/uploadService';
import { BsTrash } from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';
import Image from 'next/image';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import Select from '@/components/shared/Select';
import Textarea from '@/components/shared/Textarea';
import RichTextEditor from '@/components/shared/RichTextEditor';
import { getImageUrl } from '@/utils/imageUtils';

interface Props {
  id: string;
  show: boolean;
  onClose: () => void;
  onEdit: (values: any) => void;
}

const EditCategoryModal = ({ id, show, onClose, onEdit }: Props) => {
  const { addNotification } = useNotificationStore();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      slug: '',
      description: '',
      thumbnail: '',
      isFeatured: false,
      isActive: false,
      parentId: null,
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
      const { id, userId, createdAt, updatedAt, parentId, slug, ...data } =
        values;

      // upload file
      if (file !== null) {
        const fileFormData = new FormData();
        fileFormData.append('file', file as Blob);
        const [fileErr, uploadedfile] = await uploadFile(fileFormData);

        if (fileErr) {
          addNotification({
            title: 'Hata',
            text: fileErr.message || 'Resim yüklenirken bir hata oluştu.',
            type: 'error',
          });
        } else {
          data.thumbnail = uploadedfile.filename;
        }
      }

      setLoading(true);
      const [err] = await updatePanelCategory(values.id, data);
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
  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    resetForm,
    setValues,
    values,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
    setFile(null);
  }, [resetForm, show]);

  useEffect(() => {
    if (!show) return;
    (async () => {
      const [err, data] = await fetchPanelCategoryById(id);
      setValues(data);
    })();
  }, [show, id, setValues]);

  return (
    <Modal title="Kategori Düzenle" size="small" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="w-[125px] min-h-[125px] group p-1 border border-slate-200 hover:border-slate-300 rounded-md border-dashed flex items-center justify-center relative">
          {!file && !values.thumbnail ? (
            <IoImageOutline size={36} className="text-slate-300" />
          ) : (
            <>
              <Image
                loader={({ src }) => src}
                src={
                  file
                    ? URL.createObjectURL(file)
                    : values.thumbnail
                    ? getImageUrl(values.thumbnail)
                    : ''
                }
                title="Thumbnail"
                alt="Thumbnail"
                width={0}
                height={0}
                className="w-full max-w-[250px] h-auto rounded"
                unoptimized
              />

              <div className="hidden absolute rounded-md top-2 right-2 p-1 text-sm z-10 bg-red-500 group-hover:block">
                <BsTrash
                  size={16}
                  className="cursor-pointer text-white"
                  onClick={() => {
                    setFile(null);
                    setFieldValue('thumbnail', '');
                  }}
                />
              </div>
            </>
          )}

          <input
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>

        <Input
          label="Başlık"
          autoFocus
          error={errors.title && touched.title && errors.title}
          {...getFieldProps('title')}
        />

        <div className="flex gap-4">
          <Select
            label="Öne Çıkarılsın mı?"
            value={values.isFeatured}
            options={[
              { value: true, label: 'Evet' },
              { value: false, label: 'Hayır' },
            ]}
            onSelect={(val) => setFieldValue('isFeatured', val)}
          ></Select>

          <Select
            label="Aktif mi?"
            value={values.isActive}
            options={[
              { value: true, label: 'Evet' },
              { value: false, label: 'Hayır' },
            ]}
            onSelect={(val) => setFieldValue('isActive', val)}
          ></Select>
        </div>

        <RichTextEditor
          initialContent={values.description}
          onChange={(content) => setFieldValue('description', content)}
          error={errors.description}
          height={200}
        />

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default EditCategoryModal;
