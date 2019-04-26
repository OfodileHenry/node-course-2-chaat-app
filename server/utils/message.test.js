const expect = require("expect");

var {generateMessage,generateLocationMessage} = require("./message");

describe("generateMessage",()=>{
  it("should generate correct message object",()=>{
    var from = "Henry";
    var text = "Some definite message";
    var message = generateMessage(from,text);
    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({from,text});
  });
});

describe("generateLocationMessage", ()=>{
  it("should generat correct location message",()=>{
    var from = "Henry";
    var latitude = 11;
    var longitude = 12;
    var url = "https://www.google.com/maps?q=11,12";
    var message = generateLocationMessage(from,latitude,longitude);
    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({from,url});
  })
})
