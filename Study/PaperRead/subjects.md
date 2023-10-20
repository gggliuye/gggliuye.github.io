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
    * [PICO](#lpcio)
    * [Infrared Papers](#lxr_irpaper)
    * [Other Papers](#lxr_other)
5. [Continuous-Time Batch Calibration](#l5)
6. [Image-based Rendering - MPIs](#l6)
7. [ICCV 23](#liccv23)

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

<a name="lpcio"></a>
# 4.3 PICO

[PICO Centaur 光学追踪+裸手识别 2023](https://mp.weixin.qq.com/s/JP6ertmxXc0fF0fIPU8QMg); LED + AI HAND + IMU.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [HaMuCo hand tracking 2023](https://zxz267.github.io/HaMuCo/).
  * self-supervised from multi-view pseudo 2D labels.
  * cross-view-network following multiple single-image-network to merge multi-view result. (Designed for VR 4-cameras system)
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Decoupled Iterative Refinement Framework for Interacting Hands Reconstruction from a Single RGB Image 2023](https://arxiv.org/abs/2302.02410), for two hands reconstruction.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Reconstructing Interacting Hands with Interaction Prior from Monocular Images 2023](https://arxiv.org/abs/2308.14082), for two hands reconstruction.
* Data [Realistic Full-Body Tracking from Sparse Observations via Joint-Level Modeling](https://arxiv.org/abs/2308.08855).
* XR body recovery.

<a name="lxr_irpaper"></a>
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

<img src="/assets/img/paperread/thumbs.png" height="25"/> [PS Move API: A Cross-Platform 6DoF Tracking Framework 2013](https://publik.tuwien.ac.at/files/PubDat_218820.pdf), with a more detailed version [Cross-Platform Tracking of a 6DoF Motion Controller 2012](https://publik.tuwien.ac.at/files/PubDat_214197.pdf). developed for [PS Move Motion Controller](https://www.playstation.com/en-us/accessories/playstation-move-motion-controller/): single large LED blob tracking.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Kinectrack: Agile 6-DoF Tracking Using a Projected Dot Pattern 2012](https://sci-hub.ru/https://ieeexplore.ieee.org/abstract/document/6402533/). plannar IR pattern: 4 points -> quads -> kites. Kites have a perspective-invariant signature, used to match and compute pose.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Affordable infrared-optical pose-tracking for virtual and augmented reality 2007](https://www.academia.edu/download/42322622/Affordable_infrared-optical_pose-trackin20160207-26197-1usom1p.pdf). multi-view construction, then 3d model fit (maximum-clique search) to get pose.

<a name="lxr_other"></a>
## 4.4 Other Papers

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Efficient 6-DoF Tracking of Handheld Objects from an Egocentric Viewpoint 2018](https://openaccess.thecvf.com/content_ECCV_2018/papers/Rohit_Pandey_Efficient_6-DoF_Tracking_ECCV_2018_paper.pdf). Image based 3d position & 6 dof pose.
* [data set for hand hold objects](https://sites.google.com/view/hmd-controller-dataset). <n>the data set might be useful</n>.
* Model based on Single Shot Multibox Detector (SSD). Intuition : users’ hands and arms provide excellent context.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [1 euro Filter: A Simple Speed-based Low-pass Filter for Noisy Input in Interactive Systems 2012](https://inria.hal.science/hal-00670496/document), here for an implementation [One Euro Filter](https://jaantollander.com/post/noise-filtering-using-one-euro-filter/). Lower jitter at low speed, lower lag at high speed.

$$
\alpha = \frac{1}{1 + \frac{\tau}{T_{e}}}, \tau = \frac{1}{2\pi + f_{c}}, f_{c} = f_{c_min} + \beta \| \dot{\hat{X_{i}}} \|
$$

$$
\hat{X_{i}} = (X_{i} + \frac{\tau}{T_{e}} \hat{X_{i - 1}}) \frac{1}{1 + \frac{\tau}{T_{e}}}
$$

[Monado’s hand tracking](https://monado.freedesktop.org/handtracking), [stream app](https://store.steampowered.com/app/2317150/Monado_Hand_Tracking/):
* [post machine learning hand pose](https://www.collabora.com/news-and-blog/blog/2021/04/20/continuous-3d-hand-pose-tracking-using-machine-learning-and-monado-openxr/), [project gitlab](https://gitlab.collabora.com/col0047/openxr-hand-tracking-example). multi-stage neural network-based solution.
* [post Bag of freebies](https://www.collabora.com/news-and-blog/blog/2021/06/17/bag-of-freebies-xr-hand-tracking-machine-learning-openxr/), [pretrained model gitlab](https://gitlab.collabora.com/col0047/hand-detection).
  * Data augmentation + Noisy Student Training, a semi-supervised learning approach.
  * Architecture inspired by the YOLOv4 architecture
* [post monado hand tracking](https://www.collabora.com/news-and-blog/blog/2022/05/31/monado-hand-tracking-hand-waving-our-way-towards-a-first-attempt/), fits with the ethos of [libsurvive](https://github.com/cntools/libsurvive). using [One Euro Filter](https://jaantollander.com/post/noise-filtering-using-one-euro-filter/). using [MediaPipe](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker).
  * [MediaPipe samples](https://github.com/googlesamples/mediapipe/tree/main/examples/hand_landmarker)， [MediaPipe c++](https://developers.google.com/mediapipe/framework/getting_started/hello_world_cpp.md).


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
# 6. Image-based Rendering - MPIs

Some References:
* [Image-based Rendering](https://wiki.davidl.me/view/Image-based_rendering).
* [TUM AI Lecture Series - Image-based Rendering](/Study/PaperRead/tum_ai/#libr).

**Implicit Representations (Light Field - Plenoptic Function)** - using position & direction of each pixel (5-dim), to get its color, depth and other meta-information. [My Neural Rendering Notes](/Study/PaperRead/3d_reconstruction/#lneural_r)

<img style="float: right;" src="/assets/img/paperread/lumigraph.png" width="25%"/>

* [Light Field Traditional](https://wiki.davidl.me/view/Light_field) stores as a grid of images or videos - <u>Holographic Stereograms</u> 4d light field embedded in 2d sensors (~fly eyes) - [Light Fields 101 - SVVR 2016](https://www.youtube.com/watch?v=BXdKVisWAco). <u>Light Field could product better VR image than ray tracing</u>.
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [The Plenoptic Function and the Elements of Early Vision 1991](http://persci.mit.edu/pub_pdfs/elements91.pdf)
  * <img src="/assets/img/paperread/thumbs.png" height="25"/> [The Lumigraph 1996](https://dash.harvard.edu/bitstream/handle/1/2634291/Gortler_Lumigraph.pdf?sequence=2&isAllowed=y), [Light Field Rendering 1996](https://graphics.stanford.edu/papers/light/). 4D representation (since cameras sit in a plane) : (s, t) ~ position, (u, v) ~ direction.
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [Dynamically Reparameterized Light Fields 2000](http://www.cs.harvard.edu/~sjg/papers/drlf.pdf), [video explain](https://www.youtube.com/watch?v=p2w1DNkITI8), [video demo](https://www.youtube.com/watch?v=msNVZT3USEM).
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [Plenopticam 2019](http://www.plenoptic.info/index.html), [github](https://github.com/hahnec/plenopticam).
  * Light Field Camera [Lytro](https://en.wikipedia.org/wiki/Lytro).
* [Light Field Networks & NERF](/Study/PaperRead/3d_reconstruction/#lneural_r) method to render new views.
  * Light Field: you directly predict colors from light rays. [Deep blending 2018](http://visual.cs.ucl.ac.uk/pubs/deepblending/), [Free View Synthesis 2020](http://vladlen.info/publications/free-view-synthesis/).
  * NERF: performing volume rendering (integration along the ray).


**Layered Representations**:
* Depth - Interpolation of RGBD images:
  * Apple [View Interpolation for Image Synthesis 1993](https://cseweb.ucsd.edu/~ravir/6998/papers/p279-chen.pdf), similar to image morphing.
    * (1) <u>establishes the correspondence between two images</u> (hard part); (2) use the mapping to interpolate the shape of each image toward the other (~ cv::remap).
    * this paper uses the camera transformation and image range data to automatically determine the correspondence.
      * quadtree block compression of pixels for parallel processing.
  * [Layered Depth Image 1998](https://grail.cs.washington.edu/projects/ldi/)
  * Sprites with Depth: overlapping depth images.
  * [Virtual Viewpoint Video 2004](https://www.youtube.com/watch?v=WYezwsFfxvE), render bullet time video.
    * extand boundary to create better (blending) effect.
* Aspen Movie Map (1978)
* Apple [QuickTime VR – An Image-Based Approach to Virtual Environment Navigation 1995](https://cseweb.ucsd.edu/~ravir/6998/papers/p29-chen.pdf), 360 video based image walkthrough, while the viewpoint is fixed.

<img style="float: right;" src="/assets/img/paperread/mpis_inv.jpg" width="30%"/>

**Multi-Plane Images (MPIs)**:
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
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Stereo Magnification: Learning View Synthesis using Multiplane Images 2018](https://tinghuiz.github.io/projects/mpi/), MPIs with stereo input. [Single-view view synthesis with multiplane images 2020](https://single-view-mpi.github.io/) (32-layers), [github](https://github.com/google-research/google-research/tree/master/single_view_mpi), predict the mutli-plane images from single image. using colmap sparse point cloud and target image (from online videos) to train. <img src="/assets/img/paperread/chrown.png" height="25"/> [Single-View View Synthesis in the Wild with Learned Adaptive Multiplane Images 2022](https://github.com/yxuhan/AdaMPI) (8-64 layers, <h>pretrained 32&64 are available</h>). trained in wild dataset (COCO) (by mono-depth wrapped images).

<figure align="center">
  <img src="/assets/img/paperread/mpi_view_test.gif" width="50%"/>
  <figcaption>Single-view view synthesis test with deepmirror office.</figcaption>
</figure>

<figure align="center">
  <img src="https://github.com/yeliu-deepmirror/AdaMPI/raw/master/images/adampi.gif" width="50%"/>
  <figcaption>AdaMPI test with online image.</figcaption>
</figure>

* <img src="/assets/img/paperread/thumbs.png" height="25"/> [SynSin: End-to-end View Synthesis from a Single Image 2019](https://arxiv.org/abs/1912.08804) with depth feature, and network to merge images.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [DeepView View Synthesis with Learned Gradient Descent 2019](https://augmentedperception.github.io/deepview/), multi-view to MPIs, <n>too hard to train, hanged by Google</n>.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [MatryODShka: Real-time 6DoF Video View Synthesis using Multi-Sphere Images 2020](https://arxiv.org/abs/2008.06534), [github](https://github.com/brownvc/matryodshka). conert stereo 360 to MPIs.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [MINE: Towards Continuous Depth MPI with NeRF for Novel View Synthesis 2021](https://vincentfung13.github.io/projects/mine/), multi-plane volume render.
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [NeX: Real-time View Synthesis with Neural Basis Expansion 2021](https://github.com/nex-mpi/nex-code) (192-layers, with 16 texture images), parameterizing each pixel as a linear combination of basis functions (based on view angle) learned from a neural network.
  * 192-layers, with 16 texture images, too large memory.
  * 17 images scene took 18h to train, trainning slow, limit its use case.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Real-Time Neural Character Rendering with Pose-Guided Multiplane Images 2022](https://github.com/ken-ouyang/PGMPI), use image-to-image translation paradigm.
* <img src="/assets/img/paperread/chrown0.png" height="25"/> Apple [Generative Multiplane Images 2022](https://xiaoming-zhao.github.io/projects/gmpi/) (32-layers) but only has pre-trained model for face dataset. (<n>Apple might use this for Vision pro 3d photo</n>)
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Structural Multiplane Image 2023](https://github.com/mf-zhang/Structural-MPI), planes made based on planar 3D reconstruction of the scene.
  * since planes could intersect, need to order the render sequence for each pixel - **slow**.

**MPIs Final choice** : [Single-View View Synthesis in the Wild with Learned Adaptive Multiplane Images 2022](https://github.com/yxuhan/AdaMPI), [our version](https://github.com/yeliu-deepmirror/AdaMPI), (Single-view view synthesis with rgbd trained on COCO). Could run on VR & Phone.
* Use rbgd as input, predict density 𝜎 for each plane instead of alpha 𝛼 .
* *Plane Adjustment Network*. arranging each MPI plane at an appropriate (pre-defined) depth to represent the scene.
* *Radiance Prediction Network*. predicts the color 𝑐 𝑖 and density 𝜎 𝑖 for each plane at 𝑑 𝑖 .
* Train using single image : supervised by RGBD wrapping + Hole filling network.
* TODO: <n>supervision by youtube videos</n>.
* TODO: <n>single view 3D gaussian splitting might help?</n>.
* Implementation (Phone version & Pico version) of a OpenGLES shared based MIP visualizer.

<div align="center">    
<iframe src="//player.bilibili.com/player.html?aid=321195337&bvid=BV1Dw411e7QE&cid=1272450395&p=1" width="50%" height="300" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

<a name="liccv23"></a>
# 7. ICCV 23

[ICCV'23 Robot Learning & SLAM Workshop](https://www.youtube.com/playlist?list=PLLUUYtjRHf8NkQ03nLP6V16iPiEm7atmu)

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Marc Pollefeys: Visual Localization and Mapping From Classical to Modern](https://youtu.be/15U8qwFcL24?si=m3mylnIPg6-AeHni) SFM & Visual Localization. [3DV 2024](https://3dvconf.github.io/2024/).
* Point Features:
  * [PixLoc 2021](https://github.com/cvg/pixloc) end-to-end learn from pose loss.
  * [Pixel-Perfect SFM 2021](https://github.com/cvg/pixel-perfect-sfm) refine 2d feature position by dense NN descriptor.
  * [LightGlue 2023](https://github.com/cvg/LightGlue)
* Privacy-Preserving Geometric Computer Vision.
* Line Features: [DeepLSD 2023](https://github.com/cvg/DeepLSD), [GlueSticks 2023](https://github.com/cvg/GlueStick) -> [LiMap 2023](https://github.com/cvg/limap).
* [LaMAR 2022](https://lamar.ethz.ch/) AR Benchmarking.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Maurice Fallon: Robust Multi-Sensor SLAM with Learning and Sensor Fusion](https://youtu.be/hRs4a1wqnUE?si=JJQI9kVSs6dzkAmx). 3 camera + lidar system.
* **Lidar-Visual Odometry**:
  * [VILENS 2021](https://arxiv.org/abs/2107.07243), joint optimization of lidar & visual & imu resiudals.
  * [Hilti-Oxford SLAM Dataset 2023](https://hilti-challenge.com/index.html).
* [InstaLoc 2023](https://arxiv.org/abs/2305.09552) through *dense lidar* semantic instances matching.
* [NavLive 2022](https://www.navlive.co.uk/)
* <img src="/assets/img/paperread/chrown0.png" height="25"/> **Lidar Vision NeRF**.
  * Lidar-Camera Calibration - [Extrinsic Calibration of Camera to LIDAR using a **Differentiable Checkerboard Model** 2023].
  * [SiLVR : Scalable Lidar-Visual Reconstruction with Neural Radiance Fields 2023] nerf + lidar depth + lidar normal.
* **SLAM + LLMs** : [Language-EXtended Indoor SLAM (LEXIS) 2023](https://arxiv.org/abs/2309.15065) building semantically rich visual maps with LLMs, based on [CLIP](https://github.com/openai/CLIP).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Luca Carlone: From SLAM to Spatial Perception](https://youtu.be/jDume0pA2-Q?si=ASxhNdJt9P7mSyPk). hierarchical representations, certifiable algorithms, and self-supervised learning.
* Scene Map : [Kimera: Real-time Metric-Semantic SLAM 2021](https://github.com/MIT-SPARK/Kimera). 3D scene underestanding : semantics (**objects, agents, sounds, etc**), relations. [Kimera-Multi 2023](https://github.com/MIT-SPARK/Kimera-Multi), multi-robots.
* <img src="/assets/img/paperread/chrown0.png" height="25"/> Robustness : **Certifiable algorithms** compute an estimate and either certify its optimality, or detect failure. [Kimera-RPGO](https://github.com/MIT-SPARK/Kimera-RPGO)
  * [ROBIN 2023](https://github.com/MIT-SPARK/ROBIN) based on graph theory to find large sets of compatible measurements and prune gross outliers (used in [TEASER++ 2020](https://github.com/MIT-SPARK/TEASER-plusplus)).
  * [GNC + ADAPT 2021](https://github.com/MIT-SPARK/GNC-and-ADAPT) graduated non-convexity (to reduce non-convexity of the optimization).
  * [Certifiable Outlier-Robust Geometric Perception 2022](https://github.com/MIT-SPARK/CertifiablyRobustPerception) semidefinite moment relaxations.
  * Self-supervised Learning for Certification.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Chen Wang: Imperative SLAM and PyPose Library for Robot Learning](https://youtu.be/_j5tJFC-Gbk?si=LT7GsrC-LnZ-ngJU), [Imperative SLAM 2023](https://sairlab.org/iSLAM/). Take back-end optimization as a supervision signal for the front-end. [PyPose](https://pypose.org/).

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Andrew Davison: Distributed Estimation and Learning for Robotics](https://youtu.be/1pw8xGlWkqI?si=hqQE_grS56dbofqW), [see here for related lecture](/Study/PaperRead/tum_ai/#lAndrew).
* Reason for the thoughts: (1) Hardware: map the algorithm blocks to hardware; (2) Multi-robot systems.
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Gaussian Belief Propagation](https://gaussianbp.github.io/).
* Robot Web.
  * Multi-robot localization using Gaussian Belief Propagation.
  * Multi-robot planning using Gaussian Belief Propagation.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Daniel Cremers: From Monocular SLAM to 3D Dynamic Scene Understanding](https://youtu.be/qQakQ0SZ5wI?si=WpOxk35u2apaS3aZ).
* Novel Bundle Adjustment. [Super Root BA 2021](https://arxiv.org/abs/2103.01843), [Power BA 2023](https://arxiv.org/abs/2204.12834), [github](https://github.com/NikolausDemmel/rootba).
* Direct SLAM. LSD-SLAM, DSO, DMVIO, D3VO.
* Single Image Dense Reconstruction. [MonoRec 2021](https://github.com/Brummi/MonoRec), [Density Fields for Single View 2023](https://fwmb.github.io/bts/).
* Dynamic 3D scene understanding.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Tim Barfoot: Learning Perception Components for Long Term Path Following](https://youtu.be/G8ic5IMwV_c?si=w187ubEY_h-Y9c0S).

<a name="lrelpose"></a>
<img src="/assets/img/paperread/thumbs.png" height="25"/> [Shubham Tulsiani: Probabilistic Pose Prediction](https://youtu.be/gpQuEVcbog8?si=Y_8jHDkkS-MuBd6K). Objective : 3D object reconstruction. Pose Estimation from few views. **SFM (e.g. Colmap) not robust under sparse-views**. <u>Data-driven learning method.</u>
* Direct Pose Prediction (end-to-end) try : **failed !**  <n>I think the problem might be with the pose representation, see </n> [Why NeRF work ?](/Study/PaperRead/tum_ai/#lnerf_understanding).
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [RelPose++ 2023](https://amyxlase.github.io/relpose-plus-plus/). Probabilistic Pose Prediction: predict the distribution of poses though energy-based model.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Ayoung Kim: Advancing SLAM with Learning](https://youtu.be/iIxQkmfok5Q?si=Mcy_UtRwBVhA7Ycz). (1) Lines. Line Descriptor: [LineRT 2021](https://github.com/yosungho/LineTR); (2) DL + Graph SLAM. Object SLAM : 6dof object pose estimation; (3) Thermal cameras.

[Michael Kaess: Learning for Sonar and Radar SLAM](https://youtu.be/xZn_y7TM1O8?si=dNLG-xo5JAhEg1W6). Camera fails in under-water environments.
* **Sonar** : projection without elevation. Acoustic SFM. **Epipolar contour**. **Acoustic Bundle Adjustment**.
  * Sonar Image Correspondence. DL method.
  * Imaging Sonar Dense Reconstruction.
* Radar SLAM, provide Doppler velocity also.
