/**
 * Various color modes.
 */
export default {
  /**
   * Each particle gets its own color
   */
  UNIFORM: 1,

  /**
   * Color of a particle depends on its velocity
   */
  VELOCITY: 2,

  /**
   * Color of a particle depends on its velocity vector angle.
   */
  ANGLE: 3,

  /**
   * The color comes from a shader. WIP
   */
  CUSTOM: 4
}