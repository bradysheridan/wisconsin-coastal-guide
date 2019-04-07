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
  'wcg-beaches.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=561219479&single=true&output=csv',
  'wcg-boat-access.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=279527479&single=true&output=csv',
  'wcg-historic-ls.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=1779523237&single=true&output=csv',
  'wcg-lighthouses.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=1041681149&single=true&output=csv',
  'wcg-marinas.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=1022756501&single=true&output=csv',
  'wcg-maritime-geocaches.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=25232946&single=true&output=csv',
  'wcg-nature-centers.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=1315706149&single=true&output=csv',
  'wcg-panoramas.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=2138478141&single=true&output=csv',
  'wcg-images.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=1441119624&single=true&output=csv',
  'wcg-parks.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=534677022&single=true&output=csv',
  'wcg-shipwrecks.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=861299969&single=true&output=csv',
  'wcg-sna.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=956643503&single=true&output=csv',
  'wcg-stories.csv': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVW4Zjj_Sr5cZUYaFKHs-wjhx_IgrcHuBABNUMlyOpNXCNznHxjkw6UzBE1s98aP3IA2ob1MjhSNM-/pub?gid=1284883090&single=true&output=csv',
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
