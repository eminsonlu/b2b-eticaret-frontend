'use client';
import React from 'react';

const IptalIadeContainer = () => {
  const paragraphs = [
    {
      title: 'GENEL',
      content: [
        'Kullanmakta olduğunuz web sitesi üzerinden elektronik ortamda sipariş verdiğiniz takdirde, size sunulan ön bilgilendirme formunu ve mesafeli satış sözleşmesini kabul etmiş sayılırsınız.',
        'Alıcılar, satın aldıkları ürünün satış ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği (RG:27.11.2014/29188) hükümleri ile yürürlükteki diğer yasalara tabidir.',
        'Ürün sevkiyat masrafı olan kargo ücretleri alıcılar tarafından ödenecektir.',
        'Satın alınan her bir ürün, 30 günlük yasal süreyi aşmamak kaydı ile alıcının gösterdiği adresteki kişi ve/veya kuruluşa teslim edilir. Bu süre içinde ürün teslim edilmez ise, Alıcılar sözleşmeyi sona erdirebilir.',
        'Satın alınan ürün, eksiksiz ve siparişte belirtilen niteliklere uygun ve varsa garanti belgesi, kullanım kılavuzu gibi belgelerle teslim edilmek zorundadır.',
        "Satın alınan ürünün satılmasının imkansızlaşması durumunda, satıcı bu durumu öğrendiğinden itibaren 3 gün içinde yazılı olarak alıcıya bu durumu bildirmek zorundadır. 14 gün içinde de toplam bedel Alıcı'ya iade edilmek zorundadır.",
      ],
    },
    {
      title: 'SATIN ALINAN ÜRÜN BEDELİ ÖDENMEZ İSE',
      content: [
        'Alıcı, satın aldığı ürün bedelini ödemez veya banka kayıtlarında iptal ederse, Satıcının ürünü teslim yükümlülüğü sona erer.',
      ],
    },
    {
      title: 'KREDİ KARTININ YETKİSİZ KULLANIMI İLE YAPILAN ALIŞVERİŞLER',
      content: [
        "Ürün teslim edildikten sonra, alıcının ödeme yaptığı kredi kartının yetkisiz kişiler tarafından haksız olarak kullanıldığı tespit edilirse ve satılan ürün bedeli ilgili banka veya finans kuruluşu tarafından Satıcı'ya ödenmez ise, Alıcı, sözleşme konusu ürünü 3 gün içerisinde nakliye gideri SATICI'ya ait olacak şekilde SATICI'ya iade etmek zorundadır.",
      ],
    },
    {
      title: 'ÖNGÖRÜLEMEYEN SEBEPLERLE ÜRÜN SÜRESİNDE TESLİM EDİLEMEZ İSE',
      content: [
        "Satıcı'nın öngöremeyeceği mücbir sebepler oluşursa ve ürün süresinde teslim edilemez ise, durum Alıcı'ya bildirilir. Alıcı, siparişin iptalini, ürünün benzeri ile değiştirilmesini veya engel ortadan kalkana dek teslimatın ertelenmesini talep edebilir. Alıcı siparişi iptal ederse; ödemeyi nakit ile yapmış ise iptalinden itibaren 14 gün içinde kendisine nakden bu ücret ödenir. Alıcı, ödemeyi kredi kartı ile yapmış ise ve iptal ederse, bu iptalden itibaren yine 14 gün içinde ürün bedeli bankaya iade edilir, ancak bankanın alıcının hesabına 2-3 hafta içerisinde aktarması olasıdır.",
      ],
    },
    {
      title: 'ALICININ ÜRÜNÜ KONTROL ETME YÜKÜMLÜLÜĞÜ',
      content: [
        'Alıcı, sözleşme konusu mal/hizmeti teslim almadan önce muayene edecek; ezik, kırık, ambalajı yırtılmış vb. hasarlı ve ayıplı mal/hizmeti kargo şirketinden teslim almayacaktır. Teslim alınan mal/hizmetin hasarsız ve sağlam olduğu kabul edilecektir. ALICI , Teslimden sonra mal/hizmeti özenle korunmak zorundadır. Cayma hakkı kullanılacaksa mal/hizmet kullanılmamalıdır. Ürünle Fatura da iade edilmelidir.',
      ],
    },
    {
      title: 'CAYMA HAKKI',
      content: [
        "ALICI; satın aldığı ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde, SATICI'ya aşağıdaki iletişim bilgileri üzerinden bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.",
      ],
    },
    {
      title: 'SATICININ CAYMA HAKKI BİLDİRİMİ YAPILACAK İLETİŞİM BİLGİLERİ',
      content: [
        'ŞİRKET ADI/UNVANI: Tekyerde.com',
        'ADRES: 23 Nisan Mah. 251. Sk Referans Deluxe A blok Kat:3 İç No:5 Nilüfer/BURSA',
        'EPOSTA: destek@tekyerde.com',
        'TEL: +90 553 534 52 72',
      ],
    },
    {
      title: 'CAYMA HAKKININ SÜRESİ',
      content: [
        "Alıcı, satın aldığı eğer bir hizmet ise, bu 14 günlük süre sözleşmenin imzalandığı tarihten itibaren başlar. Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile hizmetin ifasına başlanan hizmet sözleşmelerinde cayma hakkı kullanılamaz. Alıcı'ya Cayma hakkına ilişkin bildirim Mesafeli Sözleşmelerde ve İptal Koşullarında sunulmuş olup, Alıcı Cayma koşullarını bilerek sipariş vermektedir.",
        "Cayma hakkının kullanımından kaynaklanan masraflar SATICI' ya aittir.",
        "Cayma hakkının kullanılması için 14 (ondört) günlük süre içinde SATICI' ya iadeli taahhütlü posta, faks, e-posta veya SATICI tarafından bildirilen yöntem ile yazılı veya ilgili yöntemle bildirimde bulunulması ve ürünün işbu sözleşmede düzenlenen 'Cayma Hakkı Kullanılamayacak Ürünler' hükümleri çerçevesinde kullanılmamış olması şarttır.",
      ],
    },
    {
      title: 'CAYMA HAKKININ KULLANIMI',
      content: [
        "3. kişiye veya ALICI' ya teslim edilen ürünün faturası, (İade edilmek istenen ürünün faturası kurumsal ise, iade ederken kurumun düzenlemiş olduğu iade faturası ile gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen sipariş iadeleri İADE FATURASI kesilmediği takdirde tamamlanamayacaktır.)",
        'İade formu, İade edilecek ürünlerin kutusu, ambalajı, varsa standart aksesuarları ile eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir.',
      ],
    },
    {
      title: 'İADE KOŞULLARI',
      content: [
        "SATICI, cayma bildiriminin kendisine ulaşmasından itibaren en geç 10 günlük süre içerisinde toplam bedeli ve ALICI'yı borç altına sokan belgeleri ALICI' ya iade etmek ve 20 günlük süre içerisinde malı iade almakla yükümlüdür.",
        "ALICI' nın kusurundan kaynaklanan bir nedenle malın değerinde bir azalma olursa veya iade imkânsızlaşırsa ALICI kusuru oranında SATICI' nın zararlarını tazmin etmekle yükümlüdür. Ancak cayma hakkı süresi içinde malın veya ürünün usulüne uygun kullanılması sebebiyle meydana gelen değişiklik ve bozulmalardan ALICI sorumlu değildir.",
        'Cayma hakkının kullanılması nedeniyle SATICI tarafından düzenlenen kampanya limit tutarının altına düşülmesi halinde kampanya kapsamında faydalanılan indirim miktarı iptal edilir.',
      ],
    },
    {
      title: 'CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER',
      content: [
        "ALICI'nın isteği veya açıkça kişisel ihtiyaçları doğrultusunda hazırlanan ve geri gönderilmeye müsait olmayan, iç giyim alt parçaları, mayo ve bikini altları, makyaj malzemeleri, tek kullanımlık ürünler, çabuk bozulma tehlikesi olan veya son kullanma tarihi geçme ihtimali olan mallar, ALICI'ya teslim edilmesinin ardından ALICI tarafından ambalajı açıldığı takdirde iade edilmesi sağlık ve hijyen açısından uygun olmayan ürünler, teslim edildikten sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan ürünler, Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete ve dergi gibi süreli yayınlara ilişkin mallar, Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar, ile ses veya görüntü kayıtlarının, kitap, dijital içerik, yazılım programlarının, veri kaydedebilme ve veri depolama cihazlarının, bilgisayar sarf malzemelerinin, ambalajının ALICI tarafından açılmış olması halinde iadesi Yönetmelik gereği mümkün değildir. Ayrıca Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin cayma hakkının kullanılması da Yönetmelik gereği mümkün değildir.",
        'Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, mayo, bikini, kitap, kopyalanabilir yazılım ve programlar, DVD, VCD, CD ve kasetler ile kırtasiye sarf malzemeleri (toner, kartuş, şerit vb.) iade edilebilmesi için ambalajlarının açılmamış, denenmemiş, bozulmamış ve kullanılmamış olmaları gerekir.',
        'Aşağıdaki mesafeli sözleşmeler yönetmeliği gereğince; cayma hakkının kullanılmayacak ürünler,',
        'Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmeler.',
        'Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmeler.',
        'Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan mallardan; iadesi sağlık ve hijyen açısından uygun olmayanların teslimine ilişkin sözleşmeler.',
        'Tesliminden sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler.',
        'Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler.',
        'Belirli bir tarihte veya dönemde yapılması gereken, konaklama, eşya taşıma, araba kiralama, yiyecek-içecek tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin sözleşmeler.',
        'Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler.',
      ],
    },
    {
      title: 'TEMERRÜT HALİ VE HUKUKİ SONUÇLARI',
      content: [
        "ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda temerrüde düştüğü takdirde, kart sahibi banka ile arasındaki kredi kartı sözleşmesi çerçevesinde faiz ödeyeceğini ve bankaya karşı sorumlu olacağını kabul, beyan ve taahhüt eder. Bu durumda ilgili banka hukuki yollara başvurabilir; doğacak masrafları ve vekâlet ücretini ALICI'dan talep edebilir ve her koşulda ALICI'nın borcundan dolayı temerrüde düşmesi halinde, ALICI, borcun gecikmeli ifasından dolayı SATICI'nın uğradığı zarar ve ziyanını ödeyeceğini kabul eder.",
      ],
    },
    {
      title: 'ÖDEME VE TESLİMAT',
      content: [
        'Banka Havalesi veya EFT (Elektronik Fon Transferi) yaparak, TR27 0001 5001 5800 7312 9457 59 (Ahmet Şerefoğlu) bankası hesaplarımızdan (TL) herhangi birine yapabilirsiniz.',
        'Sitemiz üzerinden kredi kartlarınız ile, Her türlü kredi kartınıza online tek ödeme ya da online taksit imkânlarından yararlanabilirsiniz. Online ödemelerinizde siparişiniz sonunda kredi kartınızdan tutar çekim işlemi gerçekleşecektir.',
      ],
    },
  ];

  return (
    <div className="container py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        Tüketici Haklari - Cayma/İptal İade Koşullari
      </h1>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10">
          {paragraphs.map((s, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <h2 className="text-xl font-semibold mb-3">
                <span className="inline-flex items-center justify-center bg-primary-500 text-white rounded-full w-7 h-7 mr-3">
                  {index + 1}
                </span>
                {s.title}
              </h2>
              <div className="text-gray-700">
                {s.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
        <p className="text-gray-700 mb-4">
          İade, iptal ve cayma haklarınız ile ilgili sorularınız için aşağıdaki
          kanallardan bizimle iletişime geçebilirsiniz.
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
          <a
            href="tel:05535345272"
            className="text-primary-500 hover:underline"
          >
            +90 553 534 52 72
          </a>
        </div>
      </div>
    </div>
  );
};

export default IptalIadeContainer;
