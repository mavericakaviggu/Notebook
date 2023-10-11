const jwt = require("jsonwebtoken");

//this is the secret key that you wanna add in token when user logs in
const jwtSecret = "vampyzombie"; //signature used in web token system to authenticate the user

const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }

  try {
    //verifies the token fetched from the request header with the secret key.
    const data = jwt.verify(token, jwtSecret);
    //After verifying the user, the user data will attached to the request.
    req.user = data.user;
    //runs the code present after "fetchuser"
    //this "fetchuser" is called from auth.js
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
