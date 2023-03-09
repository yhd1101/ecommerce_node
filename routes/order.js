import express from "express";

const router = express.Router()

//order를 불러오는 api
router.get("/", (req, res) => {
    res.json({
        msg : "order get all"
    })
})


//order를 등록하는 api
router.post("/create", (req, res) => {
    res.json({
        msg : "created a order"
    })
})

router.put("/update", (req, res) => {
    res.json({
        msg : "update a order"
    })
})

router.delete("/delete", (req, res) => {
    res.json({
        msg : "deleted a order"
    })
})




export default router