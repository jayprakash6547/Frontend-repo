import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm } from 'antd'; // Or your preferred UI library
// import { InvoiceItem } from './InvoiceItem'; // Import if using separate component

import InvoiceItem from './InvoiceItem';
const UnpaidInvoices = () => {
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch unpaid invoices data from API or local storage
    setLoading(true);
    fetch('/api/unpaid-invoices') // Replace with your API endpoint or data source
      .then(response => response.json())
      .then(data => {
        setUnpaidInvoices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
        setLoading(false);
      });
  }, []);

  const handleMarkPaid = (invoiceId) => {
    // Implement logic to mark invoice as paid (API call, update state, etc.)
    const updatedInvoices = unpaidInvoices.filter(invoice => invoice.id !== invoiceId);
    setUnpaidInvoices(updatedInvoices);
  };

  const columns = [
    { title: 'Invoice Number', dataIndex: 'invoiceNumber' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Client', dataIndex: 'client' },
    { title: 'Amount', dataIndex: 'amount', render: (amount) => `₹${amount.toFixed(2)}` },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id, invoice) => (
        <Popconfirm
          title="Are you sure you want to mark this invoice as paid?"
          onConfirm={() => handleMarkPaid(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Mark Paid</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <h1>Unpaid Invoices</h1>
      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <Table dataSource={unpaidInvoices} columns={columns} rowKey="id" expand={invoice => <InvoiceItem invoice={invoice} />} />
      )}
    </div>
  );
};

export default UnpaidInvoices;
