# Field Play

Vector fields explorer. Made with WebGL, love and passion.

[![field](https://github.com/anvaka/fieldplay/wiki/images/field_1.png)](https://anvaka.github.io/fieldplay/#?dt=0.007&fo=0.998&dp=0.009&cm=1&cx=-1.275949999999999&cy=-1.6277&w=30.2937&h=30.2937&code=v.x%20%3D%20length%28p%29*min%28sin%28p.y%29%2Ccos%28p.x%29%29%3B%0Av.y%20%3D%20cos%28%28p.y%2Bp.y%29%29%3B%0A%20%20)
[![field 2](https://github.com/anvaka/fieldplay/wiki/images/field_2.png)](https://anvaka.github.io/fieldplay/#?dt=0.007&fo=0.998&dp=0.009&cm=1&cx=-1.275949999999999&cy=-1.62765&w=30.2937&h=30.2937&code=v.x%20%3D%20cos%28p.y%29%3B%0Av.y%20%3D%20cos%28p.x%29%3B%0A%20%20)
[![field 3](https://github.com/anvaka/fieldplay/wiki/images/field_3.png)](https://anvaka.github.io/fieldplay/#?dt=0.02&fo=0.998&dp=0.009&cm=1&cx=0.21419999999999995&cy=-0.7710999999999997&w=55.970200000000006&h=55.970200000000006&code=v.x%20%3D%20min%28sin%28exp%28p.x%29%29%2Csin%28length%28p%29%29%29%3B%0Av.y%20%3D%20sin%28p.x%29%3B%0A%20%20)
[![field 4](https://github.com/anvaka/fieldplay/wiki/images/field_4.png)](https://anvaka.github.io/fieldplay/#?dt=0.02&fo=0.998&dp=0.009&cm=1&cx=2.43185&cy=-1.1695&w=11.4385&h=11.4385&code=v.x%20%3D%20%28p.y%2Bcos%28p.y%29%29%3B%0Av.y%20%3D%20sin%28min%28length%28p%29%2Clog%28%28p.y%2Bp.x%29%29*p.x%29%29%3B%0A%20%20)


## What?

Let's assign to every point on a grid a vector `(1, 0)`. This means
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

## GLSL code for vector field

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


## Page load time

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

# Float packing

The core idea of WebGL based computation is quite simple.

GPU can render images very fast. Each image is a collection of pixels. Each pixels is just a number,
that represents color, usually written in 32 bits (RGBA format).

But who said that these 32 bits per pixel have to represent a color? Why can't we compute some number,
and store it into 32 bits? This number could be, for example, position of a particle that follows
along some velocity vector...

If we do so, the GPU would still treat these numbers as colors:

![colorful mess](https://github.com/anvaka/fieldplay/wiki/images/number_pixels.png)

Luckily, we don't have to make this seemingly random images visible to the users. WebGL allows
to render things onto "virtual" screens, called `frame buffers`.

These virtual screens are just images (textures) in the video memory. With two textures we can 
trick GPU into solving math problems. On each frame the algorithm works like this:

```
1. Tell GPU, to read data from a "background" texture;
2. Tell GPU, to write data to a "screen" texture using frame buffer;
3. Swap "background" with "screen";
```

In theory this should work nice. In practice there is a problem. WebGL doesn't
let you write floating point numbers into textures. So we need to convert a float number into
`RGBA` format, with 8 bits per channel.

In his article, Vladimir used the following encoding/decoding schema:

``` glsl
// decode particle position (x, y) from pixel RGBA color
vec2 pos = vec2(
    color.r / 255.0 + color.b,
    color.g / 255.0 + color.a);
... // move the position
// encode the position back into RGBA
gl_FragColor = vec4(
    fract(pos * 255.0),
    floor(pos * 255.0) / 255.0);
```

Here both `X` and `Y` coordinate of the particle are stored into a single 32bit number.
I used this approach in the beginning, and it worked well on desktop and on my Android phone.

However, when I opened a website on iPhone, unpleasant surprise was waiting for me. Severe
artifacts appeared without any apparent reason.

Compare. The same code runs on desktop (left) and on the iPhone (right)

![regular circle](https://github.com/anvaka/fieldplay/wiki/images/no_banding_desktop_small.gif)
![iPhone banding effect](https://github.com/anvaka/fieldplay/wiki/images/banding_iphone_small.gif)

What's even worse, when field is static (velocity is 0 everywhere), the particles on iPhone were kept moving:

![Desktop - no movement, fine](https://github.com/anvaka/fieldplay/wiki/images/zero_v_desktop_small.gif)
![iPhone - moving. Why?](https://github.com/anvaka/fieldplay/wiki/images/zero_v_moving_iphone_small.gif)

I checked that requested floating point resolution was set to the highest available (`highp`). Yet the artifacts
were to obvious to let them be.

### How can we fix this?

I didn't want to go the easiest path of enabling floating point textures. They are 
[not as much widely supported](https://webglstats.com/search?query=OES_texture_float) as I'd like.
Instead, I did what years of non-GPU programming told me not to do. 

I decided to solve thousands of ordinary differential equations multiple times per frame. Once per each dimension.

It seemed crazy to me, as I thought this would kill performance. But even my low-end Android phone had no problems
with this approach.

So, I'd pass an attribute to the shader, telling which dimension needs to be written as an output:

``` glsl
if (u_out_coordinate == 0) gl_FragColor = encodeFloatRGBA(pos.x);
else if (u_out_coordinate == 1) gl_FragColor = encodeFloatRGBA(pos.y);
```

The `encodeFloatRGBA()` uses all 32 bits to encode float as RGBA vector. I found [its implementation](https://github.com/anvaka/fieldplay/blob/master/src/lib/utils/floatPacking.js)
somewhere on stackoverflow, and I'm not sure if it's the best possible way of packing
(if you know better, please let me know).

The good news is that artifacts were gone:

![No artifacts](https://github.com/anvaka/fieldplay/wiki/images/no_artifacts_small.gif)

# Sharing

Many times I was amazed by how beautiful some vector fields are. To encourage exploration I created a [very naive random vector field
generator](https://github.com/anvaka/fieldplay/blob/master/src/lib/generate-equation.js). You can trigger it by pressing "Randomize" button.

![Generator](https://github.com/anvaka/fieldplay/wiki/images/generator_small.gif)

But please don't think that what generator can do is all there is. It's just a tip of an iceberg, and I hope
you play with vector field yourself.

When you find something interesting - don't forget to share! Just copy the link and share it away.
The link holds all necessary information to restore vector field state (this is done with help of
[query-state](https://github.com/anvaka/query-state) library).

# Thanks!
I learned a lot building this project. I hope you too liked this short voyage into world of vector fields, math and WebGL.

Please [let me know](https://twitter.com/anvaka) what you think.

Have fun!