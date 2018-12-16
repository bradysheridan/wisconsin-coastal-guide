$(function() {
  // render checkboxes
  renderCheckboxes()

  // toggle logic for mobile side menu
  $('#mobile-controls-toggler').click((e) => toggleMobileControlPanel(e))

  // click logic for mobile about-this-map button
  $('button#about-this-map').click((e) => goToAboutSection())
})

// loop through LAYERS and assign each object a checkbox; append checkboxes
// to DOM
function renderCheckboxes() {
  var pointLayers = LAYER_KEYS.filter((k) => LAYERS[k].geographyType === "points")
  var pathLayers = LAYER_KEYS.filter((k) => LAYERS[k].geographyType === "paths")
  var checkboxElementsForPointLayers = getCheckboxElements(pointLayers)
  var checkboxElementsForPathLayers = getCheckboxElements(pathLayers)
  $("#checklist-for-point-layers").append(checkboxElementsForPointLayers)
  $("#checklist-for-path-layers").append(checkboxElementsForPathLayers)

  function getCheckboxElements(layers) {
    return layers.map((k) => {
      let d = LAYERS[k]

      if ("" === d.filename) return

      let id = d.filename.split('.')[0]

      return `
        <label class="checkbox-wrap" id="${id}">
          ${d.text}
          <input type="checkbox" ${(d.initiallyChecked) ? 'checked' : ''} onclick='handleCheckboxClick(this, "${d.filename}")' maplayerid="${d.filename}">
          <span class="checkmark"></span>
        </label>
      `
    })
  }
}

// toggle corresponding map layer's visibility
function handleCheckboxClick(cb, layerID) {
  map.setLayoutProperty(layerID, 'visibility', (cb.checked) ? 'visible' : 'none')

  // if this layer is being deselected and there's an active popup for a
  // feature within this layer, remove the popup
  if (mapState.activePopup && !cb.checked && mapState.activePopup.layerId === layerID) {
    mapState.activePopup.remove()
    mapState.activePopup = null
  }
}

// toggle visibility of contorl panel on mobile
function toggleMobileControlPanel(e) {
  e.preventDefault()

  var className = $('#controls-wrap').attr('class')

  if (!className || !className.includes('visible')) {
    $('#controls-wrap').attr('class', 'visible')
    $('#mobile-controls-toggler p').text('Hide Legend')
  } else {
    $('#controls-wrap').attr('class', '')
    $('#mobile-controls-toggler p').text('Show Legend')
  }
}

// go to about section
function goToAboutSection() {
  $('html, body').animate({
    scrollTop: ($('#about').offset().top)
  }, 200)
}









//
