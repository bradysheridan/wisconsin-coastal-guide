var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-parks.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features
      .filter((d) => d.geometry)
      .map((d, i) => {
        var feature = {
          "type": "Feature",
          "properties": {
            "name": d.properties.Name,
            "subtitle": d.properties.Subtitle,
            "links": []
          },
          "geometry": {
            "type": "Point",
            "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
          }
        }

        if (d.properties.Link1_URL) {
          var link1 = { href: d.properties.Link1_URL, text: d.properties.Link1_Text }
          feature.properties.links.push(link1)
        }

        if (d.properties.Link2_URL) {
          var link2 = { href: d.properties.Link2_URL, text: d.properties.Link2_Text }
          feature.properties.links.push(link2)
        }

        return feature
      })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-parks.json', json, 'utf8', function(err) {
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
        "Name": "Apostle Islands National Lakeshore",
        "description": "<div class=\"MarkerBalloon\" style=\"min-width:300px;\">        <img class=\"BannerImage\" src=\"http:\/\/www.aqua.wisc.edu\/glct\/maps\/images\/WCG_banner2.jpg\" width=\"\" style=\"max-width: 100%; min-width: 300px;\" \/>        <h2><font color=\"#000080\">Apostle Islands National Lakeshore<\/font><\/h2>        <h3><font color=\"#000080\">National Park Service<\/font><\/h3>        <p><\/p>        <p><a href=\"http:\/\/www.nps.gov\/apis\/\">Park Website<\/a><\/p>        <p><a href=\"\"><\/a><\/p>        <p><a href=\"http:\/\/wisconsincoastalguide.org\/\">Wisconsin Coastal Guide<\/a><\/p><\/div>",
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
        "TemplateName": "RWD_GLCT",
        "Title": "Apostle Islands National Lakeshore",
        "Subtitle": "National Park Service",
        "Photo_URL": null,
        "Paragraph1_Text": null,
        "Paragraph2_Text": null,
        "Link1_URL": "http:\/\/www.nps.gov\/apis\/",
        "Link1_Text": "Park Website",
        "Link2_URL": null,
        "Link2_Text": null,
        "Description2": null,
        "ge4x_1": "\"\/><!--",
        "ge4x_2": "-->", "ge4x_3": "<!--"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-90.820515, 46.812971, 0.0 ]
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
        "name": "Apostle Islands National Lakeshore",
        "location": "National Park Service",
        "links": [
          {
            "text": "Park Website",
            "href": "http://www.nps.gov/apis/"
          }
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-90.820515, 46.812971]
      }
    }
  ]
}
