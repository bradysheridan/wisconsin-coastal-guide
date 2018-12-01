var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-marinas.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      return {
        "type": "Feature",
        "properties": {
          "name": d.properties.Name,
          "description": d.properties.description,
          "phone": d.properties.Phone,
          "link": {
            "text": d.properties.URLtext,
            "href": d.properties.website
          },
          "address": {
            "street": d.properties.Address,
            "zip": d.properties.ZipCode,
            "city": d.properties.City
          }
        },
        "geometry": {
          "type": "Point",
          "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
        }
      }
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-marinas.json', json, 'utf8', function(err) {
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
        "Name": "Apostle Islands Marina",
        "description": "Over 135 slips, provides gasoline, diesel, electricity, pump-out, ice, restrooms and showers. 30-ton Travelift, complete Rigging Service Center.",
        "timestamp": null,
        "begin": null,
        "end": null,
        "altitudeMode": null,
        "tessellate": -1,
        "extrude": 0,
        "visibility": -1,
        "drawOrder": null,
        "icon": null,
        "snippet": "",
        "TemplateName": "allinfo",
        "Title": "Apostle Islands Marina",
        "Address": "South 1st Street",
        "City": "Bayfield",
        "ZipCode": "54814",
        "Phone": "715-779-5661",
        "Website": "www.apostleislandsmarina.net",
        "URLtext": "apostleislandsmarina.net",
        "Description2": null,
        "ge4x_1": "\"\/><!--",
        "ge4x_2": "-->",
        "ge4x_3": "<!--"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ -90.81416, 46.80951, 0.0 ]
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
        "name": "Apostle Islands Marina",
        "description": "Over 135 slips, provides gasoline, diesel, electricity, pump-out, ice, restrooms and showers. 30-ton Travelift, complete Rigging Service Center.",
        "website": "www.apostleislandsmarina.net",
        "phone": "715-779-5661",
        "address": {
          "street": "South 1st Street",
          "zip": "54814",
          "city": "Bayfield"
        }
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-90.676217893085692, 46.530806339153649]
      }
    }
  ]
}
