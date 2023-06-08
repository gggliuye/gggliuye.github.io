---
layout: page_tree_paper
title: Sensor Fusion
---

Other subjects also has sensor fusion related content, while the papers here are more specific with multi-sensor fusion.

# Table of Contents
* [Lidar Image Summary 2022](#lliodar_image)
* [2022](#l2022)
* [2021](#l2021)
* [2020](#l2020)
* [2019](#l2019)
* [2018](#l2018)
* [2017](#l2017)

<p/><p/>

# Lidar Image summary (2022) <a name="lliodar_image"></a>

we normally have two types of systems :

* lidar based : camera pose as initial estimation and as constrain. I personal perfer this one, since our system is generally lidar based.
  * project lidar to camera, and form a vio odometry system. It wastes lots of calculation, I don't think it is necessary to maintain two slam system.
  * project camera information to lidar pts, to form lidar pts constrain. This seems more reasonable to me.
* camera based : lidar project to camera to offer depth

**visual-lidar-imu (with vins vio odometry)**

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=218254323&bvid=BV1f8411t7EM&cid=839998466&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>


**visual-lidar-imu (with direct method image odometry)**

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=431405282&bvid=BV1kG411E7ZR&cid=858032689&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=261580358&bvid=BV1He411L7ti&cid=860597168&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=561599586&bvid=BV1Ye4y1v7BW&cid=860597007&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

**Compare R3LIVE++, LVI-SAM and Mine:**

| R3LIVE++ | LVI-SAM | Mine |
|--------|---------|-----|
| single system | two system | single system |
| Optical flow tracking | Slide window VIO : VINS-MONO | Direct sparse tracking |
| with photometric calibration | without | with photometric calibration|
| Filter based LIO (FAST-LIO2) | Pose Graph Based LIO (LOAM) | Filter based LIO (FAST-LIO2) |

# 2022 <a name="l2022"></a>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [R3LIVE++: A Robust, Real-time, Radiance reconstruction package with a tightly-coupled LiDAR-Inertial-Visual state Estimator](https://arxiv.org/abs/2209.03666), [github code](https://github.com/hku-mars/r3live)
following R3LIVE, with the camera photometric calibration and the online estimation of camera exposure time.

# 2021 <a name="l2021"></a>

<img src="/assets/img/paperread/chrown.png" height="25"/> [R3LIVE: A Robust, Real-time, RGB-colored, LiDAR-Inertial-Visual tightly-coupled state Estimation and mapping package](https://arxiv.org/abs/2109.07982). Visual-Lidar-Imu filter.
* even though in its paper it said it has two system, it actually uses one single imu-based filter back bone. so it uses imu for filter predict, then has lidar and image measurements.
* use lidar pointcloud for VIO tracking, VIO system won't optimize map points.
* finally use MVS to make mesh (delaunay triangulation), 'texturing' is to update pcl color with the raw lidar map.

<div align="center">    
<img src="/assets/img/paperread/r3live.png" width="80%"/>
</div>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [LVI-SAM: Tightly-coupled Lidar-Visual-Inertial Odometry via Smoothing and Mapping](https://github.com/TixiaoShan/LVI-SAM) (looks similar to V-LOAM + IMU) optimization with the following factors (with two system) (It is actually not so tightly coupled):

* Use lidar information in VINS (difference compared to VINS)
    * use lidar odometry pose for vins initialization
    * project lidar cloud to get vio feature depth neighbor pts model a plane,
    * feature depth in vins is anchored by the first observation. so here depth
      from lidar also valid only for first observation.
    * in marginalization if the marginalized pt has lidar depth, move its flags to the next.
    * set depth constant if has lidar depth.

* Use vision in VIO-SAM (difference compared to VIO-SAM)
    * use visual loop detection result as lidar loop candidate (to further process ICP).
    * use VINS pose as initial pose for lidar registration.

My implementation: I use FAST-LIO2 base instead of V-LOAM base.
* looks good while the movement is not too dramatic.
* while VINS is not stable when movement (for an example in car), or scene has lots of moving objects.

# 2020  <a name="l2020"></a>

<img src="/assets/img/paperread/chrown0.png" height="25"/> [CamVox](https://github.com/ISEE-Technology/CamVox), Lidar visual mapping using livox.

* Livox generate dense lidar cloud, match visual edge with lidar intensity image edge for extrinsic parameters calibration.
* IMU for lidar un-distortion.
* Run ORBSLAM2 RGBD pipeline.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Augmenting Visual Place Recognition with Structural Cues](http://rpg.ifi.uzh.ch/research_vo.html) Use both image (e.g. [NetVLAD 2016](https://arxiv.org/abs/1511.07247)) and 3d cloud (e.g.
[PointNetVLAD 2018](https://arxiv.org/abs/1804.03492)) encoders.

<img src="/assets/img/paperread/unhappy.png" height="25"/> [Stereo Localization in LiDAR Maps]https://github.com/tony1098/Stereo-Localization-in-LiDAR-Maps). Localize stereo camera in pre-built lidar map.

* Using ZED stereo camera, opencv (StereoSGBM and DisparityWLSFilter) to compute depth image.
* Registration using [Nelder-Mead method](https://en.wikipedia.org/wiki/Nelder%E2%80%93Mead_method).

<img src="/assets/img/paperread/unhappy.png" height="25"/>  [RGB2LIDAR: Towards Solving Large-Scale Cross-Modal Visual Localization](https://arxiv.org/abs/2009.05695) DL match rgb image and depth image (from lidar cloud)

<img src="/assets/img/paperread/unhappy.png" height="25"/> [Lidar-Monocular Visual Odometry using Point and Line Features](https://cg.cs.tsinghua.edu.cn/people/~mtj/publications/ICRA2020-PL-LOAM.pdf) (loosely coupled)

* image -> point feature (ORB), line feature (LSD) -> project lidar to estimat depth -> odometry -> local BA current pose and landmarks.
* ICP relative pose factors.
* Global BA  using ICP factors, ORB factors, LSD factors.

<img src="/assets/img/paperread/unhappy.png" height="25"/> [LIC-Fusion 2.0: LiDAR-Inertial-Camera Odometry with Sliding-Window Plane-Feature Tracking](https://arxiv.org/abs/2008.07196) Tracking planes in the sliding window.

# 2019  <a name="l2019"></a>

<img src="/assets/img/paperread/unhappy.png" height="25"/>  [CMRNet: Camera to LiDAR-Map Registration](https://github.com/cattaneod/CMRNet). Project a depth into plane (from an initial pose guess), CMRNet use RGB and depth as input, output 2D correspondings for each depth value. Finally PnP-RANSAC for pose estimation.


# 2018  <a name="l2018"></a>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [LIMO: Lidar-Monocular Visual Odometry](https://arxiv.org/abs/1807.07524)

* Depth estiamtion : project lidar into image -> estimate local plane (select local range, foreground segmentation) -> check the depth.
* Visual Odometry, global BA.

# 2017  <a name="l2017"></a>

<img src="/assets/img/paperread/question.png" height="25"/> [DSAC Differentiable RANSAC](https://github.com/cvlab-dresden/DSAC). replace non-differentiable parts of RANSAC algorithm with approximated differentiable parts (by soft argmax and probabilistic selection). Then make a deep learning DSAC. (As I understand, RANSAC is mathematically proved, I don't understand how its accuracy can be improved).
