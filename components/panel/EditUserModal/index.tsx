'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchPanelUserById, updatePanelUser } from '@/services/userService';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import { fetchPanelUserRoles } from '@/services/userRoleService';
import Select from '@/components/shared/Select';
import IRole from '@/types/IRole';
import * as companyService from '@/services/companyService';
import { ICompany } from '@/types/ICompany';

interface Props {
  id: string;
  show: boolean;
  onClose: () => void;
  onEdit: (values: any) => void;
}

const EditUserModal = ({ id, show, onClose, onEdit }: Props) => {
  const { addNotification } = useNotificationStore();
  const { user: currentUser } = useAuthStore();

  const [roles, setRoles] = useState<any[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: '',
      createdAt: '',
      updatedAt: '',
      companyId: null as string | null,
      priceGroup: null as number | null,
      discountRate: null as number | null,
      isCompanyAdmin: false,
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      const { id, createdAt, updatedAt, ...data } = values;

      setLoading(true);
      const [err, tag] = await updatePanelUser(values.id, data);
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
    values,
    handleSubmit,
    setFieldValue,
    getFieldProps,
    resetForm,
    setValues,
  } = formik;

  useEffect(() => {
    if (!show) return;

    resetForm();

    (async () => {
      const [err, data] = await fetchPanelUserById(id);
      setValues(data);
    })();

    (async () => {
      const [err, data] = await fetchPanelUserRoles();
      if (err) return;
      setRoles([
        { label: 'Kullanıcı', value: null },
        ...data.map((role: IRole) => ({ label: role.title, value: role.id })),
      ]);
    })();

    if (currentUser?.role?.isAdmin) {
      (async () => {
        const [err, data] = await companyService.getCompanies();
        if (err) return;
        setCompanies(data);
      })();
    }
  }, [show, id, setValues, currentUser?.role?.isAdmin]);

  return (
    <Modal
      title="Kullanıcı Düzenle"
      size="xSmall"
      show={show}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            label="Ad"
            autoFocus
            error={errors.firstName && touched.firstName && errors.firstName}
            {...getFieldProps('firstName')}
          />
          <Input
            label="Soyad"
            error={errors.lastName && touched.lastName && errors.lastName}
            {...getFieldProps('lastName')}
          />
        </div>

        <div className="flex gap-4">
          <Input
            label="Telefon"
            autoFocus
            error={errors.phone && touched.phone && errors.phone}
            {...getFieldProps('phone')}
          />
          <Input
            label="E-posta"
            error={errors.email && touched.email && errors.email}
            {...getFieldProps('email')}
          />
        </div>

        <Select
          label="Yetki"
          value={values.roleId}
          options={roles}
          onSelect={(val) => setFieldValue('roleId', val)}
        />

        {currentUser?.role?.isAdmin && (
          <>
            <Select
              label="Şirket"
              value={values.companyId}
              options={[
                { label: 'Şirket Yok', value: null },
                ...companies.map((company) => ({
                  label: `${company.name} (${company.taxNumber})`,
                  value: company.id,
                })),
              ]}
              onSelect={(val) => setFieldValue('companyId', val)}
            />

            <Select
              label="Fiyat Grubu"
              value={values.priceGroup}
              options={[
                { label: 'Seçiniz', value: null },
                { label: 'Fiyat Grubu 1', value: 1 },
                { label: 'Fiyat Grubu 2', value: 2 },
                { label: 'Fiyat Grubu 3', value: 3 },
                { label: 'Fiyat Grubu 4', value: 4 },
                { label: 'Fiyat Grubu 5', value: 5 },
              ]}
              onSelect={(val) => setFieldValue('priceGroup', val)}
            />

            <Input
              label="Özel İskonto %"
              type="number"
              min="0"
              max="100"
              error={errors.discountRate && touched.discountRate && errors.discountRate}
              {...getFieldProps('discountRate')}
            />

            <div className="flex items-center gap-2">
              <input
                id="isCompanyAdmin"
                type="checkbox"
                checked={values.isCompanyAdmin}
                onChange={(e) => setFieldValue('isCompanyAdmin', e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor="isCompanyAdmin" className="cursor-pointer text-sm font-medium">Bu kullanıcıyı atandığı şirketin admini yap</label>
            </div>
          </>
        )}

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default EditUserModal;
