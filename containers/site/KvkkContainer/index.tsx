'use client';
import React from 'react';

const KvkkContainer = () => {
  const sections = [
    {
      title: 'Kişisel Veriler Kanunu hakkında genel bilgilendirme',
      content:
        "6698 Sayılı Kişisel Verilerin Korunması Kanunu (bundan sonra KVKK olarak anılacaktır) 24 Mart 2016 tarihinde kabul edilmiş, 7 Nisan 2016 tarihli 29677 sayılı Resmi Gazete'de yayınlanmıştır. KVKK'nun bir kısmı yayın tarihinde, bir kısmı ise 7 Ekim 2016'da yürürlüğe girmiştir.",
    },
    {
      title: 'Veri sorumlusu sıfatıyla bilgilendirme',
      content:
        "6698 sayılı KVKK uyarınca ve Veri Sorumlusu sıfatıyla, kişisel verileriniz bu sayfada açıklandığı çerçevede; kaydedilecek, saklanacak, güncellenecek, mevzuatın izin verdiği durumlarda 3. kişilere açıklanabilecek / devredilebilecek, sınıflandırılabilecek ve KVKK'da sayılan şekillerde işlenebilecektir.",
    },
    {
      title: 'Kişisel verilerinizin ne şekilde işlenebileceği',
      content:
        '6698 sayılı KVKK uyarınca, Firmamız ile paylaştığınız kişisel verileriniz, tamamen veya kısmen, otomatik olarak, veyahut herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilerek, kaydedilerek, depolanarak, değiştirilerek, yeniden düzenlenerek, kısacası veriler üzerinde gerçekleştirilen her türlü işleme konu olarak tarafımızdan işlenebilecektir. KVKK kapsamında veriler üzerinde gerçekleştirilen her türlü işlem "kişisel verilerin işlenmesi" olarak kabul edilmektedir.',
    },
    {
      title: 'Kişisel verilerinizin işlenme amaçları ve hukuki sebepleri',
      content:
        "Paylaştığınız kişisel veriler, Müşterilerimize verdiğimiz hizmetlerin gereklerini, sözleşmenin ve teknolojinin gereklerine uygun şekilde yapabilmek, sunulan ürün ve hizmetlerimizi geliştirebilmek için; 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ile bu düzenlemelere dayanak yapılarak hazırlanan 26.08.2015 tarihli 29457 sayılı RG'de yayınlanan Elektronik Ticarette Hizmet Sağlayıcı ve Aracı Hizmet Sağlayıcılar Hakkında Yönetmelik, 27.11.2014 tarihli ve 29188 sayılı RG'de yayınlanan Mesafeli Sözleşmeler Yönetmeliği ve diğer ilgili mevzuat kapsamında işlem sahibinin bilgilerini tespit için kimlik, adres ve diğer gerekli bilgileri kaydetmek için; Bankacılık ve Elektronik Ödeme alanında zorunlu olan ödeme sistemleri, elektronik sözleşme veya kağıt ortamında işleme dayanak olacak tüm kayıt ve belgeleri düzenlemek; mevzuat gereği ve diğer otoritelerce öngörülen bilgi saklama, raporlama, bilgilendirme yükümlülüklerine uymak için; Kamu güvenliğine ilişkin hususlarda ve hukuki uyuşmazlıklarda, talep halinde ve mevzuat gereği savcılıklara, mahkemelere ve ilgili kamu görevlilerine bilgi verebilmek için; 6698 sayılı KVKK ve ilgili ikincil düzenlemelere uygun olarak işlenecektir.",
    },
    {
      title:
        'Kişisel verilerinizin aktarılabileceği üçüncü kişi veya kuruluşlar',
      content:
        'Yukarıda belirtilen amaçlarla, Firmamız ile paylaştığınız kişisel verilerinizin aktarılabileceği kişi / kuruluşlar; başta Firmamızın e-ticaret altyapısını sağlayan IdeaSoft Yazılım San. ve Tic. A.Ş. olmak üzere, tedarikçiler, kargo şirketleri gibi sunulan hizmetler ile ilgili kişi ve kuruluşlar, faaliyetlerimizi yürütmek üzere ve/veya Veri İşleyen sıfatı ile hizmet alınan, iş birliği yaptığımız program ortağı kuruluşları, yurtiçi / yurtdışı kuruluşlar ve diğer 3. kişilerdir.',
    },
    {
      title: 'Kişisel verilerinizin toplanma şekli',
      content:
        'Kişisel verileriniz, Firmamız internet sitesi ve mobil uygulamalarındaki formlar aracılığıyla ad, soyad, TC kimlik numarası, adres, telefon, iş veya özel e-posta adresi gibi bilgiler ile; kullanıcı adı ve şifresi kullanılarak giriş yapılan sayfalardaki tercihleri, gerçekleştirilen işlemlerin IP kayıtları, tarayıcı tarafından toplanan çerez verileri ile gezinme süre ve detaylarını içeren veriler, konum verileri şeklinde; Satış ve pazarlama departmanı çalışanlarımız, şubelerimiz, tedarikçilerimiz, diğer satış kanalları, kağıt üzerindeki formlar, kartvizitler, dijital pazarlama ve çağrı merkezi gibi kanallarımız aracılığıyla sözlü, yazılı veya elektronik ortamdan; Firmamız ile ticari ilişki kurmak, iş başvurusu yapmak, teklif vermek gibi amaçlarla, kartvizit, özgeçmiş (cv), teklif vermek ve sair yollarla kişisel verilerini paylaşan kişilerden alınan, fiziki veya sanal bir ortamda, yüz yüze ya da mesafeli, sözlü veya yazılı ya da elektronik ortamdan; Ayrıca farklı kanallardan dolaylı yoldan elde edilen, web sitesi, blog, yarışma, anket, oyun, kampanya ve benzeri amaçlı kullanılan (mikro) web sitelerinden ve sosyal medyadan elde edilen veriler, e-bülten okuma veya tıklama hareketleri, kamuya açık veri tabanlarının sunduğu veriler, sosyal medya platformlarından paylaşıma açık profil ve verilerden; işlenebilmekte ve toplanabilmektedir.',
    },
    {
      title: 'KVKK yürürlüğe girmeden önce elde edilen kişisel verileriniz',
      content:
        "KVKK'nun yürürlük tarihi olan 7 Nisan 2016 tarihinden önce, üyelik, elektronik ileti izni, ürün / hizmet satın alma ve diğer şekillerde hukuka uygun olarak elde edilmiş olan kişisel verileriniz de bu belgede düzenlenen şart ve koşullara uygun olarak işlenmekte ve muhafaza edilmektedir.",
    },
    {
      title: 'Kişisel verilerinizin yurtdışına aktarılması',
      content:
        "Türkiye'de işlenerek veya Türkiye dışında işlenip muhafaza edilmek üzere, yukarıda sayılan yöntemlerden herhangi birisi ile toplanmış kişisel verileriniz KVKK kapsamında kalmak kaydıyla ve sözleşme amaçlarına uygun olarak yurtdışında bulunan (Kişisel Veriler Kurulu tarafından akredite edilen ve kişisel verilerin korunması hususunda yeterli korumanın bulunduğu ülkelere) hizmet aracılarına da aktarılabilecektir.",
    },
    {
      title: 'Kişisel verilerin saklanması ve korunması',
      content:
        "Kişisel verileriniz, Firmamız nezdinde yer alan veri tabanında ve sistemlerde KVKK'nun 12. maddesi gereğince gizli olarak saklanacak; yasal zorunluluklar ve bu belgede belirtilen düzenlemeler haricinde hiçbir şekilde üçüncü kişilerle paylaşılmayacaktır. Firmamız, kişisel verilerinizin barındığı sistemleri ve veri tabanlarını, KVKK'nun 12. Maddesi gereği kişisel verilerin hukuka aykırı olarak işlenmesini önlemekle, yetkisiz kişilerin erişimlerini engellemekle, erişim yönetimi gibi yazılımsal tedbirleri ve fiziksel güvenlik önlemleri almakla mükelleftir. Kişisel verilerin yasal olmayan yollarla başkaları tarafından elde edilmesinin öğrenilmesi halinde durum derhal, yasal düzenlemeye uygun ve yazılı olarak Kişisel Verileri Koruma Kurulu'na bildirilecektir.",
    },
    {
      title: 'Kişisel verilerin güncel ve doğru tutulması',
      content:
        "KVKK'nun 4. maddesi uyarınca Firmamızın kişisel verilerinizi doğru ve güncel olarak tutma yükümlülüğü bulunmaktadır. Bu kapsamda Firmamızın yürürlükteki mevzuattan doğan yükümlülüklerini yerine getirebilmesi için Müşterilerimizin doğru ve güncel verilerini paylaşması veya web sitesi / mobil uygulama üzerinden güncellemesi gerekmektedir.",
    },
    {
      title: '6698 sayılı KVKK uyarınca kişisel veri sahibinin hakları',
      content:
        "6698 sayılı KVKK 11.maddesi 07 Ekim 2016 tarihinde yürürlüğe girmiş olup ilgili madde gereğince, Kişisel Veri Sahibi'nin bu tarihten sonraki hakları aşağıdaki gibidir: Kişisel Veri Sahibi, Firmamıza (veri sorumlusu) başvurarak kendisiyle ilgili; Kişisel veri işlenip işlenmediğini öğrenme, Kişisel verileri işlenmişse buna ilişkin bilgi talep etme, Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme, Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme, KVKK'nun 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme, Kişisel verilerin düzeltilmesi, silinmesi, yok edilmesi halinde bu işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere de bildirilmesini isteme, İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme, Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme, haklarına sahiptir. Ahmet Şerefoğlu, KVKK kapsamında Veri Sorumlusu'dur. Firmamız tarafından atanacak Veri Sorumlusu Temsilcisi, yasal altyapı sağlandığında Veri Sorumluları Sicilinde ve bu belgenin bulunduğu internet adresinde ilan edilecektir.",
    },
  ];

  return (
    <div className="container py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        Kişisel Veriler Politikası
      </h1>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Tekyerde.com Kişisel Veriler Politikası
      </h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <h2 className="text-lg font-semibold mb-3">
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
        <h2 className="text-lg font-semibold mb-4">İletişim Bilgileri</h2>
        <p className="text-gray-700 mb-4">
          Kişisel Veri Sahipleri, sorularını, görüşlerini veya taleplerini
          aşağıdaki iletişim kanallarından herhangi birisine yöneltebilir:
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

export default KvkkContainer;
