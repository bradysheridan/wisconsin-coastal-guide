var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-boat-access.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      var description = JSON.stringify(d.properties.description)
      var buffer = description.split('<p>')
      var formattedDescription = buffer[1].split('</p>')[0].replace(/\r?\\n/g, "").trim()

      return {
        "type": "Feature",
        "properties": {
          "name": d.properties.Name,
          "description": (formattedDescription) ? formattedDescription : null
        },
        "geometry": {
          "type": "Point",
          "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
        }
      }
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-boat-access.json', json, 'utf8', function(err) {
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
        "Name": "Egg Harbor Municipal Marina",
        "description": "<div class=\"MarkerBanner\">\n      <img src=\"http:\/\/www.aqua.wisc.edu\/glct\/maps\/images\/WCG_banner2.jpg\" alt=\"picture\" \/>\n    <\/div><h2><font color=\"#000099\">Egg Harbor<\/font><\/h2>\n      <p>The Egg Harbor Municipal Marina in Door County has a boat ramp and boarding dock open to the public. Parking is available, and there is a launch fee. For more information call (920) 868-2048\n      <\/p>\n      <hr>\n  <div align=\"center\">\n      <b>Visit the Wisconsin DNR website for additional information about Public Boat Access<\/b>\n      <p>\n      <a href=\"http:\/\/dnr.wi.gov\/topic\/lands\/boataccess\/\">DNR Boat Access<\/a><br>\n   \n      <p>\n      <hr>\n  <\/div>",
        "timestamp": null,
        "begin": null,
        "end": null,
        "altitudeMode": "relativeToGround",
        "tessellate": -1,
        "extrude": 0,
        "visibility": -1,
        "drawOrder": null,
        "icon": null,
        "snippet": ""
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.282618, 45.050049, 0.0]
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
        "name": "Egg Harbor Municipal Marina",
        "description": "The Egg Harbor Municipal Marina in Door County has a boat ramp and boarding dock open to the public. Parking is available, and there is a launch fee. For more information call (920) 868-2048."
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.282618, 45.050049, 0.0]
      }
    }
  ]
}
