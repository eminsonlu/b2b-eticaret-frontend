export interface IVariantValue {
  id: string;
  title: string;
  value: string;
  variantId: string;
  createdAt: string;
  updatedAt: string;
}

export default interface IVariant {
  id: string;
  title: string;
  type: 'SELECT' | 'BUTTON' | 'COLOR';
  createdAt: string;
  updatedAt: string;
  variantValues: IVariantValue[];
}
