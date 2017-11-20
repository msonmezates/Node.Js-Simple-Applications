const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'name', type: String },
  { name: 'order', type: String },
  { name: 'payment', type: Number },
  { name: 'exit', type: Boolean }
];

const options = commandLineArgs(optionDefinitions);

if(options.name) {
  console.log(`Hello ${options.name}, we are serving Pizza, Pasta and Salad. Please choose one:`);
} else if(options.order) {
  console.log(`That would be $25.`);
} else if(options.payment) {
  console.log(`Your change is xxx. Please type --exit to get the order`);
} else if(options.exit) {
  console.log('Thanks for your order!');
} else {
  console.log('Hello, please enter your name:');
}
