const fs = require('fs')
const { JSDOM } = require('jsdom')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-rustic-roads.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      var dom = new JSDOM(d.properties.description)
      var county = dom.window.document.querySelector('p').textContent
      var link = dom.window.document.querySelector('a').href

      return {
        "type": "Feature",
        "properties": {
          "name": d.properties.Name,
          "county": county,
          "link": link
        },
        "geometry": {
          "type": "MultiLineString",
          "coordinates": d.geometry.coordinates.map((arr) => arr.map((coords) => [coords[0], coords[1]]))
        }
      }
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-rustic-roads.json', json, 'utf8', function(err) {
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
        "Name": "R-2",
        "description": "<table width=\"200\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n<tr>\n<td>\n<h2><font color=\"#003399\">Rustic Road 2<\/font><\/h2>    \n<\/td> \n <\/tr>  \n<tr>    \n<td>      \n<p>Racine County<\/p>        \n<p><a href=\"http:\/\/wisconsindot.gov\/Pages\/travel\/road\/rustic-roads\/rr2.aspx\">learn more...<\/a><\/p>\n<\/td>  \n<\/tr>\n<\/table>",
        "timestamp": null,
        "begin": null,
        "end": null,
        "altitudeMode": null,
        "tessellate": 1,
        "extrude": 0,
        "visibility": -1,
        "drawOrder": null,
        "icon": null,
        "snippet": ""
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
        "name": "R-2",
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
