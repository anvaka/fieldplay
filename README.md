# Field Play

This is a placeholder for vector fields exploration. Will be available soon.

## What?

Imagine you have a set of points on the plain. If you assign a vector for
every point, you get a construct, which scientists call "Vector field".

And before you think to yourself "boring" and leave this page, please give me
couple more seconds to convince you otherwise.

Let's assign to every point on a grid a vector. Let's say `(1, 0)`, which means
we have an arrow, with size 1, and it points to the right:

![Vector field V(1, 0)](https://github.com/anvaka/fieldplay/wiki/images/field_1_0.png)

Now if we imagine these vectors are actually "velocity vectors" we can ask
interesting questions. For example, what if we drop a few thousands particles onto this
field, how would they move?

![Moving particles in V(1, 0)](https://github.com/anvaka/fieldplay/wiki/images/field_1_0_move.gif)

The vector field above did not depend on the actual point coordinate. What if
we decide to make every odd Y coordinate should have a vector field (1, 0), and
every even coordinate is `(-1, 0)`?

*TODO Image with arrow*

Again we drop a few particles and see hwo they move:

*TODO image*

