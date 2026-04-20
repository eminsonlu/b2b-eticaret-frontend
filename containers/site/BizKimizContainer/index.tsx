'use client';
import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import Link from 'next/link';

const BizKimizContainer = () => {
  const sections = [
    {
      title: 'Misyonumuz',
      content:
        'Tekyerde.com olarak, ürünlerimizi; özgün kimliğe sahip, kalbinizi ısıtan hediyeliklere dönüştürmek için, sürekli gelişen, öğrenen ve yeniliklere öncü olan, dinamik yapımızla birleştirerek, Türkiye’de e- ticaret hediyelik sektörünü, alışılagelmiş sıradanlığından ayrıştırarak özelleştiriyoruz. Tüm çalışmalarımızı, ortak akıl ve sınırsız hayal gücünüzden aldığımız enerji ile yürütüyoruz. Duygu ve düşüncelerinizi, yaşamlarınızda kalıcı değerler yaratmayı önemseyen bir kreatif yaklaşım şansı ile oluşturmanıza özen gösteriyor ve sizlere yeniden şekillendirme fırsatı sunuyoruz.',
    },
    {
      title: 'Tarihçemiz',
      content:
        "2023 yılında kurulan ve hâlihazırda faaliyetlerine fotoğraf sergilerine ve sektör profesyonellerine baskı ve ürün tedariki yaparak aktif bir şekilde devam eden bir işletmenin; yeni jenerasyona devri ile içinde bulunduğumuz teknolojik gelişmelere ve çağa uyum sağlaması amacıyla kendini sürekli geliştirmek ve yenilemek düşüncesine sahip olması, bizleri yeni bir hedef kitleye yönelmeye itti. Ürün gamımıza inovatif ürünler ekleyerek süreci başlattık. Biz iki kurucu ortak yıllarca farklı alanlarda meslek deneyimi edinerek; bu birikimi Tekyerde'ye aktarma planları yaparken bizlere Tekyerde’nin süreçlerde ilham vermesiyle işler çok heyecanlı bir hal almış oldu. Çünkü süreçler sadece sevdiklerimize hediye yollamaktan çıkıp bizim karakterlerimizi yansıtan Tekyerde’nin hayat bulmasını sağladı.",
    },
    {
      title: 'Değerlerimiz',
      content:
        'Sizler sevdiklerinizi mutlu etmek için hediye seçerken; Tekyerde’nin birebir asistanlık yapıp sevdiklerinize özel olarak tasarlanmış hediyeler seçmenize yardımcı olurlar. Tekyerde ile sevdiklerinizin yüzünde tebessüm yaratmak için hediye seçerken; Tekyerde’nin, bu hediyeleri özelleştirerek eşsiz hale getirmektedir.',
    },
  ];

  return (
    <div className="container py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        Biz Kimiz
      </h1>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <p className="text-gray-700 mb-6">
          Tekyerde.com olarak benzersiz ve kişiselleştirilmiş hediyelerle
          sevdiklerinizin yüzünde gülümseme yaratmayı hedefliyoruz. Misyonumuz,
          vizyonumuz ve değerlerimiz ile hediye seçimini keyifli bir deneyime
          dönüştürüyoruz.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10">
          {sections.map((section, index) => (
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
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Bizimle İletişime Geçin</h2>
        <p className="text-gray-700 mb-4">
          Önerileriniz, sorularınız veya işbirliği teklifleriniz için bizimle
          iletişime geçebilirsiniz.
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
            +90 553 534 52 72
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

export default BizKimizContainer;
