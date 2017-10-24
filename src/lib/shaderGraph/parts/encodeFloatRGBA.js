const code = `
vec4 encodeFloatRGBA(highp float val) {
    if (val == 0.0) {
        return vec4(0.0, 0.0, 0.0, 0.0);
    }

    float mag = abs(val);
    float exponent = floor(log2(mag));
    // Correct log2 approximation errors.
    exponent += float(exp2(exponent) <= mag / 2.0);
    exponent -= float(exp2(exponent) > mag);

    float mantissa;
    if (exponent > 100.0) {
        // Not sure why this needs to be done in two steps for the largest float to work.
        // Best guess is the optimizer rewriting '/ exp2(e)' into '* exp2(-e)',
        // but exp2(-128.0) is too small to represent.
        mantissa = mag / 1024.0 / exp2(exponent - 10.0) - 1.0;
    } else {
        mantissa = mag / float(exp2(exponent)) - 1.0;
    }

    float a = exponent + 127.0;
    mantissa *= 256.0;
    float b = floor(mantissa);
    mantissa -= b;
    mantissa *= 256.0;
    float c = floor(mantissa);
    mantissa -= c;
    mantissa *= 128.0;
    float d = floor(mantissa) * 2.0 + float(val < 0.0);
    return vec4(a, b, c, d) / 255.0;
}
`

export default code;