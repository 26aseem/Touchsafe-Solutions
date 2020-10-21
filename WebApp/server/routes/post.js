
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const requireLogin = require('../middlewares/requiredLogin')

// Create Post
router.post('/createpost', requireLogin, (req,res)=> {
    const {title, body, url } = req.body
    if(!title || !body){
        return res.status(422).json({
            error: "Please add the Title and the body of the Post"
        })
    }
    if(!url){
        return res.status(422).json({
            error: "Please upload a Photo"
        })
    }

    req.user.password = undefined

    const post = new Post({
        title: title,
        body: body,
        photo:url,
        postedBy: req.user
    })

    post.save().then(result => {
        return res.json({
            message: "Posted Created successfully",
            post: result
        })
    })
    .catch(err => {
        console.log(err)
    })

})

// Get All Posts
router.get('/allpost', requireLogin, (req, res) =>{
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    Post.find()
    .populate("postedBy", "_id username profilePic")
    .sort([[sortBy, "desc"]])
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

// Get All Posts by the User
router.get('/mypost', requireLogin, (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    Post.find({postedBy: req.user._id})
    .populate("postedBy", "_id name profilePic")
    .sort([[sortBy, "desc"]])
    .then(myposts => {
        return res.json({myposts})
    })
    .catch(err => {
        console.log(err)
    })
})


// Post by following
router.get('/followingpost', requireLogin, (req, res) =>{
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    Post.find({postedBy:{
        $in : req.user.following
    }})
    .populate("postedBy", "_id username profilePic")
    .sort([[sortBy, "desc"]])
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})




// Like Post
router.put('/like',requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push: {likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy", "_id username profilePic")
    .exec((err, result)=>{
        if(err){
            return res.status(402),json({
                error: err
            })
        } else{
            res.json(result)
        }
    })
});

// Unlike Post
router.put('/unlike',requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull: {likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy", "_id username profilePic")
    .exec((err, result)=>{
        if(err){
            return res.status(402),json({
                error: err
            })
        } else{
            res.json(result)
        }
    })
});


// Comment Post
router.put('/comment',requireLogin,(req,res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id,
        postedByUser: req.user.username
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push: {comments:comment}
    },{
        new:true
    })
    .populate("postedBy", "_id name username profilePic")
    .exec((err, result)=>{
        if(err){
            return res.status(402).json({
                error: err
            })
        } else{
            res.json(result)
        }
    })
});

// Delete Post
router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy", "_id name")
    .exec((err,post)=> {
        
        if(err || !post){
            return res.status(422).json({
                error: err
            })
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json({result})
            }) 
            .catch(err=> {
                console.log(err)
            })
        }
    })
})

module.exports = router