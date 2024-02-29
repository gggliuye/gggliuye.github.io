---
layout: page_tree_paper
title: Deep IMU Processing
---


<img src="/assets/img/paperread/chrown.png" height="25"/> [Deep Learning for Inertial Positioning: A Survey 2023](https://arxiv.org/pdf/2303.03757.pdf) forces on **2018-2022** updates.
* Pedestrian : incorporating domainspecific knowledge or other sensor. (1) pedestrian dead reckoning (PDR): detecting steps, estimating step length, heading. (2) zero-velocity update (ZUPT).
* **Inertial sensor calibration**. (<u>typically dependent on the specific sensor or platform used</u>)
  1. Supervised by more accurate IMU data (expensive).
  2. Supervised by integrated orientation. [OriNet 2019](https://ieeexplore.ieee.org/document/8931590). [Calib-Net 2022](https://www.frontiersin.org/articles/10.3389/frobt.2021.772583/full).
  3. Learn calibration parameters. [Learning to calibrate 2019](https://journals.sagepub.com/doi/full/10.1177/0278364919844824) uses RL.
* **Imu integration correction**.
  1. Learn location displacement - the average velocity multiplied by a fixed period of time.
    * [IONet 2018](https://arxiv.org/abs/1802.02209) the frequency of platform vibrations - absolute moving speed.
    * [MotionTransformer 2019](https://ojs.aaai.org/index.php/AAAI/article/view/4802) extend adaptability using GAN.
    * [TLIO 2020](https://arxiv.org/abs/2007.01867) extend to 3d pedestrian, use EKF.
  2. Learn velocity - to correct accelerations. mostly in pedestrian.
  3. Learn velocity - to correct KF state.
    * [AI-IMU 2020](https://ieeexplore.ieee.org/document/9035481) estimate velocity covariance.
    * [RNN 2021](https://arxiv.org/pdf/2103.14286.pdf) Alibaba, model motion with imu only.
    * [DeepVIP 2022](https://ieeexplore.ieee.org/document/9860093) (indoor) velocity & heading.
    * [OdoNet 2022](https://arxiv.org/abs/2109.03091) speed learning and ZUPT.
* Correct pedestrian position, learn PDR and learn ZUPT.
* **Deep sensor fusion**, mostly VIO.
  * Supervised end-to-end.
  * Unsupervised using view synthesis.

<img src="/assets/img/paperread/chrown0.png" height="25"/> [OdoNet: Untethered Speed Aiding for Vehicle Navigation Without Hardware Wheeled Odometer 2021](https://arxiv.org/abs/2109.03091), CNN sequence IMU to predict front velocity.
* <u>make a full system to combine CNN with filter.</u>
  * CNN module + INS module + Filter Fusion module.
  * <u>consider also the car-imu extrinsics, and the IMU noise model (fixed by Filter).</u>
* use CNN instead of RNN, for fast convergence and better accuracy.
* <n>We cannot tell the difference between static car and constant velocity motion, so it should be better to estimate delta velocity.</n>

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Inertial sensing meets machine learning: Opportunity or challenge? 2020](https://arxiv.org/pdf/2007.06727.pdf) similar structure as the more latest paper, but includes more old researches.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [AI-IMU Dead-Reckoning 2020](https://ieeexplore.ieee.org/document/9035481), [github](https://github.com/yeliu-deepmirror/ai-imu-dr). predict the front velocity covariance, then use the constraint for state estimation. I have been [testing IMU-positioning](https://github.com/yeliu-deepmirror/ai-imu-dr/wiki/Development-2024) based on this model.
