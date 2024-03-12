const mongoose = require('mongoose')

const convoSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
    }]
}, timestamps = true)

const Conversation = mongoose.model("conversation", convoSchema)

module.exports = Conversation