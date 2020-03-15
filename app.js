const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { db } = require('./src/db')
const isAuth = require('./middleware/is-auth')

const privateKey = fs.readFileSync('./src/key/private.key', 'utf8')

app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/authentication', (req, res) => {
  const { email, password } = req.body

  const user = db.users.list().find(u => u.email === email)
  if(!(user && user.password === password)) {
    res.sendStatus(401)
    return
  }
  
  const signOptions = {
    algorithm: 'RS256',
    expiresIn: '1h',
    issuer: process.env.ISSUER
  }
  const token = jwt.sign({sub: user.email}, privateKey, signOptions)
  let url = `/details?token=${token}`
  res.redirect(url)
})

app.get('/details', isAuth, (req, res) => {
  const user = db.users.list().find(u => u.email === req.user.email)
  res.send(`Welcome ${user.lastname}, you're authorized to see this page !`)
})

app.listen(process.env.PORT, () => console.log(`server running and listenning on port ${process.env.PORT}`))
