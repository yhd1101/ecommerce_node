import express from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt"

const router =express.Router()





//회원가입 등록하는 api
router.post("/signup", async (req, res) => {

    // id 유무 체크 => password 암호화
    const user = await userModel.findOne({ userId : req.body.userId })
    if(user) {
        return res.json({
            msg : "user id existed"
        })
    }

    // password 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 10)




    const newSignup = new userModel({
       name : req.body.name,
       birth : req.body.birth,
       bio : req.body.bio,
       userId : req.body.userId,
       password : hashedPassword,
       email : req.body.email,
       phone : req.body.phone
   })
    newSignup
        .save()
        .then(result => {
            res.json({
                msg : "Successful signup!",
                user : result
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})


//로그인
router.post("/login", async (req, res) => {

})



export default router
