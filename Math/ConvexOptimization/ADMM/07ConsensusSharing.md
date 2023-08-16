---
layout: page_tree_math
title: 7. Consensus and Sharing
---

[Back To ADMM Home](../00index).

## 7.1 Global Variable Consensus

**Corresponding to the distribution across samples in the next chapter**.

Consider the problem with one single objective function, but can be distributed into several parts:

$$
  minimize \quad f(x) = \sum_{i=1}^{N}f_{i}(x)
$$

We can always extend the definition of the function $f_{i}$ to be plus infinity if x is out of its domain.
The advantage of ADMM is that each split of the objective function could be implemented into different processors, such
that the algorithm could run in parallex.

Then we can rewrite the problem into a **global consensus problem** (since that the constraints are that all the local variables should agree) :

$$
  \begin{align*}
  &minimize \quad \sum_{i=1}^{N}f_{i}(x_{i}) \\
  &subject\ to \quad x_{i} = z, \ i = 1, ..., N
  \end{align*}
$$

The augmented Lagrangian is :

$$
  \mathcal{L}(x,z,y) = \sum_{i=1}^{N}f_{i}(x_{i}) + y_{i}^{T}(x_{i}-z) + (\rho/2)\|x_{i} -z \|_{2}^{2})
$$

The updates of ADMM will be :

$$
  \begin{align*}
  &x^{k+1}_{i} := \arg\min_{x_{i}} (f_{i}(x_{i}) + y_{i}^{kT}(x_{i}-z^{k}) + (\rho/2)\|x_{i} -z^{k} \|_{2}^{2}) \\
  &z^{k+1} := \arg\min_{z} \sum_{i=1}^{N}(y_{i}^{kT}(x_{i}^{k+1}-z) + (\rho/2)\|x_{i}^{k+1} -z \|_{2}^{2}) \\
  &y^{k+1}_{i} := y^{k}_{i} + \rho(x^{k+1}_{i}-z^{k+1})
  \end{align*}
$$

The update of z could be further simplified by :

$$
  \begin{align*}
  z^{k+1} &= \arg\min_{z} \sum_{i=1}^{N}(y_{i}^{kT}(x_{i}^{k+1}-z) + (\rho/2)\|x_{i}^{k+1} -z \|_{2}^{2}) \\
  &= \arg\min_{z} \sum_{i=1}^{N} - (y_{i}^{k} +\rho x_{i}^{k+1})^{T}z + (\rho/2)Nz^{T}z
  \end{align*}
$$

$$
  z^{k+1} = (1/N)\sum_{i=1}^{N}(x_{i}^{k+1} + (1/\rho)y_{i}^{k})
$$

we can further simpliy it by introcuding the notation of averages:

$$
  z^{k+1} := \bar{x}^{k+1} + (1/\rho)\bar{y}^{k}
$$

$$
  \bar{y}^{k+1} := \bar{y}^{k}_{i} + \rho(\bar{x}^{k+1}-z^{k+1}) = 0
$$

So we have :

$$
  z^{k+1} := \bar{x}^{k+1}
$$

Finally we have the ADMM updates:

$$
  \begin{align*}
  &x^{k+1}_{i} := \arg\min_{x_{i}} (f_{i}(x_{i}) + y_{i}^{kT}(x_{i}-\bar{x}^{k}) + (\rho/2)\|x_{i} -\bar{x}^{k} \|_{2}^{2}) \\
  &z^{k+1} = \bar{x}^{k+1}\\
  &y^{k+1}_{i} := y^{k}_{i} + \rho(x^{k+1}_{i}-\bar{x}^{k+1})
  \end{align*}
$$

## 7.2 Sharing

**Corresponding to the distribution across features in the next chapter**.

$$
  minimize \quad \sum_{i=1}^{N}f_{i}(x_{i}) + g(\sum_{i=1}^{N}x_{i})
$$

