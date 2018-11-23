var fs = require('fs')

module.exports.fixBeaches = function() {
  const data = require('../public/data/dont-serve/geojson/wcg-beaches.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => ({
      "type": "Feature",
      "properties": {
        "name": d.properties.Name,
        "beachCode": d.properties.BEACH_CODE,
        "nearestTown": d.properties.NEAR_TOWN,
        "length": d.properties.LENGTH,
        "epaId": (!d.properties.EPA_ID || "null" === d.properties.EPA_ID)
          ? null
          : d.properties.EPA_ID,
      },
      "geometry": {
        "type": "Point",
        "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
      }
    }))
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-beaches.json', json, 'utf8', function(err) {
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
        "Name": "Bradford Beach",
        "description": "<table width=\"{static_BalloonWidth}\" border=\"0\" cellspacing=\"0\" cellpadding=\"4\"><tr><td height=\"43\" colspan=\"1\" align=\"center\"><img src=\"http:\/\/www.aqua.wisc.edu\/glct\/maps\/images\/WCG_banner2.jpg\" width=\"400\" \/><\/td><\/tr><tr><td height=\"40\" colspan=\"2\" align=\"left\"><h2><font color=\"#000099\">$[name]<\/font><\/h2><\/td><\/tr><tr><td height=\"36\" colspan=\"2\"><p><font color=\"#000000\">$[name] beach is located near Milwaukee, Wi.<\/font><\/p><\/td><\/tr><tr> <td height=\"40\" align=\"center\"><table width=\"82%\" border=\"0\" cellpadding=\"0\">  <p><font color=\"#000000\">Length: 2673 ft<\/font><\/p>  <p>Beach Code: 41-005<\/p> <p>EPA ID: WI312597 <\/p><\/table>    <hr align=\"center\">     <a href=\"http:\/\/www.wibeaches.us\/\">www.beaches.us<\/a> | <a href=\"http:\/\/www.wisconsincoastalguide.org\/\">www.wisconsincoastalguide.org<\/a>     <\/td> <\/tr><\/table>",
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
        "TemplateName":
        "Wide_Photo",
        "BEACH_CODE": "41-005",
        "EPA_ID": "WI312597",
        "NEAR_TOWN": "Milwaukee",
        "LENGTH": "2673",
        "ge4x_1": "\"\/><!--",
        "ge4x_2": "-->",
        "ge4x_3": "<!--"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.873078, 43.061833, 0.0]
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
        "name": "Bradford Beach",
        "beachCode": "41-005",
        "epaId": "WI312597",
        "nearestTown": "Milwaukee",
        "length": "2673"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.873078, 43.061833, 0.0]
      }
    }
  ]
}
