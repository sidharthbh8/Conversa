const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email Address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6 || value==='password'){
                throw new Error('Password must be greater than 6 characters and must not be the word "password"')
            }
        }
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6 || value==='password'){
                throw new Error('Password must be greater than 6 characters and must not be the word "password"')
            }
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "others"],
    },
    profilePic: {
        type: Buffer,
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email,})
    if(!user){
        throw new Error('Incorrect Email Address')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Incorrect password')
    }
    return user
}

const User = mongoose.model('user', userSchema)
module.exports = User