'use client';
import React from 'react';

const MesafeliSatisSozlesmeContainer = () => {
  const sections = [
    {
      title: 'TARAFLAR',
      content: [
        'İşbu Sözleşme aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde imzalanmıştır.',
        'A.\'ALICI\' ; (sözleşmede bundan sonra "ALICI" olarak anılacaktır)',
        "B.'SATICI' ; EAS GLOBAL E-TİCARET LİMİTED ŞİRKETİ (tekyerde.com)",
        'AD- SOYAD:',
        'ADRES:',
        'İş bu sözleşmeyi kabul etmekle ALICI, sözleşme konusu siparişi onayladığı takdirde sipariş konusu bedeli ve varsa kargo ücreti, vergi gibi belirtilen ek ücretleri ödeme yükümlülüğü altına gireceğini ve bu konuda bilgilendirildiğini peşinen kabul eder.',
      ],
    },
    {
      title: 'TANIMLAR',
      content: [
        'İşbu sözleşmenin uygulanmasında ve yorumlanmasında aşağıda yazılı terimler karşılarındaki yazılı açıklamaları ifade edeceklerdir.',
        "BAKAN: Gümrük ve Ticaret Bakanı'nı,",
        "BAKANLIK: Gümrük ve Ticaret Bakanlığı'nı,",
        "KANUN: 6502 sayılı Tüketicinin Korunması Hakkında Kanun'u,",
        "YÖNETMELİK: Mesafeli Sözleşmeler Yönetmeliği'ni (RG:27.11.2014/29188)",
        'HİZMET: Bir ücret veya menfaat karşılığında yapılan ya da yapılması taahhüt edilen mal sağlama dışındaki her türlü tüketici işleminin konusunu,',
        'SATICI: Ticari veya mesleki faaliyetleri kapsamında tüketiciye mal sunan veya mal sunan adına veya hesabına hareket eden şirketi,',
        'ALICI: Bir mal veya hizmeti ticari veya mesleki olmayan amaçlarla edinen, kullanan veya yararlanan gerçek ya da tüzel kişiyi,',
        "SİTE: SATICI'ya ait internet sitesini,",
        "SİPARİŞ VEREN: Bir mal veya hizmeti SATICI'ya ait internet sitesi üzerinden talep eden gerçek ya da tüzel kişiyi,",
        "TARAFLAR: SATICI ve ALICI'yı,",
        'SÖZLEŞME: SATICI ve ALICI arasında akdedilen işbu sözleşmeyi,',
        'MAL: Alışverişe konu olan taşınır eşyayı ve elektronik ortamda kullanılmak üzere hazırlanan yazılım, ses, görüntü ve benzeri gayri maddi malları ifade eder.',
      ],
    },
    {
      title: 'KONU',
      content: [
        "İşbu Sözleşme, ALICI'nın, SATICI'ya ait internet sitesi üzerinden elektronik ortamda siparişini verdiği aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerini düzenler.",
        'Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler güncelleme yapılana ve değiştirilene kadar geçerlidir. Süreli olarak ilan edilen fiyatlar ise belirtilen süre sonuna kadar geçerlidir.',
      ],
    },
    {
      title: 'SATICI BİLGİLERİ',
      content: [
        'Ticaret Unvanı: EAS GLOBAL E-TİCARET LİMİTED ŞİRKETİ',
        'Vergi Kimlik Numarası: 3231399043',
        'MERSIS Numarası: 0323139904300001',
        'Adres: 23 Nisan Mah. 251. Sk. No: 18A İç Kapı No: 5 Nilüfer/BURSA',
        'Telefon: +90 553 534 52 72',
        'Eposta: destek@tekyerde.com',
      ],
    },
    {
      title: 'ALICI BİLGİLERİ',
      content: [
        'Teslim edilecek kişi',
        'Teslimat Adresi',
        'Telefon',
        'Faks',
        'Eposta/kullanıcı adı',
      ],
    },
    {
      title: 'SÖZLEŞME KONUSU ÜRÜN/ÜRÜNLER BİLGİLERİ',
      content: [
        "6.1. Malın /Ürün/Ürünlerin/ Hizmetin temel özelliklerini (türü, miktarı, marka/modeli, rengi, adedi) SATICI'ya ait internet sitesinde yayınlanmaktadır. Satıcı tarafından kampanya düzenlenmiş ise ilgili ürünün temel özelliklerini kampanya süresince inceleyebilirsiniz. Kampanya tarihine kadar geçerlidir.",
        '6.2. Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler güncelleme yapılana ve değiştirilene kadar geçerlidir. Süreli olarak ilan edilen fiyatlar ise belirtilen süre sonuna kadar geçerlidir.',
        '6.3. Sözleşme konusu mal ya da hizmetin tüm vergiler dâhil satış fiyatı aşağıda gösterilmiştir.',
        'Ürün Açıklaması    Adet    Birim Fiyatı    Ara Toplam',
        '(KDV Dahil)',
        'Kargo Tutarı',
        'Toplam :',
        'Ödeme Şekli ve Planı',
        'Teslimat Adresi',
        'Teslim Edilecek kişi',
        'Fatura Adresi',
        'Sipariş Tarihi',
        'Teslimat tarihi',
        'Teslim şekli',
        '6.4. Ürün sevkiyat masrafı olan kargo ücreti ALICI tarafından ödenecektir.',
      ],
    },
    {
      title: 'FATURA BİLGİLERİ',
      content: [
        'Ad/Soyad/Unvan',
        'Adres',
        'Telefon',
        'Faks',
        'Eposta/kullanıcı adı',
        'Fatura teslim : Fatura sipariş teslimatı sırasında fatura adresine sipariş ile birlikte teslim edilecektir.',
      ],
    },
    {
      title:
        'GÜVENLİK-GİZLİLİK, KİŞİSEL VERİLER, ELEKTRONİK İLETİŞİMLER VE FİKRİ-SINAİ HAKLAR İLE İLGİLİ KURALLAR',
      content: [
        "INTERNET SİTESİ'nde bilgilerin korunması, gizliliği, işlenmesi-kullanımı ve iletişimler ile diğer hususlarda aşağıda cari esasları belirtilen gizlilik kuralları-politikası ve şartlar geçerlidir.",
        "8.1.ALICI tarafından İNTERNET SİTESİ'nde girilen bilgilerin ve işlemlerin güvenliği için gerekli önlemler, SATICI tarafındaki sistem altyapısında, bilgi ve işlemin mahiyetine göre günümüz teknik imkanları ölçüsünde alınmıştır. Bununla beraber, söz konusu bilgiler ALICI cihazından girildiğinden ALICI tarafında korunmaları ve ilgisiz kişilerce erişilememesi için, virüs ve benzeri zararlı uygulamalara ilişkin olanlar dahil, gerekli tedbirlerin alınması sorumluluğu ALICI'ya aittir.",
        "8.2. ALICI'nın sair suretle verdiği kişisel veri ve ticari elektronik iletişimlerine dair izin-onaylarının yanısıra ve teyiden; ALICI'nın İNTERNET SİTESİ'ne üyeliği ve alışverişleri sırasında edinilen bilgileri SATICI, C muhtelif ürün/hizmetlerin sağlanması ve her türlü bilgilendirme, reklam-tanıtım, iletişim, promosyon, satış, pazarlama, mağaza kartı, kredi kartı ve üyelik uygulamaları amaçlı yapılacak elektronik ve diğer ticari-sosyal iletişimler için, belirtilenler ve halefleri nezdinde süresiz olarak veya öngörecekleri süre ile kayda alınabilir, basılı/manyetik arşivlerde saklanabilir, gerekli görülen hallerde güncellenebilir, paylaşılabilir, aktarılabilir, transfer edilebilir, kullanılabilir ve sair suretlerle işlenebilir. Bu veriler ayrıca kanunen gereken durumlarda ilgili Merci ve Mahkemelere iletilebilir. ALICI kişisel olan-olmayan mevcut ve yeni bilgilerinin, kişisel verilerin korunması hakkında mevzuat ile elektronik ticaret mevzuatına uygun biçimde yukarıdaki kapsamda kullanımına, paylaşımına, işlenmesine ve kendisine ticari olan-olmayan elektronik iletişimler ve diğer iletişimler yapılmasına muvafakat ve izin vermiştir.",
        "8.3. ALICI SATICI'ya belirtilen iletişim kanallarından ulaşarak veri kullanımı-işlenmelerini ve/veya aynı kanallardan kanuni usulünce ulaşarak ya da kendisine gönderilen elektronik iletişimlerdeki red hakkını kullanarak iletişimleri her zaman için durdurabilir. ALICI'nın bu husustaki açık bildirimine göre, kişisel veri işlemleri ve/veya tarafına iletişimler yasal azami süre içinde durdurulur; ayrıca dilerse, hukuken muhafazası gerekenler ve/veya mümkün olanlar haricindeki bilgileri, veri kayıt sisteminden silinir ya da kimliği belli olmayacak biçimde anonim hale getirilir. ALICI isterse kişisel verilerinin işlenmesi ile ilgili işlemler, aktarıldığı kişiler, eksik veya yanlış olması halinde düzeltilmesi, düzeltilen bilgilerin ilgili üçüncü kişilere bildirilmesi, verilerin silinmesi veya yok edilmesi, otomatik sistemler ile analiz edilmesi sureti ile kendisi aleyhine bir sonucun ortaya çıkmasına itiraz, verilerin kanuna aykırı olarak işlenmesi sebebi ile zarara uğrama halinde giderilmesi gibi konularda SATICI'ya her zaman yukarıdaki iletişim kanallarından başvurabilir ve bilgi alabilir. Bu hususlardaki başvuru ve talepleri yasal azami süreler içinde yerine getirilecek yahut hukuki gerekçesi tarafına açıklanarak kabul edilmeyebilecektir.",
        "8.4. INTERNET SİTESİ'ne ait her türlü bilgi ve içerik ile bunların düzenlenmesi, revizyonu ve kısmen/tamamen kullanımı konusunda; SATICI'nın anlaşmasına göre diğer üçüncü sahıslara ait olanlar hariç; tüm fikri-sınai haklar ve mülkiyet hakları SATICI'ya aittir.",
        "8.5. SATICI yukarıdaki konularda gerekli görebileceği her türlü değişikliği yapma hakkını saklı tutar; bu değişiklikler SATICI tarafından INTERNET SİTESİ'nden veya diğer uygun yöntemler ile duyurulduğu andan itibaren geçerli olur.",
        "8.6. INTERNET SİTESİ'nden ulaşılan diğer sitelerde kendilerine ait gizlilik-güvenlik politikaları ve kullanım şartları geçerlidir, oluşabilecek ihtilaflar ile menfi neticelerinden SATICI sorumlu değildir.",
      ],
    },
    {
      title: 'GENEL HÜKÜMLER',
      content: [
        "9.1. ALICI, SATICI'ya ait internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu, elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve taahhüt eder. ALICI'nın; Ön Bilgilendirmeyi elektronik ortamda teyit etmesi, mesafeli satış sözleşmesinin kurulmasından evvel, SATICI tarafından ALICI' ya verilmesi gereken adresi, siparişi verilen ürünlere ait temel özellikleri, ürünlerin vergiler dâhil fiyatını, ödeme ve teslimat bilgilerini de doğru ve eksiksiz olarak edindiğini kabul, beyan ve taahhüt eder.",
        "9.2. Sözleşme konusu her bir ürün, 30 günlük yasal süreyi aşmamak kaydı ile ALICI' nın yerleşim yeri uzaklığına bağlı olarak internet sitesindeki ön bilgiler kısmında belirtilen süre zarfında ALICI veya ALICI'nın gösterdiği adresteki kişi ve/veya kuruluşa teslim edilir. Bu süre içinde ürünün ALICI'ya teslim edilememesi durumunda, ALICI'nın sözleşmeyi feshetme hakkı saklıdır.",
        '9.3. SATICI, Sözleşme konusu ürünü eksiksiz, siparişte belirtilen niteliklere uygun ve varsa garanti belgeleri, kullanım kılavuzları işin gereği olan bilgi ve belgeler ile teslim etmeyi, her türlü ayıptan arî olarak yasal mevzuat gereklerine göre sağlam, standartlara uygun bir şekilde işi doğruluk ve dürüstlük esasları dâhilinde ifa etmeyi, hizmet kalitesini koruyup yükseltmeyi, işin ifası sırasında gerekli dikkat ve özeni göstermeyi, ihtiyat ve öngörü ile hareket etmeyi kabul, beyan ve taahhüt eder.',
        "9.4. SATICI, sözleşmeden doğan ifa yükümlülüğünün süresi dolmadan ALICI'yı bilgilendirmek ve açıkça onayını almak suretiyle eşit kalite ve fiyatta farklı bir ürün tedarik edebilir.",
        "9.5. SATICI, sipariş konusu ürün veya hizmetin yerine getirilmesinin imkânsızlaşması halinde sözleşme konusu yükümlülüklerini yerine getiremezse, bu durumu, öğrendiği tarihten itibaren 3 gün içinde yazılı olarak tüketiciye bildireceğini, 14 günlük süre içinde toplam bedeli ALICI'ya iade edeceğini kabul, beyan ve taahhüt eder.",
        "9.6. ALICI, Sözleşme konusu ürünün teslimatı için işbu Sözleşme'yi elektronik ortamda teyit edeceğini, herhangi bir nedenle sözleşme konusu ürün bedelinin ödenmemesi ve/veya banka kayıtlarında iptal edilmesi halinde, SATICI'nın sözleşme konusu ürünü teslim yükümlülüğünün sona ereceğini kabul, beyan ve taahhüt eder.",
        "9.7. ALICI, Sözleşme konusu ürünün ALICI veya ALICI'nın gösterdiği adresteki kişi ve/veya kuruluşa tesliminden sonra ALICI'ya ait kredi kartının yetkisiz kişilerce haksız kullanılması sonucunda sözleşme konusu ürün bedelinin ilgili banka veya finans kuruluşu tarafından SATICI'ya ödenmemesi halinde, ALICI Sözleşme konusu ürünü 3 gün içerisinde nakliye gideri SATICI'ya ait olacak şekilde SATICI'ya iade edeceğini kabul, beyan ve taahhüt eder.",
        "9.8. SATICI, tarafların iradesi dışında gelişen, önceden öngörülemeyen ve tarafların borçlarını yerine getirmesini engelleyici ve/veya geciktirici hallerin oluşması gibi mücbir sebepler halleri nedeni ile sözleşme konusu ürünü süresi içinde teslim edemez ise, durumu ALICI'ya bildireceğini kabul, beyan ve taahhüt eder. ALICI da siparişin iptal edilmesini, sözleşme konusu ürünün varsa emsali ile değiştirilmesini ve/veya teslimat süresinin engelleyici durumun ortadan kalkmasına kadar ertelenmesini SATICI'dan talep etme hakkını haizdir. ALICI tarafından siparişin iptal edilmesi halinde ALICI'nın nakit ile yaptığı ödemelerde, ürün tutarı 14 gün içinde kendisine nakden ve defaten ödenir. ALICI'nın kredi kartı ile yaptığı ödemelerde ise, ürün tutarı, siparişin ALICI tarafından iptal edilmesinden sonra 14 gün içerisinde ilgili bankaya iade edilir. ALICI, SATICI tarafından kredi kartına iade edilen tutarın banka tarafından ALICI hesabına yansıtılmasına ilişkin ortalama sürecin 2 ile 3 haftayı bulabileceğini, bu tutarın bankaya iadesinden sonra ALICI'nın hesaplarına yansıması halinin tamamen banka işlem süreci ile ilgili olduğundan, ALICI, olası gecikmeler için SATICI'yı sorumlu tutamayacağını kabul, beyan ve taahhüt eder.",
        "9.9. SATICININ, ALICI tarafından siteye kayıt formunda belirtilen veya daha sonra kendisi tarafından güncellenen adresi, e-posta adresi, sabit ve mobil telefon hatları ve diğer iletişim bilgileri üzerinden mektup, e-posta, SMS, telefon görüşmesi ve diğer yollarla iletişim, pazarlama, bildirim ve diğer amaçlarla ALICI'ya ulaşma hakkı bulunmaktadır. ALICI, işbu sözleşmeyi kabul etmekle SATICI'nın kendisine yönelik yukarıda belirtilen iletişim faaliyetlerinde bulunabileceğini kabul ve beyan etmektedir.",
        "9.10. ALICI, sözleşme konusu mal/hizmeti teslim almadan önce muayene edecek; ezik, kırık, ambalajı yırtılmış vb. hasarlı ve ayıplı mal/hizmeti kargo şirketinden teslim almayacaktır. Teslim alınan mal/hizmetin hasarsız ve sağlam olduğu kabul edilecektir. Teslimden sonra mal/hizmetin özenle korunması borcu, ALICI'ya aittir. Cayma hakkı kullanılacaksa mal/hizmet kullanılmamalıdır. Fatura iade edilmelidir.",
        "9.11. ALICI ile sipariş esnasında kullanılan kredi kartı hamilinin aynı kişi olmaması veya ürünün ALICI'ya tesliminden evvel, siparişte kullanılan kredi kartına ilişkin güvenlik açığı tespit edilmesi halinde, SATICI, kredi kartı hamiline ilişkin kimlik ve iletişim bilgilerini, siparişte kullanılan kredi kartının bir önceki aya ait ekstresini yahut kart hamilinin bankasından kredi kartının kendisine ait olduğuna ilişkin yazıyı ibraz etmesini ALICI'dan talep edebilir. ALICI'nın talebe konu bilgi/belgeleri temin etmesine kadar geçecek sürede sipariş dondurulacak olup, mezkur taleplerin 24 saat içerisinde karşılanmaması halinde ise SATICI, siparişi iptal etme hakkını haizdir.",
        "9.12. ALICI, SATICI'ya ait internet sitesine üye olurken verdiği kişisel ve diğer sair bilgilerin gerçeğe uygun olduğunu, SATICI'nın bu bilgilerin gerçeğe aykırılığı nedeniyle uğrayacağı tüm zararları, SATICI'nın ilk bildirimi üzerine derhal, nakden ve defaten tazmin edeceğini beyan ve taahhüt eder.",
        "9.13. ALICI, SATICI'ya ait internet sitesini kullanırken yasal mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi baştan kabul ve taahhüt eder. Aksi takdirde, doğacak tüm hukuki ve cezai yükümlülükler tamamen ve münhasıran ALICI'yı bağlayacaktır.",
        "9.14. ALICI, SATICI'ya ait internet sitesini hiçbir şekilde kamu düzenini bozucu, genel ahlaka aykırı, başkalarını rahatsız ve taciz edici şekilde, yasalara aykırı bir amaç için, başkalarının maddi ve manevi haklarına tecavüz edecek şekilde kullanamaz. Ayrıca, üye başkalarının hizmetleri kullanmasını önleyici veya zorlaştırıcı faaliyet (spam, virus, truva atı, vb.) işlemlerde bulunamaz.",
        "9.15. SATICI'ya ait internet sitesinin üzerinden, SATICI'nın kendi kontrolünde olmayan ve/veya başkaca üçüncü kişilerin sahip olduğu ve/veya işlettiği başka web sitelerine ve/veya başka içeriklere link verilebilir. Bu linkler ALICI'ya yönlenme kolaylığı sağlamak amacıyla konmuş olup herhangi bir web sitesini veya o siteyi işleten kişiyi desteklememekte ve Link verilen web sitesinin içerdiği bilgilere yönelik herhangi bir garanti niteliği taşımamaktadır.",
        "9.16. İşbu sözleşme içerisinde sayılan maddelerden bir ya da birkaçını ihlal eden üye işbu ihlal nedeniyle cezai ve hukuki olarak şahsen sorumlu olup, SATICI'yı bu ihlallerin hukuki ve cezai sonuçlarından ari tutacaktır. Ayrıca; işbu ihlal nedeniyle, olayın hukuk alanına intikal ettirilmesi halinde, SATICI'nın üyeye karşı üyelik sözleşmesine uyulmamasından dolayı tazminat talebinde bulunma hakkı saklıdır.",
      ],
    },
    {
      title: 'CAYMA HAKKI',
      content: [
        "10.1. ALICI; mesafeli sözleşmenin mal satışına ilişkin olması durumunda, ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde, SATICI'ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir. Hizmet sunumuna ilişkin mesafeli sözleşmelerde ise, bu süre sözleşmenin imzalandığı tarihten itibaren başlar. Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile hizmetin ifasına başlanan hizmet sözleşmelerinde cayma hakkı kullanılamaz. Cayma hakkının kullanımından kaynaklanan masraflar SATICI' ya aittir. ALICI, iş bu sözleşmeyi kabul etmekle, cayma hakkı konusunda bilgilendirildiğini peşinen kabul eder.",
        '10.2. Cayma hakkının kullanılması için 14 (ondört) günlük süre içinde SATICI\' ya iadeli taahhütlü posta, faks veya eposta ile yazılı bildirimde bulunulması ve ürünün işbu sözleşmede düzenlenen "Cayma Hakkı Kullanılamayacak Ürünler" hükümleri çerçevesinde kullanılmamış olması şarttır. Bu hakkın kullanılması halinde,',
        "a) 3. kişiye veya ALICI' ya teslim edilen ürünün faturası, (İade edilmek istenen ürünün faturası kurumsal ise, iade ederken kurumun düzenlemiş olduğu iade faturası ile birlikte gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen sipariş iadeleri İADE FATURASI kesilmediği takdirde tamamlanamayacaktır.)",
        'b) İade formu,',
        'c) İade edilecek ürünlerin kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir.',
        "d) SATICI, cayma bildiriminin kendisine ulaşmasından itibaren en geç 10 günlük süre içerisinde toplam bedeli ve ALICI'yı borç altına sokan belgeleri ALICI' ya iade etmek ve 20 günlük süre içerisinde malı iade almakla yükümlüdür.",
        "e) ALICI' nın kusurundan kaynaklanan bir nedenle malın değerinde bir azalma olursa veya iade imkânsızlaşırsa ALICI kusuru oranında SATICI' nın zararlarını tazmin etmekle yükümlüdür. Ancak cayma hakkı süresi içinde malın veya ürünün usulüne uygun kullanılması sebebiyle meydana gelen değişiklik ve bozulmalardan ALICI sorumlu değildir.",
        'f) Cayma hakkının kullanılması nedeniyle SATICI tarafından düzenlenen kampanya limit tutarının altına düşülmesi halinde kampanya kapsamında faydalanılan indirim miktarı iptal edilir.',
      ],
    },
    {
      title: 'CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER',
      content: [
        "ALICI'nın isteği veya açıkça kişisel ihtiyaçları doğrultusunda hazırlanan ve geri gönderilmeye müsait olmayan, iç giyim alt parçaları, mayo ve bikini altları, makyaj malzemeleri, tek kullanımlık ürünler, çabuk bozulma tehlikesi olan veya son kullanma tarihi geçme ihtimali olan mallar, ALICI'ya teslim edilmesinin ardından ALICI tarafından ambalajı açıldığı takdirde iade edilmesi sağlık ve hijyen açısından uygun olmayan ürünler, teslim edildikten sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan ürünler, Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete ve dergi gibi süreli yayınlara ilişkin mallar, Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar, ile ses veya görüntü kayıtlarının, kitap, dijital içerik, yazılım programlarının, veri kaydedebilme ve veri depolama cihazlarının, bilgisayar sarf malzemelerinin, ambalajının ALICI tarafından açılmış olması halinde iadesi Yönetmelik gereği mümkün değildir. Ayrıca Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin cayma hakkının kullanılması da Yönetmelik gereği mümkün değildir.",
        'Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, mayo, bikini, kitap, kopyalanabilir yazılım ve programlar, DVD, VCD, CD ve kasetler ile kırtasiye sarf malzemeleri (toner, kartuş, şerit vb.) iade edilebilmesi için ambalajlarının açılmamış, denenmemiş, bozulmamış ve kullanılmamış olmaları gerekir.',
      ],
    },
    {
      title: 'TEMERRÜT HALİ VE HUKUKİ SONUÇLARI',
      content: [
        "ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda temerrüde düştüğü takdirde, kart sahibi banka ile arasındaki kredi kartı sözleşmesi çerçevesinde faiz ödeyeceğini ve bankaya karşı sorumlu olacağını kabul, beyan ve taahhüt eder. Bu durumda ilgili banka hukuki yollara başvurabilir; doğacak masrafları ve vekâlet ücretini ALICI'dan talep edebilir ve her koşulda ALICI'nın borcundan dolayı temerrüde düşmesi halinde, ALICI, borcun gecikmeli ifasından dolayı SATICI'nın uğradığı zarar ve ziyanını ödeyeceğini kabul, beyan ve taahhüt eder",
      ],
    },
    {
      title: 'YETKİLİ MAHKEME',
      content: [
        'İşbu sözleşmeden doğan uyuşmazlıklarda şikayet ve itirazlar, Kanunda belirtilen parasal sınırlar dâhilinde tüketicinin yerleşim yerinin bulunduğu veya tüketici işleminin yapıldığı yerdeki tüketici sorunları hakem heyetine veya tüketici mahkemesine yapılacaktır',
      ],
    },
    {
      title: 'YÜRÜRLÜK',
      content: [
        'ALICI, Site üzerinden verdiği siparişe ait ödemeyi gerçekleştirdiğinde işbu sözleşmenin tüm şartlarını kabul etmiş sayılır. SATICI, siparişin gerçekleşmesi öncesinde işbu sözleşmenin sitede ALICI tarafından okunup kabul edildiğine dair onay alacak şekilde gerekli yazılımsal düzenlemeleri yapmakla yükümlüdür.',
      ],
    },
  ];

  return (
    <div className="container py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        Mesafeli Satış Sözleşmesi
      </h1>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
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
              <div className="text-gray-700">
                {section.content.map((paragraph, pIndex) => (
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
        <h2 className="text-xl font-semibold mb-4">Sözleşme Onayı</h2>
        <div className="mt-4">
          <p>SATICI:</p>
          <p>ALICI:</p>
          <p>TARİH:</p>
        </div>
      </div>
    </div>
  );
};

export default MesafeliSatisSozlesmeContainer;
