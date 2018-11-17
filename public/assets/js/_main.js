mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhZHlzaGVyaWRhbiIsImEiOiJjajloOWx2Z2cyeTV1MnFwYXhhYTJpemZ6In0.K9wxtIEOaHGRrsofhcu-3w'

const anchors = {
  wi: [-90, 44.75]
}

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/bradysheridan/cjoly51q716fn2spgkluo6yxq',
  center: anchors.wi,
  zoom: 6.0
})
