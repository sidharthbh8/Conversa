const express = require('express');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)
app.use(messageRoutes)
app.use("/api/users", userRoutes)

app.get('/', (req, res) => {
    res.send('hello world')
})

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    require('./db/mongoose')
    console.log(`Server is running at port ${port}`);
})