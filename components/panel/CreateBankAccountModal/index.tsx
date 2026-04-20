'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotificationStore } from '@/stores/notificationStore';
import Image from 'next/image';
import { IoImageOutline } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';
import { uploadFile } from '@/services/uploadService';
import { createPanelBankAccount } from '@/services/bankAccountService';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import Select from '@/components/shared/Select';

interface Props {
  show: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
}

const CreateBankAccountModal = ({ show, onClose, onCreate }: Props) => {
  const { addNotification } = useNotificationStore();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      bank: '',
      iban: '',
      branchCode: '',
      logo: '',
      isActive: true,
    },
    validationSchema: Yup.object({
      bank: Yup.string()
        .required('Başlık zorunludur')
        .min(3, 'En az 3 karakter olmalıdır'),
      iban: Yup.string()
        .required('IBAN zorunludur')
        .min(3, 'En az 3 karakter olmalıdır'),
      branchCode: Yup.string()
        .required('Şube kodu zorunludur')
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
          data.logo = uploadedfile.filename;
        }
      }

      setLoading(true);
      const [err] = await createPanelBankAccount(data);
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
    <Modal title="Bank Hesabı Ekle" size="xSmall" show={show} onClose={onClose}>
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

        <Input
          label="Başlık"
          autoFocus
          error={errors.bank && touched.bank && errors.bank}
          {...getFieldProps('bank')}
        />

        <Input
          label="IBAN"
          error={errors.iban && touched.iban && errors.iban}
          {...getFieldProps('iban')}
        />

        <Input
          label="Şube Kodu"
          error={errors.branchCode && touched.branchCode && errors.branchCode}
          {...getFieldProps('branchCode')}
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

export default CreateBankAccountModal;
