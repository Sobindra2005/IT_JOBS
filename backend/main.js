const express=require('express')
const { connectMongoDb } = require("./databaseConnect.js");
const landingPageRoutes = require("./routes/notlogin.js");
const { tokenAuthentication } = require('./middlewares/authenticate.js');
const afterloginRoutes = require("./routes/afterLogin.js");
const {app,io,server} =require('./server.js')

const path = require('path');
require('dotenv').config();
const cors = require('cors');

const { Message } = require('./models/message');
const { Comment } = require('./models/comment.js')

const url = process.env.mongourl;


app.use(express.json({}));

app.use(cors({
  origin: 'https://it-jobs-chi.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));



io.on('connection', (socket) => {

  console.log(`socket ${socket.id} is connected !!!`);

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
