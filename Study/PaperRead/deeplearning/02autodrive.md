---
layout: page_tree_paper
title: Autonomous Driving
---

# Table of Contents

1. [HD-Map](#lhd_map)
2. [Learning to Drive](#llearn_drive)



[TUM AI Lecture Series](/Study/PaperRead/tum_ai/#lauto_drive)

<a name="lhd_map"></a>
# 1. HD-Map

<img src="/assets/img/paperread/chrown0.png" height="25"/> [LiDAR2Map: In Defense of LiDAR-Based Semantic Map Construction Using Online Camera Distillation 2023](https://arxiv.org/pdf/2304.11379v1.pdf) generate HD map with lidar and BEV images.

<div align="center">    
<img src="/assets/img/paperread/lidar2map.png" width="40%"/>
</div>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [High-Definition Map Generation Technologies For Autonomous Driving 2022](https://arxiv.org/abs/2206.05400)

<div align="center">    
<img src="/assets/img/paperread/hd_map.png" width="40%"/>
</div>

* Data collection methods.
* Point cloud map generation methods. Better see [Lidar mapping algorithm papers](../lidar_mapping).
* Feature extraction methods for HD maps.
    * Road Network Extraction:
        * 2D Aerial Images : segmentation-based, iterative graph growing, and graph-generation methods.
        * 3D Point Clouds (using segmentation).
        * Sensor Fusion Methods : use both pcls, (aerial/car) images, GPS trajectories.
    * Road Markings Extraction : 2D (aerial/car) images or 3D point clouds (bottom-up method and top-down method).
    * Pole-like Objects Extraction: usually based on segmentation and classification on MLS 3D point clouds
* Framework for HD maps:
    * Lanelet2 : physical layer (points and lines), relational layer, and topological layer.
    * OpenDRIVE : reference line/road (various geometric primitives), lane, and features.
    * Apollo Maps : uses points. Road, Intersection, Traffic signal, Logical relationship & Others.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Computing Systems for Autonomous Driving: State-of-the-Art and Challenges 2020](https://arxiv.org/pdf/2009.14349.pdf). focus on hardware side.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Towards End-to-End Lane Detection: an Instance Segmentation Approach 2018](https://arxiv.org/abs/1802.05591), [github](https://github.com/MaybeShewill-CV/lanenet-lane-detection) lane segmentation.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Computer Recognition of Roads from Satellite Pictures 1976](https://www.academia.edu/36011344/Computer_Recognition_of_Roads_from_Satellite_Pictures)

<a name="llearn_drive"></a>
# 2. Learning to Drive

**Take advantages of [Transformers](https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)).**
* Traditional CV missions (classification, segmentation, etc) are not fit for auto-drive mission.
* Compared to ChatGPT, these models are small. No large model in general Computer Vision yet.
    * Or we might not be able to dig vision data from internet as NLP did - no easy 'gt' could be found.
    * The driving task is still too simple, does not require high level understanding. (we need a better task to dig visual based AI, text-image related tasks might be good)

**Make Large Dataset** from online videos: how to make large dataset:
* video online: no calibration, vision only, on real scale.
* slam mapped dataset (require online video mapping algorithm).

<img src="/assets/img/paperread/chrown.png" height="25"/> [Planning-oriented Autonomous Driving 2023](https://opendrivelab.github.io/UniAD/). **Large model** for auto-drive, an end-to-end paradigm unites modules in perception and prediction. Combine different models together, and jointly optimize them. Made a good starting point for further work.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [PPGeo: Policy Pre-training for Autonomous Driving via Self-supervised Geometric Modeling 2023](https://github.com/OpenDriveLab/PPGeo).

* In the first stage, the geometric modeling framework generates pose and depth predictions simultaneously, with two consecutive frames as input.
* In the second stage, the visual encoder learns driving policy representation by predicting the future ego-motion and optimizing with the photometric error based on current visual observation only.
* [Decision Intelligence Platform for Autonomous Driving simulation](https://github.com/opendilab/DI-drive).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [ACO: Learning to Drive by Watching YouTube videos: Action-Conditioned Contrastive Policy Pretraining 2022](https://github.com/metadriverse/ACO). Use 'pseudo label of action' (made by a supervised -  Inverse dynamics model) to make a model 'learn the features that matter to the output action', which could be further transformed to other tasks.

* [data set list](https://docs.google.com/spreadsheets/d/1KNFFrfEE5q4d40uBR6MN9YtTggnv2o2AHRxGRZMgs3E/edit#gid=1708687592), [data set drive](https://mycuhk-my.sharepoint.com/personal/1155165194_link_cuhk_edu_hk/_layouts/15/onedrive.aspx?id=%2Fpersonal%2F1155165194%5Flink%5Fcuhk%5Fedu%5Fhk%2FDocuments%2Fytb%5Fdriving%5Fvideos&ga=1).
* Train with : Instance Contrastive Pair (ICP) and Action Contrastive Pair (ACP).
* Inverse dynamics : DL Dense Optical Flow [RAFT](https://github.com/princeton-vl/RAFT).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [TCP - Trajectory-guided Control Prediction for End-to-end Autonomous Driving: A Simple yet Strong Baseline 2022](https://github.com/OpenPerceptionX/TCP). two branches for trajectory planning and direct control, respectively.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Video PreTraining (VPT): Learning to Act by Watching Unlabeled Online Videos 2022](https://arxiv.org/abs/2206.11795), [openai page](https://openai.com/research/vpt). Learn to act by watching Minecraft game videos. **Fun!**. gets pseudo action labels from a trained <u>Inverse Dynamics Model</u>.

<img src="/assets/img/paperread/chrown.png" height="25"/> [Momentum Contrast for Unsupervised Visual Representation Learning 2020](https://arxiv.org/abs/1911.05722), [github page](https://github.com/facebookresearch/moco). **Contrastive learning** creates supervisory labels via considering each image (instance) in the dataset forms a unique category and applies the learning objective of instance discrimination.
