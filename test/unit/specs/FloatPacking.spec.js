import {encodeFloatRGBA, decodeFloatRGBA } from '@/lib/utils/floatPacking';

describe('Float packing', () => {
  it('should pack variables to 1e-6 precision', () => {
    var out = new Uint8Array(4);
    var input = 0.1;
    var from = -Math.PI * Math.E
    var to = Math.PI * Math.E
    var steps = 1000;
    var dt = (to - from)/steps;
    var maxError = 0;
    for(var f = from; f <= to; f += dt) {
      out[0] = out[1] = out[2] = out[3] = 0;

      encodeFloatRGBA(f, out, 0);
      var decoded = decodeFloatRGBA(out[0], out[1], out[2], out[3]);
      var currentError = Math.abs(decoded - f);
      if (currentError > maxError) maxError = currentError;
    }
    console.log(maxError);
    expect(maxError < 1e-6).to.be.true;
  })
})
