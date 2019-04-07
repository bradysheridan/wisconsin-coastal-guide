const bpMobile = 768

$(function() {

  // hide success indicator for map share button, which is absolutely positioned
  // on top of the original button text
  $('.shareable-url-generator-wrap img#success').hide()

  // grab url vars, if any
  let urlVars = getUrlVars()

  // if there's a predefined state, check the appropriate boxes
  if (urlVars.checked) {
    let checked = (urlVars.checked.indexOf(',') > 0) ? urlVars.checked.split(",") : [urlVars.checked]
    renderCheckboxes(checked)
  }

  // otherwise, check the default initial boxes
  else {
    let checked = ['wcg-beaches', 'wcg-panoramas', 'wcg-glct-route-lake-michigan']
    renderCheckboxes(checked)
  }

  // queue up the selected feature in map state (actual rendering of popup
  // takes place in map.on('load') function in map.js
  if (urlVars.selectedFid) {
    mapState.featureToFocus = urlVars.selectedFid
  }

  // set map zoom and center
  if (urlVars.zoom && urlVars.center) {
    urlVars.center = urlVars.center.split(',').map((str) => parseFloat(str))
    urlVars.zoom = parseFloat(urlVars.zoom)
    map.setZoom(urlVars.zoom)
    map.setCenter(urlVars.center)
  }

  // handle click for share button
  $('.shareable-url-generator-wrap').on('click', generateShareableURL)

  // handle click for controls menu toggler
  $('.controls-toggler').on('click', toggleControls)

  // initially, hide controls menu on mobile and show it on desktop
  if ($(window).width() > bpMobile) {
    toggleControls()
    $('.controls-toggler .open').hide()
  } else {
    $('.controls-toggler .close').hide()
  }
})

// loop through LAYERS and assign each object a checkbox append checkboxes
// to DOM
function renderCheckboxes(checked) {

  // check initially checked boxes
  if (checked) checked.forEach((str) => (LAYERS[str]) ? LAYERS[str].initiallyChecked = true : null)

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

// toggle visibility of control panel on mobile
function toggleControls() {
  var className = $('#controls-wrap').attr('class')

  // show controls
  if (!className || !className.includes('visible')) {
    $('#map').addClass('controls-are-visible')
    $('#controls-wrap').addClass('visible')
    $('.controls-toggler').addClass('visible')
    $('.controls-toggler .open').fadeOut(100, () => $('.controls-toggler .close').fadeIn(100))
  }

  // hide controls
  else {
    $('#map').removeClass('controls-are-visible')
    $('#controls-wrap').removeClass('visible')
    $('.controls-toggler').removeClass('visible')
    $('.controls-toggler .close').fadeOut(100, () => $('.controls-toggler .open').fadeIn(100))
  }
}

// check for url variables and, if any, set the map state
function setMapStateFromURL() {
  let urlVars = getUrlVars()

  if (urlVars.checked) {
    let checked = (urlVars.checked.indexOf(',') > 0) ? urlVars.checked.split(",") : [urlVars.checked]
    checked.forEach((id) => {
      let el = $(`#${id}`)
      el.click()
    })
  }
}

// generate shareable url whose variables set map state upon load
let copying = false
function generateShareableURL() {
  if (copying) return

  // grab releveant elements
  let message = $('.shareable-url-generator-wrap p')
  let checkboxes = $('.checkbox-wrap')

  // determine selected checkboxes to commit to url map state
  let checked = ""
  checkboxes.each((i, el) => {
    let input = $(el).children()[0]
    let isChecked = input.checked
    if (isChecked) checked += ("" === checked) ? el.id : `,${el.id}`
  })

  // determine if there's a selected feature to commit to url map state
  let selectedFid = (mapState.activePopup) ? mapState.activePopup.properties.fid : null

  // format url
  let urlChecked = `?checked=${checked}`
  let urlSelected = (selectedFid) ? '&selectedFid=' + selectedFid : ''
  let urlZoomAndCenter = (selectedFid) ? '' : `&zoom=${map.getZoom()}&center=${[map.getCenter().lng, map.getCenter().lat]}` // only set zoom/center if there's no specific feature to be focused (the process itself of focusing the feature sets both zoom and center)
  let url = (checked.length > 0)
    ? `${window.location.origin}/${urlChecked}${urlSelected}${urlZoomAndCenter}`
    : window.location.origin

  // format success message
  let messageStr = (checked.length > 0)
    ? "Link Copied"
    : ""

  if (messageStr.length > 0) {
    copyToClipboard(url)

    let delay = 300
    let origText = message.html()
    let shareIcon = $('.shareable-url-generator-wrap img#share')
    let successIcon = $('.shareable-url-generator-wrap img#success')

    // show success icon and text
    copying = true
    message.fadeOut(delay)
    shareIcon.fadeOut(delay)
    setTimeout(() => {
      message.html(messageStr)
      message.fadeIn(delay)
      message.css('color', '#13a151')
      successIcon.fadeIn(delay)
    }, delay)

    // show share icon and text
    setTimeout(() => {
      copying = false
      message.fadeOut(delay)
      successIcon.fadeOut(delay)
      setTimeout(() => {
        message.html(origText)
        message.css('color', '#000')
        message.fadeIn(delay)
        shareIcon.fadeIn(delay)
      }, delay)
    }, 2000)
  }

  return url
}

// get url variables
function getUrlVars() {
  let vars = {}
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => { vars[key] = value })
  return vars
}

// copy text to clipboard
// (taken from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f)
const copyToClipboard = str => {
  const el = document.createElement('textarea')  // Create a <textarea> element
  el.value = str                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '')                // Make it readonly to be tamper-proof
  el.style.position = 'absolute'
  el.style.left = '-9999px'                      // Move outside the screen to make it invisible
  document.body.appendChild(el)                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0       // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)    // Store selection if found
      : false                                    // Mark as false to know no selection existed before
  el.select()                                    // Select the <textarea> content
  document.execCommand('copy')                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el)                  // Remove the <textarea> element
  if (selected) {                                // If a selection existed before copying
    document.getSelection().removeAllRanges()    // Unselect everything on the HTML document
    document.getSelection().addRange(selected)   // Restore the original selection
  }
}
