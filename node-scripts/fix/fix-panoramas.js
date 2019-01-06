var fs = require('fs')
var download = require('../../helpers/download')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-panoramas.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      var urlBuffer = d.properties.panourl.split('/')
      var htmlFilename = urlBuffer.pop()
      var imgFilename = htmlFilename.split('.')[0] + '.jpg'
      urlBuffer.push('images')
      urlBuffer.push(imgFilename)
      var imgUrl = urlBuffer.join('/')

      // download(imgUrl, `public/assets/images/panoramas/${imgFilename}`, function() {
      //   console.log('Downloaded', imgFilename)
      // })

      return {
        "type": "Feature",
        "properties": {
          "name": d.properties.name,
          "datetime": d.properties.datetime,
          "panoramaURL": d.properties.panourl,
          "img": imgFilename
        },
        "geometry": {
          "type": "Point",
          "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
        }
      }
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-panoramas.json', json, 'utf8', function(err) {
    if (err) throw err
    console.log("The file has been saved!")
  })
}

// source json schema
var json = {
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "id": "wcg-pano-2018-7dec18.1",
      "properties": {
        "ident": 1,
        "lat": 46.706111,
        "long": -92.013516999999993,
        "name": "Wisconsin Point",
        "layer": "360 Panorama - High Res",
        "datetime": "2018-10-13T13:35:44Z",
        "panourl": "http://maps.aqua.wisc.edu/geocatalog/panoramas/douglas-2018/douglas-2018-1.html"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-92.013517, 46.706111]
      },
      "geometry_name": "geom"
    }
  ]
}

// destination json schema
var json = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Wisconsin Point",
        "datetime": "2018-10-13T13:35:44Z",
        "panoramaURL": "http://maps.aqua.wisc.edu/geocatalog/panoramas/douglas-2018/douglas-2018-1.html"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-92.013517, 46.706111]
      }
    }
  ]
}
