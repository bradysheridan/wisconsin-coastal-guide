// mapbox gl config
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhZHlzaGVyaWRhbiIsImEiOiJjajloOWx2Z2cyeTV1MnFwYXhhYTJpemZ6In0.K9wxtIEOaHGRrsofhcu-3w'

// coordinates to be frequently switched between
const anchors = {
  mobile: {
    wi: [-90, 44.4]
  },
  desktop: {
    wi: [-86.5, 44.4]
  }
}

// layer generators
const layerOf = {

  // generate a layer of circles
  points: ({filename, fill, initiallyChecked}) => ({
    id: filename,
    type: 'circle',
    source: {
      type: 'geojson',
      data: layerData[filename]
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
      data: layerData[filename],
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

// store screen width and height
const screenSize = {
  w: window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
  h: window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight
}

// tile set style codes
const styles = {
  basic: 'cjoly51q716fn2spgkluo6yxq'
}

// set up map
const map = new mapboxgl.Map({
  container: 'map',
  style: `mapbox://styles/bradysheridan/${styles.basic}`,
  center: (screenSize.w <= 768) ? anchors.mobile.wi : anchors.desktop.wi,
  zoom: (screenSize.w <= 768) ? 5.2 : 5.6,
  minZoom: 4.8
})

// track active popup
var mapState = {
  featureToFocus: null,
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

  // adds zoom controls
  map.addControl(new mapboxgl.NavigationControl())

  // adds locaiton tracker control
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true
  }))

  // if there's a feature to focus in the map state, focus it
  if (mapState.featureToFocus) {
    let interval = setInterval(focusFeature, 100)

    function focusFeature() {
      let sourceLayer = mapState.featureToFocus.split('.csv')[0] + '.csv'
      let features = map.queryRenderedFeatures({ layers: [sourceLayer] }).filter((d) => d.properties.fid === mapState.featureToFocus)
      if (Array.isArray(features) && features.length > 0) {
        handlePointClick({ features })
        clearInterval(interval)
      }
    }
  }

  // logs coordinates of cursor when map is clicked (use to easily adjust
  // anchors and pan bounds)
  map.on('click', function (e) {
    console.log(`[${e.lngLat.lng}, ${e.lngLat.lat}]`)
  })
})
