const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-rv-router');
const userRouter = require('../users/users-router');

const server = express();

server.use(express.json());
server.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' ? 'https://heroku.com' : 'http://localhost:4500',
}));
server.use(helmet());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send("IT's Alive!")
})

module.exports = server;