import { Event } from "./event";

export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  totalPrice: number;
  status: string;
  expiresAt: Date;
  createdAt: Date;

  events?: Event;
}
