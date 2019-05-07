const mongoose = require("mongoose");

// conatins the data after the registration and before image upload 
const preUserProfile = new mongoose.Schema({
    FIRSTNAME : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    LASTNAME : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    EMAIL : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    USERNAME : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    PASSWORD : {
        type : String,
        required : true
    },
    TOKEN : {
        type : String,
        required : true 
    }
}) 

// contains the registeration data after the validation 
const userProfile = new mongoose.Schema({
    FIRSTNAME : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    LASTNAME : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    EMAIL : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    USERNAME : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    PASSWORD : {
        type : String,
        required : true
    },
    PICTUREURL : {
        type : String,
        required : true 
    },
    PICTUREID : {
        type : String,
        required : true
    }
})

// will contain aadhar details 
// will use this to verify the input details 
const adminAadhar = new mongoose.Schema({
    FIRSTNAME : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    LASTNAME : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    ID : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    MOBILE : {
        type : Number,
        required : true,
        trim : true
    }
})


// admin related data 
const admin = mongoose.Schema({
    NAME : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    USERNAME : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    PASSWORD : {
        type : String,
        required : true
    },
    ID : {
        type : Number,
        required : true
    }
})


module.exports.preUserProfile = mongoose.model("preUserProfile", preUserProfile);
module.exports.userProfile = mongoose.model("userProfile", userProfile);
module.exports.adminAadhar = mongoose.model("adminAadhar", adminAadhar);
module.exports.admin = mongoose.model("admin", admin);

