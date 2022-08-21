const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("send_posts", (data) => {
    console.log("posts");
    io.emit("receive_posts", data);
  });

  socket.on("send_comments", (data) => {
    console.log("comments");
    io.emit("receive_comments", data);
  });

  socket.on("send_all_users", (data) => {
    console.log("all users");
    io.emit("receive_all_users", data);
  });
  socket.on("send_user", (data) => {
    console.log("user");
    io.emit("receive_user", data);
  });
});

const port = process.env.PORT || 8800;
server.listen(port, () => {
  console.log(`Server is running at port ${port}.`);
});
