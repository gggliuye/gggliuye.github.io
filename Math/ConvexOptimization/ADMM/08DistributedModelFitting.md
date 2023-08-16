---
layout: page_tree_math
title: 8. Distributed Model Fitting
---

[Back To ADMM Home](../00index).

It to find a model best fit the measurements. It normally has a observation error term ('l' for loss), and a regularization term (r).
l and r are chosen to be convex.
As the following shows a problem to fit a linear model:

$$
  minimize \quad l(Ax - b) + r(x)
$$

Assume l is additive:

$$
  l(Ax-b) = \sum_{i=1}^{m}l_{i}(a_{i}^{T}x - b_{i})
$$

$l_{i}$ is the loss of ith training example. $a_{i}$ is the feature vector of example i (the ith system input), and
$b_{i}$ is the ouput(response) of the example i (the ith observation).

* r choose l2 : $r(x) = \lambda\|x\|_{2}^{2}$, is the tikhonov regularization or a ridge penalty.
* r choose l1 : $r(x) = \lambda\|x\|_{1}$ is a lasso penalty.
* In some case, part of the parameters should not be regularized (e.g. offset parameters).

* Split across training examples.
* Split across features.

## 8.1 Examples


* Regression
* Classification
* Image segmentation, denoise, decomposition.


## 8.2 Splitting across examples

**Large amount of relatively low-dimensional data**. Goal: solve in a distributed way.
Partition A and b (example inputs and measurements):

$$
  A = \begin{bmatrix} A_{1} \\ : \\ A_{N} \end{bmatrix}, \quad b = \begin{bmatrix} b_{1} \\ : \\ b_{N} \end{bmatrix},
$$

The problem will be :

$$
  minimize \quad \sum_{i=1}^{N}l_{i}(A_{i}x - b_{i}) + r(x)
$$

Reform the problem into **consensus form** to enable distributed calculation (turn into a standard ADMM type of problem):

$$
  \begin{align*}
  &minimize \quad \sum_{i=1}^{N}l_{i}(A_{i}x_{i} - b_{i}) + r(z) \\
  & subject\ to \quad x_{i}-z = 0, \ i = 1,..., N
  \end{align*}
$$

Using the scaled form of ADMM updates (see 7.3 sharing problems for more details):

$$
  \begin{align*}
  & x_{i}^{k+1} := \arg\min_{x_{i}} (l_{i}(A_{i}x_{i} - b_{i}) + (\rho/2)\|x_{i} - z^{k} + u_{i}^{k} \|_{2}^{2}) \\
  & z^{k+1} := \arg\min_{z} (r(z) + (N\rho/2)\|\bar{x}^{k+1} - z + \bar{u}^{k} \|_{2}^{2}) \\
  & u_{i}^{k+1} := u_{i}^{k} + x_{i}^{k+1} - z^{k+1}
  \end{align*}
$$

* Lasso
* Sparse Logistic Regression
* Support Vector Machine

### 8.2.1 Group Lasso

For Lasso have the function f being squared l2 norm, and r being the l1 norm. Then the ADMM udpates are:

$$
  \begin{align*}
  &x_{i}^{k+1} := \arg\min_{x_{i}} ((1/2)\|A_{i}x_{i} -b_{i}\|_{2}^{2} + (\rho/2)\|x_{i}-z^{k}+u_{i}^{k}\|_{2}^{2}) \\
  &z^{k+1}:= S_{\lambda/\rho N}(\bar{x}^{k+1} + \bar{u}^{k}) \\
  &u^{k+1}_{i} := u_{i}^{k} + x_{i}^{k+1} - z^{k+1}
  \end{align*}
$$

