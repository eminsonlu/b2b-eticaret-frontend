'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchPanelBlogById, updatePanelBlog } from '@/services/blogService';
import { fetchPanelProducts } from '@/services/productService';
import { uploadFile } from '@/services/uploadService';
import { useNotificationStore } from '@/stores/notificationStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Textarea from '@/components/shared/Textarea';
import Modal from '@/components/shared/Modal';
import RichTextEditor from '@/components/shared/RichTextEditor';
import MultiSelect from '@/components/shared/MultiSelect/MultiSelect';
import Checkbox from '@/components/shared/Checkbox';
import Select from '@/components/shared/Select';
import IProduct from '@/types/IProduct';
import Image from 'next/image';
import { IoImageOutline } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';
import { getImageUrl } from '@/utils/imageUtils';

interface Props {
  id: string;
  show: boolean;
  onClose: () => void;
  onEdit: (values: any) => void;
}

const EditBlogModal = ({ id, show, onClose, onEdit }: Props) => {
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      summary: '',
      description: '',
      thumbnail: '',
      isActive: true,
      status: 'DRAFT',
      productIds: [],
      products: [],
      slug: '',
      userId: '',
      createdAt: '',
      updatedAt: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Başlık zorunludur')
        .min(3, 'En az 3 karakter olmalıdır'),
      summary: Yup.string(),
      description: Yup.string(),
      thumbnail: Yup.string(),
      isActive: Yup.boolean(),
      status: Yup.string().oneOf(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
      productIds: Yup.array(),
    }),
    onSubmit: async (values) => {
      const { id, userId, createdAt, updatedAt, slug, products,  ...data } = values;

      setLoading(true);

      // Upload new thumbnail if changed
      if (thumbnail) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('file', thumbnail);
        const [thumbnailErr, uploadedThumbnail] = await uploadFile(thumbnailFormData);

        if (thumbnailErr) {
          setLoading(false);
          return addNotification({
            title: 'Hata',
            text: thumbnailErr.message || 'Resim yüklenirken bir hata oluştu.',
            type: 'error',
          });
        }

        data.thumbnail = uploadedThumbnail.filename;
      }

      const [err, blog] = await updatePanelBlog(values.id, data);
      setLoading(false);

      if (err) {
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      onEdit(blog);
      onClose();
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, resetForm, setValues, values, setFieldValue } = formik;

  useEffect(() => {
    if (!show) return;

    resetForm();
    setThumbnail(null);
    fetchProductsData();

    (async () => {
      const [err, data] = await fetchPanelBlogById(id);
      if (!err && data) {
        const productIds = data.products?.map((p: IProduct) => p.id) || [];
        setValues({
          ...data,
          productIds,
        });
      }
    })();
  }, [show, id, setValues]);

  const fetchProductsData = async () => {
    setLoadingProducts(true);
    const [err, data] = await fetchPanelProducts();
    setLoadingProducts(false);
    if (!err && data) {
      setProducts(data);
    }
  };

  return (
    <Modal title="Blog Yazısı Düzenle" size="large" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Başlık"
            autoFocus
            error={errors.title && touched.title ? String(errors.title) : undefined}
            {...getFieldProps('title')}
          />

          <div className="flex flex-col gap-1">
            <span className="text-sm text-black/80">Blog Resmi (16:9 oranı)</span>
            <div className="w-full aspect-video group p-2 border border-slate-200 hover:border-slate-300 rounded-md border-dashed flex items-center justify-center relative bg-gray-50">
              {!thumbnail && !values.thumbnail ? (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <IoImageOutline size={48} />
                  <span className="text-sm mt-2">Resim yüklemek için tıklayın</span>
                </div>
              ) : (
                <>
                  <Image
                    src={thumbnail
                      ? URL.createObjectURL(thumbnail)
                      : values.thumbnail
                      ? getImageUrl(`c-${values.thumbnail}`)
                      : ''
                    }
                    alt="Blog resmi"
                    width={0}
                    height={0}
                    className="w-full h-full object-cover rounded"
                    unoptimized
                  />
                  <div className="hidden absolute top-2 right-2 p-1 bg-white rounded-full shadow-md z-10 group-hover:block">
                    <BsTrash
                      size={16}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                      onClick={() => {
                        setThumbnail(null);
                        setFieldValue('thumbnail', '');
                      }}
                    />
                  </div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
              />
            </div>
          </div>
        </div>

        <Textarea
          label="Özet"
          rows={3}
          error={errors.summary && touched.summary ? String(errors.summary) : undefined}
          {...getFieldProps('summary')}
        />

        <div>
          <label className="block text-sm text-black/80 mb-2">İçerik</label>
          <RichTextEditor
            initialContent={values.description}
            onChange={(content) => setFieldValue('description', content)}
            error={errors.description && touched.description ? String(errors.description) : undefined}
          />
        </div>

        <div>
          <label className="block text-sm text-black/80 mb-2">İlgili Ürünler</label>
          <MultiSelect
            label=""
            selecteds={values.productIds}
            onSelect={(ids: string[]) => setFieldValue('productIds', ids)}
            error={errors.productIds && touched.productIds ? String(errors.productIds) : undefined}
          >
            {products.map((product) => (
              <MultiSelect.Item
                key={product.id}
                value={product.id}
                label={product.title}
              />
            ))}
          </MultiSelect>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Durum"
            error={errors.status && touched.status ? String(errors.status) : undefined}
            value={values.status}
            options={[
              { value: 'DRAFT', label: 'Taslak' },
              { value: 'PUBLISHED', label: 'Yayınlandı' },
              { value: 'ARCHIVED', label: 'Arşivlendi' }
            ]}
            onSelect={(value) => setFieldValue('status', value)}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              value={values.isActive}
              onChange={(checked) => setFieldValue('isActive', checked)}
            />
            <label className="text-sm">
              Aktif
            </label>
          </div>
        </div>

        <Button type="submit" loading={loading}>
          Kaydet
        </Button>
      </form>
    </Modal>
  );
};

export default EditBlogModal;