import express from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import checkAuth from "../config/checkAuth.js"

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
    // id 유무 체크 => password compare => 접속정보 암호(return jwt(json web token)
    const user = await userModel.findOne({ userId : req.body.userId })
    if(!user) {
        return res.json({
            msg : "No userId"
        })
    }

    const hashedPassword = await bcrypt.compare(req.body.password, user.password) //compare 매칭
    if(hashedPassword === false){
        return res.json({
            msg : "password do not match"
        })
    }
    //jsonwebtoken 생성
    const token =  await jwt.sign(
       //암호화된 값을 무엇을 담을건지
        {id : user._id},
        process.env.SECRET_KEY,
        { expiresIn: "1h"}
    )
    res.json({
        msg : "Successful login",
        token : token
    })



})

//프로필 정보 가져오기
router.get("/", checkAuth, async (req, res) => {
    console.log(req.user)

    const { id } = req.user
    await userModel
        .findById(id)
        .then(user => {
            res.json({
                msg : "get user",
                user : user
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})

export default router
