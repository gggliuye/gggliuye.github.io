---
layout: page_tree_math
title: CVX based SLAM related algorithms
---

[Back To Paper Read Home](../00index).

# Table of Contents

1. [Banch and Bound](#l1)
2. [Lagrangian Duality](#l2)
3. [TEASER++](#l3)

[Another source to read](https://blog.csdn.net/weixin_44492024/article/details/106619527).

It is a summary of a few point cloud matching algorithms based on convex optimzation theory.

<div align="center">    
<img src="../images/graph_1.PNG" width="50%"/>
</div>

<div align="center">    
<img src="../images/graph_2.PNG" width="70%"/>
</div>

<a name="l1"></a>
# 1. Banch and Bound

<a name="l1.1"></a>
## 1.1 Practical Global Optimization for Multiview Geometry

[Article](http://www.researchgate.net/profile/Serge_Belongie/publication/225439941_Practical_Global_Optimization_for_Multiview_Geometry/links/0fcfd5086e4e7aa60f000000).

This article talks about using Banch and Bound algorithm for three types of Multiview Geometry problems:
* Camera pixels triangualtion
* Camera Resectioning, which is to estimate camera matrix P.
* Projection from $$\mathbf{P}^{n}$$ to $$\mathbf{P}^{m}$$, which could be homography estimation and use 3d point matches to estiamte relative transformation.

This article uses :

* Fractinal Programming to reform these problems
* Using Convex Envelope of these Fractinal problems as a lower bound for Banch and Bound
* Use three type of nosie models :

**Ordinary Gaussian noise model**

$$
  p(x|x') =  \frac{1}{2 \pi \sigma^{2}} \exp( - \frac{ \| x - x' \|^{2}_{2}}{2\sigma^{2}})
$$

**A special case for Laplace nosie**

$$
  p(x|x') =  \frac{1}{2 \pi \sigma} \exp( - \frac{ \| x - x' \|_{2}}{\sigma})
$$

**Bivariate Laplace distribution**

$$
  p(x|x') =  \frac{1}{4 \sigma} \exp( - \frac{ \| x - x' \|_{1}}{\sigma})
$$

<div align="center">    
<img src="https://img-blog.csdnimg.cn/20200608151450625.png" width="70%"/>
</div>

* it shows that the tridational method (Bundle Adjustment method) for point cloud match is very senstive to noise, and easily trapped in local minimal. While BNB method find a global optimal is apparent much better.

* And it shows that **L2 Guassian noise model** shows better result for camera resectioning (the least reprojection error). While **L1 Laplacian model** shows better result for ICP type problems.

* And from the Table2, we can see a real **L1 norm** will conerge much faster. (It may be true that the 21 centry is the centry for L1 norm)

<a name="l1.2"></a>
## 1.2 Branch-and-Bound Methods for Euclidean Registration Problems

[Article](https://www.researchgate.net/publication/24213723_Branch-and-Bound_Methods_for_Euclidean_Registration_Problems?enrichId=rgreq-9861f218523209ac6405a5bec452f72f-XXX&enrichSource=Y292ZXJQYWdlOzI0MjEzNzIzO0FTOjEwNDUxNzU1OTM5MDIwOUAxNDAxOTMwMzM2MDg0&el=1_x_3&_esc=publicationCoverPdf).

This is a article focus on the 3D points registration problems, which needs already matched point pairs.
The lower bounds are obtained by Convex relaxations of $$\mathbf{SO}(3)$$, which is the rotation part.
It uses quaternion expression of the rotation. And apply a convex envelop over $$q_{i}q_{j}$$.

* It shows a much better result compared to linear algebra methods (DLT), and have a competable result compared to DLT + bundle adjustment.
* It is much much more stable compared to the other methods.
* While even though they didn't show, I think the comptation time it needs is much more than the other two methods.

<a name="l2"></a>
# 2. Lagrangian Duality

<a name="l2.1"></a>
## 2.1 Convex Global 3D Registration with Lagrangian Duality

[Article](https://www.researchgate.net/publication/320964493_Convex_Global_3D_Registration_with_Lagrangian_Duality)

This article focus on Lagrangian Duality of ICP problems, and in practice it shows strong duality holds, and it shows a competable result compared with the article of 1.2(Branch-and-Bound Methods for Euclidean Registration Problems).

* It use the matrix representation of rotation.

* It has a very detail summary of the ICP methods (point-to-point, point-to-line, and point-to-plane).

* It reform the problem into **QCQP** (nonconvex quadratically constrained quadratic programs) (much more about QCQP could be found [here](https://web.stanford.edu/class/ee364b/lectures.html) ), so the problem can be reformed into **SDP** (semidefinite program) via Lagrangian Duality (or via SDP relaxation).

I strongly recommond to read its supplemenraty material, it is a very good learning material for QCQP and ICP.

The results are mainly compared with the article of 1.2(Branch-and-Bound Methods for Euclidean Registration Problems).
It shows that strong duality holds in practice (no proof offered), and this method shows a much more short CPU runtime
 (as we don't need to search).

<a name="l2.2"></a>
## 2.2 Solving Quadratically Constrained Geometrical Problems using Lagrangian Duality

[Article](https://www.researchgate.net/publication/224375577_Solving_Quadratically_Constrained_Geometrical_Problems_using_Lagrangian_Duality?enrichId=rgreq-3868994c4fa6a12376deac34988482d0-XXX&enrichSource=Y292ZXJQYWdlOzIyNDM3NTU3NztBUzoxMDE2OTA5OTI3NTg3ODhAMTQwMTI1NjQzMDEzMw%3D%3D&el=1_x_3&_esc=publicationCoverPdf)

This content of this article is already contained in the upper article 1.2 and 1.1.

<a name="l2.3"></a>
## 2.3 Duality-based Verification Techniques for 2D SLAM

[Article](http://www.researchgate.net/publication/282687190_Duality-based_verification_techniques_for_2D_SLAM)

It reform the problem into QCQP and use SDP relaxation to find bound. And this article mainly focus on **a evulation of  SLAM result**, using **a lower bound and a upper bound**. Does not offer a BNB (or other) algorithm to be aimed at solving the problem.

* The loss function is difference of poses.

* It use matrix representation of rotation, and use **Chordal distance(element wise squared norm)** as error term.

* Reform the problem  into QCQP and find SDP relaxations.

* Find a lower bound using exact SDP relaxation and a looser bound using a simplfied SDP.

* Find upper bound by projecting the duality result into feaible set.

Better see the next article for more, which a more detailed version of this work.

<a name="l2.4"></a>
## 2.4 Lagrangian Duality in 3D SLAM: Verification Techniques and Optimal Solutions

[Article](https://www.researchgate.net/publication/308823892_Lagrangian_duality_in_3D_SLAM_Verification_techniques_and_optimal_solutions)

Mostly the same as the article before (2.3 Duality-based Verification Techniques for 2D SLAM) except that it in extended to 3D SLAM problems.

The bounds are good, and these two articles are very good material for a application of relaxation of QCQPs.

<a name="l3"></a>
# 3. TEASER++

[Article](https://www.researchgate.net/publication/338762508_TEASER_Fast_and_Certifiable_Point_Cloud_Registration)

This is the main subject here. This method is a **outlier robust, correspondence free** 3D point cloud registration algorithm.  It has three main contributions:

* Truncated Least Squares (TLS) loss function (robust to large outliers)

* Graph-theoretic framework to decouple scale, rotation and translation (it includes the etimation of scale)

* A tight (empirically) SDP relaxation of the rotation estimation.

<a name="l3.1"></a>
## 3.1 Related works

**Correspondence based methods**:

<div align="center">    
<img src="../images/graph_3.PNG" width="75%"/>
</div>

**Correspondence free methods**:

<div align="center">    
<img src="../images/graph_4.PNG" width="65%"/>
</div>

<a name="l3.2"></a>
## 3.2 Pipeline

**Objective function**:

$$
  \min_{s >0, \mathbf{R} \in SO(3), t \in \mathbb{R}^{3}} \sum_{i = 1}^{N} \min(\frac{1}{\beta^{2}}
  \|b_{i} - s\mathbf{R}a_{i} - t \|^{2}, \bar c ^{2})
$$

* Not guaranteed to produce the same result as Consensus Maximization (which maximize the number of inliers).
* convex TLS is NP hard, and SO(3) non-convex is even harder.

**Marginalize translation** same as ordinary ICP solving steps. Process in the centroid reference (TIM : translation invariant measurement).
Then estimate firstly the scale using adaptive voting, in polynomial time.

$$
  \hat{s} = \arg\min_{s} \sum_{k_{ij}=1}^{K} \min(\frac{(s-s_{ij})^{2}}{\alpha_{ij}^{2}}, \bar c^{2} )
$$

**Marginalize Rotation**

Then solve rotation via a tight semi-definite relaxation.

$$
  \hat{R} = \arg\min_{R\in SO(3)} \sum_{k_{ij} = 1}^{K} \min(\frac{\|\bar{b}_{ij} - \hat{s}R\bar{a}_{ij}  \|^{2}}{\delta_{ij}^{2}}, \bar c^{2})
$$

Solving large-scale SDP (expensive) :

* Add binary variables to avoid the min function. Then form QCQP problem.
* Make the QCQP convex, by applying a SDR (semi-definite relaxation). And the relaxation is tight, which guarantee the global optimal.

Fast heuristics (GNC : graduated non-convexity) with certification.


Finally solve the translations via adaptive voting.

$$
  \hat{t_j} = \arg\min_{t_{j}} \sum_{i=1}^{N}\min(\frac{ (t_{j} - [b_{i}-\hat s \hat R a_{i}]_{j})^{2} }{\beta_{i}^{2}}, \bar c^{2})
$$

<a name="l3.3"></a>
## 3.3 Adaptive Voting

* It is a generalization of Histogram voting algorithms.

* Used to calculate translation and scale part of the problem.

* Explain by focus on the scale part:

<a name="l3.4"></a>
## 3.4 Optimality Certification

This article also propose an algorithm to evaluate a feasible 'solution' (not necessary optimal), by offering a sub-optimality bound.

<a name="l3.5"></a>
## 3.5 GNC C++

[See here](https://blog.csdn.net/weixin_44492024/article/details/106781677)

I was very curious about how they actually solve the SDP using C++ (as I could not find a CVX version for C++). Then I invested its reference articles and its source code.

* It uses a Method called "GNC", which is a piecewise polynomial approximation to the truncated quardatic functions (developped by Blake and Zisserman 1987).

* And it using the theory from the article " On the unification of line processes, outlier rejeection, and robust statistics with applications in early vision". Whose theme is that **Robust estimation and outlier rejection process are closely related, and can be converted into each other.**

* In summary, it uses a iterative reweighted SVD based rotation solver.

[Back To Paper Read Home](../00index).
