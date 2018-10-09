const {MongoClient} = require('mongodb');
// Connection url
const URL = 'mongodb://localhost:23456';
// Database name
const dbName = 'test';
// Connection using mopngClient
// MongoClient.connect(URL, (err, client) => {
//   if(err) console.log('Error')
//   // Select database by name
//   const testDB = client.db(dbName)
//   console.log('connected to test databse');
//   client.close();
// })

/////////////// DATA INSERTION //////////////

// INSERT ONE DATA
// MongoClient.connect(URL, (err, client) => {
//   if(err) console.log('Error')
//   const testDB = client.db(dbName);
//   testDB.collection('Cars').insertOne({
//     _id: 46,
//     model: "Ford",
//     year: 2018
//   }, (err, res) => {
//     if(err) console.log(`Cannot insert: ${err}`);
//     console.log(res.ops);
//   })

//   console.log('connected to test databse');
//   client.close();
// })

// INSERT MANY
// MongoClient.connect(URL, (err, client) => {
//   if(err) console.log('Error')
//   const testDB = client.db(dbName);
  
//   const cars = [
//     {model:'Toyota',year:2016},
//     {model:'Mazda',year:2018}
//   ];

//   testDB.collection('Cars').insertMany(cars, (err, result) => {
//     if(err) console.log(`Cannot insert: ${err}`);
//     console.log(result.ops)
//   })

//   console.log('connected to test databse');
//   client.close();
// })

// FIND 
// MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
//   if(err) console.log('Error')
//   const testDB = client.db(dbName);
  
//   // testDB.collection('Cars').find().skip(1).limit(2).toArray((err, docs) => {
//   //   if(err) console.log(`Cannot get: ${err}`);
//   //   console.log(docs)
//   // })

//   // Sort by id
//   // sort({'_id':1}) or sort({'_id':-1}) for reverse order
//   testDB.collection('Cars').find().sort({'_id':1}).toArray((err, docs) => {
//     if(err) console.log(`Cannot get: ${err}`);
//     console.log(docs)
//   })

//   console.log('connected to test databse');
//   client.close();
// })

// Find by property
// MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
//   if(err) console.log('Error')
//   const testDB = client.db(dbName);
  
//   testDB.collection('Cars').find({year: 2016}).toArray((err, docs) => {
//     if(err) console.log(`Cannot get: ${err}`);
//     console.log(docs)
//   })

//   console.log('connected to test databse');
//   client.close();
// })

// Find by one property and ignore its other properties
// MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
//   if(err) console.log('Error')
//   const testDB = client.db(dbName);
  
//   testDB.collection('Cars').findOne({year: 2018}, {model:0, _id:0}, (err, doc) => {
//     console.log(doc)
//   })

//   console.log('connected to test databse');
//   client.close();
// })

// DELETE
// MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
//   if(err) console.log('Error')
//   const testDB = client.db(dbName);
  
//   // Delete more than one
//   // testDB.collection('Cars').deleteMany({year: 2018}, (err, doc) => {
//   //   console.log(doc)
//   // })
//   // We can also use promises
//   // testDB.collection('Cars').deleteMany({year: 2016}).then(result => console.log(result))

//   // Delete only one
//   // testDB.collection('Cars').deleteOne({model:'Nissan'}, (err, doc) => console.log(doc))

//   // Find one and delete
//   // testDB.collection('Cars').findOneAndDelete({model: 'Ferrari'}, (err, doc) => console.log(doc))

//   // console.log('connected to test databse');
//   client.close();
// })

// UPDATE 
MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
  if(err) console.log('Error')
  const testDB = client.db(dbName);
  
  // using $set
  // testDB.collection('Cars').findOneAndUpdate({model:'GMC'},{
  //   $set: {
  //     year: 1998
  //   }
  // }, {
  //   returnOriginal: false //this is true by default so it has to be false to update the data
  // }, (err, doc) => console.log(doc))

  // using upsert and increment 
  testDB.collection('Cars').findOneAndUpdate({model:'Acura'},{
    $inc: {
      year:  +2 //increment year by 2
    }
  }, {
    upsert:true
  }, (err, doc) => console.log(doc))

  console.log('connected to test databse');
  client.close();
})