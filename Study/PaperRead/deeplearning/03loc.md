---
layout: page_tree_paper
title: Deep Localization
---

# Table of Contents

1. [End-to-end Regression](#lend_to_end_loc)
2. [DL depth + DL flow -> Pose](#ldeep_flow)
3. [Match + Relative Pose](#ldense_match)
4. [Overhead Image localization](#laerial_loc)



<a name="lend_to_end_loc"></a>
# 1. End-to-end Regression

input image, directly return the pose (3dof/6dof).

**Pose Regression**:

* <img src="/assets/img/paperread/thumbs.png" height="25"/> [PoseNet: A Convolutional Network for Real-Time 6-DOF Camera Relocalization 2015](https://paperswithcode.com/paper/posenet-a-convolutional-network-for-real-time). Learn the scene, then produce pose for an input image.

**Geo-Localization as Classification** (GPS coordinate as label):

* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Where We Are and What We’re Looking At: Query Based Worldwide Image Geo-localization Using Hierarchies and Scenes 2023](https://arxiv.org/pdf/2303.04249.pdf), **world-wide** visual geo-localization.
  * use S2 block division (size depends on image available in block).
  * localize considering <h>16 scene and 7 hierarchies</h>.

<a name="ldeep_flow"></a>
# 2. DL depth + DL flow -> Pose

<n>why not train a network directly regress the relative pose?</n>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [DiffPoseNet: Direct Differentiable Camera Pose Estimation 2022](https://arxiv.org/pdf/2203.11174.pdf), [project page](https://prg.cs.umd.edu/DiffPoseNet).
(1) Get relative pose based on dense optical flow, and image depth.
(2) NFlowNet and Coarse PoseNet together to get fine pose.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Towards Better Generalization: Joint Depth-Pose Learning without PoseNet 2020](https://openaccess.thecvf.com/content_CVPR_2020/html/Zhao_Towards_Better_Generalization_Joint_Depth-Pose_Learning_Without_PoseNet_CVPR_2020_paper.html). DeepFlow -> compute fundamental matrix. -> sparse pcl -> Rescale DeepDepth result.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Unsupervised Learning of Monocular Depth Estimation and Visual Odometry with Deep Feature Reconstruction 2018](https://arxiv.org/abs/1803.03893).

<a name="ldense_match"></a>
# 3. Match + (Relative) Pose

## 3.1 Dense Image 2d Matching

* Map: images with poses.
* Query Pipeline: Retrieval + Match Features + Relative Poses + Pose Averaging -> Query Camera Pose.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [DKM: Dense Kernelized Feature Matching for Geometry Estimation 2023](https://parskatt.github.io/DKM/). directly output points matches with two input images.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [LoFTR: Detector-Free Local Feature Matching with Transformers 2021](https://zju3dv.github.io/loftr/). directly output points matches with two input images.

## 3.2 Image-Scene 2d-3d Matching

**Scene Coordinate Regression**:

<img src="/assets/img/paperread/chrown.png" height="25"/> [Accelerated Coordinate Encoding 2023](https://nianticlabs.github.io/ace/). From Niantic, small scene localization using DL method - fast and high accuracy. Fits well to Niantic's [LightShip](https://lightship.dev/docs/ardk/index.html) (small region vlp around landmarks). <n>Intuition is that each image patch corresponds to a 3d point in scene.</n>
  * predict a 3d scene coordinate for each input image patch, then apply PNP ransac for pose estimation.
  * accelerate the trainning loop, compare to [DSAC*](https://github.com/vislearn/dsacstar).
  * For few-shot mapping: <n>use the encoder to get descriptors for each image patch, following by NN match + Triangulation to get 3d position. Use NN to find corresponding 3d points by descriptors.</n>. [ace encoder test](https://github.com/yeliu-deepmirror/ace#encoder-test)

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Learning to Detect Scene Landmarks for Camera Localization 2022](https://openaccess.thecvf.com/content/CVPR2022/papers/Do_Learning_To_Detect_Scene_Landmarks_for_Camera_Localization_CVPR_2022_paper.pdf), [github](https://github.com/microsoft/SceneLandmarkLocalization). predict 2d localization of a predefined scene landmark (predict heat map for each scene landmark).

<div align="center">    
<img src="/assets/img/paperread/learnlandmark.png" width="50%"/>
</div>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Visual Camera Re-Localization from RGB and RGB-D Images Using DSAC 2021](https://arxiv.org/pdf/2002.12324.pdf). predict scene coordinates, i.e. dense correspondences between the input image and 3D scene space of the environment.

<a name="laerial_loc"></a>
# 4. Overhead Image localization

**global image descriptor-based** (limited by sampling density of satellite images, mostly need panorama image as input):
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Spatialaware feature aggregation for image based cross-view geolocalization 2019](https://proceedings.neurips.cc/paper_files/paper/2019/file/ba2f0015122a5955f8b3a50240fb91b2-Paper.pdf) panorama - aerial image, localization (with <u>north direction known</u>). **global descriptor retrieval**.
  * use **<h>regular polar transform</h>** to warp an aerial image such that its domain is closer to that of a ground-view panorama.
  * **<h>SAFA</h>**: Spatial-aware Feature Aggregation with an attention mechanism.
  * require reference image at <u>the same (close) location</u> inside database.
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [VIGOR: Crossview image geo-localization beyond one-to-one retrieval 2021](https://arxiv.org/abs/2011.12172), [github](https://github.com/Jeff-Zilence/VIGOR). panorama - aerial image, localization.
  * has **<h>coarse-to-fine</h>** :
    * global descriptor image retrieval.
    * within-image calibration (using a MLP to predict offset from descriptors).
  * it **<h>beyond one-to-one</h>**: re-weight the embeddings in accordance with their positions.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Visual cross-view metric localization with dense uncertainty estimates 2022](https://arxiv.org/abs/2208.08519). use raw aerial image to refine pose, after global retrieval.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Accurate 3-dof camera geo-localization via ground-to-satellite image matching 2022](https://arxiv.org/abs/2203.14148), use both <u>polar transform and the projective transform</u>.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [SliceMatch: Geometry-guided Aggregation for Cross-View Pose Estimation 2023](https://arxiv.org/pdf/2211.14651.pdf). compute <h>column-wise-slice image descriptors</h>, to enable return orientation.


**dense pixel-level feature-based** (using the geometric relationship - as camera pose optimization):
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Beyond Cross-view Image Retrieval: Highly Accurate Vehicle Localization Using Satellite Image 2022](https://arxiv.org/abs/2204.04752), [github](https://github.com/shiyujiao/HighlyAccurate). Given a coarse initial estimation, optimize pose based on **<h>the projection error</h>** of the satellite deep features to a ground viewpoint.
  * 3d point reprojection error, using coarse-to-fine LM.
  * <u>setting all the points in ground image on ground</u> (to have 3d points).
  * pose error as the trainning loss.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Satellite Image Based Cross-view Localization for Autonomous Vehicle 2023](https://arxiv.org/abs/2207.13506), the same pipeline as upper paper, but with more refinement.
* <img src="/assets/img/paperread/chrown.png" height="25"/> [OrienterNet: Visual Localization in 2D Public Maps with Neural Matching 2023](https://arxiv.org/pdf/2304.02009v1.pdf), **<h>ETH, META</h>**.
  1. Bird’s-Eye View inference (given height & gravity), encode input image to BEV.
  2. Map encoding, encode the raster map (from OSM).
  3. BEV-map matching, to get 3dof (x,y,yaw) pose.

<n>Can we give an encoded id to each building in city, and use them to localize query image?</n>
