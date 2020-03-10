const { generateKeyPairSync } = require('crypto')

const {privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',

  }
})


console.log(privateKey)
console.log('*****-------------------------------------------*****')
console.log(publicKey)


console.log('*****-------------------------------------------*****')
const crypto = require('crypto');
crypto.randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});
console.log('*****-------------------------------------------*****')