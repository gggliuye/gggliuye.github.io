---
layout: page
title: DeepMirror 2020/11 - now
subtitle: GuangZhou, China
---

# Table of Contents

* [DeepMirror](#ldm)
* [My work 2023](#l2023)
* [My work 2022](#l2022)
* [My work 2020 - 2021](#l2021)

<p></p>

<a name="ldm"></a>
# DeepMirror

[website](https://www.deepmirror.com/)

<div align="center">    
<img src="/assets/img/work/mirrorverse-p-1600.png" width="75%"/>
</div>

<a name="l2023"></a>
# My work 2023

## A. Outside-in Infrared Localization Modules

IR light detection, and fusion with imu measurement by kalman filter. Run with OpenXR & Monado.
* VR hand 6dof tracking.
* AR/VR camera tracking in difficult scenes (e.g. inside moving cars).

<div align="center">    
<video src="/assets/video/work/hand6dof_0512.mp4" controls="controls" width="60%"></video>
</div>

<p/><p/>
## B. Panorama Video Visual Mapping

Panorama video (insta360 & go-pro) is the only input.
* pure visual sfm mapping pipeline based on <u>Global Averaging method</u> (shonan rotation average & 1dsfm translation average).
* usage of IMU:
    * extrinsics & timestamp calibration for camera-imu.
    * scale and gravity recovery of the visual map.
* MVS image depth recovery (both traditional cv method and DL method).

<div align="center">    
<img src="/assets/img/work/pano_depth_render.jpg" width="75%"/>
</div>

<p/><p/>
<a name="l2022"></a>
# My work 2022

working on slam/vlp system.

<p/><p/>
## A. INS fusion

working on meta-verse for cars.
* **car localization** - ins system : Based on iterative extended error state kalman filter. imu (motion model) + gps + chassis + visual localization.
* **vr in-car localization** - work with guangqi for **AR-HUD & VR**. [广汽ADiGO SPACE升级沉浸式智能座舱体验](https://mp.weixin.qq.com/s/l01PoJ47BtGNLOIvLN5oGA)。

<div align="center">    
<img src="/assets/img/work/dm_gq.jpeg" width="60%"/>
</div>

<p/><p/>

<details>
  <summary>Details</summary>

<li><a>iterative kalman filter on manifold</a>
<ul style="list-style-type:circle">
  <li><a>build the full algorithm library.</a></li>
  <li><a>accelerate for imu motion model inputs.</a></li>
  <li><a>state initialization based on imu preintegration.</a></li>
  <li><a>besides basic measurements, we made visual localization measurements.</a></li>
  <li><a>tested over 200h running in Guangzhou.</a></li>
</ul>
</li>
<li><a>6dof localization inside car - based on imu, vision, and car state.</a></li>
<li><a>develop of the VR in car unity SDK (supporting our applications).</a></li>

</details>

<p/><p/>
## B. VLIO algorithm

**lidar-imu-image slam**, based on image direct method with photometric refinement (based on  independent research). (following last year's work)

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=261580358&bvid=BV1He411L7ti&cid=860597168&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

<p/><p/>

<details>
  <summary>Details</summary>
<p></p>
</details>

<p/><p/>
## C. pointcloud & mesh generation

Designed for <u>multi-session lifelong map</u>, handle environement change.
* **Color Point Cloud** : TSDF generation (using cuda c++).
* **Mesh Generation** : Delaunay + ray casting + min-cut + post-processing.

<div align="center">    
<img src="/assets/img/work/tsdf_pcl.jpg" width="75%"/>
</div>

<p/><p/>

<details>
  <summary>Details</summary>
<li><a>TSDF point cloud generation (lidar pcl)</a>
<ul style="list-style-type:circle">
  <li><a>has both cuda version and cpu version.</a></li>
  <li><a>block-level processing, fit for any scale (room/building/city).</a></li>
  <li><a>with additional information : color, intensity, semantic label, etc.</a></li>
  <li><a>run for all our data (whole city).</a></li>
</ul>
</li>
<li><a>Mesh generation (based on lidar pcl). Delaunay - Ray Casting - Min-cut - Post-processing - Texture adding</a></li>
</details>


<p/><p/>
## D. visual map summarization

For simplification of visual localization map.
* Vision bundle adjustment problem graph analysis. (using [SNAP](http://snap.stanford.edu/))
* Solve ILP (integral linear programming) problem based on [paper](https://arxiv.org/abs/1907.00338)
* Keep 10% the points, with neglectable drop in localization benchmark accuracy.

<div align="center">    
<img src="/assets/img/work/brief.png" width="60%"/>
</div>

<p/><p/>

<details>
  <summary>Details</summary>
<p></p>
</details>


<p/><p/>
<a name="l2021"></a>
# My work 2020 - 2021

<p/><p/>
## A. lidar-imu-gps slam algorithm

* 2 versions (all written by our team) :
    * pose graph optimization (reference LIO-SAM)
    * <u>iterative extended error state kalman filter</u> (reference FAST-LIO2).
* Many additional constrains, robust backend optimzation, more robust imu initialization.
* Loop closure based on global descriptor (ISC).
* Sensor set: imu, rs-lidar-16, gps, cpu only, 20 FPS on nvidia-nx.

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=293924888&bvid=BV14F411a75W&cid=434510649&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

<p/><p/>

<details>
  <summary>Details</summary>

<li><a>LIO-SAM based Lidar SLAM algorithm:</a>
<ul style="list-style-type:circle">
  <li><a>Using Ceres instead of GTSAM : write all the cost functions (without auto-diff, including imu preintegration factors).</a></li>
  <li><a>accelerate frame-to-map ICP, using a new Gaussian Newton algorithm.</a></li>
  <li><a>state initialization based on imu preintegration (bsaed on VINS, but remake to be better).</a></li>
  <li><a>accelerate lidar undistortion and feature extraction (based on multi-threading, and refine memory usage).</a></li>
  <li><a>tested in over 200h of our data.</a></li>
</ul>
</li>

<li><a>FAST-LIO2 based Lidar Odometry algorithm.</a></li>
<li><a>Our loop closing algorithm.</a></li>
</details>


<p/><p/>
## B. camera-chassis-gps slam algorithm

Single camera semi-dense direct method (reference DSO) to mapping fastly the whole city road map.
* tightly coupled with chassis input.
* cpu + arm refinement, 50 FPS on nvidia-nx.
* designed pipeline, mapped full Nansha.GuangZhou Area.

<div align="center">    
<img src="/assets/img/work/image_mapping.jpg" width="85%"/>
</div>

<p/><p/>

<details>
  <summary>Details</summary>

<li><a>remake all the algorithm to fit our code format. add more unit tests.</a></li>
<li><a>using NEON to accelerate more algorithm blocks.</a></li>
<li><a>remake the initialization, to take advantage of chassis.</a></li>
<li><a>add tightly coupled chassis observation : pose measurement, relative pose measurement.</a></li>
<li><a>add the whole algorithm to our cloud pipeline.</a></li>
<li><a>add imu measurements : make a VI-DSO.</a></li>
<li><a>multi-collection fusion, using purly image. add a few image-map observations and run global bundle adjustment.</a></li>

</details>


<p/><p/>
## C. multi-session fusion

<u>Robust Distributed Pose Graph Optimization</u>. (robust to outliers, and multi-threading process with graph cut)
* Loop finding : gicp & global registration (based on FPFH + TEASER) & ISC (intensity scene context).
* Database structre based on s2 blocks.
* Mapped full Nansha.GuangZhou Area (until 2022).

<div align="center">    
<img src="/assets/img/work/gz_mapping.jpg" width="75%"/>
</div>

<p/><p/>
<details>
  <summary>Details</summary>

<li><a>my first mission in DeepMirror.</a></li>
<li><a>Define the database interface and algorithm pipeline.</a></li>
<li><a>pointcloud global registration: (using only Kdtree and Eigen)</a>
<ul style="list-style-type:circle">
  <li><a>point cloud normal and FPFH.</a></li>
  <li><a>referencing TEASER. while we develop a faster 'degree number heuristic' to compute maximal clique.</a></li>
  <li><a>made ransac version.</a></li>
</ul>
</li>
<li><a>algorithm acceleration and pipeline debug.</a></li>
<li><a>tested on over 200h of data.</a></li>

</details>

<p/><p/>
## D. car routing

* based on OSM lane map.
* lane level map & way point level map.
