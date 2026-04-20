export interface ISlider {
  id: string;
  title: string;
  key: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sliderItems: ISliderItem[];
}

export interface ISliderItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sliderId: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
