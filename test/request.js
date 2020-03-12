const fetch = require('node-fetch')

fetch('http://localhost:9000/login', {
  body: "email=test@example.com&password=pw",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  method: "post"}).then(res => console.log(res))
