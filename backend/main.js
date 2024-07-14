const express = require("express");
const { connectMongoDb } = require("./databaseConnect.js");
const landingPageRoutes = require("./routes/notlogin.js");
const { tokenAuthentication } = require('./middlewares/authenticate.js');
const afterloginRoutes = require("./routes/afterLogin.js");

const http = require('http');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const { Server } = require('socket.io');
const {Message} = require('./models/message');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

io.on('connection', (socket) => {
    console.log(`socket ${socket.id} is connected !!!`);
  socket.on("join chat", (room) => {
    console.log("Join chat room:", room);
    if (room) {
      socket.join(room);
    }
  });

  socket.on("send message", async (chatId) => {
    try {
      console.log("Chat ID received:", chatId);
      const allMsg = await Message.find({ chatId: chatId })
      io.to(chatId).emit("message received", allMsg);
    } catch (error) {
      console.error("Error finding message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} is disconnected `);
  });
});

const port = 4000;
const url = process.env.mongourl;

server.listen(port, (req, res) => {
  console.log(`server is connected at port: ${port}`);
});

app.use(express.json({}));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

connectMongoDb(url);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'redirect')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/", landingPageRoutes);
app.use("/", tokenAuthentication, afterloginRoutes);
