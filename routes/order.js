import express from "express";
import orderModel from "../models/order.js";
import productModel from "../models/product.js";
import checkAuth from "../config/checkAuth.js";

const router = express.Router()

//order 전체를 불러오는 api
router.get("/", (req, res) => {
    orderModel
        .find()
        .populate("product")
        .populate("user")
        .then(order => {
            if(order.length === 0){
                return res.json({
                    msg : "data lengths is 0"
                })
            }
            res.json({
                msg : "get a order",
                count : order.length,
                order : order
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})

//특정한 order를 불러오는 api
router.get("/:orderid", (req, res) => {
    orderModel
        .findById(req.params.orderid)
        .populate("product")
        .populate("user")
        .then(order => {
            if(!order){
                return res.json({
                    msg : "No data"
                })
            }
            res.json({
                msg : "Suceesfull get order",
                order: order
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })

})



//order를 등록하는 api
router.post("/create", checkAuth,(req, res) => {
    const newOrder = new orderModel({
        product : req.body.orderName,
        qty : req.body.orderQty,
        memo : req.body.orderMem,
        user : req.user.id

    })

    newOrder
        .save() //저장
        .then(result => {
            res.json({
                msg : "Successful create User",
                user : result
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})
//order를 수정하는 api
router.put("/:orderid", (req, res) => {
    const orderid = req.params.orderid //변경할 대상

    const updateOps = {}

    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
        console.log(updateOps)
    }
    orderModel
        .findByIdAndUpdate(orderid, {$set : updateOps}) // 맨처음 id =productid (변경할 대상), 두번째 update 변경할 내용 {}로 표시해줌
        .then(_ => {
            res.json({
                msg : `updated product by ${orderid}`
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })

})

//order 전체를 삭제하는 api
router.delete("/", (req, res) => {
    productModel
        .deleteMany()
        .then(_ => {
            res.json({
                msg : "deleted all order"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })

})
//특정 order를 삭제하는 api
router.delete("/:orderid", (req, res) => {
    orderModel
        .findByIdAndDelete(req.params.orderid)
        .then(_ => {
            res.json({
                msg : "deleted order"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})




export default router