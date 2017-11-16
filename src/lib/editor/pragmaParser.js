import fetchGLSL from './fetchGLSL.js';

var pragmaInclude = '#include ';
var nullCode = { code: '' }

/**
 * Naively parses glsl code and tries to replace all `#pragma` statements
 * with empty string. Gives structured collection of pragma statements back
 * 
 * @param {String} code 
 */
export default function makePragmaParser(code) {
  if (!code) return new Promise(resolve => resolve(nullCode));

  var parsedLines = processLineByLine(code);
  if (parsedLines.pending.length > 0) {
    return Promise.all(parsedLines.pending).then(() => parsedLines)
      .catch(error => { return {error: {error}}; });
  }

  return new Promise(resolve => resolve(parsedLines));
}

function processLineByLine(code) {
  var pending = []
  var lines = code.split('\n');
  var outputLines = [];
  var currentIndex = 0;
  lines.forEach((line, index) => {
    currentIndex = index;
    if (line && line[0] === '#') {
      outputLines.push('');
      processPragma(line);
    } else {
      outputLines.push(line);
    }
  });

  return {
    getCode,
    pending
  };

  function getCode() {
    return outputLines.join('\n');
  }

  function processPragma(line) {
    if (line.indexOf(pragmaInclude) === 0) {
      var include = line.substr(pragmaInclude.length);
      var insertIndex = currentIndex;
      pending.push(fetchGLSL(include).then(code => {
        outputLines[insertIndex] = code
      }))
    }
  }
}