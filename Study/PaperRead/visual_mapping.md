---
layout: page_tree_paper
title: Visual Mapping And Localization
---

# Table of Contents
* [2023](#l2023)
* [2022](#l2022)
* [2021](#l2021)
* [2020](#l2020)
* [2019](#l2019)
* [2018](#l2018)
* [before](#lbefore)

<p/><p/>

<a name="l2023"></a>
# 2023

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> Blog: [Methods for visual localization](https://europe.naverlabs.com/blog/methods-for-visual-localization/).

<div align="center">    
<img src="/assets/img/paperread/visual_localization_methods.png" width="90%"/>
</div>

* HLOC (blue line) : point based mapping (feature extraction + match + sfm), image retrieval, PnP. The most sophisticated method, but too many algorithm modules, make the system complicated. And the development cost is large, since we need to refine each module separatly, then fused to test, all the modules are entangled to each other.
* Retrieval Based (green line) : all based on image retrieval, which is a weak pose, cannot reach high accuracy.
* End-to-end regression (black line) : I don't buy the idea. we cannot afford train a model for each scene.
* Relatve pose (purple line) : Single module, pose strong. But relative pose constraints might suffer degenerated scenes.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Refinement for Absolute Pose Regression with Neural Feature Synthesis](https://arxiv.org/pdf/2303.10087.pdf)

<a name="l2022"></a>
# 2022

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [NICE-SLAM: Neural Implicit Scalable Encoding for SLAM](https://arxiv.org/abs/2112.12130), [github](https://github.com/cvg/nice-slam). a hierarchical, grid-based neural implicit encoding, multi-resolution scalable solution akin to [iMAP](https://edgarsucar.github.io/iMAP/), intuition similar to [NERF](../subjects/#l3.1).

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [DM-VIO: Delayed Marginalization Visual-Inertial Odometry](https://arxiv.org/abs/2201.04114) a better DSO-IMU, [github](https://github.com/lukasvst/dm-vio).

* Multi-stage IMU initializer. Dynamic photometric weight (decrease weight for overall bad image).
* Pose graph bundle adjustment.
* A second factor graph for delayed marginalization (marginalization cannot be undone, but it can be delayed).

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [DSOL: A Fast Direct Sparse Odometry Scheme](https://arxiv.org/abs/2203.08182), [github](https://github.com/versatran01/dsol). Algorithmic and implementation enhancements of DSO, focus on the <u>stereo version</u>.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Long-term Visual Map Sparsification with Heterogeneous GNN](https://arxiv.org/abs/2203.15182) use GNN to substitute the ILP method. compare with the result using [Keep it brief (paper)](https://ieeexplore.ieee.org/document/7353722/) , [my notes here (better take a look)](#lkeepbrief) for map summarization.

<a name="l2021"></a>
# 2021

<a name="lgtsfm"></a>
<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [gtsfm : Georgia Tech Structure from Motion](https://github.com/borglab/gtsfm), global SFM pipeline.

* [Union-Find approach](https://hal-enpc.archives-ouvertes.fr/hal-00769267/file/moulon_monasse_featureTracking_CVMP12.pdf) for feature tracking.
* Estimate [Cycle Consistent View Graph](https://github.com/borglab/gtsfm/blob/master/gtsfm/view_graph_estimator/cycle_consistent_rotation_estimator.py#L47): remove inconsistent triplets.
* Solve by global method :
    * solve camera rotation using [Shonan Rotation Averaging](#lrotationaverage).
    * solve camera translations using [Translation Averaging](#ltranslationaverage).
* Process a full BA. then MVS.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [GVINS: Tightly Coupled GNSS-Visual-Inertial Fusion for Smooth and Consistent State Estimation](https://github.com/HKUST-Aerial-Robotics/GVINS) It offers a complete model of GPS measurement. Makes fusion with GPS very solid.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [DSP-SLAM: Object Oriented SLAM with Deep Shape Priors](https://jingwenwang95.github.io/dsp-slam/) ORBSLAM2 + object tracking

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [V-SLAM: Unconstrained Line-based SLAM Using Vanishing Points for Structural Mapping](https://arxiv.org/abs/2112.13515) Plucher coordinate line only has normal residual term, cannot fix degeneracy cases (line on epipolar plane). This paper introduces a new residual based on vanishing point measurements.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Pixel-Perfect Structure-from-Motion with Featuremetric Refinement](https://arxiv.org/abs/2108.08291). [github](github.com/cvg/pixel-perfect-sfm) (1) adjust the initial keypoint locations (use CNN dense features with direct alignment); (2) refine points and camera poses.

<a name="l2020"></a>
# 2020

<a name="lrotationaverage"></a>
<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Shonan Rotation Averaging: Global Optimality by Surfing SO(p)n](https://arxiv.org/abs/2008.02737). gives global optimal (which ordinary LM cannot give).

* [SE-Sync](#lmstaircase) uses truncated-Newton Riemannian optimization on Stiefel manifold, which cannot be done in common libraries (ceres, g2o, gstam). This paper uses variables in rotation manifold, then project to Stiefel manifold. $Q=[S, V]$, $Q\in SO(p), S\in St(d, p)$. then we have $S=\pi(Q) = QP$, $P=[I_{d}; 0]$.
* Then the problem could be re-written to :

$$
p^{*} = \min_{Q\in SO(r)^{n}} \sum_{(i, j)\in E}\kappa_{ij} tr(Q_{i}P\tilde{R}_{ij}P^{T}Q_{j}^{T})
$$


* used in <img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [gtsfm](#lgtsfm) (along with [translation averaging](#ltranslationaverage)), a different mapping pipeline from colmap-sfm. [gstam implementation](https://github.com/borglab/gtsam/blob/a0d64a9448b2bf4deb5073b3860a39c6b9fdd4dd/gtsam/sfm/ShonanAveraging.h)


<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/>  [hloc Hierarchical-Localization](https://github.com/cvg/Hierarchical-Localization). [CVPR2020](https://www.visuallocalization.net/workshop/cvpr/2020/) winner.

* [SuperPoint 2017](https://arxiv.org/abs/1712.07629), [SuperGlue](https://arxiv.org/abs/1911.11763) with [colmap 2016](https://colmap.github.io/) for building map.
* [Hierarchical Localization 2019](https://arxiv.org/abs/1812.03506) for localization. (Roughly speaking, using [NetVLAD 2016](https://arxiv.org/abs/1511.07247) match submap with a global descriptor, then match with reference image).

<div align="center">    
<img src="/assets/img/paperread/hloc.png" width="90%"/>
</div>

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Online Invariance Selection for Local Feature Descriptors](https://github.com/rpautrat/LISRD) Mainly for image retrieval. A light-weight meta descriptor approach to automatically select the best invariance of the local descriptors given the context. Learning the best invariance for local descriptors.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Online Visual Place Recognition via Saliency Re-identification](https://arxiv.org/pdf/2007.14549.pdf). [github project](https://github.com/wh200720041/SRLCD) .

* Perform both saliency detection and retrieval in frequency domain (2D Fourier transformation).
* Saliency map : IFFT of the difference w.r.t. average filtered log spectral. Kernel cross-correlator (KCC) to match.
* No offline trainning needed. Low cost, higher recall rate than DBoW2 (as shown in the paper).

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Learning Feature Descriptors using Camera Pose Supervision](https://github.com/qianqianwang68/caps), use camera pose (re-projected distance to epipolar line) error as loss function to train NN.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/>  [Kapture: Robust Image Retrieval-based Visual Localization using Kapture](https://arxiv.org/pdf/2007.13867.pdf) data-driven features. Instead of manually describing how keypoints or image descriptions should look like, a large amount of data is used to train an algorithm to make this decision by itself.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/>  [Multi-View Optimization of Local Feature Geometry](https://github.com/mihaidusmanu/local-feature-refinement) Refining the geometry of local image features from multiple views without known scene or camera geometry. Optimize feature keypoints' position based on multiple views.

* Process feature extraction and feature matching steps.
* Calculate visual flow $T_{u\to v}(x_{u})$ between feature matches (as the jacobians), using CNN method.
* Perform optimization for each feature track. Residual is weighted $(x_{v} - x_{u} - T_{u\to v}(x_{u}))$

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Cross-Descriptor Visual Localization and Mapping](https://arxiv.org/pdf/2012.01377.pdf).  “translates” descriptors from one representation to another, using NN method.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/>  [Attention Guided Camera Localization](https://github.com/BingCS/AtLoc). Roughly speaking, [MapNet 2018](https://github.com/NVlabs/geomapnet) with attention.

<a name="l2019"></a>
# 2019

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [OANet](https://github.com/zjhthu/OANet) Learning Two-View Correspondences and Geometry Using Order-Aware Network. In short, GNN based feature matches outlier rejection.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [DIFL-FCL](https://github.com/HanjiangHu/DIFL-FCL) Domain-Invariant Feature Learning with Feature Consistency Loss. Train DL features which are robust to environment change (using GAN to generate train set). It may help when we are lack of real training images, while mostly it won't happen.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [Multi-Process Fusion](https://github.com/StephenHausler/Multi-Process-Fusion). Ensemble methods for image retrieval process.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Large-scale, real-time visual-inertial localization revisited](https://arxiv.org/abs/1907.00338) review of different methods, finally use [Keep it brief (paper)](https://ieeexplore.ieee.org/document/7353722/) , [my notes here (better take a look)](#lkeepbrief) for map summarization.

<a name="l2018"></a>
# 2018

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [ToDayGAN](https://arxiv.org/abs/1809.09767). Use GAN to transform night image to bright day, then use the transformed image for image retrieval task.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [Efficient adaptive non-maximal suppression algorithms for homogeneous spatial keypoint distribution](https://github.com/BAILOOL/ANMS-Codes)
* ANMS(Adaptive non-maximal suppression) based on Tree Data Structure (TDS).
* Suppression via Square Covering (SSC)

<a name="lbefore"></a>
# Before
----------------

<a name="lmstaircase"></a>
<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [SE-Sync: A Certifiably Correct Algorithm for Synchronization over the Special Euclidean Group 2017](https://arxiv.org/abs/1612.07386), [github code](https://github.com/david-m-rosen/SE-Sync).
Produce certifiably globally optimal solutions of the special Euclidean synchronization problem, using semidefinite relaxation. **This is the mathematic basis for another way to build visual map, instead of standard COLMAP--bundle adjustment SFM.**

* <u>Problem original (maximum-likelihood estimation for SE(d) synchronization)</u> the most straight forward formule of the problem:

$$
p^{*}_{MLE} = \min_{t_{i} \in R^{d}, R_{i} \in SO(d)} \sum_{(i, j) \in E} \kappa_{ij} \| R_{j} - R_{i} \tilde{R}_{ij} \|
+ \tau_{ij}\| t_{j} - t_{i} - R_{i}\tilde{t}_{ij} \|_{2}^{2}
$$

* <u>Problem (Simplified maximum-likelihood estimation)</u> simplified version of the upper problem (see the paper for $\tilde{Q}$, and if we solve [rotation average problem](#lrotationaverage), we will have $\tilde{Q} = L(\tilde{G}^{rho})$), then t could be derived directly from optimal R*:

$$
p^{*}_{MLE} = \min_{R\in SO(d)^{n}} tr(\tilde{Q}R^{T}R)
$$

* <u>Problem relaxed (Dual semidefinite relaxation for SE(d) synchronization)</u> (see [Semidefinite Programming](https://cvx-learning.readthedocs.io/en/latest/SDP/Index.html)), solve this problem, then factorize Z* to get R* (proven by theorem in paper):

$$
p^{*}_{SDP} = \min_{Z\in Sym(dn)} tr(\tilde{Q}Z), s.t. Z \succeq 0
$$

* Solve the upper relaxed problem by a further simplified <u>unconstrained</u> form:
    * hard to solve by general interior-point methods, since Z is high dimensional.
    * low-rank structure : solve a low-rank $T\in R^{r \times dn}$, s.t. $Z=Y^{T}Y$.
    * in [Stiefel manifold](https://en.wikipedia.org/wiki/Stiefel_manifold) : $Y \triangleq (Y_{1}, ..., Y_{n}), Y_{i} \in St(d, r)$.
    * decompose $\tilde{Q}$ into sparse matrices.

$$
p^{*}_{SDPLR} = \min_{Y \in St(d, r)^{n}} tr(\tilde{Q}Y^{T}Y)
$$

* Riemannian Staircase, truncated-Newton Riemannian optimization. [Global rates of convergence for nonconvex optimization on manifolds 2016](https://arxiv.org/abs/1605.08101).

```
function RiemannianStaircase(Y):
  for r = r0, ..., dn + 1 do:
    Starting at Y, apply a Riemannian optimization to identify
    a second-order critical point Y* in St(d, r)^n of the problem.
    if rank(Y*) < r then:
      return Y*
    else
      Set Y = (Y*, 0^(1*dn))
    end if
  end for
end function
```

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Efficient Non-Consecutive Feature Tracking for Robust Structure-From-Motion 2016](https://jiaya.me/papers/sfm_tip16.pdf), [github](https://github.com/zju3dv/ENFT). during with tracking fail in video sfm: consecutive point tracking (multi-homographies match) and non-consecutive track matching.

* <u>in video sfm, we better take advantage of feature tracking instead of pure descriptor based matching.</u> so we could have more long track
* segment-based ba, to handle large problem.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/><img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Keep it brief: Scalable creation of compressed localization maps 2015](https://ieeexplore.ieee.org/document/7353722/) use ILP (integral linear programming) to solve the summerization problem. (worth try) <a name="lkeepbrief"></a>

<div align="center">    
<img src="/assets/img/paperread/vision_ilp.png" width="50%"/>
</div>

My test the upper method, see [an simple example usage in github with ortools](https://github.com/yeliu-deepmirror/or-tools/blob/dm/ortools/simplify/vision_map_ilp_test.cc)
* use [google ortools](https://developers.google.com/optimization) to solve the ILP problem.
* use [SNAP](http://snap.stanford.edu/proj/snap-www/) to analysis the vision map graph.
* tried this method in our benchmarks (keep 10% the map points, mean image observations drop from 1300 to 200), the localization result dropped within 10% (90% to 80%).

<a name="ltranslationaverage"></a>
<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Robust Global Translations with 1DSfM 2014](https://www.cs.cornell.edu/projects/1dsfm/docs/1DSfM_ECCV14.pdf), depends on the relative directions between camera poses.

* <u>Problem Origin</u> (end point j could be <u>a camera or a point</u>, using squared chordal distance):

$$
{t_{k}}^{*} = \min_{t_{k} \in R^{3}} \sum_{(i, j)\in E} d_{ch}(\hat{t}_{ij}, \frac{t_{j} - t_{i}}{\|t_{j} - t_{i} \|})^{2}
$$

* Outlier removal. project the problem into 1d space (e.g. into x axis line space) -> combinatorial ordering problem - MINIMUM FEEDBACK ARC SET problem. Solve by a greedy method.
* Solve the problem using [ceres](http://ceres-solver.org/), generally converged well.
    * Robust loss : Huber fits better than Cauchy.
    * Using iterative Schur with jacobi preconditioning (PCG).
    * Reweight camera-point edge weight by ratio, to make them less influential.
* [GTSAM implementation](https://github.com/borglab/gtsam/blob/develop/gtsam/sfm/TranslationRecovery.h), [usage in GTSFM](https://github.com/borglab/gtsfm/blob/master/gtsfm/averaging/translation/averaging_1dsfm.py)
