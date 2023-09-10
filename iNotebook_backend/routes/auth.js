const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
JWT_SECRET = "junaid123"


//Route1:Create a user using: POST "/api/auth/createuser"
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
],
    async (req, res) => {
        let success = false
        //managing error and bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            //creating user
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true
            res.json({ success, authToken })


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured")
        }
    })

//Route2:Create a user using: POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
],
    async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                success = false
                return res.send(400).json({ error: "Please try to login with correct credentials" })
            }
            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare) {
                success = false
                return res.send(400).json({ success, error: "Please try to login with correct credentials" })
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(payload, JWT_SECRET);
            success = true
            res.json({ authToken, success })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error occured")
        }
    })
//Route3:Get logged in user details: POST "/api/auth/getuser": Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured")
    }
})

module.exports = router

