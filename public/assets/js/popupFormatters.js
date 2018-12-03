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
          www.wibeaches.us
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

  // marinas
  'wcg-marinas.json': (properties) => {
    properties.address = JSON.parse(properties.address)
    properties.link = JSON.parse(properties.link)
    return `
      <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
        <p style="font-size: 1.4rem; color: ${properties.accentColor}">
          Marina
        </p>
        <p>
          ${properties.name}
        </p>
      </div>
      <div class="body-wrap">
        <p>${properties.description}</p>
        <div class="separator"></div>
        <p>${properties.address.street}</p>
        <p>${properties.address.city}, WI ${properties.address.zip}</p>
        ${(properties.link.text && properties.link.text.indexOf('.') > 0)
            ? `<p><a href="http://${properties.link.text}" target="_blank" style="font-size: inherit;">${properties.link.text}</a></p>`
            : ''
        }
        <p>${properties.phone}</p>
      </div>
    `
  },

  // maritime geocaches
  'wcg-maritime-geocaches.json': (properties) => `
    <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Maritime History Geocache
      </p>
      <p>
        ${properties.name} (${properties.code})
      </p>
    </div>
    <div class="body-wrap">
      <p>${properties.description}</p>
      <div class="separator"></div>
      <a href="${properties.link}" target="_blank">
        <p>
          Find this geocache
        </p>
      </a>
    </div>
  `,

  // nature centers
  'wcg-nature-centers.json': (properties) => `
    <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Nature Center
      </p>
      <p>
        ${properties.name}
      </p>
    </div>
    <div class="body-wrap">
      <p>${properties.description}</p>
      <div class="separator"></div>
      <a href="${properties.link}" target="_blank">
        <p>
          More information
        </p>
      </a>
    </div>
  `,

  // parks
  'wcg-parks.json': (properties) => {
    properties.links = JSON.parse(properties.links)
    return `
      <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
        <p style="font-size: 1.4rem; color: ${properties.accentColor}">
          Park
        </p>
        <p>
          ${properties.name}
        </p>
      </div>
      <div class="body-wrap">
        <p>Managed by: ${properties.subtitle}</p>
        ${properties.links && properties.links.length > 0
          ? `<div class="separator"></div>`
          : ``}
        ${properties.links.map((l) => `
            <a href="${l.href}" target="_blank">
              <p>
                ${l.text}
              </p>
            </a>`
          )}
      </div>
    `
  },

  // shipwrecks
  'wcg-shipwrecks.json': (properties) => {
    properties.ships = JSON.parse(properties.ships)
    return `
      <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
        <p style="font-size: 1.4rem; color: ${properties.accentColor}">
          Shipwreck
        </p>
        <p>
          ${properties.name}
        </p>
      </div>
      <div class="body-wrap">
        <p>${properties.description}</p>
        <br />
        ${properties.ships.map((ship) => `
          <p style="font-weight: 700; font-style: italic;">${ship.name}</p>
          <p style="font-weight: 700;">${ship.type}</p>
          <p>Launched: ${ship.launched}</p>
          <p>Wrecked: ${ship.wrecked}</p>
          `
        )}
        <div class="separator"></div>
        <p>
          ${properties.readMore}
        </p>
      </div>
    `
  }
}
