---
layout: page_tree_math
title: Douglas-Rachford Splitting Algorithm
---

[Back To Paper Read Home](../00index).

# Table of Contents

1. [Splitting algorithms](#l1)
2. [Monotonicity](#l2)
    1. [Proximal Algorithm](#l2.1)
    2. [DRS](#l2.2)
    3. [Splitting Operator S](#l2.3)
    4. [ADMM](#l2.4)
    5. [ECE236C](#l2.5)

Description from the paper [A first-order primal-dual algorithm for convex problems with applications to imaging](https://link.springer.com/article/10.1007/s10851-010-0251-1) :
Computing the solution of a convex optimization problem is equivalent to the problem of finding zeros of maximal operator T associated
with the subgradient of the optimization problem. And *The proximal point algorithm is probably the most fundamental algorithm
for finding zeros of T* . It is written as the recursion :

$$
  w^{n+1} = (I+\tau^{n}T)^{-1}(w^{n})
$$

where $\tau^{n} >0$ is are the steps. Unfortunately, in most interesting cases $(I+\tau^{n}T)^{-1}$ is hard to
evaluate and hence the partical interest of the proximal algorithm is limited.

If the operator T can be split up into a sum of two maximal monotone operators A and B such that T = A+B and $(I+\tau A)^{-1}$
and $(I+\tau B)^{-1}$ are easiser to evaluate thane $(I+\tau T)^{-1}$, then one can devise algorithms which only
need to evaluate the resolvent operators with respect to A and B. DRS(Douglas-Rachford Splitting) is one of the algorithms focus it,
which is known to be a special case of the prximal point algorithm.

<a name="l1"></a>
# 1. Splitting algorithms

From paper [Splitting algorithms for the sum of two nonlinear operators](https://www.researchgate.net/publication/243654261_Mercier_B_Splitting_algorithms_for_the_sum_of_two_nonlinear_operators_SIAM_J_Numer_Anal_166_964-979)

For solving the stationary equation (optimal condition), where C is a multivalued(set-valued) monotone opeartor on Hilbert space H:

$$
  0\in C(u^{*})
$$

**Splitting Algorithm** : consider the case of splitting the operator C, that C = A+B, and A , B are maximal monotone.
(standard methods for the 1979) :


**Forward-Backward Algorithm** :

$$
  u^{n+1} := (I+\lambda A)^{-1}(I-\lambda B)u^{n}
$$

It is not unconditionally stable [1]_ , but convergent if $\lambda$ sufficiently small, and B is Lipschitz continuous.

The corresponding updates algorithm :

$$
  \begin{cases}
  \frac{u^{n+1/2}- u^{n}}{\lambda} + Bu^{n} = 0\\
  \frac{u^{n+1}-u^{n+1/2}}{\lambda} + Au^{n+1} = 0
  \end{cases}
$$

**Double-Backward Algorithm** :

$$
  u^{n+1} := (I+\lambda A)^{-1}(I+\lambda B)^{-1}u^{n}
$$

It is unconditionally stable, but doesn't convergence except with some special modification.

**Assumption** : assume the stationary problem $0\in C(u^{*})$ has at least one solution. Hence :

$$
  there\ exist\ u\in H, a\in A(u), b\in B(u)\quad such\ that\ a+b=0
$$


**Notation** :

$$
  v = (I + \lambda B)(u) = J_{B}^{\lambda} (u)
$$

.. [1] unconditionally stable : $u^{n}$ remains bounded independently of n for any $\lambda$.

<a name="l1.1"></a>
## 1.1 Peaceman-Rachford

$$
  u^{n+1} := (I+\lambda B)^{-1}(I-\lambda A)(I+\lambda A)^{-1}(I-\lambda B)u^{n}
$$

The algorithm is :

$$
  v^{n+1} := (2J_{A}^{\lambda} - I)(2J_{B}^{\lambda}-I)v^{n}
$$

**Convergence** : If B is single valued and satisfies the following property : For all $x_{n},x\in D(B)$ such
that $Bx_{n}$ is bounded, and $x_{n}\to \bar{x}$ weakly, and

$$
  (Bx_{n}-Bx, x_{n}-x)\to 0, \quad as n\to \infty
$$

then one has $x=\bar{x}$; then $u^{n}$ converges weakly to u, solution of $0\in C(u^{*})$, which is unique.

<a name="l1.2"></a>
## 1.2 Douglas-Rachford

The convergence for this algorithm occurs for more general operators A and B than the previous algorithm.

$$
  u^{n+1} := (I+\lambda B)^{-1}[(I+\lambda A)^{-1}(I-\lambda B) +\lambda B]u^{n}
$$

The algorithm is :

$$
  v^{n+1} := J_{A}^{\lambda}(2J_{B}^{\lambda} - I)v^{n} + (I - J_{B}^{\lambda})v^{n}
$$

**Convergence** Assume that $J_{B}^{\lambda}$ is weakly closed, then under the previous Assumption, $u^{n}$ converges
weakly to a solution $u=J_{B}^{\lambda}v$ of  $0\in C(u^{*})$. (If $J_{A}^{\lambda}$ is compact, then the convergence is strong.)

**General case** : in the general case, the algorithm is "almost convergent".

<a name="l1.3"></a>
## 1.3 Applications to evolution equations

See the original paper.

<a name="l2"></a>
# 2. Monotonicity

<a name="l2.1"></a>
## 2.1 Proximal Algorithm

paper [On the Douglas-Rachford splitting method and the proximal point algorithm for maximal monotone operators](https://link.springer.com/article/10.1007/BF01581204).

**Monotone** : [monotone page](https://cvx-learning.readthedocs.io/en/latest/ProximalAlgorithms/Monotone.html)
*Important theorem* :  An operator T on H is monotone if and only if its resolvent $J_{cT} = (I+ cT)^{-1}$ is
firmly nonexpansive.

**Recall Proximal Algorithm** :

$$
  \bar{x} = \mathbb{prox}_{\lambda, f} (v) = \arg\min_{x} f(x) + \frac{1}{2\lambda}\|x-v\|_{2}
$$

The optimal condition for $\bar{x}$ is :

$$
  0\in \frac{\partial}{\partial x}\mid_{\bar{x}} = \partial f(\bar{x}) + \frac{1}{\lambda}(\bar{x} - v)
$$

$$
  v\in (I+\lambda\partial f)\bar{x}
$$

$$
  \bar{x} = (I + \lambda \partial f)^{-1}(v)
$$

Where $(I + \lambda \partial f)^{-1}$ is the resolvent operator, the proximal algorithm is to find the fixed point of the resolvent.
And for the fixed point, we have :

$$
  v\in (I+\lambda\partial f)v
$$

$$
  0\in \partial f
$$

which is exactly the optimal condition for optimizing an objective function f.

**Generalized Proximal Algorithm** : $u^{n+1}:=J_{T}^{\lambda}(u^{n})$

$$
  u^{n+1} := (1-\rho_{n})u^{n} + \rho_{n}J_{T}^{\lambda}(u^{n})
$$

<a name="l2.2"></a>
## 2.2 DRS

This article *broden the analysis by exploiting the connection between firm nonexpansiveness and maximal monotonicity*.

*Recall the Douglas-Rachford splitiing algorithm* $v^{n+1}= G_{A,B}^{\lambda}(v^{n})$ , where :

$$
  G_{A,B}^{\lambda} = J_{A}^{\lambda}(2J_{B}^{\lambda} - I) + (I - J_{B}^{\lambda})
$$

Using the *Corollary 2.3* from [Monotone](https://cvx-learning.readthedocs.io/en/latest/ProximalAlgorithms/Monotone.html) .
Which is actually the expression using the notation of the paper in the previous chaper (u, v).

$$
  \begin{cases}
  (I - J_{B}^{\lambda})v^{n} = \lambda Bu^{n} = \lambda b^{n}\\
  (2J_{B}^{\lambda} - I )v^{n} = u^{n} - \lambda b^{n} \\
  J_{A}^{\lambda}(y^{n}) = J_{A}^{\lambda}(w^{n} + \lambda a^{n}) = w^{k}
  \end{cases}
$$

The algorithm process is (note $v^{n} = (I+\lambda B)u^{n}$):

* 1. from the last step, we have $u^{n}$ and $$\lambda b^{n} = \lambda Bu^{n}$$.
* 2. find $w^{n+1}$, such that $$J_{A}^{\lambda, -1} w^{n+1} =u^{n} - \lambda b^{n}$$ (equivalent to $$w^{n+1}+\lambda A w^{n+1} = u^{n} - \lambda Bu^{n}$$). note $$Aw^{n}=a^{n}$$
* 3. find $n^{n+1}$, such that $$J_{B}^{\lambda, -1}u^{n+1}=w^{n+1} + \lambda Bu^{n}$$ (equivalent to $$u^{n+1}+\lambda Bu^{n+1} = w^{n+1} + \lambda Bu^{n}$$)

The algorithm could be expressed as :

$$
  G_{A,B}^{\lambda} = \{(u+\lambda b, w+\lambda b) \mid (u,b)\in B, (w,a)\in A, v+\lambda a = w-\lambda b \}
$$

<a name="l2.3"></a>
## 2.3 Splitting Operator S

Consider the operator S the splitting operator of A and B with respect to $\lambda$ :

$$
  S_{A,B}^{\lambda} = (G_{A,B}^{\lambda})^{-1} - 1
$$

It could be expressed as :

$$
  S_{A,B}^{\lambda} = \{(w+\lambda b, u-w) \mid (u,b)\in B, (w,a)\in A, w+\lambda a = u-\lambda b \}
$$

**Theorem** If A and B are (maximal) monotone then A is (maximal) monotone.

**Theorem** The Douglas-Rachford iteration is equivalent to applying the proximal point algorithm to the maximal monotone
operator A, with the proximal point stepsize fixed at 1, and exact evaluation of resolvents.

$$
  v^{n+1}= G_{A,B}^{\lambda}(v^{n}) = (I + S_{A,B}^{\lambda})^{-1}(v^{n})
$$

<a name="l2.4"></a>
## 2.4 ADMM

[ADMM](/Math/ConvexOptimization/ADMM/00index/)

Considering the problem :

$$
  minimize_{x\in \mathcal{R}^{n}} \quad f(x) + g(Mx)
$$

$$
  \begin{align*}
  &minimize_{x\in \mathcal{R}^{n}} \quad f(x) + g(w) \\
  &subject\ to \quad Mx = w
  \end{align*}
$$

$$
  maximize_{p\in \mathcal{R}^{m}} \quad -(f^{*}(-M^{T}p) + g^{*}(r))
$$

Let :

$$
  \begin{cases}
  A = \partial[f^{*}(-M^{T})] \\
  B = \partial g^{*}
  \end{cases}
$$

Then apply Douglas-Rachford splitting to A and B, yield the ADMM(alternating direction method of multipliers) , shown
by Babay in [Applications of the method of multipliers to variational inequalities](https://www.researchgate.net/publication/304533564_Applications_of_the_method_of_multipliers_to_variational_inequalities) .

<a name="l2.5"></a>
## 2.5 ECE236C

see [ECE236C](http://www.seas.ucla.edu/~vandenbe/236C/) for a more detail description of the realization of [DRS](http://www.seas.ucla.edu/~vandenbe/236C/lectures/dr.pdf) algorithm.

<div align="center">    
<img src="../images/DRS.PNG" width="70%"/>
</div>

* DR iteration as fixed-points iteration.
* DRS is not invariant with respect to scaling (so we need adpating the scaling variable : $\lambda$ in the previous chapters).

<div align="center">    
<img src="../images/DRS_scaling.PNG" width="70%"/>
</div>

* With relaxation

<div align="center">    
<img src="../images/DRS_relax.PNG" width="70%"/>
</div>

* Primal-dual formulation

<div align="center">    
<img src="../images/DRS_primal_dual.PNG" width="70%"/>
</div>

* Apply DRS upon the dual problem, will give ADMM.
* Convergence proof.

[Back To Paper Read Home](../00index).
