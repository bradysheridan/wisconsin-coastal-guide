const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

app.set("view engine", "ejs")
app.set('json spaces', 2)
app.set('views', path.join(__dirname, '/public/views'))

app.use(express.static(__dirname + '/public'))

app.listen(port)

console.log(`Wisconsin Coastal Guide is running on localhost:${port}`)

module.exports = app
