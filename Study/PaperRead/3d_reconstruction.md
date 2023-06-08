---
layout: page_tree_paper
title: 3D Reconstruction
---

# Table of Contents
* [2021](#l2021)
* [2020](#l2020)
* [2019](#l2019)
* [2018](#l2018)
* [2017](#l2017)
* [2016: Survey](#l2016)
* [Earlier](#learlier)

### Point cloud generation

* (local method) 3d grid (TSDF, ESDF) + matching cube. (especially [voxblox](#lvoxblox))
* (global method) point cloud + possion reconstruction.
* (<u>currently used in pipeline</u>) Delaunnay triangulation. (especially [Robust and efficient surface reconstruction from range data](#colmapdelaunay))
* Deep learning method. (see more in [Deeplearning methods](/Study/PaperRead/subjects/#l3))
   * use nerf to process rays.
   * use implicit neural representation to solve geometry problems (SDF).

<p/><p/>

# 2021 <a name="l2021"></a>

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

# 2020 <a name="l2020"></a>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Deep Local Shapes: Learning Local SDF Priors for Detailed 3D Reconstruction](https://arxiv.org/pdf/2003.10983.pdf) replace traditional signed distance function with neural network.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Point2Mesh: A Self-Prior for Deformable Meshes](https://arxiv.org/pdf/2005.11084.pdf) using DL method (Neural Self-Priors) iteratively shrink-wrap the initial mesh, leading to a watertight reconstruction (fits the point cloud).

<img src="/assets/img/paperread/unhappy.png" height="25"/> [A 3D Surface Reconstruction Method for Large-Scale Point Cloud Data](https://www.hindawi.com/journals/mpe/2020/8670151/) nothing new.

# 2019 <a name="l2019"></a>

<img src="/assets/img/paperread/unhappy.png" height="25"/> [Detail Preserved Surface Reconstruction from Point Cloud](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6471080/) (noise image based point cloud) a new Visibility Model : $(1-e^{d^{2}/2 \sigma^{2}})$.


# 2018 <a name="l2018"></a>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Reconstructing Thin Structures of Manifold Surfaces by Integrating Spatial Curves](https://ieeexplore.ieee.org/document/8578403). use image based 3d curve reconstruction to enhance thin structures.

* compute 3D curves based on the initialize-optimize-extend strategy.
* Curve-conformed Delaunay Refinement to preserve thin structures: make sure Delaunay has kept all the segments of curves, and close region has finer triangles. Add sepcial energy to tetrahedra belonging to the same curve.

# 2017 <a name="l2017"></a>

<a name="lvoxblox"></a>
<img src="/assets/img/paperread/chrown0.png" height="25"/> [Voxblox: Incremental 3D Euclidean Signed Distance Fields for On-Board MAV Planning](https://arxiv.org/abs/1611.03631), [github code](https://github.com/ethz-asl/voxblox). state of art, TSDF, ESDF, and meshing. **Extremely efficient!**, wonderfully engineering art. (I had been using it for several years)

# 2016 <a name="l2016"></a>

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


# Earlier <a name="learlier"></a>

<img src="/assets/img/paperread/thumbs.png" height="25"/>  [Superpixel meshes for fast edge-preserving surface reconstruction 2015](https://openaccess.thecvf.com/content_cvpr_2015/papers/Bodis-Szomoru_Superpixel_Meshes_for_2015_CVPR_paper.pdf) superpixels and second-order smoothness constraints. based on Single-view 3D mesh reconstruction: 2D base mesh extraction, Depth reconstruction, then point cloud and mesh.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Planar Shape Detection and Regularization in Tandem 2015](https://hal.inria.fr/hal-01168394/document) automated detection and regularization of primitive shapes from unorganized point clouds. And enforcing parallel and orthogonality constraints in the detection of planes. repeating the following:

* uniformly distributed seeds, region grow, detect primitive shapes.
* regularization and adjust coplanarity.

<div align="center">    
<img src="/assets/img/paperread/sdp_2015.png" width="90%"/>
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

* [baseline (the following paper)](#lcolmapdelaunay) constant point weight.
* point weight depends on the number of observations, make a filter strategy for the initial Delaunay. (**closer to the colmap implementation**)
* a free-space-support weight function. compute all weights in the same way as the base-line approach. Then search for all large jumps and multiply the corresponding t-edge weights. (good for noisy data, need to test)

<a name="colmapdelaunay"></a>
<img src="/assets/img/paperread/chrown.png" height="25"/> [Robust and efficient surface reconstruction from range data 2009](https://www.cs.jhu.edu/~misha/ReadingSeminar/Papers/Labatut09.pdf) formulates of the surface reconstruction problem as an energy minimisation problem that explicitly models the scanning process. Uses Delaunay triangulation to formulate as a graph cut problem using line of sight information: labeling interior/exterior. (colmap uses its implementation).

* minimum cuts for optimal surface reconstruction :
    * removing the edges connecting two sets of vertices, that is finding two disjoint sets S and T,
    * with a cost: the sum of the capacities of the edges going from S to T.
    * same as computing the maximum flow from the source s to the sink t.

$$
c(S, T) = \sum_{v_{i} \in S \setminus \{s\} \\ v_{j} \in T \setminus \{t\}} w_{ij} + \sum_{v_{i} \in S \setminus \{s\}} t_{i} + \sum_{v_{i} \in T \setminus \{t\}} s_{i}
$$

* Surface visibility: soft visibility

<div align="center">    
<img src="/assets/img/paperread/soft_viz.png" width="70%"/>
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
<img src="/assets/img/paperread/del_vor.png" width="70%"/>
</div>
