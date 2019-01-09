const popupFor = {

  // (point layer) panoramas
  'wcg-panoramas.json': (properties) => `
    <div class="title-wrap panorama" style="border-left-color: ${properties.accentColor};">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Panorama
      </p>
      <p>
        ${properties.name}
      </p>
    </div>
    <div class="body-wrap panorama" style="padding: 0px;">
      <!-- panorama image -->
      <div id="pmvr">
        <param name="image" value="assets/images/panoramas/${properties.img}">
        <param name="view" value="360">
        <param name="pixdeg" value="0=130,27136=130">
        <canvas width="100%" height="100%" tabindex="0" style="position: absolute; display: block; outline: none; touch-action: none; cursor: auto;"></canvas>
      </div>

      <!-- fullscreen button -->
      <a href="${properties.panoramaURL}" target="_blank" class="link-to-original">
        <img src="assets/images/icons/maximize.svg" />
      </a>
    </div>
  `,

  // (point layer) beaches
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

  // (point layer) boat access points
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

  // (point layer) great lakes stories
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

  // (point layer) historical sites along lake superior
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

  // (point layer) lighthouses
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

  // (point layer) marinas
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

  // (point layer) maritime geocaches
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

  // (point layer) nature centers
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

  // (point layer) parks
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

  // (point layer) shipwrecks
  'wcg-shipwrecks.json': (properties) => {
    properties.ships = JSON.parse(properties.ships)
    properties.readMore = properties.readMore.replace(new RegExp("<a", "g"), "<a target='_blank'")
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
  },

  // (point layer) state natural areas
  'wcg-sna.json': (properties) => {
    properties.links = JSON.parse(properties.links)
    return `
      <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
        <p style="font-size: 1.4rem; color: ${properties.accentColor}">
          State Natural Area
        </p>
        <p>
          ${properties.name}
        </p>
      </div>
      <div class="body-wrap">
        <p>${properties.description}</p>
        <div class="separator"></div>
        <p>
          Check out the detailed <a target='_blank' href='${properties.links.description}'>description</a> and <a target='_blank' href='${properties.links.map}'>map</a> of ${properties.name} Natural Area from the Wisconsin DNR.
        </p>
      </div>
    `
  },

  // (path layer) lake michigan circle tour
  'wcg-glct-route-lake-michigan.json': (properties) => `
    <div class="title-wrap" style="border-left-color: ${properties.accentColor} !important;">
      <p style="font-size: 1.4rem; color: ${properties.accentColor}">
        Tour of Lake Michigan
      </p>
      <p>
        ${properties.name}
      </p>
    </div>
    <div class="body-wrap">
      <p>${properties.description}</p>
      <div class="separator"></div>
      <p>
        Check out the detailed <a target='_blank' href='${properties.links.description}'>description</a> and <a target='_blank' href='${properties.links.map}'>map</a> of ${properties.name} Natural Area from the Wisconsin DNR.
      </p>
    </div>
  `,
}
