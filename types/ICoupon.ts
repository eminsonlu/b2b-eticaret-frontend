export interface ICoupon {
  id: string;
  code: string;
  quantity: number;
  type: string;
  value: number;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
