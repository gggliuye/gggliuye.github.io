---
layout: page
title: DeepMirror 2020/11 - now
subtitle: GuangZhou, China
---

# DeepMirror

[website](https://www.deepmirror.com/)

working on slam/vlp system.

## Mine work 2022

### A. INS fusion

ins system (fully self-developed) :
* based on extended error state kalman filter.
* version 1. chassis (motion model) + gps. version 2. imu (motion model) + gps + chassis.

### B. VLIO algorithm

* lidar-imu-image, based on image direct method (fully self-developed)

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=261580358&bvid=BV1He411L7ti&cid=860597168&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

### C. pointcloud & mesh generation

* TSDF GPU point cloud generation
* Delaunay + ray casting + min-cut + post-processing mesh generation.

<div align="center">    
<img src="/assets/img/work/tsdf_pcl.jpg" width="95%"/>
</div>

### D. visual map summarization

* the map graph analysis.
* solve the ILP (integral linear programming) problem based on [paper](https://arxiv.org/abs/1907.00338)
* keep 10% the points, with neglectable drop in localization benchmark accuracy.

## Mine work 2020 - 2021

### A. lidar-imu-gps slam algorithm

* 2 versions (fully self-developed) : based on pose graph optimization (reference LIO) & based on extended error state kalman filter (reference FAST-LIO2).
* using gravity estimation in the system as an additional constrain.
* loop closure based on global descriptor of lidar frame.
* using rs-lidar-16. cpu only, 20 FPS on nvidia-nx.

[demo video](https://www.bilibili.com/video/BV14F411a75W?spm_id_from=333.999.0.0)

### B. camera-chassis-gps slam algorithm

* single camera semi-dense direct method (reference DSO) to mapping fastly the whole city road map.
* tightly coupled with chassis input.
* cpu + arm refinement, 50 FPS on nvidia-nx.
* mapped full Nansha.GuangZhou Area.

<div align="center">    
<img src="/assets/img/work/image_mapping.jpg" width="100%"/>
</div>

### C. full map fusion

* based on pose graph optimization. (have fused a whole district)
* loop finding : gicp & global registration (based on FPFH + TEASER).
* database based on s2 blocks for saving pose graph.
* cut the graph to regions to optimize.
* mapped full Nansha.GuangZhou Area.

### D. car routing

* based on OSM lane map.
* lane level map & way point level map.
