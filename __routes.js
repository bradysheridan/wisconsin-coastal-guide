const app = require('./___server')
const crawl = require('./helpers/crawl')
const fs = require('fs')
const Papa = require('papaparse')
const _ = require('lodash')
const request = require('request')
const showdown = require('showdown'),
      converter = new showdown.Converter()

// async request function
const asyncRequest = (url) => new Promise((resolve, reject) => {
  let req = request(url, (err, response, body) => {
    if (err) return reject(err, response, body)
    resolve(body)
  })
})

// converts all urls into req promises; fetches all data; returns data
const getParallel = async function(urls) {
  try {
    let data = await Promise.all(urls.map(asyncRequest))
    return data
  } catch (err) {
    console.log(err)
  }
}

// GET endpoints for csvs
const sheets = {
  'wcg-beaches.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8Oar8w77GSwRhN4Sqwgw_I-1Ynut3RWoCdgAM5Oj2UoPA8fZMW6fJaFED9NDTPlrtZRrfMqCBJ05J/pub?gid=874119708&single=true&output=csv',
  'wcg-boat-access.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqdyeIFJTrB0H7QSnyfnx7rv7hvK6uPRUqbz7tjPTfSZZmv24NVt6o9Vz8nU-Zz3niPucbfzOk-xTK/pub?gid=1327917026&single=true&output=csv',
  'wcg-historic-ls.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRcL24JZ4uTOnP_NBTvUgsL0-6F_LhfKqLR9eknafSckq2wMJw8c81FVzmgz7hgscx8j5KavWUB7h6H/pub?gid=677056399&single=true&output=csv',
  'wcg-lighthouses.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTD_tRucBDwF42mVRF6ChKO7AAsO6h6sRnE2p3RQsPtIZNJQSy_940bmLWdt7xPiP3M-7Q1MkO_xYyf/pub?gid=1745624174&single=true&output=csv',
  'wcg-marinas.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9ujlm11V2s4hqc483K2G0mVrDZOOIEDVN0mE_V8qdS1u_u0C7fgEyUjLGWKfRuDxXrNCtfHp-Sy2L/pub?gid=1101203369&single=true&output=csv',
  'wcg-maritime-geocaches.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSbXgHS7g0yRkzg01UeBD4frthDwV-JOwIm86SladBXrUZK7d1_M25954ocGNZgnGkNcq7azJH_Mrw/pub?gid=180495887&single=true&output=csv',
  'wcg-nature-centers.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTWorEQ3LX8AhPZcZPscRSJ5RyzTsQolexZ4w20JtGxABshwN18YCwFe3PSPlWjZkn6awWdSoj18DnD/pub?gid=617973495&single=true&output=csv',
  'wcg-panoramas.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRMLHo8XB_-5bpI7T1etPr3OPyZpnx7jp7y7ZFZdSq2qQZ6pO8kBZqyQgDsTAJN6lSDbT2cxFcuE6iU/pub?gid=1376908578&single=true&output=csv',
  'wcg-images.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=1441119624&single=true&output=csv',
  'wcg-parks.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdkxXLHs6sPWu1iCvYQyXYU-BWAunBsXm-l-EINnRIivtMGHlHcWUC2f9wZ32nvIpo_Gm5Dj4PMPwU/pub?gid=1599803602&single=true&output=csv',
  'wcg-shipwrecks.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRT7-Sxwzf5dRPe1--kN-P09r9xBY_62yVqn-BlGKt545Em6D8XbfOKYoe-eJHPuOcMaDcFgv_tIvRF/pub?gid=2146335440&single=true&output=csv',
  'wcg-sna.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdkxXLHs6sPWu1iCvYQyXYU-BWAunBsXm-l-EINnRIivtMGHlHcWUC2f9wZ32nvIpo_Gm5Dj4PMPwU/pub?gid=1599803602&single=true&output=csv',
  'wcg-stories.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYy9ii5pftMU4IBxVaMeun6LISK00KPVcw1upKHwgonbkvaoqVA0VqsKN1ODql6LqmvZQCFzBeDigA/pub?gid=329553682&single=true&output=csv',
}

// local filepaths for jsons
const jsonFiles = [
  './data/json/wcg-byways.json',
  './data/json/wcg-glct-route-lake-michigan.json',
  './data/json/wcg-glct-route-lake-superior.json',
  './data/json/wcg-rustic-roads.json',
]

// parse csv string into feature collection geojson
const parseCSV = (str, sheetName) => {
  let parsed = Papa.parse(str, {
      delimiter: ",",
      transform: (v) => v.replace(/"/g, '\\"')
    }),
    headers = parsed.data.splice(0, 1)[0].map((str) => str.replace(/\//g, '.'))

  if (parsed.errors.length > 0) {
    console.log(parsed.errors)
  }

  let features = parsed.data.map((vals, i) => {
    let o = {}
    vals.forEach((val, i) => _.set(o, headers[i], val))
    _.set(o, 'properties.fid', `${sheetName}-${i}`)
    return o
  })

  return {
    features,
    type: "FeatureCollection"
  }
}

app.get('/', async function(req, res) {
  let data = {}

  // add locally hosted jsons to data
  jsonFiles.forEach((filepath) => data[filepath.split('/').pop()] = require(filepath))

  // add google spreadsheet csvs to data
  let sheetNames = Object.keys(sheets)
  let sheetURLs = sheetNames.map((sheetName) => sheets[sheetName])
  let sheetCSVs = await getParallel(sheetURLs)
  sheetCSVs.forEach((str, i) => data[sheetNames[i]] = parseCSV(str, sheetNames[i]))

  res.render('index', { data: JSON.stringify(data) })
})

app.get('/about', async function(req, res) {
  const footerContent = await crawl({
    pathRelToRoot: './public/assets/md',
    validExtensions: '.md',
    preprocessors: [
      (data) => converter.makeHtml(data)
    ]
  })

  res.render('about', { footerContent })
})

app.get('/typography', function(req, res) {
  res.render('typography-sample')
})

module.exports = app
