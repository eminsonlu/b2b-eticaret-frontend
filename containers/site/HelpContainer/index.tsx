"use client";
import React from "react";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

const HelpContainer = () => {
  const helpSections = [
    {
      title: "Üyelik İşlemleri",
      content:
        'Alışveriş yapabilmek için öncelikle sitemize üye olmanız gerekmektedir. "Kayıt Ol" sayfasından kolayca üyelik oluşturabilir veya "Giriş Yap" sayfasından mevcut hesabınıza giriş yapabilirsiniz. Üyeliğiniz, sipariş takibi ve favori ürünlerinizi kaydetme gibi avantajlar sağlar.',
    },
    {
      title: "Ürün Arama ve Kategori İnceleme",
      content:
        "Sitemizde bulunan kategorilerden dilediğiniz ürünleri inceleyebilirsiniz. Arama çubuğunu kullanarak istediğiniz ürünü kolayca bulabilirsiniz. Ürün detay sayfasında ürünün tüm özelliklerini ve fiyat bilgisini görebilirsiniz.",
    },
    {
      title: "Sepet İşlemleri",
      content:
        "Beğendiğiniz ürünleri sepetinize ekleyerek alışverişinize devam edebilirsiniz. Sepet sayfasında ürün miktarını artırabilir, azaltabilir veya sepetten çıkarabilirsiniz. Eğer kupon kodunuz varsa, sepet sayfasında bulunan kupon kodu alanına girerek indirim kazanabilirsiniz.",
    },
    {
      title: "Ödeme İşlemleri",
      content:
        'Sepetinizde bulunan ürünleri satın almak için "Ödeme" adımına geçebilirsiniz. Ödeme sayfasında, kredi kartı veya banka/havale/EFT seçeneklerinden birini tercih edebilirsiniz. Ödeme yöntemini seçtikten sonra, teslimat adresinizi belirleyin. Daha önce kaydettiğiniz bir adresi seçebilir veya yeni bir adres ekleyebilirsiniz.',
    },
    {
      title: "Sipariş Oluşturma",
      content:
        'Ödeme bilgilerinizi ve teslimat adresinizi tamamladıktan sonra siparişinizi onaylayabilirsiniz. Siparişiniz başarıyla oluşturulduktan sonra, size bir sipariş numarası verilecektir. Bu numara ile siparişinizi "Siparişlerim" sayfasından takip edebilirsiniz.',
    },
    {
      title: "Sipariş Takibi",
      content:
        'Verdiğiniz tüm siparişleri "Siparişlerim" sayfasından görüntüleyebilirsiniz. Sipariş detaylarını görmek için ilgili siparişin üzerine tıklayabilirsiniz. Sipariş içerisindeki ürünleri, fiyatları, ödeme ve kargo bilgilerini burada görebilirsiniz.',
    },
    {
      title: "Ürün Resimleri Yükleme",
      content:
        "Bazı ürünler için, siparişiniz tamamlandıktan sonra resim yüklemeniz gerekebilir. Sipariş detay sayfasında, ilgili ürünlere resim yükleyebilirsiniz. Resim yükleme işlemi, siparişinizin doğru şekilde işlenmesi için önemlidir.",
    },
    {
      title: "Sipariş Tamamlama",
      content:
        "Tüm işlemler tamamlandıktan sonra siparişiniz hazırlanıp kargoya verilecektir. Kargo takip numarası ile gönderinizi takip edebilirsiniz. Ürünleriniz elinize ulaştığında, sipariş süreciniz tamamlanmış olacaktır.",
    },
  ];

  return (
    <div className="container py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        Yardım Sayfası
      </h1>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <p className="text-gray-700 mb-6">
          Bu sayfada, sitemizden alışveriş yapma sürecinde ihtiyacınız
          olabilecek tüm bilgileri bulabilirsiniz. Aşağıda, üyelikten sipariş
          takibine kadar tüm adımlar detaylı olarak açıklanmıştır.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10">
          {helpSections.map((section, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <h2 className="text-xl font-semibold mb-3">
                <span className="inline-flex items-center justify-center bg-primary-500 text-white rounded-full w-7 h-7 mr-3">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-gray-700">{section.content}</p>

              {section.title === "Üyelik İşlemleri" && (
                <div className="mt-4 flex gap-4">
                  <Link
                    href="/kayit-ol"
                    className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm font-medium"
                  >
                    <span>Kayıt Ol</span>
                    <MdArrowRightAlt size={16} />
                  </Link>
                  <Link
                    href="/giris-yap"
                    className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm font-medium"
                  >
                    <span>Giriş Yap</span>
                    <MdArrowRightAlt size={16} />
                  </Link>
                </div>
              )}

              {section.title === "Sepet İşlemleri" && (
                <div className="mt-4">
                  <Link
                    href="/sepet"
                    className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm font-medium"
                  >
                    <span>Sepete Git</span>
                    <MdArrowRightAlt size={16} />
                  </Link>
                </div>
              )}

              {section.title === "Sipariş Takibi" && (
                <div className="mt-4">
                  <Link
                    href="/siparisler"
                    className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm font-medium"
                  >
                    <span>Siparişlerim</span>
                    <MdArrowRightAlt size={16} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Bizimle İletişime Geçin</h2>
        <p className="text-gray-700 mb-4">
          Eğer aradığınız bilgiyi bulamadıysanız veya başka sorularınız varsa,
          lütfen müşteri hizmetlerimizle iletişime geçin.
        </p>
        <div className="flex items-center gap-2">
          <span className="font-medium">E-posta:</span>
          <a
            href="mailto:destek@tekyerde.com"
            className="text-primary-500 hover:underline"
          >
            destek@tekyerde.com
          </a>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-medium">Telefon:</span>
          <a href="#" className="text-primary-500 hover:underline">
            +90 555 555 55 55
          </a>
        </div>
        <div className="mt-4">
          <Link
            href="/iletisim"
            className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm font-medium"
          >
            <span>İletişim Sayfasına Git</span>
            <MdArrowRightAlt size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpContainer;
