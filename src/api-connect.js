const twkb = require('twkb');

const baseUrl = 'http://localhost:3000/api'

async function getApi(path, options = {}) {
  try {
    const url = baseUrl + path;
    const blob = await fetch(url);
    const json = await blob.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
}

function downloadMap(url, tipoCollegio, color, callback) {
  fetch(url)
    .then((geoJsonResponse) => {
      geoJsonResponse.arrayBuffer()
        .then((buffer) => {
          const geoJson = twkb.toGeoJSON(new Uint8Array(buffer));

          callback(geoJson, tipoCollegio, color);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getApi, downloadMap };
