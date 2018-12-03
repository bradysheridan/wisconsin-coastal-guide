var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-sna.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      return {
        "type": "Feature",
        "properties": {
          "name": d.properties.Name,
          "description": d.properties.Paragraph1_Text,
          "links": {
            "description": d.properties.Link1_URL,
            "map": d.properties.Link2_URL
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

  fs.writeFile('public/data/serve/geojson/wcg-sna.json', json, 'utf8', function(err) {
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
        "Name": "Brule River Boreal Forest",
        "description": "<div id=\"MarkerBanner\"><img src=\"http:\/\/www.aqua.wisc.edu\/glct\/maps\/images\/WCG_banner2.jpg\" \/><\/div><h2><font color=\"#000099\">Brule River Boreal Forest <\/font><\/h2><p><font color=\"#000000\">Brule River State Forest is a boreal forest in various stages of recovery that borders the Brule River. Rare animals in the area include the bald eagle.  Area is best seen by canoe<\/font><\/p><div align=\"center\"><font color=\"#000000\">Link to the <a href=\"http:\/\/dnr.wi.gov\/topic\/Lands\/naturalareas\/index.asp?SNA=160\"><font color=\"#0000FF\">description<\/font><\/a><font color=\"#0000FF\"> <font color=\"#000000\">and<\/font> <a href=\"http:\/\/dnr.wi.gov\/topic\/lands\/naturalareas\/documents\/topomaps\/map160.pdf\"><font color=\"#0000FF\">map<\/font><\/a><font color=\"#0000FF\"> <font color=\"#000000\">of<\/font> <font color=\"#000000\">Brule River Boreal Forest <\/font> <font color=\"#000000\">State Natural Area from the<\/font> <font color=\"#0000FF\"><a href=\"http:\/\/dnr.wi.gov\/\">Wisconsin DNR<\/a>.<\/font><\/font><\/font><\/font><hr><a href=\"http:\/\/www.wisconsincoastalguide.org\/\">www.wisconsincoastalguide.org<\/a><\/div>",
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
        "TemplateName": "Balloon_with_map_link",
        "Title": "Brule River Boreal Forest",
        "Paragraph1_Text": "Brule River State Forest is a boreal forest in various stages of recovery that borders the Brule River. Rare animals in the area include the bald eagle.  Area is best seen by canoe",
        "Link1_URL": "http:\/\/dnr.wi.gov\/topic\/Lands\/naturalareas\/index.asp?SNA=160",
        "Link1_Text": "description",
        "Link2_URL": "http:\/\/dnr.wi.gov\/topic\/lands\/naturalareas\/documents\/topomaps\/map160.pdf",
        "Link2_Text": "map",
        "ge4x_1": "\"\/><!--",
        "ge4x_2": "-->",
        "ge4x_3": "<!--"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-91.6008, 46.7218, 0.0]
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
        "name": "Brule River Boreal Forest",
        "description": "Brule River State Forest is a boreal forest in various stages of recovery that borders the Brule River. Rare animals in the area include the bald eagle.  Area is best seen by canoe",
        "links": {
          "description": "http://dnr.wi.gov/topic/Lands/naturalareas/index.asp?SNA=160",
          "map": "http://dnr.wi.gov/topic/lands/naturalareas/documents/topomaps/map160.pdf"
        }
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-91.6008, 46.7218]
      }
    }
  ]
}
