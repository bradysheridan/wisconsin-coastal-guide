const LAYERS = {
  "panoramas": {
    "text": "360 Degree Panoramas",
    "initiallyChecked": false,
    "filename": "",
    "fill": "#1bd5ca",
    "geographyType": "points"
  },
  "beaches": {
    "text": "Beaches",
    "initiallyChecked": true,
    "filename": "wcg-beaches.json",
    "fill": "#1bb3d5",
    "geographyType": "points"
  },
  "bikeRoutes": {
    "text": "Bike Routes",
    "initiallyChecked": false,
    "filename": "",
    "fill": "#1b92d5",
    "geographyType": "paths"
  },
  "boatAccess": {
    "text": "Boat Access Points",
    "initiallyChecked": false,
    "filename": "wcg-boat-access.json",
    "fill": "#1b60d5",
    "geographyType": "points"
  },
  "lakeMichiganCircleTour": {
    "text": "Lake Michigan Circle Tour",
    "initiallyChecked": false,
    "filename": "wcg-glct-route-lake-michigan.geojson",
    "fill": "#1b28d5",
    "geographyType": "paths"
  },
  "lakeSuperiorCircleTour": {
    "text": "Lake Superior Circle Tour",
    "initiallyChecked": false,
    "filename": "wcg-glct-route-lake-superior.geojson",
    "fill": "#511bd5",
    "geographyType": "paths"
  },
  "greatLakesStories": {
    "text": "Great Lakes Stories",
    "initiallyChecked": false,
    "filename": "wcg-stories.json",
    "fill": "#7d1bd5",
    "geographyType": "points"
  },
  "harborTowns": {
    "text": "Harbor Towns",
    "initiallyChecked": false,
    "filename": "",
    "fill": "#a41bd5",
    "geographyType": "points"
  },
  "historicSitesLakeSuperior": {
    "text": "Historic Sites on Lake Superior",
    "initiallyChecked": false,
    "filename": "wcg-historic-ls.geojson",
    "fill": "#cc1bd5",
    "geographyType": "points"
  },
  "lighthouses": {
    "text": "Lighthouses",
    "initiallyChecked": false,
    "filename": "wcg-lighthouses.geojson",
    "fill": "#d51bb2",
    "geographyType": "points"
  },
  "marinas": {
    "text": "Marinas",
    "initiallyChecked": false,
    "filename": "wcg-marinas.geojson",
    "fill": "#d51b8a",
    "geographyType": "points"
  },
  "maritimeHistoryGeocaches": {
    "text": "Maritime History Geocaches",
    "initiallyChecked": false,
    "filename": "wcg-maritime-geocaches.geojson",
    "fill": "#d51b63",
    "geographyType": "points"
  },
  "natureCenters": {
    "text": "Nature Centers",
    "initiallyChecked": false,
    "filename": "wcg-nature-centers.geojson",
    "fill": "#d51b3c",
    "geographyType": "points"
  },
  "parks": {
    "text": "Parks",
    "initiallyChecked": false,
    "filename": "wcg-parks.geojson",
    "fill": "#e85151",
    "geographyType": "points"
  },
  "rusticRoads": {
    "text": "Rustic Roads",
    "initiallyChecked": false,
    "filename": "wcg-rustic-roads.geojson",
    "fill": "#e89551",
    "geographyType": "paths"
  },
  "scenicByways": {
    "text": "Scenic Byways",
    "initiallyChecked": false,
    "filename": "wcg-byways.geojson",
    "fill": "#e8e751",
    "geographyType": "paths"
  },
  "shipwrecks": {
    "text": "Shipwrecks",
    "initiallyChecked": false,
    "filename": "wcg-shipwrecks.geojson",
    "fill": "#7de851",
    "geographyType": "points"
  },
  "stateNaturalAreas": {
    "text": "State Natural Areas",
    "initiallyChecked": false,
    "filename": "wcg-sna.geojson",
    "fill": "#51e869",
    "geographyType": "points"
  }
}

const LAYER_KEYS = Object.keys(LAYERS)
const POINT_LAYER_KEYS = LAYER_KEYS.filter((k) => LAYERS[k].geographyType === "points")
const PATH_LAYER_KEYS = LAYER_KEYS.filter((k) => LAYERS[k].geographyType === "paths")
