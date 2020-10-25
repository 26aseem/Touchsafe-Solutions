const Admin = require("../models/adminpanel");

exports.getAdminById = (req, res, next, id) => {
    Admin.findById(id).exec((err,admin) => {
        if(err || !admin){
            return res.status(400).json({
                error: "No admin was found in the database"
            });
        }

        req.profile = admin;
        next();
    });
};


exports.getAdmin = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encrypt_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.getAllAdmins = (req, res) => {
    Admin.find().exec((err, admins) => {
        if(err || !admins){
            return res.status(400).json({
                error: "NO admins found"
            })
        }
        return res.json(admins);
        
    });

};


exports.updateAdmin = (req, res) => {
    Admin.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err, admin) => {
            if(err || !admin){
                return res.status(400).json({
                    error: "NOT authorised. Update unsuccessful"
                })
            }
            admin.salt = undefined;
            admin.encrypt_password = undefined;
            admin.createdAt = undefined;
            admin.updatedAt = undefined;
            return res.json(admin);
        }
    )
};

