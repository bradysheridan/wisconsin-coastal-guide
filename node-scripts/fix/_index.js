module.exports.fix = function(dataset) {
  var filepath = ''

  switch(dataset) {
    case "beaches": filepath = './fix-beaches.js'; break;
    case "boatAccessPoints": filepath = './fix-boat-access-points.js'; break;
    default: console.log("No 'functionName' parameter was passed, which dataset do you want to fix?"); return;
  }

  require(filepath).run()
}