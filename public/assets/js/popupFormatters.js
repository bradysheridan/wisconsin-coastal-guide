const popupFor = {
  // beaches
  'wcg-beaches.json': (properties) => `
    <div class="title-wrap">
      <p>${properties.name}</p>
    </div>
    <div class="body-wrap">
      <p>Nearest Town: ${properties.nearestTown}</p>
      <p>Length: ${withCommas(properties.length)} ft</p>
      <p>Beach Code: ${properties.beachCode}</p>
      ${
        (properties.epaId && "null" !== properties.epaId)
          ? `<p>EPA ID: ${properties.epaId}</p>`
          : ''
      }
      <div class="separator">
      </div>
      <a href="http://www.wibeaches.us/" target="_blank">
        <p>
          http://www.wibeaches.us/
        </p>
      </a>
    </div>
  `
}
