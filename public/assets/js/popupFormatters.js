const popupFor = {

  // beaches
  'wcg-beaches.json': (properties) => `
    <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Beach
      </p>
      <p>
        ${
          (properties.name.includes("#"))
            ? properties.name.slice(0, properties.name.indexOf('#')) + " Beach " + properties.name.slice(properties.name.indexOf('#'))
            : properties.name + " Beach"
        }
      </p>
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
      <div class="separator"></div>
      <a href="http://www.wibeaches.us/" target="_blank">
        <p>
          http://www.wibeaches.us/
        </p>
      </a>
    </div>
  `,

  // boat access points
  'wcg-boat-access.json': (properties) => `
    <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Boat Access Point
      </p>
      <p>
        ${properties.name}
      </p>
    </div>
    <div class="body-wrap">
      <p>${properties.description}</p>
    </div>
  `,

  // great lakes stories
  'wcg-stories.json': (properties) => `
    <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Great Lakes Story
      </p>
      <p>
        ${properties.name}
      </p>
    </div>
    <div class="body-wrap">
      <p>${properties.description}</p>
      <div class="separator"></div>
      <a href="${properties.readMoreLink}" target="_blank">
        <p>
          Read more.
        </p>
      </a>
    </div>
  `,

  // historical sites along lake superior
  'wcg-historic-ls.json': (properties) => `
    <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Historical Site on Lake Superior
      </p>
      <p>
        ${properties.name}
      </p>
    </div>
    <div class="body-wrap">
      <p>${properties.description}</p>
    </div>
  `,

  // lighthouses
  'wcg-lighthouses.json': (properties) => `
    <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Lighthouse
      </p>
      <p>
        ${properties.name}
      </p>
    </div>
    <div class="body-wrap">
      <p>${properties.description}</p>
    </div>
  `,
}
