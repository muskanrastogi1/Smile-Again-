const router = require("express").Router();
const jwt = require("jsonwebtoken");
const preUserProfile = require("../model/model.js").preUserProfile;
const userProfile = require("../model/model.js").userProfile;
const helpers = require("../model/helpers.js");
const parser = require("../model/profilePicture.js").profilePicture;
const uidGenerator = require("uid-generator");
const uidgen = new uidGenerator();


// request --> signup page --> data 

router.post("/signup", (request, response) => {

    if (!helpers.emailValidate(request.body.email)){
        console.log("There was error validating your email id")
        response.send("There was error validating your email id")
    } else {

        let token = uidgen.generateSync();
        console.log(token);
        let profile = new preUserProfile({
            FIRSTNAME : request.body.firstname,
            LASTNAME : request.body.lastname,
            EMAIL : request.body.email,
            USERNAME : request.body.username,
            PASSWORD : helpers.hashAndReturn(request.body.password),
            TOKEN : token
        })
    
        profile.save((err, data) => {
            if (err){
                if (err.code === 11000){
                    console.log("The given email id is already registered with us")
                    response.send("The given email id is already registered with us")
                } else {
                    console.log("There was some error saving the profile details", err)
                    response.send("There was some error signing you up :<")
                }
            } else {
                console.log("preProfile saved in the database")
                response.render("pictureUpload.hbs" , {
                    username : request.body.username,
                    token : token
                });
            }
        })

    }
})




router.post("/login",  (request, response) => {
    
    userProfile.findOne({
        USERNAME : request.body.username.trim()
    }, (err, data) => {
        if (err) {
            console.log("There was error fetching the details", err)
        } else if (data == null || data == undefined){
            console.log("No such user exist try signing up first")
            response.send("No such user exist try signing up first")
        }
        else {
            if ((helpers.passwordAuth(data.PASSWORD, request.body.password))){
                const payload = {"username" : request.body.username};
                let token = jwt.sign(payload, process.env.SECRET);
                response.cookie('sessionJWT', token, { httpOnly: true});
                console.log("Success, the password matched successfully")
                response.render("personal.hbs", {
                    name : data.FIRSTNAME,
                    link : data.PICTUREURL
                })
            }
            else {
                console.log("The password didn't matched")
                response.send("The password didn't matched")
            }
        }
    })

})

router.post("/signup/submit/q*", parser.single("profilePicture"), (request, response) => {
    console.log(request.query.username)
    preUserProfile.find({
        USERNAME : request.query.username,
        TOKEN : request.query.token
    })
    .then( data => {
        console.log(data)
        if (data[0] != undefined || data[0] != null || data[0] == []){


            let profile = new userProfile({
                FIRSTNAME : data[0].FIRSTNAME,
                LASTNAME : data[0].LASTNAME,
                EMAIL : data[0].EMAIL,
                USERNAME : data[0].USERNAME,
                PASSWORD : data[0].PASSWORD,
                PICTUREURL : request.file.url,
                PICTUREID : request.file.public_id
            })

            profile.save((err, data) => {
                if (err) {
                    console.log("There was some error registering you after uploading image", err);
                    response.send("The user seems to be already registered with us, try using somw other email id or username ");
                }
                else {
                    preUserProfile
                    .findOneAndRemove({
                        USERNAME : request.query.username
                    })
                    .then(res => {
                        console.log("Successfully removed from pre user profile", res)
                        console.log("The data was successfully saved in the main user profile");
                        response.render("registerSuccess.hbs");
                    })
                    .catch(err => {
                        console.error("There was some error", err)
                        response.send("There was error removing from preUserProfile while saving data ")
                    })

     
                }
            })

        }
        else {
            preUserProfile
            .findOneAndRemove({
                USERNAME : request.query.username
            })
            .then(res => {
                console.log("Successfully removed from pre user profile", res);
                response.send("There was some error uploading your picture try signing in again")
            })
            .catch(err => {
                console.error("There was some error removing from prePrfileuser", err)
                response.send("There was some error uploading your picture try signing in again")

            })
        }

    })
});

module.exports = router;