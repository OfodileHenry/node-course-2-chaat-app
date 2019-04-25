var socket = io();
socket.on("connect", function(){
  console.log("Connected to the server!");
  socket.emit("createMessage",{
    from:"Henry",
    text:"Yes, works absolutely!"
  });
  // socket.emit("createEmail",{
  //   to:"henryofodile@gmail.com",
  //   text:"Yes lord! I receive with open hands."
  // });
});
socket.on("disconnect",function(){
  console.log("Server has been disconnected!");
});

socket.on("newEmail", function(email){
  console.log("You have a new email, please attend to accordingly!",email);
})
