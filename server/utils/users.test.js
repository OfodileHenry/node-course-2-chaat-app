const expect = require("expect");

const {Users} = require("./users");

describe("Users",()=>{
  var users;
  beforeEach(()=>{
    users = new Users()
    users.users[{
      id:"1",
      name:"Henry",
      room:"3cs"
    },{
      id:"2",
      name:"Michael",
      room:"3csimple"
    },{
      id:"3",
      name:"Blessing",
      room:"3cs"
    }]
  })
  it("it should add new user",()=>{
    var users = new Users();
    var user = {
      id:"123",
      name:"Henry",
      room:"InterSpecial"
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  })
  it("should remove a user",()=>{
    var userId = "1";
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2)
  })
  it("should not remove a user",()=>{
    var userId = "99";
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3)
  })

  it("should find user",()=>{
    var userId = "2",
    var user = users.getUser(userId);
    expect(user.id).toBe(userId)
  })

  it("should not find user",()=>{
    var userId = "99"
    var user = users.getUser(userId);
    expect(user).toNotExist();
  })
  it("it should return names for the 3cs course",()=>{
    var userList = users.getUserList("3cs");
    expect(userList).toEqual(["Henry","Blessing"])
  })
  it("it should return names for 3csimple course",()=>{
    var userList = users.getUserList("3csimple");
    expect(userList).toEqual(["Michael"])
  })
})
