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
  var checkboxElements = Object.keys(LAYERS).map((k) => {
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

  $("#place-type-checklist").append(checkboxElements)
}

// toggle corresponding map layer's visibility
function handleCheckboxClick(cb, layerID) {
  map.setLayoutProperty(layerID, 'visibility', (cb.checked) ? 'visible' : 'none')
}
