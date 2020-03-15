const crypto = require('crypto')
const ciphers = crypto.getCiphers();
ciphers.forEach(c => {
  console.log(c)
});
