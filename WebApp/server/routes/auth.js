
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Restaurant = mongoose.model("Restaurant")
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middlewares/requiredLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const FRONTEND = process.env.REACT_APP_FRONTEND


const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID
    }
}))

router.post('/signup', (req,res) => {
    const { name, email, username, password, url } = req.body
    if(!name || !email || !username || !password){
        return res.status(422).json({
            error: "Please fill all the Fields"
        })
    }
    User.findOne({
        $or : [
            {email:email},
            {username: username}
            ]
        })
    .then((savedUser) => {
        if(savedUser){
            res.status(402).json({
                error: "Username or Email is already registered"
            })
        }
        bcrypt.hash(password, 15)
        .then(hashedPass=> {
            const user = new User({
                name,
                username,
                email,
                password: hashedPass,
                profilePic: url
                
            })
    
            user.save()
            .then(user => {
                transporter.sendMail({
                   to:user.email,
                   from:"instaclonegram@gmail.com",
                   subject:"Signup Success",
                   html:"<h1>Welcome to Instagram Clone</h1><h4>We are very happy to know that you have considered using our Social Media App Instagram Clone.</h4>" 
                })
                res.json({
                    message: "Registered Successfully"
                })
            })
            .catch(err=> {
                console.log(err)
            })
        })
        .catch(err=> {
            console.log(err)
        })
        
    })
    
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req,res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(422).json({
            error: "Please Fill all the Fields"
        })
    }

    User.findOne({
        username: username
    })
    .then(savedUser => {
        if(!savedUser){
            return res.status(403).json({
                error: "Invalid Username"
            })
        }
        bcrypt.compare(password, savedUser.password)
        .then(ifMatch => {
            if(ifMatch){
                console.log("Successfully Signed In")
                const token = jwt.sign({_id: savedUser._id}, process.env.SECRET)
                const {_id, name, email, username,followers,following,profilePic} = savedUser
                res.json({token,user:{_id,name,email,username,followers,following,profilePic}})
            }
            else{
                res.status(422).json({
                    error: "Invalid Password"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    })

    .catch(err => {
        console.log(err)
    })
    
})

router.post('/resetpassword',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(402).json({
                    error:"User doesn't exist with the given Email"
                })
            }
            user.resetToken = token
            user.expireToken = Date.now() + 900000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"instaclonegram@gmail.com",
                    subject:"Password Reset",
                    html:`<div>
                        <h2>Password Reset</h2>
                        <h4>You requested for Password reset link</h4>
                        <h5>Click on this <a href="${FRONTEND}/reset/${token}">link</a> to reset your Password. </h5>
                        <h6>This link is valid only for 15 minutes.</h6>
                        </div>
                        `
                })
                res.json({
                    message:"Check your Email to reset your Password"
                })
            })
        })
    })
})


router.post('/updatepassword',(req,res)=>{
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({
                error:"Session Expired. Try resetting password again"
            })
        }
        bcrypt.hash(req.body.password,15)
        .then(hashedpassword=>{
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken = undefined
            user.save().then(saveduser=>{
                res.json({message:"Password updated Successfully"})
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router