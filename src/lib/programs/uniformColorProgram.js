
export default function uniformColor(ctx) {
  let {gl} = ctx;
  let particleColor = { r: 77/255, g: 188/255, b: 201/255, a: 1  };

  return {
    updateCode: noop,
    updateParticlesPositions: noop,
    onParticleInit: noop,
    bindColorTextures,
    requestSpeedUpdate: noop,
    dispose: noop
  };

  function bindColorTextures(program) {
    // We don't want to bind anything, just set the uniform color
    gl.uniform4f(program.u_particle_color, particleColor.r, particleColor.g, particleColor.b, particleColor.a);
  }
}

function noop() {}