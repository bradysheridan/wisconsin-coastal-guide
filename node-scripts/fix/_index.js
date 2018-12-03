module.exports.fix = function(dataset) {
  var filepath = ''

  switch(dataset) {
    case "beaches": filepath = './fix-beaches.js'; break;
    case "boatAccessPoints": filepath = './fix-boat-access-points.js'; break;
    case "historicalSites": filepath = './fix-historical-ls.js'; break;
    case "lighthouses": filepath = './fix-lighthouses.js'; break;
    case "marinas": filepath = './fix-marinas.js'; break;
    case "maritimeGeocaches": filepath = './fix-maritime-geocaches.js'; break;
    case "natureCenters": filepath = './fix-nature-centers.js'; break;
    case "parks": filepath = './fix-parks.js'; break;
    case "shipwrecks": filepath = './fix-shipwrecks.js'; break;
    case "stateNaturalAreas": filepath = './fix-sna.js'; break;
    case "stories": filepath = './fix-stories.js'; break;
    default: console.log("No 'functionName' parameter was passed, which dataset do you want to fix?"); return;
  }

  require(filepath).run()
}
