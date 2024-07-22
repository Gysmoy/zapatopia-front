import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionForm = () => {
  const [clientId, setClientId] = useState('');
  const [productId, setProductId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/stock/subscribe', {
        clientId,
        productId,
        email
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error al suscribirse');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Client ID:</label>
        <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} required />
      </div>
      <div>
        <label>Product ID:</label>
        <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button type="submit">Suscribirse</button>
    </form>
  );
};

export default SubscriptionForm;
