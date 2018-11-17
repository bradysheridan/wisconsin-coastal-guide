$(function() {

  // instantiate checkboxes
  const checkboxes = [
    { name: 'panoramas', text: '360 Degree Panoramas', checked: true },
    { name: 'beaches', text: 'Beaches', checked: false },
    { name: 'bikeRoutes', text: 'Bike Routes', checked: false },
    { name: 'boatAccess', text: 'Boat Access', checked: false },
    { name: 'lakeMichiganCircleTour', text: 'Lake Michigan Circle Tour', checked: false },
    { name: 'lakeSuperiorCircleTour', text: 'Lake Superior Circle Tour', checked: false },
    { name: 'greatLakesStories', text: 'Great Lakes Stories', checked: false },
    { name: 'harborTowns', text: 'Harbor Towns', checked: false },
    { name: 'historicSitesLakeSuperior', text: 'Historic Sites - Lake Superior', checked: false },
    { name: 'lighthouses', text: 'Lighthouses', checked: false },
    { name: 'marinas', text: 'Marinas', checked: false },
    { name: 'maritimeHistoryGeocaches', text: 'Maritime History Geocaches', checked: false },
    { name: 'natureCenters', text: 'Nature Centers', checked: false },
    { name: 'parks', text: 'Parks', checked: false },
    { name: 'rusticRoads', text: 'Rustic Roads', checked: false },
    { name: 'scenicByways', text: 'Scenic Byways', checked: false },
    { name: 'shipwrecks', text: 'Shipwrecks', checked: false },
    { name: 'stateNaturalAreas', text: 'State Natural Areas', checked: false }
  ]

  var checkboxElements = checkboxes.map((d) => {
    return `
      <label class="checkbox-wrap">
        ${d.text}
        <input type="checkbox" ${(d.checked) ? 'checked' : ''}>
        <span class="checkmark"></span>
      </label>
    `
  })

  $("#place-type-checklist").append(checkboxElements)

  // toggle logic for mobile side menu
  $('#toggler').click(() => !$('#controls-wrap').attr('class')
    ? $('#controls-wrap').attr('class', 'visible')
    : $('#controls-wrap').attr('class', '')
  )
})
