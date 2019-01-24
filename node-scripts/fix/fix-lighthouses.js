const fs = require('fs')
const getHrefs = require('get-hrefs')
const { JSDOM } = require('jsdom')

const siteNames = {
  'http://lighthousefriends.com': 'Lighthouse Friends',
  'terrypepper.com': 'Terry Pepper',
  'boatnerd.com': 'BoatNerd',
  'nps.gov': 'National Park Service',
  'ridgessanctuary.org': 'Ridges Sanctuary',
  'portwashingtonhistoricalsociety.org': 'Port Washington Historical Society',
  'kenoshahistorycenter.org': 'Kenosha History Center',
  'eagleblufflighthouse.org': 'Eagle Bluff Lighthouse',
  'northpointlighthouse.org': 'North Point Lighthouse',
  'jacksjoint.com': 'Jacks Joint',
  'dnr.wi.gov': 'DNR'
}
const urls = Object.keys(siteNames)

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-lighthouses.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      var dom = new JSDOM(d.properties.description)
      var name = dom.window.document.querySelector('h2').textContent
      var description = dom.window.document.querySelector('p').textContent
      var links = getHrefs(d.properties.description)

      var formattedLinks = links.map((link) => {
        var siteName = ""

        for (var i = 0; i < urls.length; i++) {
          var url = urls[i]
          if (link.indexOf(url) >= 0) {
            siteName = siteNames[url]
            break
          }
        }

        return { siteName, link }
      })

      console.log(formattedLinks)

      var feature = {
        "type": "Feature",
        "properties": {
          "name": name,
          "description": description,
          "links": formattedLinks
        },
        "geometry": {
          "type": "Point",
          "coordinates": [d.geometry.coordinates[0], d.geometry.coordinates[1]]
        }
      }
      return feature
    })
  }

  json = JSON.stringify(json)

  fs.writeFile('public/data/serve/geojson/wcg-lighthouses.json', json, 'utf8', function(err) {
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
        "Name": "Algoma Pierhead",
        "description": "<div id=\"MarkerBanner\">\n      <img src=\"http:\/\/www.aqua.wisc.edu\/glct\/maps\/images\/WCG_banner2.jpg\" alt=\"picture\" \/>\n<\/div><h2><font color=\"#000099\">Algoma Pierhead<\/font><\/h2>\n      <p>The Algoma lighthouse is operational and run by the U.S. Coast Guard, but it is not open to the public. The first station on this site was built in 1893 and replaced in 1908, and the current tower was built in 1932.\n      <\/p>\n      <hr>\n  <div align=\"center\">\n    <b>Visit websites with more information about this lighthouse<\/b>\n      <p>\n      <a href=\"http:\/\/www.lighthousefriends.com\/light.asp?ID=254\">Lighthouse Friends<\/a><br>\n      <a href=\"http:\/\/www.terrypepper.com\/lights\/michigan\/algoma\/algoma.htm\">Terry Pepper<\/a><br>\n      <a href=\"http:\/\/lighthouse.boatnerd.com\/gallery\/Michigan\/algoma.htm\">BoatNerd<\/a><br>\n      <p>\n      <hr>\n  <a href=\"http:\/\/www.wisconsincoastalguide.org\/\">www.wisconsincoastalguide.org<\/a>\n<\/div>",
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
        "coordinates": [ -87.42946791367855, 44.606853828913977, 0.0 ]
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
        "name": "Algoma Pierhead",
        "description": "The Algoma lighthouse is operational and run by the U.S. Coast Guard, but it is not open to the public. The first station on this site was built in 1893 and replaced in 1908, and the current tower was built in 1932.",
        "links": [
          {
            "text": "Lighthouse Friends",
            "href": "http://www.lighthousefriends.com/light.asp?ID=254"
          },
          {
            "text": "Terry Pepper",
            "href": "http://www.terrypepper.com/lights/michigan/algoma/algoma.htm"
          },
          {
            "text": "BoatNerd",
            "href": "http://lighthouse.boatnerd.com/gallery/Michigan/algoma.htm"
          }
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.873078, 43.061833]
      }
    }
  ]
}
