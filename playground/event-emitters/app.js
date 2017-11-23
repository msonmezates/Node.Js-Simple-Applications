const events = require('events');
const eventEmitter = new events.EventEmitter();

const ringBell = () => {
  console.log('ring ring ring');
}

const sayHello = () => {
  console.log("Who's there?");
}

eventEmitter.on('guestHere', ringBell);
eventEmitter.on('guestHere', sayHello);

eventEmitter.on('guestHere', (action) => {
  console.log(action);
});

eventEmitter.emit('guestHere', "It's me your guest");
