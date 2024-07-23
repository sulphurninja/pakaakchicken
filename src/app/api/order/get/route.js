import connectDB from "../../../../lib/db";
import order from '../../../../models/orderModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request) {
    try {
        // Fetch all users from the database
        const orders = await order.find({}); // Exclude password field
        return NextResponse.json({
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}