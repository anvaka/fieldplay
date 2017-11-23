import appState from './appState';

const defaultConfig = {
  // I need to flash our more details before making any promises.
  isAudioEnabled: false,
  // this allows to render an overlay grid with vectors. Enable it
  // and drag the scene a little bit.
  vectorLinesEnabled: false,

  // Starting from which texture unit we can bind custom inputs?
  FREE_TEXTURE_UNIT: 4,

  // whether input bindings should be visible
  showBindings: appState.getQS().get('showBindings') || false
}

export default defaultConfig;