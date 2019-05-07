const router = require("express").Router();
// aadhar import for admin 


router.get("/private", (request, response) => {
    response.send("This is a private page")
})

router.post("/admin/saveData", (request, response) => {
    if ( request.decode.username == "satinj" || request.decode.username == "nikhils" || request.decode.username == "muskanr"){
        // process form aadhar database
    }
})

module.exports = router;