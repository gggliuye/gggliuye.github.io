---
layout: page_tree_math
title: 6. Evaluating Proximal Operators
---

[Back To Proximal Algorithms Home](../00index).

To use the proximal algorithms, we need to evaluate (solve) the proximal operator at each step.
The proximal operator is a convex optimization problem.

* We will investigate solving using generic optimization algorithms.
* Proximal methods can be very useful even in cases when a closed form solution for the proximal operator is not available.
* Proximal operators and certain projection operators have a close connection.

# Table of Contents

1. [Generic methods](#l6.1)
2. [Polyhedra](#l6.2)
3. [Cones](#l6.3)
4. [Norms and norm balls](#l6.4)

<a name="l6.1"></a>
## 6.1 Generic methods

$$
  \begin{cases}
  Unconstrained  \begin{cases}
  Non-smooth : \quad Subgradient \quad methods, etc. \\
  Smooth : \quad Gradient \quad methods (Newton, quasi-Newton, etc), etc
  \end{cases} \\
  Constrained \begin{cases}
  Non-smooth: \quad Projected \quad subgradient, etc. \\
  Smooth: \quad Projected \quad gradient, Interior-point \quad methods, etc
  \end{cases}
  \end{cases}
$$

We can also review the solve of SDP, we can transform SDP to a cone problem,
and solve it with a generic interior-point method based cone solver.

### 6.1.1 Quariatic problems

$$
  f(x) = (1/2)x^{T}Ax + b^{T}x + c
$$

With $A \in \mathbf{S}^{n}_{+}$, then :

$$
  \mathbf{prox}_{\lambda f}(v) = \arg\min_{x} ((1/2)x^{T}Ax + b^{T}x + c + (1/2\lambda) (x^{T}x + v^{T}v - 2v^{T}x))
$$

$$
  \frac{\partial}{\partial x} =  Ax + (b - (1/\lambda)v) + (1/\lambda)x = 0
$$

$$
  \mathbf{prox}_{\lambda f}(v) = (I + \lambda A)^{-1}(v- \lambda b)
$$

In summary, evaluate the proximal operator is to solve the linear equation:

$$
  (I + \lambda A)x = v- \lambda b
$$

* We can explore the sparse structure of A, to solve faster.
* If we use direct method (factorize), we could save the factorization for re-use.
* If we use an iterative method, e.g. CG, we can warm start with previous solution.

### 6.1.2 Smooth functions

Same idea here as the descussion above, in most our method, we will try solve :

$$
  (I + \lambda H)x = v- \lambda b
$$

* We can use the previous solution as a warm start.
* We can exploit structue of Hessian(H) of f.

### 6.1.3 General scalar functions

**Localization method**: this method, is taught in Subgradient Chapter of EE364b, as a method
suitable for solving non-smooth problem. It is basicly iteratively reduce the candidate region
of the solution. We can use the subgradient to find a update direction. It can be guaranteed
to converge. In practice, this method works, however in a very slow way.

**Guarded Newton method**: this method is basicly the same as localization method, except it
requires the objective function to betwice differentiable, to use the hessian and gradient to
find a update direction. It converges faster but more expensive for each iteration
(a nature result as it exploit more the objective function).

<a name="l6.2"></a>
## 6.2 Polyhedra

Consider the problem : projection to a polyhedra:

$$
  \begin{align*}
  &minimize \quad (1/2)\|x - v\|^{2}_{2} \\
  &subject\quad to\quad Ax = b, \quad Cx \le d
  \end{align*}
$$

Where $A \in \mathbf{R}^{m \times n}$, and $C \in \mathbf{R}^{p \times n}$.
The dual problem of it is a convex quadratic problem. So it is the same as evulative the
proximal operator of a convex quadratic function restricted to a polyhedron.


### 6.2.1 Solution via duality

It is much more efficient to solve via duality, when m and p are both much smaller than n.
m and n are much smaller means the dual variables have much smaller dimension, which is to
say the cost to solve the dual problem is much lower.
This corresponding to a case where we wanto to project a high-dimensional point onto a
polyhedron described by just a few equalities and inequalities.

$$
  \mathbb{L}(x, \mu, \eta) = (1/2)(x^{T}x + v^{T}v - 2v^{T}x) + \mu^{T}(Ax-b) + \eta^{T}(Cx-d)
$$

The optimal conditions are :

$$
  \begin{align*}
  &\frac{\partial \mathbb{L}}{\partial x} = x - v + A^{T}\mu + C^{T}\eta = 0 \\
  &\frac{\partial \mathbb{L}}{\partial \mu} = Ax - b = 0 \\
  &\frac{\partial \mathbb{L}}{\partial \eta} = Cx - d = 0
  \end{align*}
$$

From the first condition we have :

$$
  x = v - A^{T}\mu - C^{T}\eta
$$

Them the dual function is the concave quadratic:

$$
  \begin{align*}
  g(\mu, \eta) &= - (1/2)\|v - A^{T}\mu - C^{T}\eta\|^{2}_{2} + (1/2)v^{T}v - \mu^{T}b - \eta^{T}d \\
  &= - \frac{1}{2}\|A^{T}\mu - C^{T}\eta\|^{2}_{2} + ((Av)^{T} - b^{T})\mu + ((Cv)^{T} - d^{T})\eta \\
  &= - \frac{1}{2}\| \begin{bmatrix}A\\C \end{bmatrix}^{T}\begin{bmatrix} \mu \\ \eta\end{bmatrix} \|^{2}_{2}
  + (\begin{bmatrix}A\\ C \end{bmatrix} v  - \begin{bmatrix} b\\d\end{bmatrix})^{T}\begin{bmatrix}\mu \\ \eta \end{bmatrix}
  \end{align*}
$$

The dual problem is :

$$
  \begin{align*}
  &maximize g(\mu, \eta) \\
  &subject\quad to\quad \eta \ge 0
  \end{align*}
$$

The solution of the primal problem is :

$$
  x^{*} = v - A^{T}\mu^{*} - C^{T}\eta^{*}
$$

**Gram matrix caching**, is n is large but m+p is modest. we define :

$$
  G = \begin{bmatrix}A\\ C \end{bmatrix} \in \mathbf{R}^{(m+p)\times n}
$$

As a result, we have :

$$
  g(\mu, \eta) = - \frac{1}{2}\| G^{T}\begin{bmatrix} \mu \\ \eta\end{bmatrix} \|^{2}_{2}
  + (G v  - \begin{bmatrix} b\\d\end{bmatrix})^{T}\begin{bmatrix}\mu \\ \eta \end{bmatrix}
$$

We can parallely compute $GG^{T}$ :

$$
  GG^{T} = \sum_{i= 1}^{n} \begin{bmatrix}a_{i}\\c_{i}\end{bmatrix} \begin{bmatrix}a_{i}\\c_{i}\end{bmatrix}^{T}
$$

The computation of this part is the most expensive, as a result we can use the similar gestion
as we deal with the Newton's step. For an example, we can limit the frequence of the update of
$GG^{T}$.

### 6.2.2 Affine set


see the paper

### 6.2.3 Halfspace

see the paper

### 6.2.4 Box

see the paper

### 6.2.5 Simplex

see the paper

<a name="l6.3"></a>
## 6.3 Cones

$$
  \begin{align*}
  &minimize \quad (1/2)\|x - v\|^{2}_{2} \\
  &subject\quad to\quad x \in \mathcal{K}
  \end{align*}
$$

Where $\mathcal{K}$ is a proper cone with dual cone $\mathcal{K}^{*}$.
It is a projection onto a proper cone, using the Moreau theorem, we have :

$$
  v = \Pi_{\mathcal{K}}(v) + \Pi_{\mathcal{K}^{*}}(v)
$$

So we have :

$$
  x \in \mathcal{K}, \quad v = x - \lambda, \quad \lambda \in \mathcal{K}^{*},  \quad \lambda^{T}x = 0
$$

It also corresponding to the duality properties of proper cone.

<a name="l6.4"></a>
## 6.4 Norms and norm balls

$$
  \begin{align*}
  \mathbf{prox}_{\lambda f}(v)&= v - \lambda \mathbf{prox}_{f^{*}/\lambda}(v/\lambda) \\
  &= v - \lambda \Pi_{\mathcal{B}}(v/\lambda)
  \end{align*}
$$

### 6.4.1 Euclidean norm

$$
  \mathbf{prox}_{\lambda f}(v) = (1-\lambda/\|v\|_{2})_{+}v =
  \begin{cases} (1-\lambda/\|v\|v_{2})v \quad \|v\|_{2} \ge \lambda \\
  0 \quad \quad \|v\|_{2} < \lambda
  \end{cases}
$$

In $\mathbb{R}$ space, it is a ReLU function. In $\mathbb{R}^{2}$, its magnitude looks like:

<div align="center">    
<img src="../images/magitude_l2_r2.png" width="30%"/>
</div>

[Back To Proximal Algorithms Home](../00index).
