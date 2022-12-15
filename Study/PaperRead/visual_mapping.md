---
layout: page_tree_paper
title: Visual Mapping
---

# Table of Contents
* [2022](#l2022)
* [2021](#l2021)
* [2020](#l2020)
* [2019](#l2019)
* [2018](#l2018)
* [before](#lbefore)

<p/><p/>

# 2022 <a name="l2022"></a>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [DM-VIO: Delayed Marginalization Visual-Inertial Odometry](https://arxiv.org/abs/2201.04114) DSO-IMUS

* Multi-stage IMU initializer. Dynamic photometric weight (decrease weight for overall bad image)
* Delayed marginalization (marginalization cannot be undone, but it can be delayed)


<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Long-term Visual Map Sparsification with Heterogeneous GNN](https://arxiv.org/abs/2203.15182) use GNN to substitute the ILP method. compare with the result using [Keep it brief (paper)](https://ieeexplore.ieee.org/document/7353722/) , [my notes here (better take a look)](#lkeepbrief) for map summarization.

# 2021 <a name="l2021"></a>

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [GVINS: Tightly Coupled GNSS-Visual-Inertial Fusion for Smooth and Consistent State Estimation](https://github.com/HKUST-Aerial-Robotics/GVINS) It offers a complete model of GPS measurement. Makes fusion with GPS very solid.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [DSP-SLAM: Object Oriented SLAM with Deep Shape Priors](https://jingwenwang95.github.io/dsp-slam/) ORBSLAM2 + object tracking

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [V-SLAM: Unconstrained Line-based SLAM Using Vanishing Points for Structural Mapping](https://arxiv.org/abs/2112.13515) Plucher coordinate line only has normal residual term, cannot fix degeneracy cases (line on epipolar plane). This paper introduces a new residual based on vanishing point measurements.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Pixel-Perfect Structure-from-Motion with Featuremetric Refinement](https://arxiv.org/abs/2108.08291). [github](github.com/cvg/pixel-perfect-sfm) (1) adjust the initial keypoint locations (use CNN dense features with direct alignment); (2) refine points and camera poses.

# 2020 <a name="l2020"></a>

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

# 2019 <a name="l2019"></a>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [OANet](https://github.com/zjhthu/OANet) Learning Two-View Correspondences and Geometry Using Order-Aware Network. In short, GNN based feature matches outlier rejection.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [DIFL-FCL](https://github.com/HanjiangHu/DIFL-FCL) Domain-Invariant Feature Learning with Feature Consistency Loss. Train DL features which are robust to environment change (using GAN to generate train set). It may help when we are lack of real training images, while mostly it won't happen.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [Multi-Process Fusion](https://github.com/StephenHausler/Multi-Process-Fusion). Ensemble methods for image retrieval process.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Large-scale, real-time visual-inertial localization revisited](https://arxiv.org/abs/1907.00338) review of different methods, finally use [Keep it brief (paper)](https://ieeexplore.ieee.org/document/7353722/) , [my notes here (better take a look)](#lkeepbrief) for map summarization.

# 2018 <a name="l2018"></a>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [ToDayGAN](https://arxiv.org/abs/1809.09767). Use GAN to transform night image to bright day, then use the transformed image for image retrieval task.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [Efficient adaptive non-maximal suppression algorithms for homogeneous spatial keypoint distribution](https://github.com/BAILOOL/ANMS-Codes)
* ANMS(Adaptive non-maximal suppression) based on Tree Data Structure (TDS).
* Suppression via Square Covering (SSC)

# Before <a name="lbefore"></a>
----------------

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/><img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Keep it brief: Scalable creation of compressed localization maps](https://ieeexplore.ieee.org/document/7353722/) use ILP (integral linear programming) to solve the summerization problem. (worth try) <a name="lkeepbrief"></a>

<div align="center">    
<img src="/assets/img/paperread/vision_ilp.png" width="50%"/>
</div>

My test the upper method, see [an simple example usage in github with ortools](https://github.com/yeliu-deepmirror/or-tools/blob/dm/ortools/simplify/vision_map_ilp_test.cc)
* use [google ortools](https://developers.google.com/optimization) to solve the ILP problem.
* use [SNAP](http://snap.stanford.edu/proj/snap-www/) to analysis the vision map graph.
* tried this method in our benchmarks (keep 10% the map points, mean image observations drop from 1300 to 200), the localization result dropped within 10% (90% to 80%).
