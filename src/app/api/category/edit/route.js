import connectDB from "../../../../lib/db";
import Category from '../../../../models/categoryModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PATCH(request) {
    try {
        const reqBody = await request.json();

        const { id, name, image } = reqBody;

        console.log(id, 'category id!');
        console.log(name, 'new name!');
        console.log(image, 'new image!');

        // Find the category by ID and update it
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, image },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        console.log(updatedCategory, 'updated category');

        return NextResponse.json({
            message: "Category updated successfully",
            data: updatedCategory,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