In the next chapter, we will have function f corresponding to the regularization term, and g corresponding to the objective function splitted by feature subsets.

The ADMM form the equivalent problem is, where each subset corresponding to a subset of features:

$$
  \begin{align*}
  &minimize \quad \sum_{i=1}^{N}f_{i}(x_{i}) + g(\sum_{i=1}^{N}z_{i}) \\
  &subject\ to \quad x_{i} = z_{i}, \ i = 1,...,N
  \end{align*}
$$

The scaled form of ADMM is :

$$
  \begin{align*}
  &x^{k+1}_{i} := \arg\min_{x_{i}} (f_{i}(x_{i}) + (\rho/2)\|x_{i} - z_{i}^{k} + u_{i}^{k}\|_{2}^{2}) \\
  &z^{k+1} := \arg\min_{z}(g(\sum_{i=1}^{N}z_{i}) + (\rho/2)\sum_{i=1}^{N}\|x_{i}^{k+1} - z_{i} + u_{i}^{k}\|_{2}^{2}) \\
  &u^{k+1}_{i} := u^{k}_{i} + x_{i}^{k+1} - z_{i}^{k+1}
  \end{align*}
$$

We can further simplify the z update by the problem:

$$
  \begin{align*}
  &minimize \quad g(N\bar{z}) + (\rho/2)\sum_{i=1}^{N}\|z_{i} -a_{i}\|_{2}^{2} \\
  &subject\ to \quad \bar{z} = (1/N)\sum_{i=1}^{N}z_{i}
  \end{align*}
$$

Where $a_{i} = u_{i}^{k} + x_{i}^{k+1}$, minimize the objective function while fixing the $\bar{z}$, we have the lagrangian is:

$$
  \mathcal{L}(z_{i}, \lambda) = g(N\bar{z}) + (\rho/2)\sum_{i=1}^{N}\|z_{i} -a_{i}\|_{2}^{2} + \lambda^{T} (\bar{z} - (1/N)\sum_{i=1}^{N}z_{i})
$$

From the first order optimal condition we have :

$$
  \rho (z_{i} - a_{i}) - \lambda /N =0
$$

With the dual function d being:

$$
  d(\lambda) = g(N\bar{z}) + N\rho/2\|\frac{\lambda}{\rho N}\|_{2}^{2} + \lambda^{T} (\bar{z} - (1/N)\sum_{i=1}^{N}(a_{i} + \frac{\lambda}{\rho N}))
$$

Using the first order optimal condition of the dual function :

$$
  (\bar{z} - \bar{a}) - \frac{\lambda}{\rho N} = 0
$$

Finally, we have :

$$
  z_{i} = a_{i} + (\bar{z} -\bar{a})
$$

To solve $\bar{z}$, we solve :

$$
  minimize \quad g(N\bar{z}) + (\rho/2)\sum_{i=1}^{N}\|\bar{z}-\bar{a}\|_{2}^{2} = g(N\bar{z}) + (N\rho/2)\|\bar{z}-\bar{a}\|_{2}^{2}
$$

And applying the update of $z_{i}$ into the udpate of x , we have the ADMM udpates expression:

$$
  \begin{align*}
  &x_{i}^{k+1} := \arg\min_{x_{i}} (f_{i}(x_{i}) + (\rho/2)\|x_{i} - x_{i}^{k} + \bar{x}^{k} - \bar{z}^{k} + \bar{u}^{k}\|_{2}^{2}  ) \\
  &\bar{z}^{k+1} := \arg\min_{\bar{z}} (g(N\bar{z}) + (N\rho/2)\|\bar{z}-\bar{u}^{k} - \bar{x}^{k+1}\|_{2}^{2}) \\
  &\bar{u}^{k+1} := \bar{u}^{k} + \bar{x}^{k+1} - \bar{z}^{k+1}
  \end{align*}
$$

[Back To ADMM Home](../00index).
