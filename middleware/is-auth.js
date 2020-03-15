
const fs = require('fs')
const jwt = require('jsonwebtoken')
const publicKey = fs.readFileSync('./src/key/public.key', 'utf8')
const issuer = process.env.ISSUER

const verifyOptions = {
  algorithm: 'RS256',
  expiresIn: '1h',
  issuer
}

module.exports = (req, res, next) => {
  console.log('here in is-auth middleware !!')
  if(req.query && req.query.token) {
    try {
      let token = req.query.token
      let claim = jwt.verify(token, publicKey, verifyOptions)
      req.user = {email: claim.sub}
      next()
    }
    catch(err) {
      console.log('error: ', err)
      res.sendStatus(401)
    }
  }
  else {
    res.sendStatus(401)
  }
}