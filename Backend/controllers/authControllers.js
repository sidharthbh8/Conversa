const User = require('../models/userModel')
const jdenticon = require('jdenticon')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

const login = async (req, res) => {
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const token = generateToken(user._id, res);
        await user.save();
		res.status(200).json({...user, token: token});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}

}

const logout = async (req, res) => {
    try {
        res.clearCookie('secureToken')
        res.status(200).json({ message: "Logged out successfully" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "Username already exists, try another one" })
        }

        const hashedPassword = await bcrypt.hash(password, 8)
        const profilePic = jdenticon.toPng(`${username}`, 200);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            profilePic,
            gender
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({ ...newUser })

        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = { signup, login, logout }