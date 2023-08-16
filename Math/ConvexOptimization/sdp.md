---
layout: page_tree_math
title: Semidefinite Programming
---

* Introduction of SDP, several examples of SDP.
* Duality properties, dual problem is also SDP, optimal conditions, duality gap, primal-dual problem.
* Log-barrier function, analytic center, central path (objective function, duality gap).

In summary, primal-dual algorithms for semidefinite programs share many of the features
and characteristics of the corresponding algorithms for LPs. Our final conclusion is
therefore that it is not much harder to solve a rather wide class of nonlinear convex
optimization problems than it is to solve LPs.

# Table of Contents

1. [Introduction](#l1)
2. [Examples](#l2)
3. [Duality](#l3)
    1. [Strong Duality](#l3.1)
    2. [Optimal Condition](#l3.2)
    3. [Primal-Dual](#l3.3)
4. [The Central Path](#l4)
    1. [Barrier Function for a linear matrix inequality](#l4.1)
    2. [Analytic center](#l4.2)
    3. [Central Path: Objective](#l4.3)
    4. [Central Path: Duality gap](#l4.4)
5. [Primal-dual potential reduction methods](#l5)
    1. [General Description](#l5.1)
    2. [Potential reduction method 1](#l5.2)
    3. [Potential reduction method 2](#l5.3)
    4. [Potential reduction method 3](#l5.4)
    5. [Plane search](#l5.5)
    6. [Numerical examples](#l5.6)
6. [Phase I and Phase I-II methods](#l6)


<a name="l1"></a>
# 1. Introduction

**Semidefinite programming**. consider the problem of minimizing a linear function of a variable
$x\in \mathcal{R}^{m}$ subject to a matrix inequality:

$$
\begin{align*}
&minimize\quad c^{T}x \\
&subject\ to \quad F(x) = F_{0} + \sum_{i=1}^{m}x_{i}F_{i} \ge 0
\end{align*}
$$

The problem data are the vector c and symmetric matrices $F_{i}$.

* The inequality sign means F(x) is positive semidefinite, i.e. $z^{T}F(x)z \ge 0, \ \forall z \in \mathcal{R}^{n}$ . It is equivalent to a set of infinite set of linear constraints. It is therefore that the theory of semidefinite programming closely parallels the theory of linear programming.
* Many algorithms for solving LPs should have generalization that handle semidefinite programs.  (e.g. LP is a SDP problem)
* There are some important differences. Duality results are weaker for SDPs than for LPs, and there is no straightforward or practival simplex method for SDPs.
* Recognizing Schur complements in nonlinear expressions is often the key step in reformulating nonlinear convex optimization problems as SDPs.
* **SDPs can be solved very efficiently, both in theory and in partice**.

This paper will discuss the **interor-point method** for SDP.

<a name="l2"></a>
# 2. Examples

<a name="l2.1"></a>
## 2.1 QCQP

$$
\begin{align*}
&minimize \quad f_{0}(x) \\
&subject\ to \quad f_{i}(x) \le 0, \ i = 1,...,L,
\end{align*}
$$

Where :

$$
f_{i}(x) = (A_{i}x+b)^{T}(A_{i}x+b) - c_{i}^{T}x -d_{i}
$$

QCQP could be cast as SDP, while, QCQP could be more efficiently solved via the second-order cone optimzation.

<a name="l2.2"></a>
## 2.2 Maximum eigenvalues and matrix norm minimization

<a name="l2.3"></a>
## 2.3 Logarithmic Chebychev approximation

$$
minimize \quad \max_{i}\mid a_{i}^{T} -b_{i} \mid
$$

<a name="l2.4"></a>
## 2.4 Structural optimziation

e.g. optimize the physics structure of a building or a bridge.

<a name="l2.5"></a>
## 2.5 Pattern separation by ellipsoid

Seek a quadratic function $f(x) = x^{T}Ax + b^{T}x + c$ to sperate data into two sets (x and y).
So that we have :

$$
  \begin{align*}
  &(x^{i})^{T}Ax^{i}+b^{T}x^{i} + c \le 0, i =1,...,K, \\
  &(y^{j})^{T}Ay^{j}+b^{T}y^{j} + c \le 0, j =1,...,L,
  \end{align*}
$$

We may further constrain the function to be an ellipsoid (i.e. A>0) .
The problem will be a SDP feasibility problem.

<a name="l2.6"></a>
## 2.6 Statistics

SDPs arise in minimum trace factor analysis.

<a name="l2.7"></a>
## 2.7 Control and System theory

Consider the differential inclusion:

$$
  \begin{align*}
  &\frac{dx}{dt} = Ax(t) + Bu(t) \\
  &y(t) = Cx(t) \\
  &\mid u_{i}(t)\mid \le \mid y_{i}(t)\mid ,i= 1,...,p,
  \end{align*}
$$

This a linear system with uncertain, time-varying, unity-bounded, diagonal feedback.

We seek an invariant ellipsoid. i.e. an ellipsoid $\mathcal{E} = \{x\mid x^{T}Px\le 1  \}$ such that for any x and u satisfy the upper equations,
$x(T)\in \mathcal{E}$ implies $x(t) \in \mathcal{E} , \ \forall t \ge T$. Which means the system will always be in the state
ellipsoid in the future.

The ellipsoid is invariant if and only if the function $V(x) = x(t)^{T}Px(t)$ is nonincreasing for any x and u that satisfy the state transformation equations.

$$
  \begin{align*}
  \frac{d}{dt}V(x(t)) & = (Px(t))^{T}\frac{dx(t)}{t} + (\frac{dx(t)}{dt})^{T}Px(t) \\
  & = \begin{bmatrix} x(t) \\ u(t)\end{bmatrix}^{T}
  \begin{bmatrix} A^{T}P+PA & PB \\B^{T}P & 0 u(t)\end{bmatrix} \begin{bmatrix} x(t) \\ u(t)\end{bmatrix}
  \end{align*}
$$


<a name="l3"></a>
# 3. Duality

The dual problem associated with the SDP is :

$$
  \begin{align*}
  maximize\quad &-Tr(F_{0}Z) \\
  subject\ to \quad &Tr(F_{i}Z) = c_{i}, i=1,...m, \\
  & Z \ge 0, \ Z^{T} = Z \in \mathbb{R}^{n\times n}
  \end{align*}
$$

The lagrangian of the original problem is :

$$
  \begin{align*}
  \mathcal{L}(x,z) &= c^{T}x - z^{T}F(x)z \\
  & = c^{T}x - Tr( z^{T}F(x)z) \\
  & = c^{T}x - Tr( F(x)z^{T}z) \\
  & = c^{T}x - Tr( F(x)Z) , \quad where Z = z^{T}z\\
  & = c^{T}x - Tr( (F_{0} + \sum_{i=1}^{m}x_{i}F_{i})Z) \\
  \end{align*}
$$


$$
  \frac{\partial \mathcal{L}(x,Z)}{\partial x_{i}} = c_{i} - Tr(F_{i}Z) = 0, i = 1,...,m
$$

$$
  \mathcal{L}(x,z)^{*} = -Tr(F_{0}Z)
$$

**This dual problem is also a SDP.** i.e. it can be put into the same formulation as the primal problem.

**Proof**:

Firstly, we note that the feasible set $\{ Z\mid Z= Z^{T}\in R^{n\times n}, Tr(F_{i}Z)=c_{i}, i=1,..,m \}$ is actually an affine set.
As any linear combination of the elements in the set is also in the set, as we have :

$$
  \alpha_{1}Z_{1} + \alpha_{2}Z_{2} = (\alpha_{1}Z_{1} + \alpha_{2}Z_{2})^{T} ,\ \alpha_{1} + \alpha_{2} = 1
$$
$$
  Tr(F_{i}(\alpha_{1}Z_{1} + \alpha_{2}Z_{2})) = \alpha_{1}Tr(F_{i}Z_{1}) + \alpha_{2}Tr(F_{i}Z_{2}) = c_{i}
$$

So we can express the feasible set in the form:

$$
  \{G(y)=G_{0} + y_{1}G_{1} + \cdot \cdot\cdot + y_{p}G_{p}\mid y\in \mathcal{R}^{p} \}
$$

<a name="l3.1"></a>
## 3.1 Strong Duality

**Duality Gap** is (using the upper constrains and the definition of F(x)):

$$
  \eta = c^{T}x + Tr(F_{0}Z) = \sum_{i=1}^{m}Tr(ZF_{i}x_{i}) + Tr(ZF_{0}) = Tr(ZF(x)) \ge 0
$$

in which we use $Tr(AB)\ge 0$ when $A = A^{T}\ge 0$ and $B=B^{T}\ge 0$, Thus we have :

$$
  c^{T}x \ge -Tr(F_{0}Z)
$$

i.e. the dual objective value is lower bounds of the primal optimal value.

**Theorem Strong Duality.** we have p* = d* if either of the following conditions holds:

* The primal problem is strictly feasible. i.e. exist an x with F(x) > 0.
* The dual problem is strictly feasible. i.e. exist a Z with $Z=Z^{T}>0$.

($F(x) \ge 0$ is the **feasible** condition, while F(x) > 0 is the **strictly feasible** condtion).
If both conditions hold, the optimal set X and Z are nonempty.

In this case,

$$
  c^{T}x = -Tr(F_{0}Z) = p* = d*
$$

Thus $Tr(F(x)Z) = 0$, Since $F(x)\ge 0$ and $Z\ge 0$, we have F(x)Z=0, the **complementary slackness** condition.

**Example** : consider an example to further show the strong duality:

$$
  \begin{align*}
  & minimize \quad x_{1} \\
  & subject\ to \quad \begin{bmatrix}
  0 & x_{1} & 0 \\ x_{1} &x_{2}&0 \\ 0&0&x_{1}+1
  \end{bmatrix} \ge 0
  \end{align*}
$$

The feasible set of the upper problem is $\{[x_{1}, x_{2}]^{T} \mid x_{1}=0, x_{2}\ge 0  \}$
And in this feasible set, the optimal is $p^{*} = 0$. Its dual problem is :

$$
  \begin{align*}
  & maximize\quad -z_{2} \\
  & subject\ to \quad \begin{bmatrix}
  z_{1} &(1-z_{2})/2 & 0 \\ (1-z_{1})/2 & 0 & 0 \\ 0 & 0 & z_{2}
  \end{bmatrix} \ge 0
  \end{align*}
$$

The dual feasible set is $\{[z_{1}, z_{2}]^{T} \mid z_{1}\ge 0, z_{2}=1  \}$, the optimal is $d^{*} = -1$.
In the primal problem we have $F(x)  = F([0, x_{2}])$ which then have $F(x) \ge 0 $, thus
the primal problem is feasible but not strictly feasible. Same, the dual problem is feasible but not strictly feasible.
It violates the following optimal conditions. As a result, it has non-zero duality gap.

<a name="l3.2"></a>
## 3.2 Optimal Condition

Thus we have the **optimal conditions for SDP**:

$$
  \begin{align*}
  &F(x)\ge 0\\
  &Z\ge 0, \ Tr(F_{i}Z) = c_{i}, i=1,...,m, \\
  &ZF(x) = 0
  \end{align*}
$$

Which are *primal feasible*, *dual feasible*, and *zero duality-gap*. Which is equvialent to the stictly feasible conditions of primal
problem and dual problem.

<a name="l3.3"></a>
## 3.3 Primal-Dual

The primal dual methods for SDP is :

* Generate a sequence of primal and dual feasible points $x^{(k)}$ and $z^{(k)}$, where k donates the iteration numbers.
* $x^{(k)}$ is suboptimal, which gives an upper bound. And $z^{(k)}$ as a certificate, which gives an lower bound.
* We have the duality gap from the upper derivatives $c^{T}x - p^{*} \le \eta^{k} = c^{T}x^{(k)} + Tr(F_{0}Z^{(k)})$ , we could use this as the stopping certierion $c^{T}x^{(k)} + Tr(F_{0}Z^{(k)}) \le \epsilon$ .

Which could be formed as **Primal-Dual Optimization Problem** :

$$
  \begin{align*}
  & minimize \quad c^{T}x + Tr(F_{0}Z) \\
  & subject\ to \quad F(x) \ge 0,\ Z\ge 0,\ Tr(F_{i}Z) = c_{i}, i=1,...,m
  \end{align*}
$$

Which is also an SDP.

<a name="l4"></a>
# 4. The Central Path

The problem solving algorithm will be developed as an central path algorithm.
By firstly develop the barrier function for the constrains then find an central path, using
the barrier 'force field'.

Suppose the strictly feasible holds.

Build the Log-barrier function (carefully choosen) based on a function (primal objective function, or
with the duality function together),
with a relaxation on the constrains to parameter $\gamma\ (\eta)$.
Then found the analytic center $x(\gamma)$, with the sequence of $\{ x(\gamma) \}$, we could
get closer and closer to the optimal, with the convergence properties analysised later.

<a name="l4.1"></a>
## 4.1 Barrier Function for a linear matrix inequality

As the former described problems (the primal SDP problem , the dual problem, and the
primal-dual problem) are all SDPs. We will generally consider the linear matrix inequality constrain.
Its barrier is (finity only the problem is strictly feasible) :

$$
  \phi(x) = \begin{cases}
  \log\det F(x)^{-1} \quad if F(x)>0 \\
  + \infty \quad \quad otherwise
  \end{cases}
$$

The upper function is : **analytic, stritly convex, and self-concordant** .
It has the following results.
Using $\nabla \log\det X = X^{-1}$.

$$
  (\nabla \phi(x))_{i} = -Tr(F_{i}\nabla\log\det(F)) = - Tr(F_{i}F(x)^{-1})
$$

$$
  (\nabla^{2} \phi(x))_{i,j} = -Tr(F_{j}\nabla(Tr(F^{-1}F_{i})))= Tr(F(x)^{-1}F_{i}F(x)^{-1}F_{j})
$$

$$
  \begin{align*}
  \log\det (X+\delta X)^{-1} &\approx \log\det X^{-1} + \sum_{i}(\nabla \phi(x))_{i}\delta x_{i}
  + \sum_{i}\sum_{j} \frac{1}{2} \delta x_{i}(\Delta^{2} ]\phi(x))_{i,j}\delta x_{j} \\
  & = \log\det X^{-1} - \sum_{i} Tr(X^{-1}F_{i})\delta x_{i} + \sum_{i,j}\frac{1}{2} \delta x_{i} Tr(X^{-1}F_{i}X^{-1}F_{j}) x_{j} \\
  & = \log\det X^{-1} - Tr(X^{-1}\delta X) + \frac{1}{2} Tr(X^{-1}\delta X X^{-1}\delta X)
  \end{align*}
$$

The first line uses the second order approximation, and using $\delta X = \sum_{i}\delta x_{i}F_{i}$.

<a name="l4.2"></a>
## 4.2 Analytic center

Suppose X is bounded. As the barrier is stirctly convex, it has an unique minimizer (**The Analytic Center** of the linear inequality):

$$
  x^{*} = \arg\min \phi(x)
$$

Using the first-order optimal condition:

$$
  (\nabla \phi(x^{*}))_{i} = - Tr(F(x^{*})^{-1}F_{i}) = 0
$$

The log function of a linear set (detX) could be seen as product of a set of distances. We have the similar interpretation as the general
center path algorith, as a point that maximized the product of a set of distances.

We can use the Newton's method to solve the analytic center as an iterative process of solve the minimize problem:

$$
  \begin{align*}
  \delta x^{N} &= \arg\min_{v\in \mathcal{R}^{m}} \phi(x+v) \\
  &= \arg\min_{v\in \mathcal{R}^{m}} \log\det(F(x) +F(v))^{-1} \\
  &= \arg\min_{v\in \mathcal{R}^{m}}\{ - (\log\det F(x)^{-1} - Tr(F(x)^{-1}F(v)) + \frac{1}{2} Tr(F(x)^{-1}F(v) F(x)^{-1}F(v))) \} \\
  &= \arg\min_{v\in \mathcal{R}^{m}} \{ -\sum_{i}v_{i}Tr(F^{-1/2}F_{i}F^{-1/2}) + \frac{1}{2} \sum_{i,j}v_{i}v_{j}Tr((F^{-1/2}F_{i}F^{-1/2})(F^{-1/2}F_{j}F^{-1/2})) \} \\
  &= \arg\min_{v\in \mathcal{R}^{m}} (-2Tr(A) + Tr(A^{T}A) )\\
  &= \arg\min_{v\in \mathcal{R}^{m}} Tr((-I+A)^{T}(-I+A)) \\
  &= \arg\min_{v\in \mathcal{R}^{m}} \| -I + A  \|_{F}
  \end{align*}
$$

Where $F(v) = \sum_{i}v_{i}F_{i}$, and $A =\sum_{i}v_{i} F^{-1/2}F_{i}F^{-1/2}$, and the final
line uses the Frobenius norm. Which is a least squares problem with m variables and n(n+1)/2 equations.

Then the step size could be calcuated using line search algorithm $\hat{p} = \arg\min_{p} \phi(x+p\delta x^{N})$
Which could be simplfied by eigenvalue calculation.

The convergence analysis could be seen in the paper.

<a name="l4.3"></a>
## 4.3 Central Path: Objective

Consider the following inequalities $F(x)>0, c^{T}x=\gamma$ , where $p^{*}<\gamma<\bar{p}$ (from our assumptions), where $\bar{p} = \sup \{c^{T}x\mid F(x)>0 \}$ the bound
of the objective problem. We could define the analytic center of these inequalities:

$$
  \begin{align*}
  x^{*}(\gamma) = & \arg\min && \log\det F(x)^{-1} \\
  & subject\ to && F(x) > 0, c^{T}x =\gamma
  \end{align*}
$$

The curve of $x^{*}(\gamma)$ is called **the central path** for the semidefinite problem in Chapter 1.
As $\gamma$ getting close to $p^{*}$, x converges to an optimal point.

With the lagrangian:

$$
  \mathcal{L}(x, \lambda) = \log\det F(x)^{-1} + \lambda (c^{T}x - \gamma)
$$

Apply the opimal condition:

$$
  \partial \mathcal{L}(x, \lambda) / \partial x = - Tr (F(x^{*}(\gamma))^{-1}F_{i}) + \lambda c_{i} = 0
$$

$$
  Tr (F(x^{*}(\gamma))^{-1}F_{i}) =  \lambda c_{i} , \quad i = 1,...,m
$$

It shows that $F(x^{*}(\gamma))^{-1}/\lambda$ is dual feasible when $\lambda>0$ (as it satisfies the dual feasible conditions).

The duality gap with primal-dual feasible pair $$x=x^{*}(\gamma), Z=F(x^{*}(\gamma))^{-1}/\lambda$$ is:

$$
  \eta = Tr(F(x)Z) = Tr(F(x^{*}(\gamma)) F(x^{*}(\gamma))^{-1}/\lambda ) = Tr(I/\lambda) = n/\lambda
$$

We could also see that it solve the following dual SDP [1]_ :

$$
  \begin{align}
  &minimize \quad && \log\det Z^{-1} \\
  &subject\ to && Tr(F_{i}Z) =c_{i}, i=1,...,m, \\
  & && Z>0, \\
  & && -Tr(F_{0}Z) = \gamma - n/\lambda
  \end{align}
$$

The Lagrangian multiplier $\lambda$ is related to the duality gap of the point on the path
of centers and the associated dual feasible point.

Define the *deviation from the central path*:

$$
 \psi(x) = \log\det F(x)^{-1} - \log\det F(x^{*}(c^{T}x))^{-1}
$$

The difference between the value of the barrier function at the point x and the minimum of the barrier
function over all points with the same value of cost function as x. (if it equals zeros, then x in the central path.)

See the convergence properties in the paper.

$$
  \# Newton \ steps \le 5 + 11\Phi(x)
$$

.. [1] See the proof [here](https://github.com/gggliuye/cvx_learning/blob/master/docs/SDP/handproofs/potential_reduction_2.pdf).

<a name="l4.4"></a>
## 4.4 Central Path: Duality gap

Optimal the sum of primal and dual function, with a relaxation on the duality gap constraint.

$$
  \begin{align*}
  (x^{*}(\eta), Z^{*}(\eta)) = & \arg\min && -\log\det F(x) - \log\det Z \\
  & subject\ to && F(x) > 0, Z>0\\
  & && Tr(F_{i}Z) = c_{i}, i = 1,...,m,\\
  & && c^{T}x + Tr(F_{0}Z) = \eta
  \end{align*}
$$

The constrains are primal strictly feasible conditions, dual strictly feasible conditions, and the definition of duality gap.
The objective functions are the sum of barrier functions for primal variable and dual variable.
We also have [2]_ :

$$
  Z^{*}(\eta) F(x^{*}(\eta)) = (\eta/n) I
$$

And $\eta = c^{T}x +Tr(F_{0}Z) = Tr(F(x)Z)$ (using $Tr(F_{i}Z) = c_{i}$),
Therefore the optimal of the upper problem is :

$$
  \begin{align}
  -\log\det F(x^{*}(\eta))Z^{*}(\eta) &= - \log\det(\eta/n)I = - n\log(\eta/n) = n\log n - n\log(\eta) \\
  &= n\log n - n\log Tr(F(x)Z)
  \end{align}
$$

The difference (a measure of the deviation of x, Z from centrality) is :

$$
  \begin{align}
  \psi(x, Z) &= - \log\det F(x)Z + \log\det F(x^{*}(\eta))Z^{*}(\eta) \\
  &= - \log\det F(x)Z + n\log Tr(F(x)Z) - n\log n \\
  \end{align}
$$

.. [2] Similar to the proof in [1]_ , we could get that $$Z^{*}(\eta) = F(x^{*}(\eta))^{-1}\eta/n$$ , which is equivalent to the expression.

<a name="l5"></a>
# 5. Primal-dual potential reduction methods

Build the potential energy function, use 1st/2nd order approximation (based on the convexity properties), then apply
Newton's method for descent direction, plane search for step size.

<a name="l5.1"></a>
## 5.1  General Description

The potential function is defined below, where is a summary of log of the duality gap, and the derivation from the
analytic center.

$$
  \begin{align}
  \phi(x, Z) &= \mu\sqrt{n} \log(Tr(F(x)Z)) + \psi(x, Z) \\
  & = (n+ \mu\sqrt{n}) \log(Tr(F(x)Z)) - \log\det F(x)Z - n\log n
  \end{align}
$$

Where $\mu$ is a parameter that sets the relative weight of the term involving duality gap and the derivation from center term.
As $\psi > 0$, we have $\eta \le \exp(\psi/(\mu\sqrt{n}))$, therefore if the potential funcion value is small,
the duality gap must be small.

The potential reduction method will be a method to iteratively update x and Z, such that reduce the potential by at least
a fixed amount $\delta$ in every step. In this condition, we will have convergence in $O(\sqrt{n})$ steps,
provided the initial pair is sufficiently centered.

  **Potential reduction algorithm**:

  **given** strictly feasible x and Z.

  **repeat** :
    1. (descent direction) Find a suitable direction $\delta x$ and a suitable dual feasible direction $\delta Z$.
    2. (step size - plane search) Find $p,q\in \mathbb{R}$ that minimize $\phi(x+p\delta x, Z+q\delta Z)$.
    3. Update  $x:=x+p\delta x$, $Z:=Z+ q\delta Z$.

  **until** duality gap $\eta \le \epsilon$.

The plane search could be seen later in this page, and the descent direction could be obtained by solving the
following linear equations (A).

$$
  S\delta Z S + \sum_{i=1}^{m}\delta x_{i}F_{i} = -D
$$

$$
  Tr(F_{j}\delta Z) = 0 , j = 1,..., m.
$$

The $S=S^{T}$ and $D=D^{T}$ in the first function depends on the particular algorithm and could change in every iteration.
The second function is to keep the dual feasiblility of Z. It has m+n(n+1)/2 equations and m+n(n+1)/2 variables.
If F(x) has sparity property, it could be simplier.

It can be solved efficiently via a least-squares problem [1]_ :

$$
  \delta x = \arg\min_{\mu\in \mathbb{R}^{m}}\| S^{-1/2} (D+\sum_{i=1}^{m}\mu_{i}F_{i}) S^{-1/2} \|_{F}
$$

It raises as the optimal condition of the following two quadratic minimization problems:

$$
  \begin{align*}
  \delta x = & \arg\min_{\mu \in \mathbb{R}^{m}} && (Tr(DS^{-1}(\sum_{i=1}^{m}\mu_{i}F_{i})S^{-1}) \\
  & && \ + \frac{1}{2}Tr((\sum_{i=1}^{m}\mu_{i}F_{i})S^{-1}(\sum_{j=1}^{m}\mu_{j}F_{j})S^{-1}) ),\\
  \delta Z = & \arg\min_{V} && Tr(DV)+\frac{1}{2}Tr(VSVS) \\
  & subject\ to && V= V^{T}, \\
  & && Tr(F_{i}V) = 0, i=1,...,m.
  \end{align*}
$$

.. [1] Proof could be found [here](https://github.com/gggliuye/cvx_learning/blob/master/docs/SDP/handproofs/potential_reduction_1.pdf) , and an example of LP problem could be found in page 2.

<a name="l5.2"></a>
## 5.2 Potential reduction method 1

Referring to the potential function, it is not a convex function.
While the first term $(n+ \mu\sqrt{n}) \log(Tr(F(x)Z))$ is concave in x and Z.
Which will offer a negative semidefinite term to Hessian of $\psi$. This method is
to **ignore the second derivative of this concave term**.

Apply first order approximation of the first term and second order approxmiation for the
other terms, we will have $\psi(x+\mu,Z+V)$. Then respectively minimize the approximation
of $\psi$, we will found they are equivalent to the linear equations (A), with respectively [2]_ :

* For $\delta x$ update : $D=\rho FZF-F$ and $S=F$, gets $\delta x^{p}, \delta Z^{p}$.
* For $\delta Z$ update : $D=\rho F-Z^{-1}$ and $S=Z^{-1}$ gets $\delta x^{d}, \delta Z^{d}$..

And we have the convergence Theorem : Let $x^{k}, Z^{k}$ denotes the values of x and Z after kth
iteration of the potential reduction algorithm with search directions $\delta x^{p}, \delta Z^{d}$.
We have :

$$
  \psi(x^{(k+1)}, Z^{(k+1)}) \le \psi(x^{(k)}, Z^{(k)}) - 0.78
$$

.. [2] Proof could be found [here](https://github.com/gggliuye/cvx_learning/blob/master/docs/SDP/handproofs/potential_reduction_3.pdf).

<a name="l5.3"></a>
## 5.3 Potential reduction method 2

The upper problem needs to solve two problem seperately to obtain $\delta x$ and $\delta Z$.
While we could choose to solve only the primal system, use $\delta x^{p}, \delta Z^{p}$ to update.
Which will have :

$$
  \psi(x^{(k+1)}, Z^{(k+1)}) \le \psi(x^{(k)}, Z^{(k)}) - 0.05
$$

We could also use the dual solutions only  $\delta x^{d}, \delta Z^{d}$ to update, which has :

$$
  \psi(x^{(k+1)}, Z^{(k+1)}) \le \psi(x^{(k)}, Z^{(k)}) - 0.05
$$

It has no significant convergence guaranteed, while it seems to perform better in practice than the first method.

<a name="l5.4"></a>
## 5.4 Potential reduction method 3

Nesterov and Todd proposed another variation which perserves the primal-dual symmetry yet avoids solving two systems
per iteration. In their method, primal and dual search directions are computed from:

$$
  RR^{T}\delta Z^{sym} RR^{T} + \sum_{i=1}^{m}\delta x^{sym}_{i}F_{i} = -\rho F + Z^{-1},
$$

$$
  Tr(F_{j}\delta Z^{sym}) = 0,j =1,...,m.
$$

See more details in the original paper. This method will have convergence:

$$
  \psi(x^{(k+1)}, Z^{(k+1)}) \le \psi(x^{(k)}, Z^{(k)}) - 0.24
$$

<a name="l5.5"></a>
## 5.5 Plane search

The potential function could be written as :

$$
  \begin{align}
  \psi(x+p\delta x, Z+q\delta Z) &= \psi(x,Z) + (n+v\sqrt{n})\log(1+c_{1}p+c_{2}q) \\
  & - \log\det(I+pF^{-1/2}\delta FF^{-1/2}) - \log\det(I+qZ^{-1/2}\delta ZZ^{-1/2})
  \end{align}
$$

Where $F=F(x)$, $\delta F = \sum_{i=1}^{m}\delta x_{i}F_{i}$, $c_{1} = \frac{c^{T}\delta x}{Tr(F(x)Z)}$,
and $c_{2} = \frac{Tr(F_{0}\delta Z)}{Tr(F(x)Z)}$. It could be simplified by eigenvalue decompositions and solve via standard methods.

<a name="l5.6"></a>
## 5.6 Numerical examples

* From the results shown in the paper, we coulde see the reduction in the duality gap, and the reduction of the derivation from analytic center.
* The number of iterations required grows much more slowly than $n^{1/2}$, and can also be assumed to be almost constant (as is shown in the result plots). **The typcial number of iteration used is 6-10** .
* The effort of each iteration depends on the matrix structure, and the matrix size.


<a name="l6"></a>
# 6. Phase I and Phase I-II methods

**Phase I** : find a strictly feasible starting point.

<a name="l6.1"></a>
## 6.1 Gig-M method

### 6.1.1 Case 1

**Case 1** : A strictly feasible x is known, but no strictly feasible Z.

Take a large enough M ,  to forme an additional constraint to the primal problem (without loss of generality):

$$
  \begin{align}
  minimize \quad & c^{T}x \\
  subject\ to \quad & F(x) \ge 0, \ Tr(F(x)) \le M.
  \end{align}
$$

The duality of this modified problem is :

$$
  \begin{align*}
  maximize\quad &-Tr(F_{0}(Z-\tau I))-M\tau \\
  subject\ to \quad &Tr(F_{i}(Z-\tau I)) = c_{i}, i=1,...m, \\
  & Z \ge 0, \ \tau \ge 0, \ Z^{T} = Z \in \mathbb{R}^{n\times n}
  \end{align*}
$$

We can easily find a strictly feasible point for this problem.
By firstly found any $U=U^{T}$ such that $Tr(F_{i}U)=c_{i}$ (which does not require U to be positive semidefine) .
Then we define $\tau^{(0)} > - \min \{\lambda_{min}(U), 0 \}$, along with $Z^{(0)} = U + \tau^{(0)}I$.
Which will assure Z to be positive-definite.
With this method we could easily get a starting point for x and Z.

The difficulty is the choice of M. We need to check if the constraint of M is activated at
the solution of the modified problem. Then choose to modify M.


### 6.1.2 Case 2

**Case 2** : A strictly feasible Z is known, but no strictly feasible x.

Adding the big-M term to the primal objective :

$$
  \begin{align}
  minimize \quad & c^{T}x + Mt\\
  subject\ to \quad & F(x)+tI \ge 0, \ t\ge 0.
  \end{align}
$$

Then choose any $x^{(0)}$, and take :

$$
  t^{(0)} > - \min\{\lambda_{min}(F(x^{(0)})), 0 \}
$$

The dual problem of it is :

$$
  \begin{align*}
  maximize\quad &-Tr(F_{0}Z) \\
  subject\ to \quad &Tr(F_{i}Z) = c_{i}, i=1,...m, \\
  & Tr(Z) + \tau = M \\
  & Z\ge 0, \ \tau \ge 0,
  \end{align*}
$$

Eliminate the slack variable $\tau$ :

$$
  \begin{align*}
  maximize\quad &-Tr(F_{0}Z) \\
  subject\ to \quad &Tr(F_{i}Z) = c_{i}, i=1,...m, \\
  & Tr(Z) \le M
  \end{align*}
$$

Which is the modified SDP dual problem by adding an upper bound on the trace of Z.

### 6.1.3 Case 3

**Case 3** : Neither a strictly feasible x nor a strictly feasible Z is known.

We will combine the two upper cases, to forme the modified primal problem as :

$$
  \begin{align}
  minimize \quad & c^{T}x + M_{1}t\\
  subject\ to \quad & F(x)+tI \ge 0, \ t\ge 0,\\
  & Tr(F(x)) \le M_{2}
  \end{align}
$$

And the dual become :

$$
  \begin{align*}
  maximize\quad &-Tr(F_{0}(Z-\tau I))-M_{2}\tau \\
  subject\ to \quad &Tr(F_{i}(Z-\tau I)) = c_{i}, i=1,...m, \\
  & Z \ge 0, \ \tau \ge 0, \\
  & Tr(Z) \le M_{1}.
  \end{align*}
$$

<a name="l6.2"></a>
## 6.2 Others

Other methods can start from a infeasible points and do not require big-M terms.
