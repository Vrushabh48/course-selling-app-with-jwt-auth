const jwt = require('jsonwebtoken')
const JWT_SECRET = '123456';
const { User, Admin, Course } = require("../db");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.Authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    try {
        const decodedvalue = jwt.verify(jwtToken,JWT_SECRET);
        if (decodedValue.username) {    
            req.username = decodedValue.username;
            req.randomData = "Adsadsadsadssd";
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch (error) {
        res.json({
            msg: 'user auth error'
        })
    }
}

module.exports = userMiddleware;