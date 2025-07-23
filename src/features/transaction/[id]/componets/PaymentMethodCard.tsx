"use client"; // Diperlukan jika menggunakan onClick handlers atau state internal

import React from "react";
import { Button } from "@/components/ui/button"; // Asumsi path shadcn/ui
import Image from "next/image";
import { CreditCard, Banknote } from "lucide-react";

interface PaymentMethodCardProps {
  payments?: {
    id: number;
    transactionId: number;
    method: string;
    reference: string;
    paidAt: string | null;
    amountPaid: number;
    proofUrl: string;
  };
  isPaid: boolean;
  canMakePayment: boolean;
  isExpiredOrCancelled: boolean;
  formatDate: (dateString: string, includeTime?: boolean) => string;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  payments,
  isPaid,
  canMakePayment,
  isExpiredOrCancelled,
  formatDate,
}) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-white">Metode Pembayaran</h3>
      {payments && (
        <div className="mb-4 text-gray-300">
          <p>
            Metode: <span className="font-semibold">{payments.method}</span>
          </p>
          {payments.reference && (
            <p>
              Referensi:{" "}
              <span className="font-semibold">{payments.reference}</span>
            </p>
          )}
          {isPaid && payments.paidAt && (
            <p>
              Dibayar pada:{" "}
              <span className="font-semibold">
                {formatDate(payments.paidAt)} WITA
              </span>
            </p>
          )}
          {isPaid && payments.amountPaid > 0 && (
            <p>
              Jumlah Dibayar:{" "}
              <span className="font-semibold">
                Rp {payments.amountPaid.toLocaleString("id-ID")}
              </span>
            </p>
          )}
          {isPaid && payments.proofUrl && (
            <div className="mt-4">
              <p className="mb-2">Bukti Pembayaran:</p>
              <Image
                src={payments.proofUrl}
                alt="Bukti Pembayaran"
                width={200}
                height={150}
                className="rounded-md border border-gray-700"
              />
            </div>
          )}
        </div>
      )}

      {canMakePayment && (
        <div className="mt-6 space-y-4">
          <Button
            variant="outline"
            className="h-auto w-full justify-start border-gray-700 bg-gray-700 py-4 text-lg text-white hover:bg-gray-600"
            onClick={() =>
              alert("Simulasi: Melakukan Pembayaran via Payment Gateway")
            }
          >
            <span className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-gray-300" />
              Bayar via Payment Gateway
            </span>
          </Button>
          <Button
            variant="outline"
            className="h-auto w-full justify-start border-gray-700 bg-gray-700 py-4 text-lg text-white hover:bg-gray-600"
            onClick={() => alert("Simulasi: Unggah Bukti Transfer Bank")}
          >
            <span className="flex items-center gap-2">
              <Banknote className="h-6 w-6 text-gray-300" />
              Transfer Bank / Unggah Bukti
            </span>
          </Button>
        </div>
      )}

      {isPaid && (
        <div className="mt-6 text-center text-lg font-bold text-green-400">
          Pembayaran Berhasil!
        </div>
      )}

      {isExpiredOrCancelled && (
        <div className="mt-6 text-center text-lg font-bold text-red-400">
          Transaksi{" "}
          {isExpiredOrCancelled
            ? payments?.method === "Direct Transfer"
              ? "Kadaluwarsa"
              : "Gagal" // Simplified logic for expired/failed based on method
            : "Gagal"}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;
