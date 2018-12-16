function handlePathClick(e) {
  console.log('handlePathClick was invoked for', e)

  // if there's a popup open, close it
  if (mapState.activePopup) {
    mapState.activePopup.remove()
    mapState.activePopup = null
  }

  var feature = e.features[0]
  var coordinates = [e.lngLat.lat, e.lngLat.lng]
  var props = Object.assign({}, feature.properties, { accentColor: feature.layer.paint['line-color'] })
  var html = popupFor[feature.layer.id](props)

  // ensure that if the map is zoomed out such that multiple copies of the
  // feature are visible, the popup appears over the copy being pointed to
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
  }

  // define popup offset values
  var offset = 10
  var popupOffsets = {
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
  var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'popup-wrap'})
    .setLngLat(coordinates)
    .setHTML(html)
    .addTo(map)

  // update map state
  popup.layerId = feature.layer.id
  mapState.activePopup = popup

  // reposition map
  map.flyTo({
    center: coordinates,
    zoom: (map.getZoom() > 9.5) ? map.getZoom() : 9.5
  })
}

function handlePointClick(e) {
  // if there's a popup open, close it
  if (mapState.activePopup) {
    mapState.activePopup.remove()
    mapState.activePopup = null
  }

  var feature = e.features[0]
  var coordinates = feature.geometry.coordinates.slice()
  var props = Object.assign({}, feature.properties, { accentColor: feature.layer.paint['circle-color'] })
  var html = popupFor[feature.layer.id](props)

  // ensure that if the map is zoomed out such that multiple copies of the
  // feature are visible, the popup appears over the copy being pointed to
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
  }

  // define popup offset values
  var offset = 10
  var popupOffsets = {
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
  var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'popup-wrap'})
    .setLngLat(coordinates)
    .setHTML(html)
    .addTo(map)

  // update map state
  popup.layerId = feature.layer.id
  mapState.activePopup = popup

  // reposition map
  map.flyTo({
    center: coordinates,
    zoom: (map.getZoom() > 9.5) ? map.getZoom() : 9.5
  })
}
