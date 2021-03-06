// Installing all the dependencies
const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("hbs");
require("dotenv").config();

// connecting to the database
require("./model/connect.js")

// initialisation 
const router = express.Router()
const app = express();

// basic setup 
app.set('view engine', "hbs");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//port 
const port = process.env.PORT || 3000;


//open routes import 
const openRoutes = require("./routes/openRoutes.js");
app.use("/", openRoutes);

//auth routes import 
const authRoutes = require("./routes/auth.js");
app.use("/auth", authRoutes)


//protected routes 
const middleware = require("./model/middleware.js");
app.use(middleware.session);

//protected routes (with JSON web token)
const protectedRoutes = require("./routes/protected.js");
app.use("/auth/secure", protectedRoutes);

// script to run the server
app.listen(port, () => {
    console.log(`Server is up at ${port}`);
} )


