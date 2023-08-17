---
layout: page_tree_paper
title: TUM AI Lecture Series
---

[TUM AI Lecture Series 2022](https://www.youtube.com/watch?v=nmRbIbnU0IM&list=PLQ8Y4kIIbzy8kMlz7cRqz-BjbdyWsfLXt):

<a name="l1"></a>
## 1

<img src="/assets/img/paperread/thumbs.png" height="25"/> [New Generative Models for Images, Landscape Videos and 3D Human Avatars(Victor Lempitsky) 2021](https://www.youtube.com/live/nmRbIbnU0IM?feature=share).
* [StyleGAN](https://github.com/NVlabs/stylegan) for Landscape *Videos*: [DeepLandscape](https://github.com/saic-mdal/deep-landscape).
  * network feature : duplicted latents - two upsampling structures (one small one large).
  * discriminator : unary (use the smaller one) & pairwise (use both). warp noise maps by homography transformations.
* StyleGAN for 3D Human Avatars. [SMPL-X](https://smpl-x.is.tue.mpg.de/)

## 2

<img src="/assets/img/paperread/chrown0.png" height="25"/> [A Future With Self-Driving Vehicles (Raquel Urtasun) 2021](https://www.youtube.com/live/efLZZigsC7c?feature=share).

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

## 7.3

[TUM AI Lecture Series - Reflections on Image-Based Rendering (Richard Szeliski) 2021](https://www.youtube.com/live/0VIUbIzv_wc?feature=share). A overview.

* Multi-View Stereo. [here my notes](/Study/PaperRead/3d_reconstruction/#ldl_mvs). *Usage* : View Interpolation, View Morphing, interactive 3d scene, etc. *Idea behind*: Plane Sweep Stereo (~Patch Match).
* [Image-Based Rendering](/Study/PaperRead/subjects/#l6): Depth Layers, Multi-plane Images.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Reconstructing the Plenoptic Function (Noah Snavely) 2020](https://www.youtube.com/live/GNUpZAeBnZc?feature=share), [Notes](#l6)

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Neural Implicit Representations for 3D Vision (Andreas Geiger) 2020](https://www.youtube.com/live/F9mRv4v80w0?feature=share), [Notes](/Study/PaperRead/3d_reconstruction/#ldl)
