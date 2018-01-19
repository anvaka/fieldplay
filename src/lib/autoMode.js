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
    console.warn('auto param is too small; defaulting to 30000');
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
    incomingPresetsQueue = shuffle(presets);
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
    animateBBox(bbox);
  }

  scheduledUpdate = setTimeout(next, delayTime);
}

function animateBBox(endBBox) {
  const startBBox = Object.assign({}, scene.getBoundingBox());
  const duration = 3000;
  const startTime = Date.now();
  const diffMinX = endBBox.minX - startBBox.minX;
  const diffMaxX = endBBox.maxX - startBBox.maxX;
  const diffMinY = endBBox.minY - startBBox.minY;
  const diffMaxY = endBBox.maxY - startBBox.maxY;

  const frame = function() {
    const factor = (Date.now() - startTime) / duration;
    if (factor >= 1) {
      scene.applyBoundingBox(endBBox);
      return;
    }

    requestAnimationFrame(frame);

    const bbox = {
      minX: startBBox.minX + (diffMinX * factor),
      maxX: startBBox.maxX + (diffMaxX * factor),
      minY: startBBox.minY + (diffMinY * factor),
      maxY: startBBox.maxY + (diffMaxY * factor)
    };

    scene.applyBoundingBox(bbox);
  };

  frame();
}

function shuffle(inputArray) {
  const outputArray = inputArray.slice();
  for (let i = 0; i < outputArray.length; i++) {
    const j = Math.floor(Math.random() * outputArray.length);
    const temp = outputArray[i];
    outputArray[i] = outputArray[j];
    outputArray[j] = temp;
  }

  return outputArray;
}

function defined(number) {
  return Number.isFinite(number);
}
