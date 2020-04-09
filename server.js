const express = require('express');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const logger = require('./middleware/logger');


const server = express();

//server.use(logger);

server.use(express.json());
server.use('/api/users', logger, userRouter)
server.use('/api/posts', logger, postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware



module.exports = server;
