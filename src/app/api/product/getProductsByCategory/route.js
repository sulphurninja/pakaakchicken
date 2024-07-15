import connectDB from "../../../../lib/db";
import Product from '../../../../models/productModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();

        const { category } = reqBody;

        console.log(category, 'category id!')
        const products = await Product.find({ category });
        console.log(products, 'product')
        // Fetch all users from the database
        return NextResponse.json({
            message: "Products by Category fetched successfully",
            data: products,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}