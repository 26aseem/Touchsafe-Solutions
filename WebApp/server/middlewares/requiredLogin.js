const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({
            error: "You must be a Logged In"
        })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.SECRET, (err,payload) => {
            if(err){
               return res.status(401).json({
                    error: "You must be Logged in"
                })
            }

            const {_id} = payload
            User.findById(_id).then(userData => {
                req.user = userData 
                next()
            })
        })
        }
    
