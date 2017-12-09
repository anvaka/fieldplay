/**
 * Various color modes.
 * 
 * TODO: This could be generalized by allowing custom color shader
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
  ANGLE: 3
}