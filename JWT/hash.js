const bcrypt = require('bcrypt')

bcrypt.genSalt(10, (err, salt) => { // 10 means iterate 10 times
  console.log('salt is: ', salt)

  if(err) return next(err)

  bcrypt.hash('test12', salt, (err, hash) => {
    if(err) return next(err)

    console.log('hash is: ', hash)
  })
})