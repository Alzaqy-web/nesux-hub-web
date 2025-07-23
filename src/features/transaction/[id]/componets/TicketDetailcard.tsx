import React from "react";

interface TicketDetailsCardProps {
  transactionTickets: Array<{
    id: number;
    transactionId: number;
    ticketId: number;
    quantity: number;
    price: number;
    ticketName?: string;
  }>;
}

const TicketDetailsCard: React.FC<TicketDetailsCardProps> = ({
  transactionTickets,
}) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-white">Tiket Anda</h3>
      {transactionTickets.length > 0 ? (
        <div className="space-y-4">
          {transactionTickets.map((ticket, index) => (
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
                Rp {(ticket.quantity * ticket.price).toLocaleString("id-ID")}
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
  );
};

export default TicketDetailsCard;
