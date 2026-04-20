'use client';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { TiWarning } from 'react-icons/ti';
import Image from 'next/image';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillCloudUploadFill,
  BsTrash,
} from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';
import { uploadMultipleFile } from '@/services/uploadService';
import { useNotificationStore } from '@/stores/notificationStore';
import {
  createOrderAttachment,
  fetchOrderAttachments,
  fetchPanelOrderAttachments,
} from '@/services/orderAttachmentService';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { IOrderItem } from '@/types/IOrder';
import { DateTime } from 'luxon';

interface Props {
  item: IOrderItem;
  service?: 'user' | 'panel';
  disabled?: boolean;
}

const OrderAttachments = ({
  disabled = false,
  item,
  service = 'user',
}: Props) => {
  const { addNotification } = useNotificationStore();

  const [isWaitinImages, setIsWaitingImages] = useState(
    disabled ? false : true
  );
  const [progress, setProgress] = useState('0.00');
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [attachments, setAttachments] = useState<{ file: File }[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [bigImageIndex, setBigImageIndex] = useState<null | number>(null);
  const [fieldsValue, setFieldsValue] = useState<{ [key: string]: string }>({});
  const [updatedAt, setUpdatedAt] = useState<null | string>(null);

  const previews = useMemo(() => {
    return attachments.map((item) => URL.createObjectURL(item.file));
  }, [attachments]);

  const handleUpload = async () => {
    const formData = new FormData();
    attachments.forEach((attachment) =>
      formData.append('files', attachment.file)
    );

    setLoading(true);
    const [err, result] = await uploadMultipleFile(formData, {
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted =
          (progressEvent.loaded * 100) / progressEvent.total;
        setProgress(percentCompleted.toFixed(2));
      },
    });

    if (err) {
      return addNotification({
        title: 'Hata',
        text: err.message || 'Resimler yüklenirken bir hata oluştu.',
        type: 'error',
      });
    }

    const [saveErr, attahcmentData] = await createOrderAttachment(item.id, {
      images: result.map((item: any) => item.filename),
      fields: fieldsValue,
    });

    if (saveErr) {
      return addNotification({
        title: 'Hata',
        text:
          err.message || 'Resimler yüklendi ama kaydedilirken bir hata oluştu.',
        type: 'error',
      });
    }

    setLoading(false);

    setAttachments([]);
    setIsWaitingImages(false);
    setUploadedImages(result.map((item: any) => item.filename));
    setUpdatedAt(attahcmentData.updatedAt);
  };

  const handleNext = () => {
    setBigImageIndex((pre) => {
      if (pre == null) return null;
      const newCount = pre + 1;
      return newCount == uploadedImages.length ? 0 : pre + 1;
    });
  };

  const handlePrev = () => {
    setBigImageIndex((pre) => {
      if (pre == null) return null;
      const newCount = pre - 1;
      return newCount < 0 ? uploadedImages.length - 1 : pre - 1;
    });
  };

  const handleDownloadImages = async () => {
    const zip = new JSZip();
    const images = uploadedImages.map(
      (image) => `${process.env.NEXT_PUBLIC_CDN_URL}/images/${image}`
    );

    setDownloadLoading(true);
    for (const url of images) {
      try {
        const response = await axios.get(url, { responseType: 'blob' });
        const filename = url.split('/').pop() || 'image.jpg'; // Dosya adını URL'den al
        zip.file(filename, response.data); // ZIP'e ekle
      } catch (error) {
        console.error(`Error downloading ${url}:`, error);
      }
    }

    // ZIP dosyasını oluştur ve indir
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${item.title}.zip`);
    });
    setDownloadLoading(false);
  };

  useEffect(() => {
    (async () => {
      const [err, result] =
        service === 'user'
          ? await fetchOrderAttachments(item.id)
          : await fetchPanelOrderAttachments(item.id);
      if (err) return;
      setUploadedImages(result.images);
      setIsWaitingImages(false);
      setUpdatedAt(result.updatedAt);

      if (result.fields) {
        setFieldsValue(result.fields);
      }
    })();
  }, [item.id]);

  return (
    <>
      {bigImageIndex != null && (
        <div className="fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-black/70">
          <div
            className="w-full h-full absolute top-0 left-0 cursor-pointer z-30"
            onClick={() => setBigImageIndex(null)}
          ></div>

          <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] aspect-video bg-slate-50 rounded-md z-50 relative flex items-center justify-center">
            <BsFillArrowLeftCircleFill
              onClick={handlePrev}
              size={24}
              className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-50 cursor-pointer text-2xl sm:text-3xl md:text-4xl"
            />
            <BsFillArrowRightCircleFill
              onClick={handleNext}
              size={24}
              className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-50 cursor-pointer text-2xl sm:text-3xl md:text-4xl"
            />

            <Image
              loader={({ src }) => src}
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/${uploadedImages[bigImageIndex]}`}
              alt={item.title}
              title={item.title}
              width={0}
              height={0}
              className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] h-full object-contain relative z-40"
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          'w-full border p-2 sm:p-3 md:p-4 rounded-md flex flex-col gap-2 sm:gap-3 md:gap-4 relative',
          {
            '!border-green-200 !bg-green-50':
              (uploadedImages?.length > 0 && !loading) ||
              item.attachmentCount === 0,
            'border-red-100 bg-red-50/35':
              attachments?.length === 0 && !loading,
            'border-orange-100 bg-orange-50/35':
              loading || attachments?.length > 0,
          }
        )}
      >
        {/* is loading */}
        {loading && (
          <div className="w-full h-full absolute top-0 left-0 z-20 bg-primary-100/70 rounded-md flex flex-col items-center justify-center">
            <BsFillCloudUploadFill
              size={36}
              className="text-black animate-pulse sm:text-4xl md:text-5xl"
            />
            <span className="text-black text-xs sm:text-sm font-semibold animate-pulse text-center px-2">
              Resimler Yükleniyor... ({progress}%)
            </span>
          </div>
        )}

        {/* header */}
        <section className="flex lg:flex-row flex-col lg:items-center font-medium text-xs sm:text-sm border-b border-slate-200 pb-1 sm:pb-2">
          {attachments?.length === 0 &&
          uploadedImages.length === 0 &&
          item.attachmentCount !== 0 ? (
            <span className="text-xs sm:text-sm text-red-500 font-semibold flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2">
              <TiWarning /> Resimler Eksik!
            </span>
          ) : null}
          <span className="truncate">{item.title}</span>
          <span className="ml-auto whitespace-nowrap">
            {item.price.toFixed(2)}TL
          </span>
        </section>

        {/* fields */}
        {item.fields?.length > 0 && (
          <div className="w-full mb-2 sm:mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {item.fields.map((field, index) => (
              <Input
                label={field}
                key={index}
                value={fieldsValue[field] || ''}
                placeholder={field}
                disabled={uploadedImages?.length > 0 || disabled}
                onChange={(e) =>
                  setFieldsValue((pre) => ({
                    ...pre,
                    [field]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        )}

        {/* list image previews */}
        <div
          className={cn(
            'w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 mb-2 sm:mb-4',
            {
              hidden: !attachments || attachments?.length === 0,
            }
          )}
        >
          {attachments?.map((image, index) => (
            <div className="group relative" key={`attachment-${index}`}>
              <Image
                src={previews[index]}
                alt={item.title}
                title={item.title}
                width={0}
                height={0}
                className="w-full max-w-[250px] h-auto rounded"
              />
              <p
                title={image.file.name}
                className="text-xs font-medium italic truncate mt-1 sm:mt-2 text-slate-600"
              >
                {image.file.name}
              </p>

              <div className="absolute top-1 right-1 p-1 text-sm z-10 bg-white/80 rounded-full sm:hidden sm:group-hover:block">
                <BsTrash
                  size={16}
                  className="cursor-pointer text-red-400 sm:text-lg"
                  onClick={() =>
                    setAttachments((pre: any) =>
                      pre.filter((_: any, i: number) => i !== index)
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* list uploaded images*/}
        {uploadedImages?.length > 0 && (
          <div className="w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 mb-2 sm:mb-4">
            {uploadedImages?.map((image, index) => (
              <div className="group relative" key={`uploaded-${index}`}>
                <Image
                  loader={({ src }) => src}
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/images/c-${image}`}
                  alt={item.title}
                  title={item.title}
                  width={0}
                  height={0}
                  className="w-full max-w-[250px] h-auto rounded cursor-pointer"
                  onClick={() => setBigImageIndex(index)}
                />
              </div>
            ))}
          </div>
        )}

        {updatedAt && (
          <span className="text-sm italic text-slate-600">
            <span>Dosyalar Yüklendi: </span>
            <strong>
              {DateTime.fromISO(updatedAt).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </strong>
          </span>
        )}

        {/* upload button */}
        {attachments?.length > 0 && (
          <Button
            color="red"
            className="ml-auto text-xs sm:text-sm"
            disabled={
              !attachments?.length || attachments.length < item.attachmentCount
            }
            onClick={handleUpload}
            loading={loading}
          >
            Resimleri Yükle
          </Button>
        )}

        {item.attachmentCount > 0 &&
          !loading &&
          isWaitinImages &&
          item.attachmentCount - attachments.length > 0 && (
            <p className="text-sm italic text-red-500 ml-auto">
              Bu ürün için{' '}
              <strong>{item.attachmentCount - attachments.length} dosya</strong>{' '}
              daha yüklemeniz gerekmektedir.
            </p>
          )}

        {item.attachmentCount === 0 && (
          <p className="text-sm italic text-green-700">
            Bu ürün için herhangi bir dosya yüklemenize gerek bulunmamaktadır.
          </p>
        )}

        {/* upload input */}
        {!loading && isWaitinImages && item.attachmentCount !== 0 && (
          <div className="w-full min-h-[100px] sm:min-h-[125px] group p-1 border border-red-200 hover:border-red-300 rounded-md border-dashed flex flex-col items-center justify-center relative">
            <IoImageOutline
              size={24}
              className="text-red-300 sm:text-3xl md:text-4xl"
            />
            <span className="text-xs text-red-300 mt-1">
              Resim Yüklemek için Tıklayın
            </span>
            <input
              accept="image/*"
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAttachments((pre) => [
                  ...pre,
                  ...Array.from(e.target.files || [])
                    .slice(0, item.attachmentCount - pre.length)
                    .map((file) => ({
                      file,
                      preview: URL.createObjectURL(file),
                    })),
                ])
              }
              multiple
            />
          </div>
        )}

        {disabled && uploadedImages?.length > 0 && (
          <Button
            className="ml-auto text-xs sm:text-sm"
            onClick={handleDownloadImages}
            loading={downloadLoading}
          >
            Zip Olarak İndir
          </Button>
        )}
      </div>
    </>
  );
};

export default OrderAttachments;
