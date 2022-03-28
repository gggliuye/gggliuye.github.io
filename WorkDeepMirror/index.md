# DeepMirror

[website](https://www.deepmirror.com/)

I focus mostly on the slam mapping process:
* based on mulitsensors : image, imu, lidar, gps, etc. 
* third party library used : opencv, eigen, ceres & pangolin.

## Mine work 2022

### A. INS odometry

ins system : 

* based on extended error state kalman filter.
* version 1. chassis + gps.
* version 2. imu + gps.

## Mine work 2021

### A. lidar-imu-gps slam algorithm

* 2 versions : based on pose graph optimization & based on extended error state kalman filter.
* using gravity estimation in the system as an additional constrain.
* loop closure based on global descriptor of lidar frame.
* using rs-lidar-16.
* cpu only, 20 FPS on nvidia-nx.
 
### B. camera-chassis-gps slam algorithm

* based on single camera semi-dense direct method.
* tightly coupled with chassis input.
* cpu + arm refinement, 50 FPS on nvidia-nx.

### C. full map fusion 

* based on pose graph optimization.
* loop finding : icp & global registration based on FPFH + TEASER.
* database based on s2 blocks for saving pose graph.
* cut the graph to regions to optimize.

### D. routing 

* based on OSM lane map.
* lane level map & way point level map.
