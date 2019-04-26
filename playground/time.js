const moment = require("moment");

// var date = new Date()
//
// console.log(date.getMonth());


// date.add(100,"year").subtract(9,"months");

// console.log(date.format("MMMM Do, YYYY"));
// var createdAt = 1234;
// var date = moment();
// console.log(date.format("h:mm a"));

var someTimeStamp = moment().valueOf()
console.log(someTimeStamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format("h:mm a"));
