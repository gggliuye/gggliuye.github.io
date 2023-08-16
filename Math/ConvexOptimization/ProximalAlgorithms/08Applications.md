---
layout: page_tree_math
title: 7. Applications
---

[Back To Proximal Algorithms Home](../00index).

# Table of Contents

1. [Lasso](#l7.1)
2. [Matrix decomposition](#l7.2)
3. [Multi-period portfolio optimization](#l7.3)
4. [Stochastic optimization](#l7.4)


We can always use the following Matlab code to calculate the proximal operator:

```
  function x = prox_f_cvx(v, lambda, f, A)
  % For testing purposes.
      [n T] = size(v);
      cvx_begin quiet
          variable x(n,T)
          minimize(f(x,A) + (1/(2*lambda))*square_pos(norm(x - v,'fro')))
          subject to
              x <= 1;
              x >= -1;
      cvx_end
  end
```

<a name="l7.1"></a>
## 7.1 Lasso

Lasso is short of **Least Absoluate Shrinkage and Selection Operator**. The problem is :

$$
  minimize \quad (1/2)\|Ax-b\|^{2}_{2} + \gamma \|x\|_{1}
$$

### 7.1.1 Proximal gradient method

It carries out variable selection (by the l1 heuristic), and model fitting (by the least square).
Consider the splitting :

$$
  f(x) = (1/2)\|Ax-b\|^{2}_{2} ,\quad g(x) = \gamma \|x\|_{1}
$$

With the gradient and proximal operator:

$$
  \Delta f(x) = A^{T}(Ax - b), \quad \mathbf{prox}_{g}(x) = S_{\gamma}(x) = (x - \gamma)_{+} - (-x -\gamma)_{+}
$$

The proximal gradient method will be :

$$
  \begin{align*}
  x^{k+1} &:= \mathbf{prox}_{\lambda^{k} g} (x^{k} - \lambda^{k} \Delta f(x^{k})) \\
  & = S_{\lambda^{k}\gamma}(x^{k} - \lambda^{k}A^{T}(Ax - b))
  \end{align*}
$$

The proximal gradient method is also called **ISTA** (iterative shrinkage-thresholding algorithm),
while the accelerated version is known as **FISTA** (fast ISTA), the fast version is basicly adding a momentum.
As the proximal gradient method can be interpreted as seperately optimize f and g.

* We can further accelerate the algorithm by parallex matrix-vector multiplication.
* Or even use the **Gram matrix** as mentioned in Chapter "Evaluating Proximal Operator".
* If we want solution for multiply $\gamma$, we can use the solution of the largest $\gamma$ as warm starting.

### 7.1.2 ADMM


f is quadratic function, we can use the tricks as before:

* Reuse of factorization.
* Warm start with previous gradient, if use an iterative method.
* if n much smaller, we can precompute the Gram matrix.

$$
  \begin{align*}
  &x^{k+1} := (A^{T}A + (1/\lambda))^{-1}(A^{T}b + (1/\lambda)(z^{k} - u^{k}) ) \\
  &z^{k+1} := S_{\lambda^{k}\gamma}(x^{k+1} + u^{k})\\
  &u^{k+1} := u^{k} + x^{k+1} - z^{k+1}
  \end{align*}
$$

### 7.1.3 Test

Here we should pay attention to the update of x. With $A\in \mathbb{R}^{m \times n}$, if m larger than n,
we should use the expression upper. While in the case when m is smaller than n, we can reform the process
to accelerate:

$$
  (A^{T}A + (1/\lambda))x = A^{T}b + (1/\lambda)(z^{k} - u^{k}) \triangleq q
$$

$$
  A(A^{T}A + (1/\lambda))x = Aq
$$

$$
  (AA^{T}A + A(1/\lambda))x = Aq
$$

$$
  (AA^{T} + (1/\lambda))Ax = Aq
$$

$$
  A^{T}Ax = A^{T}(AA^{T} + (1/\lambda))^{-1}Aq \triangleq p
$$

Using this in the original equation we have:

$$
  (A^{T}A + (1/\lambda))x = q
$$

$$
  p + (1/\lambda)x = q
$$

$$
  x = \lambda (q - p)
$$

we will have the corresponding code in matlab as :

```
   L = chol(speye(m) + lambda*(A*A'), 'lower');
   L = sparse(L); U = sparse(L');
   q = Atb + rho*(z - u);
   x = lambda*(q - lambda*(A'*(U \ ( L \ (A*q) ))));
```

The original codes could be found [here](http://stanford.edu/~boyd/papers/prox_algs/lasso.html), or in
[my github page](https://github.com/gggliuye/cvx_learning). The result run times are :

* CVX time elapsed: 25.06 seconds.
* Proximal gradient time elapsed: 0.35 seconds.
* Fast prox gradient time elapsed: 0.17 seconds.
* ADMM time elapsed: 0.04 seconds.

<div align="center">    
<img src="../images/lasso.jpg" width="50%"/>
</div>


<a name="l7.2"></a>
## 7.2 Matrix decomposition

The problem is to decompose matrix A into a sum of components $X_{i}$

$$
  \begin{align*}
  &minimize \quad \phi_{1}(X_{1}) + \gamma_{2}\phi_{2}(X_{2}) + \cdot\cdot\cdot + \gamma_{N}\phi_{N}(X_{N}) \\
  &subject\quad to\quad X_{1} + X_{2} + \cdot\cdot\cdot + X_{N} = A
  \end{align*}
$$

The function $\phi(X)$ can usually be seen as 'penalties', to drive $X_{i}$ to have our objective properties.

* **Squared Frobenius norm**: $$\phi(X) = \|X\|_{F}^{2} = \sum_{i,j}X_{i,j}^{2}$$, to encourage X to be small.
* **Entrywise l1 norm**: $$\phi(X) = \|X\|_{1} = \sum_{i,j}\mid X_{i,j}\mid$$, to encourage X to be sparse.
* **Sum-column-norm**: $$\phi(X) = \sum_{j}\|x_{j}\|_{2}$$, to encourage column sparsity. (can be interpreted as group lasso regulization)
* **Elementwise constraints**: $X_{i,j}\in C_{i,j}$, for instant, we want to fixed some entries (fixed sparse pattern).
* **Separable convex function**: $\phi(X) = \sum_{i=1}^{m}\sum_{j=1}^{n}\phi_{i,j}(X_{i,j})$. For instant, constrain the subblock of the matrix.
* **Semidefinite cone constraint**: $X \succeq 0$.
* **Nuclear norm**: $\phi(X) = \|X\|_{*} = tr(X^{T}X)$, encourage X to be low rank.

For an example, take $\phi_{1}$ be the Squred Frobenius norm,$\phi_{2}$ be the entrywise l1 norm, $\phi_{3}$
be the Nuclear norm, the problem can be reformed into:

$$
  minimize \quad \|A-(X_{2} + X_{3})\|_{F}^{2} + \gamma_{2}\|X_{2}\|_{1} + \gamma_{3}\|X_{3}\|_{*}
$$

So we will decompose A into a sum of a small matrix $X_{1}$, a sparse matrix $X_{2}$, and a low rank matrix $X_{3}$.


### 7.2.1 ADMM

Consider the splitting:

$$
  f(X) = \sum_{i = 1}^{N}\phi_{i}(X_{i}), \quad g(X)= I_{\mathcal{C}}(X)
$$

where $X = (X_{1}, ..., X_{N})$, and :

$$
  \mathcal{C} = \left\{ (X_{1},...,X_{N}) \mid \sum_{i=1}^{N}X_{i} = A \right\}
$$

f is to evulate the objective function, and g is to project onto $\mathcal{C}$: the feasible set.
The projection is fairly simple, which is similar to a translation of centroid:

$$
  \Pi_{\mathcal{C}}(X) = X - \bar X + (1/N)A
$$

So the final algorithms looks as follows:

$$
  \begin{align*}
  &X_{i}^{k+1} := \mathbf{prox}_{\lambda \phi_{i}}(X_{i}^{k} - \bar X^{k} + (1/N)A - U^{k}) \\
  &U^{k+1} := U^{k} + \bar X^{k+1} - (1/N)A
  \end{align*}
$$

### 7.2.2 Test

Take the former example : $\phi_{1}$ be the Squred Frobenius norm,$\phi_{2}$ be the entrywise l1 norm, $\phi_{3}$
be the Nuclear norm. Note $B=\bar X^{k} - (1/N)A + U^{k}$ So our updates of X is:

$$
  \begin{align*}
  &X_{1} = \mathbf{prox}_{\lambda L2}(X_{1}-B) = \frac{1}{1+\lambda}(X_{1} -B) \\
  &X_{2} = \mathbf{prox}_{\lambda L1}(X_{2}-B) = S_{\gamma_{2} \lambda}(X_{2} -B) \\
  &X_{3} = \mathbf{prox}_{\lambda Nuclear}(X_{3}-B) = U \mathbf{diag}(\mathbf{prox}_{\lambda f}(\sigma_{s}(X_{3}-B)))V^{T}
  \end{align*}
$$

Corresponding codes are:

```
  X_1 = (1/(1+lambda))*(X_1 - B);
  X_2 = prox_l1(X_2 - B, lambda*g2);
  X_3 = prox_matrix(X_3 - B, lambda*g3, @prox_l1);
```

where prox_matrix is defined as :

```
  function [ Vout ] = prox_matrix(X, eta, prox_l1)
    [U,S,V] = svd(X);    %  X= U*S*V'
    Spos = prox_l1(S, eta);
    Vout = U * Spos * V';
  end
```

We get the output :

```
  CVX (vs true):
  |V| = 0.31;  |X_1| = 26.23
  nnz(S) = 49; nnz(X_2) = 53
  rank(L) = 4; rank(X_3) = 4

  ADMM (vs true):
  |V| = 0.31;  |X_1| = 26.18
  nnz(S) = 49; nnz(X_2) = 52
  rank(L) = 4; rank(X_3) = 4

  ADMM vs CVX solutions (in Frobenius norm):
  X_1: 3.59e-01; X_2: 6.15e-01; X_3: 5.30e-01
```

<a name="l7.3"></a>
## 7.3 Multi-period portfolio optimization


Optimize the sum of a risk-adjusted negative return f and a transaction cost g, for a period of portfolio investment.

$$
  minimize \quad \sum_{t=1}^{T}f_{t}(x_{t}) + \sum_{t=1}^{T}g_{t}(x_{t} - x_{t-1})
$$

With the constraints that indicate any short position (x>0), and limit the sum o f liquid.

$$
  x_{t} \ge 0, \quad \sum_{i=1}^{N} x_{t,i} \le 1
$$

Assume that $f_{t}$ and $g_{t}$ are closed proper convex and that $f_{t}$ are fully separable, i.e.
the transaction cost in any period is the sum of the transaction costs for each asset. Let $X = [x_{1},...,x_{T}] \in \mathbb{R}^{n \times T}$
donate the matrix of the portfoilo sequence.

Consider the splitting:

$$
  f(X) = \sum_{t=1}^{T}f_{t}(x_{t}) \quad g(X) = \sum_{t=1}^{T}g_{t}(x_{t} - x_{t-1})
$$

**Where f is separable across the columns of X and g is separable across the rows of X.**

Recall the update formula of ADMM :

$$
  \begin{align*}
  &x^{k+1}:=\mathbf{prox}_{\lambda f}(z^{k} - u^{k}) \\
  &z^{k+1}:=\mathbf{prox}_{\lambda g}(x^{k+1} + u^{k}) \\
  &u^{k+1} := u^{k} + x^{k+1} - z^{k+1}
  \end{align*}
$$

The update of each column of x will be solved using a CVX solver:

$$
  \begin{align*}
  &minimize \quad f_{t}(x_{t}) + (1/2\lambda)\|x_{t} - z^{k} + u^{k}\|^{2}_{2}\\
  & subject\ to \quad x_{t}\ge 0, \quad \sum_{i=1}^{N} x_{t,i} \le 1
  \end{align*}
$$

The update of each rows of z will be solving the following problem:

$$
  \begin{align*}
  &minimize \quad \sum_{t=1}^{N} g_{t,i}(z_{t,i}- z_{t-1,i}) + (1/2\lambda)\|z_{t,i} - x^{k+1} - u^{k}\|_{2}^{2} \\
  & subject\ to \quad z_{1} = 0
  \end{align*}
$$

Code could be found in [Stanford page](http://stanford.edu/~boyd/papers/prox_algs/finance.html), or in [my github](https://github.com/gggliuye/cvx_learning). The following image shows the time series of asset holdings.

<div align="center">    
<img src="../images/fin_asset_holdings.png" width="50%"/>
</div>

In this case, ADMM method converges to the same optimal point as CVX solver, however it is much slower.

<a name="l7.4"></a>
## 7.4 Stochastic optimization

Optimize the stochastic optimization, with $\pi$ be a probability distribution, and $f_{(k)}$ is the closed
proper convex objective function for scenario k.

$$
  minimize \quad \mathcal{E}(f(x)) = \sum_{k = 1}^{K} \pi_{k}f^{(k)}(x)
$$

Reform the problem into consensus form by introducing a consensus constraint.

$$
  \begin{align*}
  & minimize \quad \mathcal{E}(f(x)) = \sum_{k = 1}^{K} \pi_{k}f^{(k)}(x^{(k)}) \\
  & subject \ to \quad x^{(1)} = \cdot\cdot\cdot = x^{(K)}
  \end{align*}
$$

To use ADMM method, the function f take the form of the upper objective function, while g
take the form of a pojection onto the feasible set, by take the average of the local solutions
$x^{(k)}$.


Example code could be found [here](http://stanford.edu/~boyd/papers/prox_algs/control.html).
ADMM and CVX method solved in similar amount of time, while we should notice that in ADMM, the updates
of variables could be processed in parallex.

[Back To Proximal Algorithms Home](../00index).
