// app/api/users/register/route.js

import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Users from '../../../../models/userModel';
import bcrypt from 'bcrypt';

// Connect to the database
connectDB();

export async function POST(req) {
    try {
        const { email, password, name, address } = await req.json();

        // Trim extra spaces from the email
        const trimmedEmail = email.trim();

        // Check if the email already exists
        const existingUser = await Users.findOne({ email: trimmedEmail });
        if (existingUser) {
            return NextResponse.json({ err: 'Email already exists!' }, { status: 400 });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new Users({
            email: trimmedEmail,
            password: passwordHash,
            name,
            address,
        });

        // Save the new user to the database
        await newUser.save();

        return NextResponse.json({ msg: "Successful Registration!" });
    } catch (err) {
        return NextResponse.json({ err: err.message }, { status: 500 });
    }
}
