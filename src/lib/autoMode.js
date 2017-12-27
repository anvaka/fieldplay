import appState from './appState';
import generateFunction from '../lib/generate-equation';
import wrapVectorField from '../lib/wrapVectorField';


let delayTime, incoming;

export function initAutoMode() {
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

  setTimeout(function(){ window.scene.vectorFieldEditorState.setCode(wrapVectorField(generateFunction())); }, delayTime);
}