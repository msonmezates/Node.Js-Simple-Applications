const bcrypt = require('bcrypt')
const {MD5} = require('crypto-js') 
const jwt = require('jsonwebtoken')

// bcrypt.genSalt(10, (err, salt) => { // 10 means iterate 10 times
//   console.log('salt is: ', salt)

//   if(err) return next(err)

//   bcrypt.hash('test12', salt, (err, hash) => {
//     if(err) return next(err)

//     console.log('hash is: ', hash)
//   })
// })

// const secret = 'fdsfsfsdfs';
// const secretSalt = "dnkvndfknjv"

// const user = {
//   id:1,
//   token: MD5('password123').toString() + secretSalt
// }

// const receivedToken = '482c811da5d5b4bc6d497ffa98491e38dnkvndfknjv'

// if(receivedToken === user.token) {
//   console.log('move forward')
// }

const id = 1000
const secret = "supersecret"

// const token = jwt.sign(id, secret)
const receivedToken = "eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y"
const decodeToken = jwt.verify(receivedToken, secret)

console.log(decodeToken)
