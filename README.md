# Field Play

This is a placeholder for vector fields exploration. Will be available soon.

## What?

Let's assign to every point on a grid a vector. Let's say `(1, 0)`, which means
we have an arrow of length 1, pointing to the right:

![Vector field V(1, 0)](https://github.com/anvaka/fieldplay/wiki/images/field_1_0.png)

Let's pretend these vectors represent velocity. What if we drop a thousand particles onto 
this field and see how they move?

![Moving particles in V(1, 0)](https://github.com/anvaka/fieldplay/wiki/images/field_1_0_move.gif)

When we assigned a vector to each point on the plain, we created a mathematical structure
called `Vector Field`.

We can assign vectors any way we want. For example, let's assign vector `(1, 0)` to points
with even `y` coordinate, and vector `(-1, 0)` to points with odd `y` coordinate.

![Even odd directions](https://github.com/anvaka/fieldplay/wiki/images/field_even_odd.png)

Again we drop a few thousands particles and see how they move:

![Moving even odd directions](https://github.com/anvaka/fieldplay/wiki/images/field_even_odd_move.gif)

The field above can be written in a single formula:

```
v.x = -2. * mod(floor(y), 2.) + 1.;
v.y = 0.;
```

The reminder after integer division `y/2` can be either `1` or `0`.
Then we transform the reminder, so that the final vector is either `(-1, 0)` or `(1, 0)`. 

So far, we've used only one component of the velocity vector `v.x`. And particles
moved only horizontally. Let's try to set both components and see what happens

```
v.x = -2. * mod(floor(y), 2.) + 1.;
v.y = -2. * mod(floor(x), 2.) + 1.;
```

![Field x, y](https://github.com/anvaka/fieldplay/wiki/images/field_xy.png)
![Animated field x, y](https://github.com/anvaka/fieldplay/wiki/images/field_xy_small.gif)

Wow! Two simple operations, and the final animation looks like an art piece!

![Field x, y](https://github.com/anvaka/fieldplay/wiki/images/field_xy_final.png)

Vector fields turns out to be very flexible generative framework.

## How this project works?

This project is inspired by Vladimir Agafonkin's article: 
[How I built a wind map with WebGL
](https://blog.mapbox.com/how-i-built-a-wind-map-with-webgl-b63022b5537f).

In his article, Vladimir shows how to render up to a million particles at 60
frames per second, entirely on GPU.

I used almost the same technique with a few modifications:

1. The vector field is defined in shader language with GLSL code, so that 
mathematical formulas can be expressed in free form.
2. Position of a particle is computed with 4th order [Runge-Kutta method](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods) on GPU.
3. Each dimension X and Y is computed independently, so that I can store more accurate
point position.
4. I added panning and zooming support with [panzoom](https://github.com/anvaka/panzoom) 
library
5. The vector field definition is saved in the URL with [query-state](https://github.com/anvaka/query-state) 
library. So that you can bookmark/share your vector fields easily.

### GLSL code for vector field

Every time when vector field code is changed I compile a new shader:

![shader compilation](https://github.com/anvaka/fieldplay/wiki/images/edit_small.gif)

The biggest challenge here was to provide informative error messages.
Web browser gives basic error info, but I find it confusing sometimes.

For example, the following code has a tiny error:

``` glsl
vec2 velocity(vec2 p) {
  return p
}
```

If we try to compile this shader, the browser will say: `ERROR: 0:3: '}' : syntax error`.
What's wrong? - There is a missing semicolon on line `2`, the correct version is:

``` glsl
vec2 velocity(vec2 p) {
  return p;
}
```

It would be better if I could just tell that semicolon is missing.

Turns out there is a great glsl type checker and minifier [evanw/glslx](https://github.com/evanw/glslx).
It is written in not very well known language [Skew](http://skew-lang.org/), and provides great many more
feature than I needed.

After several hours of playing with it, I was able to [extract bits](https://github.com/evanw/glslx/issues/10)
specific to type checking, and got the validation working:

![glsl validation](https://github.com/anvaka/fieldplay/wiki/images/glsl_validation.gif)


### Page load time

Unfortunately, GLSL parsing came at cost - the library is ~64KB of compressed javascript. Together with
vue.js (~26KB) users would have to download almost 90KB of code, that is not immediately needed
to render the vector field.

So, my plan was to render vector field as soon as possible, and show the settings UI and any possible
errors later.

The code that loads vector field from query string, compiles it, and shows it on the screen is very
small. 


*to be continued*