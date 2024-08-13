import connectDB from "../../../../lib/db";
import order from "../../../../models/orderModel";
import { NextResponse } from "next/server";
import axios from 'axios';

connectDB();

export async function POST(request) {
    try {
        const body = await request.json();
        const { products, status, total, customerName, customerEmail, customerPhone } = body;
        const newOrder = new order({ products, status, total });
        const savedOrder = await newOrder.save();

        const cashfreeResponse = await axios.post(
            'https://sandbox.cashfree.com/pg/orders',
            {
                orderId: savedOrder._id.toString(), // Ensure ID is a string
                order_amount: total,
                order_currency: "INR",
                customer_details: {
                    customer_id: "01",
                    customer_name: customerName,
                    customer_email: customerEmail,
                    customer_phone: customerPhone,
                },
                order_meta: {
                    return_url: `https://test.cashfree.com/pgappsdemos/return.php?order_id=${savedOrder._id}`,
                },
            },
            {
                headers: {
                    'x-client-id': process.env.CASHFREE_APP_ID,
                    'x-client-secret': process.env.CASHFREE_SECRET_KEY,
                    'x-api-version': '2021-05-21',
                    'Content-Type': 'application/json',
                },
            }
        );

        const cashfreeLink = cashfreeResponse.data.payment_link;
        return NextResponse.json({
            message: "Order created successfully",
            data: savedOrder,
            cashfreeLink
        });
    } catch (error) {
        // Log the full error response for debugging
        console.error('Cashfree API Error:', error.response?.data || error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}