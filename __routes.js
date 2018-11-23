const app = require('./___server')
const crawl = require('./helpers/crawl')
const showdown = require('showdown'),
      converter = new showdown.Converter()

app.get('/', async function(req, res) {
  const footerContent = await crawl({
    pathRelToRoot: './public/assets/md',
    validExtensions: '.md',
    preprocessors: [
      (data) => converter.makeHtml(data)
    ]
  })

  res.render('index', { footerContent })
})

app.get('/typography', function(req, res) {
  res.render('typography-sample')
})

module.exports = app
