'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsShieldCheck } from 'react-icons/bs';
import { HiOutlineTruck } from 'react-icons/hi2';
import { IoLockOpenOutline } from 'react-icons/io5';
import { PiSmileyWink } from 'react-icons/pi';

const Footer = ({ categories = [] }: { categories: any[] }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];
  
  // Define footer link sections
  const footerLinks = [
    {
      title: 'Kategoriler',
      links: safeCategories
        .filter((c) => c.parentId === null)
        .map((category) => ({
          text: category?.title,
          url: `/${category?.slug}`,
        })),
    },
    {
      title: 'Hakkımızda',
      links: [
        { text: 'Blog', url: '/blog' },
        { text: 'Biz Kimiz', url: '/biz-kimiz' },
        { text: 'S.S.S.', url: '/sikca-sorulan-sorular' },
        { text: 'KVKK', url: '/kvkk' },
      ],
    },
    {
      title: 'İletişim',
      links: [
        { text: 'Gizlilik Güvenlik', url: '/gizlilik-guvenlik' },
        { text: 'İptal İade Koşulları', url: '/iptal-iade-kosullari' },
        {
          text: 'Mesafeli Satış Sözleşmesi',
          url: '/mesafeli-satis-sozlesmesi',
        },
        { text: 'Üyelik Sözleşmesi', url: '/uyelik-sozlesmesi' },
      ],
    },
  ];

  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-12 sm:mt-20 md:mt-28 px-4 sm:px-6">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] bg-primary-100/25 text-primary-300 flex flex-col items-center justify-center rounded-md">
              <BsShieldCheck size={48} className="sm:text-4xl md:text-5xl" />
            </div>
            <span className="text-slate-800 font-medium text-center mt-2">
              Güvenli Ödeme Altyapısı
            </span>
            <span className="text-xs sm:text-sm text-slate-500 text-center">
              Tüm ödemeleriniz 256-bit SSL sertifikası ile korunur. Kişisel
              verileriniz ve kart bilgileriniz daima güvendedir.
            </span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] bg-primary-100/25 text-primary-300 flex flex-col items-center justify-center rounded-md">
              <HiOutlineTruck size={48} className="sm:text-4xl md:text-5xl" />
            </div>
            <span className="text-slate-800 font-medium text-center mt-2">
              Hızlı Teslimat
            </span>
            <span className="text-xs sm:text-sm text-slate-500 text-center">
              Siparişleriniz, Türkiye&lsquo;nin her yerine güvenli ve hızlı bir
              şekilde kargolanır. Takip numarasıyla gönderinizi anlık takip
              edebilirsiniz.
            </span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] bg-primary-100/25 text-primary-300 flex flex-col items-center justify-center rounded-md">
              <PiSmileyWink size={48} className="sm:text-4xl md:text-5xl" />
            </div>
            <span className="text-slate-800 font-medium text-center mt-2">
              Memnuniyet Odaklı Hizmet
            </span>
            <span className="text-xs sm:text-sm text-slate-500 text-center">
              Müşterilerimizin memnuniyeti bizim için önceliklidir. Her zaman
              kaliteli ve çözüm odaklı bir hizmet sunuyoruz.
            </span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] bg-primary-100/25 text-primary-300 flex flex-col items-center justify-center rounded-md">
              <IoLockOpenOutline
                size={48}
                className="sm:text-4xl md:text-5xl"
              />
            </div>
            <span className="text-slate-800 font-medium text-center mt-2">
              Güvenliğinizi Önemsiyoruz
            </span>
            <span className="text-xs sm:text-sm text-slate-500 text-center">
              Sizin için en iyisini istiyoruz. Bu yüzden tüm işlemleriniz
              güvenli bir şekilde korunur. Gönül rahatlığıyla alışveriş
              yapabilirsiniz.
            </span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#424141] pt-8 sm:pt-10 md:pt-12 mt-12 sm:mt-16 md:mt-20">
        <div className="container pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6">
          {/* Logo section */}
          <div className="flex justify-center sm:justify-start items-start mb-8">
            <Link href="/">
              <Image
                src="/logo.svg"
                loader={({ src }) => src}
                width={0}
                height={0}
                title="Logo"
                alt="Logo"
                unoptimized
                className="h-[40px] w-full"
              />
            </Link>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
            {footerLinks.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="w-full flex flex-col items-center sm:items-start"
              >
                <h3 className="text-white font-semibold mb-3 text-center sm:text-left">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {section.links?.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.url}
                      className="text-sm text-white/70 hover:text-primary-500 text-center sm:text-left"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-[40px] container border-t border-slate-50/15 flex items-center justify-center py-4">
          <p className="text-xs sm:text-sm text-white/50 text-center px-4">
            © 2025 tekyerde.com Her Hakkı Saklıdır
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
