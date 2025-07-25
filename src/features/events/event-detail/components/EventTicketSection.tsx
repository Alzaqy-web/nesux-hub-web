// src/app/events/[eventId]/components/EventTicketSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEventTicket from "../hooks/useEventTicket"; // Pastikan path ini benar!
import { Event } from "@/types/event"; // Pastikan ini diimpor dan definisinya cocok

interface EventTicketSectionProps {
  event: Event;
}

const EventTicketSection = ({ event }: EventTicketSectionProps) => {
  const {
    selectedTickets,
    totalPrice,
    isAnyTicketSelected,
    isCreatingTransaction,
    handleTicketQuantityChange,
    handleCheckout,
  } = useEventTicket(event);

  return (
    <div className="rounded-lg border p-4 shadow-lg">
      {/* Bagian Pilih Tiket */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Pilih Tiket</h3>
        {!event.tickets || event.tickets.length === 0 ? (
          <p className="text-gray-500">
            Tidak ada tiket tersedia untuk event ini.
          </p>
        ) : (
          event.tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between gap-4 rounded-md border p-3"
            >
              <div>
                <div className="text-base font-semibold">{ticket.name}</div>
                <div className="text-sm">
                  {`Rp ${ticket.price.toLocaleString("id-ID")}`}
                  {ticket.availableSeats !== -1 && (
                    <span className="ml-1 text-xs text-gray-600">
                      ({ticket.availableSeats} tersedia)
                    </span>
                  )}
                  {ticket.availableSeats === 0 && (
                    <span className="ml-1 text-xs font-medium text-red-500">
                      (Sold Out)
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor={`qty-${ticket.id}`} className="sr-only">
                  Jumlah {ticket.name}
                </label>
                <Input
                  id={`qty-${ticket.id}`}
                  type="number"
                  min={0}
                  max={
                    ticket.availableSeats !== -1
                      ? ticket.availableSeats
                      : undefined
                  }
                  value={selectedTickets[ticket.id] || 0}
                  className="w-16 rounded-md border p-1 text-center text-sm"
                  onChange={(e) =>
                    handleTicketQuantityChange(
                      ticket.id,
                      parseInt(e.target.value),
                    )
                  }
                  disabled={
                    ticket.availableSeats === 0 || isCreatingTransaction
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ringkasan Pesanan dan Checkout */}
      <div className="mt-4 border-t pt-4">
        <h3 className="mb-3 text-lg font-semibold">Ringkasan Pesanan</h3>
        {!isAnyTicketSelected && (
          <p className="mb-2 text-sm text-red-500">
            Anda belum memilih tiket apapun.
          </p>
        )}
        <div className="flex items-center justify-between text-xl font-bold">
          <span>Total Harga:</span>
          <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
        </div>
        <Button
          className="mt-4 w-full py-3 text-lg"
          onClick={handleCheckout}
          disabled={
            !isAnyTicketSelected || totalPrice === 0 || isCreatingTransaction
          }
        >
          {isCreatingTransaction ? "Processing..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default EventTicketSection;
