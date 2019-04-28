// class Person{
//   constructor(name,age){
//     this.name = name;
//     this.age = age;
// }
// getUserDescription(){
//   return (`${this.name} is ${this.age} this coming july!`)
// }
// }
// var me = new Person("Henry",20);
// var description = me.getUserDescription();
// console.log(description);
// console.log("this.name",me.name)
// console.log("this.age",me.age)

class Users{
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    // var user = this.users.filter((user)=>user.id === id)[0];
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user)=>user.id !== id)
    }
  }
  getUser(id){
    return this.users.filter((user)=>user.id === id)[0];
  }
  getUserList(room){
    var users = this.users.filter((user)=>{
      return user.room === room;
    })
    var namesArray = users.map((user)=> user.name);
    return namesArray;
  }
}

module.exports = {Users}
