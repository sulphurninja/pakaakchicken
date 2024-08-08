// app/api/users/login/route.js

import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Users from '../../../../models/userModel';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../../../../utils/generateToken';

// Connect to the database
connectDB();

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Find the user by email
        const user = await Users.findOne({ email });

        if (!user) {
            return NextResponse.json({ err: 'You are not registered!' }, { status: 400 });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ err: 'Incorrect Password, Check again!' }, { status: 400 });
        }

        // Generate access and refresh tokens
        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        return NextResponse.json({
            msg: "Login Successful!!",
            refresh_token,
            access_token,
            user: {
                email: user.email,
                name: user.name,
                address: user.address,
            }
        });

    } catch (err) {
        return NextResponse.json({ err: err.message }, { status: 500 });
    }
}
