const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
// app.use(bodyParser.json());

app.post('/login', (req, res) => {
  console.log(req.body)
  res.send('works fine !')
})

app.listen(9000, () => console.log('server running and listenning on port 9000'))