'use client';
import { createPanelProduct } from '@/services/productService';
import { useNotificationStore } from '@/stores/notificationStore';
import ICategory from '@/types/ICategory';
import ITag from '@/types/ITag';
import IVariant from '@/types/IVariant';
import { useFormik } from 'formik';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import Image from 'next/image';
import { BsTrash } from 'react-icons/bs';
import classNames from 'classnames';
import { uploadFile, uploadMultipleFile } from '@/services/uploadService';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';
import Table from '@/components/shared/Table';
import Textarea from '@/components/shared/Textarea';
import MultiSelect from '@/components/shared/MultiSelect/MultiSelect';
import Modal from '@/components/shared/Modal';
import RichTextEditor from '@/components/shared/RichTextEditor';
import CreateTagModal from '@/components/panel/CreateTagModal';
import CreateCategoryModal from '@/components/panel/CreateCategoryModal';
import CreateVariantModal from '@/components/panel/CreateVariantModal';

interface Props {
  categories: ICategory[];
  tags: ITag[];
  variants: IVariant[];
}

const NewProductContainer = ({ categories, tags, variants = [] }: Props) => {
  const { addNotification } = useNotificationStore();
  const router = useRouter();

  const variantValues = useMemo(() => {
    return variants?.map((variant) => variant.variantValues).flat(2);
  }, [variants]);

  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: any[];
  }>({});
  const [loading, setLoading] = useState<'product' | 'fields' | null>(null);
  const [modals, setModals] = useState<
    | 'fields'
    | 'create-tag'
    | 'create-category'
    | 'create-variant'
    | 'create-variant-value'
    | null
  >(null);
  const [fieldName, setFieldName] = useState<string>('');
  const [images, setImages] = useState<{
    thumbnail: File | null;
    images: File[];
  }>({
    thumbnail: null,
    images: [],
  });

  const cartesian = (...a: any[]) =>
    a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));

  const formik = useFormik({
    initialValues: {
      title: '',
      sku: '',
      stock: 100,
      summary: '',
      description: '',
      price: 100,
      price1: 100,
      price2: 100,
      price3: 100,
      price4: 100,
      price5: 100,
      thumbnail: '',
      isFeatured: false,
      isShowStories: false,
      isRequireAttachment: true,
      attachmentCount: 0,
      status: 'PUBLISHED',
      type: 'SIMPLE',
      categories: [],
      tags: [],
      images: [],
      variants: [] as any[],
      fields: [],
    },
    validationSchema: yup.object().shape({
      title: yup.string().required('Başlık zorunludur.'),
      sku: yup.string(),
      stock: yup.number().typeError('Stok sayı olmalıdır.').required(),
      summary: yup.string(),
      description: yup.string(),
      price: yup.number().typeError('Fiyat sayı olmalıdır.').required(),
      price1: yup.number().typeError('Fiyat sayı olmalıdır.').required(),
      price2: yup.number().typeError('Fiyat sayı olmalıdır.').required(),
      price3: yup.number().typeError('Fiyat sayı olmalıdır.').required(),
      price4: yup.number().typeError('Fiyat sayı olmalıdır.').required(),
      price5: yup.number().typeError('Fiyat sayı olmalıdır.').required(),
      attachmentCount: yup
        .number()
        .typeError('Gerekli Dosya Sayısı sayı olmalıdır.'),
      thumbnail: yup.string(),
      status: yup.string().required(),
      type: yup.string().required(),
      categories: yup.array().of(yup.string()),
      tags: yup.array().of(yup.string()),
      images: yup.array().of(yup.string()),
      variants: yup.array().of(yup.object()),
    }),
    onSubmit: async (values) => {
      const data = { ...values };

      if (!images.thumbnail) {
        addNotification({
          title: 'Hata',
          text: 'Resim yükleyiniz.',
          type: 'error',
        });
        return;
      }

      setLoading('product');

      // upload thumbnail
      const thumbnailFormData = new FormData();
      thumbnailFormData.append('file', images.thumbnail as Blob);
      const [thumbnailErr, uploadedThumbnail] = await uploadFile(
        thumbnailFormData
      );

      if (thumbnailErr) {
        addNotification({
          title: 'Hata',
          text: thumbnailErr.message || 'Resim yüklenirken bir hata oluştu.',
          type: 'error',
        });
      } else {
        data.thumbnail = uploadedThumbnail.filename;
      }

      const imagesFormData = new FormData();
      images.images.forEach((image) => imagesFormData.append('files', image));
      const [imagesErr, uploadedImages] = await uploadMultipleFile(
        imagesFormData
      );

      if (imagesErr) {
        addNotification({
          title: 'Hata',
          text: imagesErr.message || 'Resim yüklenirken bir hata oluştu.',
          type: 'error',
        });
      } else {
        data.images = uploadedImages.map((image: any) => image.filename);
      }

      if (data.type === 'VARIABLE') {
        data.variants = values.variants;

        for (const product of data.variants) {
          if (!product.file) continue;

          const thumbnailFormData = new FormData();
          thumbnailFormData.append('file', product.file as Blob);
          const [thumbnailErr, uploadedThumbnail] = await uploadFile(
            thumbnailFormData
          );

          if (thumbnailErr) {
            addNotification({
              title: 'Hata',
              text:
                thumbnailErr.message || 'Resim yüklenirken bir hata oluştu.',
              type: 'error',
            });
          } else {
            product.thumbnail = uploadedThumbnail.filename;
          }
        }
      }

      setLoading('product');
      const [err, createdProduct] = await createPanelProduct({
        ...data,
        price: +data.price,
        price1: +data.price1,
        price2: +data.price2,
        price3: +data.price3,
        price4: +data.price4,
        price5: +data.price5,
        stock: +data.stock,
        attachmentCount: +data.attachmentCount,
      });

      if (err) {
        setLoading(null);
        return addNotification({
          title: 'Hata',
          text: err.message,
          type: 'error',
        });
      }

      addNotification({
        title: 'Başarılı',
        text: 'Ürün başarıyla oluşturuldu.',
        type: 'success',
      });

      router.refresh();
      setTimeout(() => router.push('/panel/products'), 750);
    },
  });
  const { values, getFieldProps, setFieldValue, handleSubmit } = formik;

  const handleAddField = () => {
    if (!fieldName) return;

    setFieldValue('fields', [...values.fields, fieldName]);
    setFieldName('');
    setModals(null);
  };

  const handleChangeVariantProduct = (
    index: number,
    field: string,
    value: any
  ) => {
    setFieldValue(`variants.${index}.${field}`, value);
  };

  const handleVariantImageChange = (index: number, file: File | null) => {
    setFieldValue(`variants.${index}.file`, file);
    if (file) {
      setImages((pre) => ({
        ...pre,
        images: [...pre.images, file],
      }));
    }
  };

  useEffect(() => {
    if (Object.keys(selectedVariants).length === 0) return;

    const createVariants = cartesian(...Object.values(selectedVariants));

    const newCartesianProducts = createVariants.map((variants: any) => {
      const variantTitle = (Array.isArray(variants) ? variants : [variants])
        ?.map(
          (id: any) => variantValues.find((i: any) => i.id == id)?.title || ''
        )
        .join(' ');

      const existingProduct = values.variants.find(
        (p: any) => p.title === variantTitle
      );

      return {
        ...existingProduct,
        title: variantTitle,
        ...(!existingProduct && {
          sku: '',
          stock: 100,
          price: values.price,
          price1: values.price1,
          price2: values.price2,
          price3: values.price3,
          price4: values.price4,
          price5: values.price5,
          thumbnail: '',
          file: null,
          status: 'PUBLISHED',
          isRequireAttachment: true,
          attachmentCount: 3,
          variants,
        }),
      };
    });

    setFieldValue('variants', newCartesianProducts);
  }, [selectedVariants, variantValues]);
  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-[1240px] mt-4 mx-auto">
        <div className="flex items-center">
          <h1 className="font-semibold text-5xl">Yeni Ürün</h1>
        </div>

        <section className="w-full flex flex-col gap-4 p-6 box-border rounded-md bg-white min-h-[100px] border border-slate-200">
          <h3 className="font-medium text-xl text-black">Temel Bilgiler</h3>
          <div className="flex flex-col gap-4">
            <div className="w-[175px] min-h-[175px] group p-1 border border-slate-200 hover:border-slate-300 rounded-md border-dashed flex items-center justify-center relative">
              {!images.thumbnail ? (
                <IoImageOutline size={36} className="text-slate-300" />
              ) : (
                <>
                  <Image
                    src={URL.createObjectURL(images.thumbnail)}
                    alt={values.title}
                    title={values.title}
                    width={0}
                    height={0}
                    className="w-full max-w-[250px] h-auto rounded"
                    unoptimized
                  />

                  <div className="hidden absolute top-1 right-1 p-1 text-sm z-10 group-hover:block">
                    <BsTrash
                      size={18}
                      className="cursor-pointer text-red-400"
                      onClick={() =>
                        setImages((pre) => ({ ...pre, thumbnail: null }))
                      }
                    />
                  </div>
                </>
              )}

              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) =>
                  setImages((pre) => ({
                    ...pre,
                    thumbnail: e.target.files ? e.target.files[0] : null,
                  }))
                }
              />
            </div>

            <div className="max-w-[690px] flex flex-col gap-4">
              <Input label="Başlık" {...getFieldProps('title')} />

              <div className="flex gap-4">
                <Select
                  label="Tip"
                  options={[
                    { label: 'Basit Ürün', value: 'SIMPLE' },
                    { label: 'Varyantlı Ürün', value: 'VARIABLE' },
                  ]}
                  value={values.type}
                  onSelect={(val) => setFieldValue('type', val)}
                />
                <Select
                  label="Durum"
                  options={[
                    { label: 'Yayında', value: 'PUBLISHED' },
                    { label: 'Taslak', value: 'DRAFT' },
                    { label: 'Arşivlendi', value: 'ARCHIVED' },
                  ]}
                  value={values.status}
                  onSelect={(val) => setFieldValue('status', val)}
                />
              </div>

              {values.type === 'SIMPLE' && (
                <div className="flex gap-4">
                  <Select
                    label="Yükleme zorunlu mu?"
                    options={[
                      { label: 'Evet', value: true },
                      { label: 'Hayır', value: false },
                    ]}
                    value={values.isRequireAttachment}
                    onSelect={(val) => {
                      setFieldValue('isRequireAttachment', val);
                      if (!val) {
                        setFieldValue('attachmentCount', 0);
                      }
                    }}
                  />
                  <Input
                    label="Gerekli Dosya Sayısı"
                    {...getFieldProps('attachmentCount')}
                    disabled={!values.isRequireAttachment}
                  />
                </div>
              )}

              <div className="flex gap-4">
                <Input label="Fiyat (Vitrin)" {...getFieldProps('price')} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Fiyat Grubu 1" {...getFieldProps('price1')} />
                <Input label="Fiyat Grubu 2" {...getFieldProps('price2')} />
                <Input label="Fiyat Grubu 3" {...getFieldProps('price3')} />
                <Input label="Fiyat Grubu 4" {...getFieldProps('price4')} />
                <Input label="Fiyat Grubu 5" {...getFieldProps('price5')} />
              </div>

              <div className="flex gap-4">
                <Input label="Stok" {...getFieldProps('stock')} />
                <Input label="Stok Kodu" {...getFieldProps('sku')} />
              </div>

              <div className="flex gap-4">
                <Select
                  label="Öne Çıkarılsın mı?"
                  options={[
                    { label: 'Evet', value: true },
                    { label: 'Hayır', value: false },
                  ]}
                  value={values.isFeatured}
                  onSelect={(val) => setFieldValue('isFeatured', val)}
                />
                <Select
                  label="Hikayede gösterilsin mi?"
                  options={[
                    { label: 'Evet', value: true },
                    { label: 'Hayır', value: false },
                  ]}
                  value={values.isShowStories}
                  onSelect={(val) => setFieldValue('isShowStories', val)}
                />
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <MultiSelect
                label="Kategoriler"
                selecteds={values.categories}
                onSelect={(vals) => setFieldValue('categories', vals)}
                onCreate={() => setModals('create-category')}
              >
                {categories.map((category, index) => (
                  <MultiSelect.Item
                    key={index}
                    label={category.title}
                    value={category.id}
                  >
                    {category.title}
                  </MultiSelect.Item>
                ))}
              </MultiSelect>

              <MultiSelect
                label="Etiketler"
                selecteds={values.tags}
                onSelect={(vals) => setFieldValue('tags', vals)}
                onCreate={() => setModals('create-tag')}
              >
                {tags.map((tag, index) => (
                  <MultiSelect.Item
                    key={index}
                    label={tag.title}
                    value={tag.id}
                  >
                    #{tag.title}
                  </MultiSelect.Item>
                ))}
              </MultiSelect>
            </div>

            <Textarea label="Kısa Açıklama" {...getFieldProps('summary')} />
            <RichTextEditor
              initialContent={values.description}
              onChange={(content) => setFieldValue('description', content)}
            />
          </div>
        </section>

        <section className="w-full flex flex-col gap-4 p-6 box-border rounded-md bg-white min-h-[100px] border border-slate-200">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-medium text-xl text-black">Ek Alanlar</h3>
            <Button
              color="green"
              size="small"
              onClick={() => setModals('fields')}
            >
              Ekle
            </Button>
          </div>

          {values.fields.map((field, index) => (
            <div
              key={index}
              className="w-full p-3 box-border rounded bg-slate-100 flex items-center justify-between -mb-2"
            >
              <span>{field}</span>
              <BsTrash
                size={20}
                className="cursor-pointer opacity-50 hover:opacity-100"
                onClick={() =>
                  setFieldValue(
                    'fields',
                    values.fields.filter((_, i) => i !== index)
                  )
                }
              />
            </div>
          ))}
        </section>

        <section className="w-full flex flex-col gap-4 p-6 box-border rounded-md bg-white min-h-[100px] border border-slate-200">
          <h3 className="font-medium text-xl text-black">Görseller</h3>

          <div
            className={classNames('w-full grid grid-cols-6 gap-3 mb-4', {
              hidden: images.images.length === 0,
            })}
          >
            {images.images.map((image, index) => (
              <div className="group relative" key={index}>
                <Image
                  src={URL.createObjectURL(image)}
                  alt={values.title}
                  title={values.title}
                  width={0}
                  height={0}
                  className="w-full max-w-[250px] h-auto rounded"
                  unoptimized
                />

                <div className="hidden absolute top-1 right-1 p-1 text-sm z-10 group-hover:block">
                  <BsTrash
                    size={18}
                    className="cursor-pointer text-red-400"
                    onClick={() =>
                      setImages((pre) => ({
                        ...pre,
                        images: pre.images.filter((_, i) => i !== index),
                      }))
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full min-h-[125px] group p-1 border border-slate-200 hover:border-slate-300 rounded-md border-dashed flex items-center justify-center relative">
            <IoImageOutline size={36} className="text-slate-300" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImages((pre) => ({
                  ...pre,
                  images: e.target.files
                    ? [...pre.images, ...Array.from(e.target.files)]
                    : [],
                }))
              }
              multiple
            />
          </div>
        </section>

        {values.type === 'VARIABLE' && (
          <section className="w-full flex flex-col gap-4 p-6 box-border rounded-md bg-white min-h-[100px] border border-slate-200">
            <h3 className="font-medium text-xl text-black">Varyantlar</h3>

            <MultiSelect
              label="Varyantlar"
              selecteds={Object.keys(selectedVariants)}
              onCreate={() => setModals('create-variant')}
              onSelect={(vals) =>
                setSelectedVariants(
                  vals.reduce(
                    (acc: any, val: any) => ({ ...acc, [val]: [] }),
                    {}
                  )
                )
              }
            >
              {variants.map((variant, index) => (
                <MultiSelect.Item
                  key={index}
                  label={variant.title}
                  value={variant.id}
                >
                  {variant.title}
                </MultiSelect.Item>
              ))}
            </MultiSelect>

            {Object.keys(selectedVariants).map((selectedVariant, index) => (
              <MultiSelect
                key={index}
                label={
                  variants.find((v) => v.id === selectedVariant)?.title || ''
                }
                selecteds={selectedVariants[selectedVariant]}
                onSelect={(vals) =>
                  setSelectedVariants((pre) => ({
                    ...pre,
                    [selectedVariant]: vals,
                  }))
                }
              >
                {(
                  variants?.find((v) => v.id === selectedVariant)
                    ?.variantValues || []
                ).map((variant, index) => (
                  <MultiSelect.Item
                    key={index}
                    label={variant.title}
                    value={variant.id}
                  >
                    {variant.title}
                  </MultiSelect.Item>
                ))}
              </MultiSelect>
            ))}

            <h3 className="font-medium text-xl text-black mt-8">
              Varyantlı Ürünler ({values.variants.length})
            </h3>

            <div className="flex flex-col gap-4">
              <Table
                columns={[
                  {
                    title: 'Resim',
                    content: (row: any, index: number) => (
                      <div className="w-[50px] min-h-[50px] group p-1 border border-slate-200 hover:border-slate-300 rounded-md border-dashed flex items-center justify-center relative">
                        {!row.file ? (
                          <IoImageOutline
                            size={36}
                            className="text-slate-300"
                          />
                        ) : (
                          <>
                            <Image
                              src={URL.createObjectURL(row.file)}
                              alt={row.title}
                              title={row.title}
                              width={0}
                              height={0}
                              className="w-full max-w-[50px] h-auto rounded"
                              unoptimized
                            />
                            <div className="hidden absolute top-1 right-1 p-1 text-sm z-10 group-hover:block">
                              <BsTrash
                                size={18}
                                className="cursor-pointer text-red-400"
                                onClick={() =>
                                  handleVariantImageChange(index, null)
                                }
                              />
                            </div>
                          </>
                        )}
                        <input
                          type="file"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) =>
                            handleVariantImageChange(
                              index,
                              e.target.files?.[0] || null
                            )
                          }
                        />
                      </div>
                    ),
                    className: 'max-w-[75px] w-[75px]',
                  },
                  {
                    title: 'Başlık',
                    content: (row: any) => row.title,
                  },
                  {
                    title: 'Stok Kodu',
                    content: (row: any, index: number) => (
                      <Input
                        size="small"
                        value={row.sku}
                        onChange={(e) =>
                          handleChangeVariantProduct(
                            index,
                            'sku',
                            e.target.value
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: 'Stok',
                    content: (row: any, index: number) => (
                      <Input
                        size="small"
                        value={row.stock}
                        onChange={(e) =>
                          handleChangeVariantProduct(
                            index,
                            'stock',
                            e.target.value
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: 'Fiyat',
                    content: (row: any, index: number) => (
                      <Input
                        size="small"
                        value={row.price}
                        onChange={(e) =>
                          handleChangeVariantProduct(
                            index,
                            'price',
                            e.target.value
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: 'Fiyat Grubu 1',
                    content: (row: any, index: number) => (
                      <Input
                        size="small"
                        value={row.price1}
                        onChange={(e) =>
                          handleChangeVariantProduct(
                            index,
                            'price1',
                            e.target.value
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: 'Yükleme zorunlu mu?',
                    content: (row: any, index: number) => (
                      <Select
                        size="small"
                        options={[
                          { label: 'Evet', value: true },
                          { label: 'Hayır', value: false },
                        ]}
                        value={row.isRequireAttachment}
                        onSelect={(opt) =>
                          handleChangeVariantProduct(
                            index,
                            'isRequireAttachment',
                            opt
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: 'Gerekli Dosya Sayısı',
                    content: (row: any, index: number) => (
                      <Input
                        size="small"
                        value={row.attachmentCount}
                        disabled={!row.isRequireAttachment}
                        onChange={(e) =>
                          handleChangeVariantProduct(
                            index,
                            'attachmentCount',
                            e.target.value
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: 'Durum',
                    content: (row: any, index: number) => (
                      <Select
                        size="small"
                        options={[
                          { label: 'Yayında', value: 'PUBLISHED' },
                          { label: 'Taslak', value: 'DRAFT' },
                          { label: 'Arşivlendi', value: 'ARCHIVED' },
                        ]}
                        value={row.status}
                        onSelect={(opt) =>
                          handleChangeVariantProduct(index, 'status', opt)
                        }
                      />
                    ),
                  },
                ]}
                data={values.variants}
              />
            </div>
          </section>
        )}

        <Button
          size="large"
          loading={loading == 'product'}
          onClick={() => handleSubmit()}
        >
          Kaydet
        </Button>
      </div>

      <Modal
        size="xSmall"
        show={modals === 'fields'}
        title="Yeni alan ekle"
        onClose={() => setModals(null)}
        className="flex flex-col gap-4"
      >
        <Input
          label="Başlık"
          value={fieldName}
          onKeyDown={(e) => e.key === 'Enter' && handleAddField()}
          onChange={(e) => setFieldName(e.target.value)}
        />
        <Button type="submit" onClick={handleAddField}>
          Kaydet
        </Button>
      </Modal>

      <CreateTagModal
        show={modals === 'create-tag'}
        onClose={() => setModals(null)}
        onCreate={(val) => router.refresh()}
      />

      <CreateCategoryModal
        show={modals === 'create-category'}
        onClose={() => setModals(null)}
        onCreate={(val) => router.refresh()}
        showParentInput
      />

      <CreateVariantModal
        show={modals === 'create-variant'}
        onClose={() => setModals(null)}
        onCreate={(val) => router.refresh()}
      />
    </>
  );
};

export default NewProductContainer;
