function handlePathClick(e) {
  console.log('handlePathClick was invoked for', e)
}

function handlePointClick(e) {
  var feature = e.features[0]
  var coordinates = feature.geometry.coordinates.slice()
  var html = popupFor[feature.layer.id](feature.properties)

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
  new mapboxgl.Popup({offset: popupOffsets, className: 'popup-wrap'})
    .setLngLat(coordinates)
    .setHTML(html)
    .addTo(map)

  // reposition map
  map.flyTo({
    center: coordinates,
    zoom: 9.5
  })
}
