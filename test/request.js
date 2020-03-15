const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const privateKey = fs.readFileSync('./src/key/private.key', 'utf8')
const publicKey = fs.readFileSync('./src/key/public.key', 'utf8')

fetch('http://localhost:9000/authentication', {
  method: "post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: "email=omar.djelassi@gmail.com&password=coucou"
})
.then(res => {
  console.log('---------- HEADERS ----------')
  console.log(res.headers.raw())
  console.log('-----------------------------')
  return res.json()
})
.then(data => {
  console.log(data)
  console.log('-----------------------------')
  let token = data.token
  console.log('verify: ',jwt.verify(token, publicKey, {algorithm: 'RS256'}))
  console.log('-----------------------------')
  let decoded = jwt.decode(token, { complete: true })
  console.log('header: ', decoded.header)
})


