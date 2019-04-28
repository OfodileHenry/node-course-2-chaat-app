const path = require("path");
const http = require("http");
const express = require("express");
var socketIO = require("socket.io");
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
const{generateMessage,generateLocationMessage} = require("./utils/message")
const {isRealString} = require("./utils/validation")
const{Users} = require("./utils/users")
// var socket = io.connect('http://localhost:3000');
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));
// var socket = io();
io.on("connection",(socket)=>{
  console.log("new user connected!");

//


socket.on("join",(params,callback)=>{
  if(!isRealString(params.name) || !isRealString(params.room)){
    return callback("Name and Room name are required!")
  }


  socket.join(params.room);
  users.removeUser(socket.id)
  users.addUser(socket.id,params.name,params.room);
  io.to(params.room).emit("updateUserList",users.getUserList(params.room))
  socket.emit("newMessage",generateMessage("Admin","Welcome to the chat App"))
  //
  socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} just joined in!`))
  callback()

})
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

 socket.on("createMessage",(message,callback)=>{
   console.log("createMessage",message);
   io.emit("newMessage",generateMessage(message.from,message.text))
   callback()
 });

 socket.on("createLocationMessage",(coords)=>{
   io.emit("newLocationMessage",generateLocationMessage("Admin",coords.latitude,coords.longitude))
 })

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
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit("updateUserList",users.getUserList(user.room))
      io.to(user.room).emit("newMessage",generateMessage("Admin",`${user.name} just left the  group`))
    }
  });
});
server.listen(3000, ()=>{
  console.log(`Server, now running up on port ${port}!`)
});
