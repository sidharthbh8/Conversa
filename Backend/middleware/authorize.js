const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authorize = async (req, res, next) => {
    try {
        const token = req.cookies.secureToken
        if (!token) return res.status(401).json({ error: "Unauthorized, access denied" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: decoded.id }).select('-password')
        if (!user) {
            return res.status(401).json({ error: "Unauthorized, access denied" })
        }
        req.user = user
        
        next()
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: "Server Error" })
    }
}

module.exports = authorize;