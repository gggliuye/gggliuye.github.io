---
layout: page_tree_paper
title: Other Specific Subjects
---

# Table of Contents
1. [ICP Covariance](#l1)
2. [Line Feature Mapping](#l2)
3. [Omnidirectional Camera](#l3)
    * [Calibration](#l3.1)
    * [Anti-Aliasing](#l3.2)
    * [Reconstruction](#l3.3)
4. [XR Hand](#l4)
    * [Meta](#l4.1)
    * [Apple](#l4.2)
    * [Infrared Papers](#l4.3)
5. [Continuous-Time Batch Calibration](#l5)
6. [Image-based Rendering](#l6)

<p/><p/>

<a name="l1"></a>
# 1. ICP Covariance

**ICP error source**:

* wrong convergence (to local minimial), error of the initial pose estimation.
* under-constrainted situation: the problem is indeterminted.
* miss match.
* sensor noise.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [An accurate closed-form estimate of ICP's covariance 2007](https://ieeexplore.ieee.org/document/4209579). Use hessien matrix as the estimation of the covariance (but this method in some cases greatly over-estimates thte true covariance):

$$
cov(\hat{x}) \approx 2\frac{residual}{K-3} [\frac{\partial^{2}}{\partial x^{2}}residual]^{-1}
$$

This paper develop the following closed-form method :

$$
cov(x) \approx [\frac{\partial^{2}}{\partial x^{2}}J]^{-1} [\frac{\partial^{2}}{\partial z\partial x}J]^{T} cov(z) [\frac{\partial^{2}}{\partial z\partial x}J] [\frac{\partial^{2}}{\partial x^{2}}J]^{-1}
$$

<img src="/assets/img/paperread/thumbs.png" height="25"/> [A Closed-form Estimate of 3D ICP Covariance 2015](https://sites.google.com/site/icpcovariance/). Based on the upper paper, and solve for point-to-point case.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [On the Covariance of ICP-based Scan-matching Techniques 2016](https://arxiv.org/abs/1410.7632). Analysis the upper hessien based method. Find that the upper method fit for point-to-plane icp, but not for point-to-point icp.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [A New Approach to 3D ICP Covariance Estimation 2019](https://arxiv.org/abs/1909.05722). Add an additional term for the covariance from the initial pose estimation.

<a name="l2"></a>
# 2. Line Feature Mapping

<img src="/assets/img/paperread/chrown.png" height="25"/> [3D Line Mapping Revisited 2023](https://arxiv.org/abs/2303.17504), [github](https://github.com/cvg/limap). [my version with colmap interface](https://github.com/yeliu-deepmirror/limap). **ETH, <h>STATE-OF-ART</h>**. line mapping using sfm result (camera poses & world points).

<div align="center">    
<img src="/assets/img/paperread/limap.png" width="75%"/>
</div>

1. Line Proposal : line match -> <h>point-guided line triangulation</h> (to overcome degenerate cases).
  * using [Orthonormal Representation](#lorth_line).
  * line feature : [DeepLSD](https://github.com/cvg/DeepLSD), descriptors : [LineTR](https://github.com/yosungho/LineTR).
  * line matcher : [GlueStick](https://github.com/cvg/GlueStick)(superglue for lines).
2. Proposal Scoring & Track Association.
3. Joint Optimization.
4. <u>Test localization in our benchmark, no improvement seen</u> ([more details in my repo](https://github.com/yeliu-deepmirror/limap)).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [UV-SLAM: Unconstrained Line-based SLAM Using Vanishing Points for Structural Mapping 2021](https://arxiv.org/abs/2112.13515). using vanishing points for structural mapping, to avoid degeneracy in Plucker representation.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [PL-SLAM: a Stereo SLAM System through the Combination of Points and Line Segments 2017](https://arxiv.org/abs/1705.09479). Using the orthonormal representation of lines, and 3d point representation of points, to process visual slam (basicly ORBSLAM2 structure). And the first paper to derivative the line jacobians with detail.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [impact of landmark parameterization on monocular ekf-slam with points and lines 2010](https://www.researchgate.net/publication/41182046_Impact_of_Landmark_Parametrization_on_Monocular_EKF-SLAM_with_Points_and_Lines) Project lines into camera image space.

<a name="lorth_line"></a>
<img src="/assets/img/paperread/chrown.png" height="25"/> [structure-from-motion using lines : representation triangulation and bundle adjustment 2005](https://hal.archives-ouvertes.fr/hal-00092589/document), based on [Plucker representation](https://en.wikipedia.org/wiki/Pl%C3%BCcker_coordinates) of the line (by two points or two planes: the direction of the line, and the moment). The paper proposed a **Orthonormal Representation** of lines, takes only 4 dof (three from SO(3) and one from SO(2)), make it easier for optimization.

* *Used this factorization in our project, it performs well.* But in actually localization applications, point feature is much more robust than this method.
* this should fits better for traffic lanes mapping, with fixed poses.

<a name="l3"></a>
# 3. Omnidirectional Camera

<a name="l3.1"></a>
## 3.1 Calibration

<img src="/assets/img/paperread/chrown.png" height="25"/> [Single View Point Omnidirectional Camera Calibration from Planar Grids 2007](https://hal.inria.fr/hal-00767674/file/omni_calib.pdf) (opencv fisheye model based on this paper).

<img src="/assets/img/paperread/chrown.png" height="25"/> [A Multiple-Camera System Calibration Toolbox Using A Feature Descriptor-Based Calibration Pattern](https://people.inf.ethz.ch/pomarc/pubs/LiIROS13a.pdf) ([opencv calibration](https://docs.opencv.org/4.x/dd/d12/tutorial_omnidir_calib_main.html) based on this paper).

<a name="l3.2"></a>
## 3.2 Anti-Aliasing

Anti-Aliasing is important when converting panorama images to pinhole images.

<img src="/assets/img/paperread/chrown.png" height="25"/> [Anti-aliasing techniques comparison](https://www.sapphirenation.net/anti-aliasing-comparison-performance-quality). [Spatial anti-aliasing](https://en.wikipedia.org/wiki/Spatial_anti-aliasing).

* [SSAA (Supersampling anti-aliasing)](https://en.wikipedia.org/wiki/Supersampling). In the objective image, pick some pixels around, project back to the original image (panorama image for our case) to get colors, and averaging.
* MSAA (Multisample anti-aliasing), boost over SSAA share the samples among different objective pixels.
* Post-process anti-aliasing: FXAA, SMAA, CMAA, etc.
* [Signal processing approach](https://en.wikipedia.org/wiki/Spatial_anti-aliasing#Signal_processing_approach_to_anti-aliasing): to greatly reduce frequencies above a certain limit, known as the Nyquist frequency.

<a name="l3.3"></a>
## 3.3 Reconstruction

<img src="/assets/img/paperread/chrown.png" height="25"/> [Egocentric Scene Reconstruction from an Omnidirectional Video](http://vclab.kaist.ac.kr/siggraph2022p2/), [github](https://github.com/KAIST-VCLAB/EgocentricReconstruction). Fuse per-frame depth estimates into a novel <u>spherical binoctree data structure</u> that is specifically designed to tolerate spherical depth estimation errors.

<a name="l4"></a>
# 4. XR Hand

<a name="l4.1"></a>
## 4.1 Meta

<img src="/assets/img/paperread/chrown.png" height="25"/> [META blogs 2019](https://developer.oculus.com/blog/)
* [Blob segmentation](https://developer.oculus.com/blog/increasing-fidelity-with-constellation-tracked-controllers/)
  * Image pyramids to find blobs in different scale, not for all frames. to handle : separate merged blobs, detect faint blobs, center of a close blob.
  * in [noisy scene : holiday lights and trees](https://developer.oculus.com/blog/optimizing-oculus-insight-controller-tracking-to-work-in-challenging-conditions-like-near-holiday-lights/):
    * detects stationary 3D lights and reject them.
    * use CNN to validate blobs.
* [LED Matching](https://developer.oculus.com/blog/tracking-technology-explained-led-matching/).
  * “brute matching” check all the hypotheses. “proximity matching” with prior information of pose.
  * all the blobs in the four images will be collected to match.
  * develop fewer points (1 point, 2 points) match algorithms.

<div align="center">    
<img src="/assets/img/paperread/four_image_detection.png" width="85%"/>
</div>

* No more blogs released after Dec 2019, but more hand tracking updates are available.
* My implementation:

<div align="center">    
<video src="/assets/video/work/hand6dof_0512.mp4" controls="controls" width="60%"></video>
</div>

<a name="l4.2"></a>
## 4.2 Apple

[Apple Vision Pro 2023](https://www.apple.com/apple-vision-pro/)
* [Design for spatial input 2023](https://developer.apple.com/videos/play/wwdc2023/10073/).
  * eye tracking -> target. tap finger -> select. flick finger -> scroll.
  * could process complete hand tracking in some cases.

<div align="center">    
<img src="/assets/img/paperread/apple-vision-pro-gestures.webp" width="35%"/>
</div>

* [Detect Body and Hand Pose with Vision 2020](https://developer.apple.com/videos/play/wwdc2020/10653/) other people's pose.

<a name="l4.3"></a>
## 4.3 Infrared Papers

<img src="/assets/img/paperread/thumbs.png" height="25"/> [A comparative analysis of localization algorithms for visible light communication 2021](https://sci-hub.ru/https://link.springer.com/article/10.1007/s11082-021-02751-z).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Light-based indoor positioning systems: A review 2020](https://sci-hub.ru/https://ieeexplore.ieee.org/abstract/document/8950421/)

* <u>LEDs based method</u>. Data packets are transmitted through the optical channel using a modulation method (e.g On-Off Keying - high frequency switching of the LEDs).
  * Multiplexing to distinguish different LEDs - Time/Frequency/Orthogonal Frequency/Wavelength.
  * Positioning : Proximity/Signal Strength/Angle of Arrival/Time of Arrival
* IR
  * Oculus Rift DK2 2014: LEDs transmit their own IDs by on-off keying as a 10-bit data packet at 60Hz.
* Coded marker-based optical positioning systems.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Low-cost vision-based 6-DOF MAV localization using IR beacons 2013](https://ieeexplore.ieee.org/abstract/document/6584225/). <u>Enumerate</u> all possible 2d-3d matches, filter by plane prior (order around the centroid is kept), then solve pose by PnP.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Kinectrack: Agile 6-DoF Tracking Using a Projected Dot Pattern 2012](https://sci-hub.ru/https://ieeexplore.ieee.org/abstract/document/6402533/). plannar IR pattern: 4 points -> quads -> kites. Kites have a perspective-invariant signature, used to match and compute pose.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Affordable infrared-optical pose-tracking for virtual and augmented reality 2007](https://www.academia.edu/download/42322622/Affordable_infrared-optical_pose-trackin20160207-26197-1usom1p.pdf). multi-view construction, then 3d model fit (maximum-clique search) to get pose.

<a name="l5"></a>
# 5. Continuous-Time Batch Calibration

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Calibrating the Extrinsics of Multiple IMUs and of Individual Axes 2016](https://timohinzmann.com/publications/icra_2016_rehder.pdf). Add multiple IMUs based on previous works.
<img src="/assets/img/paperread/chrown0.png" height="25"/> [Unified Temporal and Spatial Calibration for Multi-Sensor Systems 2013](https://ieeexplore.ieee.org/document/6696514). Add timestamp parameter based on previous work.
<img src="/assets/img/paperread/chrown.png" height="25"/> [Continuous-Time Batch Estimation using Temporal Basis Functions 2012](https://furgalep.github.io/bib/furgale_icra12.pdf). [My Notes](https://drive.google.com/file/d/1ljcLGqWvBsvgvK5FpLo59VX7bIvHWlq2/view?usp=sharing).

Use a serial of bsplines to simulate the trajectory, since bspline is continous (if degree is high enough), the trajectory will be smooth, and could compute derivative w.r.t. time to get acceleration and angular velocity. forme the optimization problem with :
* map point observations.
* imu measurements : 2nd derivative of position, and 1st derivative of rotation.
* control input constraints.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [General Matrix Representations for B-Splines 1998](https://xiaoxingchen.github.io/2020/03/02/bspline_in_so3/general_matrix_representation_for_bsplines.pdf). used in upper papers to generate bsplines.

<a name="l6"></a>
# 6. Image-based Rendering

[Image-based Rendering](https://wiki.davidl.me/view/Image-based_rendering).
[TUM AI Lecture Series - Reconstructing the Plenoptic Function (Noah Snavely) 2020](https://www.youtube.com/watch?v=GNUpZAeBnZc).

**Layered Representations**:
* Depth - Interpolation of RGBD images:
  * Apple [View Interpolation for Image Synthesis 1993](https://cseweb.ucsd.edu/~ravir/6998/papers/p279-chen.pdf), similar to image morphing.
    * (1) <u>establishes the correspondence between two images</u> (hard part); (2) use the mapping to interpolate the shape of each image toward the other (~ cv::remap).
    * this paper uses the camera transformation and image range data to automatically determine the correspondence.
      * quadtree block compression of pixels for parallel processing.

<img style="float: right;" src="/assets/img/paperread/mpis_inv.jpg" width="30%"/>

* Multi-Plane Images (MPIs):
  * Method [python implementation](https://github.com/google-research/google-research/blob/master/single_view_mpi/libs/mpi.py):
    * warping : homography.
    * compositing of layers (1 for furthest, k for closest) :
    $$
    I = \sum_{i=1}^{k}(c_{i}\alpha_{i}\prod_{j=i+1}^{k}(1-\alpha_{j}))
    $$
    $$
    D = \sum_{i=1}^{k}(d_{i}^{-1}\alpha_{i}\prod_{j=i+1}^{k}(1-\alpha_{j}))
    $$
  * [Multiplane Camera 1937](https://en.wikipedia.org/wiki/Multiplane_camera)
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [Stereo Matching with Transparency and Matting 1998](https://szeliski.org/papers/Szeliski_StereoTransparencyMatting_IJCV99.pdf)
  * <img src="/assets/img/paperread/thumbs.png" height="25"/> [Crowdsampling The Plenoptic Function 2020](https://research.cs.cornell.edu/crowdplenoptic/), Deep Multi-plane Images. RGBA, and learnable latent feature vector (for time). render is fast. Produce more stable compare to [Nerf-Wild](/Study/PaperRead/3d_reconstruction/#lneural_r).
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [Stereo Magnification: Learning View Synthesis using Multiplane Images 2018](https://tinghuiz.github.io/projects/mpi/), MPIs with stereo input. [Single-view view synthesis with multiplane images 2020](https://single-view-mpi.github.io/), [github](https://github.com/google-research/google-research/tree/master/single_view_mpi), predict the mutli-plane images from single image. using colmap sparse point cloud and target image (from online videos) to train.
  * <img src="/assets/img/paperread/thumbs.png" height="25"/> [DeepView View Synthesis with Learned Gradient Descent 2019](https://augmentedperception.github.io/deepview/), multi-view to MPIs, <n>too hard to train, hanged by Google</n>.
  * <img src="/assets/img/paperread/thumbs.png" height="25"/> [MINE: Towards Continuous Depth MPI with NeRF for Novel View Synthesis 2021](https://vincentfung13.github.io/projects/mine/), multi-plane volume render (<n>its really not about Nerf, clout-chasing for me</n>).

* Aspen Movie Map (1978)
* Apple [QuickTime VR – An Image-Based Approach to Virtual Environment Navigation 1995](https://cseweb.ucsd.edu/~ravir/6998/papers/p29-chen.pdf), 360 video based image walkthrough, while the viewpoint is fixed.

<figure align="center">
  <img src="/assets/img/paperread/mpi_view_test.gif" width="50%"/>
  <figcaption>Single-view view synthesis test with deepmirror office.</figcaption>
</figure>

**Implicit Representations (Light Field - Plenoptic Function)** - using position & direction of each pixel (5-dim), to get its color, depth and other meta-information.

<img style="float: right;" src="/assets/img/paperread/lumigraph.png" width="25%"/>

* [Light Field Traditional](https://wiki.davidl.me/view/Light_field) stores as a grid of images or videos - <u>Holographic Stereograms</u> 4d light field embedded in 2d sensors (~fly eyes) - [Light Fields 101 - SVVR 2016](https://www.youtube.com/watch?v=BXdKVisWAco). <u>Light Field could product better VR image than ray tracing</u>.
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [The Plenoptic Function and the Elements of Early Vision 1991](http://persci.mit.edu/pub_pdfs/elements91.pdf)
  * <img src="/assets/img/paperread/thumbs.png" height="25"/> [The Lumigraph 1996](https://dash.harvard.edu/bitstream/handle/1/2634291/Gortler_Lumigraph.pdf?sequence=2&isAllowed=y), [Light Field Rendering 1996](https://graphics.stanford.edu/papers/light/). 4D representation (since cameras sit in a plane) : (s, t) ~ position, (u, v) ~ direction.
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [Dynamically Reparameterized Light Fields 2000](http://www.cs.harvard.edu/~sjg/papers/drlf.pdf), [video explain](https://www.youtube.com/watch?v=p2w1DNkITI8), [video demo](https://www.youtube.com/watch?v=msNVZT3USEM).
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [Plenopticam 2019](http://www.plenoptic.info/index.html), [github](https://github.com/hahnec/plenopticam).
  * Light Field Camera [Lytro](https://en.wikipedia.org/wiki/Lytro).
* [Light Field Networks & NERF](/Study/PaperRead/3d_reconstruction/#lneural_r) method to render new views.
    * Light Field: you directly predict colors from light rays.
    * NERF: performing volume rendering (integration along the ray).
