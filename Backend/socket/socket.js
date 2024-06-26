const { Server } = require('socket.io')
const http = require('http');
const express = require('express');
const Message = require('../models/messageModel');
const Conversation = require('../models/convoModel');

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
})

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {} // {userId: socketId}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId
    if(userId !== undefined) {
        userSocketMap[userId] = socket.id
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap))


    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

module.exports = { app, httpServer, io, getReceiverSocketId }