const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Thisisasecret$password";
const fetchuser = require('../middleware/fetchuser')

 
router.post( 
    "/createuser",
    body("name", "Username must be atleast three characters").isLength({
        min: 3,
    }),
    body("email", "Invalid email id").isEmail(),
    body("password", "Password must be atleast five characters").isLength({
        min: 5,
    }),
    async (req, res) => {
        const result = validationResult(req);
        let success = false ;
        if (!result.isEmpty()) {
            return res.status(400).json({ success,errors: result.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({success, error: "User with similar email already exists!!" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true ;
            return res.send({ success,authtoken });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error Occurred!!");
        }

        // .then((user)=>res.json(user))
        // .catch((err)=>{
        //     console.log(err);
        //     res.json({message:err.message})
        // })
        // user.save();
    }
);

router.post(
    "/login",
    body("email", "Invalid email id").isEmail(),
    body("password", "Password must be atleast five characters").exists(),
    async (req, res) => {
        const result = validationResult(req);
        let success = false ;
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ success,error: "Please enter correct Login Credentials" });
            }
            const passCheck = await bcrypt.compare(password, user.password);
            if (!passCheck) {
                return res
                    .status(400)
                    .json({success, error: "Please enter correct Login Credentials" });
            }
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true ;
            return res.send({ success,authtoken });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error Occurred!!");
        }
    }
);
router.post("/getuser",fetchuser,async(req,res)=>{
    try {
        const userId = req.user.id ;
        const user = await User.findOne({_id:userId}).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(401).send("Internal Server Error Occurred!!");
    }
})

module.exports = router;
