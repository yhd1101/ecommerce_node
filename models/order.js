import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    product : {
        type: mongoose.Schema.Types.ObjectId, //product에 있는 moongse id를 가져온다.
        ref : "product",
        required : true
    },
    qty : {
        type: Number,
        default : 1
    },
    memo : {
        type : String
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true
    }
})

const orderModel = mongoose.model("order", orderSchema)

export default orderModel