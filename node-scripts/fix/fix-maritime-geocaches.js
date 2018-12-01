var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-maritime-geocaches.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      return {
        "type": "Feature",
        "properties": {
          "name": d.properties.Name,
          "description": `${d.properties.Paragraph1_Text} ${d.properties.Paragraph2_Text}.`,
          "link": d.properties.Link_URL.replace('\\', ''),
          "code": d.properties.Subtitle
        },
        "geometry": {
          "type": "Point",
          "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
        }
      }
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-maritime-geocaches.json', json, 'utf8', function(err) {
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
        "Name": "Two Rivers’ Lost Lighthouse",
        "description": null,
        "timestamp": null,
        "begin": null,
        "end": null,
        "altitudeMode": null,
        "tessellate": -1,
        "extrude": 0,
        "visibility": -1,
        "drawOrder": null,
        "icon": null,
        "Title": "Two Rivers’ Lost Lighthouse",
        "Subtitle": "GC1PNNY",
        "Paragraph1_Text": "Geocaches that share Wisconsin's maritime history were created by the Wisconsin Historical Society. This geocache was first hidden on:",
        "Paragraph2_Text": "April 7, 2009",
        "Link_URL": "http:\/\/coord.info\/GC1PNNY",
        "Link_Text": "Click here to start your search for this maritime history geocache."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.56225, 44.144366666700002, 0.0]
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
      "properties": {
        "name": "Two Rivers’ Lost Lighthouse",
        "geocacheCode": "GC1PNNY",
        "description": "Geocaches that share Wisconsin's maritime history were created by the Wisconsin Historical Society. This geocache was first hidden on April 7, 2009.",
        "link": "http://coord.info/GC1PNNY"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.56225, 44.144366666700002]
      }
    }
  ]
}
