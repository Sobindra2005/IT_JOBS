const express = require('express')
const { connectMongoDb } = require("./databaseConnect.js");
const landingPageRoutes = require("./routes/notlogin.js");
const { tokenAuthentication } = require('./middlewares/authenticate.js');
const afterloginRoutes = require("./routes/afterLogin.js");
const { app, io, server } = require('./server.js')
const cmtHanldeRoute = require('./routes/comment.js')

const path = require('path');
require('dotenv').config();
const cors = require('cors');

const { Message } = require('./models/message');
const { Comment } = require('./models/comment.js');
const { Notification } = require('./models/notifications.js');

const url = process.env.mongourl;


app.use(express.json({}));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

const clients = new Map();

io.on('connection', (socket) => {
  console.log('socket id connected ', socket.id)

  socket.on('online', (userId) => {
    clients.set(userId, socket.id);
  })

  console.log(clients)

  socket.on('identify notification', async (receiverId) => {
    console.log('socket event is listened ')
    console.log(receiverId)
    const notifications = await Notification.find({ receiverId: receiverId }).sort({updatedAt: -1 }).exec()
    io.to(clients.get(receiverId)).emit('notifications', notifications)
  })

  socket.on("join chat", (room) => {
    console.log("Join chat room:", room);
    if (room) {
      socket.join(room);
    }
  }
  );

  socket.on('join comment', async (id) => {
    console.log('joined comment room:', id);
    if (id) {
      socket.join(id)
      const allcomments = await Comment.find({ postId: id }).sort({ createdAt: -1 });
      io.to(id).emit('receive intial comment', allcomments);
    }
  })

  socket.on("send comment", async (data) => {
    try {
      console.log('in send comment ')
      const allcomments = await Comment.find({ postId: data.postId }).sort({ createdAt: -1 })
      io.to(data.postId).emit("receive comment", allcomments);
    }
    catch (err) {
      console.log('error ', err)
    }
  })


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
    for (let [userId, socketId] of clients.entries()) {
      if (socketId === socket.id) {
        clients.delete(userId);
        break;
      }
    }
  });
});


connectMongoDb(url);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'redirect')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/", landingPageRoutes);
app.use("/", tokenAuthentication, afterloginRoutes);
app.use('/cmt', tokenAuthentication, cmtHanldeRoute)