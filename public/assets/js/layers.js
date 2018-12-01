const LAYERS = {
  "panoramas": {
    "text": "360 Degree Panoramas",
    "initiallyChecked": false,
    "filename": "",
    "geographyType": "points",
    "fill": "#F46036"
  },
  "beaches": {
    "text": "Beaches",
    "initiallyChecked": true,
    "filename": "wcg-beaches.json",
    "geographyType": "points",
    "fill": "#5B85AA"
  },
  "bikeRoutes": {
    "text": "Bike Routes",
    "initiallyChecked": false,
    "filename": "",
    "geographyType": "paths",
    "fill": "#372248"
  },
  "boatAccess": {
    "text": "Boat Access Points",
    "initiallyChecked": false,
    "filename": "wcg-boat-access.json",
    "geographyType": "points",
    "fill": "#36F1CD"
  },
  "lakeMichiganCircleTour": {
    "text": "Lake Michigan Circle Tour",
    "initiallyChecked": false,
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
  "greatLakesStories": {
    "text": "Great Lakes Stories",
    "initiallyChecked": false,
    "filename": "wcg-stories.json",
    "geographyType": "points",
    "fill": "#EF798A"
  },
  "harborTowns": {
    "text": "Harbor Towns",
    "initiallyChecked": false,
    "filename": "",
    "geographyType": "points",
    "fill": "#FF0022"
  },
  "historicSitesLakeSuperior": {
    "text": "Historic Sites on Lake Superior",
    "initiallyChecked": false,
    "filename": "wcg-historic-ls.json",
    "geographyType": "points",
    "fill": "#FFC857"
  },
  "lighthouses": {
    "text": "Lighthouses",
    "initiallyChecked": false,
    "filename": "wcg-lighthouses.json",
    "geographyType": "points",
    "fill": "#63B0CD"
  },
  "marinas": {
    "text": "Marinas",
    "initiallyChecked": false,
    "filename": "wcg-marinas.json",
    "geographyType": "points",
    "fill": "#E9D2F4"
  },
  "maritimeHistoryGeocaches": {
    "text": "Maritime History Geocaches",
    "initiallyChecked": false,
    "filename": "wcg-maritime-geocaches.json",
    "geographyType": "points",
    "fill": "#da3737"
  },
  "natureCenters": {
    "text": "Nature Centers",
    "initiallyChecked": false,
    "filename": "wcg-nature-centers.json",
    "geographyType": "points",
    "fill": "#3c9023"
  },
  "parks": {
    "text": "Parks",
    "initiallyChecked": false,
    "filename": "wcg-parks.json",
    "geographyType": "points",
    "fill": "#7b32a7"
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
  "shipwrecks": {
    "text": "Shipwrecks",
    "initiallyChecked": false,
    "filename": "wcg-shipwrecks.json",
    "geographyType": "points",
    "fill": "#9BC53D"
  },
  "stateNaturalAreas": {
    "text": "State Natural Areas",
    "initiallyChecked": false,
    "filename": "wcg-sna.json",
    "geographyType": "points",
    "fill": "#197BBD"
  }
}

const LAYER_KEYS = Object.keys(LAYERS)
const POINT_LAYER_KEYS = LAYER_KEYS.filter((k) => LAYERS[k].geographyType === "points")
const PATH_LAYER_KEYS = LAYER_KEYS.filter((k) => LAYERS[k].geographyType === "paths")
