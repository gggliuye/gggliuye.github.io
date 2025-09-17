---
layout: page
title: DeepMirror 2020/11 - now
subtitle: GuangZhou, China
---

# Table of Contents

* [DeepMirror](#ldm)
* [My work 2024](#l2024)
* [My work 2023](#l2023)
* [My work 2022](#l2022)
* [My work 2020 - 2021](#l2021)

<p></p>

<div align="center"><pre class="mermaid">
mindmap
WORKs
  (Online SLAM)
    Lidar SLAM
      Lidar-IMU
      Lidar-IMU-Image
    Visual SLAM
      Visual-Car
      Visual-IMU
      ML Re-Localization
  (OffLine Mapping)
    Visual Based
      Point Based SFM
      Global Averaging
      Line Based SFM
      Cuda Based Image MVS
      Map Summarization
    Lidar Based
      TSDF Pointcloud
      Mesh : Delaunay Ray Tracing
      Multi-Map Fusion
    Deep Learning
      NERF
      Gaussian Splatting
  (Other Image Processing)
    Multiplane Images
    Monocular Depth
    Infra-Red
    Panorama
  (MR)
    World Generation
    MR 6DOF in Vehicle
    Vertigo Reduction
    RunTime Rendering
    OpenXR Native
  (Embedded System)
    Arduino
    ESP IDF
    OBD canbus
</pre></div>


<a name="ldm"></a>
# DeepMirror

[website](https://www.deepmirror.com/) : MirrorSpace - City scale spatial mapping and localization.

<div align="center">    
<img src="/assets/img/work/dm.jpg" width="85%"/>
</div>

<a name="l2024"></a>
# My work 2024

## A. Low Cost INS

Use low quality GPS & IMU only. Achieve state-of-art INS performance.
<div align="center">    
<img src="/assets/img/work/ins_1.gif" width="60%"/>
</div>

<p></p>
## B. Automatic World Generation

<img style="float: right;" src="/assets/img/work/image_mc.jpg" width="30%"/>

Generate random world, based on earth topology and OSM road map. [Video](https://www.bilibili.com/video/BV1XT421e7KB/?share_source=copy_web&vd_source=7e02250c240f5781cde17d4e607c33bd).
* Terrain generation (random while fits earth topology).
* Shaders : shadow & light & fog & water.
* MR rendering.

<p></p>
## C. MR in Vehicle 6DOF

<img style="float: right;" src="/assets/img/screenshots/vo.gif" width="30%"/>

Enable MR device to have 6DOF tracking in any vehicle.
* Well designed fusion algorithm to give a comfort experience.
* Output poses both in car reference frame & world reference frame.
* Realtime on board absolute localization (w.r.t. car) using deeplearning.

<p></p>
## D. Video Streaming

<img style="float: right;" src="/assets/img/screenshots/car_vr_stream.gif" width="30%"/>

Stream outside Panorama view to MR.
* Camera hardware connection, image stitch, video encoder.
* Video Streaming using FFMPEG.
* MR video decoder, panorama rendering.

<a name="l2023"></a>
# My work 2023

## A. Outside-in Infrared Localization Modules

IR light detection, and fusion with imu measurement by kalman filter. Run with OpenXR & Monado.
* VR hand 6dof tracking.
* AR/VR camera tracking in difficult scenes (e.g. inside moving cars).

<div align="center">    
<img src="/assets/img/screenshots/hand6dof.gif" width="60%"/>
</div>

<p/><p/>
## B. Panorama Video Visual Mapping

Panorama video (insta360 & go-pro) is the only input.
* pure visual sfm mapping pipeline based on <u>Global Averaging method</u> (shonan rotation average & 1dsfm translation average).
* usage of IMU:
    * extrinsics & timestamp calibration for camera-imu.
    * scale and gravity recovery of the visual map.
* MVS image depth recovery (both [traditional cv method](/Study/PaperRead/3d_reconstruction/#lacmm) and [Deep Learning method](/Study/PaperRead/3d_reconstruction/#ldl)).

<div align="center">    
<img src="/assets/img/work/pano_depth_render.jpg" width="75%"/>
</div>

<p/><p/>
## C. Line Mapping & Localization

see [Line Mapping Page](/Study/PaperRead/subjects/#l2).
* Line mapping for traffic lane mapping.
* Use line feature for visual based localization : [my branch of LIMAP](https://github.com/yeliu-deepmirror/limap).

<p/><p/>
## D. Deep Learning

* Use [Dense Match](/Study/PaperRead/deeplearning/03loc/#ldense_match) with relative pose (Global averaging) for localization and visual mapping.
* Use [Nerf](/Study/PaperRead/3d_reconstruction/#lneural_r) with our data session.
* Use [Multiplane Images](/Study/PaperRead/subjects/#l6) for render live 3d videos (as shown in Apple Vision Pro), [test video in PICO](https://drive.google.com/file/d/1mz66BP2f6ZB5Gv_L6dkrPg6Px94lbviZ/view?usp=sharing).
* Use [ACE](/Study/PaperRead/deeplearning/03loc/#lend_to_end_loc) for mapping, and check its descriptor quality with [match test](https://github.com/yeliu-deepmirror/ace#encoder-test).

<p/><p/>
<a name="l2022"></a>
# My work 2022

working on slam/vlp system.

<p/><p/>
## A. INS fusion

working on meta-verse for cars.
* **car localization** - ins system : Based on iterative extended error state kalman filter. imu (motion model) + gps + chassis + visual localization.

<div align="center">    
<img src="/assets/img/work/ins.gif" width="60%"/>
</div>

* **vr in-car localization** - work with guangqi for **AR-HUD & VR**.
  * [广汽ADiGO SPACE升级沉浸式智能座舱体验 2022](https://mp.weixin.qq.com/s/l01PoJ47BtGNLOIvLN5oGA).
  * **patent**: 一种车载XR设备定位方法、装置、设备及存储介质 CN115690194B.
  * [DeepMirror在宝马汽车元宇宙比赛中荣获第一名 2023](https://mp.weixin.qq.com/s/8SFkmZQhMmpXe-6Yj9VkRA). First place in the "Vehicle Readiness" category was secured by Chinese start-up DeepMirror Inc.

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

**lidar-imu-image slam**, based on image direct method with photometric refinement (following last year's work).
**patent**: 基于激光视觉融合的建图方法及系统 CN115797490B.

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
