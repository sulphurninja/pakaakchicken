import connectDB from "../../../../lib/db";
import product from '../../../../models/productModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(request) {
    try {
        const reqBody = await request.json();

        const { id } = reqBody;

        console.log(id, 'product id!');

        // Find the category by ID and delete it
        const deletedProduct = await product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        console.log(deletedProduct, 'deleted product');

        return NextResponse.json({
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
