const path = require('path')
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser');
const { app, httpServer } = require('./socket/socket');

const ___dirname = path.resolve()

app.use(express.json())
app.use(cors({
    origin: 'https://conversa-vdvh.onrender.com',
    credentials: true
}))
app.use(cookieParser())
app.use(authRoutes)
app.use(messageRoutes)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(process.cwd(), '/frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/frontend/dist/index.html'))
})
const port = process.env.PORT || 5000;

httpServer.listen(port, ()=> {
    require('./db/mongoose')
    console.log(`Server is running at port ${port}`);
})