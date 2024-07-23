import connectDB from "../../../../lib/db";
import product from '../../../../models/productModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PATCH(request) {
    try {
        const reqBody = await request.json();

        const { name, image, description, price, discount, category } = reqBody;


        // Find the category by ID and update it
        const updatedProduct = await product.findByIdAndUpdate(
            id,
            { name, image, description, price, discount, category },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        console.log(updatedProduct, 'updated product');

        return NextResponse.json({
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
