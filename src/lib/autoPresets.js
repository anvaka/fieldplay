export default [
  {
    "name": "Behold",
    "dt": 0.01,
    "fo": 0.988,
    "dp": 0.008,
    "colorMode": 2,
    "cx": -2.038350000000001,
    "cy": 0.1513,
    "w": 41.5779,
    "h": 41.5779,
    "pc": 30000,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        float x = abs(p.x) - 5.;
      float side = sign(p.x);
      float range = length(vec2(x, p.y));
      float irisrange = length(vec2(x, p.y + 2.*sign(p.y)));

      vec2 border = 1.*vec2(p.y + 2.2*sign(p.y) * (p.y*p.y / (p.y*p.y + 0.01)), -x);

      vec2 outside = vec2(x / (1.+10./abs(p.x*p.x)), p.y);

      vec2 spiral = vec2(p.y, -x);

      vec2 iris = sin(-range * 10.) * spiral + 0.05*vec2(x, p.y);

      v  += outside * (smoothstep(4.0, 4.5, irisrange)/range*5. - 5.*smoothstep(0.9, 0.7, range)/range);
      v += border * smoothstep(3.5, 4., irisrange) * smoothstep(4.5, 4., irisrange);
      v += iris * smoothstep(2.0, 1.5, range) * smoothstep(0.8, 1., range);
      v -= 10.0*spiral * smoothstep(1.0, 0.8, range) * smoothstep(0.7, 0.9, range);

      v.x *= side;
      v *= -1.;

        return v;
      }`
  },
  {
    "name": "Dynamic vector field by Evgeniy Andreev",
    "dt": 0.01,
    "fo": 0.998,
    "dp": 0.009,
    "colorMode": 3,
    "cx": -1.6545999999999994,
    "cy": -0.3642500000000002,
    "w": 24.7354,
    "h": 24.7354,
    "pc": 3000,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        float dt = 0.01;
      float t = frame*dt;
      float w = 2.*PI/5.;
      float A = 2.;

      float d = sqrt(p.x*p.x + p.y*p.y);
      v.x = A*cos(w*t/d);
      v.y = A*sin(w*t/d);

        return v;
      }`
  },
  {
    "name": "Heart",
    "dt": 0.01,
    "fo": 0.998,
    "dp": 0.009,
    "colorMode": 2,
    "cx": -1.424,
    "cy": 0.92285,
    "w": 8.541,
    "h": 8.541,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        float size = 1.0;
      vec2 o = (p)/(1.6* size);
        float a = o.x*o.x+o.y*o.y-0.3;
       v = vec2(step(a*a*a, o.x*o.x*o.y*o.y*o.y));


        return v;
      }`
  },
  {
    "name": "A city block from a parallel Universe",
    "dt": 0.01,
    "fo": 0.988,
    "dp": 0.008,
    "colorMode": 1,
    "cx": 0.6168999999999998,
    "cy": -1.87745,
    "w": 9.046199999999999,
    "h": 9.046199999999999,
    "pc": 20000,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        v.x = sin(tan(p.x))*cos(tan(p.y));
      v.y = sin(tan(p.y))*cos(tan(p.x));


        return v;
      }`
  },
  {
    "name": "Nice Symmetry",
    "dt": 0.01,
    "fo": 0.988,
    "dp": 0.008,
    "colorMode": 2,
    "cx": -2.6373499999999996,
    "cy": -1.1419500000000014,
    "w": 46.512100000000004,
    "h": 46.512100000000004,
    "pc": 20000,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        v.x = p.y/cos(length(p));
      v.y = max((log(p.y)+p.x),p.x);


        return v;
      }`
  },
  {
    "name": "Combination of two fields",
    "dt": 0.01,
    "fo": 0.998,
    "dp": 0.009,
    "colorMode": 1,
    "cx": 0.000300000000000189,
    "cy": 0,
    "w": 8.5404,
    "h": 8.5404,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        vec2 p1 = p - vec2(-2., 0.);
      vec2 p2 = p - cursor.zw;

      float l1 = length(p1), l2 = length(p2);

      v = vec2(-p1.y, p1.x)/(l1 * l1) + vec2(-p2.y, p2.x)/(l2 * l2);

        return v;
      }`
  }
];
