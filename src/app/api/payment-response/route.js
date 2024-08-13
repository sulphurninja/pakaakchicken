import connectDB from "../../../lib/db";
import order from "../../../models/orderModel";
import { NextResponse } from "next/server";
import crypto from 'crypto';

connectDB();

export async function GET(request) {
    try {
        // Parse query parameters
        const { order_id, payment_status, txnid, signature } = request.url;

        // Fetch the order from the database
        const orderDetails = await order.findById(order_id);

        if (!orderDetails) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Verify the payment status and signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
            .update(`${order_id}|${payment_status}|${txnid}`)
            .digest('hex');

        if (signature !== expectedSignature) {
            return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
        }

        // Update the order status based on payment status
        if (payment_status === 'SUCCESS') {
            orderDetails.status = 'completed';
        } else {
            orderDetails.status = 'failed';
        }

        await orderDetails.save();

        return NextResponse.json({
            message: "Payment status updated successfully",
            data: orderDetails
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
