import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : String,
    price : Number,
    desc : String,
    catagory : String
})

const productModel = mongoose.model("product", productSchema)

export default productModel