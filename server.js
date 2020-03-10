const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
const db = require('./db')
const port = 9000

const app = express()

const jwtSecret = Buffer.from('2beee884-53e9-4c16-a936-6056321ee3eb', 'base64')
app.use(cors(), bodyParser.json(), expressJWT({
  secret: jwtSecret,
  credentialsRequired: false
}))

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = db.users.list().find(u => u.email === email)
  if(!(user && user.password === password)) {
    res.sendStatus(401)
    return
  }

  const token = jwt.sign({sub: user.id}, jwtSecret)
  res.send({token})
})

app.listen(port, () => console.log(`server running and listenning on port ${port}`))
