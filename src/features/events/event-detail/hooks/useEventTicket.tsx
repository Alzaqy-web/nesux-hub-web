// src/app/events/[eventId]/hooks/useEventTicket.ts
"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event"; // Pastikan path ini benar!
import useCreateTransaction from "@/features/transaction/[id]/api/useCreateTransaction"; // Import hook transaksi

interface SelectedTicketsState {
  [ticketId: number]: number; // Key: ticketId, Value: quantity
}

const useEventTicket = (event: Event) => {
  const router = useRouter();
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicketsState>(
    {},
  );

  const {
    mutate: createTransaction,
    isPending: isCreatingTransaction,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
  } = useCreateTransaction();

  const totalPrice = useMemo(() => {
    let total = 0;
    if (event.tickets) {
      for (const ticket of event.tickets) {
        const quantity = selectedTickets[ticket.id] || 0;
        total += ticket.price * quantity;
      }
    }
    return total;
  }, [selectedTickets, event.tickets]);

  const isAnyTicketSelected = useMemo(() => {
    return Object.values(selectedTickets).some((qty) => qty > 0);
  }, [selectedTickets]);

  const handleTicketQuantityChange = useCallback(
    (ticketId: number, quantity: number) => {
      const newQuantity = Math.max(0, quantity);
      const ticket = event.tickets?.find((t) => t.id === ticketId);

      if (ticket) {
        if (
          ticket.availableSeats !== -1 &&
          newQuantity > ticket.availableSeats
        ) {
          setSelectedTickets((prev) => ({
            ...prev,
            [ticketId]: ticket.availableSeats,
          }));
          return;
        }
      }

      setSelectedTickets((prev) => {
        if (newQuantity === 0) {
          const newState = { ...prev };
          delete newState[ticketId];
          return newState;
        }
        return {
          ...prev,
          [ticketId]: newQuantity,
        };
      });
    },
    [event.tickets],
  );

  const handleCheckout = useCallback(() => {
    if (!event || event.id === undefined) {
      console.error("Event object or event ID is missing for checkout.");
      return;
    }

    const ticketsPayload = Object.entries(selectedTickets)
      .filter(([, quantity]) => quantity > 0)
      .map(([ticketId, quantity]) => ({
        ticketId: parseInt(ticketId),
        quantity: quantity,
      }));

    if (ticketsPayload.length === 0) {
      console.warn("Tidak ada tiket yang dipilih untuk checkout.");
      return;
    }

    createTransaction({
      eventId: event.id,
      tickets: ticketsPayload,
    });
  }, [event, selectedTickets, createTransaction]);

  return {
    selectedTickets,
    totalPrice,
    isAnyTicketSelected,
    isCreatingTransaction,
    handleTicketQuantityChange,
    handleCheckout,
  };
};

export default useEventTicket;
