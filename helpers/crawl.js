const fs = require('fs')
const path = require('path')
const klaw = require('klaw')

function crawl(params) {
  let {
    pathRelToRoot,
    validExtensions,
    preprocessors
  } = params

  let shouldPreprocess = typeof preprocessors !== 'undefined'
    && Array.isArray(preprocessors)
    && preprocessors.length > 0

  let returnObj = {}

  let crawl = new Promise(async (resolve) => {
    if (fs.existsSync(pathRelToRoot)) {
      klaw(pathRelToRoot)
      .on('data', async (item) => {
        if (
          !item.path.includes('.')
          ||!validExtensions.includes(path.extname(item.path))
        ) return

        let pathBuffer = item.path.split('/')
        let filename = pathBuffer[pathBuffer.length - 1]
        let data = fs.readFileSync(item.path, { encoding: 'utf8' })

        if (shouldPreprocess) {
          for (var i = 0; i < preprocessors.length; i++) {
            let func = preprocessors[i]
            data = func(data)
          }
        }

        returnObj[filename] = data
      })
      .on('error', (e) => {
        console.log(e)
      })
      .on('end', () => {
        resolve(returnObj)
      })
    } else {
      resolve(returnObj)
    }
  })

  return crawl
}

module.exports = crawl
