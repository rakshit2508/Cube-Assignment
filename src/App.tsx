import React, { useState, useEffect } from 'react';
import { fetchCustomers } from './utils/api';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import './styles.css';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      const customerData = await fetchCustomers();
      setCustomers(customerData);
    };

    loadCustomers();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Cube Customer Details</h1>
      </header>
      <div className="content">
        <CustomerList
          customers={customers}
          onSelect={setSelectedCustomer}
          selectedCustomerId={selectedCustomer?.id ?? null}
        />
        <CustomerDetails customer={selectedCustomer} />
      </div>
    </div>
  );
};

export default App;
