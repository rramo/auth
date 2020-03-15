const crypto = require('crypto')
const fs = require('fs')
require('dotenv').config()

// console.log(process.env.ENCRYPTION_PASSPHRASE)

const generate = async () => {
  crypto.generateKeyPair('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      // cipher: 'aes-256-cbc',
      // passphrase: process.env.ENCRYPTION_PASSPHRASE
    }
  }, (err, publicKey, privateKey) => {
    // Handle errors and use the generated key pair.
    if(!err) {
      // console.log(privateKey)
      fs.writeFile('./src/key/private.key', privateKey, 'utf8', (err) => {
        if (err) throw err;
        console.log('The privatekey file has been saved!')
      })
      // console.log(publicKey)
      fs.writeFile('./src/key/public.key', publicKey, 'utf8', (err) => {
        if (err) throw err;
        console.log('The publicKey file has been saved!')
      })
    }
    else {
      console.log("error: ", err)
    }
  })

  // crypto.randomBytes(256, (err, buf) => {
  //   if (err) throw err;
  //   console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
  // });
  // console.log('*****-------------------------------------------*****')
}

generate()