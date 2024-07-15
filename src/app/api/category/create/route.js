import connectDB from "../../../../lib/db";
import category from "../../../../models/categoryModel";
import { NextResponse } from "next/server";


connectDB();

export async function POST(request) {
    try {
        // Parse the JSON body from the request
        const body = await request.json();
        const { name, image } = body;

        if (!name || !image) {
            return NextResponse.json({ error: "Name and image are required" }, { status: 400 });
        }

        // Create a new category with the provided data
        const newCategory = new category({ name, image });

        // Save the new category to the database
        const savedCategory = await newCategory.save();

        return NextResponse.json({
            message: "category created successfully",
            data: savedCategory,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}