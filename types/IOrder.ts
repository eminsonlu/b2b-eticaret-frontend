import IUser from './IUser';

export interface IOrderItem {
  id: string;
  title: string;
  price: number;
  fields: string[];
  attachmentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: string;
  items: IOrderItem[];
  total: number;
  shippingCost: number;
  paymentMethod: 'BANK_TRANSFER' | 'CREDIT_CARD';
  status:
    | 'PENDING'
    | 'AWAITING_USER_ACTION'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'COMPLETED';
  paymentStatus: 'PENDING' | 'PAID' | 'CANCELED' | 'FAILED';
  address: string;
  bankAccount: string;
  notes: string;
  userId: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
