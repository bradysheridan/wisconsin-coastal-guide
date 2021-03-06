var fs = require('fs')
var request = require('request')

function download(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log('content-type:', res.headers['content-type'])
    console.log('content-length:', res.headers['content-length'])
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}

// usage example:
// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function() {
//   console.log('done')
// })

module.exports = download
