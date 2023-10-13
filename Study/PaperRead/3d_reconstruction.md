---
layout: page_tree_paper
title: 3D Reconstruction
---

# Table of Contents
* [Summary](#lsum)
* [Deep Learning](#ldl)
    1. [Neural Rendering](#lneural_r)
    2. [SDF](#ldl_sdf)
    3. [Multi-View Geometry](#ldl_mvs)
* [2022](#l2022)
* [2021](#l2021)
* [2020](#l2020)
* [2019](#l2019)
* [2018](#l2018)
* [2017](#l2017)
* [2016: Survey](#l2016)
* [Earlier](#learlier)

<a name="lsum"></a>
# Summary

* (local method) 3d grid (TSDF, ESDF) + matching cube. (especially [voxblox](#lvoxblox))
* (global method) point cloud + possion reconstruction.
* (<u>currently used in pipeline</u>) Delaunnay triangulation. (especially [Robust and efficient surface reconstruction from range data](#colmapdelaunay))
* [Deep learning method](#ldl).

<p/><p/>

<a name="ldl"></a>
# Deep Learning

More Work are done with Deep Learning.

<img src="/assets/img/paperread/chrown.png" height="25"/> [TUM AI Lecture Series - Image-based Rendering](/Study/PaperRead/tum_ai/#libr).

<img src="/assets/img/paperread/chrown.png" height="25"/> [LLFF: Local Light Field Fusion: Practical View Synthesis with Prescriptive Sampling Guidelines](https://arxiv.org/abs/1905.00889), [github](https://github.com/Fyusion/LLFF)


<a name="lneural_r"></a>
## 1. Neural Rendering

* [NeRF Explosion 2020](https://dellaert.github.io/NeRF/). [NeRF at ICCV 2021](https://dellaert.github.io/NeRF21/). [NeRF at CVPR 2022](https://dellaert.github.io/NeRF22/).
* [Awesome NERF](https://github.com/awesome-NeRF/awesome-NeRF).


<img src="/assets/img/paperread/chrown.png" height="25"/><img src="/assets/img/paperread/chrown.png" height="25"/> [NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis 2020](https://arxiv.org/abs/2003.08934). **MLP taking in a 5D coordinate and outputting density and color**. Trainning a map : $F_{\Theta}(x, d) \to (x, \sigma)$ , from the pixel ray - defined by x (optical center), d (direction), to volumn density and color. <u>Each pixel ray will be sampled to 'N_sample' points, each point run the network, then integrated to get the final value.</u>

<div align="center">  
  <pre class="mermaid">
        graph LR
        A[Position of point] --> B[MLP encoder]
        B --> C[FCxN]
        C --> D[FC]
        B --> D
        D --> E[FCxN]
        E --> F
        X[Direction of ray] --> Y[MLP encoder] --> F[FC]
        F --> G[RGB & sigma]
        style A fill:#f9f,stroke:#333,stroke-width:4px
        style X fill:#f9f,stroke:#333,stroke-width:4px
        style G fill:#bbf,stroke:#333,stroke-width:4px
  </pre>
</div>

* Need times to train for each data session.
* Train LLFF dataset (“forward-facing” scenes) in “normalized device coordinates” (NDC) space; large rotation scene in conventional 3D world coordinates.
* [google jaxnerf implementation](https://github.com/google-research/google-research/tree/master/jaxnerf), [see here with my tests](https://github.com/yeliu-deepmirror/nerf).

**NERF Extension**:
* Add Depth Loss: <img src="/assets/img/paperread/thumbs.png" height="25"/> [Depth-supervised NeRF: Fewer Views and Faster Training for Free 2021](https://www.cs.cmu.edu/~dsnerf/) with probabilisitic COLMAP depth supervision. [github loss](https://github.com/dunbar12138/DSNeRF/blob/main/loss.py). (I made this update with [NERF PL](https://github.com/yeliu-deepmirror/nerf_pl), no much improvement found)
* Enable Localization: <img src="/assets/img/paperread/thumbs.png" height="25"/> [LENS: Localization enhanced by NeRF synthesis 2021](https://arxiv.org/abs/2110.06558) use [Nerf in the Wild](#lnerfw) to perform data incrementation, for trainning a pose regressor.
* <img src="/assets/img/paperread/chrown.png" height="25"/> [NeRF in the Wild: Neural Radiance Fields for Unconstrained Photo Collections 2020](https://arxiv.org/abs/2008.02268) to address ubiquitous, real-world phenomena : moving objects or variable illumination. <a name="lnerfw"></a>
  * step 1. model per-image appearance variations in a learned low-dimensional latent space. -> control of the appearance of output.
  * step 2. model the scene as the union of shared and image-dependent elements.
  * [see here for a wonderful implementation using pytorch-lightning](https://github.com/kwea123/nerf_pl/tree/nerfw), which also fits input from colmap. [see here with my tests](https://github.com/yeliu-deepmirror/nerf_pl).

<div align="center">    
<img src="https://github.com/yeliu-deepmirror/nerf_pl/raw/e4037569ad3bf6e32177cfaf0961522d1425a23d/docs/demo.gif" width="75%"/>
</div>
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [DIVeR: Real-time and Accurate Neural Radiance Fields with Deterministic Integration for Volume Rendering](https://openaccess.thecvf.com/content/CVPR2022/papers/Wu_DIVeR_Real-Time_and_Accurate_Neural_Radiance_Fields_With_Deterministic_Integration_CVPR_2022_paper.pdf), [DIVeR](https://lwwu2.github.io/diver/) use a voxel-based representation to guide a deterministic volume rendering scheme, allowing it to render thin structures and other subtleties missed by traditional NeRF rendering. (Best Paper Finalist 2022).
* **Large Scene** <img src="/assets/img/paperread/chrown.png" height="25"/> [Block-NeRF Scalable Large Scene Neural View Synthesis](https://openaccess.thecvf.com/content/CVPR2022/papers/Tancik_Block-NeRF_Scalable_Large_Scene_Neural_View_Synthesis_CVPR_2022_paper.pdf), [Waymo Google](https://waymo.com/intl/zh-cn/research/block-nerf/). scales NeRF to render city-scale scenes, decomposing the scene into individually trained NeRFs that are then combined to render the entire scene. Results are shown for 2.8M images.

**NERF Acceleration**:
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields 2021](https://jonbarron.info/mipnerf/), [paper](https://arxiv.org/pdf/2103.13415.pdf), [github](https://github.com/google/mipnerf).
  * Nerf : can cause excessive blurring and aliasing.
  * Mip-NeRF: casting a **cone** from each pixel. <u>integrated positional encoding (IPE)</u> by each conical frustum (instead of position in Nerf).
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Baking Neural Radiance Fields for Real-Time View Synthesis 2021](https://arxiv.org/pdf/2103.14645.pdf), [github](https://github.com/google-research/google-research/tree/master/snerg). Sparse Neural Radiance Grid (SNeRG, sparse 3D voxel grid data structure storing a pre-trained NeRF model), accelerates rendering procedure.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [KiloNeRF: Speeding up Neural Radiance Fields with Thousands of Tiny MLPs 2021](https://arxiv.org/pdf/2103.13744.pdf).  replaces a single large NeRF-MLP with thousands of tiny MLPs, accelerating rendering by 3 orders of magnitude.
* (**Voxel representation**) <img src="/assets/img/paperread/chrown.png" height="25"/> [Plenoxels: Radiance Fields without Neural Networks](https://arxiv.org/abs/2112.05131), [github](https://github.com/sxyu/svox2). **<h>foregoes MLPs altogether</h>** and optimizes opacity and view-dependent color (using spherical harmonics) directly on a 3D voxel grid.
  * key features : Trilinear Interpolation, Total Variation Regularization.
* (**Mesh representation**) <img src="/assets/img/paperread/chrown0.png" height="25"/> [MobileNeRF 2023](https://mobile-nerf.github.io/): **textured triangle mesh representation**, can be rendered with the traditional polygon rasterization pipeline, which provides massive pixel-level parallelism. <h>offers demo to run in phone</h>.
  * [shader code](https://github.com/google-research/jax3d/blob/main/jax3d/projects/mobilenerf/view_unbounded.html).
  * The current **training is slow** due to NeRF’s MLP backbone.
* (**Pointcloud representation**) <img src="/assets/img/paperread/chrown.png" height="25"/> [3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://github.com/graphdeco-inria/gaussian-splatting), uses 3d Gaussian (~**pointcloud**) as representation. <a name="lgs"></a>
  * Initialize with SFM sparse pcl.
  * Properties to optimize: 3D position, opacity 𝛼, anisotropic covariance, and [spherical harmonic](https://mathworld.wolfram.com/SphericalHarmonic.html) (SH) coefficients.
  * Point-based 𝛼-blending enable fast rendering.
  * It produces the **<h>best Nerf Results:</h>** [test repo & result](https://github.com/yeliu-deepmirror/gaussian-splatting).

<details style="margin-left: 50px; background-color: #eeeeee;">
<summary class="summary"> Gaussian Splatting Details </summary>
<li><a>Anisotropic covariance: use scale vector and rotation to model (to ensure covariance being positive semi-definite).</a></li>
<li><a>Tile-based rasterizer for feat optimization, <a href="https://github.com/graphdeco-inria/diff-gaussian-rasterization">github code</a>.</a></li>
<li><a>D - Structural SIMilarity (SSIM) image loss (introduced in "Structural Similarity-Based Object Tracking in Video Sequences").</a></li>
<li><a href="https://github.com/aras-p/UnityGaussianSplatting">Unity3D tool for gaussian splitting rendering.</a></li>
</details>

<div align="center">    
<img src="/assets/img/paperread/3d_gaussian.png" width="85%"/>
</div>

<div align="center">    
<video src="https://github.com/yeliu-deepmirror/gaussian-splatting/raw/master/assets/3d_gaussian_test_dm_office.mp4" controls="controls" width="60%"></video>
</div>

**A generalization of the problem**:

<a name="linstant_gtc"></a>
<img src="/assets/img/paperread/chrown.png" height="25"/> [Instant Neural Graphics Primitives 2022](https://github.com/nvlabs/instant-ngp) - An object represented by queries to a nerual network. [git page](https://nvlabs.github.io/instant-ngp/). Train & render NeRF in realtime, and enable various of GUI to interact & visualize & edit.

<div align="center">    
<img src="/assets/img/paperread/instant_gtc.png" width="55%"/>
</div>

* Examples :
  * GigaPixel Image : 2d position X (in image) -> RGB color.
  * SDF : 3d position X -> distance to surface.
  * Nerf : 3d position X + view direction d -> RGB color & density.
  * Radiance Caching : 3d position X + Extra parameters -> RGB color global illumination.
* Acceleration Design :
  * Nerf render process: cut empty space, and cut ray after object.
  * Smaller MLP: memery traffic dominate -> [Fully Fused Neural Network](https://research.nvidia.com/publication/2021-06_real-time-neural-radiance-caching-path-tracing) : entire neural network implemented as single CUDA kernel.
  * Input encoding (see [understanding of input encoding](/Study/PaperRead/tum_ai/#lnerf_understanding)): Multireslution hash encoding - pyramid structure for deep features (<u>use hash to avoid dimensionality exponentially as in the hyper-cubical voxel case</u>).
* [here for my test results](https://github.com/yeliu-deepmirror/instant-ngp/blob/master/docs/nerf_dataset_tips.md#DM), run with a outdoor general data session.

<a name="ldl_sdf"></a>
## 2. SDF

<img src="/assets/img/paperread/thumbs.png" height="25"/> [PermutoSDF: Fast Multi-View Reconstruction with Implicit Surfaces using Permutohedral Lattices 2023](https://arxiv.org/pdf/2211.12562.pdf), [github page](https://radualexandru.github.io/permuto_sdf/), [github](https://github.com/RaduAlexandru/permuto_sdf). (1) use a hashed [permutohedral encoding](https://github.com/RaduAlexandru/permutohedral_encoding)(following [Instant NGP](#linstant_gtc)) to ensure fast training; (2) a novel RGB regularizer to encourage the network to predict high-frequency geometric detail.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [NeuS2: Fast Learning of Neural Implicit Surfaces for Multi-view Reconstruction 2023](https://vcai.mpi-inf.mpg.de/projects/NeuS2/), following work of [Instant NGP](#linstant_gtc).
* multi-resolution hash tables of learnable feature vectors.
* an incremental learning method for learning dynamic scenes.


<img src="/assets/img/paperread/chrown.png" height="25"/> [Occupancy Network](/Study/PaperRead/tum_ai/#locc_net).

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Improving neural implicit surfaces geometry with patch warping 2022](https://arxiv.org/pdf/2112.09648.pdf), [github](https://github.com/fdarmon/NeuralWarp).

<img src="/assets/img/paperread/thumbs.png" height="25"/> [VolSDF: Volume Rendering of Neural Implicit Surfaces 2021](https://arxiv.org/pdf/2106.12052.pdf), [github](https://github.com/lioryariv/volsdf). define the volume density function as Laplace’s cumulative distribution function (CDF) applied to a signed distance function (SDF) representation. model the density:

$$
\sigma(x) = \alpha \Phi_{\beta}(-d_{\Omega}(x))
$$

$$
\begin{equation}
  \Phi_{\beta}(s) =
    \begin{cases}
      \frac{1}{2}exp(\frac{s}{\beta}) & \text{if $s \le 0$}\\
      1 - \frac{1}{2}exp(-\frac{s}{\beta}) & \text{if $s > 0$}
    \end{cases}       
\end{equation}
$$

* MLP1. sdf d and feature z: $f_{\phi}(x) = (d(x), z(x)) \in R^{1+256}$
* MLP2. scene’s radiance field: $L_{\phi}(x, n, v, z) \in R^{3}$


<img src="/assets/img/paperread/chrown.png" height="25"/> [Implicit Neural Representations with Periodic Activation Functions 2020](https://arxiv.org/abs/2006.09661). <u>A continuous implicit neural representation using periodic activation functions that fits complicated signals.</u> Solve challenging boundary value problems.

$$
F(x, \Phi(x), \triangledown_{x}\Phi, \triangledown_{x}^{2}\Phi, ...) = 0
$$

* ReLU networks are piecewise linear incapable of modeling higher-order derivatives. While alternative activations are not well behaved.
* **SIREN**: $\Phi(x) = W_{n}(\phi_{n-1} \circ \phi_{n-2} \circ ... \circ \phi_{0})(x) + b_{n}$, $x_{i} \to \phi_{i}(x_{i}) = sin(W_{i}x_{i} + b_{i})$. The activations of Siren always alternate between a standard normal distribution with standard deviation one, and an arcsine distribution.
* $\Phi(x)$ being a FC, loss be the $\int_{\Omega} \sum_{i}I_{\Omega_{i}}(x)\|F(x)\| dx$. ($\Omega_{i}$ is a sampling)
* Poisson Equation, SDF(+-1), Helmholtz and Wave Equation. [github](https://github.com/vsitzmann/siren).
* Compared with NERF pose encoding in github.


<img src="/assets/img/paperread/chrown0.png" height="25"/> [DeepSDF: Learning Continuous Signed Distance Functions for Shape Representation 2019](https://openaccess.thecvf.com/content_CVPR_2019/html/Park_DeepSDF_Learning_Continuous_Signed_Distance_Functions_for_Shape_Representation_CVPR_2019_paper.html) DeepSDF network outputs SDF value at a 3D query location. Shape completion (auto-decoding) takes considerably more time during inference. [github](https://github.com/facebookresearch/DeepSDF).

<a name="ldl_mvs"></a>
## 3. Multi-View Geometry

### Multi-View Stereo

<img src="/assets/img/paperread/thumbs.png" height="25"/> [PatchmatchNet: Learned Multi-View Patchmatch Stereo](https://openaccess.thecvf.com/content/CVPR2021/papers/Wang_PatchmatchNet_Learned_Multi-View_Patchmatch_Stereo_CVPR_2021_paper.pdf), [github](https://github.com/FangjinhuaWang/PatchmatchNet). checked in a few scenes, and run fusion the pointcloud, not ideal.

<div align="center">    
<img src="/assets/img/paperread/dl_mvs_res.png" width="80%"/>
</div>

### Mulit-View Interpolation

<img src="/assets/img/paperread/chrown0.png" height="25"/> [IBRNet: Learning Multi-View Image-Based Rendering 2021](https://arxiv.org/abs/2102.13090). Start from the target view and *interpolate nearby source images* (instead of encode the whole model - NERF) (<u>similar to traditional MVS pipeline</u>) : (1) select neighbor (source) images; (2) sample depths in each ray, project to the source images; (3) aggregate the source 2d features; (4) synthesis by a Ray Transformer. (But quality slightly worse than NERF).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Light Field Neural Rendering](https://light-field-neural-rendering.github.io/), [google post](https://ai.googleblog.com/2022/09/view-synthesis-with-transformers.html). uses a lightfield parameterization for target pixel and its epipolar segments in nearby reference views.


<a name="l2022"></a>
# 2022

<img src="/assets/img/paperread/thumbs.png" height="25"/> [ACMMP : Multi-Scale Geometric Consistency Guided and Planar Prior Assisted Multi-View Stereo](https://ieeexplore.ieee.org/document/9863705), following work of [ACMM](#lacmm), using planar prior.

<a name="l2021"></a>
# 2021

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Voxel Structure-based Mesh Reconstruction from a 3D Point Cloud](https://arxiv.org/pdf/2104.10622.pdf), [github code](https://github.com/vvvwo/Parallel-Structure-for-Meshing).
It has a classification of meshing methods:

* Approcimation-based method: Poisson, MLS(moving least squares), Scale Space. Rebuild the 2-manifold mesh to fit a point cloud directly. while may loss local details.
* Delaunay-based method: point connection, require ideal point cloud distribution.
* Point Resampling: resample a point cloud into an isotropic one (then we could apply Delaunay).
*  Pre- and Post-processing: mesh denoising, isotropic remesh and mesh repair.

This paper's method contains the following steps:
* pre-treatment : moving least squares smoothing point cloud. delaunay based interpolation to make isotropic point cloud.
* make voxel structure: based on geodesic distance.
* make mesh: resample points in each voxel (using Farthest Point Sampling, and apply dyanmic resample rate), then apply delaunay.

<div align="center">    
<img src="/assets/img/paperread/vox_stru.jpg" width="80%"/>
</div>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Efficiently Distributed Watertight Surface Reconstruction](https://hal.archives-ouvertes.fr/hal-03380593) the distribution of all the steps (Delaunay + graph-cut).

<img src="/assets/img/paperread/unhappy.png" height="25"/> [Dense Surface Reconstruction from Monocular Vision and LiDAR](https://ieeexplore.ieee.org/abstract/document/8793729) LiDAR measurements are integrated into a multi-view stereo pipeline for point cloud densification and tetrahedralization. (the lidar mapping algorithm it used seems terrible, [our algorithm](https://gggliuye.github.io/Study/PaperRead/sensor_fusion/#lliodar_image) is much much better)

<a name="l2020"></a>
# 2020

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Deep Local Shapes: Learning Local SDF Priors for Detailed 3D Reconstruction](https://arxiv.org/pdf/2003.10983.pdf) replace traditional signed distance function with neural network.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Point2Mesh: A Self-Prior for Deformable Meshes](https://arxiv.org/pdf/2005.11084.pdf) using DL method (Neural Self-Priors) iteratively shrink-wrap the initial mesh, leading to a watertight reconstruction (fits the point cloud).

<img src="/assets/img/paperread/unhappy.png" height="25"/> [A 3D Surface Reconstruction Method for Large-Scale Point Cloud Data](https://www.hindawi.com/journals/mpe/2020/8670151/) nothing new.

<a name="l2019"></a>
# 2019

<img src="/assets/img/paperread/unhappy.png" height="25"/> [Detail Preserved Surface Reconstruction from Point Cloud](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6471080/) (noise image based point cloud) a new Visibility Model : $(1-e^{d^{2}/2 \sigma^{2}})$.

<a name="lacmm"></a>
<img src="/assets/img/paperread/chrown0.png" height="25"/> [ACMM Multi-Scale Geometric Consistency Guided Multi-View Stereo](https://arxiv.org/abs/1904.08103), [github](https://github.com/GhiXu/ACMM).
* multi-scalar process to handle low texture area.
* Adaptive checkerboard propagation (~ more complicated DSO pattern).
* used in our project, has good and fast result. <u>but poor in close repeated pattern (close ground)</u>, (might be fixed by plane prior in their following work ACMMP).

<div align="center">    
<img src="/assets/img/paperread/ACMM.svg" width="80%"/>
</div>

<a name="l2018"></a>
# 2018

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Reconstructing Thin Structures of Manifold Surfaces by Integrating Spatial Curves](https://ieeexplore.ieee.org/document/8578403). use image based 3d curve reconstruction to enhance thin structures.

* compute 3D curves based on the initialize-optimize-extend strategy.
* Curve-conformed Delaunay Refinement to preserve thin structures: make sure Delaunay has kept all the segments of curves, and close region has finer triangles. Add sepcial energy to tetrahedra belonging to the same curve.

<a name="l2017"></a>
# 2017

<a name="lvoxblox"></a>
<img src="/assets/img/paperread/chrown0.png" height="25"/> [Voxblox: Incremental 3D Euclidean Signed Distance Fields for On-Board MAV Planning](https://arxiv.org/abs/1611.03631), [github code](https://github.com/ethz-asl/voxblox). state of art, TSDF, ESDF, and meshing. **Extremely efficient!**, wonderfully engineering art. (I had been using it for several years)

<a name="l2016"></a>
# 2016

<img src="/assets/img/paperread/chrown0.png" height="25"/> [A Survey of Surface Reconstruction from Point Clouds](https://hal.inria.fr/hal-01348404v2/document). The Role of Priors :

**Surface Smoothness** :

* Local smoothness: finding zero set of local scalar field.
  * MLS Plannar assumption : [MLS 2003](https://graphics.stanford.edu/courses/cs468-03-fall/Papers/Levin_MovingLeastSquares.pdf), [IMLS 2004](http://graphics.berkeley.edu/papers/Shen-IAI-2004-08/Shen-IAI-2004-08.pdf), [RIMLS 2009](https://hal.inria.fr/inria-00354969/document).
  * MLS Spherical approximations : fits a gradient field of the algebraic sphere s to the input (oriented) normals. [APSS 2007](https://www.labri.fr/perso/guenneba/docs/APSS_sig07.pdf): normal difference, [Non-oriented MLS 2013](https://hal.inria.fr/hal-00857265/PDF/MLS_grad_2013.pdf) : dot product.
  * Hierarchical methods : [multi-level partition of unity 2003](https://faculty.cc.gatech.edu/~turk/my_papers/mpu_implicits.pdf) ~ dynamic radius.
  * Locally Optimal Projection (LOP): ~ evenly distributed resample.
* Global smoothness:
  * [Radial basis functions (RBFs) 2001](https://www.cs.jhu.edu/~misha/Fall05/Papers/carr01.pdf), [Hermite RBF 2005](Scattered Data Approximation.) : a high degree of smoothness through a linear combination of radially symmetric basis functions.
  * Indicator functions : estimating a soft labeling that discriminates the interior from the exterior of a solid shape. [Poisson 2006](https://www.cse.iitd.ac.in/~mcs112609/poission.pdf), [Screened Poisson 2013](https://www.cs.jhu.edu/~misha/MyPapers/ToG13.pdf) (adds positional constraints), [Voronoi-based](http://www.geometry.caltech.edu/pubs/ACTD07.pdf) (uses covariance matrices instead of normals to represent unsigned orientations).
  * Volumetric segmentation: a hard labeling(interior or exterior) of a volumetric discretization. [Spectral surface reconstruction from noisy point clouds 2004](http://graphics.berkeley.edu/papers/Kolluri-SSR-2004-07/Kolluri-SSR-2004-07.pdf) (a graph Laplacian from the Delaunay triangulation). [Poisson 2006](https://www.cse.iitd.ac.in/~mcs112609/poission.pdf).
* Piecewise smoothness.
  * Partitioning-based approaches : segmenting the input points with respect to sharp features (locally or globally).
  * Normal-field based approaches : decoupling the computation of a sharp normal-field from the computation of the surface location. [L1-Sparse reconstruction 2011](https://dl.acm.org/doi/abs/10.1145/1857907.1857911) (L1 norm for normal field to keep sharp boundary). [Edge-aware point set resampling](https://dl.acm.org/doi/10.1145/2421636.2421645) (smooth normals while separating them across sharp features).
  * Direct meshing. [Feature-preserving surface recon- struction and simplification from defect-laden point sets. 2013](http://www.geometry.caltech.edu/pubs/DCAGD13.pdf)
  * [Robust surface reconstruction via dictionary learning 2014](http://staff.ustc.edu.cn/~juyong/Papers/Xiong.Reconstruction.2014.pdf) : each point in the input cloud is approximated by a single point on the output triangle.

**Visibility**:

* Scanner Visibility (ray casting from scanner), [TSDF A volumetric method for building complex models from range images 1996](https://graphics.stanford.edu/papers/volrange/volrange.pdf), <img src="/assets/img/paperread/chrown.png" height="25"/> [Robust and efficient surface reconstruction from range data 2009](#colmapdelaunay) (uses Delaunay triangulation to formulate as a graph cut problem using line of sight information: labeling interior/exterior), <img src="/assets/img/paperread/chrown.png" height="25"/> [TV-L1 range image integration 2007](https://www.cs.jhu.edu/~misha/ReadingSeminar/Papers/Zach07.pdf) (use L1 norm to merge range scan)
* Exterior Visibility (explicit information from the scanner. e.g. camera view-point). Occlusion culling, Cone carving.
* Parity (assuming a closed surface)

**Volume Smoothness** : enforce that the local shape thickness of a surface (i.e. a measurement of its local volume) varies smoothly to fill incomplete point cloud.

* Skeletal regularizers. [Curve skeleton extraction from incomplete point cloud 2009](https://www.cs.princeton.edu/courses/archive/spring11/cos598A/pdfs/Tagliasacchi09.pdf) introduces ROSA (rotational symmetry axis) : the medial axis of a shape approximated by curves.
* Man-made skeletal geometry. Medial priors. Organic skeletal geometry : Tubular components (to fit in particular trees). [Leaf venation patterns 2005](http://algorithmicbotany.org/papers/venation.sig2005.pdf), [3d tree 2010](https://dl.acm.org/doi/10.1145/1866158.1866177).

**Geometric Primitives**: (scene geometry may be explained by a compact set of simple geometric shapes), good for indoor and CAD models (both have samller range).

* Detecting primitives. [RANSAC shape detection 2007](http://www.hinkali.com/Education/PointCloud.pdf) : find planes, spheres, cylinders, cones, and torii though local method. [Model globally, match locally: Efficient and robust 3d object recognition 2010](https://ieeexplore.ieee.org/document/5540108/).
* Primitive consolidation : [Surface reconstruction from fitted shape primitives 2008](https://www.researchgate.net/publication/220839033_Surface_Reconstruction_from_Fitted_Shape_Primitives) plane primitives and align and merge the boundaries of adjacent primitives. Extension of this method: [2009](https://www.researchgate.net/publication/220506388_Completion_and_Reconstruction_with_Primitive_Shapes), [2014](https://link.springer.com/chapter/10.1007/978-3-319-10590-1_40). Augmenting primitive information.
* Volumetric primitives.
* Hybrid methods. <img src="/assets/img/paperread/chrown0.png" height="25"/> [Surface reconstruction through point set structuring 2013](https://hal.inria.fr/hal-00822763/file/paper_hal.pdf) : shape primitives are used to resample the point cloud and enforce structural constraints in the output, looks good to reconstruct buildings. <img src="/assets/img/paperread/chrown0.png" height="25"/> [Watertight scenes from urban lidar and planar surfaces 2013](#watertightscene)

**Global Regularities** : CAD models, man-made shapes and architectural shapes – possess a certain level of regularity. <img src="/assets/img/paperread/chrown0.png" height="25"/> [Structure-aware shape processing 2013](http://www.vovakim.com/papers/14_SIGCourse_StructAware.pdf).

* Symmetry : find transformations, that map a subset of the shape onto itself. [Discovering structural regularity in 3d geometry 2008](http://vecg.cs.ucl.ac.uk/Projects/SmartGeometry/structure/structure_sig_08.html), [Symmetry factored embedding and distance 2010](https://pixl.cs.princeton.edu/pubs/Lipman_2010_SFE/index.php), [Shape analysis with subspace symmetries 2011](http://vecg.cs.ucl.ac.uk/Projects/SmartGeometry/subspace_symmetry/paper_docs/subspaceSymmetry_small_eg11.pdf)
* Structural Repetition (facades): [Non-local scan consolidation for 3d urban scenes 2010](https://dl.acm.org/doi/10.1145/1778765.1778831) (need human), [Adaptive partitioning of urban facades 2011](https://dl.acm.org/doi/10.1145/2070781.2024218) (no human needed), [2d-3d fusion for layer decomposition of urban facades 2011](https://www.cs.tau.ac.il/~dcor/articles/2011/2D-3D-Fusion.pdf) (associate RGB images) : looks good to reconstruct buildings.
* Canonical Relationships (regularity in orientations) :
  * Manhattan-world (MW). [Automatic extraction of manhattan-world building masses from 3d laser range scans 2012](https://www.cs.purdue.edu/cgvlab/papers/aliaga/tvcg12-urban.pdf) : classifying points by shape type – wall, edge, convex corner, or concave corner – and clustering points of a similar type.
  * Consolidating relationships. [Globfit 2011](#globfit), <img src="/assets/img/paperread/chrown0.png" height="25"/> [Planar Shape Detection and Regularization in Tandem 2015](https://hal.inria.fr/hal-01168394/document)(enforcing parallel and orthogonality constraints in the detection of planes), [RAPter method 2015](https://dl.acm.org/doi/10.1145/2766995) (take a user-prescribed set of angles)
  * Canonical building relationships. [2.5D scans 2012](#25dscan)

**Data-driven priors** (semantic objects) : using a collection of known shapes to help perform reconstruction.

* Scene reconstruction by rigid/non-rigid retrieval.
* Object reconstruction by part composition.
* Reconstruction in shape spaces.

**User-Driven Methods** : Topology cues, Structural repetition cues, Primitive relationship cues, Interleaved scanning and reconstruction.

**Evaluation of Surface Reconstruction**: Geometric Accuracy, Topological Accuracy, Structure Recovery, Reproducibility

<a name="learlier"></a>
# Earlier

<img src="/assets/img/paperread/thumbs.png" height="25"/>  [Superpixel meshes for fast edge-preserving surface reconstruction 2015](https://openaccess.thecvf.com/content_cvpr_2015/papers/Bodis-Szomoru_Superpixel_Meshes_for_2015_CVPR_paper.pdf) superpixels and second-order smoothness constraints. based on Single-view 3D mesh reconstruction: 2D base mesh extraction, Depth reconstruction, then point cloud and mesh.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Planar Shape Detection and Regularization in Tandem 2015](https://hal.inria.fr/hal-01168394/document) automated detection and regularization of primitive shapes from unorganized point clouds. And enforcing parallel and orthogonality constraints in the detection of planes. repeating the following:

* uniformly distributed seeds, region grow, detect primitive shapes.
* regularization and adjust coplanarity.

<div align="center">    
<img src="/assets/img/paperread/sdp_2015.png" width="80%"/>
</div>

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Let There Be Color! Large-Scale Texturing of 3D Reconstructions 2014](https://download.hrz.tu-darmstadt.de/pub/FB20/GCC/paper/Waechter-2014-LTB.pdf), [github code](https://github.com/nmoehrle/mvs-texturing) view selection then project to get texture. It performs well in our image mapping mesh result (using poisson). While it has high requirement on the mesh. Tested with some lidar mapping point cloud (made with TSDF + matching cube, without further de-noise), the result mesh is terrible. I presume it is caused by loss of accuracy in TSDF, and noise in lidar data.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Surface Reconstruction through Point Set Structuring 2013](https://hal.inria.fr/hal-00822763/file/paper_hal.pdf).

* structuring and resampling the planar components into planar, crease(to connect adjacent primitives), corner and clutter.
* reconstructing the surface from both the consolidated components and the unstructured points.
* surface is obtained through solving a graph-cut problem formulated on the 3D Delaunay triangulation ([see this part for more details](#colmapdelaunay)). Following by a Surface quality refinement and simplification.

<a name="watertightscene"></a>
<img src="/assets/img/paperread/thumbs.png" height="25"/> [Watertight Scenes from Urban LiDAR and Planar Surfaces 2013](https://hal.inria.fr/hal-00862747/document)

* make into small region.
* conforming constrained Delaunay tetrahedralization (CCDT) to partition 3-dimensional space into tetrahedral cells. (details to read)
* minimum-weight graph-cut. [see more](#colmapdelaunay)

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Real-time 3d reconstruction at scale using voxel hashing](https://niessnerlab.org/papers/2013/4hashing/niessner2013hashing.pdf).

<a name="25dscan"></a>
<img src="/assets/img/paperread/thumbs.png" height="25"/> [2.5D Building Modeling by Discovering Global Regularities 2012](http://qianyi.info/docs/papers/cvpr12_regularity.pdf):three fundamental type of relationships in buildings (for reconstruction from Aerial imagery):

* roof-roof relationships that consist of orientation and placement equalities.
* roof-roof boundary relationships that consist of parallelism and orthogonality relationships.
* boundary-boundary relationships that consist of height and position equality.

finding the relationships via clustering (i.e., clustering similar angles, equality, etc..), they are used to inform the primitive fitting method so that the primitives simultaneously fit to the data and to the relationships.

<a name="globfit"></a>
<img src="/assets/img/paperread/thumbs.png" height="25"/> [GlobFit: Consistently Fitting Primitives by Discovering Global Relations 2011](http://vecg.cs.ucl.ac.uk/Projects/SmartGeometry/globFit/paper_docs/globFit_sigg11.pdf) assuming man-made engineering object, RANSAC -> Find global relationship -> alignment (merge close elements in the orientation space).
Starting from an initial set of detected primitives, parallel, orthogonal, angle-equality, and distance-equality relation-ships are individually detected and carefully selected so as to not cause any relationship conflicts.

<img src="/assets/img/paperread/chrown.png" height="25"/> [Multi-view reconstruction preserving weakly-supported surfaces 2011](https://ieeexplore.ieee.org/document/5995693). Some papers refer this as state-of-art.

* [baseline (the following paper)](#colmapdelaunay) constant point weight.
* point weight depends on the number of observations, make a filter strategy for the initial Delaunay. (**closer to the colmap implementation**)
* a free-space-support weight function. compute all weights in the same way as the base-line approach. Then search for all large jumps and multiply the corresponding t-edge weights. (good for noisy data, need to test)

<a name="colmapdelaunay"></a>
<img src="/assets/img/paperread/chrown.png" height="25"/> <img src="/assets/img/paperread/chrown.png" height="25"/> [Robust and efficient surface reconstruction from range data 2009](https://www.cs.jhu.edu/~misha/ReadingSeminar/Papers/Labatut09.pdf) formulates of the surface reconstruction problem as an energy minimisation problem that explicitly models the scanning process. Uses Delaunay triangulation to formulate as a graph cut problem using line of sight information: labeling interior/exterior. (colmap uses its implementation).

* minimum cuts for optimal surface reconstruction :
    * removing the edges connecting two sets of vertices, that is finding two disjoint sets S and T,
    * with a cost: the sum of the capacities of the edges going from S to T.
    * same as computing the maximum flow from the source s to the sink t.

$$
c(S, T) = \sum_{v_{i} \in S \setminus \{s\} \\ v_{j} \in T \setminus \{t\}} w_{ij} + \sum_{v_{i} \in S \setminus \{s\}} t_{i} + \sum_{v_{i} \in T \setminus \{t\}} s_{i}
$$

* Surface visibility: soft visibility

<div align="center">    
<img src="/assets/img/paperread/soft_viz.png" width="50%"/>
</div>

*  Surface quality: the quality of surface triangle is evaluated as the ratio of the length of their longest edge over the length of their shortest edge (minus one). And Soft 3D beta–skeleton in graph-cut algorithm.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Efficient multi-view reconstruction of large-scale scenes using interest points, Delaunay triangulation and graph cuts 2007](https://ieeexplore.ieee.org/document/4408892). First to consider surface visibility! [the upper paper](#colmapdelaunay) improved this method.

<img src="/assets/img/paperread/chrown.png" height="25"/> <img src="/assets/img/paperread/chrown.png" height="25"/> [Poisson Surface Reconstruction 2006](https://www.cse.iitd.ac.in/~mcs112609/poission.pdf) State-of-art.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [A mesh reconstruction algorithm driven by an intrinsic property of a point cloud 2004](http://www.cad.zju.edu.cn/home/hwlin/pdf_files/A-mesh-reconstruction-algorithm-driven-by-an-intrinsic-property-of-a-point-cloud.pdf). It classfies meshing into the following methods :

* sculpting-based approaches: Delaunay.
* contour-tracing approaches: matching cube, [Hhoppe's](#lhhoppe).
* region-growing approaches: (this paper) keep growing from inital triangulate.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Mesh Optimization 1993](https://hhoppe.com/proj/meshopt/), [paper](https://hhoppe.com/meshopt.pdf). This a very important milestone paper for 3d reconstruction. Its first section - Mesh representation - worth carefully read. It treat the problem as optimization, using a two step greedy method to solve.

* Energy function is : $E = E_{distance} + E_{representation} + E_{spring}$ (see more details in the paper)
* step 1. keep mesh structure, optimize vertices' positions to best fit points.
* step 2. keep vertices' poitions, update mesh structure by three types of updat : edge collapse, edge split or edge swap, to simplify the mesh.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Surface Reconstruction from Unorganized Points 1992](https://hhoppe.com/proj/recon/). This a very important milestone paper for 3d reconstruction, you can found it is the basis of many modern methods. It finds a signed distance function, and use its tangent space to generate mesh. <a name="lhhoppe"></a>
* using a local PCA to find local planes.
* smoothen the planes (by the smoothness of the normals).
* define signed distance by projecting points to local plane.
* tracing its zero set, use a modified matching cube to generate mesh.

<img src="/assets/img/paperread/chrown.png" height="25"/> [Delaunay triangulation 1934](https://en.wikipedia.org/wiki/Delaunay_triangulation): maximize the minimum of all the angles of the triangles in the triangulation. The Delaunay triangulation of a discrete point set P in general position corresponds to the dual graph of the Voronoi diagram for P

<div align="center">    
<img src="/assets/img/paperread/del_vor.png" width="50%"/>
</div>
