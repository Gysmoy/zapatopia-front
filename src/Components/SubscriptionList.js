import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/stock/subscriptions');
        setSubscriptions(response.data.data);
      } catch (error) {
        alert('Error al obtener suscripciones');
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h2>Suscripciones</h2>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>
            {`Client ID: ${subscription.clientId}, Product ID: ${subscription.productId}, Email: ${subscription.email}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
