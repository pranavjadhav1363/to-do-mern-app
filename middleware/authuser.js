const jwt = require("jsonwebtoken")
require('dotenv').config()

PRIVATE_KEY = process.env.PRIVATE_KEY


const authuser = async (req, res, next) => {
    let success = false
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(400).json({ success: success, err: "login again" })

        }
        success = true
        const data = await jwt.verify(token, PRIVATE_KEY);
        req.user = data.user


        next()
    } catch (error) {
        success = false
        return res.status(400).json({ success: success, err: error.message })

    }

}



module.exports = authuser