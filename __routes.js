const app = require('./___server')

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/typography', function(req, res) {
  res.render('typography-sample')
})

module.exports = app
