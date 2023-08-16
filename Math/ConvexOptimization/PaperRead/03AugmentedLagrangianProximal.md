---
layout: page_tree_math
title: Augmented Lagrangian and Proximal Point Algorithm
---

[Back To Paper Read Home](../00index).

[Augmented Lagrangians and Applications of the Proximal Point Algorithm in Convex Programming](https://www.researchgate.net/publication/243781294_Augmented_Lagrangians_and_Applications_of_the_Proximal_Point_Algorithm_in_Convex_Programming) (1976 R.T. Rockafellar)


From **method of multipliers** to **proximal method of multipliers**.

For solving a inequalities constrained convex optimization problem (P, for 'primal'):

$$
  \begin{align*}
  &minimize \quad f_{0}(x) \\
  &subject\ to \quad f_{i}(x) \le 0, \ i = 1,...,m
  \end{align*}
$$

# 1. Proximal point algorithm for P : primal

**Proximal operator**:

$$
  f_{0}^{k}(x) = f_{0}(x) + (1/2c_{k})\| x- x^{k}\|_{2}^{2}
$$

For this modification, we have a stronger convexity, as we have :

$$
  f_{0}^{k}((1-\lambda)x + \lambda x') \le (1-\lambda)f_{0}^{k}(x) + \lambda f_{0}^{k}(x') - (\lambda(1-\lambda)/2c_{k})\| x- x'\|_{2}^{2}
$$

* In many algorithms, strong convexity is a boon to good convergence and makes possible more convenient stopping criteria, including estimates of how far one is from a minimum point.
* Can reduce trouble when solving the problem : as the infimum may not be attained at all or not attained uniquely, this make is harder to generate simultaneously an asymptotically minimizing sequence for (P) itself.
* The separability of the kind essential to decomposition methods is perserved.

# 2. Proximal point algorithm for D : dual

**Method of multipliers**, **Augmented lagrangian**


# 3. Proximal point algorithm for Convex-concave Lagrangian

[Back To Paper Read Home](../00index).
