import bus from '../bus';
import appState from '../appState';
import getParsedVectorFieldFunction from './getParsedVectorFieldFunction';

/**
 * A text editor state for the vector field equation. Manages vector field
 * program compilation and error reporting state.
 *
 * @param {Object} drawProgram 
 */
export default function createVectorFieldEditorState(drawProgram) {
  bus.on('glsl-parser-ready', parseCode);
  var currentVectorFieldVersion = 0;

  // What is the current code?
  var currentVectorFieldCode = appState.getCode();

  // For delayed parsing result verification (e.g. when vue is loaded it
  // can request us to see if there were any errors)
  var parserResult;

  loadCodeFromAppState();

  var api = {
    getCode,
    setCode,
    dispose,

    // These properties are for UI only
    code: currentVectorFieldCode,
    error: '',
    errorDetail: '',
    isFloatError: false 
  };

  return api;

  function dispose() {
    bus.off('glsl-parser-ready', parseCode);
  }

  function getCode() {
    return appState.getCode();
  }

  function setCode(vectorFieldCode) {
    if (vectorFieldCode === currentVectorFieldCode) {
      // If field hasn't changed, let's make sure that there was no previous
      // error
      if (parserResult && parserResult.error) {
        // And if there was error, let's revalidate code:
        parseCode();
      }
      return;
    } 

    trySetNewCode(vectorFieldCode).then((result) => {
      if (result.cancelled) return;

      if (result && result.error) {
        updateErrorInfo(result.error);
        return result;
      }

      currentVectorFieldCode = vectorFieldCode;
      api.code = vectorFieldCode;
      appState.saveCode(vectorFieldCode);
    });
  }

  function updateErrorInfo(parserResult) {
    if (parserResult && parserResult.error) {
      api.error = parserResult.error;
      api.errorDetail = parserResult.errorDetail;
      api.isFloatError = parserResult.isFloatError;
    } else {
      api.error = '';
      api.errorDetail = '';
      api.isFloatError = false;
    }
  }

  function loadCodeFromAppState() {
    let persistedCode = appState.getCode();
    if (persistedCode) {
      trySetNewCode(persistedCode).then(result => {
        if (!result.error) return; // This means we set correctly;
        // If we get here - something went wrong. see the console
        console.error('Failed to restore previous vector field: ', result.error);
        // Let's use default vector field
        trySetNewCode(appState.getDefaultCode());
      });
    } else {
      // we want a default vector field
      trySetNewCode(appState.getDefaultCode());
    }
  }

  function parseCode(customCode) {
    return getParsedVectorFieldFunction(customCode || currentVectorFieldCode)
      .then(currentResult => {
        parserResult = currentResult
        updateErrorInfo(parserResult.error);
        return parserResult;
      });
  }

  function trySetNewCode(vectorFieldCode) {
    currentVectorFieldVersion += 1;
    var capturedVersion = currentVectorFieldVersion;
    // step 1 - run through parser
    return parseCode(vectorFieldCode).then(parserResult => {
      if (capturedVersion !== currentVectorFieldVersion) {
        parserResult.cancelled = true;
        // a newer request was issued. Ignore these results.
        return parserResult;
      }

      if (parserResult.error) {
        return parserResult;
      }
      // step 2 - run through real webgl
      try {
        drawProgram.updateCode(parserResult.code);
        return parserResult;
      } catch (e) {
        return {
          error: {
            error: e.message
          }
        }
      }
    });
  }
}