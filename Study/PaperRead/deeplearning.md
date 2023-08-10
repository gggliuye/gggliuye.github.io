---
layout: page_tree_paper
title: Deep Learning
---

# Table of Contents

1. [Image Generation](#lgeneration)
    1. [Diffusion Model](#ldiff_model)
    2. [VAE (variational auto-encoder)](#lvae)
    3. [GANS](#lgans)
2. [3d Reconstruction](#l3d_recon)
3. [Autonomous Driving](#lauto_drive)
    1. [HD-Map](#lhd_map)
    2. [Learning to Drive](#llearn_drive)
4. [DL Localization](#lloc)
    1. [End-to-end Regression](#lend_to_end_loc)
    2. [DL depth + DL flow -> Pose](#ldeep_flow)
    3. [Match + Relative Pose](#ldense_match)
    4. [Overhead Image localization](#laerial_loc)


<br/><br/>

<a name="lgeneration"></a>
# 1. Image Generation

Differences : ([GANS vs VAEs](https://ai.stackexchange.com/questions/25601/what-are-the-fundamental-differences-between-vae-and-gan-for-image-generation), [GANS vs Diffusion](https://www.sabrepc.com/blog/Deep-Learning-and-AI/gans-vs-diffusion-models))
* <u>GANS</u> : capture less diversity, and difficult to train.
* <u>Likelihood-Based Model</u> (VAEs, Diffusion Models), short of visual sample quality (before [guided-diffusion](#lguided-diffusion)).

<a name="ldiff_model"></a>
## 1.1 Diffusion Model

Transform noise into data through an iterative diffusion process. Each iteration using model to predict noise, assuming gaussian distribution, using fixed variance.

<div align="center">    
<img src="/assets/img/paperread/diff_model.png" width="50%"/>
</div>

Classifier Guidance (sample each iteration on label y, with classifier) :

$$
p_{\theta, \phi}(x_{t}|x_{t+1},y) = Z p_{\theta}(x_{t}|x_{t+1})p_{\phi}(y|x_{t})
$$

<a name="lguided-diffusion"></a>
**OpenAI Guided Diffusion**  [guided-diffusion](https://github.com/openai/guided-diffusion):

* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Denoising Diffusion Probabilistic Models 2020](https://arxiv.org/pdf/2006.11239.pdf), [github](https://github.com/hojonathanho/diffusion).
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Diffusion Models Beat GANs on Image Synthesis 2021](https://arxiv.org/abs/2105.05233). with <h>Classifier Guidance</h>.

**Image-Text** combined with a language transformer:
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Blended Diffusion for Text-driven Editing of Natural Images 2022](https://arxiv.org/abs/2111.14818), [github](https://github.com/omriav/blended-diffusion), **DDPM + [CLIP](#lclip)** (<h>guided fusion using CLIP loss gradient - instead of a classifier</h>), and combine the noised raw image to preserve the background. but very slow.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Blended Latent Diffusion 2023](https://arxiv.org/pdf/2206.02779.pdf), [github](https://github.com/omriav/blended-latent-diffusion). **DDPM + [CLIP](#lclip) + [VAE](#lvae)**, process diffusion in the latent space (<h>VAE encoded space</h>).
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [DreamBooth: Fine Tuning Text-to-Image Diffusion Models for Subject-Driven Generation 2023](https://dreambooth.github.io/). Finetune the model to <u>bind a unique identifier(token) with that specific subject</u>. Text prompt -> SentencePiece tokenizer -> [T5-XXL](https://arxiv.org/abs/1910.10683) language model.

<a name="lvae"></a>
## 1.2 VAE (variational auto-encoder)

**Encoder-Decoder Transformer.**

<a name="ldalle"></a>
<img src="/assets/img/paperread/chrown0.png" height="25"/> [DALL-E : Zero-Shot Text-to-Image Generation 2021](https://arxiv.org/abs/2102.12092), image token (32x32x8192 : [dVAE](https://github.com/openai/DALL-E) - discrete variational autoencoder, based on GPT-3) + text token (256 : BPE-encode) -> train an autoregressive transformer (models the <h>joint distribution</h> over the text and image tokens).

<a name="lgans"></a>
## 1.3 GAN

<img src="/assets/img/paperread/chrown.png" height="25"/> [Generative Adversarial Networks 2014](https://arxiv.org/abs/1406.2661)

<div align="center">    
<img src="/assets/img/paperread/gan_diagram.svg" width="50%"/>
</div>

**CLIP : Contrastive Language-Image Pre-training:**

<a name="lclip"></a>
<img src="/assets/img/paperread/chrown.png" height="25"/> [CLIP : Learning Transferable Visual Models From Natural Language Supervision 2021](https://github.com/OpenAI/CLIP). **Image-Text pairing**: predict the most relevant text snippet, given an image.
* Learning from natural language:
  * **Large Dataset Transfer**. NLP tasks can use web-scale collections of text. while CV tasks depend on crowd-labeled datasets. <h>Use web text in CV leads to breakthough (since transfer trained on large dataset always perform better)</h>.
  * Create connects that representation to language which enables flexible <u>zero-shot transfer</u>.
* Dataset : over 400 million pairs. (<n>how to make such dataset?</n>)
* Model : a image encoder (ViT) & a text encoder (Transformer). <h>Predicts the correct pairings</h> of image and text (instead of words).

<div align="center">    
<img src="/assets/img/paperread/clip.png" width="80%"/>
</div>

**CLIP + GAN :**
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [StyleCLIP: Text-Driven Manipulation of StyleGAN Imagery 2021](https://arxiv.org/abs/2103.17249) : StyleGAN + CLIP. works for the whole image.
  * add CLIP loss, facial identification loss.
  * <u>Global direction</u> (make train faster) : direction in CLIP space -> direction in style space.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Paint by Word 2021](https://arxiv.org/abs/2103.10951) (<u>paintbrush</u>) introduces a mask to control text-image editing.
  * network 1 : scores [masked image]-[text] consistency.
  * network 2 : enforces on realism.
* GANs create abstract artworks. <h>Cannot edit image</h> - while perserve not-masked area of the orginal image.


<a name="l3d_recon"></a>
# 2. 3d Reconstruction

see [3d Reconstruction Page](/Study/PaperRead/3d_reconstruction/#ldl)
1. [Neural Rendering](/Study/PaperRead/3d_reconstruction/#lneural_r)
2. [SDF](/Study/PaperRead/3d_reconstruction/#ldl_sdf)
3. [MVS](/Study/PaperRead/3d_reconstruction/#ldl_mvs)

<a name="lauto_drive"></a>
# 3. Autonomous Driving

<a name="lhd_map"></a>
## 3.1 HD-Map

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
## 3.2 Learning to Drive

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

<a name="lloc"></a>
# 4. DL Localization

<a name="lend_to_end_loc"></a>
## 4.1 End-to-end Regression

input image, directly return the pose (3dof/6dof).

**Pose Regression**:

* <img src="/assets/img/paperread/thumbs.png" height="25"/> [PoseNet: A Convolutional Network for Real-Time 6-DOF Camera Relocalization 2015](https://paperswithcode.com/paper/posenet-a-convolutional-network-for-real-time). Learn the scene, then produce pose for an input image.

**Geo-Localization as Classification** (GPS coordinate as label):

* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Where We Are and What We’re Looking At: Query Based Worldwide Image Geo-localization Using Hierarchies and Scenes 2023](https://arxiv.org/pdf/2303.04249.pdf), **world-wide** visual geo-localization.
  * use S2 block division (size depends on image available in block).
  * localize considering <h>16 scene and 7 hierarchies</h>.

<a name="ldeep_flow"></a>
## 4.2 DL depth + DL flow -> Pose

<n>why not train a network directly regress the relative pose?</n>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [DiffPoseNet: Direct Differentiable Camera Pose Estimation 2022](https://arxiv.org/pdf/2203.11174.pdf), [project page](https://prg.cs.umd.edu/DiffPoseNet).
(1) Get relative pose based on dense optical flow, and image depth.
(2) NFlowNet and Coarse PoseNet together to get fine pose.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Towards Better Generalization: Joint Depth-Pose Learning without PoseNet 2020](https://openaccess.thecvf.com/content_CVPR_2020/html/Zhao_Towards_Better_Generalization_Joint_Depth-Pose_Learning_Without_PoseNet_CVPR_2020_paper.html). DeepFlow -> compute fundamental matrix. -> sparse pcl -> Rescale DeepDepth result.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Unsupervised Learning of Monocular Depth Estimation and Visual Odometry with Deep Feature Reconstruction 2018](https://arxiv.org/abs/1803.03893).

<a name="ldense_match"></a>
## 4.3 Match + (Relative) Pose

### 4.3.1 Dense Image 2d Matching

* Map: images with poses.
* Query Pipeline: Retrieval + Match Features + Relative Poses + Pose Averaging -> Query Camera Pose.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [DKM: Dense Kernelized Feature Matching for Geometry Estimation 2023](https://parskatt.github.io/DKM/). directly output points matches with two input images.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [LoFTR: Detector-Free Local Feature Matching with Transformers 2021](https://zju3dv.github.io/loftr/). directly output points matches with two input images.

### 4.3.2 Image-Scene 2d-3d Matching

**Scene Coordinate Regression**:

<img src="/assets/img/paperread/chrown.png" height="25"/> [Accelerated Coordinate Encoding 2023](https://nianticlabs.github.io/ace/). From Niantic, small scene localization using DL method - fast and high accuracy. Fits well to Niantic's [LightShip](https://lightship.dev/docs/ardk/index.html) (small region vlp around landmarks). <n>Intuition is that each image patch corresponds to a 3d point in scene.</n>
  * predict a 3d scene coordinate for each input image patch, then apply PNP ransac for pose estimation.
  * accelerate the trainning loop, compare to [DSAC*](https://github.com/vislearn/dsacstar).
  * For few-shot mapping: <n>use the encoder to get descriptors for each image patch, following by NN match + Triangulation to get 3d position. Use NN to find corresponding 3d points by descriptors.</n>. [ace encoder test](https://github.com/yeliu-deepmirror/ace#encoder-test)

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Learning to Detect Scene Landmarks for Camera Localization 2022](https://openaccess.thecvf.com/content/CVPR2022/papers/Do_Learning_To_Detect_Scene_Landmarks_for_Camera_Localization_CVPR_2022_paper.pdf), [github](https://github.com/microsoft/SceneLandmarkLocalization). predict 2d localization of a predefined scene landmark (predict heat map for each scene landmark).

<div align="center">    
<img src="/assets/img/paperread/learnlandmark.png" width="50%"/>
</div>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Visual Camera Re-Localization from RGB and RGB-D Images Using DSAC 2021](https://arxiv.org/pdf/2002.12324.pdf). predict scene coordinates, i.e. dense correspondences between the input image and 3D scene space of the environment.

<a name="laerial_loc"></a>
## 4.4 Overhead Image localization

**global image descriptor-based** (limited by sampling density of satellite images, mostly need panorama image as input):
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Spatialaware feature aggregation for image based cross-view geolocalization 2019](https://proceedings.neurips.cc/paper_files/paper/2019/file/ba2f0015122a5955f8b3a50240fb91b2-Paper.pdf) panorama - aerial image, localization (with <u>north direction known</u>). **global descriptor retrieval**.
  * use **<h>regular polar transform</h>** to warp an aerial image such that its domain is closer to that of a ground-view panorama.
  * **<h>SAFA</h>**: Spatial-aware Feature Aggregation with an attention mechanism.
  * require reference image at <u>the same (close) location</u> inside database.
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [VIGOR: Crossview image geo-localization beyond one-to-one retrieval 2021](https://arxiv.org/abs/2011.12172), [github](https://github.com/Jeff-Zilence/VIGOR). panorama - aerial image, localization.
  * has **<h>coarse-to-fine</h>** :
    * global descriptor image retrieval.
    * within-image calibration (using a MLP to predict offset from descriptors).
  * it **<h>beyond one-to-one</h>**: re-weight the embeddings in accordance with their positions.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Visual cross-view metric localization with dense uncertainty estimates 2022](https://arxiv.org/abs/2208.08519). use raw aerial image to refine pose, after global retrieval.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Accurate 3-dof camera geo-localization via ground-to-satellite image matching 2022](https://arxiv.org/abs/2203.14148), use both <u>polar transform and the projective transform</u>.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [SliceMatch: Geometry-guided Aggregation for Cross-View Pose Estimation 2023](https://arxiv.org/pdf/2211.14651.pdf). compute <h>column-wise-slice image descriptors</h>, to enable return orientation.


**dense pixel-level feature-based** (using the geometric relationship - as camera pose optimization):
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Beyond Cross-view Image Retrieval: Highly Accurate Vehicle Localization Using Satellite Image 2022](https://arxiv.org/abs/2204.04752), [github](https://github.com/shiyujiao/HighlyAccurate). Given a coarse initial estimation, optimize pose based on **<h>the projection error</h>** of the satellite deep features to a ground viewpoint.
  * 3d point reprojection error, using coarse-to-fine LM.
  * <u>setting all the points in ground image on ground</u> (to have 3d points).
  * pose error as the trainning loss.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Satellite Image Based Cross-view Localization for Autonomous Vehicle 2023](https://arxiv.org/abs/2207.13506), the same pipeline as upper paper, but with more refinement.
* <img src="/assets/img/paperread/chrown.png" height="25"/> [OrienterNet: Visual Localization in 2D Public Maps with Neural Matching 2023](https://arxiv.org/pdf/2304.02009v1.pdf), **<h>ETH, META</h>**.
  1. Bird’s-Eye View inference (given height & gravity), encode input image to BEV.
  2. Map encoding, encode the raster map (from OSM).
  3. BEV-map matching, to get 3dof (x,y,yaw) pose.

<n>Can we give an encoded id to each building in city, and use them to localize query image?</n>
