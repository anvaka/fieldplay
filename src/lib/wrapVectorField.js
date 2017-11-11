/**
 * Wraps a simple vector field string into our default shader code.
 * @param {String} field 
 */
export default function wrapVectorField(field) {
  return `// p.x and p.y are current coordinates
// v.x and v.y is a velocity at point p
vec2 get_velocity(vec2 p) {
  vec2 v = vec2(0., 0.);

  // change this to get a new vector field
  ${field}

  return v;
}`
}