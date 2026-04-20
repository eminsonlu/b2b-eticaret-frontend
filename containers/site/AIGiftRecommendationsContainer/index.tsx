'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getGiftRecommendations } from '@/services/aiGiftAssistantService';
import { GiftRecommendationResponse } from '@/types/IAIGiftAssistant';
import { useNotificationStore } from '@/stores/notificationStore';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUtils';

const AIGiftRecommendationsContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addNotification } = useNotificationStore();
  
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<GiftRecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      const dataParam = searchParams.get('data');
      if (!dataParam) {
        setError('Wizard verisi bulunamadı. Lütfen wizard\'ı tekrar başlatın.');
        setLoading(false);
        return;
      }

      try {
        const wizardData = JSON.parse(decodeURIComponent(dataParam));
        
        // Backend formatına göre request oluştur
        const request = {
          relationship: wizardData.relationship || wizardData.target || '',
          occasion: wizardData.occasion || '',
          budget: wizardData.budget || 'any',
          emotion: wizardData.emotion || 'emotional',
          hasPhotos: wizardData.hasPhotos || false,
          photos: wizardData.photos || [],
        };

        const [err, data] = await getGiftRecommendations(request);
        
        if (err || !data) {
          setError('Öneriler yüklenirken bir hata oluştu.');
          addNotification({
            title: 'Hata',
            text: 'Öneriler yüklenemedi.',
            type: 'error',
          });
        } else {
          setRecommendations(data);
        }
      } catch (err) {
        console.error('Error parsing wizard data:', err);
        setError('Wizard verisi geçersiz.');
        addNotification({
          title: 'Hata',
          text: 'Wizard verisi okunamadı.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [searchParams, addNotification]);

  if (loading) {
    return (
      <div className="container px-4 sm:px-6 mt-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Öneriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !recommendations) {
    return (
      <div className="container px-4 sm:px-6 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Hata</h2>
            <p className="text-slate-600 mb-6">{error || 'Öneriler yüklenemedi.'}</p>
            <button
              onClick={() => router.push('/ai-hediye-asistani/wizard')}
              className="bg-primary-400 hover:bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Wizard'ı Tekrar Başlat
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { mainProduct, bundle, totalPrice, theme, message, explanation } = recommendations;
  const imageUrl = getImageUrl(mainProduct.thumbnail);

  return (
    <div className="container px-4 sm:px-6 mt-8">
      <div className="max-w-4xl mx-auto">
        {/* Theme */}
        <div className="bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{theme}</h1>
          <p className="text-white/90">{message}</p>
        </div>

        {/* Main Product */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">Önerilen Hediye</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainProduct.thumbnail && (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={imageUrl}
                  alt={mainProduct.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-bold mb-2">{mainProduct.title}</h3>
              <p className="text-slate-600 mb-4 line-clamp-3">{mainProduct.summary}</p>
              
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-1">Neden bu hediye?</p>
                <p className="text-slate-700">{mainProduct.reason}</p>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                {mainProduct.discountPrice ? (
                  <>
                    <span className="text-2xl font-bold text-primary-400">
                      {mainProduct.discountPrice} TL
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      {mainProduct.price} TL
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary-400">
                    {mainProduct.price} TL
                  </span>
                )}
              </div>
              
              <Link
                href={`/urun/${mainProduct.slug}`}
                className="block w-full bg-primary-400 hover:bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Ürünü İncele
              </Link>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-slate-50 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-3">Açıklama</h3>
          <p className="text-slate-700 leading-relaxed">{explanation}</p>
        </div>

        {/* Bundle Products (if any) */}
        {bundle && bundle.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">Bundle Ürünler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundle.map((product: any) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <h4 className="font-bold mb-2">{product.title}</h4>
                  <p className="text-primary-400 font-semibold">{product.price} TL</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Price */}
        {bundle && bundle.length > 0 && (
          <div className="bg-primary-50 rounded-lg shadow-md p-6 text-center">
            <p className="text-slate-600 mb-2">Toplam Fiyat</p>
            <p className="text-3xl font-bold text-primary-400">{totalPrice} TL</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => router.push('/ai-hediye-asistani/wizard')}
            className="flex-1 border-2 border-slate-300 rounded-lg py-3 px-6 hover:bg-slate-50 transition-colors"
          >
            Yeni Öneri Al
          </button>
          <Link
            href="/ai-hediye-asistani"
            className="flex-1 bg-primary-400 hover:bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIGiftRecommendationsContainer;

