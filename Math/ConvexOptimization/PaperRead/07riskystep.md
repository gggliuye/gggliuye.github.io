---
layout: page_tree_math
title: Risky Giant Steps Can Solve Optimization Problems Faster
---


From Post : [Risky Giant Steps Can Solve Optimization Problems Faster](https://www.quantamagazine.org/risky-giant-steps-can-solve-optimization-problems-faster-20230811/)


<img src="/assets/img/paperread/chrown.png" height="25"/> [Branch-and-Bound Performance Estimation Programming: A Unified Methodology for Constructing Optimal Optimization Methods 2022](https://arxiv.org/abs/2203.07305). Try finding the best step lengths for an algorithm restricted to running only 50 steps — a sort of meta-optimization problem. Found that the most optimal 50 <u>steps varied significantly in length</u>, with one step in the middle of the sequence reaching nearly to length 37, far above the typical cap of length 2.

<img src="/assets/img/paperread/chrown.png" height="25"/> [Provably Faster Gradient Descent via Long Steps 2023](https://arxiv.org/abs/2307.06324). periodically long step make the convergence faster in long term.
* The optimal step lengths would be for a sequence that could repeat, getting closer to the optimal answer with each repetition.
* The fastest sequences always had one thing in common: <h>The middle step was always a big one, with a symmetric shape.</h> Its size depended on the number of steps in the repeating sequence.
* This sequence can arrive at the optimal point nearly **three times faster** than it would by taking constant baby steps.
* **focused only on smooth functions**, may not be used in general cases.

Given a step size pattern $$h = (h_{0},...,h_{t-1}) \in \mathcal{R}^{t}$$, we consider the gradient descent method repeatedly applying the pattern of stepsize:

$$
x_{k+1} = x_{k} - \frac{h_{(k \, mod \, t)}}{L}  \triangledown f(x_{k})
$$

could give a convergence guarantee for any straightforward stepsize pattern h of :

$$
f(x_{T}) - f(x_{*}) \le \frac{LD^{2}}{avg(h)T} + O(1/T^{2})
$$
