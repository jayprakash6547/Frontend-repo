import React, { useState, useEffect } from 'react';
import { Table, Button, Typography } from 'antd'; 
import ActiveSubscriptionItem from './ActiveSubscriptionItem'; // Update this line
const ActiveSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch active subscriptions data
    setLoading(true);
    fetch('/api/active-subscriptions') // Replace with your API endpoint or data source
      .then(response => response.json())
      .then(data => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subscriptions:', error);
        setLoading(false);
      });
  }, []);

  const handleManageSubscription = (subscriptionId) => {
    // Implement logic to manage subscription (e.g., navigate to details page)
    console.log('Manage subscription:', subscriptionId);
  };

  const columns = [
    { title: 'Service', dataIndex: 'service' },
    { title: 'Started', dataIndex: 'startedAt', render: (date) => new Date(date).toLocaleDateString() },
    { title: 'Next Payment Due', dataIndex: 'nextPaymentDue', render: (date) => new Date(date).toLocaleDateString() },
    { title: 'Status', dataIndex: 'status' },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id) => (
        <Button type="primary" onClick={() => handleManageSubscription(id)}>
          Manage
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Active Subscriptions</h1>
      {loading ? (
        <p>Loading subscriptions...</p>
      ) : (
        <Table dataSource={subscriptions} columns={columns} rowKey="id" expand={subscription => <ActiveSubscriptionItem subscription={subscription} />} />
      )}
      {subscriptions.length === 0 && !loading && <Typography.Text>No active subscriptions found.</Typography.Text>}
    </div>
  );
};

export default ActiveSubscriptions;
