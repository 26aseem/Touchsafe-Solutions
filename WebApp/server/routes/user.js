const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requiredLogin')
const User = mongoose.model("User")
const Post = mongoose.model("Post")

router.get('/user/:userId', requireLogin, (req,res)=>{
    User.findOne({_id:req.params.userId})
    .select("-password")
    .then(user => {
        Post.find({postedBy:req.params.userId})
        .populate("postedBy", "_id name username")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({
                    error: err
                })
            }
            res.json({user, posts})
        })
    }).catch(err=> {
        return res.status(404).json({
            error: "User not found"
        })
    })
})

// Follow
router.put('/follow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers: req.user._id}
    },{new:true},(err,result)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{new:true}).select("-password").then(data =>{
            res.json(data)
        }).catch(err =>{
            return res.status(422).json({
                error:err
            })
        })
    })
       
})


// Unfollow
router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers: req.user._id}
    },{new:true},(err,result)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{new:true}).select("-password").then(data =>{
            res.json(data)
        }).catch(err =>{
            return res.status(422).json({
                error:err
            })
        })
    })
       
})


//Update Pic
router.put('/updatepic',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,
       {$set:{profilePic:req.body.pic}},{new:true},
       (err,result)=>{
        if(err){
            return res.status(422).json({
                error:"Profile Picture cannot be updated"
            })
        }
        res.json(result)
       } 
        )
})


//Find Users
router.post('/searchusers',requireLogin,(req,res)=>{
    let userPattern = new RegExp('^'+req.body.info)
    User.find({
        name:{$regex:userPattern}
    })
    .select("_id name username profilePic")
     .then(user=>{
        if(user.error){
            return res.status(422).json({
                error:user.error
            })
        }
        
        res.json({user})
    })
    .catch(err=>{
        console.log(err)
    })
})



module.exports = router