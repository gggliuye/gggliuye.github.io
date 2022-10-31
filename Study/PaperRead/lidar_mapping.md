---
layout: page_tree_paper
title: Lidar Mapping
---

# Table of Contents
* [2022](#l2022)
* [2021](#l2021)
* [2020](#l2020)
* [2019](#l2019)
* [2018](#l2018)
* [2017](#l2017)
* [before](#lbefore)

<p/><p/>

# 2022 <a name="l2022"></a>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Scale-Variant Robust Kernel Optimization for Non-linear Least Squares Problems](https://arxiv.org/pdf/2206.10305.pdf) (applied in LIO system to prevent outliers) use [Generalized loss function](#lgeneral_loss_fcn) in LIO slam system. As the paper itself said, it does not has obvious improvement on LIO system. *I had tested different robust loss functions also in FAST-LIO system, no improvement found.*

LITERATURE REVIEW (robust estimation):

* Iterative Re-weighted Least Squares (IRLS) : [M-estimators](#lmestimate), fails into de-weighting (don’t directly remove measurements). ([connection to elliptical distributions](#lmestimate-ell)),  Student-t M-estimators. (M-estimation can be solved exactly like a weighted nonlinear least squares problem)
* loop closures: [Dynamic Covariance Scaling](#ldyns), [AEROS](#lareos).


# 2021 <a name="l2021"></a>

<a name="lareos"></a>
<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [AEROS: AdaptivE RObust least-Squares for Graph-Based SLAM](https://arxiv.org/pdf/2110.02018.pdf) modelled all loop closures using robust cost functions with a single adaptive parameter and improved back end optimization. Take advantage of the [Black-Rangarajan duality](lbrduality) to convert the optimization problem into an **Iteratively Reweighted Least Squares** (IRLS) problem instead (similar to [robust loss function in ceres](http://ceres-solver.org/nnls_modeling.html#lossfunction)).

<div align="center">    
<img src="/assets/img/paperread/sc_area.jpg" width="100%"/>
</div>

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Globally Consistent 3D LiDAR Mapping with GPU-accelerated GICP Matching Cost Factors](https://arxiv.org/abs/2109.07073), [nice youtube video 1](https://www.youtube.com/watch?v=AbaBp803jpo), [nice youtube video 2](https://www.youtube.com/watch?v=TarRKF_Xd2E) : minimizes matching costs (voxel data association-based GICP) between frames over the entire map using gpu.

* local maps
* global mapping : align local maps.
  * use shifted Tukey robust kernel to escape from local minima.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Voxelized GICP for Fast and Accurate 3D Point Cloud Registration](https://staff.aist.go.jp/shuji.oishi/assets/papers/preprint/VoxelGICP_ICRA2021.pdf) voxelized generalized
iterative closest point (VGICP) (better fit gpu).

<div align="center">    
<img src="/assets/img/paperread/vgicp.png" width="50%"/>
</div>

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [ERASOR: Egocentric Ratio of Pseudo Occupancy-based Dynamic Object Removal for Static 3D Point Cloud Map Building](https://arxiv.org/abs/2103.04316) project map points and the new frame points into 2d gird, and compute the height range for each grid, use it to filter grid with moving object (for an example, if the range in map is 2 meter, while 10cm in new frame, it means the map gird might be moving objects). It looks very simple, while it is effective, worth adding to your own project.

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

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> <img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [FAST-LIO (Fast LiDAR-Inertial Odometry](https://github.com/hku-mars/FAST_LIO) keyword : **FAST**, in my personal opinion, this is the state of art of lidar slam.

* EKF for imu, used to lidar undistortion.
* ikd-Tree ([incremental kdtree](https://github.com/hku-mars/ikd-Tree)) for lidar match.

my implementation, wonderful performance!

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=293924888&bvid=BV14F411a75W&cid=434510649&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>


# 2020 <a name="l2020"></a>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [LIO-SAM](https://github.com/TixiaoShan/LIO-SAM) Tightly-coupled Lidar Inertial Odometry via Smoothing and Mapping. In short, add imu pre-integration and sliding window to LOAM.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [OverlapNet: Loop Closing for LiDAR-based SLAM](http://www.roboticsproceedings.org/rss16/p009.pdf). Top-down 2d view of lidar scan (with other info) for predict overlap rate and yaw.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [ISC (Intensity Scan Context](https://arxiv.org/abs/2003.05656) Coding Intensity and Geometry Relations for Loop Closure Detection. Encode lidar frame using geometry and intensity info (project intensity into ring distributed subspaces). Simple algorithm, shows wonderful result in experiment.

<div align="center">    
<img src="/assets/img/paperread/isc_test.png" width="50%"/>
</div>

# 2019 <a name="l2019"></a>

<a name="lgeneral_loss_fcn"></a>
<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [A General and Adaptive Robust Loss Function](https://arxiv.org/abs/1701.03077) enables the training of neural networks in which the robustness of the loss auto-matically adapts itself during training.

<div align="center">    
<img src="/assets/img/paperread/general_loss_fcn.jpg" width="95%"/>
</div>

# 2018 <a name="l2018"></a>

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Efficient Surfel-Based SLAM (SuMa) using 3D Laser Range Data in Urban Environments](http://www.roboticsproceedings.org/rss14/p16.pdf) Depth image based dense direct odometry : use the projective data association between the current scan and a rendered model view from that surfel map.

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [LeGO-LOAM](https://github.com/RobustFieldAutonomyLab/LeGO-LOAM). Lightweight and Ground-Optimized Lidar Odometry and Mapping on Variable Terrain. See [details and some comparisons](https://vio.readthedocs.io/zh_CN/latest/Other/lidarSLAM.html).

<a name="lmestimate"></a>
<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Analysis of Robust Functions for Registration Algorithms](https://arxiv.org/pdf/1810.01474.pdf) importance of **M-estimators** in ICP problems.

* that most outlier filters have similar performance if they are correctly tuned
* Var. Trim., Cauchy, and Cauchy MAD(Median of Absolute Deviation) are more stable against different environment types.
* Norm L1 produces comparable accuracy, while been parameterless.

<div align="center">    
<img src="/assets/img/paperread/filter_icp.png" width="60%"/>
</div>


# 2017 <a name="l2017"></a>

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [On the performance of metrics to predict quality in point cloud representations](https://core.ac.uk/download/pdf/148032116.pdf). Using absolute category rating (ACR) and able to perceive distortions.

<img src="/assets/img/paperread/unhappy.png" width="4%" height="4%"/> [On Subjective and Objective Quality Evaluation of Point Cloud Geometry](https://ieeexplore.ieee.org/document/7965681). Point cloud quality metric using DSIS (double-stimulus impairement scale) methodology. Showing that current state-of-the-art objective metrics (point-to-point, point-to-plane or point-to-mesh) do not predict well visual quality, especially under typical distortions such as compression.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [2D SLAM Quality Evaluation Methods](https://arxiv.org/pdf/1708.02354.pdf). The proportion of occupied and free cells (check wall blurry). The amount of corners and enclosed areas in a map.


# Earlier <a name="lbefore"></a>

<a name="lmestimate-ell"></a>
<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Self-tuning M-estimators 2015](https://europa2.informatik.uni-freiburg.de/files/agamennoni15icra.pdf). Robust least squares is equivalent to maximum-likelihood estimation with elliptically contoured data. One of the advantages of this interpretation is that it enables us to transform the original, non-convex problem into a series of iteratively re-weighted convex sub-problems. This is accomplished via the EM algorithm (Expectation-Maximization).

[Robust Loop Closing Over time for Pose Graph SLAM 2013](http://webdiis.unizar.es/~ylatif/papers/IJRR.pdf) Realizing, Reversing and Recovering (RRR), which clustered the pose graph edges, i.e. constraints consistent with one another (correct loop closures tend to agree among themselves and with the sequential constraints, while incorrect ones do not), using the place recognition constraints.  

<a name="ldyns"></a>
<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> <img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Robust map optimization using dynamic covariance scaling 2013](http://www2.informatik.uni-freiburg.de/~spinello/agarwalICRA13.pdf) faster version of [Switchable Constraints](#lsc) (up to a factor of 10). use a closed form solution for computing the scaling factors individually for each loop closing constrain (instead of adding optimization variable) : $s = \min(1, \frac{2\Phi}{\Phi + \xi_{l}^{2}})$, shows it is an extension of iterative re-weighted least squares (IRLS) and
robust M-Estimation : $w(x) = \frac{1}{1 + x^{2}}$. **Worth a Try!**

<a name="lsc"></a>
<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> <img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Switchable Constraints for Robust Pose Graph SLAM 2012](https://nikosuenderhauf.github.io/assets/papers/IROS12-switchableConstraints.pdf), add a inlier/outlier indicator parameter for each factor. Tried this in our projects, **EXTREMELY EFFICTIVE!**

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [OctoMap 2012](http://www.arminhornung.de/Research/pub/hornung13auro.pdf>`_ `github project <http://octomap.github.io/). Probabilistic representation, Modeling of unmapped areas, Efficiency (octree).


<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Generalized-ICP 2009](https://www.robots.ox.ac.uk/~avsegal/resources/papers/Generalized_ICP.pdf)

* point-to-point ICP: $T = argmin_{T}(\sum_{i}w_{i} \| T b_{i}  - m_{i}  \|^{2})$ with $C_{i}^{B}=I$ and $C_{i}^{A} = 0$
* point-to-plane ICP: $T = argmin_{T}(\sum_{i}w_{i} \| \eta_{i} (T b_{i}  - m_{i})  \|^{2})$ with $C_{i}^{B}=P_{i}^{-1}$ and $C_{i}^{A} = 0$
* generalized ICP :

$$
\begin{aligned}
T & = argmin_{T} \sum_{i} log(p(d_{i})) \\
& = argmin_{T}\sum_{i} d_{i}^{T} (C_{i}^{B}  + T C_{i}^{A}T^{T} )^{-1}  d_{i}  \\
\end{aligned}
$$


<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [On Measuring the Accuracy of SLAM Algorithms 2009](http://www2.informatik.uni-freiburg.de/~stachnis/pdf/kuemmerle09auro.pdf). (RPE vs APE) A metric that operates only on relative geometric relations between poses along the trajectory of the robot.

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [On the Unification of Line Processes, Outlier Rejection, and Robust Statistics with Applications in Early Vision 1995](https://www.cise.ufl.edu/~anand/pdf/ijcv.pdf)

<a name="lbrduality"></a>
<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Pose Estimation from Corresponding Point Data 1989](https://haralick.org/journals/Pose_estimation_from_corresponding_points.pdf)
