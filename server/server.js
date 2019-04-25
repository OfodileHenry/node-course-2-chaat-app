const path = require("path");
const http = require("http");
const express = require("express");
var socketIO = require("socket.io");
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
const server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
// var socket = io();
io.on("connection",(socket)=>{
  console.log("new user connected!");
});

io.emit("newMessage",{
  from:"Henry",
  message:"Hey there,right on point!",
  completedAt:123123
})
 // io.emit("newEmail",{
 //   from: "God@father.com",
 //   message:"Son Do you know that your worries could be resolved?I would fix it!",
 //   createdAt:123
 // });

 io.on("createMessage",(message)=>{
   console.log("createMessage",message);
 })

 // io.on("createEmail",(newEmail)=>{
 //   console.log("createEmail",newEmail)
 // })
  io.on("disconnect",()=>{
    console.log("User was disconnected");
  });
server.listen(3000, ()=>{
  console.log(`Server, now running up on port ${port}!`)
});
