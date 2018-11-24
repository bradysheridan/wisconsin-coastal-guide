var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-stories.json')

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
          "description": (formattedDescription) ? formattedDescription : null,
          "readMoreLink": d.properties.Read_More_Link_URL
        },
        "geometry": {
          "type": "Point",
          "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
        }
      }
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-stories.json', json, 'utf8', function(err) {
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
        "Name": "Island History",
        "description": "<table width=\"300\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">   <tr>    <td>      <h2><font color=\"#003399\">Island History<\/font><\/h2>    <\/td>  <\/tr>  <tr>    <td>      <blockquote>        <p>An article that describes the Native American tradition of crafting, and it remains a proud part of the Madeline Island’s culture today. <\/p>        <p>          <a href=\"http:\/\/www.madelineartschool.com\/history.cfm\">Learn More<\/a>        <\/p>      <\/blockquote>    <\/td>  <\/tr><\/table>",
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
        "TemplateName": "No_image,_no_link_(for_site)",
        "Top_Photo_URL": "http:\/\/www.aqua.wisc.edu\/glct\/maps\/images\/WCG_banner2.jpg",
        "Title_Text": "Island History",
        "Paragraph_1_Text": "History of Madeline Island",
        "Paragraph_2_Text": null,
        "Read_More_Link_URL": "http:\/\/www.madelineartschool.com\/history.cfm",
        "ge4x_1": "\"\/><!--",
        "ge4x_2": "-->",
        "ge4x_3": "<!--"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-90.785834, 46.779408, 0.0]
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
        "name": "History of Madeline Island",
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
