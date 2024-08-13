'use client'

import { useState } from 'react';
import axios from 'axios';

export default function PaymentForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Example order details (replace with your actual data)
            const orderData = {
                products: [
                    { name: 'Product 1', quantity: 1, price: 100 },
                    { name: 'Product 2', quantity: 2, price: 200 },
                ],
                status: 'In Progress',
                total: 500, // Total amount
                customerName: 'John Doe',
                customerEmail: 'johndoe@example.com',
                customerPhone: '1234567890',
            };

            // Call the backend API to create the order and get the payment session ID
            const response = await axios.post('/api/order/create', orderData);
            console.log(response.data, 'response')
            const { paymentSessionId } = response.data;
            console.log(paymentSessionId, 'sssid')
            // If order creation is successful, initiate the payment
            if (paymentSessionId) {
                initiatePayment(paymentSessionId);
            } else {
                setError('Failed to initiate payment.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setError(error.response?.data?.error || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const initiatePayment = (paymentSessionId) => {
        // Ensure the Cashfree script is loaded
        if (window.Cashfree) {
            const cashfree = window.Cashfree({
                mode: 'sandbox', // Change to 'production' when deploying to production
            });

            const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: "_self", // Optional: _self, _blank, _top, _modal, or a DOM element
            };

            cashfree.checkout(checkoutOptions).then((result) => {
                if (result.error) {
                    console.log("Payment failed or user closed the popup", result.error);
                }
                if (result.paymentDetails) {
                    console.log("Payment completed", result.paymentDetails.paymentMessage);
                    // You can redirect or show a success message here
                }
            }).catch((err) => {
                console.error("Checkout error:", err);
            });
        } else {
            console.error("Cashfree script not loaded");
        }
    };

    return (
        <div>
            <h2>Make a Payment</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handlePayment}>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
}
