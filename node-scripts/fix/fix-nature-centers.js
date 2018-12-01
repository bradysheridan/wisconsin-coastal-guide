var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-nature-centers.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features
      .filter((d) => d.geometry)
      .map((d, i) => {
        return {
          "type": "Feature",
          "properties": {
            "name": d.properties.Name,
            "description": d.properties.Paragraph1_Text,
            "link": d.properties.Link1_URL.replace('\\', '')
          },
          "geometry": {
            "type": "Point",
            "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
          }
        }
      })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-nature-centers.json', json, 'utf8', function(err) {
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
        "Name": "Pattison State Park Nature Center",
        "description": "<div id=\"MarkerBanner\"><img src=\"http:\/\/www.aqua.wisc.edu\/glct\/maps\/images\/WCG_banner2.jpg\" \/><\/div><h2><font color=\"#000099\">Pattison State Park Nature Center<\/font><\/h2><p><font color=\"#000000\">The 1,436-acre Pattison State Park offers the highest waterfalls in Wisconsin and the fourth highest waterfall east of the Rocky Mountains. It also features a lake with a beach, nature programs and guided hikes, camping, and 9 miles of hiking trails.<\/font><\/p><div align=\"center\"><p><font color=\"#000000\">More <a href=\"http:\/\/dnr.wi.gov\/org\/land\/parks\/specific\/pattison\/\">information<\/a> about Pattison State Park Nature Center.<\/p><hr><a href=\"http:\/\/www.wisconsincoastalguide.org\/\">www.wisconsincoastalguide.org<\/a><\/div>",
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
        "TemplateName": "Tall_Photo",
        "Title": "Pattison State Park Nature Center",
        "Paragraph1_Text": "The 1,436-acre Pattison State Park offers the highest waterfalls in Wisconsin and the fourth highest waterfall east of the Rocky Mountains. It also features a lake with a beach, nature programs and guided hikes, camping, and 9 miles of hiking trails.",
        "Link1_URL": "http:\/\/dnr.wi.gov\/org\/land\/parks\/specific\/pattison\/",
        "Link1_Text": "information",
        "ge4x_1": "\"\/><!--",
        "ge4x_2": "-->",
        "ge4x_3": "<!--"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-92.120733, 46.535736, 0.0]
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
        "name": "Pattison State Park Nature Center",
        "description": "The 1,436-acre Pattison State Park offers the highest waterfalls in Wisconsin and the fourth highest waterfall east of the Rocky Mountains. It also features a lake with a beach, nature programs and guided hikes, camping, and 9 miles of hiking trails.",
        "link": "http://dnr.wi.gov/org/land/parks/specific/pattison/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.56225, 44.144366666700002]
      }
    }
  ]
}
