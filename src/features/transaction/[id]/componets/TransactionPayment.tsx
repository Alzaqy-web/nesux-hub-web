"use client";
import { Button } from "@/components/ui/button"; // Asumsi menggunakan komponen Button dari shadcn/ui
// Input tidak digunakan di TransactionDetail ini, bisa dihapus jika tidak ada form input
// import { Input } from "@/components/ui/input";

// Import untuk icons
import { CreditCard, Banknote, CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";

interface DummyTransaction {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  totalPrice: number;
  status: string; // Contoh: 'PENDING', 'PAID', 'FAILED', 'EXPIRED', 'CANCELLED'
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  events: {
    title: string;
    slug: string;
    thumbnail: string;
    startDate: string;
    endDate: string;
    location?: string;
  };
  transactionTickets: Array<{
    id: number;
    transactionId: number;
    ticketId: number;
    quantity: number;
    price: number;
    ticketName?: string; // Menambahkan ini untuk menampilkan nama tiket di UI
  }>;
  payments?: {
    id: number;
    transactionId: number;
    method: string;
    reference: string;
    paidAt: string | null;
    amountPaid: number;
    proofUrl: string;
  };
}

const TransactionDetail = () => {
  // Data dummy transaksi untuk keperluan tampilan.
  // Anda bisa mengubah status atau data lainnya di sini untuk menguji tampilan yang berbeda.
  const transaction: DummyTransaction = {
    id: 123456789,
    userId: 1,
    eventId: 789,
    quantity: 1, // Total kuantitas tiket yang dibeli
    totalPrice: 800000, // Total harga dari semua tiket yang dibeli
    status: "PENDING", // Ganti ke 'PAID' untuk melihat tampilan status dibayar, 'EXPIRED', 'CANCELLED'
    expiresAt: "2025-07-22T10:00:00.000Z", // Waktu kedaluwarsa pesanan (UTC)
    createdAt: "2025-07-22T08:00:00.000Z",
    updatedAt: "2025-07-22T08:05:00.000Z",
    events: {
      title: "PLAYOFF IBL GOPAY 2025 : TANGERANG HAWKS VS PELITA JAYA",
      slug: "playoff-ibl-gopay-2025",
      thumbnail:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder gambar
      startDate: "2025-03-31T19:00:00.000Z",
      endDate: "2025-04-01T23:00:00.000Z",
      location: "Surabaya",
    },
    transactionTickets: [
      {
        id: 101,
        transactionId: 123456789,
        ticketId: 1,
        quantity: 1,
        price: 800000,
        ticketName: "COURTSIDE A",
      },
      // Contoh jika ada tiket jenis lain:
      // {
      //   id: 102,
      //   transactionId: 123456789,
      //   ticketId: 2,
      //   quantity: 1,
      //   price: 250000,
      //   ticketName: "REGULAR",
      // }
    ],
    payments: {
      id: 201,
      transactionId: 123456789,
      method: "Direct Transfer", // 'Payment Gateway' atau 'Direct Transfer'
      reference: "TRX-PG-XYZ123",
      paidAt: null, // Atur ke string tanggal jika status 'PAID', e.g., "2025-07-22T09:30:00.000Z"
      amountPaid: 0, // Atur ke transaction.totalPrice jika status 'PAID', e.g., 800000
      proofUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Proof",
    },
  };

  // Helper function untuk memformat tanggal dan waktu ke locale Indonesia.
  const formatDate = (dateString: string, includeTime = true) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    if (includeTime) {
      options.hour = "2-digit";
      options.minute = "2-digit";
    }
    return new Date(dateString).toLocaleString("id-ID", options);
  };

  // Helper function untuk mendapatkan class CSS warna teks berdasarkan status transaksi.
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "PAID":
        return "text-green-500";
      case "PENDING":
        return "text-yellow-500";
      case "FAILED":
      case "EXPIRED":
      case "CANCELLED":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  // Logika sederhana untuk menentukan apakah pembayaran bisa dilakukan
  const canMakePayment = transaction.status === "PENDING";
  const isPaid = transaction.status === "PAID";
  const isExpiredOrCancelled =
    transaction.status === "EXPIRED" ||
    transaction.status === "CANCELLED" ||
    transaction.status === "FAILED";

  return (
    <div className="border] mx-auto my-8 max-w-6xl rounded-lg p-8 text-white shadow-2xl">
      {/* Timer dan status kedaluwarsa */}
      {/* {transaction.expiresAt && canMakePayment && (
        <div className="mb- 6 flex items-center justify-end rounded-md bg-gray-800 p-3 font-semibold text-red-400">
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Pesanan Anda akan kadaluwarsa pada:{" "}
          <span className="ml-1">{formatDate(transaction.expiresAt)} WITA</span>
        </div>
      )} */}

      {/* Kontainer utama untuk layout 2 kolom */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Kolom Kiri: Informasi Event dan Tiket yang Dibeli */}
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold text-white">
            Detail Transaksi
          </h1>
          <div className="border-b border-gray-700 pb-4">
            <p className="text-sm font-medium text-gray-400">
              ID Transaksi:{" "}
              <span className="text-blue-400">{transaction.id}</span>
            </p>
            <p className="text-sm font-medium text-gray-400">
              Status:{" "}
              <span
                className={`font-semibold ${getStatusColorClass(transaction.status)}`}
              >
                {transaction.status}
              </span>
            </p>
            <p className="text-sm text-gray-400">
              Dibuat pada: {formatDate(transaction.createdAt)} WITA
            </p>
          </div>

          {/* Event Details Card */}
          <div className="rounded-lg border border-gray-800 p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-white">Detail Event</h2>
            {/* Thumbnail Event */}
            {transaction.events.thumbnail && (
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg object-cover">
                <Image
                  src={transaction.events.thumbnail}
                  alt={transaction.events.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            )}
            {/* Detail Event Tekstual */}
            <h3 className="mb-2 text-xl font-bold text-white">
              {transaction.events.title}
            </h3>
            <div className="mb-1 flex items-center text-sm text-gray-300">
              <MapPin className="mr-2 h-4 w-4 text-gray-400" />
              <span>{transaction.events.location || "Online Event"}</span>
            </div>
            <div className="mb-1 flex items-center text-sm text-gray-300">
              <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
              <span>
                {formatDate(transaction.events.startDate, false)} -{" "}
                {formatDate(transaction.events.endDate, false)}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
              <span>
                {new Date(transaction.events.startDate).toLocaleTimeString(
                  "id-ID",
                  { hour: "2-digit", minute: "2-digit" },
                )}{" "}
                -{" "}
                {new Date(transaction.events.endDate).toLocaleTimeString(
                  "id-ID",
                  { hour: "2-digit", minute: "2-digit" },
                )}{" "}
                WITA
              </span>
            </div>
          </div>

          {/* Bagian Tiket yang Dibeli */}
          <div className="rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-lg">
            <h3 className="mb-4 text-2xl font-bold text-white">Tiket Anda</h3>
            {transaction.transactionTickets.length > 0 ? (
              <div className="space-y-4">
                {transaction.transactionTickets.map((ticket, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border border-gray-700 bg-gray-900 p-4"
                  >
                    <div>
                      <div className="text-lg font-medium text-white">
                        {ticket.ticketName || `Ticket ID: ${ticket.ticketId}`}
                      </div>
                      <div className="text-sm text-gray-400">
                        {ticket.quantity} tiket
                      </div>
                    </div>
                    <div className="font-semibold text-white">
                      Rp{" "}
                      {(ticket.quantity * ticket.price).toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                Tidak ada detail tiket untuk transaksi ini.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;

{
  /* Kolom Kanan: Ringkasan Pembayaran & Aksi */
}
