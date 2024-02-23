// RecentOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You may need to install axios using `npm install axios`

const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Fetch recent orders data from your backend API
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get('your-backend-api-endpoint/recent-orders');
        setRecentOrders(response.data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div>
      <h2>Recent Orders</h2>
      {recentOrders.length === 0 ? (
        <p>No recent orders available.</p>
      ) : (
        <ul>
          {recentOrders.map((order) => (
            <li key={order.id}>
              Order ID: {order.id}, Total: ${order.total}, Date: {order.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentOrders;
