import connectDB from "../../../../lib/db";
import Category from '../../../../models/categoryModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(request) {
    try {
        const reqBody = await request.json();

        const { id } = reqBody;

        console.log(id, 'category id!');

        // Find the category by ID and delete it
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        console.log(deletedCategory, 'deleted category');

        return NextResponse.json({
            message: "Category deleted successfully",
            data: deletedCategory,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
