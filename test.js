// var users = require('./db').users
// var u = users.get('Bk0lPaGS8')

const uuid = require('uuid').v4
console.log(uuid())

// require('crypto')
// const hmacSHA512 =  require('crypto-js').hmacSHA512
// console.log(hmacSHA512('Message'))

let crypto = require("crypto");

crypto.create

let hmac = require("crypto").createHmac("sha256", "password");

let s = hmac.update("If you love node so much why don't you marry it?")
  .digest("hex");

  console.log(s)

  console.log(hmac.update(s).digest("utf8"))

