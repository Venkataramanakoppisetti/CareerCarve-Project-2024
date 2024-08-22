// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import PaymentPage from './components/PaymentPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookingForm />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </Router>
    );
};

export default App;
