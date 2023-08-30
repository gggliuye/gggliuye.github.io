---
layout: page_tree_paper
title: TUM AI Lecture Series
---

[TUM AI Lecture Series 2022](https://www.youtube.com/watch?v=nmRbIbnU0IM&list=PLQ8Y4kIIbzy8kMlz7cRqz-BjbdyWsfLXt):

# Table of Contents

1. [Generation & GANs](#lgan)
2. [Autonomous Driving](#lauto_drive)
3. [Image-based Rendering](#libr)
4. [Self-Supervised Learning](#llearning)
5. [SLAM & Geometry & Robotics](#lslam)
6. [Language](#lnlp)
7. [AR/VR/MR](#lmr)

<a name="lgan"></a>
# 1. Generation & GANs

<img src="/assets/img/paperread/thumbs.png" height="25"/> [New Generative Models for Images, Landscape Videos and 3D Human Avatars(Victor Lempitsky) 2021/02](https://www.youtube.com/live/nmRbIbnU0IM?feature=share).
* [StyleGAN](https://github.com/NVlabs/stylegan) for Landscape *Videos*: [DeepLandscape](https://github.com/saic-mdal/deep-landscape).
  * network feature : duplicted latents - two upsampling structures (one small one large).
  * discriminator : unary (use the smaller one) & pairwise (use both). warp noise maps by homography transformations.
* StyleGAN for 3D Human Avatars. [SMPL-X](https://smpl-x.is.tue.mpg.de/)

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Controllable Content Generation without Direct Supervision (Niloy Mitra) 2020/12](https://www.youtube.com/live/KnKLGJQBdb4?si=Z1i-on7cs6qgdyXe), [Smart Geometry Processing Group](https://geometry.cs.ucl.ac.uk/). **Adobe**.
* Industrial Design : Ideation Sketching -> CAD Modeling -> 3D model.
  * DL Problems : Representation, topology + geometry + material, avoid using 3d training data.
* Learning from Rasterized Vector Data.
  * [Discovering Pattern Structure Using Differentiable Compositing 2020](https://arxiv.org/abs/2010.08788) - Pattern Expansion - Edit in the Wild, while preserving texture structure.
* Learning from Procedural 3D Data.
  * [ShapeAssembly: Learning to Generate Programs for 3D Shape Structure Synthesis 2020](https://arxiv.org/abs/2009.08026).
  * [Sketch2CAD: Sequential CAD Modeling by Sketching in Context 2020](https://geometry.cs.ucl.ac.uk/projects/2020/sketch2cad/)
* Revisiting 'Plato's Cave' : [Escaping Plato's Cave: 3D Shape From Adversarial Rendering 2018](https://arxiv.org/abs/1811.11606).
  * train without access to 3d data.
  * 2d image -> 3d volume -> 2d rendered image -> 2d structured samples.
* Learning Object-aware Scene Representations from Unlabeled Images/Videos.

<a name="lauto_drive"></a>
# 2. Autonomous Driving

[Here for my paper read](/Study/PaperRead/deeplearning/#lauto_drive).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [A Future With Self-Driving Vehicles (Raquel Urtasun) 2021/02](https://www.youtube.com/live/efLZZigsC7c?feature=share).

**Autonomy**:
* we want a system : **Trainable end-to-end & Interpretable for Validation**.
  * End-to-end Approaches. Direct, but not interpretable.
  * Autonomy Stack.
    * HD Maps /Sensors -> Perception -> Prediction -> Planning -> Control.
    * Interpretable, very bad productivity.
* Joint **Perception + Prediction** :
  * [Fast and Furious 2020](https://arxiv.org/abs/2012.12395) lidar object prediction.
  * Interaction Reasoning Network. [Spatially-Aware Graph Neural Networks 2019](https://arxiv.org/abs/1910.08233):
    * Predict considering interaction using GNN.
    * Predicting Marginal Distributions: real world decision should be discrete - consider scenarios separately.
  * [V2VNet 2020](https://arxiv.org/abs/2008.07519): share NN-encoded sensor data between vehicles -> then using GNN.
Simulation.
* Joint **Perception + Prediction + Planning** : [Uber ATG Vision](https://www.uber.com/us/en/atg/research-and-development/perception-and-prediction/): Interpretable Neural Motion Planer
  1. [Neural Motion Planer 2019](https://www.uber.com/blog/research/end-to-end-interpretable-neural-motion-planner/), add a branch from the network as planner -> time & egocar position.
  2. [DSDNet 2020](https://arxiv.org/abs/2008.06041). (1) multi-modal socially-consistent uncertainty; (2) explicitly condition on prediction; (3) use prior (human) knowledge.
  3. [P3: Safe Motion Planning Through Interpretable Semantic Representations](http://www.cs.toronto.edu/~sergio/publication/p3/). Recurrent semantic occupancy map -> to avoid occupied regions.

**Simulation**: Structured Testing, Real World Replay, Sensor Simulation.
* Lidar simulation : [TrafficSim 2021](https://arxiv.org/abs/2101.06557), use real world data (real 3D Assets) to generate preception & prediction data.
* Camera (multi-camera video) simulation : [GeoSim 2021](https://arxiv.org/abs/2101.06543), use real world data to generate (through multi-view mulit-sensor reconstruction network).

<a name="libr"></a>
# 3. Image-based Rendering

<a name="locc_net"></a>
<img src="/assets/img/paperread/chrown0.png" height="25"/> [Neural Implicit Representations for 3D Vision (Andreas Geiger) 2020/09](https://www.youtube.com/watch?v=F9mRv4v80w0). [cvpr talk pdf](https://www.cvlibs.net/talks/talk_cvpr_2020_implicit_scenes.pdf).

<div align="center">    
<img src="/assets/img/paperread/occ_nw.jpg" width="70%"/>
</div>

* 3d representations:
  * Direct representation : voxels, points, meshes.
  * Implicit representation : decision boundary of a non-linear classifier.
* [Occupancy Network](https://avg.is.mpg.de/publications/occupancy-networks) : $L(\theta, \phi) = \sum_{j=1}^{K}BCE(f_{\theta}(p_{ij}, z_{i}), o_{ij}) + KL[q_{\phi}(z\|(p_{ij}, o_{ij}))\|p_{0}(Z)]$.
  * Given the 3d model, we can further do : [Texture Fields 2019](https://openaccess.thecvf.com/content_ICCV_2019/papers/Oechsle_Texture_Fields_Learning_Texture_Representations_in_Function_Space_ICCV_2019_paper.pdf) predicts each 3d point a color. [Occupancy Flow 2019](https://openaccess.thecvf.com/content_ICCV_2019/papers/Niemeyer_Occupancy_Flow_4D_Reconstruction_by_Learning_Particle_Dynamics_ICCV_2019_paper.pdf) predicts 4d - occupancy and velocity.
* [Differentiable Volumetric Rendering 2020](https://www.cvlibs.net/publications/Niemeyer2020CVPR.pdf)： 3d points + encoded image vector -> occupancy and color (for all points).
  * forward pass (rendering) : find surface point along the pixel ray, and get color.
  * backward pass : gradient based on color difference from pixel re-projection.
* [NERF](#lneural_r): <u>integrate all the points in the ray to get color and depth</u>. (while Occupancy Network used only the occupied one)
  * [GRAF 2020](https://proceedings.neurips.cc/paper/2020/file/e92e1b476bb5262d793fd40931e0ed53-Paper.pdf) predict without camera poses. sample rays (patch) and use discriminator.
* [Convolutional Occupancy Networks 2020](https://arxiv.org/abs/2003.04618), uses 3d feature volume.
  * can also use [Fourier Features 2020](https://arxiv.org/abs/2006.10739), fourier feature fits better MLP.


<img src="/assets/img/paperread/chrown0.png" height="25"/> [Reconstructing the Plenoptic Function (Noah Snavely) 2020/10](https://www.youtube.com/live/GNUpZAeBnZc?feature=share), [Notes](/Study/PaperRead/subjects/#l6).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Understanding and Extending Neural Radiance Fields (Jonathan T. Barron) 2022/10](https://www.youtube.com/live/nRyOzHpcr4Q?feature=share), [Jonathan T. Barron](https://jonbarron.info/). See more in [My Neural Rendering Page](/Study/PaperRead/3d_reconstruction/#lneural_r), [My Deep Learning 3D Reconstruction Page](/Study/PaperRead/3d_reconstruction/#ldl).
* [NeRF](https://www.matthewtancik.com/nerf).
* **How NeRF Work** ? [Fourier Features Let Networks Learn High Frequency Functions in Low Dimensional Domains](https://arxiv.org/abs/2006.10739). [Experiments](https://github.com/tancik/fourier-feature-networks/tree/master/Experiments).
  * Toy problem : memorizing a 2d image, a network to predict color for pixel.
    * coordinate to color - (x, y) to (r, g, b). **failed**.
    * coordinate's Fourier feature (～<h>positional encoding</h>) to color. **succeed**.
  * Neural Tangent Kernel (neural networks are kernel regression + ReLU MLPs corresponding to a 'dot product' kernel).
    * with Dot Product of Fourier Features. <u>MLPs are made into "convolution"</u>.
* [Nerf in the Wild](https://nerf-w.github.io/) with appearance & transient embedding.


<img src="/assets/img/paperread/thumbs.png" height="25"/> [Learning to Retime People in Videos (Tali Dekel) 2020/10](https://www.youtube.com/live/Ko1XxJKfQdM?si=3GKQpvojDsgf1oLO)
* Analyzing, Visualizing and Re-rendering people in **videos**.
  * motion visualization, depth prediction, [SpeedNet](https://speednet-cvpr20.github.io/) : adaptive speed up video
* Change the speed of individual people within frames. [Layered Neural Rendering for Retiming People in Video](https://retiming.github.io/). <n>interesting work!</n>
  * Key challenges : space-time correlations; occlusions/dis-occlusions.
  * Layered Decomposition, then we can edit the video by changing the layers.


<img src="/assets/img/paperread/chrown0.png" height="25"/> [Reflections on Image-Based Rendering (Richard Szeliski) 2021/01](https://www.youtube.com/live/0VIUbIzv_wc?feature=share). A overview.

* [Multi-View Stereo](/Study/PaperRead/3d_reconstruction/#ldl_mvs). *Usage* : View Interpolation, View Morphing, interactive 3d scene, etc. *Idea behind*: Plane Sweep Stereo (~Patch Match).
* [Image-Based Rendering](/Study/PaperRead/subjects/#l6): Depth Layers, Multi-plane Images.
* 360 video (panorama).
  * 360 with <u>complete light field</u>: [Google Jump 2015](https://blog.google/products/google-ar-vr/introducing-next-generation-jump/), [Facebook Surround 360 2016](https://engineering.fb.com/2016/04/12/video-engineering/introducing-facebook-surround-360-an-open-high-quality-3d-360-video-capture-system/). Stereo with two 360 cameras.
  * Immersive Video Stabilization by 'Spatio-Temporal MRF Stitch' : reconstruction and merge pictures.
* Large Scale Reconstruction based: <u>cross fade between images</u> to move from one image to other: [Photo Tourism: Exploring Photo Collections in 3D](http://phototour.cs.washington.edu/Photo_Tourism.pdf), using images. [Piecewise Planar Stereo for Image-based Rendering 2009](https://www.microsoft.com/en-us/research/publication/piecewise-planar-stereo-for-image-based-rendering/), using depth layers. [Ambient Point Clouds for View Interpolation 2010](http://simonfuhrmann.de/papers/sg2010-apc.pdf), using point cloud.
* Simgle-Image based:
  * [Practical 3D Photography 2018](http://johanneskopf.de/publications/photo3d_practical/Practical_3D_Photography.pdf), using iphone depth sensor.
  * Using mono-depth: [One Shot 3D Photography 2020](https://facebookresearch.github.io/one_shot_3d_photography/). And 'google photos cinematic effect'.
* Reflections and transparency : Rear layer & normal layer. Gradient domain depth.
* Neural Rendering.
  * [SynSin: End-to-end View Synthesis from a Single Image 2019](https://arxiv.org/abs/1912.08804). <u>predict a heuristic depth map</u>. multi-plane images with depth feature, with a decoder to generate new view.
  * [Animating Pictures with Eulerian Motion Fields 2021](https://eulerian.cs.washington.edu/). <u>predict a heuristic motion map</u>. tracing the motion of depth features, and with a decoder to generate new view.

<a name="llearning"></a>
# 4. Self-Supervised Learning

<img src="/assets/img/paperread/chrown0.png" height="25"/> [On Removing Supervision from Contrastive Self-Supervised Learning 2021/01](https://www.youtube.com/live/VBQti3kNqiI?feature=share) by [Alexei Efros](http://people.eecs.berkeley.edu/~efros/). Self-Supervised Learning (use the tools of supervised learning, but with raw data instead of human-provided labels):
* Self-Supervised Learning <u>Allow to get away from top-down (semantic) categorization</u>. (jump out of concrete objects, to reach **IDEE of Plato**)
  * Per-exemplar **SVM** : [Recognition by Association via Learning Per-exemplar Distances 2008](https://www.cs.cmu.edu/~tmalisie/projects/cvpr08/), [Exemplar-SVM 2011](https://www.cs.cmu.edu/~tmalisie/projects/iccv11/), [Exemplar-CNN 2014](https://arxiv.org/abs/1406.6909).
  * **Similarity Learning** (Constrastive Learning), learning the distances between data.
  * **Data Augmentation** boost similarity learning. and even as supervision to learning ("leak in") - [What Should Not Be Contrastive in Contrastive Learning 2021](https://arxiv.org/abs/2008.05659).
  * Constrastive Learning **without** Data Augmentation - <h>Time as Supervisory Signal</h>（Temporal Continutiy is important to animals）:
    * **Video as graph**.
    * [Contrastive Learning for Unpaired Image-to-Image Translation 2020](https://arxiv.org/abs/2007.15651): using GAN loss, close in structure space, and far in texture space.
* Self-Supervised Learning <u>Enable continuous life-long learning</u>.
  * we never see the same 'training data' in real life. Data augmentation encourage memorizing. -> *Online Continual Learning*. keep using new data to train.
  * [Test-Time Training 2020](https://yueatsprograms.github.io/ttt/home.html), use self-supervised to adapt new data.
  * （<n>实践是交互性的，机器要想更像人就也需要实践，那么仅仅单向地给它数据肯定是不够的，需要它以一种方式和客体发生作用才行。而且这种作用不能只是机械的，而且需要有“能动性”。</n>）

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Learning Representations and Geometry from Unlabeled Videos (Andrea Vedaldi) 2021/01](https://www.youtube.com/live/fVWQGHjRzNU?feature=share). horizontal problems, vertical problems.
**Contrastive Learning** : vector representations.
* Video Timeshift and Inverse: [Multi-modal Self-Supervision from Generalized Data Transformations](https://openreview.net/forum?id=mgVbI13p96)
* Video with Caption: Captioning as a modality for contrastive learning. [Support-set bottlenecks for video-text representation learning](https://arxiv.org/abs/2010.02824), using cross-captioning to be robust against wrong caption.
* Image/Video Labelling:
  * Clustering the representation vectors. [Deep Clustering for Unsupervised Learning of Visual Features](https://arxiv.org/abs/1807.05520) learns the clustering and the representation network.
  * [Self-labelling via simultaneous clustering and representation learning](https://arxiv.org/abs/1911.05371), label assignment by probability.
  * [Labelling unlabelled videos from scratch with multi-modal self-supervision](https://www.robots.ox.ac.uk/~vgg/research/selavi/)

<div align="center">    
<img src="/assets/img/paperread/video_geo_autoencoding.png" width="45%"/>
</div>

* **Video-to-Geometry**: <h>Autoencoding encode to 'shape code' (2d landmarks), then use decoder to reconstruct the original image</h>.
  * [Learning Landmarks from Unaligned Data using Image Translation](https://openreview.net/pdf?id=xz3XULBWFE).
  * [Exemplar Fine-Tuning for 3D Human Model Fitting](https://arxiv.org/abs/2004.03686), video to human 3d model.
  * [C3DPO - Canonical 3D Pose Networks for Non-rigid Structure From Motion](https://github.com/facebookresearch/c3dpo_nrsfm). 2d landmarks to predict model and camera pose.
  * [Canonical 3D Deformer Maps](https://arxiv.org/abs/2008.12709), predicts both depth maps and canonical maps.
  *  Texture transfer, Use Symmetry as supervision.

<div align="center">    
<img src="/assets/img/paperread/C3DPO.png" width="60%"/>
</div>


<a name="lslam"></a>
# 5. SLAM & Geometry & Robotics

<img src="/assets/img/paperread/thumbs.png" height="25"/> [New Methods for Reconstruction and Neural Rendering (Christian Theobalt) 2020/11](https://www.youtube.com/live/cZYUXHsupCE?si=p1ciOezV5NV0uKVm)
* Monocular reconstruction : human hand, human skeleton, human performance (surface), 3d face.
* Nerf : Deep relightable texture. StyleRig -> pose & light.
* [Neural Sparse Voxel Fields 2020](https://arxiv.org/abs/2007.11571).


<img src="/assets/img/paperread/thumbs.png" height="25"/> [Pushing Factor Graphs beyond SLAM (Frank Dellaert) 2020/12](https://www.youtube.com/live/OvcD6Dz2Z20?feature=share), [GTSAM](https://gtsam.org/). Factor Graph Introduction. user case : [Skydio](https://www.skydio.com/) drone, navigation, tracking and motion planning.
* SLAM & GTSAM. Sparse Hessian Matrix - *Bayes Tree* : Incremental & Distributed (sub-trees).
  * [iSAM 2012](https://gtsam-jlblanco-docs.readthedocs.io/en/latest/iSAM.html), ([ICE-BA 2018](https://openaccess.thecvf.com/content_cvpr_2018/papers/Liu_ICE-BA_Incremental_Consistent_CVPR_2018_paper.pdf)).
* Structure from Motion. [GTSFM](/Study/PaperRead/visual_mapping/#lgtsfm) (<n>it is really a nice work.</n>), parallelize SFM over large clusters, using [DASK](https://www.dask.org/).
  * DMV (Detection/Description + Matching + Verification) -> Essential Matrix.
  * [Shonan Rotation Averaging](/Study/PaperRead/visual_mapping/#lrotationaverage)
* Navigation and Control. IMU-preintegration factor is integrated inside GTSAM.
* More.
  * [Batch and Incremental Kinodynamic Motion Planning using Dynamic Factor Graphs](https://arxiv.org/abs/2005.12514). use factor graphs to encode robot dynamics and applied to kino-dynamic motion planning.
  * Optimize control parameters for drone planning.
  * [SwiftFusion](https://github.com/borglab/SwiftFusion) integration with TensorFlow, functions can be made differentiable automatically.


<img src="/assets/img/paperread/thumbs.png" height="25"/> [Sights, Sounds, and Space: Audio-visual Learning in 3D (Kristen Grauman) 2020/12](https://www.youtube.com/live/1EQ6helfvtM?si=fgFcb2G11rndOCvX). <u>Objective : indoor robot mapping & navigation.</u>
* [SoundSpaces](https://vision.cs.utexas.edu/projects/audio_visual_navigation/) : Realistic 3D environments and simulation - with 3D sound.
* [Audio-visual embodied Navigation 2019](https://www.researchgate.net/publication/338158203_Audio-Visual_Embodied_Navigation) : vision + audio + gps -> Critic + Actor -> Action Sampler. (Finding alert task).
  * audio-visual waypoints.
* [Semantic audio-visual Navigation 2020](https://arxiv.org/abs/2012.11583), put all the environmental noise together.
* [Audio-Visual Floorplan Reconstruction 2020](https://arxiv.org/abs/2012.15470), [github](https://github.com/senthilps8/avmap), semantic room mapping. sound contains information of geometry.
* [VisualEchoes: Spatial Image Representation Learning through Echolocation 2020](https://arxiv.org/abs/2005.01616). agent make sound, and listen the echos. Supervision from acoustically interacting with the physical world. **<n>very interesting topic!</n>**
  * help in depth/normal estimation and navigation tasks.
  * VisualEcho-Net + Echo-Net -> Predict Orientation. (self-supervised echo and visual results should match)


<img src="/assets/img/paperread/thumbs.png" height="25"/> [Towards Graph-Based Spatial AI (Andrew Davison) 2020/10](https://www.youtube.com/live/_npGEB3kkVc?si=5tJSMbwS9I1xVzS3). SLAM evolving into **Spatial AI**.
* [FutureMapping: The Computational Structure of Spatial AI Systems 2018](https://arxiv.org/abs/1803.11288)
  * Representation is important (End-to-end might not be possible).
  * There should be a generality to Spatial AI system (for various applications).
* SLAM: [MonoSLAM 2003](https://www.doc.ic.ac.uk/~ajd/Publications/davison_etal_pami2007.pdf), [ElasticFusion 2016](https://www.roboticsproceedings.org/rss11/p01.pdf), [SemanticFusion 2017](https://arxiv.org/abs/1609.05130).
* New Representations for Spatial AI:
  * keyframes : [CodeSLAM 2018](https://github.com/silviutroscot/CodeSLAM), [SceneCode 2019](https://arxiv.org/abs/1903.06482), **per-frame code** for depths & semantics.
  * Dynamic Scene Graphs. SLAM with objects : [MoreFusion 2020](https://github.com/wkentaro/morefusion), [NodeSLAM 2020](https://edgarsucar.github.io/NodeSLAM/).
* Hardware : Event Cameras. (Code Design on) Processors.
* **Gaussian Belief Propagation** for Spatial AI: propagate the covariance of each node, through the graph.
  * [Bundle Adjustment on a Graph Processor 2020](https://arxiv.org/abs/2003.03134).

<a name="lnlp"></a>
# 6. Language

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Explainability and Compositionality for Visual Recognition (Zeynep Akata) 2021/01](https://www.youtube.com/live/wQOkyxqXNhc?si=VN-xJuG4hJRK0mPn).
* Learning with Explanation with Minimal Supervision — Zero-Shot Learning.
  * Image -> Image Features <-(F)-> Class Attributes <- Class Labels.
  * Zero-Shot Learning Train the mapping F. But human made Attributes is needed.
  * <u>Data Augmentation</u> : Text-to-Image GAN. **Text-to-ImageFeature** GAN/VAE.
* Generating Explanations using Attributes and Natural Language — **Image-to-Text**.
  * towards effective human-machine communication.
* Summary, Ongoing work and future work.


<a name="lmr"></a>
# 7. AR/VR/MR

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Photorealistic Telepresence (Yaser Sheikh) 2020/12](https://www.youtube.com/live/2RuzbIS3fTY?si=e0NtJhV-NqMIvAw9), from facebook. Face-to-face social interaction in distance. True presence rather than "perceptually plausible" — Enable **Authentic** Communication in **Artificial** Reality.
* CODEC AVATARS : [Deep Appearance Models for Face Rendering 2018](https://arxiv.org/abs/1808.00362)
  * Encoder/Decoder structure : Human -(encoder)-> code -(decoder)-> Texture & Mesh -> Face.
  * Training Data : Mugsy - all angle camera shot.
  * sensors : 4 eye cameras, 3 month cameras.
* Nerf based 3d reconstruction.
* Hand Tracking, even very complex gestions. [Constraining Dense Hand Surface Tracking with Elasticity 2020](https://research.facebook.com/publications/constraining-dense-hand-surface-tracking-with-elasticity/).
* Audio.
