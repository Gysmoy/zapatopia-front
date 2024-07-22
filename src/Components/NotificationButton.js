import React, { useState } from 'react';
import axios from 'axios';

const NotificationButton = () => {
  const [productId, setProductId] = useState('');

  const handleNotify = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/stock/notify?productId=${productId}`);
      alert(response.data.message);
    } catch (error) {
      alert('Error al notificar suscriptores');
    }
  };

  return (
    <div>
      <label>Product ID:</label>
      <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required />
      <button onClick={handleNotify}>Notificar Suscriptores</button>
    </div>
  );
};

export default NotificationButton;
