const path = require("path");
const http = require("http");
const express = require("express");
var socketIO = require("socket.io");
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
const{generateMessage} = require("./utils/message")
// var socket = io.connect('http://localhost:3000');
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
// var socket = io();
io.on("connection",(socket)=>{
  console.log("new user connected!");

//
socket.emit("newMessage",generateMessage("Admin","Welcome to the chat App"))
//
socket.broadcast.emit("newMessage",generateMessage("Admin","New user just joined in!"))
// io.emit("newMessage",{
//   from:"Henry",
//   message:"Hey there,right on point!",
//   completedAt:123123
// })
 // io.emit("newEmail",{
 //   from: "God@father.com",
 //   message:"Son Do you know that your worries could be resolved?I would fix it!",
 //   createdAt:123
 // });

 socket.on("createMessage",(message)=>{
   console.log("createMessage",message);
   io.emit("newMessage",generateMessage(message.from,message.text))
 });

   // {
   //   from:message.from,
   //   text:message.text,
   //   createdAt:new Date.getTime()
   // })

   // socket.broadcast.emit("newMessage",{
   //   from:message.from,
   //   text:message.text,
   //   createdAt:new Date().getTime()
   // })

 //
 // socket.on("createEmail",(newEmail)=>{
 //   console.log("createEmail",newEmail)
 // });
  socket.on("disconnect",()=>{
    console.log("User was disconnected");
  });
});
server.listen(3000, ()=>{
  console.log(`Server, now running up on port ${port}!`)
});
