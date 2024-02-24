import React from 'react';

const TicketItem = ({ ticket }) => {
  // Display detailed information about the ticket (subject, description, attachments, etc.)
  // Handle actions like viewing details, updating status, etc.
  return (
    <div>
      <p><strong>Ticket ID:</strong> {ticket.id}</p>
      <p><strong>Subject:</strong> {ticket.subject}</p>
      <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      {/* ... other details and actions */}
      </div>

 );
};

export default TicketItem;