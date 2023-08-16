---
layout: page_tree_math
title: Primal-Dual Mumford-Shah
---

[Back To Paper Read Home](../00index).

# 1. Mumford-Shah Functional

Firstly, we introduce the **Mumford-Shah Functional** from paper [Optimal approximations by piecewise smooth functions and associated variational problems](https://dash.harvard.edu/bitstream/handle/1/3637121/Mumford_OptimalApproxPiece.pdf?sequence%3D1)

We have the g the "image" data, whose domain is in $R\subset \mathbb{R}^{2}$, and f : $\cup R_{i \to \mathbb{R}}$ a differentiable smooth function on $\cup R_{i}$

Here we consider to segment the image into $\{ R_{i}\}$, disjoint connected open subsets of R. $\Gamma$ will be the
union of the part of the boundary of $R_{i}$ inside R, so that :

$$
  R = R_{1}\cup R_{2}\cup .. \cup R_{n}\cup \Gamma
$$

And the **Mumford-Shah Function** is defined as a energy function:

$$
  E(f, \Gamma) = \mu^{2} \int \int_{R}(f-g)^{2}dxdy + \int \int _{R\setminus \Gamma}\|\triangledown f \|^{2}dxdy + \nu \mid \Gamma\mid
  $$

Where we have the first term: to ensure f is close to g. The second term: that f is smooth within the region $R_{i}$.
And the third term , to achieve short boundaries. All the three terms are important, without anyone of them, we will always have a zero optimal trival solution.

## 1.1 Piecewise constant

The paper discussed several special cases of the functional. Firstly $E_{0}$, which restrict f to be a piecewise constant function.
Alors, the gradient terms of the energy function will be zero. And f(x) in each area will be the mean of g : $mean_{R_{i}}(g)$ , we define :

$$
  E_{0}(f,\Gamma) = \mu^{-2}E(f,\Gamma) = \sum_{i} \int \int_{R_{i}} (g - mean_{R_{i}}g)^{2}dxdy + \frac{\nu}{\mu}\mid \Gamma \mid
  $$

If $\Gamma$ fixed , and $\mu\to 0$, f minimize E tends to be a such
piecewise constant . That we have : $E_{0}$ **is the natural limit functional of E as** $\mu \to 0$.

In this case, it will be a **The Plateau problem** .

## 1.2 $E_{\infty}$

<div align="center">    
<img src="../images/geodesic.PNG" width="40%"/>
</div>

The authors also descussed $E_{\infty}$ :

$$
  \begin{align}
  E_{\infty} &= \int_{\Gamma}[\nu_{\infty} - (\frac{\partial g}{\partial n})^{2}]ds \\
  &= \int_{\Gamma}\rho(dx, dy, x, y) \\
  &= \int_{\Gamma} \frac{\nu_{\infty} (dx^{2}+dy^{2}) - (g_{x}dy + g_{y}dx)^{2} }{\sqrt{dx^{2} + dy^{2}}}
  \end{align}
  $$

**Generalized deodesic problem** :

* $E_{\infty}$ tends to make length of $\Gamma$ as short as possible.
* $E_{\infty}$ tends to make g has the largest possible derivative when normal to $\Gamma$.

If we define the solution f to be g when far from the boundaries and take $f_{\infty}$ when very close to $\Gamma$ :

$$
  f_{\infty}(r,s) = g(r,s) + \epsilon sgn(r)\exp(-\mid r\mid / \epsilon)\frac{\partial g}{\partial r}(0,s)
  $$

Where $\mu = 1/\epsilon, \ \nu = \epsilon \nu_{infty}$, With this f function, we will have :

$$
  E(f_{\infty}, \Gamma) = E(g, \phi) + \epsilon E_{\infty}(\Gamma) + O(\epsilon^{2})
  $$

While $\mu \to \infty$ we will have $\epsilon \to 0$.
That we have : $E_{\infty}$ **is the natural limit functional of E as** $\mu \to \infty$.

# 2. Convex Relaxation

This convex relaxation is introduced by [An algorithm for minimizing the mumford-shah functional](https://ieeexplore.ieee.org/document/5459348)
Which is also the basic for chapter 3, in this page.

The notaion of Mumford-Shah functional in this article:

$$
  E(u) = \lambda \int_{\Omega}(f-u)^{2}dx + \int_{\Omega\setminus S_{u}} \mid\triangledown u\mid^{2}dx + \nu \mathcal{H}^{1}(S_{u})
  $$

Where we have f the known observation of the image, $f:\Omega\subset \mathbb{R}^{2} \to \mathbb{R}$, and $u:\Omega\to\mathbb{R}$ a piece wise smooth function (our desired solution).

I skip the related works here, as I haven't read them (paper worth reading [An efficient primal-dual hybrid gradient algorithm for total variation image restoration](https://link.springer.com/article/10.1007/s11075-018-0618-8) ).

## 2.1 Step 1

**Step 1** : this article try to reform the formule of Mumford-Shah functional, by defining $u\in SBV(\Omega)$ , the special functions of bounded variation [1]_ .
And define the upper level sets of u by the characteristic function $\mathbf{1}_{u} : \Omega \times \mathbb{R}\to \{0,1\}$ of the subgraph of u :

$$
  \mathbf{1}_{u}(x,t) = \begin{cases} 1, \quad if \ t < u(x) \\
  0, \quad else \end{cases}
  $$

<div align="center">    
<img src="../images/sbv.PNG" width="40%"/>
</div>

.. [1] i.e. functions u of bounded variation for which the derivative Du is the sum of an absolutely  continuous part $\triangledown u \cdot dx$ and a discontinuous singular part $S_{u}$, see Figure 2.

## 2.2 Step 2

**Step 2 : Theorem 1.** For a function $u\in SBV(\Omega)$ the Mumford-Shah functional can be
written as :

$$
  E(u) = \sup_{\varphi \in K}\int_{\Omega\times \mathbb{R}}\varphi D\mathbf{1}_{u}
  $$

with a convex set :

$$
  \begin{align}
  K = & \{  \varphi\in C_{0}(\Omega\times \mathbb{R}; \mathbb{R}^{2}): \\
  & \varphi^{t}(x,t) \ge \frac{\varphi^{x}(x,t)^{2}}{4} - \lambda (t-f(x))^{2}, \\
  &\mid \int_{t_{1}}^{t_{2}} \varphi^{x}(x,s)ds \mid \le \nu ,\\
  &\ x\in \Omega ,\ t, t_{1}, t_{2}\in \mathbb{R} \},
  \end{align}
  $$

**Proof Theorem 1.** : First we observe that the right hand part, the intergration, is a integration of changement of the space $\Omega\times \mathbb{R}$,
It is equivalent to the intergraion of the energy flow on the boundary (the normal of the function at boundaries $\nu_{\Gamma_{u}}$):

$$
  \int_{\Omega\times \mathbb{R}}\varphi D\mathbf{1}_{u} = \int_{\Gamma_{u}}\varphi\cdot \nu_{\Gamma_{u}}d\mathcal{H}^{2}
  $$

$$
  \nu_{\Gamma_{u}} = \begin{cases}
  \frac{(\triangledown u, -1)}{\sqrt{\mid\triangledown u \mid^{2} +1}}, \quad if\ u \in \Omega\setminus S_{u} \\
  (\nu_{u},0), \quad \quad if\ u \in S_{u}
  \end{cases}
  $$

As in the boundary $\Omega\setminus S_{u}$, we have the gradient w.r.t. t zero, and w.r.t. x $\triangledown u$, followed by a normalization step. And in $S_{u}$, we have
the gradient w.r.t. t zero, and w.r.t. x the unit vector pointing from outside to inside.
Taking this expression into the integration :

$$
  \int_{\Gamma_{u}}\varphi\cdot \nu_{\Gamma_{u}}d\mathcal{H}^{2} = \int_{\Omega \setminus S_{u}}\frac{\varphi^{x}\cdot \triangledown u - \varphi^{t}}{\sqrt{\mid\triangledown u \mid^{2} +1}}dx +
  \int_{S_{u}}(\int_{u^{-}}^{u^{+}}\varphi^{x}dt )\nu_{u}d\mathcal{H}^{1}
  $$

If we add constraints that :

$$
  \frac{\varphi^{x}\cdot \triangledown u - \varphi^{t}}{\sqrt{\mid\triangledown u \mid^{2} +1}} \le \mid\triangledown u\mid^{2} + (f-u)^{2}
  $$

$$
  \mid \int_{u^{-}}^{u^{+}}\varphi^{x}dt \mid \le \nu
  $$

Which is the constraint that $\varphi$ lies in the convex set K. And it imples that :

$$
  \int_{\Omega\times \mathbb{R}}\varphi D\mathbf{1}_{u} \le E(u)
  $$

$$
  E(u) \ge \sup_{\varphi \in K}\int_{\Omega\times \mathbb{R}}\varphi D\mathbf{1}_{u}
  $$

We could further prove that this difference is rather small, that we could assume it is an equal, with an arbitrarily small error. $\square$ .

## 2.3 Step 3

**Step 3. Relaxation** in the upper reformed Mumford-Shah function, the characteristic function $$\mathbf{1}_{u}$$  is a non-convex function.
Here we apply a convex relaxation upon this part. Introduce a generic function $$v(x,t):\Omega\times\mathbb{R}\to [0,1]$$ to substitue $$\mathbf{1}_{u}$$ , which satisfies:

$$
  \lim_{t\to -\infty}v(x,t)=1, \quad \lim_{t\to +\infty}v(x,t) = 0
  $$

Finally, we obtain **the relaxed convex optimization problem** :

$$
   \begin{align}
   minimize \quad & \sup_{\varphi\in K}\int_{\Omega\times\mathbb{R}}\varphi Dv \\
   subject\ to \quad & \lim_{t\to -\infty}v(x,t)=1, \quad \lim_{t\to +\infty}v(x,t) = 0
   \end{align}
   $$

## 2.4 Discrete Setting

Consider the discrete case. Use a regular $(N\times N)\times M$ pixel gird in space $\Omega \times \mathcal{R}$ :

$$
  G = \{ (i\Delta_{x}, j\Delta_{x}, k\Delta_{t}): i,j = 1,2,...,N, \ k = 1,2,...,M \}
  $$

* Authors define the discrete space C for v :

$$
  C= \{x\in X\mid x(i,j,k)\in [0,1], x(i,j,1)=1, x(i,j,M)=0 \}
  $$

* And develop a discrete version of convex set K.
* The discrete graident operator could be expressed by a matrix A.

Then we have a discrete version of the problem:

$$
  \min_{x\in C}\max_{y\in K}<Ax, y>
  $$

## 2.5 Primal-Dual method

Here the authors consider a more general problem:

$$
  \min_{x\in C}\max_{y\in K}<Ax,y> + <g,x> -<h,y>
  $$

Which is a seddle-point problem, and will be solved by sequential apply Newton's method to the two variables.
The convergence proof could be seen in the paper.

$$
  \begin{cases}
  y^{n+1} = \Pi_{K}(y^{n} + \sigma(A\bar{x}^{n}-h)) \\
  x^{n+1} = \Pi_{C}(x^{n} - \tau (A^{*}y^{n+1}+g)) \\
  \bar{x}^{n+1} = 2\cdot x^{n+1} - x^{n}
  \end{cases}
  $$

Where $\tau$ and $\sigma$ are choosen based on $\tau\sigma L^{2}<1$ (L : the Lipschitz parameter).
And the projection onto K is calculated using Dykstra's iterative projection algorithm [2]_ ([A method for finding projections onto the intersection of convex sets in Hilbert spaces](https://link.springer.com/chapter/10.1007/978-1-4613-9940-7_3) ).

.. [2] In the next paper, these projections will be generalized to solve using the properties of Moreau's theorem, and the resolvent operator. Or we could intreprete it as [the proximal algorithm](https://cvx-learning.readthedocs.io/en/latest/ProximalAlgorithms/Interpretations.html?highlight=resolvent#resolvent-of-subdifferential-operator) .

# 3. First-order Primal-Dual

## 3.1 Primal-Dual formulation

From the paper [A first-order primal-dual algorithm for convex problems with applications to imaging](https://link.springer.com/article/10.1007/s10851-010-0251-1) .
Here a more general saddle-point problem is considered:

$$
  \min_{x\in X}\max_{y\in Y}<Kx, y> + G(x) - F^{*}(y)
  $$

where $G: X\to [0, +\infty]$ and $F^{*} : Y\to [0,+\infty]$ are proper, convex, lower-semicontinous (l.s.c) functions. $F^{*}$ being
itself the convex conjugate of a convex l.s.c. function F.

$$
  F^{*}(y) = \sup_{x}(y^{T}x - F(x))
  $$


This saddle-point problem is a primal-dual formulation of the nonlinear primal problem :

$$
  \min_{x\in X} F(Kx) + G(x)
  $$

or of the corresponding dual problem:

$$
  \max_{y\in Y} -(G^{*}(-K^{*}y) + F^{*}(y))
  $$

The nonlinear primal problem is equivalent to the problem :

$$
  \begin{align}
  & minimize \quad F(y) + G(x) \\
  & subject\ to \quad Kx = y, \ x \in X
  \end{align}
  $$

The lagrangian function is :

$$
  \mathcal{L}(x,y, \lambda) = F(y) + G(x) + \lambda^{T}(Kx - y)
  $$

We have the dual function :

$$
  \begin{align}
  g(\lambda) &= \inf_{x\in X, y}\mathcal{L}(x,y,\lambda) \\
  &= \inf_{x\in X,y} -(<\lambda, y> - F(y)) - (<\lambda,Kx> - G(x)) \\
  &= - \sup_{y}(<\lambda ,y> - F(y)) - \sup_{x\in X}(<-K^{*}\lambda,x> - G(x)) \\
  & = -F^{*}(\lambda) - G^{*}(-K^{*}\lambda)
  \end{align}
  $$

The beginning of this article shows various of the properties of the resolvent, which has close relation with the [proximal operator](https://cvx-learning.readthedocs.io/en/latest/ProximalAlgorithms/Index.html) .

Especially, that the resolvent operator and the proximal operator are equivalent [interpretation](https://cvx-learning.readthedocs.io/en/latest/ProximalAlgorithms/Interpretations.html#resolvent-of-subdifferential-operator) .

$$
  x = (I + \tau \partial F)^{-1}(y) = \mathbf{prox}_{\tau F}(y) = \arg\min_{x}(F(x) + \frac{1}{2\tau}\| x-y\|^{2})
  $$

And the [Moreau's decomposition theorem](https://cvx-learning.readthedocs.io/en/latest/ProximalAlgorithms/Properties.html#moreau-decomposition) .

$$
  x = \tau \mathbf{prox}_{\tau^{-1}F^{*}}(\tau^{-1}x) + \mathbf{prox}_{\tau F}(x)
  $$

$$
  x = \tau (I + \tau^{-1}\partial F^{*})^{-1}(\tau^{-1}x) + (I + \tau\partial F )^{-1}(x)
  $$

## 3.2 Algorithm

* Initialization : Choose $\tau, \sigma >0, \theta\in [0,1]$, $(x^{0}, y^{0}) \in X\times Y$, and set $\bar{x}^{0} = x^{0}$.
* Iterations : Update $x^{n}, y^{n}, \bar{x}^{n}$ as follows:

$$
  \begin{cases}
  y^{n+1} = (I +\sigma \partial F^{*})^{-1}(y^{n} + \sigma K \bar{x}^{n}) \\
  x^{n+1} = (I +\tau \partial G)^{-1}(x^{n} - \tau K^{*} y^{n+1}) \\
  \bar{x}^{n+1} = x^{n+1} + \theta (x^{n+1} - x^{n})
  \end{cases}
  $$

Taking $\theta$ equals 0, will result in the classical Arrow-Hurwicz algorithm. And this paper takes $\theta$ to be 1. which can
be seen as an approximate extragradient step.

[Back To Paper Read Home](../00index).
