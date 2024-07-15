import connectDB from "../../../../lib/db";
import Product from '../../../../models/productModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request) {
    try {
        // Fetch all users from the database
        const products = await Product.find({}); // Exclude password field
        return NextResponse.json({
            message: "Products fetched successfully",
            data: products,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}