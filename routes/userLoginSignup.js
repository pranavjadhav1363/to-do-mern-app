const express = require('express');
require('dotenv').config()

const router = express.Router();
const jwt = require('jsonwebtoken');
PRIVATE_KEY = process.env.PRIVATE_KEY
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/UserSchema');





router.post('/createuser', async (req, res) => {
    let success = false
    try {
        const userexist = await User.findOne({ email: req.body.email });
        if (userexist) {
            return res.status(400).json({ success: success, err: "E-mail already in use" })



        }
        const saltRounds = await bcrypt.genSalt(10);

        const secpass = await bcrypt.hash(req.body.password, saltRounds)
        const newuser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })
        if (newuser) {
            const jwtdata = await {
                user: {
                    id: newuser._id
                }
            }
            const jwttoken = await jwt.sign(jwtdata, PRIVATE_KEY)
            // localStorage.setItem('token', jwttoken)
            success = true
            return res.status(200).json({ success: success, token: jwttoken })
        } else {
            return res.status(400).json({ success: success, err: "Failed To Create Account" })

        }
    } catch (error) {
        success = false
        console.log(error)
        return res.status(400).json({ sucess: success, err: error.message })


    }
})


router.post('/login', async (req, res) => {
    let success = false
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const comparepassword = await bcrypt.compare(req.body.password, user.password)

            if (comparepassword) {
                const jwtdata = await {
                    user: {
                        id: user._id
                    }
                }
                const jwttoken = await jwt.sign(jwtdata, PRIVATE_KEY)
                // localStorage.setItem('token', jwttoken)
                success = true
                return res.status(200).json({ success: success, token: jwttoken })
            } else {
                success = false
                return res.status(400).json({ success: success, err: "Use Proper Login Credentials" })

            }
        } else {
            success = false
            return res.status(400).json({ success: success, err: "Use Proper Login Credentials" })

        }

    } catch (error) {
        success = false

        return res.send(400).json({ success: success, err: error.message })

    }
})

module.exports = router 