---
layout: page_tree_math
title: 8. Conclusions
---

[Back To Proximal Algorithms Home](../00index).

**All from the** [paper](http://stanford.edu/~boyd/papers/prox_algs.html).

Much like gradient descent and the conjugate gradient method
are standard tools of great use when optimizing smooth functions serially,
proximal algorithms should be viewed as an analogous tool for
**nonsmooth, constrained, and distributed** versions of these problems.

Proximal methods sit at a higher level of abstraction than classical
optimization algorithms like Newton’s method. In such algorithms, the
base operations are low-level, consisting of linear algebra operations
and the computation of gradients and Hessians. In proximal algorithms,
the base operations include solving small convex optimization problems
(which in some cases can be done via a simple analytical formula).

Some problems are often more natural to solve
using proximal algorithms rather than converting them to symmetric
cone programs and using interior-point methods.


[Back To Proximal Algorithms Home](../00index).
