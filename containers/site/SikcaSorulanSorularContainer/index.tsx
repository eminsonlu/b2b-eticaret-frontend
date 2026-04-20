'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MdArrowRightAlt, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

const SikcaSorulanSorularContainer = () => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleQuestion = (sectionIndex: number, questionIndex: number) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqSections = [
    {
      title: '🛍️ Genel Sipariş ve Ürün Bilgileri',
      questions: [
        {
          question: 'Sitede hangi ürünleri bulabilirim?',
          answer: 'Tekyerde.com\'da kişiye özel canvas tablolar, fotoğraf albümleri, kupa, defter, takvim, masaüstü dekor ürünleri, hediyelik eşyalar ve daha birçok özelleştirilebilir ürün bulabilirsiniz. Tüm ürünlerimiz yüksek kalite standartlarında üretilir ve kişisel dokunuşlarla özelleştirilebilir.',
        },
        {
          question: 'Ürünlerinizin kalitesi hakkında bilgi verir misiniz?',
          answer: "Ürünlerimiz, Türkiye'nin en köklü ve deneyimli üreticileri tarafından, 90'lı yıllardan bu yana yüksek kalite standartlarında üretilmektedir. Özellikle canvas tablolar, kişiye özel albümler ve hediyelik eşyalar, sektörün en dayanıklı ve estetik ürünleri arasında yer almaktadır. Tüm ürünlerimiz ISO kalite standartlarına uygun olarak üretilmektedir.",
        },
        {
          question: 'Ürünleriniz garantili mi?',
          answer: 'Evet, tüm ürünlerimiz 2 yıl garantilidir. Üretim hatası, malzeme kusuru veya işçilik hatası durumunda ücretsiz değişim veya iade yapılmaktadır. Garanti kapsamı dışında kalan durumlar: Kullanıcı hatası, doğal afetler, normal aşınma ve yıpranma.',
        },
        {
          question: 'Ürün kataloğunuz güncelleniyor mu?',
          answer: 'Evet, ürün kataloğumuz düzenli olarak güncellenmektedir. Yeni ürünler, sezonluk koleksiyonlar ve özel tasarımlar sürekli olarak sitemize eklenmektedir. Yeni ürünlerden haberdar olmak için bültenimize abone olabilir veya sosyal medya hesaplarımızı takip edebilirsiniz.',
        },
        {
          question: 'Özel tasarım hizmeti sunuyor musunuz?',
          answer: 'Evet, kurumsal müşterilerimiz ve özel tasarım taleplerinde bulunan müşterilerimiz için profesyonel tasarım hizmeti sunuyoruz. Tasarım ekibimiz, ihtiyaçlarınıza uygun özel çözümler geliştirir. Detaylı bilgi ve fiyat teklifi için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
      ],
    },
    {
      title: '🖼️ Ürün Kalitesi ve Üretim Süreci',
      questions: [
        {
          question: 'Canvas tablolarınız nasıl bir malzeme ile üretiliyor?',
          answer: 'Canvas tablolarımızda, %100 pamuklu, müze kalitesinde canvas kumaş kullanıyoruz. Baskılarımızda kullanılan mürekkepler ise su bazlı, çevre dostu ve solmaya dayanıklı özel mürekkeplerdir. Canvas gerilmeleri ahşap kasnak üzerine profesyonel şekilde yapılmaktadır. Böylece ürünlerimiz uzun yıllar boyunca canlılığını korur.',
        },
        {
          question: 'Fotoğraf albümleriniz hangi kağıt ve ciltleme tekniği ile üretiliyor?',
          answer: 'Fotoğraf albümlerimizde premium mat veya parlak fotoğraf kağıdı kullanıyoruz. Ciltleme işlemleri profesyonel makine ile yapılmakta ve yıpranmaya karşı dayanıklı özel tutkallar kullanılmaktadır. Albüm kapakları isteğe bağlı olarak sert kapak, yumuşak kapak veya özel malzeme seçenekleri sunulmaktadır.',
        },
        {
          question: 'Baskı çözünürlüğü ne kadar?',
          answer: 'Tüm baskılarımız minimum 300 DPI çözünürlükte yapılmaktadır. Bu, müze kalitesinde baskı anlamına gelir ve detayların en iyi şekilde görüntülenmesini sağlar. Profesyonel grafik tasarımcılar için yüksek çözünürlüklü özel baskı seçenekleri de mevcuttur.',
        },
        {
          question: 'Renkler ekranda gördüğüm gibi mi çıkacak?',
          answer: 'Monitör kalibrasyonu ve ekran ayarları nedeniyle renklerde küçük farklılıklar olabilir. Ancak profesyonel renk yönetim sistemlerimiz sayesinde renk uyumluluğunu en üst düzeye çıkarıyoruz. Özel renk talepleriniz için örnek baskı servisimiz mevcuttur. Detaylı bilgi için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
        {
          question: 'Çevre dostu üretim yapıyor musunuz?',
          answer: 'Evet, sürdürülebilirliği önemsiyoruz. Üretim süreçlerimizde çevre dostu mürekkep ve malzemeler kullanıyoruz. Atık yönetimi konusunda uluslararası standartlara uyuyoruz ve karbon ayak izimizi minimize etmek için sürekli çalışıyoruz.',
        },
      ],
    },
    {
      title: '🎨 Kişiselleştirme ve Tasarım',
      questions: [
        {
          question: 'Hediyelik ürünlerde kişiye özel tasarım seçenekleriniz neler?',
          answer: 'Kupa, defter, takvim, masaüstü dekor ürünleri ve daha birçok hediye ürünümüzü isim, fotoğraf, tarih ve özel mesaj gibi kişisel dokunuşlarla özelleştirebilirsiniz. Ayrıca logo, grafik tasarım ve özel yerleşim seçenekleri de mevcuttur. Tasarım editörümüzü kullanarak ürününüzü kendiniz tasarlayabilir veya tasarım ekibimizden destek alabilirsiniz.',
        },
        {
          question: 'Ürünleri kişiselleştirirken ekstra ücret alıyor musunuz?',
          answer: 'Hayır. İsim, tarih, özel mesaj gibi standart kişiselleştirmeler ücretsizdir. Sadece ekstra özel istekler (örneğin farklı kaplama seçenekleri, özel boyutlar, kurumsal tasarım hizmeti) ayrıca ücretlendirilir. Tüm ücretler sipariş öncesi size bildirilir.',
        },
        {
          question: 'Tasarım editörünü nasıl kullanabilirim?',
          answer: 'Ürün sayfasında "Özelleştir" butonuna tıklayarak tasarım editörümüze giriş yapabilirsiniz. Editörümüzde fotoğraf yükleme, metin ekleme, font seçimi, renk düzenleme ve yerleşim ayarları yapabilirsiniz. Editörümüz kullanıcı dostu arayüzü ile tasarım konusunda deneyimli olmayan müşterilerimizin bile kolayca kullanabileceği şekilde tasarlanmıştır.',
        },
        {
          question: 'Tasarımımı siparişten sonra değiştirebilir miyim?',
          answer: 'Sipariş verildikten sonra 24 saat içinde tasarım değişikliği talebinde bulunabilirsiniz. Üretim aşamasına geçmeden önce tüm değişiklikler ücretsizdir. Üretim başladıktan sonra yapılan değişiklikler ek ücrete tabidir. Bu nedenle sipariş öncesi tasarımınızı dikkatle kontrol etmenizi öneririz.',
        },
        {
          question: 'Hazır şablonlar var mı?',
          answer: 'Evet, her ürün kategorisi için profesyonel tasarımcılarımız tarafından hazırlanmış yüzlerce şablon bulunmaktadır. Şablonlarımızı kendi fotoğraflarınız ve metinlerinizle özelleştirebilirsiniz. Şablonlarımız düzenli olarak güncellenir ve yeni tasarımlar eklenir.',
        },
      ],
    },
    {
      title: '📷 Fotoğraf Yükleme ve Tasarım Süreci',
      questions: [
        {
          question: 'Fotoğraflarımı nasıl göndereceğim?',
          answer: 'Sipariş sonrası sistemimiz üzerinden size özel bir fotoğraf yükleme linki gönderilir. Buradan kolayca yükleme yapabilir, isterseniz fotoğraflara açıklamalar da ekleyebilirsiniz. Ayrıca mobil uygulamamız üzerinden de fotoğraf yükleme işlemini gerçekleştirebilirsiniz. Maksimum dosya boyutu 50 MB\'dır.',
        },
        {
          question: 'Hangi fotoğraf formatlarını kabul ediyorsunuz?',
          answer: 'JPG, JPEG, PNG, HEIC ve RAW formatlarını kabul ediyoruz. En iyi sonuç için yüksek çözünürlüklü fotoğraflar tercih edilmelidir. Minimum çözünürlük gereksinimleri ürün sayfasında belirtilmiştir.',
        },
        {
          question: 'Fotoğraf kalitesi düşükse ne yapılıyor?',
          answer: 'Fotoğraflarınız baskıya uygunluk açısından profesyonel ekiplerimizce kontrol edilir. Eğer kalite baskı için yeterli değilse, sizinle iletişime geçilerek en uygun çözüm önerilir. Bazı durumlarda fotoğraf iyileştirme hizmetimiz de sunulmaktadır. Düşük kaliteli fotoğraflar için ücretsiz danışmanlık hizmeti verilmektedir.',
        },
        {
          question: 'Fotoğraflarım güvende mi?',
          answer: 'Evet, tüm fotoğraflarınız SSL şifreleme ile korunmaktadır. Fotoğraflarınız sadece siparişinizle ilgili üretim sürecinde kullanılır ve hiçbir şekilde üçüncü kişilerle paylaşılmaz. Fotoğraflarınız, ürün teslim edildikten 90 gün sonra otomatik olarak sistemimizden silinir. Daha erken silme talebinde bulunabilirsiniz.',
        },
        {
          question: 'Birden fazla fotoğraf yükleyebilir miyim?',
          answer: 'Evet, albüm ve çoklu fotoğraf gerektiren ürünlerde istediğiniz kadar fotoğraf yükleyebilirsiniz. Fotoğrafları sürükle-bırak yöntemiyle kolayca sıralayabilir ve düzenleyebilirsiniz. Fotoğraf sayısı ürün tipine göre değişiklik gösterebilir, detaylar ürün sayfasında belirtilmiştir.',
        },
        {
          question: 'Fotoğraflarda otomatik düzenleme yapılıyor mu?',
          answer: 'Evet, yüklenen fotoğraflarımız otomatik renk düzeltme, kontrast ayarlama ve keskinlik iyileştirme gibi temel düzenlemelere tabi tutulur. Ancak profesyonel fotoğraf düzenleme hizmetimiz de mevcuttur. İleri seviye düzenleme talepleri için ek ücret alınabilir.',
        },
      ],
    },
    {
      title: '🚚 Sipariş ve Teslimat Süreci',
      questions: [
        {
          question: 'Siparişim kaç günde elime ulaşır?',
          answer: 'Siparişleriniz üretim aşamasına bağlı olarak 3-5 iş günü içerisinde hazırlanır. Ürünlerinize özel kalite kontrollerinin ardından ortalama 7-10 iş günü içinde kargoya teslim edilir. Hızlı teslimat seçeneği ile bu süre 3-5 iş gününe düşürülebilir. Acil siparişler için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
        {
          question: 'Hangi şehirlerde hızlı teslimat yapıyorsunuz?',
          answer: "İstanbul, Ankara, İzmir gibi büyük şehirler başta olmak üzere, Türkiye'nin birçok bölgesine bölgesel günlük kargo hizmeti sunuyoruz. Özellikle İstanbul içi siparişleriniz için aynı gün kargo imkanı bulunmaktadır. Hızlı teslimat seçeneği ile İstanbul, Ankara, İzmir, Bursa, Antalya ve Adana'ya 1-2 iş günü içinde teslimat yapılmaktadır.",
        },
        {
          question: 'Kargo ücretleri nasıl belirleniyor?',
          answer: "Tüm Türkiye'ye sabit kargo ücreti uygulamaktayız. Ancak, belirli bir tutarın (750 TL) üzerindeki alışverişlerde ücretsiz kargo fırsatı sunuyoruz. Hızlı teslimat seçenekleri ek ücrete tabidir. Kargo ücretleri sepet sayfasında otomatik olarak hesaplanır ve görüntülenir.",
        },
        {
          question: 'Hangi kargo firmalarıyla çalışıyorsunuz?',
          answer: 'Aras Kargo, MNG Kargo, Yurtiçi Kargo, Sürat Kargo ve PTT ile çalışıyoruz. Teslimat adresinize en uygun kargo firması otomatik olarak seçilir. Belirli bir kargo firması tercihiniz varsa sipariş notlarında belirtebilir veya müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
        {
          question: 'Siparişimi nasıl takip edebilirim?',
          answer: 'Siparişiniz verildikten sonra e-posta adresinize kargo takip numarası gönderilir. Ayrıca web sitemiz üzerinden "Hesabım > Siparişlerim" bölümünden sipariş durumunuzu takip edebilirsiniz. Mobil uygulamamızdan da sipariş takibi yapabilirsiniz.',
        },
        {
          question: 'Siparişimi iptal edebilir miyim?',
          answer: 'Evet, üretim aşamasına geçmeden önce siparişinizi iptal edebilirsiniz. İptal işlemi için "Hesabım > Siparişlerim" bölümünden veya müşteri hizmetlerimizle iletişime geçerek gerçekleştirebilirsiniz. İptal edilen siparişlerin bedeli 3-5 iş günü içinde iade edilir.',
        },
        {
          question: 'Yurt dışına kargo gönderiyor musunuz?',
          answer: 'Şu anda sadece Türkiye içi kargo hizmeti sunmaktayız. Yurt dışı kargo talepleri için özel değerlendirme yapılmaktadır. Bu konuda detaylı bilgi almak için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
      ],
    },
    {
      title: '💳 Ödeme Seçenekleri ve Güvenlik',
      questions: [
        {
          question: 'Hangi ödeme yöntemlerini kullanabiliyorum?',
          answer: 'Sitemizde tüm ödemeler, PayTR ödeme altyapısı ile güvence altındadır. Desteklenen ödeme yöntemleri:\n\n• Kredi Kartı (Visa, Mastercard, Troy - Tüm Bankalar)\n• Banka Kartı (Tüm Bankalar)\n• Havale/EFT\n• Kapıda Ödeme (Nakit veya Kredi Kartı)\n• Tek çekim veya taksitli ödeme seçenekleri\n\nPayTR güvenli ödeme altyapısı sayesinde kart bilgileriniz 256-bit SSL sertifikası ile şifrelenir ve kesinlikle sistemimizde saklanmaz.',
        },
        {
          question: 'Taksit imkanı var mı?',
          answer: 'Evet, tüm kredi kartları için taksit seçenekleri mevcuttur. Taksit sayısı bankanıza ve kart tipinize göre değişiklik gösterebilir. Genellikle 2-12 arası taksit imkanı sunulmaktadır. Taksit seçenekleri ödeme sayfasında görüntülenir.',
        },
        {
          question: 'Kapıda ödeme seçeneği var mı?',
          answer: 'Evet, kapıda ödeme seçeneği mevcuttur. Kapıda ödeme için nakit veya kredi kartı ile ödeme yapabilirsiniz. Kapıda ödeme için ek bir hizmet bedeli alınmaktadır. Kapıda ödeme tutarı sipariş sayfasında gösterilir.',
        },
        {
          question: 'Havale/EFT ile ödeme yapabilir miyim?',
          answer: 'Evet, havale/EFT ile ödeme yapabilirsiniz. Havale/EFT seçeneğini seçtiğinizde, banka hesap bilgilerimiz e-posta adresinize gönderilir. Ödemenizi yaptıktan sonra dekontu göndermeniz gerekmektedir. Ödeme onaylandıktan sonra üretim süreci başlar.',
        },
        {
          question: 'Ödeme bilgilerim güvende mi?',
          answer: 'Evet. Tüm ödeme işlemleri PayTR güvenli ödeme altyapısı üzerinden gerçekleştirilir. Kart bilgileriniz hiçbir zaman sistemimizde saklanmaz. PCI-DSS standartlarına uygun olarak çalışan ödeme sistemimiz, en yüksek güvenlik standartlarını karşılar. Ayrıca 3D Secure özelliği ile ekstra güvenlik sağlanmaktadır.',
        },
        {
          question: 'Ödeme alındı mı nasıl anlayabilirim?',
          answer: 'Ödeme işleminiz tamamlandıktan sonra e-posta adresinize onay e-postası gönderilir. Ayrıca "Hesabım > Siparişlerim" bölümünden ödeme durumunuzu kontrol edebilirsiniz. Havale/EFT ödemeleri genellikle 1 iş günü içinde onaylanır.',
        },
      ],
    },
    {
      title: '↩️ İade ve Değişim Politikası',
      questions: [
        {
          question: 'Ürünü iade edebilir miyim?',
          answer: 'Mesafeli Satış Yönetmeliği\'ne göre, ürünü teslim aldığınız tarihten itibaren 14 gün içinde hiçbir gerekçe göstermeden iade edebilirsiniz. Kişiselleştirilmiş ürünler için bu süre geçerli değildir. İade işlemi için ürünün orijinal ambalajında, hasar görmemiş ve kullanılmamış olması gerekmektedir.',
        },
        {
          question: 'İade süreci nasıl işliyor?',
          answer: 'İade talebinizi "Hesabım > Siparişlerim" bölümünden veya müşteri hizmetlerimizle iletişime geçerek oluşturabilirsiniz. İade onayı verildikten sonra kargo bilgileriniz e-posta adresinize gönderilir. Ürünü belirtilen adrese gönderdikten sonra, ürün kontrolünden geçirilir ve 3-5 iş günü içinde ödemeniz iade edilir.',
        },
        {
          question: 'İade kargo ücreti kim öder?',
          answer: 'Üretim hatası, yanlış ürün gönderimi veya hasarlı ürün durumunda iade kargo ücreti firmamız tarafından karşılanır. Müşteri kaynaklı iadelerde kargo ücreti müşteriye aittir. Ancak 750 TL üzeri alışverişlerde iade kargo ücreti bizim tarafımızdan karşılanır.',
        },
        {
          question: 'Değişim yapabilir miyim?',
          answer: 'Evet, ürün değişimi yapılabilmektedir. Aynı ürünün farklı varyantı (boyut, renk vb.) ile değişim talep edebilirsiniz. Değişim işlemi için ürünün orijinal ambalajında ve kullanılmamış olması gerekmektedir. Değişim süreci iade ile aynı şekilde işlemektedir.',
        },
        {
          question: 'Kişiselleştirilmiş ürünlerde iade var mı?',
          answer: 'Kişiselleştirilmiş ürünler, müşterinin isteğine göre özel olarak üretildiği için genel iade politikasına tabi değildir. Ancak üretim hatası, yanlış üretim veya hasarlı teslimat durumunda iade ve değişim yapılmaktadır. Bu durumlar için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
        {
          question: 'İade edilen ürün için para ne zaman iade edilir?',
          answer: 'İade edilen ürün kontrol edildikten ve onaylandıktan sonra, ödeme yönteminize göre iade işlemi gerçekleştirilir. Kredi kartı ile yapılan ödemeler genellikle 3-5 iş günü içinde hesabınıza yansır. Havale/EFT ile yapılan ödemeler 1-2 iş günü içinde iade edilir. Kapıda ödeme durumunda banka hesabınıza EFT ile iade yapılır.',
        },
      ],
    },
    {
      title: '🛡️ Güvenlik ve Gizlilik',
      questions: [
        {
          question: 'Sipariş bilgilerim güvende mi?',
          answer: 'Evet. Tüm kişisel bilgileriniz ve ödeme verileriniz gelişmiş şifreleme sistemleriyle korunmaktadır. Kullandığımız SSL sertifikaları ve PayTR güvencesiyle tamamen güvenli bir alışveriş deneyimi sunuyoruz. KVKK (Kişisel Verilerin Korunması Kanunu) uyumludur ve verileriniz yasal mevzuata uygun şekilde korunmaktadır.',
        },
        {
          question: 'Kişisel verilerim nasıl korunuyor?',
          answer: 'Kişisel verileriniz SSL şifreleme ile korunmakta ve sadece sipariş süreci için kullanılmaktadır. Verileriniz hiçbir şekilde üçüncü kişilerle paylaşılmaz. KVKK politikamız hakkında detaylı bilgi için Gizlilik ve Güvenlik sayfamızı inceleyebilirsiniz. Verilerinizi görüntüleme, düzeltme ve silme haklarınız mevcuttur.',
        },
        {
          question: 'Çerez (cookie) kullanıyor musunuz?',
          answer: 'Evet, web sitemizin düzgün çalışması ve kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. Çerezler, tercihlerinizi hatırlamak, alışveriş sepetinizi saklamak ve site performansını analiz etmek için kullanılır. Çerez politikamız hakkında detaylı bilgi için Gizlilik ve Güvenlik sayfamızı inceleyebilirsiniz.',
        },
        {
          question: 'Bilgilerim üçüncü kişilerle paylaşılıyor mu?',
          answer: 'Hayır. Kişisel bilgileriniz sadece kargo firmaları ve ödeme altyapı sağlayıcıları gibi hizmet sağlayıcılarımızla, hizmetin sunulması için gerekli olan ölçüde paylaşılmaktadır. Bilgileriniz pazarlama veya ticari amaçlarla üçüncü kişilere satılmaz veya kiralanmaz.',
        },
        {
          question: 'Sitede güvenli alışveriş nasıl sağlanıyor?',
          answer: 'Web sitemiz SSL sertifikası ile korunmaktadır. Ödeme işlemleri PayTR güvenli ödeme altyapısı üzerinden gerçekleştirilir. 3D Secure özelliği ile ekstra güvenlik sağlanmaktadır. Ayrıca düzenli güvenlik denetimleri ve güncellemeler yapılmaktadır.',
        },
      ],
    },
    {
      title: '🎁 Ürün Özelleştirme ve Kampanyalar',
      questions: [
        {
          question: 'Ürünleri kişiselleştirirken ekstra ücret alıyor musunuz?',
          answer: 'Hayır. İsim, tarih, özel mesaj gibi standart kişiselleştirmeler ücretsizdir. Sadece ekstra özel istekler (örneğin farklı kaplama seçenekleri, özel boyutlar, profesyonel tasarım hizmeti) ayrıca ücretlendirilir. Tüm ek ücretler sipariş öncesi size bildirilir ve onayınız alınır.',
        },
        {
          question: 'Kampanyalarınız ve indirimleriniz nasıl işliyor?',
          answer: 'Sitemizde dönemsel olarak özel kampanyalar düzenlenmektedir. Belirli tutarın üzerindeki siparişlerde ücretsiz kargo, sezonluk indirimler, çoklu ürün alımlarında özel fiyatlar gibi avantajlar sunuyoruz. Kampanyalarımızdan haberdar olmak için bültenimize abone olabilir veya sosyal medya hesaplarımızı takip edebilirsiniz.',
        },
        {
          question: 'İndirim kodları nasıl kullanılır?',
          answer: 'İndirim kodlarınızı sepet sayfasında "İndirim Kodu" bölümüne girerek kullanabilirsiniz. İndirim kodları belirli ürünler veya minimum alışveriş tutarı için geçerli olabilir. Kod detayları kampanya sayfasında belirtilmiştir. Bir kodu birden fazla kez kullanamazsınız.',
        },
        {
          question: 'Kurumsal indirimler var mı?',
          answer: 'Evet, kurumsal müşterilerimiz için özel indirimler ve paket fiyatlar sunuyoruz. Toplu siparişlerde özel fiyatlandırma yapılmaktadır. Kurumsal müşteri olmak için müşteri hizmetlerimizle iletişime geçebilir ve kurumsal hesap açtırabilirsiniz.',
        },
        {
          question: 'Hediye paketi hizmeti sunuyor musunuz?',
          answer: 'Evet, ürünlerinizi hediye paketi ile gönderebiliriz. Hediye paketi seçeneği sipariş sayfasında mevcuttur. Özel not ekleme ve özel paketleme seçenekleri de bulunmaktadır. Hediye paketi için ek ücret alınmaktadır.',
        },
      ],
    },
    {
      title: '👤 Üyelik ve Hesap Yönetimi',
      questions: [
        {
          question: 'Nasıl üye olabilirim?',
          answer: 'Web sitemiz üzerinden kolayca üye olabilirsiniz. "Kayıt Ol" butonuna tıklayarak e-posta adresiniz, adınız, soyadınız ve şifreniz ile hesap oluşturabilirsiniz. Sosyal medya hesaplarınız (Google, Facebook) ile de hızlı kayıt yapabilirsiniz.',
        },
        {
          question: 'Şifremi unuttum, ne yapmalıyım?',
          answer: 'Giriş sayfasında "Şifremi Unuttum" linkine tıklayarak şifre sıfırlama işlemini başlatabilirsiniz. E-posta adresinize gönderilen link ile yeni şifre belirleyebilirsiniz. E-posta gelmediyse spam klasörünüzü kontrol edebilir veya müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
        {
          question: 'Hesap bilgilerimi nasıl güncelleyebilirim?',
          answer: '"Hesabım" bölümünden kişisel bilgilerinizi, iletişim bilgilerinizi, adres bilgilerinizi ve şifrenizi güncelleyebilirsiniz. Değişiklikler anında kaydedilir ve siparişlerinizde kullanılır.',
        },
        {
          question: 'Sipariş geçmişimi görebilir miyim?',
          answer: 'Evet, "Hesabım > Siparişlerim" bölümünden tüm sipariş geçmişinizi görebilirsiniz. Sipariş durumlarını, faturalarınızı, kargo takip bilgilerini buradan takip edebilirsiniz.',
        },
        {
          question: 'Hesabımı silebilir miyim?',
          answer: 'Evet, hesap silme talebinizi "Hesabım > Ayarlar" bölümünden veya müşteri hizmetlerimizle iletişime geçerek yapabilirsiniz. Hesap silme işlemi KVKK gereği geri alınamaz. Aktif siparişleriniz varsa önce bunların tamamlanması gerekmektedir.',
        },
      ],
    },
    {
      title: '📞 Müşteri Hizmetleri ve İletişim',
      questions: [
        {
          question: 'Size nasıl ulaşabilirim?',
          answer: 'Her türlü sorunuz için destek ekibimize haftanın 7 günü, şu kanallardan ulaşabilirsiniz:\n\n• E-posta: destek@tekyerde.com\n• Telefon: +90 553 534 52 72\n• Canlı Destek: Web sitemiz üzerinden (Pazartesi-Cuma, 09:00-18:00)\n• İletişim Formu: İletişim sayfamızdan\n\nMüşteri hizmetlerimiz en kısa sürede yanıt vermektedir.',
        },
        {
          question: 'Müşteri hizmetleri çalışma saatleri nedir?',
          answer: 'Müşteri hizmetlerimiz hafta içi 09:00-18:00 saatleri arasında hizmet vermektedir. Cumartesi 10:00-16:00 saatleri arasında da hizmet verilmektedir. Pazar günü hizmet verilmemektedir. E-posta ve canlı destek mesajlarınıza en geç 24 saat içinde yanıt verilmektedir.',
        },
        {
          question: 'Şikayetlerimi nasıl iletebilirim?',
          answer: 'Şikayetlerinizi müşteri hizmetlerimizle iletişime geçerek iletebilirsiniz. Tüm şikayetler ciddiyetle ele alınmakta ve en kısa sürede çözüm üretilmektedir. Şikayet formumuzu doldurarak da şikayetinizi iletebilirsiniz. Şikayet sürecinizi takip edebilir ve geri bildirim alabilirsiniz.',
        },
        {
          question: 'Öneri ve geri bildirimlerinizi nasıl iletebilirim?',
          answer: 'Görüş, öneri ve geri bildirimleriniz bizim için çok değerlidir. İletişim sayfamızdan veya e-posta yoluyla geri bildirimlerinizi iletebilirsiniz. Ayrıca sosyal medya hesaplarımızdan da bizimle iletişime geçebilirsiniz.',
        },
      ],
    },
    {
      title: '🏢 Kurumsal Bilgiler',
      questions: [
        {
          question: 'Firma bilgileriniz nelerdir?',
          answer: 'Tekyerde.com, Bursa merkezli olarak faaliyet gösteren bir e-ticaret platformudur. Firmamız kişiye özel ürünler, canvas tablolar ve hediyelik eşya üretimi konusunda uzmanlaşmıştır. Şirket bilgileri:\n\n• Firma Adı: Tekyerde.com\n• Vergi Dairesi: [Vergi Dairesi]\n• Vergi No: [Vergi No]\n• Adres: Bursa, Türkiye\n\nDetaylı firma bilgileri için "Biz Kimiz" sayfamızı ziyaret edebilirsiniz.',
        },
        {
          question: 'Toplu sipariş hizmeti sunuyor musunuz?',
          answer: 'Evet, kurumsal müşterilerimiz ve toplu sipariş taleplerinde bulunan müşterilerimiz için özel hizmet sunuyoruz. Toplu siparişlerde özel fiyatlandırma, özel tasarım hizmeti ve esnek ödeme seçenekleri mevcuttur. Toplu sipariş için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
        {
          question: 'Bayilik veya distribütörlük fırsatları var mı?',
          answer: 'Evet, bayilik ve distribütörlük programlarımız mevcuttur. Programlar hakkında detaylı bilgi almak için iş geliştirme ekibimizle iletişime geçebilirsiniz. Bayilik başvuruları değerlendirilmekte ve uygun adaylarla görüşmeler yapılmaktadır.',
        },
        {
          question: 'Sosyal sorumluluk projeleriniz var mı?',
          answer: 'Evet, sosyal sorumluluğu önemseyen bir firmayız. Çeşitli sosyal sorumluluk projelerinde yer alıyoruz ve topluma katkı sağlamaya çalışıyoruz. Projelerimiz hakkında blog sayfamızdan bilgi alabilirsiniz.',
        },
      ],
    },
    {
      title: '🔧 Ürün Bakımı ve Kullanım',
      questions: [
        {
          question: 'Canvas tablolarımı nasıl temizlemeliyim?',
          answer: 'Canvas tablolarınızı temizlemek için yumuşak, kuru bir bez kullanın. Su ve deterjan kullanmayın. Toz birikimini önlemek için düzenli olarak hafifçe temizleyin. Canvas tablolarınızı doğrudan güneş ışığından ve nemli ortamlardan koruyun.',
        },
        {
          question: 'Fotoğraf albümlerimi nasıl saklamalıyım?',
          answer: 'Fotoğraf albümlerinizi düz bir yüzeyde, nemden ve doğrudan güneş ışığından uzak tutun. Ağır cisimlerin altına koymayın. Düzenli olarak havalandırın. Uzun süreli saklama için serin ve kuru bir ortam tercih edin.',
        },
        {
          question: 'Ürünlerimin ömrünü nasıl uzatabilirim?',
          answer: 'Ürünlerinizin ömrünü uzatmak için:\n\n• Doğrudan güneş ışığından koruyun\n• Nemli ortamlardan uzak tutun\n• Düzenli olarak temizleyin\n• Orijinal ambalajında saklayın\n• Aşırı sıcak ve soğuktan koruyun\n\nÜrün tipine göre özel bakım talimatları ürün ile birlikte gönderilir.',
        },
        {
          question: 'Hasarlı ürün aldım, ne yapmalıyım?',
          answer: 'Hasarlı ürün aldığınızda derhal müşteri hizmetlerimizle iletişime geçin. Kargo firmanına ait hasarlar için kargo firması ile iletişime geçmeniz gerekebilir. Üretim hatası veya ambalajlama hatası durumunda ücretsiz değişim yapılır. Lütfen ürünü teslim aldığınızda ambalajını kontrol edin.',
        },
      ],
    },
    {
      title: '📱 Mobil Uygulama ve Teknoloji',
      questions: [
        {
          question: 'Mobil uygulamanız var mı?',
          answer: 'Evet, iOS ve Android platformları için mobil uygulamalarımız mevcuttur. Mobil uygulamamız üzerinden ürünleri görüntüleyebilir, sipariş verebilir, fotoğraf yükleyebilir ve siparişlerinizi takip edebilirsiniz. Uygulamayı App Store ve Google Play Store\'dan indirebilirsiniz.',
        },
        {
          question: 'Web sitesi hangi tarayıcılarla uyumlu?',
          answer: 'Web sitemiz tüm modern tarayıcılarla uyumludur. Chrome, Firefox, Safari, Edge ve Opera tarayıcıları ile sorunsuz çalışmaktadır. En iyi deneyim için tarayıcınızın güncel versiyonunu kullanmanızı öneririz.',
        },
        {
          question: 'Site hızı ve performansı nasıl?',
          answer: 'Web sitemiz modern teknolojiler kullanılarak optimize edilmiştir. Sayfa yükleme süreleri minimum seviyede tutulmaktadır. Mobil ve masaüstü versiyonlar optimize edilmiştir. Herhangi bir performans sorunu yaşarsanız müşteri hizmetlerimizle iletişime geçebilirsiniz.',
        },
      ],
    },
  ];

  // SEO için JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSections.flatMap((section, sectionIndex) =>
      section.questions.map((qa) => ({
        '@type': 'Question',
        name: qa.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: qa.answer.replace(/\n\n/g, ' ').replace(/\n/g, ' '),
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-6 sm:py-8 md:py-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Müşterilerimizden en çok gelen soruları ve cevaplarını bu sayfada bulabilirsiniz.
            Aradığınız bilgiyi bulamadıysanız, lütfen bizimle iletişime geçmekten çekinmeyin.
            Müşteri memnuniyeti bizim önceliğimizdir.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6 mb-8 border border-primary-200">
          <h2 className="text-xl font-semibold mb-4 text-slate-900">Hızlı Erişim</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              href="#siparis"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              → Sipariş ve Teslimat
            </Link>
            <Link
              href="#odeme"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              → Ödeme ve Güvenlik
            </Link>
            <Link
              href="#iade"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              → İade ve Değişim
            </Link>
            <Link
              href="#gizlilik"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              → Gizlilik ve Güvenlik
            </Link>
            <Link
              href="/iletisim"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              → İletişim
            </Link>
            <Link
              href="/iptal-iade-kosullari"
              className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
            >
              → İptal ve İade Koşulları
            </Link>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {faqSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center bg-primary-400 text-white rounded-full w-8 h-8 text-sm font-bold flex-shrink-0">
                    {sectionIndex + 1}
                  </span>
                  <span>{section.title}</span>
                </h2>
                {openSections[sectionIndex] ? (
                  <BiChevronUp size={24} className="text-slate-600 flex-shrink-0" />
                ) : (
                  <BiChevronDown size={24} className="text-slate-600 flex-shrink-0" />
                )}
              </button>

              {/* Section Questions */}
              {openSections[sectionIndex] !== false && (
                <div className="p-6 space-y-4">
                  {section.questions.map((qa, questionIndex) => {
                    const questionKey = `${sectionIndex}-${questionIndex}`;
                    const isOpen = openQuestions[questionKey];
                    return (
                      <div
                        key={questionIndex}
                        className="border-b border-slate-100 last:border-0 pb-4 last:pb-0"
                      >
                        <button
                          onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                          className="w-full flex items-start justify-between gap-4 text-left hover:text-primary-600 transition-colors mb-2"
                        >
                          <h3 className="font-semibold text-lg text-slate-900 flex-1">
                            {qa.question}
                          </h3>
                          {isOpen ? (
                            <BiChevronUp size={24} className="text-slate-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <BiChevronDown size={24} className="text-slate-600 flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                        {isOpen !== false && (
                          <div className="text-slate-700 leading-relaxed mt-2 pl-0">
                            {qa.answer.split('\n\n').map((paragraph, pIndex) => (
                              <p key={pIndex} className="mb-3 last:mb-0 whitespace-pre-line">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-br from-primary-50 to-slate-50 rounded-lg p-6 sm:p-8 border border-primary-200">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Başka sorunuz mu var?</h2>
          <p className="text-slate-700 mb-6 leading-relaxed">
            Eğer aradığınız bilgiyi bulamadıysanız veya başka sorularınız varsa, lütfen müşteri
            hizmetlerimizle iletişime geçin. Müşteri memnuniyeti bizim önceliğimizdir ve en kısa
            sürede size yardımcı olmaya çalışırız.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">E-posta</h3>
              <a
                href="mailto:destek@tekyerde.com"
                className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
              >
                destek@tekyerde.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Telefon</h3>
              <a
                href="tel:+905535345272"
                className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
              >
                +90 553 534 52 72
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Çalışma Saatleri</h3>
              <p className="text-slate-700">
                Hafta İçi: 09:00 - 18:00<br />
                Cumartesi: 10:00 - 16:00<br />
                Pazar: Kapalı
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Yanıt Süresi</h3>
              <p className="text-slate-700">
                E-posta ve canlı destek mesajlarınıza en geç 24 saat içinde yanıt verilmektedir.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-primary-400 hover:bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <span>İletişim Sayfasına Git</span>
              <MdArrowRightAlt size={20} />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-400 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <span>Blog</span>
              <MdArrowRightAlt size={20} />
            </Link>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <Link
            href="/iptal-iade-kosullari"
            className="text-sm text-slate-600 hover:text-primary-600 hover:underline"
          >
            İptal İade Koşulları
          </Link>
          <Link
            href="/gizlilik-guvenlik"
            className="text-sm text-slate-600 hover:text-primary-600 hover:underline"
          >
            Gizlilik Güvenlik
          </Link>
          <Link
            href="/mesafeli-satis-sozlesmesi"
            className="text-sm text-slate-600 hover:text-primary-600 hover:underline"
          >
            Mesafeli Satış Sözleşmesi
          </Link>
          <Link
            href="/kvkk"
            className="text-sm text-slate-600 hover:text-primary-600 hover:underline"
          >
            KVKK
          </Link>
        </div>
      </div>
    </>
  );
};

export default SikcaSorulanSorularContainer;
