import appState from './appState';
import presets from './autoPresets';

let delayTime, incoming, scene;

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
  setTimeout(next, delayTime);
}

function next() {
  if (!incoming || !incoming.length) {
    // TODO: shuffle
    incoming = presets.slice();
  }

  const preset = incoming.shift();

  scene.vectorFieldEditorState.setCode(preset.code);
  scene.setColorMode(preset.colorMode);

  // TODO: fo, dt, dp, cx, cy, w, h, pc, code

  setTimeout(next, delayTime);
}
