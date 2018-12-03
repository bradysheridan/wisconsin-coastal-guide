const fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-shipwrecks.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      var feature = {
        "type": "Feature",
        "properties": {
          "name": d.properties.Name,
          "description": d.properties.description,
          // "readMore": "Read more about the <a href='http://www.wisconsinshipwrecks.org/Vessel/Details/181' target='_blank'>Empire State</a>, the <a href='http://www.wisconsinshipwrecks.org/Vessel/Details/287' target='_blank'>Ida Corning</a>, and the <a href='http://www.wisconsinshipwrecks.org/Vessel/Details/471' target='_blank'>Oak Leaf</a> at <a href='http://www.wisconsinshipwrecks.org'>WisconsinShipwrecks.org</a>",
          // "ships": []
        },
        "geometry": {
          "type": "Point",
          "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
        }
      }

      // var sampleShip = {
      //   "name": "Oak Leaf",
      //   "type": "Schooner-Barge",
      //   "launched": "1881",
      //   "wrecked": "1920's",
      //   "link": "http://www.wisconsinshipwrecks.org/Vessel/Details/471"
      // }

      return feature
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-shipwrecks-new.json', json, 'utf8', function(err) {
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
        "Name": "The Bullhead Point Wrecks",
        "description": "<div id=\"MarkerBanner\"><img src=\"http:\/\/www.aqua.wisc.edu\/glct\/maps\/images\/WCG_banner2.jpg\" alt=\"picture\" \/><\/div><h2><font color=\"#000099\">The Bullhead Point Wrecks<\/font><\/h2>\n        <b><u>Empire State<\/u><\/b><br>\n        <b>Steamer<\/b><br>\n        <i>Launched: 1862<br>Wrecked: 1916<\/i><br><br>\n        <b><u>Ida Corning<\/u><\/b><br>\n        <b>Schooner<\/b><br>\n        <i>Launched: 1866<br>Wrecked: 1928<\/i><br><br>\n        <b><u>Oak Leaf<\/u><\/b><br>\n        <b>Schooner-Barge<\/b><br>\n        <i>Launched: 1881<br>Wrecked: 1920's<\/i>\n        <p>Three hard-working vessels end their days as decrepit dock extensions.<\/p>\n      <p>\n        Read more about the <a href=\"http:\/\/www.wisconsinshipwrecks.org\/Vessel\/Details\/181\">Empire State<\/a>, the <a href=\"http:\/\/www.wisconsinshipwrecks.org\/Vessel\/Details\/287\">Ida Corning<\/a>, and the <a href=\"http:\/\/www.wisconsinshipwrecks.org\/Vessel\/Details\/471\">Oak Leaf<\/a> at <a href=\"http:\/\/www.wisconsinshipwrecks.org\/\">WisconsinShipwrecks.org<\/a>\n      <\/p>\n <div align=\"center\"><hr>\n      <a href=\"http:\/\/www.wisconsincoastalguide.org\/\">www.wisconsincoastalguide.org<\/a>\n<\/div>",
        "timestamp": null,
        "begin": null,
        "end": null,
        "altitudeMode": null,
        "tessellate": -1,
        "extrude": 0,
        "visibility": -1,
        "drawOrder": null,
        "icon": null,
        "snippet": ""
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.395328434580094, 44.841632816082253, 0.0]
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
        "name": "The Bullhead Point Wrecks",
        "description": "Three hard-working vessels end their days as decrepit dock extensions.",
        "readMore": "Read more about the <a href='http://www.wisconsinshipwrecks.org/Vessel/Details/181' target='_blank'>Empire State</a>, the <a href='http://www.wisconsinshipwrecks.org/Vessel/Details/287' target='_blank'>Ida Corning</a>, and the <a href='http://www.wisconsinshipwrecks.org/Vessel/Details/471' target='_blank'>Oak Leaf</a> at <a href='http://www.wisconsinshipwrecks.org'>WisconsinShipwrecks.org</a>",
        "ships": [
          {
            "name": "Empire State",
            "type": "Steamer",
            "launched": "1862",
            "wrecked": "1916",
            "link": "http://www.wisconsinshipwrecks.org/Vessel/Details/181"
          },
          {
            "name": "Ida Corning",
            "type": "Schooner",
            "launched": "1866",
            "wrecked": "1928",
            "link": "http://www.wisconsinshipwrecks.org/Vessel/Details/287"
          },
          {
            "name": "Oak Leaf",
            "type": "Schooner-Barge",
            "launched": "1881",
            "wrecked": "1920's",
            "link": "http://www.wisconsinshipwrecks.org/Vessel/Details/471"
          }
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-90.676217893085692, 46.530806339153649]
      }
    }
  ]
}
