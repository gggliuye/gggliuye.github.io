---
layout: page_tree_paper
title: 3D Reconstruction
---

# Table of Contents
* [2021](#l2021)
* [2020](#l2020)
* [2017](#l2017)
* [2016](#l2016)
* [Earlier](#learlier)

<p/><p/>

# 2021 <a name="l2021"></a>

<img src="/assets/img/paperread/chrown0.png" width="4%" height="4%"/> [Voxel Structure-based Mesh Reconstruction from a 3D Point Cloud](https://arxiv.org/pdf/2104.10622.pdf), [github code](https://github.com/vvvwo/Parallel-Structure-for-Meshing).
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

# 2020 <a name="l2020"></a>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Deep Local Shapes: Learning Local SDF Priors for Detailed 3D Reconstruction](https://arxiv.org/pdf/2003.10983.pdf) replace traditional signed distance function with neural network.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [Point2Mesh: A Self-Prior for Deformable Meshes](https://arxiv.org/pdf/2005.11084.pdf) using DL method (Neural Self-Priors) iteratively shrink-wrap the initial mesh, leading to a watertight reconstruction (fits the point cloud).

# 2017 <a name="l2017"></a>

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Voxblox: Incremental 3D Euclidean Signed Distance Fields for On-Board MAV Planning](https://arxiv.org/abs/1611.03631), [github code](https://github.com/ethz-asl/voxblox). state of art, TSDF, ESDF, and meshing. **Extremely efficient!**, wonderfully engineering art. (I had been using it for several years)

# 2016 <a name="l2016"></a>

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [A Survey of Surface Reconstruction from Point Clouds](https://hal.inria.fr/hal-01348404v2/document)



# Earlier <a name="learlier"></a>

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Let There Be Color! Large-Scale Texturing of 3D Reconstructions 2014](https://download.hrz.tu-darmstadt.de/pub/FB20/GCC/paper/Waechter-2014-LTB.pdf), [github code](https://github.com/nmoehrle/mvs-texturing) view selection then project to get texture. It performs well in our image mapping mesh result (using poisson). While it has high requirement on the mesh. Tested with some lidar mapping point cloud (made with TSDF + matching cube, without further de-noise), the result mesh is terrible. I presume it is caused by loss of accuracy in TSDF, and noise in lidar data.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [GlobFit: Consistently Fitting Primitives by Discovering Global Relations 2011](http://vecg.cs.ucl.ac.uk/Projects/SmartGeometry/globFit/paper_docs/globFit_sigg11.pdf) assuming man-made engineering object, RANSAC -> Find global relationship -> alignment (merge close elements in the orientation space).

<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> <img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Poisson Surface Reconstruction 2006](https://www.cse.iitd.ac.in/~mcs112609/poission.pdf) State-of-art.

<img src="/assets/img/paperread/thumbs.png" width="4%" height="4%"/> [A mesh reconstruction algorithm driven by an intrinsic property of a point cloud 2004](http://www.cad.zju.edu.cn/home/hwlin/pdf_files/A-mesh-reconstruction-algorithm-driven-by-an-intrinsic-property-of-a-point-cloud.pdf). It classfies meshing into the following methods :

* sculpting-based approaches: Delaunay.
* contour-tracing approaches: matching cube, [Hhoppe's](#lhhoppe).
* region-growing approaches: (this paper) keep growing from inital triangulate.


<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Surface Reconstruction from Unorganized Points 1992](https://hhoppe.com/proj/recon/). This a very important milestone paper for 3d reconstruction, you can found it is the basis of many modern methods. It finds a signed distance function, and use its tangent space to generate mesh. <a name="lhhoppe"></a>
* using a local PCA to find local planes.
* smoothen the planes (by the smoothness of the normals).
* define signed distance by projecting points to local plane.
* tracing its zero set, use a modified matching cube to generate mesh.


<img src="/assets/img/paperread/chrown.png" width="4%" height="4%"/> [Mesh Optimization 1993](https://hhoppe.com/proj/meshopt/), [paper](https://hhoppe.com/meshopt.pdf). This a very important milestone paper for 3d reconstruction. Its first section - Mesh representation - worth carefully read. It treat the problem as optimization, using a two step greedy method to solve.

* Energy function is : $E = E_{distance} + E_{representation} + E_{spring}$ (see more details in the paper)
* step 1. keep mesh structure, optimize vertices' positions to best fit points.
* step 2. keep vertices' poitions, update mesh structure by three types of updat : edge collapse, edge split or edge swap, to simplify the mesh.
