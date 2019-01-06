// mapbox gl config
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhZHlzaGVyaWRhbiIsImEiOiJjajloOWx2Z2cyeTV1MnFwYXhhYTJpemZ6In0.K9wxtIEOaHGRrsofhcu-3w'

// coordinates to be frequently switched between
const anchors = {
  wi: [-90, 44.75]
}

// layer generators
const layerOf = {

  // generate a layer of circles
  points: ({filename, fill, initiallyChecked}) => ({
    id: filename,
    type: 'circle',
    source: {
      type: 'geojson',
      data: `../../data/serve/geojson/${filename}`
    },
    paint: {
      'circle-radius': {
        'stops': [[6, 3.5], [30, 20]]
      },
      'circle-color': fill || '#1b9dd5',
      'circle-stroke-width': 1,
      'circle-stroke-color': '#eee'
    },
    layout: {
      'visibility': (initiallyChecked) ? 'visible' : 'none'
    }
  }),

  // generate a layer of lines
  paths: ({filename, fill, initiallyChecked}) => ({
    id: filename,
    type: 'line',
    source: {
      type: 'geojson',
      data: `../../data/serve/geojson/${filename}`,
      tolerance: 0
    },
    paint: {
      'line-color': fill || '#1b9dd5',
      'line-width': {
        'stops': [[6, 3.4], [30, 10]]
      }
    },
    layout: {
      'visibility': (initiallyChecked) ? 'visible' : 'none',
      'line-join': 'round',
      'line-cap': 'round'
    }
  })
}

// set up map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/bradysheridan/cjqldca7k2m262tptty3sp2t4',
  center: anchors.wi,
  zoom: 5.6,
  minZoom: 5.6,
  maxZoom: 11.0,
  maxBounds: [
    [-95.64086454193206, 40.674929759579015],
    [-81.68625216652741, 49.6106842326941]
  ]
})

var mapState = {
  activePopup: null
}

// load layers
map.on('load', function() {
  var firstPlaceSymbolID = map.getStyle().layers.find((d) => d['source-layer'] === 'place_label').id

  // render path layers
  PATH_LAYER_KEYS.forEach((k) => {
    let layer = LAYERS[k]
    if (!layer.filename) return
    layer.key = k

    // add layer
    map.addLayer(layerOf.paths(layer), firstPlaceSymbolID)

    // bind click events to function located in eventHandlers.js
    map.on('click', layer.filename, handlePathClick)

    // turn cursor into a pointer on hover
    map.on('mouseenter', layer.filename, function() { map.getCanvas().style.cursor = 'pointer' })
    map.on('mouseleave', layer.filename, function() { map.getCanvas().style.cursor = '' })
  })

  // render point layers
  POINT_LAYER_KEYS.forEach((k) => {
    let layer = LAYERS[k]
    if (!layer.filename) return
    layer.key = k

    // add layer
    map.addLayer(layerOf.points(layer), firstPlaceSymbolID)

    // bind click events to function located in eventHandlers.js
    map.on('click', layer.filename, handlePointClick)

    // turn cursor into a pointer on hover
    map.on('mouseenter', layer.filename, function() { map.getCanvas().style.cursor = 'pointer' })
    map.on('mouseleave', layer.filename, function() { map.getCanvas().style.cursor = '' })
  })

  // adds user location tracker
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true
  }))

  // logs coordinates of cursor when map is clicked (use to easily adjust
  // anchors and pan bounds)
  map.on('click', function (e) {
    console.log(`[${e.lngLat.lng}, ${e.lngLat.lat}]`)
  })
})
