---
layout: page_tree_math
title: 5. Constrained Convex Optimization
---
[Back To ADMM Home](../00index).

Consider the constrained convex optimization problems:

$$
  \begin{align*}
  & minimize \quad f(x) \\
  & subject \ to \quad x \in C
  \end{align*}
$$

with variable $x \in \mathbb{R}^{n}$, f and C are convex. This problem could be rewrite into :

$$
  \begin{align*}
  & minimize \quad f(x) + g(z) \\
  & subject \ to \quad x - z = 0
  \end{align*}
$$

Where g is the indicator function of set C.

The augmented lagrangian (using the scaled dual variable) is :

$$
  \mathbb{L}_{\rho}(x,z,u) = f(x) + g(z) + (\rho/2)\|x-z+u \|_{2}^{2}
$$

The scaled form ADMM updates are :

$$
  \begin{align*}
  &x^{k+1} := \arg\min_{c} (f(x) + (\rho/2)\|x-z^{k}+u^{k} \|_{2}^{2} ) \\
  &z^{k+1} := \Pi_{C}(x^{k+1} + u^{k}) \\
  &u^{k+1} := u^{k} + x^{k+1} - z^{k+1}
  \end{align*}
$$

With the primal residual and dual residual:

$$
  r^{k} = x^{k} - z^{k}, \quad s^{k} = - \rho(z^{k} - z^{k-1}).
$$

## 5.1 Quadratic Programming

Consider QP problem:

$$
  \begin{align*}
  &minimize \quad  (1/2)x^{T}Px + q^{T}x \\
  &subject\ to \quad Ax = b, \ x \ge 0
  \end{align*}
$$

We form the functions f and g :

$$
  f(x) = (1/2)x^{T}Px + q^{T}x, \quad \mathbf{dom}f = \{ x\mid Ax = b \}
$$

$$
  g(z) = I_{C}(z), \quad C = \{ x \| x \ge 0 \}
$$

Then the ADMM form of the problem is :

$$
  \begin{align*}
  &minimize \quad  f(x) + g(z) \\
  &subject\ to \quad x - z = 0
  \end{align*}
$$

The ADMM update will be :

$$
  \begin{align*}
  &x^{k+1} := \arg\min_{x\in \mathbf{dom}f}(f(x) + (\rho/2)\|x - z^{k} + u^{k} \|_{2}^{2})\\
  &z^{k+1} := \Pi_{C}(x^{k+1} + u^{k}) = (x^{k+1} + u^{k})_{+} \\
  &u^{k+1} := u^{k} + x^{k+1} - z^{k+1}
  \end{align*}
$$

The update of X could be reform into a linear equation with an addition dual variable, using the first order optimal condition:

$$
  \begin{bmatrix} P + \rho I  & A^{T}\\ A & 0 \end{bmatrix}
  \begin{bmatrix} x^{+} \\ \lambda \end{bmatrix} + \begin{bmatrix}q-\rho (z^{k}-u^{k}) \\ -b \end{bmatrix} = 0
$$

## 5.2 Test LP

Here we test the following LP problem:

$$
  \begin{align*}
  &minimize \quad c^{T}x \\
  &subject\ to \quad Ax = b , \ x \ge 0
  \end{align*}
$$

Using $x \in \mathbb{R}^{500}$ and with $A \in \mathbb{R}^{400\times 500}$, with 500 variables,
and 400 equality constraints.

