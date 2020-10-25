const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Category Not Found in Database"
            });
        }

        req.category = category;
        next();
    });
    
};


exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save in Database"
            });
        }

        return res.json({category}); 
    });

};

exports.getCategory = (req, res) => {
    return res.json(req.category);
    
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err) {
            return res.status(400).json({
                error: "NO category found"
            });
        }
        res.json(categories);
    });
};


exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    
    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Cannot update the Category"
            });
        }
        return res.json(updatedCategory);
    });
};


exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, deletedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the category"
            });
        }
        res.json({
            message: `Successful deleted ${deletedCategory.name}`
        });
    });
}