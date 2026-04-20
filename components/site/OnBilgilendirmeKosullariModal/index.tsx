'use client';
import React, { useEffect, useState } from 'react';
import Modal from '@/components/shared/Modal';
import { fetchAddressById, fetchAddresses } from '@/services/addressService';
import { IAddress } from '@/types/IAddress';
import IUser from '@/types/IUser';
import { fetchMe } from '@/services/authService';

interface Props {
  show: boolean;
  onClose: () => void;
  paymentMethod: string;
  addressId: string;
  cart: any[];
}

const OnBilgilendirmeKosullariModal = ({
  show,
  onClose,
  paymentMethod,
  addressId,
  cart,
}: Props) => {
  const [address, setAddress] = useState<IAddress | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    (async () => {
      const [err, result] = await fetchAddressById(addressId);
      if (err) return;
      setAddress(result);
    })();
  }, [show]);

  useEffect(() => {
    (async () => {
      const [err, result] = await fetchMe();
      if (err) return;
      setUser(result);
    })();
  }, [show]);

  const DynamicData = {
    company: {
      name: 'EAS GLOBAL E-TİCARET LİMİTED ŞİRKETİ',
      mersis: '0323139904300001',
      address:
        '23 Nisan Mah. 251. Sk. No: 18A İç Kapı No: 5 Nilüfer/BURSA',
      phone: '+90 553 534 52 72',
      email: 'destek@tekyerde.com',
    },
    shipping: {
      fee: 49.99,
    },
  };

  return (
    <Modal
      title="Ön Bilgilendirme Koşulları"
      size="small"
      show={show}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 text-sm">
        <h2 className="font-bold text-lg">1. TARAFLAR VE KONU</h2>
        <p className="text-justify">
          İşbu Ön Bilgilendirme Formu&lsquo;nun konusu, Alıcı ve Satıcı
          arasındaki Sözleşme&lsquo;ye ilişkin Kanun ve Yönetmelik hükümleri
          uyarınca bilgilendirilmesidir. Ayrıca Yönetmelik uyarınca yer
          verilmesi zorunlu olan hususlar Ön Bilgilendirme Formu&lsquo;nda yer
          almaktadır.
        </p>

        <h2 className="font-bold text-lg mt-4">2. TARAF BİLGİLERİ</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan={2} className="p-2 border-b">
                  ALICI BİLGİLERİ
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r w-1/3">Teslim Edilecek Kişi</td>
                <td className="p-2">
                  {user?.firstName} {user?.lastName}
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">Teslimat Adresi</td>
                <td className="p-2">
                  {address?.address} {address?.district}/{address?.city}{' '}
                  {address?.zipCode}
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">Telefon</td>
                <td className="p-2">{user?.phone}</td>
              </tr>
              <tr>
                <td className="p-2 border-r">E-posta</td>
                <td className="p-2">{user?.email}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border rounded-lg overflow-hidden mt-4">
          <table className="w-full text-sm">
            <tbody>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan={2} className="p-2 border-b">
                  SATICI BİLGİLERİ
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r w-1/3">Ticaret Unvanı</td>
                <td className="p-2">{DynamicData.company.name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">MERSIS No</td>
                <td className="p-2">{DynamicData.company.mersis}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">Adresi</td>
                <td className="p-2">{DynamicData.company.address}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">Telefon</td>
                <td className="p-2">{DynamicData.company.phone}</td>
              </tr>
              <tr>
                <td className="p-2 border-r">E-posta</td>
                <td className="p-2">{DynamicData.company.email}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-bold text-lg mt-4">3. ÜRÜN/HİZMET BİLGİLERİ</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 font-semibold">
                <th className="p-2 border-b text-left">Ürün Açıklaması</th>
                <th className="p-2 border-b text-center">Adet</th>
                <th className="p-2 border-b text-right">Birim Fiyat</th>
                <th className="p-2 border-b text-right">Toplam</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{product.title}</td>
                    <td className="p-2 text-center">{product.quantity}</td>
                    <td className="p-2 text-right">
                      {product.price.toFixed(2)} TL
                    </td>
                    <td className="p-2 text-right">
                      {(product.price * product.quantity).toFixed(2)} TL
                    </td>
                  </tr>
                ))}
              <tr className="border-b">
                <td className="p-2 font-semibold" colSpan={3}>
                  Kargo Ücreti
                </td>
                <td className="p-2 text-right">
                  {DynamicData.shipping.fee.toFixed(2)} TL
                </td>
              </tr>
              <tr className="font-bold bg-gray-50">
                <td colSpan={3} className="p-2">
                  TOPLAM
                </td>
                <td className="p-2 text-right">
                  {(
                    cart.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0
                    ) + DynamicData.shipping.fee
                  ).toFixed(2)}{' '}
                  TL
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border rounded-lg overflow-hidden mt-4">
          <table className="w-full text-sm">
            <tbody>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan={2} className="p-2 border-b">
                  SİPARİŞ DETAYLARI
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r w-1/3">Sipariş Tarihi</td>
                <td className="p-2">{new Date().toLocaleDateString()}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">Ödeme Şekli</td>
                <td className="p-2">
                  {paymentMethod === 'CREDIT_CARD'
                    ? 'Banka Kartı/Kredi Kartı İle İşlem (Tek Çekim)'
                    : 'Havale/EFT Ödeme'}
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">Teslim Şekli</td>
                <td className="p-2">Kargo</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r">Teslimat Süresi</td>
                <td className="p-2">En geç 10-14 gün</td>
              </tr>
              <tr>
                <td className="p-2 border-r">
                  Kargo Şirketi&lsquo;ne Teslim Süresi
                </td>
                <td className="p-2">En geç 7-10 gün</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-bold mt-4">DİKKAT:</p>
        <p className="text-justify">
          SÖZ KONUSU ÜRÜN BEDELİ, {DynamicData.company.name.toUpperCase()} ALICI
          GÜVENCESİ KAPSAMINDA SATICI ADINA,{' '}
          {DynamicData.company.name.split(' ')[0]} TARAFINDAN ALICI&lsquo;DAN
          TAHSİL EDİLMEKTEDİR. ALICI MALIN BEDELİNİ{' '}
          {DynamicData.company.name.split(' ')[0]}&lsquo;YE ÖDEMEKLE, ÜRÜN
          BEDELİNİ SATICI&lsquo;YA ÖDEMİŞ SAYILACAK VE BİR DAHA ÖDEME
          YÜKÜMLÜLÜĞÜ ALTINA GİRMEYECEKTİR.
        </p>

        <h2 className="font-bold text-lg mt-4">4. CAYMA HAKKI</h2>
        <p className="text-justify">
          Alıcı, 7 (yedi) gün içinde herhangi bir gerekçe göstermeksizin ve
          cezai şart ödemeksizin Sözleşme&lsquo;den cayma hakkına sahiptir.
          Cayma hakkı süresi, Hizmet için Sözleşme&lsquo;nin kurulduğu gün; Ürün
          için Alıcı&lsquo;nın veya Alıcı tarafından belirlenen üçüncü kişinin
          Ürün&lsquo;ü teslim aldığı gün başlar.
        </p>
      </div>
    </Modal>
  );
};

export default OnBilgilendirmeKosullariModal;
