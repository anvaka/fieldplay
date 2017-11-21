/**
 * Checks whether current window belongs to a "Small" screen
 * size. Small screens have slightly different initial behavior.
 * E.g. the settings window is always collapsed.
 * 
 * This needs to be in sync with `small-screen` variable in
 *  ../commponents/shared.styl
 */
export default function isSmallScreen() {
  return window.innerWidth < 600
}
