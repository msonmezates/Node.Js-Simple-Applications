const os = require('os');

const user = os.userInfo();

console.log(user.username);

const platform = os.platform();

console.log(platform);