See [here](https://cvx-learning.readthedocs.io/en/latest/ProximalAlgorithms/Applications.html#lasso) for some details about the update of x.
The difference from the [serial version](https://cvx-learning.readthedocs.io/en/latest/ADMM/L1Norm.html#lasso) is that :

* The update of different group of variables $x_{i}$ could be carry out in parallel.
* The collection and averaging steps.

### 8.2.2 Distributed l_1-regularized logistic regression

Could be compared with the [serial version](https://cvx-learning.readthedocs.io/en/latest/ADMM/L1Norm.html#l1-regulaized-loss).
Could be seen [function](http://stanford.edu/~boyd/papers/admm/logreg-l1/distr_l1_logreg.html) and
[Script](http://stanford.edu/~boyd/papers/admm/logreg-l1/distr_l1_logreg_example.html) using L-BFGS for distributed calculations.

### 8.2.3 Support Vector Machine

Here we model a linear support vector machine problem, which is a linear model fitting problem.
Which is to find a best linear model applied to feature variables x ($w^{T}x_{j} + b$) to best fit the observation y ($y_{j}$), where y is a binary variable.

Which is to say, if the observation $y_{j}$ is 1, we want $w^{T}x_{j} + b \to 1$
and if the observation $y_{j}$ is -1, we want $w^{T}x_{j} + b \to -1$.
Which is a optimization problem :

$$
  minimize \quad \sum_{j=1}^{M} (1-y_{j}(w^{T}x_{j}+b))
$$

In partice, we can truncate the results of the model to 1 or -1, so the problem will be better if we optimize this:

$$
  minimize \quad \sum_{j=1}^{M} (1-y_{j}(w^{T}x_{j}+b))_{+}
$$

Where we have M obervations in total. The problem is equivalent to :

$$
  minimize \quad \sum_{j=1}^{M}(1 + \begin{bmatrix} -y_{j}x_{j}^{T} & -y_{j} \end{bmatrix}
  \begin{bmatrix} w \\ b \end{bmatrix})_{+}
$$

By forming :

$$
  A = \begin{bmatrix} -y_{1}x_{1}^{T} & -y_{1} \\ : & :\\ -y_{M}x_{M}^{T} & -y_{M} \end{bmatrix}, \quad
  x = \begin{bmatrix} w \\ b \end{bmatrix},
$$

We have the reformed problem:

$$
  minimize \quad (Ax + \mathbb{1})_{+}
$$

Adding the regularization term of the linear model weights w:

$$
  minimize \quad (Ax + \mathbb{1})_{+} + (1/2\lambda)\|w\|_{2}^{2}
$$

If we apply the distributed model where i indicates a sub-set of samples, we have :

$$
  minimize \quad \sum_{i=1}^{N}(A_{i}x + \mathbb{1})_{+} + (1/2\lambda)\|w\|_{2}^{2}
$$

Applying the consensus variable z :

$$
  \begin{align*}
  &minimize \quad \sum_{i=1}^{N}(A_{i}x_{i} + \mathbb{1})_{+} + (1/2\lambda)\|w\|_{2}^{2} \\
  &subject\ to \quad x_{i} = z
  \end{align*}
$$

We further simplify the problem with a small adjustment in the regularization term : instead of
regularize w we will regularize z directly. Then we will have the problem:

$$
  \begin{align*}
  &minimize \quad \mathbb{1}^{T}(A_{i}x_{i} + \mathbb{1})_{+} + (1/2\lambda)\|z\|_{2}^{2} \\
  &subject\ to \quad x_{i} = z
  \end{align*}
$$

The corresponding ADMM updates are :

$$
  \begin{align*}
  &x^{k+1}_{i} := \arg\min_{x_{i}} (\mathbb{1}^{T}(A_{i}x_{i} + \mathbb{1})_{+} + (\rho/2)\|x_{i} - z^{k} + u^{k}_{i}\|_{2}^{2}) \\
  &z^{k+1} := \arg\min_{z} ((1/2\lambda)\|z\|_{2}^{2} + \sum_{i=1}^{N} (\rho/2)\|x_{i}^{k+1} - z + u^{k}_{i}\|_{2}^{2}) \\
  &u^{k+1}_{i} := u_{i}^{k} + x^{k+1}_{i} - z^{k+1}
  \end{align*}
$$

The update of x will be solved by another optimization problem:

```
  cvx_begin
      variable x_var(n)
      minimize ( sum(pos(A{i}*x_var + 1)) + rho/2*sum_square(x_var - z(:,i) + u(:,i)) )
  cvx_end
```

The update of z is simple, using the first order optimal condition we have :

$$
  (1/\lambda)z^{k+1} + \sum_{i=1}^{N}(-\rho(x_{i}^{k+1}- z^{k+1} + u^{k}_{i})) = 0
$$

$$
  z^{k+1} = \frac{\rho N}{(1/\lambda) + N \rho}(\bar{x}^{k+1} + \bar{u}^{k})
$$

Then, we get the final updates of ADMM of linear SVM :

$$
  \begin{align*}
  &x^{k+1}_{i} := \arg\min_{x_{i}} (\mathbb{1}^{T}(A_{i}x_{i} + \mathbb{1})_{+} + (\rho/2)\|x_{i} - z^{k} + u^{k}_{i}\|_{2}^{2}) \\
  &z^{k+1} := \frac{\rho N}{(1/\lambda) + N \rho}(\bar{x}^{k+1} + \bar{u}^{k})\\
  &u^{k+1}_{i} := u_{i}^{k} + x^{k+1}_{i} - z^{k+1}
  \end{align*}
$$

[Code](http://stanford.edu/~boyd/papers/admm/svm/linear_svm.html) and [Script](http://stanford.edu/~boyd/papers/admm/svm/linear_svm_example.html)
could be found in [ADMM Stanford page](http://stanford.edu/~boyd/papers/admm/) (A distributed version but solved in serial).


## 8.3 Splitting across Features
Model fitting problems with a modest number of examples and a large number of features.

* NLP(natural language processing) : pairs of adjucent words (bigrams), etc.
* Bioinformatics: DNA mutation, etc.

Partition of the parameter vector x as $x = (x_{1}, ..., x_{N})$, and A as $A = [A_{1},...,A_{N}]$,
the problem will be:

$$
  minimize\quad l(\sum_{i=1}^{N} A_{i}x_{i} -b) + \sum_{i=1}^{N}r_{i}(x_{i})
$$

Reform into consensus problem:

$$
  \begin{align*}
  & minimize \quad l(\sum_{i=1}^{N} z_{i} -b) + \sum_{i=1}^{N}r_{i}(x_{i}) \\
  & subject\ to \quad A_{i}x_{i} - z_{i} =0,\ i=1,...,N
  \end{align*}
$$

The corresponding scaled form of ADMM is :

$$
  \begin{align*}
  & x_{i}^{k+1} := \arg\min_{x_{i}} (r_{i}(x_{i}) + (\rho/2)\|A_{i}x_{i} - z_{i}^{k} + u_{i}^{k} \|_{2}^{2}) \\
  & z^{k+1} := \arg\min_{z} (l(\sum_{i=1}^{N}z_{i}-b) + \sum_{i=1}^{N}(\rho/2)\|A_{i}x_{i}^{k+1} - z_{i} + u_{i}^{k} \|_{2}^{2}) \\
  & u_{i}^{k+1} := u_{i}^{k} + A_{i}x_{i}^{k+1} - z^{k+1}_{i}
  \end{align*}
$$

### 8.3.1 Group Lasso

[Code](http://stanford.edu/~boyd/papers/admm/group_lasso/group_lasso_feat_split.html) and [Script](http://stanford.edu/~boyd/papers/admm/group_lasso/group_lasso_feat_split_example.html).

[Back To ADMM Home](../00index).
