# List of variables available to shader

On top of standard [glsl functions](https://www.shaderific.com/glsl-functions), the following
list of variables can be used in velocity shader:

* `float PI` -  3.1415926535897932384626433832795
* `float frame` - Current frame number. Increases over time. Resets to 0 if you change shader's code
* `vec4 cursor` - Defines position of a cursor in bounding box coordinates. `cursor.xy` - position 
where mouse was clicked (or tapped) last time. `cursor.zw` - current mouse hover position. On mobile
phones, where mouse is not available, `zw` component will be the `xy` of [`touchmove`](https://developer.mozilla.org/en-US/docs/Web/Events/touchmove) event.
