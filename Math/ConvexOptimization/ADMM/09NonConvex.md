---
layout: page_tree_math
title: 9. Nonconvex Problem
---

[Back To ADMM Home](../00index).

In this case, ADMM is another local optimization method,
As it need not converge and need not converge to an optimal.

## 9.1 Nonconvex Constraints

$$
  \begin{align*}
  &minimize \quad f(x) \\
  &subject\ to \quad x\in \mathcal{S}
  \end{align*}
$$

Here ADMM has the form:

$$
  \begin{align*}
  &x^{k+1} := \arg\min_{x}(f(x) + (\rho/2)\| x - z^{k} + u^{k}  \|_{2}^{2}) \\
  &z^{k+1} := \Pi_{\mathcal{S}}(x^{k+1} + u^{k}) \\
  &u^{k+1} := u^{k} + x^{k+1} - z^{k+1}
  \end{align*}
$$

In general, the projection onto a nonconvex set is hard to compute, but it can be carried out exactly in some special cases:

* **Cardinality**. If :$$\mathcal{S} = \{ x\mid \mathbb{card}(x) \le c  \}$$ , then the projection keeps the c largest magnitude elements and zeros out the rest.
* **Rank**. If S is the set of matrices with rank c, then the projection could be carrying out by keep the top c singular values. i.e. :$$\Pi_{\mathcal{S}}(v) = \sum_{i=1}^{c} \sigma_{i}u_{i}v_{i}^{T}$$ .
* **Boolean constraints**. If :$$\mathcal{S} = \{ x\mid x_{i}\in \{ 0,1\}  \}$$, then the projection is simply rounding each entry to 0 or 1.

### 9.1.1 Regressor Selection

Consider the least square regressor selection or feature selection problem:

$$
  \begin{align*}
  &minimize \quad \|Ax -b \|_{2}^{2} \\
  &subject \ to \quad \mathbb{card}(x) \le c
  \end{align*}
$$

Each rows of A is a feature vector, and the corresponding b element is the observation. x is our linear model weight.
The cardinality constraint on x is to say that x only has c non-zero elements, i.e. the other feature columns are not used.
Which is then called a feature selection process.

In this case, the update of x is exactly the same as Lasso problems, and the z updates are keeping the c largest elements:

```
  function z = keep_largest(z, K)
      [val pos] = sort(abs(z), 'descend');
      z(pos(K+1:end)) = 0;
  end
```

The result of regressor selection will have exactly the cardinality of c. While we also have the l1 heuristic for solving cardinality problems,
for an example the lasso problem. In the l1 heuristic cases, the cardinality is controlled by the penalty weight :$$\lambda$$.
Compare the result of regressor selection and l1 heuristic:

<div align="center">    
<img src="../images/regressor_sel_l1.jpg" width="40%"/>
</div>

### 9.1.2 Factor Model Fitting

The goal is to approximate a symmetric matrix :$$\Sigma$$ (an expirical covariance matrix) as a sum of a rank-k matrix and a diagonal positive
semidefinite matrix. Using the Frobenius norm to measure the approximation error, we have :

$$
  \begin{align*}
  &minimize \quad (1/2)\|X + \mathbb{diag}(d) - \Sigma\|_{F}^{2} \\
  &subject\ to \quad X \ge 0, \ \mathbb{Rank}(X) = k, \ d \ge 0
  \end{align*}
$$

## 9.2 Bi-convex Problems

[Back To ADMM Home](../00index).
