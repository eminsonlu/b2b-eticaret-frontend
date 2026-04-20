'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  createPanelCategory,
  fetchPanelCategories,
} from '@/services/categoryService';
import { useNotificationStore } from '@/stores/notificationStore';
import Image from 'next/image';
import { IoImageOutline } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';
import { uploadFile } from '@/services/uploadService';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import Select from '@/components/shared/Select';
import Textarea from '@/components/shared/Textarea';
import RichTextEditor from '@/components/shared/RichTextEditor';
import ICategory from '@/types/ICategory';

interface Props {
  parentId?: null | string;
  show: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
  showParentInput?: boolean;
}

const CreateCategoryModal = ({
  show,
  onClose,
  onCreate,
  parentId = null,
  showParentInput = false,
}: Props) => {
  const { addNotification } = useNotificationStore();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
      isFeatured: false,
      isActive: true,
      parentId: parentId,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Başlık zorunludur')
        .min(3, 'En az 3 karakter olmalıdır'),
    }),
    onSubmit: async (values) => {
      const { ...data } = values;

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
      const [err, createdCategory] = await createPanelCategory(data);
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      onCreate(createdCategory);
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
    setFile(null);
  }, [resetForm, show]);

  useEffect(() => {
    if (!showParentInput) return;

    (async () => {
      const [err, categories] = await fetchPanelCategories();
      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }
      setCategories(categories);
    })();
  }, []);

  return (
    <Modal title="Kategori Ekle" size="small" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="w-[125px] min-h-[125px] group p-1 border border-slate-200 hover:border-slate-300 rounded-md border-dashed flex items-center justify-center relative">
          {!file ? (
            <IoImageOutline size={36} className="text-slate-300" />
          ) : (
            <>
              <Image
                src={URL.createObjectURL(file)}
                alt="Thumbnail"
                title="Thumbnail"
                width={0}
                height={0}
                className="w-full max-w-[250px] h-auto rounded"
                unoptimized
              />

              <div className="hidden absolute rounded-md top-2 right-2 p-1 text-sm z-10 bg-red-500 group-hover:block">
                <BsTrash
                  size={16}
                  className="cursor-pointer text-white"
                  onClick={() => setFile(null)}
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

        {showParentInput && (
          <Select
            label="Üst Kategori?"
            value={values.parentId}
            options={[
              {
                value: null,
                label: 'Üst Kategori Yok',
              },
              ...categories.map((c) => ({
                value: c.id,
                label: c.title,
              })),
            ]}
            onSelect={(val) => {
              setFieldValue('parentId', val);
            }}
          ></Select>
        )}

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

export default CreateCategoryModal;
