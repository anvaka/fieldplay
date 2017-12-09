import appState from './appState';

const presets = [
  `dt=0.01&fo=0.988&dp=0.008&cm=2&cx=-2.038350000000001&cy=0.1513&w=41.5779&h=41.5779&pc=30000&vf=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20float%20x%20%3D%20abs%28p.x%29%20-%205.%3B%0Afloat%20side%20%3D%20sign%28p.x%29%3B%0Afloat%20range%20%3D%20length%28vec2%28x%2C%20p.y%29%29%3B%0Afloat%20irisrange%20%3D%20length%28vec2%28x%2C%20p.y%20%2B%202.*sign%28p.y%29%29%29%3B%0A%0Avec2%20border%20%3D%201.*vec2%28p.y%20%2B%202.2*sign%28p.y%29%20*%20%28p.y*p.y%20%2F%20%28p.y*p.y%20%2B%200.01%29%29%2C%20-x%29%3B%0A%0Avec2%20outside%20%3D%20vec2%28x%20%2F%20%281.%2B10.%2Fabs%28p.x*p.x%29%29%2C%20p.y%29%3B%0A%0Avec2%20spiral%20%3D%20vec2%28p.y%2C%20-x%29%3B%0A%0Avec2%20iris%20%3D%20sin%28-range%20*%2010.%29%20*%20spiral%20%2B%200.05*vec2%28x%2C%20p.y%29%3B%0A%0Av%20%20%2B%3D%20outside%20*%20%28smoothstep%284.0%2C%204.5%2C%20irisrange%29%2Frange*5.%20-%205.*smoothstep%280.9%2C%200.7%2C%20range%29%2Frange%29%3B%0Av%20%2B%3D%20border%20*%20smoothstep%283.5%2C%204.%2C%20irisrange%29%20*%20smoothstep%284.5%2C%204.%2C%20irisrange%29%3B%0Av%20%2B%3D%20iris%20*%20smoothstep%282.0%2C%201.5%2C%20range%29%20*%20smoothstep%280.8%2C%201.%2C%20range%29%3B%0Av%20-%3D%2010.0*spiral%20*%20smoothstep%281.0%2C%200.8%2C%20range%29%20*%20smoothstep%280.7%2C%200.9%2C%20range%29%3B%0A%0Av.x%20*%3D%20side%3B%0Av%20*%3D%20-1.%3B%0A%0A%20%20return%20v%3B%0A%7D`,
  `dt=0.01&fo=0.998&dp=0.009&cm=3&cx=-1.6545999999999994&cy=-0.3642500000000002&w=24.7354&h=24.7354&pc=3000&vf=%2F%2F p.x and p.y are current coordinates%0A%2F%2F v.x and v.y is a velocity at point p%0Avec2 get_velocity(vec2 p) {%0A  vec2 v %3D vec2(0.%2C 0.)%3B%0A%0A  %2F%2F change this to get a new vector field%0A  float dt %3D 0.01%3B%0Afloat t %3D frame*dt%3B%0Afloat w %3D 2.*PI%2F5.%3B%0Afloat A %3D 2.%3B%0A%0Afloat d %3D sqrt(p.x*p.x %2B p.y*p.y)%3B%0Av.x %3D A*cos(w*t%2Fd)%3B%0Av.y %3D A*sin(w*t%2Fd)%3B%0A%0A  return v%3B%0A}`,
  `dt=0.01&fo=0.998&dp=0.009&cm=2&cx=-1.424&cy=0.92285&w=8.541&h=8.541&vf=%2F%2F p.x and p.y are current coordinates%0A%2F%2F v.x and v.y is a velocity at point p%0Avec2 get_velocity(vec2 p) {%0A  vec2 v %3D vec2(0.%2C 0.)%3B%0A%0A  %2F%2F change this to get a new vector field%0A  float size %3D 1.0%3B%0Avec2 o %3D (p)%2F(1.6* size)%3B%0A  float a %3D o.x*o.x%2Bo.y*o.y-0.3%3B%0A v %3D vec2(step(a*a*a%2C o.x*o.x*o.y*o.y*o.y))%3B%0A  %0A%0A  return v%3B%0A}`
];

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

  setTimeout(next, delayTime);
}

function next() {
  if (!incoming || !incoming.length) {
    // TODO: shuffle
    incoming = presets.slice();
  }

  const presetString = incoming.shift();
  const parts = presetString.split('&');
  const preset = {};
  parts.forEach(part => {
    const subparts = part.split('=');
    let value = subparts[1];
    const numeric = parseFloat(value);
    if (!Number.isNaN(numeric)) {
      value = numeric;
    }

    preset[subparts[0]] = value;
  });

  console.warn(preset);

  const code = decodeURIComponent(preset.vf);
  window.scene.vectorFieldEditorState.setCode(code);
  window.scene.setColorMode(preset.cm);

  // TODO: fo, dt, dp, cx, cy, w, h, pc, code

  setTimeout(next, delayTime);
}
