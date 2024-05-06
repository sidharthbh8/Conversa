const { getReceiverSocketId, io } = require("../socket/socket");
const Conversation = require("../models/convoModel");
const Message = require("../models/messageModel");

const sendMessage = async (req, res) =>{
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await conversation.save();
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId)[
            io.to(receiverSocketId).emit('getMessage', newMessage)
        ]

        res.status(200).json(newMessage);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getMessage = async (req, res) =>{
    try {
        const {id: userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate('messages')
        if(!conversation){
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

module.exports = { sendMessage, getMessage }