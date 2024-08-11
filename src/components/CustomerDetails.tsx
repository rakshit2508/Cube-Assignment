import React, { useState, useEffect } from 'react';
import { fetchAndStoreImages, getRandomImages } from '../utils/api';
import ImageGallery from './ImageGallery'; // Import the ImageGallery component

interface Customer {
  id: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  location: {
    street: { name: string };
    city: string;
    state: string;
  };
  paragraph: string;
}

const CustomerDetails: React.FC<{ customer: Customer | null }> = ({ customer }) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        await fetchAndStoreImages(); // Ensure images are fetched and stored
      } catch (err) {
        setError('Error loading images.');
      }
    };

    fetchImages();
  }, []); // Only run once on component mount

  useEffect(() => {
    if (customer) {
      const updateImages = () => {
        try {
          const customerImages = getRandomImages(); // Get random images from stored pool
          setImages(customerImages);
        } catch (err) {
          setError('Error loading images.');
        }
      };

      updateImages(); // Update images when customer changes

      const intervalId = setInterval(updateImages, 10000); // Refresh images every 10 seconds

      // Cleanup interval on component unmount or when customer changes
      return () => clearInterval(intervalId);
    }
  }, [customer]); // Dependency on customer

  if (!customer) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', fontSize: '1.2em', color: '#333' }}>
      Select a customer to view details.
    </div>
  );

  if (error) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', fontSize: '1.2em', color: '#333' }}>
      {error}
    </div>
  );

  return (
    <div className="customer-details">
      <div className="text-content">
        <h2>{customer.name.first} {customer.name.last}</h2>
        <p>{customer.location.street.name}, {customer.location.city}, {customer.location.state}</p>
        <p>{customer.paragraph}</p>
      </div>
      <ImageGallery images={images} />
    </div>
  );
};

export default CustomerDetails;
