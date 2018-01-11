import appState from './appState';

let delayTime, incoming, scene, presets;

export function initAutoMode(_scene) {
  scene = _scene;

  const auto = appState.getQS().get('auto');
  if (!auto) {
    return;
  }

  if (!/s$/i.test(auto)) {
    console.error('malformed auto param; missing seconds specifier');
    return;
  }

  let seconds = parseFloat(auto.replace(/s$/i, ''));
  if (Number.isNaN(seconds)) {
    console.error('malformed auto param; not a number');
    return;
  }

  if (seconds <= 1) {
    console.warn('auto param seconds too small; defaulting to 30');
    seconds = 30;
  }

  delayTime = seconds * 1000;

  getJSON('/static/autoPresets.json', function(data) {
    presets = data;
    setTimeout(next, delayTime);
  }, function() {
    console.error('unable to load auto presets file');
  });
}

function next() {
  if (!incoming || !incoming.length) {
    // TODO: shuffle
    incoming = presets.slice();
  }

  const preset = incoming.shift();
  // console.warn(preset);

  const code = decodeURIComponent(preset.vf);
  scene.vectorFieldEditorState.setCode(code);
  scene.setColorMode(preset.cm);

  // TODO: fo, dt, dp, cx, cy, w, h, pc, code

  setTimeout(next, delayTime);
}

// TODO: Does Vue have a utility like this built in?
function getJSON(url, success, failure) {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.responseText);
      } catch (e) {
        console.error(e);
      }

      if (data) {
        success(data);
      } else {
        failure();
      }
    } else {
      failure();
    }
  };

  request.onerror = function() {
    failure();
  };

  request.send();
}
