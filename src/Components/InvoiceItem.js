import React from 'react';

const InvoiceItem = ({ invoice }) => {
  return (
    <div>
      <p><strong>Items:</strong></p>
      <ul>
        {invoice.items.map((item) => (
          <li key={item.id}>
            {item.description} x {item.quantity} = ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> ₹{invoice.amount}</p>
    </div>
  );
};

export default InvoiceItem;
