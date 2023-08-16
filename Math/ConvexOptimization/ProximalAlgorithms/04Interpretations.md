---
layout: page_tree_math
title: 3. Interpretations
---

[Back To Proximal Algorithms Home](../00index).

# Table of Contents

1. [Moreau-Yosida regularization](#l3.1)
2. [Resolvent of subdifferential operator](#l3.2)
3. [Modified gradient step](#l3.3)
4. [Trust region problem](#l3.4)


<a name="l3.1"></a>
## 3.1 Moreau-Yosida regularization

From the name we can know that, this interpretation is closely related to the Moreau decomposition.
And the proximal operator has the same formula as the moreau-vosida regularization.

**Definition 3.1**: The **infimal convolution** of closed proper convex function f and g on $\mathbb{R}^{n}$, denoted $f \square g$
is defined as :

$$
  (f \square g)(v) = \inf_{x}(f(x) + g(v-x))
$$

with $$\mathbf{dom}(f\square g) = \mathbf{dom}f + \mathbf{g}$$

The main example related is the **Moreau envelope** or **Moreau-Yosida regularization** $M_{\lambda f}$ of the function $\lambda f$,
(which has the same definition as $\bar f_{\mu}$ in the page "Proerties", the proof of Moreau decomposition) is defined as:

$$
  M_{\lambda f}(v) =  \lambda f \square  (1/2)\| \cdot \|^{2}_{2}
$$

$$
  M_{\lambda f}(v) = \inf_{x}(f(x) + (1/2\lambda) \| x- v\|^{2}_{2})
$$

### 3.1.1 Convexity

Note $$L(x,y) = f(y) + \frac{1}{2*\mu} \| x- y\|^{2}_{2}$$, then  is jointly convex in x and y, Then $$M_{\lambda f}(v) = \inf_{y}L(x,y)$$
must be convex (since its epigraph is the projection of a convex set).


### 3.1.2 Smoothed or Regularized form of f

**Theorem 3.2** : $(f \square g)^{*} = f^{*} + g^{*}$.

**Proof of Theorem 3.2** :

$$
  \begin{align*}
  (f\square g)^{*}(x) &= \sup_{u}(y^{T}u - (f\square g)(u)) \\
  &= \sup_{u}(y^{T}u - \inf_{v}(f(v) + g(u-v))) \\
  &= \sup_{u} \sup_{v} (y^{T}u - f(v) - g(u-v)) \\
  & \quad ( t \triangleq u - v \Rightarrow u = t+v) \\
  &= \sup_{t}sup_{v}(y^{T}(t+v) - f(v) - g(t)) \\
  &= \sup_{t}(y^{T}t -g(t)) + \sup_{v}(y^{T}v - f(v))\\
  &= f^{*} + g^{*}
  \end{align*}
$$

**Proof of Theorem 3.2 with duality** :

First, we can reform the Moreau envelope as a equation constrained convex optimization problem:

$$
  \begin{align*}
  M_{\lambda f}(x) &= \inf_{y}(f(y) + (1/2\lambda)\|x-y\|^{2}) \\
  &= \inf_{y, s.t. x=y=z}(f(y) + (1/2\lambda)\|z\|^{2})
  \end{align*}
$$

The largangian of this problem is :

$$
  \begin{align*}
  \mathbb{L}(y,z,\mu) &= f(y) + (1/2\lambda)\|z\|^{2} + \mu^{T}(x-y-z) \\
  &=(f(y)- \mu^{T}y) + ((1/2\lambda)\|z\|^{2} - \mu^{T}z) + \mu^{T}x
  \end{align*}
$$

The dual problem is :

$$
  \begin{align*}
  g(\mu) &= \inf_{y,z} \mathbb{L}(y,z,\mu) \\
  &= - \sup_{y}(\mu^{T}y - f(y)) - (\lambda/2)\|\mu\|^{2} + \mu^{T}x \\
  &= - f^{*}(\mu) - (\lambda/2)\|\mu\|^{2} + \mu^{T}x
  \end{align*}
$$

As strong duality holds for strickly feasible convex optimization problem, we have the dualty gap equals zero:

$$
  \begin{align*}
  M_{\lambda f}(x) &= \sup_{\mu} g(\mu)\\
  &= \sup_{\mu} (-f^{*}(\mu) - (\lambda/2)\|\mu\|^{2} + \mu^{T}x) \\
  &= (f^{*} + (\lambda/2)\|\cdot\|^{2})^{*}(x)
  \end{align*}
$$

As a result of Theorem 3.2, we have :

$$
  \begin{align*}
  M_{\lambda f} = M_{\lambda f}^{**} &= (f \square (1/2\lambda)\|\cdot\|^{2}_{2})^{**} \\
  &= (f^{*} + ( (1/2\lambda)\|\cdot\|^{2}_{2})^{*})^{*} \\
  & \quad (\|\cdot\|^{2}_{2} \quad is \quad self-dual) \\
  &=(f^{*} +  (1/2\lambda)\|\cdot\|^{2}_{2})^{*}
  \end{align*}
$$

From the upper equation, we can interperte the Moreau envelope $M_{\lambda f}$ as a smooth approximation to a function
by taking its conjugate, adding regulization. **Mreau envelope obtains a smooth approximation via**:

1. Take the conjugate of f : $f^{*}$.

2. Regularize : $f^{*} +  (1/2\lambda)\|\cdot\|^{2}_{2}$

3. Take the conjugate again : $(\cdot)^{*} = M_{\lambda f}$

In my point of view, this three steps is the most important part of the interpretation of Moreau envelope : a **smoothed or regularized form of f**.

### 3.1.3 Moreau envelope of L1 norm

Moreau envelope of $\mid \cdot \mid$ is the Huber function:

$$
  \begin{align*}
  M_{L1} &= (\mid \cdot \mid^{*} + (1/2)\|x\|^{2}_{2})^{*}\\
  &=\sup_x(x^{T}y - \sup_{v}(-\mid v\mid + v^{T}x) - (1/2)\|x\|^{2}_{2})
  \end{align*}
$$

Consider firstly the variable v:

$$
  \sup_{v \ge 0} ( - \mid v \mid + v^{T}x) =
  \begin{cases}
  0  \quad x < 1\\
  + \infty \quad x >1
  \end{cases}
$$

$$
  \sup_{v \le 0} ( - \mid v \mid + v^{T}x) =
  \begin{cases}
  0  \quad x > -1\\
  + \infty \quad x < -1
  \end{cases}
$$

In summary :

$$
  k(x) = \sup_{v} ( - \mid v \mid + v^{T}x) =
  \begin{cases}
  0  \quad \mid x\mid < 1\\
  + \infty \quad \mid x \mid >1
  \end{cases}
$$

And:

$$
  M_{L1} =\sup_x(-\frac{1}{2}(x-y)^{2} - k(x) + (1/2)y^{2})
$$

* If $\mid y \mid \le 1$, take $x=y$, $\mid x \mid \le 1$, $k(x) = 0$, We will have $M_{L1} = \frac{1}{2}y^{2}$.

* If $\mid y \mid \ge 1$, $\mid x \mid \ge 1$, $k(x) = \infty$, we should also take $\mid x \mid \le 1$, as a result $\mid x \mid = 1$. We will have $M_{L1} = \mid y \mid - \frac{1}{2}$

We end up with **Huber function**.


### 3.1.4 Gardient of Moreau envelope


Consider the definition of Proximal operator, we have :

$$
  M_{\lambda f}(x) = f(\mathbf{prox}_{\lambda f}(x)) + \frac{1}{2\lambda}\| x - \mathbf{prox}_{\lambda f}(x)\|^{2}_{2}
$$

To find the gradient of Moreau envelope, we reform the expression first:

$$
  \begin{align*}
  M_{\lambda f}(x) &= \inf_{y}(f(y) + (1/2\lambda)\|y-x\|^{2}_{2})  \\
  &=\inf_{y}(f(y) + (1/2\lambda)(\|x\|^{2} + \|y\|^{2} - 2x^{T}y))  \\
  &= (1/2\lambda)\|x\|^{2} + (1/\lambda) \inf_{y}(\lambda f(y) - x^{T}y + (1/2)\|y\|^{2})  \\
  &= (1/2\lambda)\|x\|^{2} - (1/\lambda) \sup_{y}(-\lambda f(y) + x^{T}y - (1/2)\|y\|^{2})  \\
  &= (1/2\lambda)\|x\|^{2} - (1/\lambda) (\lambda f + (1/2)\|\cdot\|^{2})^{*}(x)
  \end{align*}
$$

Then take the gradient of both sides, we will have :

$$
  \begin{align*}
  \Delta M_{\lambda f}(x) &= x/\lambda - (1/\lambda)\arg\max_{y}(x^{T}y - \lambda f(y) - (1/2)\|y\|^{2}) \\
  & (as \quad x_{best} \in \partial f^{*}(y) \quad from \quad Properties \quad page) \\
  &= (1/\lambda)(x- \mathbf{prox}_{\lambda f}(x))
  \end{align*}
$$

$$
  \mathbf{prox}_{\lambda f}(x) = x- \lambda \Delta M_{\lambda f}(x)
$$

The proximal operator is a **gradient update step** of a smoothed version of f, with step size $\lambda$.

<a name="l3.2"></a>
## 3.2 Resolvent of subdifferential operator


The subdifferential operator $\partial f$ is a point-to-set mapping (project to the subgradient set).
From the optimal condition of the evaluation of proximal operator, we have :

$$
  0 \in \partial f(x) + (1/\lambda)(x-v)
$$

$$
  v \in \lambda \partial f(x) + x = (I + \partial f)(x)
$$

$$
  x \in (I + \partial f)^{-1}(v)
$$

$$
  prox_{\lambda f} = (I + \partial f)^{-1}
$$

Where $(I + \partial f)$ is a projection operator. And its inverse $(I + \partial f)^{-1}$ is called
the **resolvent of the operator** $\partial f$.

<a name="l3.3"></a>
## 3.3 Modified gradient step

### 3.3.1 First order approximation

Take the first order taylor expansion of function f:

$$
  \hat{f}^{(1)}_{v}(x) = f(v) + \Delta f(v)^{T}(x-v)
$$

Substitute into the proximal operator:

$$
  \mathbf{prox}_{\lambda \hat{f}^{(1)}_{v}} = \arg\min_{x} (f(v) + \Delta f(v)^{T}(x-v) + (1/2\lambda)\|x-v\|^{2}_{2})
$$

$$
  \frac{\partial}{\partial x}(\cdot) = \Delta f(v) + (1/\lambda)(x-v) = 0
$$

$$
  \mathbf{prox}_{\lambda \hat{f}^{(1)}_{v}} = v - \lambda \Delta f(v)
$$

It is a standard gradient update with step size $\lambda$.


### 3.3.2 Second order approximation


Take the seconf order taylor expansion of function f:

$$
  \hat{f}^{(2)}_{v}(x) = f(v) + \Delta f(v)^{T}(x-v) + \frac{1}{2}(x-v)^{T}\Delta^{2} f(v)(x-v)
$$

Substitute into the proximal operator:

$$
  \mathbf{prox}_{\lambda \hat{f}^{(2)}_{v}} = \arg\min_{x} (f(v) + \Delta f(v)^{T}(x-v) + \frac{1}{2}(x-v)^{T}\Delta^{2} f(v)(x-v) + (1/2\lambda)\|x-v\|^{2}_{2})
$$

$$
  \frac{\partial}{\partial x}(\cdot) = \Delta f(v) + \Delta^{2} f(v)(x-v) + (1/\lambda)(x-v) = 0
$$

$$
  \Delta f(v) + ( \Delta^{2} f(v) + (1/\lambda) I) (1/\lambda)(x-v) = 0
$$

$$
  \mathbf{prox}_{\lambda \hat{f}^{(2)}_{v}} = v - ( \Delta^{2} f(v) + (1/\lambda) I)^{-1}\Delta f(v)
$$

It is a Tikhonovregularized Newton update, also known as a Levenberg-Marquardt up-date
or a modified Hessian Newton update. Thus, gradient and Levenberg-Marquardt steps can be viewed as proximal operators
of first and second-order approximations of f.

<a name="l3.4"></a>
## 3.4 Trust region problem


The second term of the proximal operator $\|x-v\|^{2}_{2}$ could be seen as a squared penalty, to
restraint the variable in a nearby region.

[Back To Proximal Algorithms Home](../00index).
