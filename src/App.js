import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from './Pages/CartPage';
import HomePage from './Pages/HomePage';
import PageNotFound from './Pages/PageNotFound';
import Admin from './Admin';
import FiltersPage from './Pages/FiltersPage';
import LoginPage from './Pages/LoginPage';
import SubscriptionForm from './Components/SubscriptionForm';
import NotificationButton from './Components/NotificationButton';
import SubscriptionList from './Components/SubscriptionList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        // Public routes
        <Route path="/" element={<HomePage />} />
        <Route path="/filters" element={<FiltersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        // Admin routes
        <Route path="/admin/*" element={<Admin />} />

        // Page not found
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
