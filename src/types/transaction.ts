import { User } from "./user";

export enum TransactionStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}

export interface EventForTransaction {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  startDate: Date;
  endDate: Date;
}

export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  totalPrice: number;
  status: TransactionStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  event: EventForTransaction;
  // payments?: Payment;

  user?: Omit<User, "password">;
}

export interface CreateTransactionPayload {
  eventId: number;
  quantity: number;
}
