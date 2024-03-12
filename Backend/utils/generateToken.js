const jwt = require('jsonwebtoken');

const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET)
    res.cookie('secureToken', token,{
        httpOnly: true,
        sameSite: 'strict',
    })
}

module.exports = generateToken;