---
layout: page_tree_math
title: 4. General Pattern
---

[Back To ADMM Home](../00index).

Here we will list some frequently faced cases, and introduce some usually used methods.
As the calculation of the X update and the Z update are equivalent (as we could switch the parameter notations).
We will discuss the update of X (as an example), and the same principle could be applied to
Z updates. Consider the general X-update as follows:

$$
  X^{+} = \arg\min_{x}(f(x) + (\rho/2)\|Ax- v\|_{2}^{2})
$$

Where $v = - Bz + c - u$ is a known constant vector for X-update.


## 4.1 Proximity Operator


More detail about this could be seen in the proximal algorithm pages (corresponding to the proximal algorithm paper by S.Boyd, recommond to read).

If we consider A = I , we can simplify the x-update to a proximity operator:

$$
  X^{+} = \arg\min_{x}(f(x) + (\rho/2)\|x- v\|_{2}^{2}) = \mathbf{prox}_{q/\rho,f(x)}(v)
$$

This expression is closely related to the **Moreau envelope** or the **Moreau Yosida regulaization** with the expression:

$$
  M_{1/\rho} = f(x) + (\rho/2)\|x- v\|_{2}^{2}
$$

We have som useful results:

* Moreau envelop of l1 norm is huber function, and the proximity operator of l1 norm is the shrinkage function.
* Proximity operator of a indicator function is the projection onto that set.

## 4.2 Quadratic Objective Function

Consider the quadratic primal objective function (with P symmetric positive semidefinite):

$$
  f(x) = (1/2)x^{T}Px + q^{T}x + r
$$

Assume $P+\rho A^{T}A$ is invertible, then we can derivate the expression of the optimal x with the first order optimal condition:

$$
  \frac{\partial f}{\partial x} = Px^{+} + q + \rho A^{T}(Ax^{+}-v) = 0
$$

$$
  x^{+} = (P + \rho A^{T}A)^{-1}(\rho A^{T} v - q)
$$

We have several options to solve this linear equation:

* Solve directly, form the matrix $P+\rho A^{T}A, $ ($\mathcal{O}(pn^{2})$), then calculate and cache the factorization ($\mathcal{O}(n^{3})$), the back-solve cost $\mathcal{O}(n^{2})$.
* Further exploit the spairty to save the factorization cost.
* If we update $\rho$, we will have to update the factorization of $P+\rho A^{T}A$, which is a large cost. We should weight the update of $\rho$ and the update of factorization.
* We can use the matrix inverse lamma to simplify the inverse, while all the inverse in the expression exist. With the expression we can reduce the problem to a faster calcualtion, if the inverse of P could be calculated fast, or the dimension p is small.

$$
  (P+\rho A^{T}A)^{-1} = P^{-1} + \rho P^{-1}A^{T}(I + \rho AP^{-1}A^{T})^{-1}AP^{-1}
$$

Add an equation constraint Fx = g, with an addition constraint variable, the x update will be :

$$
  x^{+} = \arg\min_{x} ((1/2)x^{T}Px + q^{T}x + r + \lambda^{T}(Fx-g) +(\rho/2)\|x- v\|_{2}^{2})
$$

The first order optimal conditions are :

$$
  \begin{align*}
  \frac{\partial (\cdot)}{\partial x} &= (P + \rho A^{T}A)x + q - \rho A^{T}v + F^{T}\lambda = 0 \\
  \frac{\partial (\cdot)}{\partial \lambda} &= Fx - g = 0
  \end{align*}
$$

These equations corresponding to the solution of the following linear equation:

$$
  \begin{bmatrix} P + \rho A^{T}A  & F^{T}\\ F & 0 \end{bmatrix}
  \begin{bmatrix} x^{+} \\ \lambda \end{bmatrix} + \begin{bmatrix}q-\rho A^{T}v \\ -g \end{bmatrix} = 0
$$

## 4.3 Smooth Objective Terms


Now consider some more complicate cases. When f is smooth, general iterative methods can be used to carry out the x-minimization.
We can use the standard Newton's method, or using some method for large problems, for examples the conjugate gradient method of the
limited memory Broyden-Fletcher-Goldfarb-Shanno(L-BFGS) algorithm. The convergence depends on the condition of f function, the quadratic penalty term tends to improve the convergence.

* Early termination
* Warn start

## 4.4 Decomposition

 By apply decomposition on the update, we could further use parallex calculation.

[Back To ADMM Home](../00index).
