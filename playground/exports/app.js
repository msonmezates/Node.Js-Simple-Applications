const message = require('./message');

message();
message.message1x();

//One way of doing this:
// const message2 = require('./message2').message2x;
// message2();

//Another way:
const {message2x} = require('./message2');
message2x();

const whatever = require('./message3');

whatever.message3();
whatever.message3x();

const message4 = require('./message4');
console.log(message4.message);
