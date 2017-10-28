/**
 * A simple interface to compute eventual min/max 
 */
export default function makeStatCounter() {
  var min, max;

  var api = {
    getMin() { return min; },
    getMax() { return max; },
    add(x) {
      if (x < min) min = x;
      if (x > max) max = x;
    },
    reset: reset
  };

  return api;

  function reset() {
    min = Number.POSITIVE_INFINITY;
    max = Number.NEGATIVE_INFINITY;
  }
}
