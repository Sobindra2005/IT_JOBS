const { Server } = require('socket.io');
const express = require("express");
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = 4000;

server.listen(port, (req, res) => {
    console.log(`server is connected at port: ${port}`);
});

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'https://it-jobs-chi.vercel.app/',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

module.exports={app,io,server}