
//1
import express from "express";
import productModel from "../models/product.js";


const router = express.Router()


// product와 관련된 api부분(crud)

//product를 전체를 불러오는 api
router.get("/", (req, res) => {
    productModel
        .find()
        .then(products => {
            if(products.length === 0){
                return res.json({
                    msg : "data lengths is 0"
                })
            }
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
        price : req.body.productPrice,
        desc : req.body.productDesc,
        category : req.body.productCategory

    })
    newProduct
        .save() //저장
        .then(aaa => {
            res.json({
                msg : "Successful create User",
                user :aaa
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
router.put("/:productid", (req, res) => {
    const productid = req.params.productid //변경할 대상
    //변경하고자하는 내용 (object)
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
        console.log(updateOps)
    }

    productModel
        .findByIdAndUpdate(productid, {$set : updateOps}) // 맨처음 id =productid (변경할 대상), 두번째 update 변경할 내용 {}로 표시해줌
        .then(_ => {
            res.json({
                msg : `updated product by ${productid}`
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})


//product를 전체를 삭제하는 api

router.delete("/", (req, res) => {
    productModel
        .deleteMany()
        .then(_ => {
            res.json({
                msg : "deleted all product"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
    // res.json({
    //     msg : "deleted a product"
    // })
})

//특정 product를 삭제하는 api
router.delete("/:productid", (req, res) => {
    productModel
        .findByIdAndDelete(req.params.productid)
        .then(_ => {
            res.json({
                msg : "deleted products"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})


//2
export default router