$(function() {
  // render checkboxes
  renderCheckboxes()

  // toggle logic for mobile side menu
  $('#toggler').click(() => !$('#controls-wrap').attr('class')
    ? $('#controls-wrap').attr('class', 'visible')
    : $('#controls-wrap').attr('class', '')
  )
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

      return `
        <label class="checkbox-wrap">
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
}
