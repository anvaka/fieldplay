# Field Play

This is a placeholder for vector fields exploration. Will be available soon.

## What?

Let's assign to every point on a grid a vector. Let's say `(1, 0)`, which means
we have an arrow, with size 1, and it points to the right:

![Vector field V(1, 0)](https://github.com/anvaka/fieldplay/wiki/images/field_1_0.png)

Let's pretend these vectors represent velocity. What if we drop a thousand particles onto 
this field, how would they move?

![Moving particles in V(1, 0)](https://github.com/anvaka/fieldplay/wiki/images/field_1_0_move.gif)

When we assigned a vector to every point on the plain, we created a mathematical structure
called `Vector Field`.

We can assign vectors any way we want. For example, let's assign points with even Y coordinate vector
`(1, 0)`, and points with odd Y coordinate get negative direction: `(-1, 0)`:

![Even odd directions](https://github.com/anvaka/fieldplay/wiki/images/field_even_odd.png)

Again we drop a few thousands particles and see how they move:

![Moving even odd directions](https://github.com/anvaka/fieldplay/wiki/images/field_even_odd_move.gif)

The field above can be written in a single formula:

```
v.x = -2. * mod(floor(y), 2.) + 1.;
v.y = 0.;
```

We divide integer part of `y` by `2`, which can give us either `1` or `0`.
Then we move it, so that the final vector is either `(-1, 0)` or `(1, 0)`. 

So far we've set just one component of the velocity vector `v.x`. The particles
were moving only in horizontal direction. Let's try both components:

```
v.x = -2. * mod(floor(y), 2.) + 1.;
v.y = -2. * mod(floor(x), 2.) + 1.;
```

![Field x, y](https://github.com/anvaka/fieldplay/wiki/images/field_xy.png)
![Animated field x, y](https://github.com/anvaka/fieldplay/wiki/images/field_xy_small.gif)