'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import {
  getWizardOptions,
  submitWizardStep1,
  submitWizardStep2,
  submitWizardStep3,
  submitWizardStep4,
  submitWizardStep5,
} from '@/services/aiGiftAssistantService';
import {
  WizardOptions,
  WizardStep1Data,
  WizardStep2Data,
  WizardStep3Data,
  WizardStep4Data,
  WizardStep5Data,
} from '@/types/IAIGiftAssistant';
import { useNotificationStore } from '@/stores/notificationStore';

// Fallback data - defined outside component to prevent hydration issues
const fallbackOptions: WizardOptions = {
  occasions: ['Doğum Günü', 'Yıldönümü', 'Düğün', 'Nişan', 'Yeni Ev', 'Mezuniyet', 'Anneler Günü', 'Babalar Günü'],
  relationships: ['Aile', 'Arkadaş', 'Sevgili', 'Eş', 'İş Arkadaşı', 'Komşu', 'Akraba'],
  ageGroups: ['0-5', '6-12', '13-17', '18-25', '26-35', '36-50', '50+'],
  interests: ['Spor', 'Müzik', 'Sanat', 'Teknoloji', 'Kitap', 'Yemek', 'Seyahat', 'Moda', 'Doğa', 'Oyun'],
  budgets: ['0-100 TL', '100-250 TL', '250-500 TL', '500-1000 TL', '1000+ TL'],
};

