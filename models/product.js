import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type: Number,
        default : 0
    },
    desc : {
        type : String
    },
    category : {
        type : String
    }
})

const productModel = mongoose.model("product", productSchema)

export default productModel