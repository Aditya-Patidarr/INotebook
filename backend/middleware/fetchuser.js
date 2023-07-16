const jwt = require("jsonwebtoken");
const JWT_SECRET = "Thisisasecret$password";

const fetchuser = (req,res,next)=>{
    const token = req.header('authToken');
    if(!token){
        res.status(401).send("Authenticate using a valid Token");
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user; 
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid Authentication token");
    }
}

module.exports = fetchuser ;