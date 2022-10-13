---
layout: page_tree_paper
title: Lidar Mapping
---

# Table of Contents
* [2021](#l2021)
* [2020](#l2020)
* [2018](#l2018)
* [2017](#l2017)
* [before](#lbefore)

<p/><p/>

# 2021 <a name="l2021"></a>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [MULLS: Versatile LiDAR SLAM via Multi-metric Linear Least Square](https://github.com/YuePanEdward/MULLS).
* Lidar only slam (it doesn't addition information (e.g. imu) for undistortion.)
* Use many kind of features (ground, facade, pillar, beam, etc) to make the system versatile. (and doesn't depends on additional info for cloud, e.g ring).
* Registration to a local submap. solve the new ICP problem based on TEASER (applying truncated least square estimation with semi-definite relaxation).
* Process a loop closure and a pose graph optimization.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [BALM: Bundle adjustment for lidar mapping](https://github.com/hku-mars/BALM) . But the main results shown for Livox Device (denser, small FOV).
* Adaptive voxelization to match both plane and edge features without a segmentation.
* Reduce to pose only BA.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [LiTAMIN2: Ultra Light LiDAR-based SLAM using Geometric Approximation applied with KL-Divergence](https://arxiv.org/abs/2103.00784). Using a covariance based ICP error, combined with a covariance shape error term (from KL divergence), which allow matching with very large voxel size, then making the registration extremely fast.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Range Image-based LiDAR Localization for Autonomous Vehicles](https://github.com/PRBonn/range-mcl).

* Passion reconstruction get mesh. (small in memory)
* Monte Carlo localization of lidar map. (particle filter with rendered range image)

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [LiLi-OM (LIvox LiDAR-Inertial Odometry and Mapping](https://github.com/KIT-ISAS/lili-om)

* tightly-coupled idar-IMU hierarchical lide-window optimization.
* factors : imu-preint, lidar plane/edge pairs, prior/marginalization terms.
* conventional LiDARs : LOAM feature; solid-state LiDAR : use covariance.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [FAST-LIO (Fast LiDAR-Inertial Odometry](https://github.com/hku-mars/FAST_LIO) keyword : **FAST**, in my personal opinion, this is the state of art of lidar slam.

* EKF for imu, used to lidar undistortion.
* ikd-Tree ([incremental kdtree](https://github.com/hku-mars/ikd-Tree)) for lidar match.


# 2020 <a name="l2020"></a>

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [LIO-SAM](https://github.com/TixiaoShan/LIO-SAM) Tightly-coupled Lidar Inertial Odometry via Smoothing and Mapping. In short, add imu pre-integration and sliding window to LOAM.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [OverlapNet: Loop Closing for LiDAR-based SLAM](http://www.roboticsproceedings.org/rss16/p009.pdf). Top-down 2d view of lidar scan (with other info) for predict overlap rate and yaw.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [ISC (Intensity Scan Context](https://arxiv.org/abs/2003.05656) Coding Intensity and Geometry Relations for Loop Closure Detection. Encode lidar frame using geometry and intensity info (project intensity into ring distributed subspaces). Simple algorithm, shows wonderful result in experiment.

<div align="center">    
<img src="/assets/img/paperread/isc_test.png" width="50%"/>
</div>

# 2018 <a name="l2018"></a>

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [LeGO-LOAM(https://github.com/RobustFieldAutonomyLab/LeGO-LOAM) .
Lightweight and Ground-Optimized Lidar Odometry and Mapping on Variable Terrain. See [details and some comparisons](https://vio.readthedocs.io/zh_CN/latest/Other/lidarSLAM.html).

# 2017 <a name="l2017"></a>

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [On the performance of metrics to predict quality in point cloud representations](https://core.ac.uk/download/pdf/148032116.pdf). Using absolute category rating (ACR) and able to perceive distortions.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [On Subjective and Objective Quality Evaluation of Point Cloud Geometry](https://ieeexplore.ieee.org/document/7965681). Point cloud quality metric using DSIS (double-stimulus impairement scale) methodology. Showing that current state-of-the-art objective metrics (point-to-point, point-to-plane or point-to-mesh) do not predict well visual quality, especially under typical distortions such as compression.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [2D SLAM Quality Evaluation Methods](https://arxiv.org/pdf/1708.02354.pdf). The proportion of occupied and free cells (check wall blurry). The amount of corners and enclosed areas in a map.


# Any Before <a name="lbefore"></a>

## 2012

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [OctoMap](http://www.arminhornung.de/Research/pub/hornung13auro.pdf>`_ `github project <http://octomap.github.io/). Probabilistic representation, Modeling of unmapped areas, Efficiency (octree).

## 2009

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [On Measuring the Accuracy of SLAM Algorithms](http://www2.informatik.uni-freiburg.de/~stachnis/pdf/kuemmerle09auro.pdf). (RPE vs APE) A metric that operates only on relative geometric relations between poses along the trajectory of the robot.
