// Pastikan Event, User, dll. sudah didefinisikan di file tipe masing-masing.
// Contoh: types/event.ts
export interface Event {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  location: string;
  // ... properti event lainnya
}

export enum TransactionStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED", // Perbaikan typo dari CANCELED menjadi CANCELLED
}

export interface TransactionTicket {
  id: number;
  transactionId: number;
  ticketId: number;
  quantity: number;
  price: number;
  ticket: {
    // Ini adalah bagian yang paling penting, sesuaikan dengan hasil `include` dari backend
    name: string; // Ini akan menjadi 'ticketName' di frontend
    // price: number; // Jika Anda juga mengambil harga tiket dari master Ticket
  };
}

export interface Payment {
  id: number;
  transactionId: number;
  method: string;
  reference: string;
  paidAt: string | null; // Bisa null jika belum dibayar
  amountPaid: number;
  updatedAt: string;
  createdAt: string;
  proofUrl: string | null;
}

export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  totalPrice: number;
  status: TransactionStatus;
  expiresAt: string; // Date string
  createdAt: string; // Date string
  updatedAt: string; // Date string
  transactionTickets: TransactionTicket[];
  events: {
    // Sesuaikan dengan select di backend
    title: string;
    slug: string;
    thumbnail: string;
    startDate: string; // Date string
    endDate: string; // Date string
    location: string;
  };
  payments: Payment | null; // Bisa null jika belum ada pembayaran atau pembayaran gagal
}

// Untuk payload CreateTransaction
export interface CreateTransactionPayload {
  eventId: number;
  tickets: { ticketId: number; quantity: number }[];
}
