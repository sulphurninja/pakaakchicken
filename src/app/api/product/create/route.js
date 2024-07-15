import connectDB from "../../../../lib/db";
import product from "../../../../models/productModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request) {
    try {
        // Parse the JSON body from the request       
        const data = await request.json();

        // Extract the fields from the parsed data
        const { name, description, image, price, discount, quantity, category } = data;

        // Validate the fields
        if (!name || !description || !image || typeof price !== 'number' || typeof quantity !== 'number') {
            throw new Error("Missing required fields or invalid field types");
        }

        // Create a new product with the provided data
        const newProduct = new product({
            name,
            description,
            image,
            price,
            discount: discount || 0, // Default to 0 if discount is not provided
            quantity,
            category
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        return NextResponse.json({
            message: "Product created successfully",
            data: savedProduct,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
