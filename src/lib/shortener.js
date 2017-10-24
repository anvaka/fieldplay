/**
 * Provides an API to google's shortener.
 */

// This key is bound to my domain names: anvaka.github.io
// you'll need to get your own key if you want to use google's shortener.
const key = 'AIzaSyDXQD27wCjIZLq2gzAUQKeHbIODElpa-4w';
const endpoint = `https://www.googleapis.com/urlshortener/v1/url?key=${key}`;
const cache = new Map();

/**
 * @param {String} link that you want to shorten.
 * @returns {Promise} that is resolved with a shortened link
 */
export default function shorten(link) {
  return new Promise((resolve, reject) => {
    let cachedResponse = cache.get(link);
    if (cachedResponse) {
      resolve(cachedResponse);
      return;
    }

    var req = new XMLHttpRequest();

    req.addEventListener("error", transferFailed, false);
    req.addEventListener("load", transferComplete, false);
    req.addEventListener("abort", transferCanceled, false);
    req.open('POST', endpoint);
    req.setRequestHeader('Content-type', 'application/json');

    req.send(JSON.stringify({
      longUrl: link
    }));

    function transferComplete() {
      if (req.status !== 200) {
        reject(`Unexpected status code ${req.status}`);
        return;
      }
      var response = req.response;
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }

      cache.set(link, response.id);
      resolve(response.id);
    }

    function transferFailed() {
      reject(`Failed to shorten link`);
    }

    function transferCanceled() {
      reject(`Cancelled shortening of the link`);
    }
  });
}