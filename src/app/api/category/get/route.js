import connectDB from "../../../../lib/db";
import Category from '../../../../models/categoryModel';
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request) {
    try {
        // Fetch all users from the database
        const categories = await Category.find({}); // Exclude password field
        return NextResponse.json({
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}