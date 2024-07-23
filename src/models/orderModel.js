import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "Cancelled"],
        default: "Pending",
    },
    total: {
        type: Number,
        required: true
    },
})

const order = mongoose.models.order || mongoose.model("order", orderSchema)

export default order;