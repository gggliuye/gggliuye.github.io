---
layout: page_tree_paper
title: Image Detection
---


## Line Detection

**Handcrafted Line Detectors**:

* <img src="/assets/img/paperread/chrown0.png" height="25"/> [LSD 2008](https://docs.opencv.org/3.4/db/d73/classcv_1_1LineSegmentDetector.html) grows line regions, fits a rectangle to the resulting set of pixels, and finally extract a line segment.
* [EDLines 2011](https://github.com/CihanTopal/ED_Lib) grows the line regions in one direction only, orthogonal to the image gradient.

**Learned Line Detectors** :

* Wireframe : [Learning to Parse Wireframes in Images of Man-Made Environments 2018](https://arxiv.org/abs/2007.07527).
  * [ELSD : Efficient line segment detector and descriptor 2021](https://ieeexplore.ieee.org/document/9710129).
  * [TP-LSD: Tri-Points Based Line Segment Detector 2020](https://arxiv.org/abs/2009.05505), [github](https://github.com/Siyuada7/TP-LSD). uses center and offset to the endpoints representation.
  * Wireframes can be further improved through a [Deep hough-transform line priors 2020](https://arxiv.org/abs/2007.09493).
* Unsupervised :
  * [L2D2: Learnable line detector and descriptor 2021](https://ieeexplore.ieee.org/document/9665961), [github](https://github.com/hichem-abdellali/L2D2) trained from LiDAR scans.
  * [SOLD² - Self-supervised Occlusion-aware Line Description and Detection 2021](https://arxiv.org/abs/2104.03362), [github](https://github.com/cvg/SOLD2) using the homography adaptation technique initially described in SuperPoint.
* **Attraction Fields**: a dual representation of lines through an attraction field.
  * <img src="/assets/img/paperread/chrown0.png" height="25"/> [DeepLSD: Line Segment Detection and Refinement with Deep Image Gradients](https://arxiv.org/abs/2212.07766), [github](https://github.com/cvg/DeepLSD/tree/main/deeplsd/models). Decouples the *distance field* and *line orientation field*.
    * Line Segment Refinement with Optimization using **vanishing points**.



**Pose Estimation**:
* [A Stable Algebraic Camera Pose Estimation for Minimal Configurations of 2D/3D Point and Line Correspondences 2018](https://github.com/SergioRAgostinho/zhou-accv-2018)
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Structure-From-Motion Using Lines 2005](https://hal.archives-ouvertes.fr/hal-00092589/document), using [Plucker representation](https://en.wikipedia.org/wiki/Pl%C3%BCcker_coordinates), better for geometry operation. Orthonormal representation : 4-dof, better for optimization. [document](https://drive.google.com/file/d/1DD1TQvByo89JJyL_KgLCLnJ6XSu0okHp/view?usp=sharing).


## Object Detection


<img src="/assets/img/paperread/chrown0.png" height="25"/> [Nanodet 2021](https://github.com/RangiLyu/nanodet): [NanoDet doc](https://zhuanlan.zhihu.com/p/306530300), [NanoDet-Plus doc](https://zhuanlan.zhihu.com/p/449912627)
* **Label Assignment:** Assign Guidance Module with Dynamic Soft Label Assigner. (reference : [Improving Object Detection by Label Assignment Distillation 2021](https://arxiv.org/abs/2108.10520). use a teacher network to generate labels for the student).
* **Feature Fusion:** Ghost-PAN. (reference [CSPPAN](https://github.com/PaddlePaddle/PaddleDetection/blob/release/2.7/ppdet/modeling/necks/csp_pan.py))
