import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd'; // Or your preferred library
// import { TicketItem } from './TicketItem'; // Import if using separate component
import TicketItem from './TicketItem'; // Import if using separate component
const OpenTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch open tickets data
    setLoading(true);
    fetch('/api/open-tickets') // Replace with your API endpoint or data source
      .then(response => response.json())
      .then(data => {
        setTickets(data.filter(ticket => ticket.status === 'Open'));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: 'Subject', dataIndex: 'subject' },
    { title: 'Date', dataIndex: 'date', render: (date) => new Date(date).toLocaleDateString() },
    { title: 'Status', dataIndex: 'status' },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id, ticket) => (
        <TicketItem ticket={ticket} /> // Display details or handle actions here
      ),
    },
  ];

  return (
    <div>
      <h1>Open Tickets</h1>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <Table dataSource={tickets} columns={columns} rowKey="id" />
      )}
      {tickets.length === 0 && !loading && <Typography.Text>No open tickets found.</Typography.Text>}
    </div>
  );
};

export default OpenTickets;
