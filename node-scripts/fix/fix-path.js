var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-byways.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      return {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": d.geometry.coordinates.map((coords) => [coords[0], coords[1]])
        }
      }
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-byways.json', json, 'utf8', function(err) {
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
      "properties": {
        "Name": "-Null-",
        "description": "FEDIRP =  <br \/>FENAME =  <br \/>FETYPE =  <br \/>FEDIRS =  <br \/>DESIG = PRIMARY<br \/>",
        "timestamp": null,
        "begin": null,
        "end": null,
        "altitudeMode": null,
        "tessellate": 1,
        "extrude": 0,
        "visibility": -1,
        "drawOrder": null,
        "icon": null
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [ -86.598402, 41.885531, 0.0 ],
          [ -86.598617, 41.886857, 0.0 ],
          [ -86.599015, 41.887361, 0.0 ],
          [ -86.599168, 41.887818, 0.0 ],
          [ -86.599077, 41.889008, 0.0 ]
        ]
      }
    }
  ]
}

// destination json schema
var json = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-86.598402, 41.885531],
          [-86.598617, 41.886857],
          [-86.599015, 41.887361],
          [-86.599168, 41.887818],
          [-86.599077, 41.889008]
        ]
      }
    }
  ]
}
