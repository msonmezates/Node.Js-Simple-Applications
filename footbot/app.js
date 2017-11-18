const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'name', type: String },
  { name: 'order', type: String },
  { name: 'payment', type: Number }
];

const options = commandLineArgs(optionDefinitions);

console.log(options);
