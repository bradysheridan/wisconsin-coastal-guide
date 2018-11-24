var fs = require('fs')

module.exports.run = function() {
  const data = require('../../public/data/dont-serve/geojson/wcg-historic-ls.json')

  var json = {
    "type": "FeatureCollection",
    "features": data.features.map((d, i) => {
      var description = JSON.stringify(d.properties.description)
      var formattedDescription = description.replace(/\r?\\n/g, "").trim()

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

  fs.writeFile('public/data/serve/geojson/wcg-historic-ls.json', json, 'utf8', function(err) {
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
        "Name": "Bad River Reservation",
        "description": "U.S. Highway 2\n<br><br>\n<img src=\"http:\/\/i210.photobucket.com\/albums\/bb100\/sfbjohnson\/Circle%20Tour\/ojibwa_beadwork.jpg\" align=right>\nAt Odanah visitors coming to the Bad River Reservation in the twenty-ﬁrst century will ﬁnd a\nbusy lodge, casino, and convention center; the impressive Chief Blackbird Center, which houses\nthe Bad River Band’s administration and education offices, legal department, library, tribal court,\nand natural resources department; as well as headquarters for the Great Lakes Indian Fish and\nWildlife Commission. Nearby are a cultural center and a number of newly built houses. If\nvisitors arrive at powwow time in mid- to late August, they can join the crowd for a colorful,\ntraditional experience. Current impressions of reservation life tell but one small part of the band’s\nhistory over the past 150 years, a prolonged struggle with poverty, disease, inadequate health\ncare, substandard housing, education in government-sponsored boarding schools, and loss of\ntribal lands, all the products of a federal policy for many decades designed to suppress Native\nculture and to assimilate the Ojibwe into the dominant culture.\n<br><br>\nThe Bad River Reservation created by the Treaty of La Pointe in 1854 originally included\n124,000 acres of heavily forested land and wetlands including the Bad River, Sand Cut, and Kakagon\nSloughs, the latter a source of abundant wild rice. It contains 17 miles of Lake Superior\nshoreline and 200 acres on Madeline Island. It is named for the Bad River, located in the lower\nreaches of that watershed, apparently named “Bad” due to mistranslations from the original\nOjibwe to French to English.\n<br><br>\nThe 1887 federal allotment policy of assigning 80-acre parcels to individual tribal members\ndesigned to foster assimilation into American society led to a great loss of land for the Ojibwe.\nIn the case of the Bad River Reservation the band lost most of the land due in large measure\nto greedy lumbermen and ineffective federal agents administering ill-conceived national policies\nin the late nineteenth and early twentieth centuries. Then the damage was done, and now much\nof the original reservation is in private ownership where logging continues.\n<br><br>\nCurrently the Bad River Band of Lake Superior Chippewa has over 6,000 members, 1,500\nliving on the reservation and the balance elsewhere. They are governed by an elected six-person\ntribal council and a chairman.\n<br><br>\nThe reservation is recognized as a valuable ecological region. Its rivers and wetlands provide\nspawning grounds for lake trout, salmon, and walleye and a sheltered habitat for a great variety\nof wildlife. The Environmental Protection Agency recognizes the sloughs as containing “the only\nremaining extensive coastal wild rice marsh in the Great Lakes Basin.” And the agency recognizes\nthe Bad River Band’s commitment to environmental protection through the work of the band’s\nNatural Resources Department, which employs nineteen specialists. For the second time in a decade \nthe Bad River Ojibwe made environmental headlines in September 2003 when, with the assistance \nof the Nature Conservancy, they purchased 21,322 acres and 24 miles of river and streams critically \nimportant in preserving the Kakagon-Bad River Sloughs and Lake Superior water quality. The band paid \n$4.5 million to retrieve into tribal ownership approximately one-ﬁfth of its original area. Noted Tribal \nCouncil chairman Eugene Bigboy: “The heart and soul of any reservation, aside from its people, is its \nland. This purchase enables the Band to get back precious land that was once thought lost forever.”\nThe band’s commitment to protecting its natural resources and to developing a Bad River watershed \nmanagement plan for general adoption bodes well for the future.\n<br><br>\nBogue, <i>Around the Shores of Lake Superior<\/i>, 320-322.<br>\nCopyright &copy; 2007<br>\nThe Board of Regents of the University of Wisconsin System<br>\nAll rights reserved.",
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
        "type": "Point",
        "coordinates": [-90.676217893085692, 46.530806339153649, 0.0]
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
        "name": "Bad River Reservation",
        "description": "",
        "img": ""
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-90.676217893085692, 46.530806339153649]
      }
    }
  ]
}
