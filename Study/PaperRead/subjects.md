---
layout: page_tree_paper
title: Other Specific Subjects
---

# Table of Contents
1. [ICP covariance](#l1)
2. [Line feature match](#l2)
3. [DL reconstruction](#l3): map from a 3D coordinate to properties of the scene at that location. The following division is only for making the doc clearer. they are actually very close to each other.
    * [Neural Rendering](#l3.1) : the objective is mostly generating images.
    * [DL SDF](#l3.2) : the objective is the SDF (signed distance field).
    * [DL MVS](#l3.3)

<p/><p/>

<a name="l1"></a>
# 1. ICP covariance

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

<a name="l2"></a>
# 2. Line feature match

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [structure-from-motion using lines representation triangulation and bundle adjustment 2005](https://hal.archives-ouvertes.fr/hal-00092589/document) Plucker representation of the line (by two points or two planes: the direction of the line, and the moment). The paper proposed a **Orthonormal Representation** of lines, takes only 4 dof (three SO(3) and one SO(2)).

*Used this factorization in our project, it performs well.* But in actually localization applications, point feature is much more robust than this method.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [impact of landmark parameterization on monocular ekf-slam with points and lines 2010](https://www.researchgate.net/publication/41182046_Impact_of_Landmark_Parametrization_on_Monocular_EKF-SLAM_with_Points_and_Lines) Project lines into camera image space.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [PL-SLAM: a Stereo SLAM System through the Combination of Points and Line Segments 2017](https://arxiv.org/abs/1705.09479). Using the orthonormal representation of lines, and 3d point representation of points, to process visual slam (basicly ORBSLAM2 structure). And the first paper to derivative the line jacobians with detail.

<a name="l3"></a>
# 3. DL reconstruction

<a name="l3.1"></a>
## 3.1 Neural Rendering

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [LENS: Localization enhanced by NeRF synthesis](https://arxiv.org/abs/2110.06558) use [Nerf in the Wild](#lnerfw) to perform data incrementation, for trainning a pose regressor.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields 2021](https://jonbarron.info/mipnerf/), [paper](https://arxiv.org/pdf/2103.13415.pdf), [github](https://github.com/google/mipnerf).
* Nerf : can cause excessive blurring and aliasing.
* Mip-NeRF: casting a **cone** from each pixel. <u>integrated positional encoding (IPE)</u> by each conical frustum (instead of position in Nerf).

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Baking Neural Radiance Fields for Real-Time View Synthesis 2021](https://arxiv.org/pdf/2103.14645.pdf), [github](https://github.com/google-research/google-research/tree/master/snerg). Sparse Neural Radiance Grid (SNeRG, sparse 3D voxel grid data structure storing a pre-trained NeRF model), accelerates rendering procedure.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [KiloNeRF: Speeding up Neural Radiance Fields with Thousands of Tiny MLPs](https://arxiv.org/pdf/2103.13744.pdf). Instead of a single, high-capacity MLP, represents by thousands of small MLPs.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [IBRNet: Learning Multi-View Image-Based Rendering 2021](https://arxiv.org/abs/2102.13090) operate without any scene-specific optimization or precomputed proxy geometry. for each target ray:

* step 1. [sample 3d points on rays, candidate images] → [features extracted on projected pixel location from candidate images]
* step 2. [extracted features, direction] → [RGB weights, volume density]
* <u>Cons</u>: Need additional feature extraction module. No 3d points location as input so that converting to 3d mesh is tricky.

<a name="lnerfw"></a>
<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [NeRF in the Wild: Neural Radiance Fields for Unconstrained Photo Collections 2020](https://arxiv.org/abs/2008.02268) to address ubiquitous, real-world phenomena : moving objects or variable illumination.

* step 1. model per-image appearance variations in a learned low-dimensional latent space. -> control of the appearance of output.
* step 2. model the scene as the union of shared and image-dependent elements.
* [see here for a wonderful implementation using pytorch-lightning](https://github.com/kwea123/nerf_pl/tree/nerfw), which also fits input from colmap. [see here with my tests](https://github.com/yeliu-deepmirror/nerf_pl).


<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/><img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis 2020](https://arxiv.org/abs/2003.08934). Trainning a map : $F_{\Theta}(x, d) \to (x, \sigma)$ , from the pixel ray - defined by x (optical center), d (direction), to volumn density and color. <u>Each pixel ray will be sampled to 'N_sample' points, each point run the network, then integrated to get the final value.</u>

<div align="center">  
  <pre class="mermaid">
        graph LR
        A[Position of point] --> B[MLP encoder]
        B --> C[FCxN]
        C --> D[FC]
        B --> D
        D --> E[FCxN]
        E --> F
        X[Direction of ray] --> Y[MLP encoder] --> F[FC]
        F --> G[RGB & sigma]
        style A fill:#f9f,stroke:#333,stroke-width:4px
        style X fill:#f9f,stroke:#333,stroke-width:4px
        style G fill:#bbf,stroke:#333,stroke-width:4px
  </pre>
</div>

* Need times to train for each data session.
* Train LLFF dataset (“forward-facing” scenes) in “normalized device coordinates” (NDC) space; large rotation scene in conventional 3D world coordinates.
* [google jaxnerf implementation](https://github.com/google-research/google-research/tree/master/jaxnerf), [see here with my tests](https://github.com/yeliu-deepmirror/nerf).

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [LLFF: Local Light Field Fusion: Practical View Synthesis with Prescriptive Sampling Guidelines](https://arxiv.org/abs/1905.00889), [github](https://github.com/Fyusion/LLFF)


<a name="l3.2"></a>
## 3.2 DL SDF

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [VolSDF: Volume Rendering of Neural Implicit Surfaces 2021](https://arxiv.org/pdf/2106.12052.pdf) define the volume density function as Laplace’s cumulative distribution function (CDF) applied to a signed distance function (SDF) representation. model the density:

$$
\sigma(x) = \alpha \Phi_{\beta}(-d_{\Omega}(x))
$$

$$
\begin{equation}
  \Phi_{\beta}(s) =
    \begin{cases}
      \frac{1}{2}exp(\frac{s}{\beta}) & \text{if $s \le 0$}\\
      1 - \frac{1}{2}exp(-\frac{s}{\beta}) & \text{if $s > 0$}
    \end{cases}       
\end{equation}
$$

* MLP1. sdf d and feature z: $f_{\phi}(x) = (d(x), z(x)) \in R^{1+256}$
* MLP2. scene’s radiance field: $L_{\phi}(x, n, v, z) \in R^{3}$


<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/><img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Implicit Neural Representations with Periodic Activation Functions 2020](https://arxiv.org/abs/2006.09661). <u>A continuous implicit neural representation using periodic activation functions that fits complicated signals.</u> Solve challenging boundary value problems.

$$
F(x, \Phi(x), \triangledown_{x}\Phi, \triangledown_{x}^{2}\Phi, ...) = 0
$$

* ReLU networks are piecewise linear incapable of modeling higher-order derivatives. While alternative activations are not well behaved.
* **SIREN**: $\Phi(x) = W_{n}(\phi_{n-1} \circ \phi_{n-2} \circ ... \circ \phi_{0})(x) + b_{n}$, $x_{i} \to \phi_{i}(x_{i}) = sin(W_{i}x_{i} + b_{i})$. The activations of Siren always alternate between a standard normal distribution with standard deviation one, and an arcsine distribution.
* $\Phi(x)$ being a FC, loss be the $\int_{\Omega} \sum_{i}I_{\Omega_{i}}(x)\|F(x)\| dx$. ($\Omega_{i}$ is a sampling)
* Poisson Equation, SDF(+-1), Helmholtz and Wave Equation. [github](https://github.com/vsitzmann/siren).
* Compared with NERF pose encoding in github.


<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [DeepSDF: Learning Continuous Signed Distance Functions for Shape Representation 2019](https://openaccess.thecvf.com/content_CVPR_2019/html/Park_DeepSDF_Learning_Continuous_Signed_Distance_Functions_for_Shape_Representation_CVPR_2019_paper.html) DeepSDF network outputs SDF value at a 3D query location. Shape completion (auto-decoding) takes considerably more time during inference. [github](https://github.com/facebookresearch/DeepSDF).

<a name="l3.3"></a>
## 3.2 DL MVS

[PatchmatchNet: Learned Multi-View Patchmatch Stereo](https://openaccess.thecvf.com/content/CVPR2021/papers/Wang_PatchmatchNet_Learned_Multi-View_Patchmatch_Stereo_CVPR_2021_paper.pdf), [github](https://github.com/FangjinhuaWang/PatchmatchNet)
