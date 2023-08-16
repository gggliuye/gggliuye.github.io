---
layout: page_tree_math
title: 3. Alternating Direction Method of Multipliers
---

[Back To ADMM Home](../00index).

## 3.1 Algorithm

For the standard form the type of problems:

$$
  \begin{align*}
  &minimize \quad f(x) + g(z) \\
  &subject\ to \quad Ax + Bz = c
  \end{align*}
$$

The augmented lagrangian of this problem is (with $\rho >0$):

$$
  \mathcal{L}_{\rho}(x,z,y) = f(x) + g(z) + y^{T}(Ax+Bz-c) + (\rho/2)\|Ax+Bz-c\|_{2}^{2}
$$

The method of multipliers is the following:

$$
  \begin{align*}
  &(x^{k+1}, z^{k+1}) := \arg\min_{x, z} \mathcal{L}_{\rho}(x,z,y^{k}) \\
  &y^{k+1} := y^{k} + \rho(Ax^{k+1} + Bz^{k+1} -c)
  \end{align*}
$$

The ADMM updates consist of the following three steps:

$$
  \begin{align*}
  &x^{k+1} := \arg\min_{x} \mathcal{L}_{\rho}(x,z^{k},y^{k}) \\
  &z^{k+1} := \arg\min_{z} \mathcal{L}_{\rho}(x^{k+1},z,y^{k}) \\
  &y^{k+1} := y^{k} + \rho(Ax^{k+1} + Bz^{k+1} -c)
  \end{align*}
$$

ADMM update the corelated variables x and z in alternating direction.
In this form the convergence is proven :
[Proof of convergence](https://github.com/gggliuye/cvx_learning/blob/master/docs/ADMM/ADMM_convergence_proof.pdf) and can also be seen in the original paper.
There exist other expression of the augmented lagranians, for an example with l1 norm. However the convergence of these forms are not yet proven.

**In practice**: it can be very slow to converge to high accuracy, however it converges fast to modest accuracy.
It makes ADMM more like the conjuage gradient methods in practice. In the general case, ADMM is suitable for the cases
when modest accuracy is sufficient.

## 3.2 Scaled form

We can reform the problem into a much simpler form (which is mostly used in practice), with noting $r(x,z) = Ax+Bz-c$ the primal residual.


$$
  \begin{align*}
  \mathcal{L}_{\rho}(x,z,y) &=  f(x) + g(z) + y^{T}(Ax+Bz-c) + (\rho/2)\|Ax+Bz-c\|_{2}^{2}\\
  &=f(x) + g(z) + y^{T}r + (\rho/2)\|r\|_{2}^{2} \\
  &=f(x) + g(z) + (\rho/2) (\|r\|_{2}^{2} + (1/\rho^{2})\|y\|_{2}^{2} + (2/\rho)y^{T}r ) -  (1/2\rho)\|y\|_{2}^{2} \\
  &= f(x) + g(z) +  (\rho/2) \|r + (1/\rho)y \|_{2}^{2} -  (1/2\rho)\|y\|_{2}^{2}
  \end{align*}
$$

By noting $u = (1/\rho)y$ we have the simpified form of ADMM:

$$
  \begin{align*}
  &x^{k+1} := \arg\min_{x}(f(x) + (\rho/2) \|Ax + Bz^{k} -c + u^{k]} \|_{2}^{2} ) \\
  &z^{k+1} := \arg\min_{z}(g(z) + (\rho/2) \|Ax^{k+1} + Bz -c + u^{k]} \|_{2}^{2} ) \\
  &u^{k+1} := u^{k} + Ax^{k+1} + Bz^{k+1} -c
  \end{align*}
$$

We can see that :

$$
  u^{k} = u^{0} + \sum_{i=1}^{k}r^{i}
$$

## 3.3 Optimality Conditions and Stopping Criterion

The primal residual:

$$
  r^{k+1} =  Ax^{k+1} + Bz^{k+1} -c
$$

The dual residual:

$$
  s^{k+1} = \rho A^{T}B(z^{k+1} -z^{k})
$$

For the detail see the paper and the convergence proof (the convergence of the dual residual are hidden in the convergence proof).

## 3.4 Varying Penalty Parameter


The update of the penalty parameter $\rho$. For an example:

$$
  \rho^{k+1} =
  \begin{cases}
  \tau^{incr}\rho^{k}  \quad if \|r^{k}\|_{2} > \mu\|s^{k}\|_{2}\\
  \rho^{k} /\tau^{decr} \quad if \mu\|r^{k}\|_{2} < \|s^{k}\|_{2} \\
  \rho^{k} \quad otherwise
  \end{cases}
$$

[Back To ADMM Home](../00index).
