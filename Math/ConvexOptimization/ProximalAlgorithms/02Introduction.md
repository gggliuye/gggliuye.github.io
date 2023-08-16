---
layout: page_tree_math
title: 1. Proximal Algorithms Introduction
---

[Back To Proximal Algorithms Home](../00index).

<a name="l1.1"></a>
## 1.1 Definitions

Proximal algorithms can be viewed as tool for non-smooth, constrained, large-sacle, or distributed problems.
The proximal operator $\mathbf{prox}_{\lambda f} : \mathbf{R}^{n} \to \mathbf{R}^{n}$ of f is defined by (where $\lambda > 0$):

$$
  \mathbf{prox}_{\lambda f}(v) = \mathop{\arg\min}_{x} (f(x) + \frac{1}{2 \lambda}\| x - v \|_{2}^{2})
$$

<a name="l1.2"></a>
## 1.2 Generalized projections

When f is the indicator function:

$$
  \mathbf{I}_{\mathbf{C}}(x) =
  \begin{cases}
  0  \quad x \in \mathbf{C}\\
  + \infty \quad x \not\in \mathbf{C}
  \end{cases}
$$

where $\mathbf{C}$ is a closed nonempty convex set. The proximal operator of f reduces to Euclidean projection onto $\mathbf{C}$ :

$$
  \mathbf{prox}_{\lambda \mathbf{I}_{\mathbf{C}}}(v) =
  \mathop{\arg\min}_{x} (\mathbf{I}_{\mathbf{C}}(x) + \frac{1}{2 \lambda}\| x - v \|_{2}^{2})
$$
$$
  \mathbf{prox}_{\lambda \mathbf{I}_{\mathbf{C}}}(v) = \mathop{\arg\min}_{x \in \mathbf{C}} (\frac{1}{2 \lambda}\| x - v \|_{2}^{2})
   = \Pi_{\mathbf{C}}(v)
$$

Proximal operators thus can be viewed as generalized projections.

<a name="l1.3"></a>
## 1.3 Gradient step

The proximal operator of f is an optimal point, so It satisfies the optimal condition:

$$
  0 = \frac{\partial}{\partial x}(f(x) + \frac{1}{2 \lambda}\| x - v \|_{2}^{2})
$$
$$
  0 = \Delta f(x^{*}) + \frac{1}{\lambda} (x^{*}-v)
$$
$$
  \mathbf{prox}_{\lambda f}(v) = x^{*} = v - \lambda \Delta f(x^{*}) \approx v - \lambda \Delta f(x)
$$

We will see more later.

<a name="l1.4"></a>
## 1.4 Fixed point

The following equation holds, if and only if $x^{*}$ minimizes f.

$$
  \mathbf{prox}_{\lambda f}(x^{*}) = x^{*}
$$

<a name="l1.5"></a>
## 1.5 Advantages

* Work under extremely general conditions.
* Can be fast.
* Amenanle to distributed optimization.
* Oftern conceptually and mathematically simple.

<a name="l1.6"></a>
## 1.6 Review convex cones

* The ordering of cone (the overload of the in-equality) :

$$
  a \succeq_{K}b \Leftrightarrow a-b \in K
$$

* Dual cone:

$$
  \mathcal{K}^\cdot=\{a\in\mathbb{H}\,\mid\,\langle a,b\rangle\ge0,\,\forall b\in\mathcal{K}\}
$$

[Back To Proximal Algorithms Home](../00index).
