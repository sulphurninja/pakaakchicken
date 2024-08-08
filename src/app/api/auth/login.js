import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(400).json({ err: 'You are not registered!' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ err: 'Incorrect Password, Check again!' })

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })

        res.json({
            msg: "Login Successful!!",
            refresh_token,
            access_token,
            user: {
                email: user.email,
                name: user.name,
                address: user.address,
            }
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}
