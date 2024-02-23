import React, { useState, useEffect } from 'react';
import { List, Card, Typography, Button,Avatar } from 'antd'; // Or your preferred library

import OrderItem from './OrderItem';
const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch recent orders data
    setLoading(true);
    fetch('/api/recent-orders') // Replace with your API endpoint or data source
      .then(response => response.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Recent Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={orders}
          renderItem={order => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={order.productImage} />}
                title={order.productName}
                description={
                  <p>
                    Date: {order.date} | Amount: ₹{order.amount}
                  </p>
                }
              />
              <OrderItem order={order} />
              {order.status !== 'completed' && (
                <Button type="primary" disabled={order.status === 'processing'}>
                  {order.status === 'placed' ? 'Process' : 'View Details'}
                </Button>
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default RecentOrders;
