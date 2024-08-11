import React from 'react';

interface Customer {
  id: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  paragraph: string;
}

interface CustomerListProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
  selectedCustomerId: string | null;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelect, selectedCustomerId }) => {
  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`customer-card ${selectedCustomerId === customer.id ? 'selected' : ''}`}
          onClick={() => onSelect(customer)}
        >
          <h3>{customer?.name?.first} {customer?.name?.last}</h3>
          <p>{customer?.paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
