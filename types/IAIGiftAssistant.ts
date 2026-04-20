export interface WizardOptions {
  occasions: string[];
  relationships: string[];
  ageGroups: string[];
  interests: string[];
  budgets: string[];
}

export interface WizardStep1Data {
  occasion: string;
  relationship: string;
}

export interface WizardStep2Data {
  ageGroup: string;
  gender?: string;
}

export interface WizardStep3Data {
  interests: string[];
  budget?: string; // Step3'te budget da var
}

export interface WizardStep4Data {
  budget: string;
  emotion?: string; // Step4'te emotion var
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface WizardStep5Data {
  additionalInfo?: string;
  preferences?: string[];
  hasPhotos?: boolean; // Step5'te hasPhotos var
  photos?: string[]; // Step5'te photos var
}

export interface GiftRecommendation {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  images: string[];
  slug: string;
  category: string;
  reason: string;
  matchScore: number;
}

export interface GiftRecommendationRequest {
  occasion?: string;
  relationship: string;
  ageGroup?: string;
  gender?: string;
  interests?: string[];
  budget: string;
  emotion?: string;
  hasPhotos?: boolean;
  photos?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  additionalInfo?: string;
  preferences?: string[];
}

export interface GiftRecommendationResponse {
  mainProduct: {
    id: string;
    title: string;
    slug: string;
    price: number;
    discountPrice?: number;
    thumbnail: string;
    summary: string;
    reason: string;
  };
  bundle: any[];
  totalPrice: number;
  theme: string;
  message: string;
  explanation: string;
}

export interface GenerateMessageRequest {
  giftId: string;
  recipientName?: string;
  senderName?: string;
  occasion?: string;
  personalMessage?: string;
}

export interface GenerateMessageResponse {
  message: string;
  suggestions?: string[];
}

