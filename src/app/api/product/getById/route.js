import connectDB from "../../../../lib/db";
import Product from '../../../../models/productModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();

        const { productId } = reqBody;

        console.log(productId, 'id!')
        const product = await Product.findById(productId);
        console.log(product, 'product')
        // Fetch all users from the database
        return NextResponse.json({
            message: "Product fetched successfully",
            data: product,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}