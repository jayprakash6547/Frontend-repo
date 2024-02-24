import React from 'react';

const ActiveSubscriptionItem = ({ subscription }) => {
  return (
    <div>
      <p><strong>Subscription ID:</strong> {subscription.id}</p>
      <p><strong>Details:</strong> {/* Add details like plan, cost, etc. */}</p>
    </div>
  );
};

export default ActiveSubscriptionItem;
