const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// storage details 
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "smileAgain",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });


module.exports.profilePicture = parser;




