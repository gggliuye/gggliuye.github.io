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
<img src="/assets/img/work/mirrorverse-p-1600.png" width="95%"/>
</div>

<a name="l2023"></a>
# My work 2023

## A. Infrared Localization Modules

* VR hand 6dof tracking.
* Outside-in AR/VR camera localization.

## B. Panorama Video Visual Mapping

Panorama video is the only input.
* pure visual sfm mapping pipeline based on <u>Global Averaging method</u>.
* extrinsics & timestamp calibration of camera-imu.
* scale and gravity recovery of the visual map.

## C. MVS

MVS image depth recovery.

<a name="l2022"></a>
# My work 2022

working on slam/vlp system.

<p/><p/>
## A. INS fusion

ins system (fully self-developed) :
* Based on iterative extended error state kalman filter.
* 2 version :
    * chassis (motion model) + gps.
    * imu (motion model) + gps + chassis + visual localization.
* Working with guangqi for **AR-HUD & VR**. [广汽ADiGO SPACE升级沉浸式智能座舱体验](https://mp.weixin.qq.com/s/l01PoJ47BtGNLOIvLN5oGA), working on car localization (in world), and vr headset localization (in car).

<div align="center">    
<img src="/assets/img/work/dm_gq.jpeg" width="75%"/>
</div>

<p/><p/>

<details>
  <summary>Details</summary>

<li><a>IMU为观测模型，中值/KR差值。</a></li>
<li><a>iterative kalman filter on manifold，重构（去除boost依赖）和加速（函数的重构）。</a></li>
<li><a>观测包括：轮速的观测、gps位置观测（带外参的优化）、视觉图像定位的观测（延迟到达的观测，使用covariance的推演）。</a></li>
<li><a>系统状态的初始化（初始位姿、初始速度、重力、bias）。</a></li>
<li><a>实测和调参（针对VR和AR系统中都有充分的完整的调整和测试）。</a></li>
<li><a>车内的VR眼镜的6dof算法开发。</a></li>

</details>

<p/><p/>
## B. VLIO algorithm

lidar-imu-image, based on image direct method with photometric refinement (fully self-developed). (following last year's work)

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=261580358&bvid=BV1He411L7ti&cid=860597168&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

<p/><p/>

<details>
  <summary>Details</summary>
<p>涉及最新成果在此保密。</p>
</details>

<p/><p/>
## C. pointcloud & mesh generation

Designed for <u>multi-session lifelong map</u>, handle environement change.
* **Color Point Cloud** : TSDF generation (using cuda c++).
* **Mesh Generation** : Delaunay + ray casting + min-cut + post-processing.

<div align="center">    
<img src="/assets/img/work/tsdf_pcl.jpg" width="90%"/>
</div>

<p/><p/>

<details>
  <summary>Details</summary>
<li><a>自研的cuda，点云处理和TSDF点云融合。主要feature：由于我们处理的是城市级别的范围，我们做了点云ray的切分和并行处理。</a></li>
<li><a>多线程：点云颜色的叠加、结合语义的过滤。</a></li>
<li><a>Mesh的生成参考colmap的实现，(1)在Delaunay的数据结构上进行ray casting，(2)min-cut计算face， (3) mesh后处理（降面和去噪），(4)贴图和颜色的处理。</a></li>
</details>


<p/><p/>
## D. visual map summarization

For simplification of visual localization map.
* Vision bundle adjustment problem graph analysis. (using [SNAP](http://snap.stanford.edu/))
* Solve ILP (integral linear programming) problem based on [paper](https://arxiv.org/abs/1907.00338)
* Keep 10% the points, with neglectable drop in localization benchmark accuracy.

<p/><p/>

<details>
  <summary>Details</summary>
<p>涉及最新成果在此保密。</p>
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

<p>（1）LIO-SAM。把算法完全消化成我们的代码（使用的第三方库：Eigen、Kdtree、Ceres）。</p>

<li><a>把后端由gtsam换成ceres：主要工作是factor的重写，由于我司的parameterization block用了se3（历史包袱），而没有把旋转平移分开（比如vins），需要重新推倒计算。</a></li>

<li><a>各个部件的优化。包括但不限于</a>
<ul style="list-style-type:circle">
  <li><a>帧间匹配加速优化，ceres到手写gn。</a></li>
  <li><a>IMU初始化的优化，参考vins。</a></li>
  <li><a>去畸变、特征提取的多线程优化。</a></li>
  <li><a>与新数据格式的适配。</a></li>
  <li><a>室内室外各个场景的调参。</a></li>
</ul>
</li>

<p>（2）FAST-LIO2。涉及最新成果在此保密。</p>

</details>


<p/><p/>
## B. camera-chassis-gps slam algorithm

Single camera semi-dense direct method (reference DSO) to mapping fastly the whole city road map.
* tightly coupled with chassis input.
* cpu + arm refinement, 50 FPS on nvidia-nx.
* designed pipeline, mapped full Nansha.GuangZhou Area.

<div align="center">    
<img src="/assets/img/work/image_mapping.jpg" width="100%"/>
</div>

<p/><p/>

<details>
  <summary>Details</summary>

<li><a>代码的整体重构，并增加unit test。</a></li>
<li><a>使用NEON对更多的函数进行优化，尤其是投影的部分。</a></li>
<li><a>调整了初始化策略：使用轮速里程计初始化。</a></li>
<li><a>增加紧耦合的轮速里程计观测。（dso是手写的优化，使用pose error为优化变量的扰动模型）</a></li>
<li><a>接入我们的pipeline进行建图自动化。</a></li>
<li><a>另外IMU融合的需求做了一半（factor和后端准备就绪，还差初始化和实测），但是后来这个需求被砍了。</a></li>
<li><a>多次采集的地图融合。通过数据库获取近邻关键帧。使用dso的深度和sift做pnp，然后使用dso的直接法匹配优化位姿。</a></li>

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

<li><a>数据库格式，算法pipeline的构思定义。</a></li>
<li><a>global registration的算法开发（我们只使用了kdtree的第三方库）。</a>
<ul style="list-style-type:circle">
  <li><a>点云normal和FPFH的提取的开发。</a></li>
  <li><a>参考teaser，但是teaser使用了PMC库(Parallel Maximum Clique)，我们不想引入太多的第三方库，于是degree number heuristic来计算maximal clique，实际结果很好。</a></li>
  <li><a>也开发了RANSAC的版本，实测效果也很好。</a></li>
</ul>
</li>
<li><a>pipeline的多线程，针对数据库的算法效率优化等。</a></li>
<li><a>各个场景的调参优化。</a></li>

</details>

<p/><p/>
## D. car routing

* based on OSM lane map.
* lane level map & way point level map.
