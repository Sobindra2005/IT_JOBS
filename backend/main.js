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
const { Message } = require('./models/message');

const app = express();
const server = http.createServer(app);

// Ensure environment variables are loaded
const port = process.env.PORT || 4000;
const url = process.env.mongourl;

// CORS configuration
const corsOptions = {
  origin: 'https://it-jobs-45q7.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Use JSON and URL-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static file serving
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'redirect')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use("/", landingPageRoutes);
app.use("/", tokenAuthentication, afterloginRoutes);

// MongoDB connection
connectMongoDb(url);

// Socket.io setup
const io = new Server(server, {
  pingTimeout: 60000,
  cors: corsOptions,
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
      const allMsg = await Message.find({ chatId: chatId });
      io.to(chatId).emit("message received", allMsg);
    } catch (error) {
      console.error("Error finding message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} is disconnected `);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is connected at port: ${port}`);
});
