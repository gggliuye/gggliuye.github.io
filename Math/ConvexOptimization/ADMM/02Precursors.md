---
layout: page_tree_math
title: 2. Precursors
---

[Back To ADMM Home](../00index).

## 2.1 Dual Ascent

Normal we solve a problem by iteratively descent the primal objective problem. **Dual Ascent methods** instead try to solve the
dual problem by iteratively asent the dual function.

Consider the problem:

$$
  \begin{align*}
  & minimize \quad f(x) \\
  & subject\ to \quad Ax = b
  \end{align*}
$$

Take the lagrangian function:

$$
  \mathcal{L}(x ,\lambda) = f(x) + \lambda^{T}(Ax - b)
$$

The dual function is :

$$
  \begin{align*}
  g(\lambda) &= \inf_{x} \mathcal{L}(x, \lambda) \\
  & = \inf_{x} (f(x)  + \lambda^{T}(Ax)) - b^{T}\lambda \\
  & = - sup_{x}((-A^{T}\lambda)^{T}x - f(x)) - b^{T}\lambda \\
  & = - f^{*}(-A^{T}\lambda) - b^{T}\lambda
  \end{align*}
$$

The dual problem is :

$$
   maximize\quad g(\lambda)
$$

while we have :

$$
  x^{k+1} := arg\min_{x}\mathcal{L}(x, \lambda^{k})
$$

$$
  \begin{align*}
  \Delta g(\lambda) &= - (-A)\frac{\partial f^{*}(\mu)}{\partial \mu} - b \\
  & = A x^{*} -b
  \end{align*}
$$

Here , we have a scent direction of the dual variable. If g is not differentible it is 'a' subgradient
(which will be a dual subgradient method). And we could
have a dynamic choice of the step size $\alpha^{k}$.
So, we could update the dual variable with :

$$
  \lambda^{k+1} := \lambda^{k} + \alpha^{k}(Ax^{k+1}-b)
$$

In summary the dual ascent update is :

$$
  \begin{align*}
  & x^{k+1} := arg\min_{x}\mathcal{L}(x, y^{k})\\
  & y^{k+1} := y^{k} + \alpha^{k}(Ax^{k+1}-b)
  \end{align*}
$$

**While the convergence may not hold in many applications**, so dual ascent often cannot be used.


## 2.2 Dual Decomposition


If the objective function could be decomposed, so will the dual function, as a result we could
updata the primal variables separately.

For an example :

$$
  f(x) = \sum_{i = 1}^{N}f_{i}(x_{i})
$$

Here we did not clarify the separable sets of the variable, each $x_{i}$ could be a sub-block of variables.
We could also partioning the matrix A.

$$
  \sum_{i = 1}^{N}A_{i}x_{i} = b
$$

The lagrangian will be :

$$
  \begin{align*}
  \mathcal{L}(x, y) &= \sum_{i = 1}^{N}f_{i}(x_{i}) + y^{T}(\sum_{i = 1}^{N}A_{i}x_{i} - b) \\
  &=\sum_{i=1}^{N} (f_{i}(x_{i}) + y^{T}A_{i}x_{i} - (1/N)y^{T}b ) \\
  & = \sum_{i=1}^{N} \mathcal{L}_{i}(x_{i}, y)
  \end{align*}
$$

Similarly as before, the update will be :

$$
  \begin{align*}
  & x^{k+1}_{i} := arg\min_{x}\mathcal{L}_{i}(x_{i}, y^{k})\\
  & y^{k+1} := y^{k} + \alpha^{k}(Ax^{k+1}-b)
  \end{align*}
$$

## 2.3 Augmented Lagrangians and the Method of Multipliers


The augmented Lagrangians for the problem in 2.1 is :

$$
  \mathcal{L}_{\rho}(x,y) = f(x) + y^{T}(Ax-b) + (\rho/2)\|Ax-b\|_{2}^{2}
$$

It is the normal Lagrangian of the following problem (which is equivalent to original one):

$$
  \begin{align*}
  &minimize \quad f(x) + (\rho/2)\|Ax-b\|_{2}^{2} \\
  &subject \ to \quad Ax = b
  \end{align*}
$$

The result update will be:

$$
  \begin{align*}
  & x^{k+1} := arg\min_{x}\mathcal{L}_{\rho}(x, y^{k})\\
  & y^{k+1} := y^{k} + \rho(Ax^{k+1}-b)
  \end{align*}
$$

For this special step size we chosen, we have the following relations (start from the update equation of x):

$$
  \begin{align*}
  0 &= \Delta_{x} \mathcal{L}_{\rho}(x^{k+1}, y^{k})\\
  &= \Delta_{x} f(x^{k+1})  + \rho A^{T}(y^{k} + Ax^{k+1} -b)\\
  &= \Delta f(x^{k+1}) + A^{T}y^{k+1}
  \end{align*}
$$

which is exactly the dual feasibility of the problem. which justify the choice of the step size.

* The convergence of this mehtod is much better.

* However in this expression, the update of x depends on all the primal variables. As a result, even if f is separable, the update of x will not be separable.

[Back To ADMM Home](../00index).
