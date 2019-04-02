const LAYERS = {

  // point layers (csv)
  "beaches": {
    "text": "Beaches",
    "initiallyChecked": true,
    "filename": "wcg-beaches.csv",
    "geographyType": "points",
    "fill": "#5B85AA"
  },
  "panoramas": {
    "text": "360 Degree Panoramas",
    "initiallyChecked": true,
    "filename": "wcg-panoramas.csv",
    "geographyType": "points",
    "fill": "#F46036"
  },
  "boatAccess": {
    "text": "Boat Access Points",
    "initiallyChecked": false,
    "filename": "wcg-boat-access.csv",
    "geographyType": "points",
    "fill": "#36F1CD"
  },
  "greatLakesStories": {
    "text": "Great Lakes Stories",
    "initiallyChecked": false,
    "filename": "wcg-stories.csv",
    "geographyType": "points",
    "fill": "#EF798A"
  },
  "historicSitesLakeSuperior": {
    "text": "Historic Sites on Lake Superior",
    "initiallyChecked": false,
    "filename": "wcg-historic-ls.csv",
    "geographyType": "points",
    "fill": "#FFC857"
  },
  "lighthouses": {
    "text": "Lighthouses",
    "initiallyChecked": false,
    "filename": "wcg-lighthouses.csv",
    "geographyType": "points",
    "fill": "#63B0CD"
  },
  "marinas": {
    "text": "Marinas",
    "initiallyChecked": false,
    "filename": "wcg-marinas.csv",
    "geographyType": "points",
    "fill": "#E9D2F4"
  },
  "maritimeHistoryGeocaches": {
    "text": "Maritime History Geocaches",
    "initiallyChecked": false,
    "filename": "wcg-maritime-geocaches.csv",
    "geographyType": "points",
    "fill": "#da3737"
  },
  "natureCenters": {
    "text": "Nature Centers",
    "initiallyChecked": false,
    "filename": "wcg-nature-centers.csv",
    "geographyType": "points",
    "fill": "#3c9023"
  },
  "parks": {
    "text": "Parks",
    "initiallyChecked": false,
    "filename": "wcg-parks.csv",
    "geographyType": "points",
    "fill": "#7b32a7"
  },
  "shipwrecks": {
    "text": "Shipwrecks",
    "initiallyChecked": false,
    "filename": "wcg-shipwrecks.csv",
    "geographyType": "points",
    "fill": "#9BC53D"
  },
  "stateNaturalAreas": {
    "text": "State Natural Areas",
    "initiallyChecked": false,
    "filename": "wcg-sna.csv",
    "geographyType": "points",
    "fill": "#197BBD"
  },

  // path layers (geojson)
  "lakeMichiganCircleTour": {
    "text": "Lake Michigan Circle Tour",
    "initiallyChecked": true,
    "filename": "wcg-glct-route-lake-michigan.json",
    "geographyType": "paths",
    "fill": "#39A0ED"
  },
  "lakeSuperiorCircleTour": {
    "text": "Lake Superior Circle Tour",
    "initiallyChecked": false,
    "filename": "wcg-glct-route-lake-superior.json",
    "geographyType": "paths",
    "fill": "#EDAFB8"
  },
  "rusticRoads": {
    "text": "Rustic Roads",
    "initiallyChecked": false,
    "filename": "wcg-rustic-roads.json",
    "geographyType": "paths",
    "fill": "#7BDFF2"
  },
  "scenicByways": {
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
