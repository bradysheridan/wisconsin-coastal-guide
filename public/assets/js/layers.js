let LAYERS = {

  // point layers (csv)
  "wcg-beaches": {
    "text": "Beaches",
    "initiallyChecked": false,
    "filename": "wcg-beaches.csv",
    "geographyType": "points",
    "fill": "#5B85AA"
  },
  "wcg-panoramas": {
    "text": "360 Degree Panoramas",
    "initiallyChecked": false,
    "filename": "wcg-panoramas.csv",
    "geographyType": "points",
    "fill": "#F46036"
  },
  "wcg-boat-access": {
    "text": "Boat Access Points",
    "initiallyChecked": false,
    "filename": "wcg-boat-access.csv",
    "geographyType": "points",
    "fill": "#36F1CD"
  },
  "wcg-stories": {
    "text": "Great Lakes Stories",
    "initiallyChecked": false,
    "filename": "wcg-stories.csv",
    "geographyType": "points",
    "fill": "#EF798A"
  },
  "wcg-historic-ls": {
    "text": "Historic Sites on Lake Superior",
    "initiallyChecked": false,
    "filename": "wcg-historic-ls.csv",
    "geographyType": "points",
    "fill": "#FFC857"
  },
  "wcg-lighthouses": {
    "text": "Lighthouses",
    "initiallyChecked": false,
    "filename": "wcg-lighthouses.csv",
    "geographyType": "points",
    "fill": "#63B0CD"
  },
  "wcg-marinas": {
    "text": "Marinas",
    "initiallyChecked": false,
    "filename": "wcg-marinas.csv",
    "geographyType": "points",
    "fill": "#E9D2F4"
  },
  "wcg-maritime-geocaches": {
    "text": "Maritime History Geocaches",
    "initiallyChecked": false,
    "filename": "wcg-maritime-geocaches.csv",
    "geographyType": "points",
    "fill": "#da3737"
  },
  "wcg-nature-centers": {
    "text": "Nature Centers",
    "initiallyChecked": false,
    "filename": "wcg-nature-centers.csv",
    "geographyType": "points",
    "fill": "#3c9023"
  },
  "wcg-parks": {
    "text": "Parks",
    "initiallyChecked": false,
    "filename": "wcg-parks.csv",
    "geographyType": "points",
    "fill": "#7b32a7"
  },
  "wcg-shipwrecks": {
    "text": "Shipwrecks",
    "initiallyChecked": false,
    "filename": "wcg-shipwrecks.csv",
    "geographyType": "points",
    "fill": "#9BC53D"
  },
  "wcg-sna": {
    "text": "State Natural Areas",
    "initiallyChecked": false,
    "filename": "wcg-sna.csv",
    "geographyType": "points",
    "fill": "#197BBD"
  },

  // path layers (geojson)
  "wcg-glct-route-lake-michigan": {
    "text": "Lake Michigan Circle Tour",
    "initiallyChecked": false,
    "filename": "wcg-glct-route-lake-michigan.json",
    "geographyType": "paths",
    "fill": "#39A0ED"
  },
  "wcg-glct-route-lake-superior": {
    "text": "Lake Superior Circle Tour",
    "initiallyChecked": false,
    "filename": "wcg-glct-route-lake-superior.json",
    "geographyType": "paths",
    "fill": "#EDAFB8"
  },
  "wcg-rustic-roads": {
    "text": "Rustic Roads",
    "initiallyChecked": false,
    "filename": "wcg-rustic-roads.json",
    "geographyType": "paths",
    "fill": "#7BDFF2"
  },
  "wcg-byways": {
    "text": "Scenic Byways",
    "initiallyChecked": false,
    "filename": "wcg-byways.json",
    "geographyType": "paths",
    "fill": "#C08497"
  },
}

const LAYER_KEYS = Object.keys(LAYERS)
const POINT_LAYER_KEYS = LAYER_KEYS.filter((k) => LAYERS[k].geographyType === "points")
const PATH_LAYER_KEYS = LAYER_KEYS.filter((k) => LAYERS[k].geographyType === "paths")
