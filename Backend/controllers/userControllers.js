const User = require('../models/userModel')
const getUser = async (req, res) => {
    try {
        const yourself = req.user._id 
        const allUsers = await User.find({_id: { $ne: yourself }})
        res.status(200).json(allUsers)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }   
}

module.exports = { getUser }