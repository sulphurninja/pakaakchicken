import mongoose from "mongoose";
// import { stringify } from "querystring";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

})

const category = mongoose.models.category || mongoose.model("category", categorySchema)
export default category;