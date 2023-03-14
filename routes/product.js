
//1
import express from "express";
const router = express.Router()


// product와 관련된 api부분(crud)

//product를 불러오는 api
router.get("/", (req, res) => {
    res.json({
        msg : "product get all"
    })
})


//product를 등록하는 api

router.post("/create", (req, res) => {
    const newProduct = {
        name : req.body.productName,
        price : req.body.productPrice,
        desc : req.body.productDesc
    }
    res.json({
        msg : "created a product",
        productInfo : newProduct
    })
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