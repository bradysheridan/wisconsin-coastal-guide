function handlePointClick(e) {
  if (mapState.activePopup) {
    mapState.activePopup.remove()
  }

  let feature = e.features[0]
  let coordinates = feature.geometry.coordinates.slice()
  let props = Object.assign({}, feature.properties, { accentColor: feature.layer.paint['circle-color'] })
  let html = popupFor[feature.layer.id](props)

  // ensure that if the map is zoomed out such that multiple copies of the
  // feature are visible, the popup appears over the copy being pointed to
  if (e.lngLat) {
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
    }  
  }

  // define popup offset values
  let offset = 10
  let popupOffsets = {
    'top': [0, offset],
    'top-left': [offset, offset],
    'top-right': [-offset, offset],
    'bottom': [0, -offset],
    'bottom-left': [offset, -offset],
    'bottom-right': [-offset, -offset],
    'left': [offset, 0],
    'right': [-offset, 0]
  }

  // render popup
  let popup = new mapboxgl.Popup({offset: popupOffsets, className: 'popup-wrap'})
    .setLngLat(coordinates)
    .setHTML(html)
    .addTo(map)
    .on('close', () => {
      // mapState.activePopup
      // mapState.activePopup = null
    })

  // update map state
  popup.layerId = feature.layer.id
  popup.properties = props
  mapState.activePopup = popup

  // reposition map
  map.flyTo({
    center: coordinates,
    zoom: (map.getZoom() > 9.5) ? map.getZoom() : 9.5
  })

  // bind PMVR
  if (document.getElementById('pmvr')) {
    console.log('binding pmvr...')
    PMVR.bindto('pmvr','VicinityMap','Label')
  }
}
