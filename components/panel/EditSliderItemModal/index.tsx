'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotificationStore } from '@/stores/notificationStore';
import {
  fetchPanelSliderItem,
  updatePanelSliderItem,
} from '@/services/sliderService';
import { BsTrash } from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';
import Image from 'next/image';
import { uploadFile } from '@/services/uploadService';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import Select from '@/components/shared/Select';
import Textarea from '@/components/shared/Textarea';
import { getImageUrl } from '@/utils/imageUtils';

interface Props {
  id: string;
  sliderId: string;
  show: boolean;
  onClose: () => void;
  onEdit: (values: any) => void;
}

const EditSliderItemModal = ({
  id,
  sliderId,
  show,
  onClose,
  onEdit,
}: Props) => {
  const { addNotification } = useNotificationStore();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      description: '',
      image: '',
      link: '',
      position: 'top-left',
      order: 99,
      isActive: true,
      userId: '',
      createdAt: '',
      updatedAt: '',
      sliderId: '',
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
      const { id, userId, createdAt, updatedAt, sliderId, ...data } = values;

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
      const [err] = await updatePanelSliderItem(id, sliderId, {
        ...data,
        order: parseInt(data.order.toString()),
      });
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
    values,
    setFieldValue,
    setValues,
  } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
    setFile(null);
  }, [resetForm, show]);

  useEffect(() => {
    if (!show) return;
    (async () => {
      const [err, data] = await fetchPanelSliderItem(id, sliderId);
      setValues(data);
    })();
  }, [show, id, setValues, sliderId]);

  return (
    <Modal title="Öğe Düzenle" size="xSmall" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="min-w-[125px] min-h-[125px] group p-1 border border-slate-200 hover:border-slate-300 rounded-md border-dashed flex items-center justify-center relative">
          {!file && !values.image ? (
            <IoImageOutline size={36} className="text-slate-300" />
          ) : (
            <>
              <Image
                loader={({ src }) => src}
                src={
                  file
                    ? URL.createObjectURL(file)
                    : values.image
                    ? getImageUrl(values.image)
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
                    setFieldValue('image', '');
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

        <div className="flex gap-4">
          <Input
            label="Sıra"
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

export default EditSliderItemModal;
