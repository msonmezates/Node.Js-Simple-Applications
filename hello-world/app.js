const os = require('os');
const fs = require('fs');

let user = os.userInfo();
let platform = os.platform();

let date = new Date();

let message = `The user ${user.username} started app at ${date}\n`;

fs.appendFile('hello.txt', message, (err) => {
  if(err) {
    console.log('error');
  }
});
