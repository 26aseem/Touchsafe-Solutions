const Food = require("../models/food");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");  //File System


exports.getFoodById = (req, res, next, id) => {
    console.log(id)
    Food.findById(id)
      .populate("rest")
      .exec((err, food) => {
        if(err) {
          return res.status(400).json({
            error: "Food not found"
          });
        }
        req.food = food;
        next();
      });
  };

exports.createFood = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "Issues with the image"
            });
        }

        //destructure the fields
    const { dishName, dishDesc, rest, dishStock, dishPrice } = fields;

    if (!dishName || !dishDesc  || !rest || !dishStock || !dishPrice) 
    {
        console.log(rest,dishName,dishDesc,dishPrice,dishStock)
        
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let food = new Food(fields);


        //handle file here
        if(file.photo){
            console.log("photofound")
            if(file.photo.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            food.photo.data = fs.readFileSync(file.photo.path)
            food.photo.contentType = file.photo.type
        }

        //save to the db
        food.save((err, food) => {
            if(err){
                console.log(err)
                res.status(400).json({
                    error: "Saving image to the Database failed"
                });
            }
            return res.json(food);
        });

    })
};



exports.getFood = (req, res) => {
    req.food.photo = undefined    //So that food loads quickly
    return res.json(req.food)
};

//Performance optimization
exports.photo = (req, res, next) => {
    if(req.food.photo.data){
        res.set("Content-Type", req.food.photo.contentType)
        return res.send(req.food.photo.data)
    }
    next();
};

exports.deleteFood = (req, res) => {
    let food = req.food;
    food.remove((err, deletedfood) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the food item"
            });
        }

        res.json({
            message: "Deletion was successful"
        });
    });
};


exports.updateFood = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Issues with the image"
            });
        }
        
        let food = req.food;
        food = _.extend(food, fields);
        
        if(file.photo){
            if(file.photo.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            food.photo.data = fs.readFileSync(file.photo.path)
            food.photo.contentType = file.photo.type
        }

        //save to the db
        food.save((err, food) => {
            if(err){
                res.status(400).json({
                    error: "Saving image to the Database failed"
                });
            }
            return res.json(food);
        });

    })
};


exports.getAllFoods = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Food.find({rest:req.profile._id})
    .select("-photo")
    //.populate("merchant")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, foods) => {
        if(err){
            return res.status(400).json({
                error: "No food item FOUND"
            });
        }
        //if(res.body.food.merchant._id == id)
            res.json(foods)
    });
};

exports.getMenu = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Food.find({rest:req.profile._id})
    //.populate("merchant")
    .sort([[sortBy, "asc"]])
    .exec((err, foods) => {
        if(err){
            return res.status(400).json({
                error: "No food item FOUND"
            });
        }
        //if(res.body.food.merchant._id == id)
            res.json(foods)
    });
};


exports.getAllUniqueRestaurants = (req, res) => {
    Food.distinct("Merchant", {}, (err, merchant) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "No restaurant found"
            });
        }
        console.log(merchant)
        res.json(merchant);
    })
};

// Update Stock and Sold

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.foods.map(prod => {
        return{
            updateOne: {
                filter: {_id: prod.food},
                update: {$inc: {dishStock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Food.bulkWrite(myOperations, {}, (err, foods) => {
        if (err) {
          return res.status(400).json({
            error: "Bulk operation failed"
          });
        }
        next();
      });
    };