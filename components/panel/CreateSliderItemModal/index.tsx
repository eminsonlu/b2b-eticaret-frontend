'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotificationStore } from '@/stores/notificationStore';
import { createPanelSliderItem } from '@/services/sliderService';
import { BsTrash } from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';
import Image from 'next/image';
import { uploadFile } from '@/services/uploadService';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import Select from '@/components/shared/Select';
import Textarea from '@/components/shared/Textarea';

interface Props {
  sliderId: string;
  show: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
}

const CreateSliderItemModal = ({
  sliderId,
  show,
  onClose,
  onCreate,
}: Props) => {
  const { addNotification } = useNotificationStore();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
      link: '',
      position: 'top-left',
      order: 99,
      isActive: true,
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      description: Yup.string(),
      image: Yup.string(),
      link: Yup.string(),
      order: Yup.number(),
      isActive: Yup.boolean(),
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
          data.image = uploadedfile.filename;
        }
      }

      setLoading(true);
      const [err] = await createPanelSliderItem(sliderId, data);
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
    setFile(null);
  }, [resetForm, show]);

  return (
    <Modal title="Öğe Ekle" size="xSmall" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="min-w-[125px] min-h-[125px] group p-1 border border-slate-200 hover:border-slate-300 rounded-md border-dashed flex items-center justify-center relative">
          {!file ? (
            <span className='flex flex-col items-center'>
                <span className='text-slate-300'>Format: 2400x1000</span>
                <IoImageOutline size={36} className="text-slate-300" />
            </span>
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

        <div className="flex gap-4">
          <Input
            label="Sıra"
            type="number"
            autoFocus
            error={touched.order && errors.order}
            {...getFieldProps('order')}
          />

          <Select
            label="Pozisyon"
            value={values.position}
            options={[
              { value: 'top-left', label: 'Sol Üst' },
              { value: 'top-right', label: 'Sağ Üst' },
              { value: 'bottom-left', label: 'Sol Alt' },
              { value: 'bottom-right', label: 'Sağ Alt' },
            ]}
            onSelect={(val) => setFieldValue('position', val)}
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

        <Input
          label="Başlık"
          autoFocus
          error={touched.title && errors.title}
          {...getFieldProps('title')}
        />

        <Input
          label="Link"
          autoFocus
          error={touched.link && errors.link}
          {...getFieldProps('link')}
        />

        <Textarea
          label="Açıklama"
          autoFocus
          error={touched.description && errors.description}
          {...getFieldProps('description')}
        />

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default CreateSliderItemModal;
