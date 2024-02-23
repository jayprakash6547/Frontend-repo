import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div>
      <p><strong>Items:</strong></p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItem;
