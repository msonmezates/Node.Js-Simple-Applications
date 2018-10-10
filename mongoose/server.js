const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:23456/App', { useNewUrlParser: true });

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  avail: Boolean
});

const Car = mongoose.model('Car', carSchema);

// const addCar = new Car({
//   brand: "Ford",
//   model: "Focus",
//   year: 2000,
//   avail: true
// })

// addCar.save((err, doc) => {
//   if(err) console.log(err);
//   console.log(doc)
// })

// GETTING DATA
// Find by properties
// Car.find({brand: 'Ford'}, (err, doc) => {
//   if(err) console.log(err)
//   console.log(doc)
// })

// Find one item
// Car.findOne({brand:"Nissan"}, (err, doc) => {
//   if(err) console.log(err);
//   console.log(doc)
// })

// Find by id
// Car.findById("5bbdfad456c7940e6d9078bd", (err, doc) => {
//   if(err) console.log(err)
//   console.log(doc)
// })

// REMOVING DATA
// Car.findOneAndDelete({brand:"Nissan"}, (err, doc) => {
//   if(err) console.log(err)
//   console.log(doc)
// })

// Car.findByIdAndDelete("5bbdfabbe35a260e5d1f10c1", (err,doc) => {
//   if(err) console.log(err)
//   console.log(doc)
// })

// Car.deleteMany({brand:"Ford"} ,(err,doc) => {
//   if(err) console.log(err)
//   console.log(doc)
// })

// UPDATING DATA
// Update one by its property
// Car.updateOne({_id:"5bbe0458ec7cf2ab2a757679"}, {
//   $set: {
//     year: 2017
//   }
// }, (err,doc) => {
//   if(err) console.log(err)
//   console.log(doc)
// })

// Update by id
// Car.findByIdAndUpdate('5bbe0458ec7cf2ab2a757679', {
//   $set: {
//     model: 'Jazz'
//   }
// }, {
//   new: true
// }, (err,doc) => {
//   if(err) console.log(err)
//   console.log(doc)
// })

// Another way to update data
Car.findById('5bbe0458ec7cf2ab2a757679', (err,car) => {
  if(err) console.log(err)
  
  car.set({
    brand: 'whatever'
  });
  
  car.save((err,doc) => {
    if(err) console.log(err)
    console.log(doc)
  })

})