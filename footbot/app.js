const fs = require('fs');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'name', type: String },
  { name: 'order', type: String },
  { name: 'payment', type: Number },
  { name: 'exit', type: Boolean }
];

const options = commandLineArgs(optionDefinitions);

let getJson = fs.readFileSync('db.json');

let data = JSON.parse(getJson);

const saveData = (newData) => {
  let toString = JSON.stringify(newData);
  fs.writeFileSync('db.json', toString);
};

if(options.name) {
  data.name = options.name;
  console.log(`Hello ${options.name}, we are serving Pizza, Pasta and Salad. Please choose one:`);

  saveData(data);

} else if(options.order) {
  data.order = options.order;
  console.log(`That would be $25.`);
  saveData(data);
} else if(options.payment) {
  data.payment = options.payment;
  console.log(`Your change is ${ options.payment - 25 }. Please type --exit to get the order`);
  saveData(data);
} else if(options.exit) {
  console.log(data);
  console.log('Thanks for your order!');

  data.name = '';
  data.order = '';
  data.payment = '';
  saveData(data);
} else {
  console.log('Hello, please enter your name:');
}
