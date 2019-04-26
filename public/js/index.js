var socket = io();
// var socket = io.connect('http://localhost:3000');
socket.on("connect", function(){
  console.log("Connected to the server!");
  // socket.emit("createMessage",{
  //   from:"Henry",
  //   text:"Yes, works absolutely!"
  // });
  // socket.emit("createEmail",{
  //   to:"henryofodile@gmail.com",
  //   text:"Yes lord! I receive with open hands."
  // });
});

socket.on("newMessage",function(message){
  // console.log("New User available",message)
  var formattedTime = moment(message.createdAt).format("h:mm a")
  var li = jQuery("<li></li>");
  li.text(`${message.from} ${formattedTime}: ${message.text}`)

  jQuery("#messages").append(li);
})

socket.on("newLocationMessage",function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a")
  var li = jQuery("<li></li>")
  var a = jQuery("<a target='_blank'>My Current Location</a>");
  li.text(`${message.from} ${formattedTime}:`);
  a.attr("href",message.url);
  li.append(a);
  jQuery("#messages").append(li);
})

socket.emit("createMessage",{
  from:"The Father of light -The client",
  text:"How are you doing today Henry"
},function(server_data){
  console.log("Got it!", server_data)
})

var messageTextbox = jQuery("[name=message]");
jQuery("#message-form").on("submit",function(e){
  e.preventDefault();
  socket.emit("createMessage",{
    from:"Henry",
    text:messageTextbox.val()
  },function(){
    messageTextbox.val("")

  })

})
var locationButton = jQuery("#send_location");
locationButton.on("click",function(){
  if(!navigator.geolocation){
    return alert("Geolocation not supported by your browser");
  }
  locationButton.attr("disabled","disabled").text("Sending Location...");
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr("disabled").text("Send Location");
    socket.emit("createLocationMessage",{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
    console.log(position);
  },function(){
    locationButton.removeAttr("disabled").text("Send Location");
    alert("unable to fetch location");
  });
});

socket.on("disconnect",function(){
  console.log("Server has been disconnected!");
});

// socket.on("newEmail", function(email){
//   console.log("You have a new email, please attend to accordingly!",email);
// })
