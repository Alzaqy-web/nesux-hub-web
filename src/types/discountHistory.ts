export interface DiscountHistory {
  id: number;
  userId: number;
  discount: number;
  used: true | false;
  createdAt: string;
  expiresAt: string;
}
