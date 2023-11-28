---
layout: page_tree_math
title: Nonlinear Dynamical Systems
---

* [ICTP](https://mediacore.ictp.it/categories/differential-equations-and-dynamical-systems/latest), [Dynamical Systems - Stefano Luzzatto](https://www.youtube.com/watch?v=stbpUXA6Mow&list=PLLq_gUfXAnkmC-VWIJ_HW8cdOZLEtHfXJ), [My Notes](https://drive.google.com/file/d/1UcKqtNIxhNVbjkpccYxVHoh3lrEIUxvX/view?usp=sharing).




# Lorenz attractor

* [Lorenz attractor amusement with Three.js](http://a-d-c.ca/lorenz-attractor-amusement-with-three-js/#page-content)
* [The Lorenz Attractor in 3D](https://paulbourke.net/fractals/lorenz/)

$$
\begin{align*}
& \dot{x} = a(y - x) \\
& \dot{y} = x(b - z) - y \\
& \dot{z} = xy - cz
\end{align*}
$$

One commonly used set of constants is a = 10, b = 28, c = 8 / 3. Another is a = 28, b = 46.92, c = 4. "a" is sometimes known as the Prandtl number and "b" the Rayleigh number.

<!-- iframe plugin v.4.5 wordpress.org/plugins/iframe/ -->
<iframe src="lorenz/LorenzEquations.html" height="465px" width="100%" scrolling="yes" class="iframe-class" frameborder="0"></iframe>


# Infinite-period Bifurcation


$$
\begin{align*}
& \dot{r} = r(1 - r^{2}) \\
& \dot{\theta} = \mu - sin\theta
\end{align*}
$$

<iframe src="lorenz/infinite_period.html" height="265px" width="100%" scrolling="no" class="iframe-class" frameborder="0"></iframe>