[Code](http://stanford.edu/~boyd/papers/admm/linprog/linprog.html) and [Example](http://stanford.edu/~boyd/papers/admm/linprog/linprog_example.html).

We have the result of ADMM:

<div align="center">    
<img src="../images/lp_amdd_example.jpg" width="80%"/>
</div>

And the comparsion:

| method |  optimal value |  cpu time(s) |
|========|================|==============|
| CVX    |        371.09  |       1.73   |
|--------|----------------|--------------|
| ADMM   |        370.96  |   2.01       |
|--------|----------------|--------------|


## 5.3 Test QP

$$
  \begin{align*}
  &minimize \quad  (1/2)x^{T}Px + q^{T}x \\
  &subject\ to \quad Ax = b, \ x \ge 0
  \end{align*}
$$

Using $x \in \mathbb{R}^{500}$ and with $A \in \mathbb{R}^{400\times 500}$, with 500 variables,
and 400 equality constraints.

[Code](https://github.com/gggliuye/cvx_learning/blob/master/matlab/ADMM/quadprog.m) and [Example](https://github.com/gggliuye/cvx_learning/blob/master/matlab/ADMM/quadprog_example.m).

With x update of matlab :

```
  % x-update
  if k > 1
      tmp_b = [ rho*(z - u) - q; b ];
      tmp = U \ (L \ tmp_b);
      x = tmp(1:n);
  else
      tmp_A = [ P + rho*eye(n), A'; A, zeros(m) ];
      [L, U] = lu(tmp_A);
      tmp_b = [ rho*(z - u) - q; b ];
      tmp = U \ (L \ tmp_b);
      x = tmp(1:n);
  end
```

We have the result of ADMM:

<div align="center">    
<img src="../images/qp_example.jpg" width="80%"/>
</div>

And the comparsion:

| method |  optimal value |  cpu time(s) |
|========|================|==============|
| CVX    |        351.98  |    21.5182   |
| ADMM   |        348.82  |       0.166  |

## 5.4 Polyhedra Intersectio

Here we consider the problem to find the intersection of two polyhedra, which is to solve the follwoing feaibility problem:

$$
  \begin{align*}
  & find \quad x \\
  & subject \ to \quad A_{1}x \le b_{1}, \ A_{2}x \le b_{2}
  \end{align*}
$$

Which is equivalent to solve the following optimization problem:

$$
  \begin{align*}
  &minimize \quad I_{C_{1}}(x) + I_{C_{2}}(x) \\
  &where \quad C_{1} = \{ x \mid A_{1}x \le b_{1} \}, \ C_{2} = \{ x \mid A_{2}x \le b_{2} \}
  \end{align*}
$$

We can then reform it into ADMM expression:

$$
  \begin{align*}
  &minimize \quad I_{C_{1}}(x) + I_{C_{2}}(z) \\
  &subject\ to \quad x - z = 0
  \end{align*}
$$

Then we can have that the updates are :

$$
  \begin{align*}
  &x^{k+1} := \arg\min_{x} (I_{C_{1}}(x) + (\rho/2)\|x - z^{k} +u^{k}  \|_{2}^{2} ) \\
  &z^{k+1} := \arg\min_{z} (I_{C_{2}}(x) + (\rho/2)\|x^{k+1} - z +u^{k}  \|_{2}^{2} ) \\
  &u^{k+1} := u^{k} + x^{k+1} - z^{k+1}
  \end{align*}
$$

As we know the proximity operator of the indicator function is the projection operator, we have the updates:

$$
  \begin{align*}
  &x^{k+1} := \Pi_{C_{1}}(z^{k} - u^{k}) \\
  &z^{k+1} := \Pi_{C_{2}}(x^{k+1} + u^{k}) \\
  &u^{k+1} := u^{k} + x^{k+1} - z^{k+1}
  \end{align*}
$$

x update is to solve the following convex optimization problem:

$$
  \begin{align*}
  &minimize\quad x - (z^{k} - u^{k}) \\
  &subject\ to \quad A_{1}x \le b_{1}
  \end{align*}
$$

With matlab code using cvx:

```
  % use cvx to find point in first polyhedra
  cvx_begin quiet
      variable x(n)
      minimize (sum_square(x - (z - u)))
      subject to
          A1*x <= b1
  cvx_end
```

z update is to solve :

$$
  \begin{align*}
  &minimize\quad z - (x^{k+1} + u^{k}) \\
  &subject\ to \quad A_{2}z \le b_{2}
  \end{align*}
$$

With matlab code using cvx:

```
  % use cvx to find point in second polyhedra
  cvx_begin quiet
      variable z(n)
      minimize (sum_square(x - (z - u)))
      subject to
          A2*z <= b2
  cvx_end
```

We compare the ADMM method with the alternating projections algorithm, Result:

```
  ADMM : Elapsed time is 4.43757 seconds.
  Alternating projections : Elapsed time is 5.321952 seconds.
```

<div align="center">    
<img src="../images/polyhedra_intersection.jpg" width="95%"/>
</div>


[Back To ADMM Home](../00index).
