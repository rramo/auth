const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const express = require('express')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
const { db } = require('./src/db')
console.log(db)
console.log(db.store)

const port = 9000

const app = express()

// const jwtSecret = Buffer.from('2beee884-53e9-4c16-a936-6056321ee3eb', 'base64')
const publicKey = fs.readFileSync('./src/key/public.key', 'utf8')
const privateKey = fs.readFileSync('./src/key/private.key', 'utf8')

// application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// application/json
// app.use(bodyParser.json());

console.log(publicKey)

app.use(cors(), bodyParser.urlencoded({extended: true}), bodyParser.json(), expressJWT({
  secret: publicKey,
  credentialsRequired: false
}))

app.post('/login', (req, res) => {
  console.log('body', req.params, req.param)
  const { email, password } = req.body
  console.log('email posted:', email)

  const user = db.users.list().find(u => u.email === email)
  console.log('user:', user)
  if(!(user && user.password === password)) {
    res.sendStatus(401)
    return
  }

  const token = jwt.sign({sub: user.id}, privateKey)
  res.send({token})
})

app.listen(port, () => console.log(`server running and listenning on port ${port}`))