const AIGiftWizardContainer = () => {
  const router = useRouter();
  const { setSteps } = useBreadcrumbStore();
  const { addNotification } = useNotificationStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<WizardOptions>(fallbackOptions);
  const [wizardData, setWizardData] = useState<any>({});

  // Step 1
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [selectedRelationship, setSelectedRelationship] = useState<string>('');

  // Step 2
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');

  // Step 3
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  // Step 4
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');

  // Step 5
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [hasPhotos, setHasPhotos] = useState<boolean>(false);

  useEffect(() => {
    // Only run on client side to avoid hydration issues
    if (typeof window !== 'undefined') {
      setSteps([
        { title: 'AI Hediye Asistanı', path: '/ai-hediye-asistani' },
        { title: 'Wizard', path: '/ai-hediye-asistani/wizard' },
      ]);
      loadWizardOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadWizardOptions = async () => {
    setLoading(true);
    
    try {
      const [error, data] = await getWizardOptions();
      console.log('Wizard options loaded:', { error, data });
      
      if (error || !data || !data.occasions || !Array.isArray(data.occasions)) {
        console.warn('API data invalid, using fallback data');
        setOptions(fallbackOptions);
        if (error) {
          addNotification({
            title: 'Uyarı',
            text: 'Wizard seçenekleri yüklenemedi. Demo veriler kullanılıyor.',
            type: 'warning',
          });
        }
      } else {
        console.log('Setting options from API:', data);
        setOptions(data);
      }
    } catch (err) {
      console.error('Error in loadWizardOptions:', err);
      setOptions(fallbackOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleStep1Next = async () => {
    if (!selectedOccasion || !selectedRelationship) {
      addNotification({
        title: 'Uyarı',
        text: 'Lütfen tüm alanları doldurun.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    const stepData: WizardStep1Data = {
      occasion: selectedOccasion,
      relationship: selectedRelationship,
    };
    
    try {
      const [error] = await submitWizardStep1(stepData, wizardData);
      if (error) {
        console.error('Step 1 submit error:', error);
        // Continue anyway - save locally
        setWizardData({ ...wizardData, ...stepData });
        setCurrentStep(2);
        addNotification({
          title: 'Uyarı',
          text: 'Adım 1 kaydedilemedi ama devam edebilirsiniz.',
          type: 'warning',
        });
      } else {
        // Backend formatına göre target ve occasion'ı ekle
        setWizardData({ 
          ...wizardData, 
          ...stepData,
          target: stepData.relationship, // target mapping service'de yapılıyor
          occasion: stepData.occasion,
        });
        setCurrentStep(2);
      }
    } catch (err) {
      console.error('Error in handleStep1Next:', err);
      // Continue anyway - save locally
      setWizardData({ ...wizardData, ...stepData });
      setCurrentStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Next = async () => {
    if (!selectedAgeGroup) {
      addNotification({
        title: 'Uyarı',
        text: 'Lütfen yaş grubunu seçin.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    const stepData: WizardStep2Data = {
      ageGroup: selectedAgeGroup,
      gender: selectedGender || undefined,
    };
    
    try {
      const [error] = await submitWizardStep2(stepData, wizardData);
      if (error) {
        console.error('Step 2 submit error:', error);
        setWizardData({ ...wizardData, ...stepData });
        setCurrentStep(3);
      } else {
        // Step2'de sadece wizardData'yı koru, yeni data ekleme
        setWizardData({ ...wizardData, ...stepData });
        setCurrentStep(3);
      }
    } catch (err) {
      console.error('Error in handleStep2Next:', err);
      setWizardData({ ...wizardData, ...stepData });
      setCurrentStep(3);
    } finally {
      setLoading(false);
    }
  };

  const handleStep3Next = async () => {
    if (selectedInterests.length === 0) {
      addNotification({
        title: 'Uyarı',
        text: 'Lütfen en az bir ilgi alanı seçin.',
        type: 'warning',
      });
      return;
    }

    if (!selectedBudget) {
      addNotification({
        title: 'Uyarı',
        text: 'Lütfen bütçe aralığını seçin.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    const stepData: WizardStep3Data = {
      interests: selectedInterests,
      budget: selectedBudget,
    };
    
    try {
      const [error] = await submitWizardStep3(stepData, wizardData);
      if (error) {
        console.error('Step 3 submit error:', error);
        setWizardData({ ...wizardData, ...stepData });
        setCurrentStep(4);
      } else {
        // Step3'te budget'ı ekle
        setWizardData({ ...wizardData, ...stepData, budget: selectedBudget });
        setCurrentStep(4);
      }
    } catch (err) {
      console.error('Error in handleStep3Next:', err);
      setWizardData({ ...wizardData, ...stepData });
      setCurrentStep(4);
    } finally {
      setLoading(false);
    }
  };

  const handleStep4Next = async () => {
    if (!selectedEmotion) {
      addNotification({
        title: 'Uyarı',
        text: 'Lütfen duygu ve stil tercihini seçin.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    const stepData: WizardStep4Data = {
      budget: wizardData?.budget || selectedBudget,
      emotion: selectedEmotion,
    };
    
    try {
      const [error] = await submitWizardStep4(stepData, wizardData);
      if (error) {
        console.error('Step 4 submit error:', error);
        setWizardData({ ...wizardData, ...stepData });
        setCurrentStep(5);
      } else {
        setWizardData({ ...wizardData, ...stepData, emotion: selectedEmotion });
        setCurrentStep(5);
      }
    } catch (err) {
      console.error('Error in handleStep4Next:', err);
      setWizardData({ ...wizardData, ...stepData });
      setCurrentStep(5);
    } finally {
      setLoading(false);
    }
  };

  const handleStep5Complete = async () => {
    setLoading(true);
    const stepData: WizardStep5Data = {
      additionalInfo: additionalInfo || undefined,
      hasPhotos: hasPhotos,
      photos: hasPhotos ? [] : undefined, // TODO: Fotoğraf yükleme özelliği eklenebilir
    };
    
    try {
      const [error] = await submitWizardStep5(stepData, wizardData);
      if (error) {
        console.warn('Step 5 submit error (continuing anyway):', error);
        // Continue anyway - API might not be available
      }
      
      const finalData = { ...wizardData, ...stepData };
      setLoading(false);
      router.push(`/ai-hediye-asistani/recommendations?data=${encodeURIComponent(JSON.stringify(finalData))}`);
    } catch (err) {
      console.error('Error in handleStep5Complete:', err);
      // Continue anyway
      const finalData = { ...wizardData, ...stepData };
      setLoading(false);
      router.push(`/ai-hediye-asistani/recommendations?data=${encodeURIComponent(JSON.stringify(finalData))}`);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/ai-hediye-asistani');
    }
  };

  if (loading && !options) {
    return (
      <div className="container px-4 sm:px-6 mt-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Wizard seçenekleri yükleniyor...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="container px-4 sm:px-6 mt-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Adım {currentStep} / 5
            </span>
            <span className="text-sm text-slate-500">
              %{Math.round((currentStep / 5) * 100)}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-primary-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Hediye için özel günü seçin</h3>
              <p className="text-slate-600 mb-6">Hediye hangi özel gün için?</p>
              
              <div className="space-y-4 mb-8">
                {(Array.isArray(options?.occasions) ? options.occasions : fallbackOptions.occasions).map((occasion, index) => {
                  const occasionObj = occasion as any;
                  const occasionValue = typeof occasion === 'string' ? occasion : (occasionObj?.value || occasionObj?.label || String(occasion));
                  const occasionKey = typeof occasion === 'string' ? occasion : (occasionObj?.value || `occasion-${index}`);
                  return (
                    <button
                      key={occasionKey}
                      onClick={() => setSelectedOccasion(occasionValue)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedOccasion === occasionValue
                          ? 'border-primary-400 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-400'
                      }`}
                    >
                      {occasionValue}
                    </button>
                  );
                })}
              </div>

              <h3 className="text-2xl font-bold mb-4">Alıcı ile ilişkiniz</h3>
              <p className="text-slate-600 mb-6">Hediye alacağınız kişi ile ilişkiniz nedir?</p>
              
              <div className="space-y-4">
                {(Array.isArray(options?.relationships) ? options.relationships : fallbackOptions.relationships).map((relationship, index) => {
                  const relationshipObj = relationship as any;
                  const relationshipValue = typeof relationship === 'string' ? relationship : (relationshipObj?.value || relationshipObj?.label || String(relationship));
                  const relationshipKey = typeof relationship === 'string' ? relationship : (relationshipObj?.value || `relationship-${index}`);
                  return (
                    <button
                      key={relationshipKey}
                      onClick={() => setSelectedRelationship(relationshipValue)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedRelationship === relationshipValue
                          ? 'border-primary-400 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-400'
                      }`}
                    >
                      {relationshipValue}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Alıcının yaş grubu</h3>
              <p className="text-slate-600 mb-6">Hediye alacağınız kişinin yaş grubunu seçin</p>
              
              <div className="space-y-4 mb-8">
                {(Array.isArray(options?.ageGroups) ? options.ageGroups : fallbackOptions.ageGroups).map((ageGroup, index) => {
                  const ageGroupObj = ageGroup as any;
                  const ageGroupValue = typeof ageGroup === 'string' ? ageGroup : (ageGroupObj?.value || ageGroupObj?.label || String(ageGroup));
                  const ageGroupKey = typeof ageGroup === 'string' ? ageGroup : (ageGroupObj?.value || `ageGroup-${index}`);
                  return (
                    <button
                      key={ageGroupKey}
                      onClick={() => setSelectedAgeGroup(ageGroupValue)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedAgeGroup === ageGroupValue
                          ? 'border-primary-400 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-400'
                      }`}
                    >
                      {ageGroupValue}
                    </button>
                  );
                })}
              </div>

              <h3 className="text-2xl font-bold mb-4">Cinsiyet (Opsiyonel)</h3>
              <div className="space-y-4">
                {['Erkek', 'Kadın', 'Belirtmek istemiyorum'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setSelectedGender(gender)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedGender === gender
                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:border-primary-400'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">İlgi alanları</h3>
              <p className="text-slate-600 mb-6">Alıcının ilgi alanlarını seçin (birden fazla seçebilirsiniz)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {(Array.isArray(options?.interests) ? options.interests : fallbackOptions.interests).map((interest, index) => {
                  const interestObj = interest as any;
                  const interestValue = typeof interest === 'string' ? interest : (interestObj?.value || interestObj?.label || String(interest));
                  const interestKey = typeof interest === 'string' ? interest : (interestObj?.value || `interest-${index}`);
                  return (
                    <button
                      key={interestKey}
                      onClick={() => toggleInterest(interestValue)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedInterests.includes(interestValue)
                          ? 'border-primary-400 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-400'
                      }`}
                    >
                      {interestValue}
                    </button>
                  );
                })}
              </div>

              <h3 className="text-2xl font-bold mb-4">Bütçe aralığı</h3>
              <p className="text-slate-600 mb-6">Hediye için bütçe aralığınızı seçin</p>
              
              <div className="space-y-4">
                {(Array.isArray(options?.budgets) ? options.budgets : fallbackOptions.budgets).map((budget, index) => {
                  const budgetObj = budget as any;
                  const budgetValue = typeof budget === 'string' ? budget : (budgetObj?.value || budgetObj?.label || String(budget));
                  const budgetKey = typeof budget === 'string' ? budget : (budgetObj?.value || `budget-${index}`);
                  return (
                    <button
                      key={budgetKey}
                      onClick={() => setSelectedBudget(budgetValue)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedBudget === budgetValue
                          ? 'border-primary-400 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-400'
                      }`}
                    >
                      {budgetValue}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Duygu ve stil</h3>
              <p className="text-slate-600 mb-6">Hediye için duygu ve stil tercihinizi seçin</p>
              
              <div className="space-y-4">
                {[
                  { value: 'Duygusal', label: 'Duygusal' },
                  { value: 'Eğlenceli', label: 'Eğlenceli' },
                  { value: 'Zarif', label: 'Zarif' },
                  { value: 'Sevimli', label: 'Sevimli' },
                  { value: 'Yeni Yıl Ruhu', label: 'Yeni Yıl Ruhu' },
                ].map((emotion) => (
                  <button
                    key={emotion.value}
                    onClick={() => setSelectedEmotion(emotion.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedEmotion === emotion.value
                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:border-primary-400'
                    }`}
                  >
                    {emotion.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Ek bilgiler</h3>
              <p className="text-slate-600 mb-6">Varsa eklemek istediğiniz bilgileri yazın (opsiyonel)</p>
              
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Örn: Spor yapmayı sever, teknoloji meraklısı..."
                className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-primary-400 focus:outline-none min-h-[150px] mb-6"
              />

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hasPhotos"
                  checked={hasPhotos}
                  onChange={(e) => setHasPhotos(e.target.checked)}
                  className="w-5 h-5 text-primary-400 border-slate-300 rounded focus:ring-primary-400"
                />
                <label htmlFor="hasPhotos" className="text-slate-700 cursor-pointer">
                  Fotoğraf eklemek istiyorum
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={loading}
              className="px-6 py-3 border-2 border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              Geri
            </button>
            <button
              onClick={() => {
                if (currentStep === 1) handleStep1Next();
                else if (currentStep === 2) handleStep2Next();
                else if (currentStep === 3) handleStep3Next();
                else if (currentStep === 4) handleStep4Next();
                else if (currentStep === 5) handleStep5Complete();
              }}
              disabled={loading}
              className="relative px-6 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {loading && currentStep === 5 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
                  <div 
                    className="h-full bg-white/60 absolute"
                    style={{
                      width: '30%',
                      animation: 'loading-slide 1.5s ease-in-out infinite',
                      transform: 'translateX(-100%)'
                    }}
                  ></div>
                </div>
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading && currentStep === 5 ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Öneriler hazırlanıyor...</span>
                  </>
                ) : (
                  currentStep === 5 ? 'Tamamla' : 'İleri'
                )}
              </span>
              {loading && currentStep === 5 && (
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes loading-slide {
                      0% {
                        transform: translateX(-100%);
                      }
                      100% {
                        transform: translateX(400%);
                      }
                    }
                  `
                }} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGiftWizardContainer;

