import appState from './appState';
import presets from './autoPresets';
import generateFunction from './generate-equation';
import wrapVectorField from './wrapVectorField';

let delayTime, incomingPresetsQueue, scene, scheduledUpdate, autoSource;

export function initAutoMode(_scene) {
  scene = _scene;

  const qs = appState.getQS();

  autoSource = qs.get('autosource');
  if (!['presets', 'generator', 'both'].includes(autoSource)) {
    if (autoSource) {
      console.error('unknown autosource param; options are presets, generator, or both');
    }

    autoSource = 'both';
  }

  let autoTime = qs.get('autotime');
  if (!autoTime) {
    autoTime = qs.get('auto'); // Backwards compatibility
    if (!autoTime) {
      return;
    }

    console.warn('the auto param is deprecated; please use autotime');
  }

  let parsedMilliseconds = parseFloat(autoTime);
  if (Number.isNaN(parsedMilliseconds)) {
    console.error('malformed autotime param; not a number');
    return;
  }

  if (/ms$/i.test(autoTime)) {
    // Already good
  } else if (/s$/i.test(autoTime)) {
    parsedMilliseconds *= 1000; // Convert from seconds
  } else if (/m$/i.test(autoTime)) {
    parsedMilliseconds *= 1000 * 60; // Convert from minutes
  } else if (/h$/i.test(autoTime)) {
    parsedMilliseconds *= 1000 * 60 * 60; // Convert from hours
  }

  if (parsedMilliseconds <= 500) {
    console.warn('autotime param is too small; defaulting to 30 seconds');
    parsedMilliseconds = 30000;
  }

  delayTime = parsedMilliseconds;
  next({ immediately: true });

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

function next(options) {
  options = options || {};

  let source = autoSource;
  if (source === 'both') {
    source = Math.random() < 0.5 ? 'presets' : 'generator';
  }

  if (source === 'generator') {
    scene.setParticleCount(10000);
    scene.vectorFieldEditorState.setCode(wrapVectorField(generateFunction()));
  } else if (source === 'presets') {
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
      if (options.immediately) {
        scene.applyBoundingBox(bbox);
      } else {
        animateBBox(bbox);
      }
    }

    // TODO: support these additional params: i0, showBindings
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
