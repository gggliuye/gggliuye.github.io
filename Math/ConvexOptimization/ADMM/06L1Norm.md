---
layout: page_tree_math
title: 6. L1 Norm Problems
---

[Back To ADMM Home](../00index).

# Table of Contents

1. [Huber Fitting](#l6.1)
2. [Basis pursuit problem](#l6.2)
3. [L1 Regulaized Loss](#l6.3)
4. [Lasso](#l6.4)
5. [Sparse Inverse Covariance Selection](#l6.5)
6. [Total Variation Reconstruction](#l6.6)

<a name="l6.1"></a>
## 6.1 Huber Fitting

The huber fitting problem is to fit the data with huber loss (which is a loss more robust to outliers compared to l2 norm).
But as it get quadratic when getting closer to zero, it won't ouput a sparse result.

$$
  minimize \quad g^{hub}(Ax- b)
$$

Equivalent to the following problem:

$$
  \begin{align*}
  &minimize \quad g^{hub}(z) \\
  & subject\ to \quad Ax -b = z
  \end{align*}
$$

The corresponding ADMM updates are :

$$
  \begin{align*}
  &x^{k+1} = \arg\min_{x}( (1/\rho)\|Ax-b-z^{k} + u^{k}\|_{2}^{2}) = (A^{T}A)^{-1}A^{T}(b+z^{k}-u^{k}) \\
  &z^{k+1} = \arg\min_{z} (g^{hub}(z) + (1/\rho)\|Ax^{k+1}-b-z + u^{k}\|_{2}^{2}) = \mathbf{prox}_{1/\rho,g^{hub}}(Ax^{k+1}-b + u^{k}) \\
  &u^{k+1} = u^{k} + Ax^{k+1}-b-z^{k+1}
  \end{align*}
$$

Where the update of x is solving a least square problem. We will solve it using factorization:

```
  [L U] = factor(A);
  q = Atb + A'*(z - u);
  x = U \ (L \ q);
```

the update of z is a little more complicate. But we can solve it
exactly by considering the case $\|z\|<1$ and $\|z\|>1$, lead to the result:

$$
  z^{k+1} = \frac{\rho}{1+\rho}(Ax^{k+1}-b + u^{k}) + \frac{1}{1+\rho}S_{1+1/\rho}(Ax^{k+1}-b + u^{k})
$$

With matlab code:

```
  tmp = A*x - b + u;
  z = rho/(1 + rho)*tmp + 1/(1 + rho)*shrinkage(tmp, 1 + 1/rho);
```

**Result**:

[Code](<http://stanford.edu/~boyd/papers/admm/huber/huber_fit.html) and [Test Script](http://stanford.edu/~boyd/papers/admm/huber/huber_fit_example.html).

<div align="center">    
<img src="../images/huber_fit.jpg" width="80%"/>
</div>

<a name="l6.2"></a>
## 6.2 Basis pursuit problem

The problem is a l1 minizmization in a linear constrained set :

$$
  \begin{align*}
  &minimize \quad \|x\|_{1} \\
  &subject\ to \quad Ax = b
  \end{align*}
$$

With m < n, the problem is to find a sparse solution (sparsity corresponding to l1 norm), with
underdetermined system of linear equations.

Reform the problem with two functions : $$f(x) = \|x\|_{1}$$ and $$g(z) = I_{C}(z)$$.
g is the indicate function of the set C, where $$C = \{ z \| Az = b \}$$. And adding the consensus constraint $x= z$,
we will have the following equivalent problem:

$$
  \begin{align*}
  &minimize \quad \|z\|_{1} + I_{C}(x) \\
  &subject\ to \quad x = z
  \end{align*}
$$

Using the scaled ADMM udpates we have:

$$
  \begin{align*}
  &x^{k+1} = \arg\min_{x} (I_{C}(x) + (\rho/2)\|x-z^{k}+u^{k}\|^{2}_{2} ) = \mathbf{prox}_{1/\rho, I_{C}}(z^{k}-u^{k}) \\
  &z^{k+1} = \arg\min_{z} (\|z\|_{1} + (\rho/2)\|x^{k+1}-z+u^{k}\|^{2}_{2} ) = \mathbf{prox}_{1/\rho, l1}(x^{k} + u^{k})\\
  &u^{k+1} = u^{k} + x^{k+1} -z^{k+1}
  \end{align*}
$$

From the evaluation of proximal operators, we know the proximal operator of indicator function is equivalent to the projection operator.
And the proximal oprator of the l1 norm is a shrinkage funtion. As a result, we have the following updates:


$$
  \begin{align*}
  &x^{k+1} = \Pi_{c}(z^{k}-u^{k}) \\
  &z^{k+1} = S_{1/\rho}(x^{k} + u^{k})\\
  &u^{k+1} = u^{k} + x^{k+1} -z^{k+1}
  \end{align*}
$$

### 6.2.2 Updates

The shrinkage function is:

```
  function y = shrinkage(a, kappa)
      y = max(0, a-kappa) - max(0, -a-kappa);
  end
```

The projection into C is :

$$
  \Pi_{Ax=b}(x) = (I - A^{T}(AA^{T})^{-1}A)x + A^{T}(AA^{T})^{-1}b
$$

This solution could be found by solving the following problem (finding the projection of z into the set C):

$$
  \begin{align*}
  minimize \quad \|z-x\|_{2}^{2} \\
  subject\ to \quad Ax = b
  \end{align*}
$$

For the lagrangian:

$$
  \mathcal{L}(x, \lambda) = \|z-x\|_{2}^{2} + \lambda^{T}(Ax-b)
$$

The gradient with respect to x is zero:

$$
  \frac{\partial\mathcal{L}(x,\lambda)}{\partial x} = 2x - 2x + A^{T}\lambda = 0
$$

$$
  x^{*} = z - A^{T}\lambda/2
$$

So the dual function is :

$$
  g(\lambda) = - \|A^{T}\lambda/2\|_{2}^{2} + \lambda^{T}(Az-b)
$$

$$
  \frac{\partial g(\lambda)}{\partial \lambda} = (Az-b) - (AA^{T})\lambda/2 = 0
$$

$$
  \lambda = (AA^{T})^{-1}(Az-b)
$$

Subsititute into the equation $x^{*} = z - A^{T}\lambda/2$, we have:

$$
  x^{*} = (I - A^{T}(AA^{T})^{-1}A)z + A^{T}(AA^{T})^{-1}b
$$

### 6.2.3 x Relaxation

$$
  \hat{x}^{k+1} = \alpha x^{k+1} + (1-\alpha)*z^{k}
$$

$$
  \begin{align*}
  &z^{k+1} = S_{1/\rho}(\hat{x}^{k+1} + u^{k})  \\
  &u^{k+1} = u^{k} + \hat{x}^{k+1} -z^{k+1}
  \end{align*}
$$

However in the test, I found this relaxation did show positive effect.

### 6.2.4 Result

[Code](http://stanford.edu/~boyd/papers/admm/basis_pursuit/basis_pursuit.html) and [Test Script](http://stanford.edu/~boyd/papers/admm/basis_pursuit/basis_pursuit_example.html).

<div align="center">    
<img src="../images/basis_pursuit.jpg" width="80%"/>
</div>

<a name="l6.3"></a>
## 6.3 L1 Regulaized Loss

Having a l1 loss term for the variable, will produce sparity in the variable pattern.
The general problem is:

$$
  minimize \quad l(x) + \lambda\|x\|_{1}
$$

Transform into consensus form:

$$
  \begin{align*}
  &minimize \quad l(x) + \lambda\|z\|_{1} \\
  &subject \ to \quad x = z
  \end{align*}
$$

The ADMM updates are :

$$
  \begin{align*}
  &x^{k+1} = \arg\min_{x} (l(x) + (\rho/2)\|x-z^{k}+u^{k}\|_{2}^{2}) \\
  &z^{k+1} = S_{\lambda/\rho}(x^{k+1} + u^{k})  \\
  &u^{k+1} = u^{k} + \hat{x}^{k+1} -z^{k+1}
  \end{align*}
$$

### 6.3.1 Logistic function

$$
  Logistic(z) = \frac{L}{1+e^{-k*z}}
$$

Consider the linear system $Aw+bv=z$ and $x = [v,w]$

$$
  Logistic(x) = \frac{L}{1+e^{-Aw-bv}}
$$

$$
  maximize\ Logistic(x) = minimize\ \sum_{j}[\log(1+e^{-Aw-bv})]_{j}  = minimize\ \sum_{j}\log(1+e^{c_{j}x})
$$

The x update is a unconstrainted optimization problem:

$$
  minimize\quad f(x) =  \sum_{j}\log(1+e^{c_{j}x}) +  (\rho/2)\|x-z^{k}+u^{k}\|_{2}^{2})
$$

Which can be solved using Netwon's method:

$$
  f(x_{0}+ \delta x) \approx f(x_{0}) + \triangledown f(x_{0})\delta x + (1/2)\triangledown^{2}f(x_{0})\delta x^{2}
$$

Where:

$$
  \triangledown f(x) = \sum_{j} c_{j}^{T}e^{c_{j}x}\frac{1}{1+e^{c_{j}x}} + \rho(x - z^{k}+u^{k})
$$

$$
  \triangledown^{2}f(x) = \sum_{j} c_{j}^{T}c_{j} \frac{e^{c_{j}x}}{(1+e^{c_{j}x})^{2}} + \rho I
$$

The Newton's step will be:

$$
  \Delta x_{nt} = - (\triangledown^{2}f(x))^{-1}\triangledown f(x)
$$

We can also use LBFGs for solving it (when the amount of variables is huge), [Code](http://stanford.edu/~boyd/papers/admm/logreg-l1/distr_l1_logreg.html).

### 6.3.4 Result

[Code](http://stanford.edu/~boyd/papers/admm/logreg-l1/logreg.html) and [Test Script](http://stanford.edu/~boyd/papers/admm/logreg-l1/logreg_example.html).

<div align="center">    
<img src="../images/logreg.jpg" width="80%"/>
</div>

<a name="l6.4"></a>
## 6.4 Lasso

See in **Proximal Algorithms**  [pages](/Math/ConvexOptimization/ProximalAlgorithms/00index/).

Using LSQR we can handle huge problems.
Or in [Code](http://stanford.edu/~boyd/papers/admm/lasso/lasso_lsqr.html) and [Code using LSQR](http://stanford.edu/~boyd/papers/admm/lasso/lasso_lsqr.html).
see their results [here](http://stanford.edu/~boyd/papers/admm/lasso/lasso_example.html) and [here with LSQR](http://stanford.edu/~boyd/papers/admm/lasso/lasso_lsqr_example.html).

**The least squares (LSQR) algorithm** is an adaptation of the conjugate gradients (CG) method for rectangular matrices.
 Analytically, LSQR for Ax = b produces the same residuals as CG for the normal equations A'Ax = A'b,
 but LSQR possesses more favorable numeric properties and is thus generally more reliable. [LSQR](https://www.mathworks.com/help/matlab/ref/lsqr.html#mw_783f22d5-a612-4382-acb8-a4635fb42b52).

<a name="l6.5"></a>
## 6.5 Sparse Inverse Covariance Selection

Given a dataset consisting of samples from a zero mean Gaussian distribution in $\mathbf{R}^{n}$ :

$$
  a_{i} \sim \mathbb{N}(0, \Sigma), \quad i = 1, ...,N,
$$

Consider the task of estimating the covariance matrix under the prior assumption that $\Sigma^{-1}$ is sparse.
Since $(\Sigma^{-1})_{i,j} = 0$ means that the ith and jth components of the random variable are conditionally independent,
this problem is equivalent to the **structure learning** problem of estimating the topology of the undirected graphical model
representation of the Gaussian. It is also called the **covariance selection problem**.

For an example, in SLAM problem if we want to determine the corresponding relationship of the feature observations (determine whether
it is a match inlier or a outlier). We can apply the covariance selection problem upon the system's covariance.

If S is the empirical covariance matrix $(1/N)\sum_{i=1}^{N}a_{i}a_{i}^{T}$, then the estimation problem can be written as :

$$
  minimize \quad Tr(SX)- \log\det X + \lambda\|X\|_{1}
$$

With variable $X \in S_{+}^{n}$, where $\|\cdot\|_{1}$ is defined elementwise.

### 6.5.1 ADMM

The upper problem is equivalent to the following problem:

$$
  \begin{align*}
  &minimize \quad Tr(SX)- \log\det X + \lambda\|Z\|_{1}\\
  &subject \ to \quad X = Z
  \end{align*}
$$

The ADMM algorithm for sparse inverse covariance selection is :

$$
  \begin{align*}
  X^{k+1} &:= \arg\min_{X} (Tr(SX) - \log\det X + (\rho/2) \|X-Z^{k}+U^{k}\|_{F}^{2}) \\
  Z^{k+1} &:= \arg\min_{Z} (\lambda\|Z\|_{1} + (\rho/2) \|X^{k+1} - Z + U^{k}\|_{F}^{2}) \\
  U^{k+1} &:= U^{k} + X^{k+1} - Z^{k+1}
  \end{align*}
$$

### 6.5.2 Z update

All the calculation in Z update are done in element-wise, as a result the update of Z is a elementwise soft thresholding:

$$
  Z^{k+1}_{ij} := S_{\lambda/\rho}(X_{ij}^{k+1} + U_{ij}^{k})
$$

### 6.5.3 X update

X update could be further simplify using the following two properties:

$$
  \frac{\partial }{\partial X}\log\det X = X^{-1}, \quad \frac{\partial }{\partial X}Tr(SX) = S
$$

Proof of the first derivative:

$$
  \begin{align*}
  \log\det (X+\delta X) &= \log\det(X^{1/2}(I + X^{-1/2}\delta XX^{-1/2})X^{1/2}) \\
  &= \log\det (X^{1/2}X^{1/2}) + \log\det(I + X^{-1/2}\delta XX^{-1/2}) \\
  &= \log\det(X) + \sum_{i=1}^{n} \log(1+\lambda_{i}) \\
  & \approx \log\det X + \sum_{i=1}^{n}\lambda_{i} \\
  &=\log\det X + Tr(X^{-1/2}\delta XX^{-1/2}) \\
  &= \log\det X + Tr(X^{-1}\delta X)
  \end{align*}
$$

$$
  \triangledown \log\det X = \lim_{\delta X \to 0} \frac{Tr(X^{-1}\delta X)}{\delta X} = X^{-1}
$$

Using the upper gradient result, and using the first-order optimality condition is that the gradient should vanish:

$$
  S - X^{-1} + \rho(X-Z^{k}+U^{k}) = 0
$$

As $X \succ 0$, we can rewrite the equation and take the orthogonal eigen-value decomposition of the righthand side.

$$
  \rho X - X^{-1} = \rho(Z^{k} - U^{k}) - S = Q\Lambda Q^{T}
$$

Then we will have :

$$
  \rho\bar{X} - \bar{X}^{-1} = \Lambda
$$

Now we can construct a diagonal solution of this equation (as we only need a solution for ADMM update) :

$$
  \rho \bar{X}_{ii} - 1/\bar{X}_{ii} = \lambda_{i}
$$

$$
  \bar{X}_{ii} = \frac{\lambda_{i} + \sqrt{\lambda_{i}^{2} + 4\rho}}{2\rho}
$$

Which are always positive since $\rho > 0$. It shows that the computational effort of the X-update is that
of an eigenvalue decomposition of a symmetric matrix. Matlab code:

```
  % x-update
  [Q,L] = eig(rho*(Z - U) - S);
  es = diag(L);
  xi = (es + sqrt(es.^2 + 4*rho))./(2*rho);
  X = Q*diag(xi)*Q';
```

<a name="l6.6"></a>
## 6.6 Total Variation Reconstruction

Consider a total variation reconstruction of a 1d data(vector date).

$$
  minimize \frac{1}{2}\|x-b\|_{2}^{2} + \lambda \sum_{i = 0}^{n-1}\mid x_{i+1} - x_{i}\mid
$$

Construct a D matrix for the calculation of derivatives, we have the problem:

$$
  minimize \frac{1}{2}\|x-b\|_{2}^{2} + \lambda \mid Dx\mid_{F}
$$

The upper norm $\mid \mid_{F}$ means elementwised l1 sum. And apply the consensus form (ADMM):

$$
  \begin{align*}
  & minimize \ \frac{1}{2}\|x-b\|_{2}^{2} + \lambda \mid z\mid_{F} \\
  &subject\ to \ Dx = z
  \end{align*}
$$

Apply the ADMM updates :

$$
  \begin{align*}
  &x^{k+1} := \arg \min_{x} \frac{1}{2}\|x-b\|_{2}^{2}  + \frac{\rho}{2} \| Dx - (z^{k} - u^{k})  \|_{2}^{2} \\
  &z^{k+1}_{i} := \arg\min_{z_{i}} \mid z_{i}\mid + \frac{\rho}{2} \| (Dx^{k+1})_{i} - z_{i} + u^{k}_{i}  \|_{2}^{2} \\
  &u^{k+1} := u^{k} + Dx^{k+1} - z^{k+1}
  \end{align*}
$$

We can easily get the update of x using the first order optimal condition, result in the matlab code :

```
  x = (I + rho*DtD) \ (b + rho*D'*(z-u));
```

And the update of z :

```
  z = shrinkage(D*x + u, lambda/rho);
```

We will get the convergence result.

<div align="center">    
<img src="../images/tv_admm.jpg" width="80%"/>
</div>

We further compare the ADMM method with the CVX SDP method.

```
  cvx_begin quiet
      variable xtv(n,1);
      xtv_diff = xtv(2:end,1) - xtv(1:end-1,1); % x (horiz) differences
      minimize(norm(xtv_diff, 1) + gamma_l1*norm(xtv-b,2)); %tv roughness measure
  cvx_end
```

We saw that the CVX SDP method result highly depends on the parameter gamma_l1, while the ADMM results are much
more stable and fast.

<div align="center">    
<img src="../images/tv_plot.jpg" width="75%"/>
</div>

The running time results are :

| method |  cpu time(s) |
|========|==============|
| ADMM   |  0.009279    |
| CVX SDP|  0.319832    |

[Back To ADMM Home](../00index).
