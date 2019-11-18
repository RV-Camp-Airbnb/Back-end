const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/auth-rv-middleware');
const authRouter = require('../auth/auth-rv-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

module.exports = server;