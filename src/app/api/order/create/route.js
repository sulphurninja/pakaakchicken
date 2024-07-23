import connectDB from "../../../../lib/db";
import order from "../../../../models/orderModel";
import { NextResponse } from "next/server";


connectDB();

export async function POST(request) {
    try {
        // Parse the JSON body from the request
        const body = await request.json();
        const { products, status, total } = body;


        // Create a new category with the provided data
        const newOrder = new order({ products, status, total });

        // Save the new category to the database
        const savedOrder = await newOrder.save();

        return NextResponse.json({
            message: "order created successfully",
            data: savedOrder,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}