const jwt = require('jsonwebtoken');

const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    
    })
    res.cookie("secureToken", token,{
        httpOnly: true
    })
    return token;
}

module.exports = generateToken;