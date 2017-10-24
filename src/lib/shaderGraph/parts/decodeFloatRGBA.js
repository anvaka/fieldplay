const code = `
highp float decodeFloatRGBA( vec4 v ) {
  float a = floor(v.r * 255.0 + 0.5);
  float b = floor(v.g * 255.0 + 0.5);
  float c = floor(v.b * 255.0 + 0.5);
  float d = floor(v.a * 255.0 + 0.5);

  float exponent = a - 127.0;
  float sign = 1.0 - mod(d, 2.0)*2.0;
  float mantissa = float(a > 0.0)
                  + b / 256.0
                  + c / 65536.0
                  + floor(d / 2.0) / 8388608.0;
  return sign * mantissa * exp2(exponent);
}
`

export default code;