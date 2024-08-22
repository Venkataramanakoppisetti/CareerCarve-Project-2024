import React from 'react';
import { Button } from 'antd';

const PaymentPage = () => {
    const handlePayment = () => {
        alert("Payment Processed!");
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Complete Your Payment</h2>
            <Button type="primary" onClick={handlePayment}>
                Confirm Payment
            </Button>
        </div>
    );
};

export default PaymentPage;
