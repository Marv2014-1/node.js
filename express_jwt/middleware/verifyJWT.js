const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    // check if the request has the authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    // the token if formated as a string, thus we must extract the token
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        //forbid user from accessing the route if the token is invalid
        if (err) return res.sendStatus(403); //invalid token
        req.user = decoded.username;
        next();
    });
};

module.exports = verifyJWT;
