---
layout: page_tree_paper
title: Other Specific Subjects
---

# Table of Contents
1. [ICP Covariance](#l1)
2. [Line Feature Mapping](#l2)
3. [DL reconstruction](#l3): map from a 3D coordinate to properties of the scene at that location. The following division is only for making the doc clearer. they are actually very close to each other.
    * [Neural Rendering](#l3.1) : the objective is mostly generating images.
    * [DL SDF](#l3.2) : the objective is the SDF (signed distance field).
    * [DL MVS](#l3.3)
4. [Autonomous Driving](#l4)
    * [HD-Map](#l4.1)
    * [Learning to Drive](#l4.2)
5. [Omnidirectional Camera](#l5)
    * [Calibration](#l5.1)
    * [Anti-Aliasing](#l5.2)
    * [Reconstruction](#l5.3)
6. [Infrared 6dof](#l6)

<p/><p/>

<a name="l1"></a>
# 1. ICP Covariance

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
# 2. Line Feature Mapping

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [UV-SLAM: Unconstrained Line-based SLAM Using Vanishing Points for Structural Mapping 2021](https://arxiv.org/abs/2112.13515). using vanishing points for structural mapping, to avoid degeneracy in Plucker representation.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [structure-from-motion using lines : representation triangulation and bundle adjustment 2005](https://hal.archives-ouvertes.fr/hal-00092589/document), based on [Plucker representation](https://en.wikipedia.org/wiki/Pl%C3%BCcker_coordinates) of the line (by two points or two planes: the direction of the line, and the moment). The paper proposed a **Orthonormal Representation** of lines, takes only 4 dof (three from SO(3) and one from SO(2)), make it easier for optimization.

* *Used this factorization in our project, it performs well.* But in actually localization applications, point feature is much more robust than this method.
* this should fits better for traffic lanes mapping, with fixed poses.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [impact of landmark parameterization on monocular ekf-slam with points and lines 2010](https://www.researchgate.net/publication/41182046_Impact_of_Landmark_Parametrization_on_Monocular_EKF-SLAM_with_Points_and_Lines) Project lines into camera image space.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [PL-SLAM: a Stereo SLAM System through the Combination of Points and Line Segments 2017](https://arxiv.org/abs/1705.09479). Using the orthonormal representation of lines, and 3d point representation of points, to process visual slam (basicly ORBSLAM2 structure). And the first paper to derivative the line jacobians with detail.

<a name="l3"></a>
# 3. DL reconstruction

<a name="l3.1"></a>
## 3.1 Neural Rendering

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [LENS: Localization enhanced by NeRF synthesis 2021](https://arxiv.org/abs/2110.06558) use [Nerf in the Wild](#lnerfw) to perform data incrementation, for trainning a pose regressor.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields 2021](https://jonbarron.info/mipnerf/), [paper](https://arxiv.org/pdf/2103.13415.pdf), [github](https://github.com/google/mipnerf).
* Nerf : can cause excessive blurring and aliasing.
* Mip-NeRF: casting a **cone** from each pixel. <u>integrated positional encoding (IPE)</u> by each conical frustum (instead of position in Nerf).

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Depth-supervised NeRF: Fewer Views and Faster Training for Free 2021](https://www.cs.cmu.edu/~dsnerf/) with probabilisitic COLMAP depth supervision. [github loss](https://github.com/dunbar12138/DSNeRF/blob/main/loss.py):
```
loss = -torch.log(weights) * torch.exp(-(z_vals - depths[:,None]) ** 2 / (2 * err)) * dists
```
(I made this update with [NERF PL](https://github.com/yeliu-deepmirror/nerf_pl), no much improvement found. But I used linear loss, since our depths are from relible lidar. **TODO**)

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

<div align="center">    
<img src="https://github.com/yeliu-deepmirror/nerf_pl/raw/e4037569ad3bf6e32177cfaf0961522d1425a23d/docs/demo.gif" width="95%"/>
</div>

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
## 3.3 DL MVS

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [PatchmatchNet: Learned Multi-View Patchmatch Stereo](https://openaccess.thecvf.com/content/CVPR2021/papers/Wang_PatchmatchNet_Learned_Multi-View_Patchmatch_Stereo_CVPR_2021_paper.pdf), [github](https://github.com/FangjinhuaWang/PatchmatchNet)

<a name="l4"></a>
# 4. Autonomous Driving

<a name="l4.1"></a>
## 4.1 HD-Map

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [High-Definition Map Generation Technologies For Autonomous Driving 2022](https://arxiv.org/abs/2206.05400)

<div align="center">    
<img src="/assets/img/paperread/hd_map.png" width="50%"/>
</div>

* Data collection methods.
* Point cloud map generation methods. Better see [Lidar mapping algorithm papers](../lidar_mapping).
* Feature extraction methods for HD maps.
    * Road Network Extraction:
        * 2D Aerial Images : segmentation-based, iterative graph growing, and graph-generation methods.
        * 3D Point Clouds (using segmentation).
        * Sensor Fusion Methods : use both pcls, (aerial/car) images, GPS trajectories.
    * Road Markings Extraction : 2D (aerial/car) images or 3D point clouds (bottom-up method and top-down method).
    * Pole-like Objects Extraction: usually based on segmentation and classification on MLS 3D point clouds
* Framework for HD maps:
    * Lanelet2 : physical layer (points and lines), relational layer, and topological layer.
    * OpenDRIVE : reference line/road (various geometric primitives), lane, and features.
    * Apollo Maps : uses points. Road, Intersection, Traffic signal, Logical relationship & Others.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Computing Systems for Autonomous Driving: State-of-the-Art and Challenges 2020](https://arxiv.org/pdf/2009.14349.pdf). focus on hardware side.

<div align="center">    
<img src="/assets/img/paperread/car_compute_system.png" width="75%"/>
</div>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Towards End-to-End Lane Detection: an Instance Segmentation Approach 2018](https://arxiv.org/abs/1802.05591), [github](https://github.com/MaybeShewill-CV/lanenet-lane-detection) lane segmentation.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Computer Recognition of Roads from Satellite Pictures 1976](https://www.academia.edu/36011344/Computer_Recognition_of_Roads_from_Satellite_Pictures)

<a name="l4.2"></a>
## 4.2 Learning to Drive

**Take advantages of [Transformers](https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)).**
* Traditional CV missions (classification, segmentation, etc) are not fit for auto-drive mission.
* Compared to ChatGPT, these models are very small. No large model in general Computer Vision yet. Or we might not be able to dig vision data from internet as NLP did - no easy 'gt' could be found.

**Make Large Dataset**: how to make large dataset for AutoDrive Mission.
* video online: no calibration, vision only, on real scale.
* mapping to get poses.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [PPGeo: Policy Pre-training for Autonomous Driving via Self-supervised Geometric Modeling 2023](https://github.com/OpenDriveLab/PPGeo).

* In the first stage, the geometric modeling framework generates pose and depth predictions simultaneously, with two consecutive frames as input.
* In the second stage, the visual encoder learns driving policy representation by predicting the future ego-motion and optimizing with the photometric error based on current visual observation only.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [ACO: Learning to Drive by Watching YouTube videos: Action-Conditioned Contrastive Policy Pretraining 2022](https://github.com/metadriverse/ACO). Use 'pseudo label of action' (made by a supervised -  Inverse dynamics model) to make a model 'learn the features that matter to the output action', which could be further transformed to other tasks.

* [data set list](https://docs.google.com/spreadsheets/d/1KNFFrfEE5q4d40uBR6MN9YtTggnv2o2AHRxGRZMgs3E/edit#gid=1708687592), [data set drive](https://mycuhk-my.sharepoint.com/personal/1155165194_link_cuhk_edu_hk/_layouts/15/onedrive.aspx?id=%2Fpersonal%2F1155165194%5Flink%5Fcuhk%5Fedu%5Fhk%2FDocuments%2Fytb%5Fdriving%5Fvideos&ga=1).
* Train with : Instance Contrastive Pair (ICP) and Action Contrastive Pair (ACP).
* Inverse dynamics : DL Dense Optical Flow [RAFT](https://github.com/princeton-vl/RAFT).

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Video PreTraining (VPT): Learning to Act by Watching Unlabeled Online Videos 2022](https://arxiv.org/abs/2206.11795), [openai page](https://openai.com/research/vpt). Learn to act by watching Minecraft game videos. **Fun!**. gets pseudo action labels from a trained <u>Inverse Dynamics Model</u>.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Momentum Contrast for Unsupervised Visual Representation Learning 2020](https://arxiv.org/abs/1911.05722), [github page](https://github.com/facebookresearch/moco). **Contrastive learning** creates supervisory labels via considering each image (instance) in the dataset forms a unique category and applies the learning objective of instance discrimination.

<a name="l5"></a>
# 5. Omnidirectional Camera

<a name="l5.1"></a>
## 5.1 Calibration

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Single View Point Omnidirectional Camera Calibration from Planar Grids 2007](https://hal.inria.fr/hal-00767674/file/omni_calib.pdf) (opencv fisheye model based on this paper).

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [A Multiple-Camera System Calibration Toolbox Using A Feature Descriptor-Based Calibration Pattern](https://people.inf.ethz.ch/pomarc/pubs/LiIROS13a.pdf) ([opencv calibration](https://docs.opencv.org/4.x/dd/d12/tutorial_omnidir_calib_main.html) based on this paper).

<a name="l5.2"></a>
## 5.2 Anti-Aliasing

Anti-Aliasing is important when converting panorama images to pinhole images.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Anti-aliasing techniques comparison](https://www.sapphirenation.net/anti-aliasing-comparison-performance-quality). [Spatial anti-aliasing](https://en.wikipedia.org/wiki/Spatial_anti-aliasing).

* [SSAA (Supersampling anti-aliasing)](https://en.wikipedia.org/wiki/Supersampling). In the objective image, pick some pixels around, project back to the original image (panorama image for our case) to get colors, and averaging.
* MSAA (Multisample anti-aliasing), boost over SSAA share the samples among different objective pixels.
* Post-process anti-aliasing: FXAA, SMAA, CMAA, etc.
* [Signal processing approach](https://en.wikipedia.org/wiki/Spatial_anti-aliasing#Signal_processing_approach_to_anti-aliasing): to greatly reduce frequencies above a certain limit, known as the Nyquist frequency.

<a name="l5.3"></a>
## 5.3 Reconstruction

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Egocentric Scene Reconstruction from an Omnidirectional Video](http://vclab.kaist.ac.kr/siggraph2022p2/), [github](https://github.com/KAIST-VCLAB/EgocentricReconstruction). Fuse per-frame depth estimates into a novel <u>spherical binoctree data structure</u> that is specifically designed to tolerate spherical depth estimation errors.

<a name="l6"></a>
# 6. Infrared 6dof

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [Robust Robotic Localization using Visible Light Positioning and Inertial Fusion 2021](https://sci-hub.ru/https://ieeexplore.ieee.org/abstract/document/9330552). using RSE-based Optical Camera Communication to decode information in large plannar LED light.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [A comparative analysis of localization algorithms for visible light communication 2021](https://sci-hub.ru/https://link.springer.com/article/10.1007/s11082-021-02751-z).

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Light-based indoor positioning systems: A review 2020](https://sci-hub.ru/https://ieeexplore.ieee.org/abstract/document/8950421/)

* <u>LEDs based method</u>. Data packets are transmitted through the optical channel using a modulation method (e.g On-Off Keying - high frequency switching of the LEDs).
  * Multiplexing to distinguish different LEDs - Time/Frequency/Orthogonal Frequency/Wavelength.
  * Positioning : Proximity/Signal Strength/Angle of Arrival/Time of Arrival
* IR
  * Oculus Rift DK2 2014: LEDs transmit their own IDs by on-off keying as a 10-bit data packet at 60Hz.
* Coded marker-based optical positioning systems.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [Indoor Positional Tracking Using Dual-Axis Rotating Laser Sweeps 2016](https://sci-hub.ru/https://ieeexplore.ieee.org/document/7520559). A base rotating with sync blinkers, and tracked object contains multiple photodiodes.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Low-cost vision-based 6-DOF MAV localization using IR beacons 2013](https://ieeexplore.ieee.org/abstract/document/6584225/). <u>Enumerate</u> all possible 2d-3d matches, filter by plane prior (order around the centroid is kept), then solve pose by PnP.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Kinectrack: Agile 6-DoF Tracking Using a Projected Dot Pattern 2012](https://sci-hub.ru/https://ieeexplore.ieee.org/abstract/document/6402533/). plannar IR pattern: 4 points -> quads -> kites. Kites have a perspective-invariant signature, used to match and compute pose.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [A Wii remote-based infrared-optical tracking system 2010](https://sci-hub.ru/https://www.sciencedirect.com/science/article/abs/pii/S1875952110000054), multi-view camerea outside-in.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Affordable infrared-optical pose-tracking for virtual and augmented reality 2007](https://www.academia.edu/download/42322622/Affordable_infrared-optical_pose-trackin20160207-26197-1usom1p.pdf). multi-view construction, then 3d model fit (maximum-clique search) to get pose.
