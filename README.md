# Field Play

This is a placeholder for vector fields exploration. Will be available soon.

## What?

Let's assign to every point on a grid a vector `(1, 0)`, which means
we have an arrow, pointing to the right:

![Vector field V(1, 0)](https://github.com/anvaka/fieldplay/wiki/images/field_1_0.png)

Let's pretend these vectors represent velocity. What if we drop a thousand particles onto 
this grid? How would they move?

![Moving particles in V(1, 0)](https://github.com/anvaka/fieldplay/wiki/images/field_1_0_move.gif)

When we assigned a vector to each point on the plain, we created a mathematical structure
called `Vector Field`.

Let's create a bit more interesting vector field: 

* Points with even `y` coordinate get vector `(1, 0)`;
* Points with odd `y` coordinate get an opposite vector `(-1, 0)`;

![Even odd directions](https://github.com/anvaka/fieldplay/wiki/images/field_even_odd.png)

Again we drop a few thousands particles and see what happens:

![Moving even odd directions](https://github.com/anvaka/fieldplay/wiki/images/field_even_odd_move.gif)

The field above can be written in a single formula:

```
v.x = -2.0 * mod(floor(y), 2.0) + 1.0;
v.y = 0.0;
```

The reminder after integer division `y/2` can be either `1` or `0`.
Then we transform the reminder, so that the final vector is either `(-1, 0)` or `(1, 0)`. 

So far, we've used only one component of the velocity vector `v.x`. And particles
moved only horizontally. Let's try to set both components and see what happens

```
v.x = -2.0 * mod(floor(y), 2.0) + 1.0;
v.y = -2.0 * mod(floor(x), 2.0) + 1.0;
```

![Field x, y](https://github.com/anvaka/fieldplay/wiki/images/field_xy.png)
![Animated field x, y](https://github.com/anvaka/fieldplay/wiki/images/field_xy_small.gif)

Wow! Two simple operations, and the final animation looks like an art piece!

![Field x, y](https://github.com/anvaka/fieldplay/wiki/images/field_xy_final.png)

Vector fields turns out to be very flexible generative framework.

## How this project works?

This project is inspired by Vladimir Agafonkin's article: [How I built a wind map with WebGL](https://blog.mapbox.com/how-i-built-a-wind-map-with-webgl-b63022b5537f).
Vladimir shows how to render up to a million particles at 60 frames per second, entirely on GPU.

I used almost the same technique with a few modifications:

1. The vector field is defined in shader language with GLSL code, so that 
mathematical formulas can be expressed in free form
2. Position of a particle is computed with 4th order [Runge-Kutta method](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods) on GPU
3. Each dimension X and Y is computed independently, so that we can store positions more accurately
4. Added pan/zoom with [panzoom](https://github.com/anvaka/panzoom) library
5. The vector field definition is saved in the URL with [query-state](https://github.com/anvaka/query-state) 
library. So that you can bookmark/share your vector fields easily

### GLSL code for vector field

Every time when vector field code is changed I compile a new shader:

![shader compilation](https://github.com/anvaka/fieldplay/wiki/images/edit_small.gif)

The biggest challenge here was... to provide informative error messages when code is wrong.
Web browser gives basic info, which can be confusing sometimes.

For example, the following code has a tiny error:

``` glsl
vec2 velocity(vec2 p) {
  return p
}
```

If we compile this shader, the browser will say: `ERROR: 0:3: '}' : syntax error`.
What's wrong? - There is a missing semicolon on line `2`, the correct version is:

``` glsl
vec2 velocity(vec2 p) {
  return p;
}
```

It would be better if I could just tell that the semicolon is missing.

Luckily, there is a great glsl type checker and minifier [evanw/glslx](https://github.com/evanw/glslx).
It is written in [Skew](http://skew-lang.org/), and provides great many more feature than I needed.

After several hours of playing with code, I [extracted parsing bits](https://github.com/evanw/glslx/issues/10)
specific to type checking, and got validation (fingers crossed) more intuitive:

![glsl validation](https://github.com/anvaka/fieldplay/wiki/images/glsl_validation.gif)


### Page load time

Unfortunately, GLSL parsing came at cost - the library is ~64KB of compressed javascript. Together with
vue.js (~26KB) users would have to download almost 90KB of code, that is not immediately needed
to render the vector field.

At the same time, the code that loads vector field from query string, compiles it, and shows it on the
screen is very small. Less than `28KB`.

*For a regular Wi-Fi connection this may seem like not a big deal. But when you try to open the website
on slow 3G mobile network, the difference between extra 90KB of code becomes painfully obvious.*

So, how can we load the website faster?

I am using [webpack vuejs template](https://github.com/vuejs-templates/webpack), and solution came
almost trivial. I just needed to split library into chunks. 

The main website's entry point would be my small WebGL renderer, which initializes the scene and
kicks of download of vue.js immediately:

``` js
initVectorFieldApp(canvas);

// Tell webpack to split bundle, and download settings UI later.
require.ensure('@/vueApp.js', () => {
  // Settings UI is ready, initialize vue.js application
  require('@/vueApp.js');
});
```

Similarly, the GLSL parser is lazy-loaded. By default I create a naive parser that assumes GLSL
code is fine. Once the real parser is loaded, the naive parser is replaced:

``` js
var glslParser = {
  check(code) { return no errors }
};

// Load heavy-weight parser:
require.ensure('glsl-parser', () => {
  // ... and replace the naive parser with the real one.
  glslParser = require('glsl-parser');
});
```

You might be wondering what happens when the parser is being loaded? Well, if there are no errors
we immediately show the vector field on the screen. If there are errors, the browser would not 
compile the shader, and the website visitors will not see informative error message until the 
real GLSL parser is loaded.

Was the split worth the effort?

I think so. On slow 3G network the vector field is visible in ~3,000ms. On my regular
Wi-Fi network, the first frame with vector field is rendered in less than 500ms:

![split results](https://github.com/anvaka/fieldplay/wiki/images/first_frame.png)

*Screenshot is taken with Chrome's developer tools, disabled cache. Start time is counted from the navigation start*


*to be continued*