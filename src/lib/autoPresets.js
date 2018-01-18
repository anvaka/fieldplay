export default [
  {
    "name": "Secret door",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 1,
    "cx": -0.15344999999999986,
    "cy": -0.1291,
    "w": 7.4611,
    "h": 7.4611,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        v.x = p.y*p.y ;
        v.y = -p.x*p.x *.05;

        return v;
      }`
  },
  {
    "name": "Miserables graph with edges",
    "timeStep": -0.001,
    "fadeOut": 0.998,
    "dropProbability": 0.008,
    "colorMode": 2,
    "cx": 0.467,
    "cy": 1.5294,
    "w": 0.9368,
    "h": 0.9368,
    "showBindings": 1,
    "i0": "https://gist.githubusercontent.com/anvaka/ebc18e3ffe05b0709a7ae933261fa2e9/raw/bafb63d01e0ab37c1f9b51522a5ec4fbc19bc4f1/edges.png",
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        vec4 c = texture2D(input0, vec2(mod(p.x,1.), 1. - mod(p.y, 1.)));
        v.x = (c.r + c.g/255.) - 0.5;
        v.y = 0.5 - (c.b + c.a/255.);

        if (length(v) < 0.1) v = vec2(0.);
        return (v);
      }`,
    "particleCount": 40000
  },
  {
    "name": "Roads",
    "timeStep": 0.001,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 2,
    "cx": 0.478,
    "cy": 0.2636,
    "w": 0.9922,
    "h": 0.9922,
    "showBindings": 0,
    "i0": "https://gist.githubusercontent.com/anvaka/ebc18e3ffe05b0709a7ae933261fa2e9/raw/cd7d82c5a235f50f5655ac94aa9077709731adde/binary_tree.png",
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        vec4 c = texture2D(input0, vec2(mod(p.x,1.), 1. - mod(p.y, 1.)));
        v.x = (c.r + c.g/255.) - 0.5;
        v.y = 0.5 - (c.b + c.a/255.);

        return (v);
      }`,
    "particleCount": 40000
  },
  {
    "name": "Four counterclockwise cogs pushing particles clockwise :)",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 1,
    "cx": 0.7887499999999994,
    "cy": -0.5769500000000001,
    "w": 16.3759,
    "h": 16.3759,
    "code": `vec2 field(vec2 p) {
        float d = length(p);
        return vec2(-p.y, p.x) * exp(-d*d*0.1);
      }
      // p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        v = field(p + vec2(-5., 0.)) +
          field(p + vec2(-2.5, 2.5)) +
          field(p + vec2(0., 0.)) +
          field(p + vec2(-2.5, -2.5));
        return v;
      }`
  },
  {
    "name": "Waveshaping [interactive]",
    "cx": 0,
    "cy": -0.060899999999999954,
    "w": 12,
    "h": 12,
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 2,
    "code": `float f(float x) {
        bool supportsHover = length(cursor.zw) > 0.01;
        vec2 c = supportsHover ? cursor.zw : cursor.xy;
        float f1 = sin(x);
        float f2 = sin(2.*x);
        float f3 = sin(3.*x);
        float f4 = sin(4.*x);
        float f5 = sin(5.*x);
        return f1 +
          f2*c.x/4. +
          f3*c.y/6. +
          f4*c.x/8. +
          f5*c.y/10.;
      }

      float df(float x) {
        float h = 0.001;
        return (f(x+h)-f(x-h))/(2.*h);
      }


      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        float fx = f(p.x);
        float d = abs(p.y-fx);
        float dfx = df(p.x);
        vec2 toOrigin = -p/(20.*length(p));
        vec2 toF = 0.1*vec2(0.,fx-p.y);
        v = d < 0.1 ? vec2(1.,dfx) : toF;
        return v;
      }`,
    "particleCount": 50000
  },
  {
    "name": "Hex plane [interactive]",
    "timeStep": 0.01,
    "fadeOut": 0.99,
    "dropProbability": 0.99,
    "colorMode": 3,
    "cx": 0,
    "cy": 0,
    "w": 8.5398,
    "h": 8.5398,
    "code": `vec2 nearest(vec2 p) {
        // Charles Chambers black hex magic
      float temp = floor(p.x + sqrt(3.) * p.y + 1.);
      float q = floor((floor(2.*p.x+1.) + temp) / 3.);
      float r = floor((temp + floor(-p.x + sqrt(3.) * p.y + 1.))/3.);
      return vec2(q-p.y/2.,r-p.y/8.);
      }

      // p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);
        float f = frame/1000.;
        float z = (3.-p.y)/(6.+cursor.zw.y*2.);
        float a = cursor.zw.x;
        vec2 r = vec2(cos(a)*p.x - sin(a)*p.y,sin(a)*p.x+cos(a)*p.y);
        vec2 t = vec2(r.x / z, r.y / z);
        vec2 n = nearest(t);
        v.x = t.x-n.x;
        v.y = t.y-n.y;
        return v;
      }`,
    "particleCount": 500000
  },
  {
    "name": "Rain",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 1,
    "cx": 0,
    "cy": 0,
    "w": 8.5398,
    "h": 8.5398,
    "code": `bool isUnshadowed(vec2 p) {
        bool upper = length(p) > 1.0 && p.y > 0.0;
        bool lower = length(p) > 1.0 && p.y < 0.0 && abs(p.x) > 1.0;
        return upper || lower;
      }

      vec2 unshadowedV(vec2 p) {
        return vec2(0.0,-3.0+p.y);
      }

      bool isSpray(vec2 p) {
        return length(p) > 1.0 && abs(p.x) < 1.0;
      }

      vec2 sprayV(vec2 p) {
        float vy = -1.0+p.y;
        float vx = p.x > 0.0 ? (1.0-p.x)/vy : (-1.0-p.x)/vy;
        return vec2(vx,vy);
      }

      bool isCircle(vec2 p) {
        return length(p) > 1.0 && length(p) < 1.05;
      }

      vec2 circleV(vec2 p) {
        vec2 v = vec2(0., 0.);
        v.x = sign(p.x)* p.y;
        v.y = -abs(p.x);
        return v;
      }

      // p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        v = isCircle(p) ? circleV(p) :
            isUnshadowed(p) ? unshadowedV(p) :
            isSpray(p) ? sprayV(p) : vec2(1.0/0.0,1.0/0.0);

        return v;
      }`,
    "particleCount": 10000
  },
  {
    "name": "Mouse-driven Julia Set",
    "timeStep": 0.01,
    "fadeOut": 0.9,
    "dropProbability": 0.009,
    "colorMode": 3,
    "cx": -0.27144999999999997,
    "cy": 0.14175000000000004,
    "w": 6.120699999999999,
    "h": 6.120699999999999,
    "particleCount": 1000000,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        // change this to get a new vector field
        float a = cursor.zw.x;
      float b = cursor.zw.y;
      float sx = p.x/2.0;
      float sy = p.y/2.0;
      float i1x = sx*sx - sy*sy+a;
      float i1y = -2.0*sx*sy+b;
      float i2x = i1x*i1x - i1y*i1y+a;
      float i2y = -2.0*i1x*i1y+b;
      float i3x = i2x*i2x - i2y*i2y+a;
      float i3y = -2.0*i2x*i2y+b;
      float i4x = i3x*i3x - i3y*i3y+a;
      float i4y = -2.0*i3x*i3y+b;
      float i5x = i4x*i4x - i4y*i4y+a;
      float i5y = -2.0*i4x*i4y+b;
      float i6x = i5x*i5x - i5y*i5y+a;
      float i6y = -2.0*i5x*i5y+b;
      float i7x = i6x*i6x - i6y*i6y+a;
      float i7y = -2.0*i6x*i6y+b;
      float i8x = i7x*i7x - i7y*i7y+a;
      float i8y = -2.0*i7x*i7y+b;
      float i9x = i8x*i8x - i8y*i8y+a;
      float i9y = -2.0*i8x*i8y+b;

        float n = sqrt(i9x*i9x+i9y*i9y);

      v.x = n > 2.0 ? -p.x/10.0 : p.x/10.0;
      v.y = n > 2.0 ? -p.y/10.0 : p.y/10.0;

        return v;
      }`
  },
  {
    "name": "Isobaric forest",
    "timeStep": 0.01,
    "fadeOut": 0.995,
    "dropProbability": 0.009,
    "colorMode": 3,
    "cx": 0.006349999999999856,
    "cy": 0.000200000000000089,
    "w": 4.1643,
    "h": 4.1643,
    "code": `// total shader is a _bit_ too long to just put in the url. Find it at
      //
      #include https://gist.githubusercontent.com/CensoredUsername/f0f2288c92bf6488fb964f9ce52bd520/raw/bf987ebd6bf43d53028078709b65421882edaf65/forest.glsl`,
    "particleCount": 30000
  },
  {
    "name": "Hyperjump",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 2,
    "cx": 0.523299999999999,
    "cy": 1.2703999999999995,
    "w": 48.3842,
    "h": 48.3842,
    "code": `vec2 circle(vec2 p, vec2 c) {
        vec2 c0 = p - c;
        vec2 p0 = vec2(-c0.y, c0.x);
        float l = length(p0);
        return p0 * exp(-l*sin(frame*0.01));
      }
      // p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = circle(p, vec2(0., 0.));

        float r = 7.;
        for (int i = 0; i < 2; ++i) {
          float a = 0.01 * frame + float(i) * 2.*PI/7.;
          v += circle(p, vec2(r * cos(a) , r * sin(a)));
        }
        return v;
      }`,
    "particleCount": 30000
  },
  {
    "name": "Particle Grinder",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 1,
    "cx": 0.028149999999999675,
    "cy": 0.08830000000000005,
    "w": 9.045300000000001,
    "h": 9.045300000000001,
    "code": `vec2 tensor(vec2 p, vec2 c0, vec4 abcd, float N) {
        vec2 p0 = p - c0;
        float theta = atan(p0.y, p0.x);
        float c = cos(N * theta);
        float s = sin(N * theta);
        return length(p0) * vec2(abcd[2] * c + abcd[3] * s,
                    abcd[0] * c + abcd[1] * s);
      }

      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);
        v = tensor(p, vec2(0., 0.), vec4(-2., 0., 0., 1.), 2.);
        return v;
      }`
  },
  {
    "name": "Hyperbolic flux [interactive]",
    "timeStep": 0.001,
    "fadeOut": 0.999,
    "dropProbability": 0.009,
    "colorMode": 3,
    "cx": -0.11990000000000034,
    "cy": 0.018899999999999917,
    "w": 8.5442,
    "h": 8.5442,
    "code": `// p.x and p.y are current coordinates
      // v.x and v.y is a velocity at point p
      vec2 get_velocity(vec2 p) {
        vec2 v = vec2(0., 0.);

        float ax = (cursor.zw.x - p.x);
        float ay = (cursor.zw.y - p.y);
        float al = sqrt(ax*ax+ay*ay);

        float rx = (p.x-cursor.xy.x);
        float ry = (p.y-cursor.xy.y);
        float rl = sqrt(rx*rx+ry*ry);

        // change this to get a new vector field
        v.x = (ax*ax*ry + ay*rx*rx)/(al*rl);
        v.y = (ay*ay*rx + ax*ry*ry)/(al*rl);

        return v;
      }`,
    "particleCount": 1000000
  },
  {
    "name": "Swim against the current",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 3,
    "cx": 3.0524500000000003,
    "cy": -1.3792,
    "w": 8.5397,
    "h": 8.5397,
    "code": `float dx1 = cursor.zw.x - p.x;
      float dy1 = cursor.zw.y - p.y;
      float dl1 = sqrt(dx1*dx1+dy1*dy1);
      dx1 = dx1/dl1;
      dy1 = dy1/dl1;

      float dx2 = cursor.xy.x - p.x;
      float dy2 = cursor.xy.y - p.y;
      float dl2 = sqrt(dx2*dx2+dy2*dy2);
      dx2 = dx2/dl2;
      dy2 = dy2/dl2;

      float fx = cursor.xy.x - cursor.zw.x;
      float fy = cursor.xy.y -
      cursor.zw.y;
      float fl = sqrt(fx*fx+fy*fy);
      fx = -fx/fl;
      fy = -fy/fl;

      float d1 = (dx1*fx + dy1*fy)/(dl1*fl);
      float d2 = 1.-d1;
      v.x = d1*fx+d2*dx2;
      v.y = d1*fy+d2*dy2;`,
    "particleCount": 100900
  },
  {
    "name": "Eye of Sauron (interactive)",
    "timeStep": 0.01,
    "fadeOut": 0.988,
    "dropProbability": 0.008,
    "colorMode": 2,
    "cx": 0.3991000000000007,
    "cy": -0.11315000000000008,
    "w": 37.0984,
    "h": 37.0984,
    "code": `// calculate distortion map (reverse solver)
      // the distortion map is based on a sphere, but smoothed to the ends: sqrt(1-(x^8/(x^8-1))^(1/4))

      float dist_radius = 7.8;
      vec2 distortion = cursor.zw;
      if (length(distortion) > 4.5) {
          distortion = normalize(distortion) *4.5;
      }

      // iterative reverse algo. after all, we knew the result position already, we're trying to reason back to what the original position was
      vec2 d = p;
      for (int i = 0; i < 10; i++) {
          // calculate distortion effect magnitude
          float d_scale = pow(length(d) / dist_radius, 8.);
          // pseudo sphere map
          d_scale = pow(1. - pow(d_scale / (d_scale + 1.), .25), .5);
          d = p - distortion * d_scale;
      }

      // calculate differentials, working backwards (i.e. what change in p would result from a change in d)
      vec2 d_dx  = d + vec2(0.1, 0.0);
      float d_dx_scale = pow(length(d_dx) / dist_radius, 8.);
      d_dx_scale = pow(1. - pow(d_dx_scale / (d_dx_scale + 1.), .25), .5);
      vec2 dx = (d_dx + distortion * d_dx_scale - p) / 0.1;

      vec2 d_dy  = d + vec2(0.0, 0.1);
      float d_dy_scale = pow(length(d_dy) / dist_radius, 8.);
      d_dy_scale = pow(1. - pow(d_dy_scale / (d_dy_scale + 1.), .25), .5);
      vec2 dy = (d_dy + distortion * d_dy_scale - p) / 0.1;

      // center parts
      float pupilrange = length(vec2(d.y, d.x + 6.*sign(d.x)));
      vec2 pupilborder = 2.6*vec2(-d.y, (d.x + 6.*sign(d.x)) );
      v += pupilborder * smoothstep(6.6, 6.8, pupilrange) * (1. - smoothstep(6.9, 7.1, pupilrange));

      float range = length(d);
      vec2 iris = 7.*d/sqrt(range);
      v += iris * smoothstep(7.0, 7.5, pupilrange) * (1. - smoothstep(3.8, 4.0, range));

      vec2 pupil = 1.*vec2(d.x+1.*sign(d.x), d.y);
      v += pupil * (1. - smoothstep(6.6, 6.8, pupilrange));

      // absolute parts
      vec2 psign = sign(d);
      vec2 a = abs(d);
      vec2 vabs = vec2(0.0, 0.0);

      float borderrange = length(vec2(d.x, d.y + 7.*sign(d.y)));
      vec2 border = -1.5*vec2(a.y + 7.*sign(a.y) - 3./(a.y + 1.), -a.x + 3./(a.x + 1.));
      vabs += border * smoothstep(10.8, 11.25, borderrange) * (1. - smoothstep(11.25, 11.7, borderrange)) * smoothstep(3.8, 4.1, range) * (a.y / (a.y + 1.));

      vec2 irisborder = 5.*vec2(a.y, -a.x) * (a.y / (a.y + 3.))+ .2 * a;
      vabs += irisborder * smoothstep(3.8, 4.25, range) * (1. - smoothstep(4.25, 4.7, range));

      vec2 white = 12.*vec2(1.0, -0.2 * (a.y));
      vabs += white * smoothstep(4.3, 4.5, range) * (1. - smoothstep(11., 11.3, borderrange));

      v += vabs * psign;

      // outside part
      vec2 outside = d / pow(borderrange - 10., 2.);
      v -= outside * smoothstep(11.3, 11.5, borderrange);

      // velocity distortion mapping
      v = v.x * dx + v.y * dy;

      // color mapping
      if (length(v) > 0.01) {
          v = normalize(v) * 10.;
      }
      v = v / (1. + 0.1 * (borderrange - 10.) * smoothstep(11.5, 12.5, borderrange));

      `,
    "particleCount": 30000
  },
  {
    "name": "Combination of two fields. One follows cursor",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 1,
    "cx": 0,
    "cy": 0,
    "w": 8.5398,
    "h": 8.5398,
    "code": `vec2 p1 = p - vec2(-2., 0.);
      vec2 p2 = p - cursor.zw;

      float l1 = length(p1), l2 = length(p2);

      v = vec2(-p1.y, p1.x)/(l1 * l1) + vec2(-p2.y, p2.x)/(l2 * l2);`
  },
  {
    "name": "[Randomized] nice symmetry",
    "timeStep": 0.01,
    "fadeOut": 0.988,
    "dropProbability": 0.008,
    "colorMode": 2,
    "cx": -2.6390499999999992,
    "cy": -1.1419499999999996,
    "w": 46.508700000000005,
    "h": 46.508700000000005,
    "code": `v.x = p.y/cos(length(p));
      v.y = max((log(p.y)+p.x),p.x);
        `,
    "particleCount": 20000
  },
  {
    "name": "A city block from a parallel Universe (by @MananG_8)",
    "timeStep": 0.01,
    "fadeOut": 0.988,
    "dropProbability": 0.008,
    "colorMode": 1,
    "cx": 0.6165500000000002,
    "cy": -1.87745,
    "w": 9.0455,
    "h": 9.0455,
    "code": `v.x = sin(tan(p.x))*cos(tan(p.y));
      v.y = sin(tan(p.y))*cos(tan(p.x));
        `,
    "particleCount": 20000
  },
  {
    "name": "♥ by @SAKrisT",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 2,
    "cx": -1.4246499999999997,
    "cy": 0.92285,
    "w": 8.5397,
    "h": 8.5397,
    "code": `float size = 1.0;
      vec2 o = (p)/(1.6* size);
        float a = o.x*o.x+o.y*o.y-0.3;
       v = vec2(step(a*a*a, o.x*o.x*o.y*o.y*o.y));
        `
  },
  {
    "name": "Dynamic vector field by Evgeniy Andreev. Not defined by physical system, but beautiful.",
    "timeStep": 0.01,
    "fadeOut": 0.998,
    "dropProbability": 0.009,
    "colorMode": 3,
    "cx": -1.6564499999999995,
    "cy": -0.36424999999999974,
    "w": 24.7317,
    "h": 24.7317,
    "code": `float dt = 0.01;
      float t = frame*dt;
      float w = 2.*PI/5.;
      float A = 2.;

      float d = sqrt(p.x*p.x + p.y*p.y);
      v.x = A*cos(w*t/d);
      v.y = A*sin(w*t/d);`,
    "particleCount": 3000
  },
  {
    "name": "Behold (by /u/censored_username)",
    "timeStep": 0.01,
    "fadeOut": 0.988,
    "dropProbability": 0.008,
    "colorMode": 2,
    "cx": 0.12704999999999966,
    "cy": 0.1923499999999998,
    "w": 22.5709,
    "h": 22.5709,
    "code": `float x = abs(p.x) - 5.;
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
      v *= -1.;`,
    "particleCount": 30000
  }
];
