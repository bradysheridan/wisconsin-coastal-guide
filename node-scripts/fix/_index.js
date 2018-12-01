module.exports.fix = function(dataset) {
  var filepath = ''

  switch(dataset) {
    case "beaches": filepath = './fix-beaches.js'; break;
    case "boatAccessPoints": filepath = './fix-boat-access-points.js'; break;
    case "historicalSites": filepath = './fix-historical-ls.js'; break;
    case "stories": filepath = './fix-stories.js'; break;
    case "lighthouses": filepath = './fix-lighthouses.js'; break;
    case "marinas": filepath = './fix-marinas.js'; break;
    case "maritimeGeocaches": filepath = './fix-maritime-geocaches.js'; break;
    default: console.log("No 'functionName' parameter was passed, which dataset do you want to fix?"); return;
  }

  require(filepath).run()
}
