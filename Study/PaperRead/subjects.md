---
layout: page_tree_paper
title: Other Specific Subjects
---

# Table of Contents
* [ICP covariance](#l1)
* [Point cloud generation](#l2)
* [Line feature match](#l3)

<p/><p/>

# ICP covariance <a name="l1"></a>

**ICP error source**:

* wrong convergence (to local minimial), error of the initial pose estimation.
* under-constrainted situation: the problem is indeterminted.
* miss match.
* sensor noise.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [An accurate closed-form estimate of ICP's covariance 2007](https://ieeexplore.ieee.org/document/4209579). Use hessien matrix as the estimation of the covariance (but this method in some cases greatly over-estimates thte true covariance):

$$
cov(\hat{x}) \approx 2\frac{residual}{K-3} [\frac{\partial^{2}}{\partial x^{2}}residual]^{-1}
$$

This paper develop the following closed-form method :

$$
cov(x) \approx [\frac{\partial^{2}}{\partial x^{2}}J]^{-1} [\frac{\partial^{2}}{\partial z\partial x}J]^{T} cov(z) [\frac{\partial^{2}}{\partial z\partial x}J] [\frac{\partial^{2}}{\partial x^{2}}J]^{-1}
$$

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [A Closed-form Estimate of 3D ICP Covariance 2015](https://sites.google.com/site/icpcovariance/). Based on the upper paper, and solve for point-to-point case.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [On the Covariance of ICP-based Scan-matching Techniques 2016](https://arxiv.org/abs/1410.7632). Analysis the upper hessien based method. Find that the upper method fit for point-to-plane icp, but not for point-to-point icp.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [A New Approach to 3D ICP Covariance Estimation 2019](https://arxiv.org/abs/1909.05722). Add an additional term for the covariance from the initial pose estimation.


# Point cloud generation <a name="l2"></a>

* (local method) 3d grid (TSDF, ESDF) + matching cube. (binary classification problem for octree vertices)
* (global method) point cloud + possion reconstruction.
* Delaunnay triangulation
* Deep learning method

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [(ONet) Occupancy networks: Learning 3d reconstruction in function space](https://arxiv.org/abs/1812.03828)

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [SSRNet: Scalable 3D Surface Reconstruction Network](https://arxiv.org/pdf/1911.07401.pdf)

# Line feature match <a name="l3"></a>

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [structure-from-motion using lines representation triangulation and bundle adjustment 2005](https://hal.archives-ouvertes.fr/hal-00092589/document) Plucker representation of the line (by two points or two planes: the direction of the line, and the moment). The paper proposed a **Orthonormal Representation** of lines, takes only 4 dof (three SO(3) and one SO(2)).

*Used this factorization in our project, it performs well.* But in actually localization applications, point feature is much more robust than this method.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [impact of landmark parameterization on monocular ekf-slam with points and lines 2010](https://www.researchgate.net/publication/41182046_Impact_of_Landmark_Parametrization_on_Monocular_EKF-SLAM_with_Points_and_Lines) Project lines into camera image space.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [PL-SLAM: a Stereo SLAM System through the Combination of Points and Line Segments 2017](https://arxiv.org/abs/1705.09479). Using the orthonormal representation of lines, and 3d point representation of points, to process visual slam (basicly ORBSLAM2 structure). And the first paper to derivative the line jacobians with detail.
