import appState from './appState';
import presets from './autoPresets';

let delayTime, incomingPresetsQueue, scene, scheduledUpdate;

export function initAutoMode(_scene) {
  scene = _scene;

  const auto = appState.getQS().get('auto');
  if (!auto) {
    return;
  }

  let parsedMilliseconds = parseInt(auto, 10);
  if (Number.isNaN(parsedMilliseconds)) {
    console.error('malformed auto param; not a number');
    return;
  }

  if (parsedMilliseconds <= 500) {
    console.warn('auto param is too small; defaulting to 30');
    parsedMilliseconds = 30000;
  }

  delayTime = parsedMilliseconds;
  scheduledUpdate = setTimeout(next, delayTime);

  // TODO: When user changes any argument of a field, we need to stop the mode.
  // we could use `bus` here to listen for change events, and dispose.
  return dispose;
}

function dispose() {
  clearTimeout(scheduledUpdate);
  scheduledUpdate = 0;
  // TODO: When disposed we need to drop the `auto` argument from the query string.
  // otherwise if people share it, they can unintentionally switch on auto mode
}

function next() {
  if (!incomingPresetsQueue || !incomingPresetsQueue.length) {
    // TODO: shuffle
    incomingPresetsQueue = presets.slice();
  }

  const preset = incomingPresetsQueue.shift();

  scene.vectorFieldEditorState.setCode(preset.code);

  if (defined(preset.colorMode)) {
    scene.setColorMode(preset.colorMode);
  }

  if (defined(preset.timeStep)) {
    scene.setIntegrationTimeStep(preset.timeStep);
  }

  if (defined(preset.fadeOut)) {
    scene.setFadeOutSpeed(preset.fadeOut);
  }

  if (defined(preset.dropProbability)) {
    scene.setDropProbability(preset.dropProbability);
  }

  if (defined(preset.particleCount)) {
    scene.setParticlesCount(preset.particleCount);
  }

  const bbox = appState.makeBBox(preset.cx, preset.cy, preset.w, preset.h);
  if (bbox) {
    scene.moveBoundingBox(bbox);
  }

  // TODO: fo, dt, dp, cx, cy, w, h, pc, code

  scheduledUpdate = setTimeout(next, delayTime);
}

function defined(number) {
  return Number.isFinite(number);
}
