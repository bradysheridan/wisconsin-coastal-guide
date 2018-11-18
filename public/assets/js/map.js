// mapbox gl config
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhZHlzaGVyaWRhbiIsImEiOiJjajloOWx2Z2cyeTV1MnFwYXhhYTJpemZ6In0.K9wxtIEOaHGRrsofhcu-3w'

// coordinates to be frequently switched between
const anchors = {
  wi: [-90, 44.75]
}

// layer generators
const layerOf = {
  points: ({filename, fill, initiallyChecked}) => ({
    id: filename,
    type: 'circle',
    source: {
      type: 'geojson',
      data: `../../data/geojson/${filename}`
    },
    paint: {
      'circle-radius': {
        'stops': [[6, 3], [30, 20]]
      },
      'circle-color': fill || '#1b9dd5',
      'circle-stroke-width': 1,
      'circle-stroke-color': '#eee'
    },
    layout: {
      'visibility': (initiallyChecked) ? 'visible' : 'none'
    }
  })
}

// set up map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/bradysheridan/cjoly51q716fn2spgkluo6yxq',
  center: anchors.wi,
  zoom: 4.0,
  minZoom: 4.0,
  maxZoom: 11.0,
  maxBounds: [
    [-95.64086454193206, 40.674929759579015],
    [-81.68625216652741, 49.6106842326941]
  ]
})

// load layers
map.on('load', function() {
  Object.keys(LAYERS).forEach((k) => {
    let layer = LAYERS[k]

    // no data source, do nothing
    if (!layer.filename) return

    // render points
    if ("points" === layer.geographyType) {
      map.addLayer(layerOf.points(layer))
    }

    // render paths
    if ("paths" === layer.geographyType) {
      console.log('Would render paths for', layer.filename)
    }
  })

  map.on('click', function (e) {
    console.log(`[${e.lngLat.lng}, ${e.lngLat.lat}]`)
  })
})
