const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); //For data calidation we need to install this
const bcrypt = require("bcryptjs"); //this library is used to add extra protection to the password
//bcrypt provides hash, salt and pepper that is required to enhance password security

//library used for token system for authenticating the user
const jwt = require("jsonwebtoken");

//this is the secret key that you wanna add in token when user logs in
const jwtSecret = "vampyzombie"; //signature used in web token system to authenticate the user

const fetchuser = require("../middleware/fetchUser");

//Create a user using POST "api/auth/createuser".No login require
router.post(
  "/createuser",
  [
    //below are validation rules
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  //whichever code returns a promise you need to use await/async
  async (req, res) => {
    //if ther are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exists already
    try {
      //since findone returns a value(promise ) , we need to use await/async function
      //code to find if there is a user already present in the databse by checking the mail id
      //in this code we have defined email to unique, so no 2 users can have same email id

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //if user is present already in the db, then sen response as status 400
        return res
          .status(400)
          .json({ error: "sorry user with this email already exists " });
      }

      const salt = await bcrypt.genSalt(10); //this line adds extra character at the end of the password
      const secPass = await bcrypt.hash(req.body.password, salt); //this line converts the password into a more complex(hash) thingy
      //So whatever the user puts as password, it get stored in db as comepletelu different,
      //this hash is a one way function, ie hash passowrd generated cannot be reversed to get the original password
      //if the user is not in db, then create the user in the db,
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        //this above code maps the data recieved through request in json format to
        //the respective variable
      });
      //declare a const 'data' and assign the value from the mongoDB generated id(user.id)
      const data = {
        user: {
          id: user.id,
        },
      };

      //generates a token by combining the data and secret key, and return this
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ authToken });

      //below code is for
      //Once the user is created successfulyyy, the user details is sent as response in json format
      //res.json(user)
    } catch (error) {
      //catch emthod if there is any error to handle
      console.error(error.message);
      res.status(500).send("Internal server error");
    }

    //     .then(user => res.json(user))
    //     .catch(err=>{console.log(err)
    // res.json({error:'Please enter a unique value for email',message:err.message})});
  }
);

//authenticating the user using:Post "/api/auth/login". No login required
router.post(
  "/login",
  [
    //below code fetches email and passowrd sent in json format and does validation check using "express-validator" library
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring and assigning the variables comming from the request API sent
    const { email, password } = req.body;
    try {
      //tis code tries to fetch the user from "User" using email as ref from mongodb that we created,
      let user = await User.findOne({ email });
      //if the user doesnt not exists, return status 400 and the below message
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      //comparing password the user sent and the one that is stored in db using bcryptjs
      const passwordCompare = await bcrypt.compare(password, user.password);
      // if passowrd doesnt match, return status 400 and the below message
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      //fetching user id from the database to create a token, since ID is unique
      const data = {
        user: {
          id: user.id,
        },
      };

      //construction of authToken using JWT
      const authToken = jwt.sign(data, jwtSecret);
      //if passowrd and email matches with the credentials in the db , then send authtoken as response
      res.json({ authToken });
    } catch (error) {
      //catches any error
      console.error(error.message);
      res.status(500).send("Internal Server error ");
    }
  }
);

//Get logged in user details Post"api/auth/getUser". Login required
//fetchuser is the middleware we will be using to authenticate the user using the token
//we have created the "fetchuser" seperately as we dont need to hardcode it evrytime to authnticate the user.
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    //fetches every details of the user except password by referring to the userId.
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error ");
  }
});

module.exports = router;
