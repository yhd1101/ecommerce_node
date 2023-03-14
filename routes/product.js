
//1
import express from "express";
import productModel from "../models/product.js";
import product from "../models/product.js";

const router = express.Router()


// product와 관련된 api부분(crud)

//product를 전체를 불러오는 api
router.get("/", (req, res) => {
    productModel
        .find()
        .then(products => {
            res.json({
                msg : "get all products",
                count : products.length,
                products : products
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })

    // res.json({
    //     msg : "product get all"
    // })
})
//특정한 product를 불러오는 api
router.get("/:productid", (req, res) => {
    productModel
        .findById(req.params.productid)
        .then(product => {
            if(!product){
                return res.json({
                    msg : "No data"
                })
            }
            res.json({
                msg : "Suceesfull get product",
                product : product
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })

})

//product를 등록하는 api

router.post("/create", (req, res) => {
    // const newProduct = {
    //     name : req.body.productName,
    //     price : req.body.productPrice,
    //     desc : req.body.productDesc
    // }
    const newProduct = new productModel({
        name : req.body.productName,
        price : req.body.prodcutPrice,
        desc : req.body.productDesc,
        catagory : req.body.productCatagory

    })
    newProduct
        .save() //저장
        .then(aaa => {
            res.json({
                msg : "Successful create User",
                user : {
                    name : aaa.name,
                    price : aaa.price,
                    id : aaa._id
                }
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })

    // res.json({
    //     msg : "created a product",
    //     productInfo : newProduct
    // })
})

//product를 수정하는 api
router.put("/update", (req, res) => {
    res.json({
        msg: "updated a product"
    })
})


//product를 삭제하는 api

router.delete("/delete", (req, res) => {
    res.json({
        msg : "deleted a product"
    })
})




//2
export default router