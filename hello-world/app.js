const os = require('os');
const fs = require('fs');
const userData = require('./user');

console.log(userData);
console.log(userData.user.firstName);

let user = os.userInfo();
let platform = os.platform();

let date = new Date();

let message = `The user ${user.username} started app at ${date}\n`;

if(userData.addLog()) {
  fs.appendFile('hello.txt', message, (err) => {
    if(err) {
      console.log('error');
    }
  });
}
