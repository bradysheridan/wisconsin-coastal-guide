var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-byways.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      return {
        "type": "Feature",
        "properties": {
          "name": d.properties.Name,
          "description": d.properties.description.split('<br><br>')[0],
          "link": d.properties.description.split('<br><br>')[1].split('\"')[1]
        },
        "geometry": {
          "type": "MultiLineString",
          "coordinates": d.geometry.coordinates.map((arr) => arr.map((coords) => [coords[0], coords[1]]))
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
      "properties":
      {
        "Name": "Wisconsin Lake Superior Scenic Byway",
        "description": "This state scenic byway follows the Lake Superior coast for 70 miles along State Trunk Highway 13 through Washburn, Bayfield, Red Cliff, Cornucopia, Herbster and Port Wing.<br><br>\n<a href=\"http:\/\/www.lakesuperiorbyway.org\/index.html\">Learn more about this scenic byway<\/a>.",
        "timestamp": null,
        "begin": null,
        "end": null,
        "altitudeMode": null,
        "tessellate": -1,
        "extrude": 0,
        "visibility": -1,
        "drawOrder": null,
        "icon": null
      },
      "geometry": {
        "type": "MultiLineString",
        "coordinates": [
          [[-90.955037715566206, 46.588928191609398, 0.0], [-90.9550124142161, 46.588747423278498, 0.0], /* .. */],
          /* .. */
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
      "properties": {
        "name": "Wisconsin Lake Superior Scenic Byway",
        "description": "This state scenic byway follows the Lake Superior coast for 70 miles along State Trunk Highway 13 through Washburn, Bayfield, Red Cliff, Cornucopia, Herbster and Port Wing.",
        "link": "http://www.lakesuperiorbyway.org/index.html"
      },
      "geometry": {
        "type": "MultiLineString",
        "coordinates": [
          [[-90.955037715566206, 46.588928191609398], [-90.9550124142161, 46.588747423278498], /* .. */],
          /* .. */
        ]
      }
    }
  ]
}
