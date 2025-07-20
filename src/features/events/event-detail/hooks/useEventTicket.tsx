// src/app/events/[slug]/hooks/useEventTicket.ts
import { useState, useEffect } from "react";
import { Event, Ticket } from "@/types/event";

interface UseEventTicketResult {
  selectedTickets: { [key: number]: number };
  totalPrice: number;
  isAnyTicketSelected: boolean;
  handleTicketQuantityChange: (ticketId: number, quantity: number) => void;
  handleCheckout: () => void;
}

const useEventTicket = (event: Event): UseEventTicketResult => {
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: number]: number;
  }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isAnyTicketSelected, setIsAnyTicketSelected] =
    useState<boolean>(false);

  // Inisialisasi selectedTickets saat komponen dimuat atau event berubah
  useEffect(() => {
    const initialSelection: { [key: number]: number } = {};
    event.tickets?.forEach((ticket) => {
      initialSelection[ticket.id] = 0;
    });
    setSelectedTickets(initialSelection);
    setTotalPrice(0);
    setIsAnyTicketSelected(false);
  }, [event.tickets]);

  // Hitung ulang total harga dan status pemilihan tiket
  useEffect(() => {
    let calculatedPrice = 0;
    let anySelected = false;
    event.tickets?.forEach((ticket) => {
      const quantity = selectedTickets[ticket.id] || 0;
      if (quantity > 0) {
        anySelected = true;
      }
      calculatedPrice += ticket.price * quantity;
    });
    setTotalPrice(calculatedPrice);
    setIsAnyTicketSelected(anySelected);
  }, [selectedTickets, event.tickets]);

  // Handler untuk perubahan jumlah tiket
  const handleTicketQuantityChange = (ticketId: number, quantity: number) => {
    const ticket = event.tickets?.find((t) => t.id === ticketId);
    if (!ticket) return;

    let finalQuantity = quantity;
    if (finalQuantity < 0) finalQuantity = 0;

    // Batasi kuantitas (hanya berdasarkan availableSeats, karena semua dianggap paid)
    if (ticket.availableSeats !== -1) {
      // Hapus cek type.toLowerCase() !== 'free'
      if (finalQuantity > ticket.availableSeats) {
        finalQuantity = ticket.availableSeats;
      }
    }

    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: finalQuantity,
    }));
  };

  const handleCheckout = () => {
    console.log(
      "Melakukan checkout dengan tiket:",
      selectedTickets,
      "Total Harga:",
      totalPrice,
    );
    alert(
      `Anda akan melakukan checkout untuk event ${event.title} dengan total harga: Rp ${totalPrice.toLocaleString(
        "id-ID",
      )}`,
    );
  };

  return {
    selectedTickets,
    totalPrice,
    isAnyTicketSelected,
    handleTicketQuantityChange,
    handleCheckout,
  };
};

export default useEventTicket;
