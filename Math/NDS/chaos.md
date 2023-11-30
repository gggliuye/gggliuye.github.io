---
layout: page_tree_math
title: Chaos Simulations
---


**Chaos is aperiodic long-term behavior in a deterministic system that exhibits sensitive dependence on initial conditions.**

# Infinite-period Bifurcation


$$
\begin{align*}
& \dot{r} = r(1 - r^{2}) \\
& \dot{\theta} = \mu - sin\theta
\end{align*}
$$

<iframe src="/Math/NDS/js/infinite_period.html" height="265px" width="100%" scrolling="no" class="iframe-class" frameborder="0"></iframe>

# Lorenz Attractor

* [Lorenz attractor amusement with Three.js](http://a-d-c.ca/lorenz-attractor-amusement-with-three-js/#page-content)
* [The Lorenz Attractor in 3D](https://paulbourke.net/fractals/lorenz/)
* [Exploring Parameter Space](https://www.cg.tuwien.ac.at/studentwork/VisSem97/Lorenz97/raleigh.html)


$$
\begin{align*}
& \dot{x} = a(y - x) \\
& \dot{y} = x(b - z) - y \\
& \dot{z} = xy - cz
\end{align*}
$$

One commonly used set of constants is a = 10, b = 28, c = 8 / 3. Another is a = 28, b = 46.92, c = 4. "a" is sometimes known as the Prandtl number and "b" the Rayleigh number.

<div align="center">    
<img src="/assets/img/math/bifur.gif" width="50%"/>
</div>

* $ 0 < \rho \le 1$ : 0 is the asymptotically stable critical point - the system converges to zero.
* $ 1 < \rho < 13.926 $ : Depending on the initial values, the solution will quickly converge to one of the critical points.
* $ \rho = 13.926 $ : **homoclinic explosions**. a complicated invariant set is born.
* $ 13.926<\rho<24.06 $ : **transient chaos**, the system is not "chaotic", because long-term behavior is not aperiodic. On the other hand the dynamics do exhibit sensitive dependence on initial conditions.
* $ 24.06<\rho<24.74 $ :  **two types of attractors** : fixed points and a strange attractor. (large perturbation can knock from one to another).
* $ \rho > 24.74 $ : The famous **Lorenz attractor**!
* $ \rho ≈ 99.65 $ : There is a stable 6-period orbit in the form $a^{2}ba^{2}b$.
* $ \rho ≈ 100.75 $ : There is a stable 3-period orbit $a^{2}b$, that is it spirals around one critical point once and the other twice.
* $ \rho > 313 $ : has a globally attraction limit cycle.

<!-- iframe plugin v.4.5 wordpress.org/plugins/iframe/ -->
<iframe src="/Math/NDS/js/LorenzEquations.html" height="1200px" width="100%" scrolling="yes" class="iframe-class" frameborder="0"></iframe>

# Logisitic Map


$$
x_{n+1} = rx_{n}(1 - x_{n})
$$

<iframe src="/Math/NDS/js/logistic_map.html" height="300px" width="100%" scrolling="no" class="iframe-class" frameborder="0"></iframe>


If the system's Lorenz map is nearly one-dimensional and unimodal, then the *universality theory* applies.

# Fractal

1. C has structure at arbitrarily small scales.
2. C is self-similar.
3. The dimension of C is not an integer.
