import axios from './baseService';
import Axios from 'axios';
import {
  WizardOptions,
  WizardStep1Data,
  WizardStep2Data,
  WizardStep3Data,
  WizardStep4Data,
  WizardStep5Data,
  GiftRecommendationRequest,
  GiftRecommendationResponse,
  GenerateMessageRequest,
  GenerateMessageResponse,
} from '@/types/IAIGiftAssistant';

// Wizard step'ler için özel axios instance (localhost:3001 kullanır, /api prefix'i yok)
const wizardAxios = Axios.create({
  baseURL: 'http://localhost:3001',
});

// Token interceptor ekle
wizardAxios.interceptors.request.use(
  async (config) => {
    let token: string | undefined = '';

    // server
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      token = cookieStore.get('token')?.value;
    } else {
      // client
      token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getWizardOptions = async (): Promise<[any, WizardOptions | null]> => {
  try {
    const response = await axios.get('/ai-gift-assistant/wizard-options');
    console.log('Wizard options API response:', response.data);
    // Handle different response structures
    const data = response.data?.data || response.data;
    return [null, data];
  } catch (error: any) {
    console.error('Error fetching wizard options:', error);
    return [error?.response?.data || error, null];
  }
};

// Relationship değerlerini backend'in beklediği target formatına map et
const mapRelationshipToTarget = (relationship: string): string => {
  const mapping: Record<string, string> = {
    'Sevgili': 'lover',
    'Aile': 'family',
    'Eş': 'family',
    'Anneler Günü': 'mother',
    'Babalar Günü': 'father',
    'Çocuk': 'child',
    'Arkadaş': 'friend',
    'İş Arkadaşı': 'corporate',
    'Komşu': 'friend',
    'Akraba': 'family',
  };
  
  // Önce tam eşleşme kontrol et
  if (mapping[relationship]) {
    return mapping[relationship];
  }
  
  // Sonra case-insensitive kontrol et
  const lowerRelationship = relationship.toLowerCase().trim();
  for (const [key, value] of Object.entries(mapping)) {
    if (key.toLowerCase() === lowerRelationship || value === lowerRelationship) {
      return value;
    }
  }
  
  // Eğer zaten backend formatında ise (lover, family, vb.) direkt döndür
  const backendFormats = ['lover', 'family', 'mother', 'father', 'child', 'friend', 'corporate'];
  if (backendFormats.includes(lowerRelationship)) {
    return lowerRelationship;
  }
  
  // Varsayılan olarak family döndür
  console.warn('Unknown relationship value:', relationship, 'defaulting to family');
  return 'family';
};

// Occasion değerlerini backend'in beklediği formatına map et
const mapOccasion = (occasion: string): string => {
  const mapping: Record<string, string> = {
    'Yeni Yıl': 'new_year',
    'Yeni yıl': 'new_year',
    'Düğün': 'wedding',
    'Doğum': 'birth',
    'Sevgililer Günü': 'valentines',
    'Sevgililer günü': 'valentines',
    'Doğum Günü': 'birthday',
    'Doğum günü': 'birthday',
    'Sürpriz': 'surprise',
    'Nişan': 'wedding',
    'Yeni Ev': 'surprise',
    'Yeni ev': 'surprise',
    'Mezuniyet': 'surprise',
    'Yıldönümü': 'surprise',
    'Anneler Günü': 'surprise',
    'Babalar Günü': 'surprise',
  };
  
  // Önce tam eşleşme kontrol et
  if (mapping[occasion]) {
    return mapping[occasion];
  }
  
  // Sonra case-insensitive kontrol et
  const lowerOccasion = occasion.toLowerCase().trim();
  for (const [key, value] of Object.entries(mapping)) {
    if (key.toLowerCase() === lowerOccasion || value === lowerOccasion) {
      return value;
    }
  }
  
  // Eğer zaten backend formatında ise (new_year, wedding, vb.) direkt döndür
  const backendFormats = ['new_year', 'wedding', 'birth', 'valentines', 'birthday', 'surprise'];
  if (backendFormats.includes(lowerOccasion)) {
    return lowerOccasion;
  }
  
  // Varsayılan olarak surprise döndür
  console.warn('Unknown occasion value:', occasion, 'defaulting to surprise');
  return 'surprise';
};

// Budget değerlerini backend'in beklediği formatına map et
const mapBudget = (budget: string): string => {
  const mapping: Record<string, string> = {
    '0-100 TL': '500-1000',
    '100-250 TL': '500-1000',
    '250-500 TL': '500-1000',
    '500-1000 TL': '500-1000',
    '1000+ TL': '1000-2000',
    '1000-2000 TL': '1000-2000',
    '2000+ TL': '2000+',
  };
  
  // Eğer mapping'de varsa döndür
  if (mapping[budget]) {
    return mapping[budget];
  }
  
  // Eğer "any" veya benzeri bir değer ise
  if (budget.toLowerCase().includes('any') || budget.toLowerCase().includes('herhangi')) {
    return 'any';
  }
  
  // Varsayılan olarak budget'ı döndür
  return budget;
};

// Emotion style değerlerini backend'in beklediği formatına map et
const mapEmotionStyle = (emotion: string): string => {
  const mapping: Record<string, string> = {
    'Duygusal': 'emotional',
    'Eğlenceli': 'fun',
    'Zarif': 'elegant',
    'Sevimli': 'cute',
    'Yeni Yıl Ruhu': 'new_year_spirit',
  };
  
  const lowerEmotion = emotion.toLowerCase();
  for (const [key, value] of Object.entries(mapping)) {
    if (key.toLowerCase() === lowerEmotion || value === lowerEmotion) {
      return value;
    }
  }
  
  return emotion.toLowerCase().replace(/\s+/g, '_');
};

export const submitWizardStep1 = async (data: WizardStep1Data, wizardData?: any): Promise<[any, any]> => {
  try {
    console.log('submitWizardStep1', data);
    // Step1: { target: GiftTarget }
    const requestData = {
      target: mapRelationshipToTarget(data.relationship),
    };
    console.log('Mapped request data:', requestData);
    const response = await wizardAxios.post('/ai-gift-assistant/wizard/step1', requestData);
    return [null, response.data];
  } catch (error: any) {
    console.error('Error submitting wizard step 1:', error);
    console.error('Full URL attempted:', error?.config?.baseURL + error?.config?.url);
    console.error('Request data:', data);
    return [error?.response?.data || error, null];
  }
};

// Age group değerlerini backend'in beklediği formatına map et
const mapAgeGroup = (ageGroup: string): string | number => {
  // Backend muhtemelen sayı veya farklı format bekliyor
  // Örnek: "0-5" -> 3, "6-12" -> 9, "13-17" -> 15, "18-25" -> 21, vb.
  const ageMap: Record<string, number> = {
    '0-5': 3,
    '6-12': 9,
    '13-17': 15,
    '18-25': 21,
    '26-35': 30,
    '36-50': 43,
    '50+': 60,
  };
  
  if (ageMap[ageGroup]) {
    return ageMap[ageGroup];
  }
  
  // Eğer sayı formatında ise direkt döndür
  const num = parseInt(ageGroup);
  if (!isNaN(num)) {
    return num;
  }
  
  return ageGroup;
};

// Gender değerlerini backend'in beklediği formatına map et
const mapGender = (gender?: string): string | undefined => {
  if (!gender) return undefined;
  
  const genderMap: Record<string, string | undefined> = {
    'Erkek': 'male',
    'Kadın': 'female',
    'Diğer': 'other',
    'Belirtmek istemiyorum': undefined,
  };
  
  const lowerGender = gender.toLowerCase();
  for (const [key, value] of Object.entries(genderMap)) {
    if (key.toLowerCase() === lowerGender) {
      return value;
    }
  }
  
  return gender.toLowerCase();
};

export const submitWizardStep2 = async (data: WizardStep2Data, wizardData?: any): Promise<[any, any]> => {
  try {
    console.log('submitWizardStep2', data, 'wizardData:', wizardData);
    // Step2: { target: GiftTarget, occasion?: Occasion }
    // wizardData'da raw değerler var, mapping yapmalıyız
    const relationship = wizardData?.relationship || wizardData?.target || '';
    const occasion = wizardData?.occasion || '';
    
    const requestData: any = {
      target: mapRelationshipToTarget(relationship),
    };
    
    // Occasion varsa ekle ve map et
    if (occasion) {
      requestData.occasion = mapOccasion(occasion);
    }
    
    console.log('Mapped request data:', requestData);
    console.log('Original values - relationship:', relationship, 'occasion:', occasion);
    const response = await wizardAxios.post('/ai-gift-assistant/wizard/step2', requestData);
    return [null, response.data];
  } catch (error: any) {
    console.error('Error submitting wizard step 2:', error);
    console.error('Full URL attempted:', error?.config?.baseURL + error?.config?.url);
    console.error('Request data sent:', error?.config?.data);
    console.error('Error response:', error?.response?.data);
    return [error?.response?.data || error, null];
  }
};

export const submitWizardStep3 = async (data: WizardStep3Data, wizardData?: any): Promise<[any, any]> => {
  try {
    console.log('submitWizardStep3', data, 'wizardData:', wizardData);
    // Step3: { target: GiftTarget, occasion?: Occasion, budget: BudgetRange }
    // wizardData'da raw değerler var, mapping yapmalıyız
    const relationship = wizardData?.relationship || wizardData?.target || '';
    const occasion = wizardData?.occasion || '';
    
    const requestData: any = {
      target: mapRelationshipToTarget(relationship),
    };
    
    // Occasion varsa ekle ve map et
    if (occasion) {
      requestData.occasion = mapOccasion(occasion);
    }
    
    requestData.budget = mapBudget(data.budget || wizardData?.budget || 'any');
    
    console.log('Mapped request data:', requestData);
    console.log('Original values - relationship:', relationship, 'occasion:', occasion, 'budget:', data.budget);
    const response = await wizardAxios.post('/ai-gift-assistant/wizard/step3', requestData);
    return [null, response.data];
  } catch (error: any) {
    console.error('Error submitting wizard step 3:', error);
    console.error('Full URL attempted:', error?.config?.baseURL + error?.config?.url);
    console.error('Request data sent:', error?.config?.data);
    console.error('Error response:', error?.response?.data);
    return [error?.response?.data || error, null];
  }
};

export const submitWizardStep4 = async (data: WizardStep4Data, wizardData?: any): Promise<[any, any]> => {
  try {
    console.log('submitWizardStep4', data, 'wizardData:', wizardData);
    // Step4: { target: GiftTarget, occasion?: Occasion, budget: BudgetRange, emotion: EmotionStyle }
    // wizardData'da raw değerler var, mapping yapmalıyız
    const relationship = wizardData?.relationship || wizardData?.target || '';
    const occasion = wizardData?.occasion || '';
    
    const requestData: any = {
      target: mapRelationshipToTarget(relationship),
    };
    
    // Occasion varsa ekle ve map et
    if (occasion) {
      requestData.occasion = mapOccasion(occasion);
    }
    
    requestData.budget = mapBudget(data.budget || wizardData?.budget || 'any');
    
    // Emotion style'ı data'dan veya wizardData'dan al
    const emotion = data.emotion || wizardData?.emotion || 'emotional';
    requestData.emotion = mapEmotionStyle(emotion);
    
    console.log('Mapped request data:', requestData);
    console.log('Original values - relationship:', relationship, 'occasion:', occasion, 'budget:', data.budget, 'emotion:', emotion);
    const response = await wizardAxios.post('/ai-gift-assistant/wizard/step4', requestData);
    return [null, response.data];
  } catch (error: any) {
    console.error('Error submitting wizard step 4:', error);
    console.error('Full URL attempted:', error?.config?.baseURL + error?.config?.url);
    console.error('Status code:', error?.response?.status);
    console.error('Response data:', error?.response?.data);
    return [error?.response?.data || error, null];
  }
};

export const submitWizardStep5 = async (data: WizardStep5Data, wizardData?: any): Promise<[any, any]> => {
  try {
    console.log('submitWizardStep5', data, 'wizardData:', wizardData);
    // Step5: { target: GiftTarget, occasion?: Occasion, budget: BudgetRange, emotion: EmotionStyle, hasPhotos: boolean, photos?: string[] }
    // wizardData'da raw değerler var, mapping yapmalıyız
    const relationship = wizardData?.relationship || wizardData?.target || '';
    const occasion = wizardData?.occasion || '';
    
    const requestData: any = {
      target: mapRelationshipToTarget(relationship),
    };
    
    // Occasion varsa ekle ve map et
    if (occasion) {
      requestData.occasion = mapOccasion(occasion);
    }
    
    requestData.budget = mapBudget(wizardData?.budget || 'any');
    
    const emotion = wizardData?.emotion || 'emotional';
    requestData.emotion = mapEmotionStyle(emotion);
    
    requestData.hasPhotos = data.hasPhotos || false;
    
    if (data.photos && data.photos.length > 0) {
      requestData.photos = data.photos;
    }
    
    console.log('Mapped request data:', requestData);
    console.log('Original values - relationship:', relationship, 'occasion:', occasion, 'budget:', wizardData?.budget, 'emotion:', emotion);
    const response = await wizardAxios.post('/ai-gift-assistant/wizard/step5', requestData);
    return [null, response.data];
  } catch (error: any) {
    console.error('Error submitting wizard step 5:', error);
    console.error('Full URL attempted:', error?.config?.baseURL + error?.config?.url);
    console.error('Request data sent:', error?.config?.data);
    console.error('Error response:', error?.response?.data);
    return [error?.response?.data || error, null];
  }
};

export const getGiftRecommendations = async (
  request: GiftRecommendationRequest
): Promise<[any, GiftRecommendationResponse | null]> => {
  try {
    // Backend formatına göre request'i map et
    const requestData: any = {
      target: mapRelationshipToTarget(request.relationship || ''),
    };
    
    if (request.occasion) {
      requestData.occasion = mapOccasion(request.occasion);
    }
    
    requestData.budget = mapBudget(request.budget || 'any');
    
    if (request.emotion) {
      requestData.emotion = mapEmotionStyle(request.emotion);
    } else {
      requestData.emotion = 'emotional';
    }
    
    requestData.hasPhotos = request.hasPhotos || false;
    
    if (request.photos && request.photos.length > 0) {
      requestData.photos = request.photos;
    }
    
    // Backend data parametresi bekliyor, JSON string olarak gönder
    const response = await wizardAxios.get('/ai-gift-assistant/recommendations', {
      params: {
        data: JSON.stringify(requestData),
      },
    });
    return [null, response.data];
  } catch (error: any) {
    console.error('Error getting gift recommendations:', error);
    return [error?.response?.data || error, null];
  }
};

export const generateMessage = async (
  request: GenerateMessageRequest
): Promise<[any, GenerateMessageResponse | null]> => {
  try {
    const response = await axios.post('/ai-gift-assistant/generate-message', request);
    return [null, response.data];
  } catch (error: any) {
    console.error('Error generating message:', error);
    return [error?.response?.data || error, null];
  }
};

