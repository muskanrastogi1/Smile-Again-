const mongoose = require("mongoose");

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


module.exports.preUserProfile = mongoose.model("preUserProfile", preUserProfile);
module.exports.userProfile = mongoose.model("userProfile", userProfile);