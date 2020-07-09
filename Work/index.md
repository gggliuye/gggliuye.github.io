# This is my work Log

In UTOPA, Guangzhou China.

I don't know why I an writing this. Nobody will read it, not even me , maybe.
Partly, I want to kill time. Partly, we all want to find somewhere personal to write something.

It is earnestly hoped that I can be a better person, that I can have a life which I will not be regret for.

For my prespective, I have three directions of work. (updated 2020/06)
### Moblie Phone Visual SLAM
We use the ORBSLAM2 base to develop a SLAM system, we our (mostly mine) modification of the code to better suit our project. [videos](https://www.bilibili.com/video/BV1Xk4y1d7ap/)
* Use a marker image to initialize the SLAM system, to have a faster and better initialization, and have an accurate estimation of the scale. 
* A system to offer a result with higher frequence, which is realized using optical flow tracking and pose only bundle adjustment.
* A loop clousre system based on marker images (some posters that we can put in our scene), use an other system to obatin the exact pose of all the marker in our coordinate system. As a result, this loop clousre system is perfectly match with one single global map.
* Now is working with PCG (preconditioned conjugate gradient) algorithm to accelerate the SLAM system [my blog](https://blog.csdn.net/weixin_44492024/article/details/106353397) . And also prepare the implementation of incremental bundle adjustment.

### Marker image based tracking
We have another co-worker deal with it, but I think he didn't do a great job. So I have realize all the algorithms on my own, in my private time. [videos](https://www.bilibili.com/video/BV1Ma4y1t7oD/)
* Single marker detection (version of my co-worker is ORB feature match based, and version of mine is a brute force finder). Mine version could realize a faster and more robust detection.
* Multi-marker tracking, based on optical flow tracking and a NCC patch match to refine.
* Structed markers detection and tracking ('structed' means we have prior of the relative poses of the markers). Particularly, I build a system to track a cube object (we track its four side faces). 
* Cooperate with a third-party SLAM system. Particularly, our system (and the demo video) is a cooperation with ARCORE (from google), and we realize a basic demo which has the potentail to achieve Vuforia's performance.

### Single image based large scene localization
I am fully in charge of this part. Our system is based on Colmap SFM system, but I have our own modification to make it work for our system. [videos_indoor](https://www.bilibili.com/video/BV1NZ4y1j7Ba/) [videos_ar](https://www.bilibili.com/video/BV1Ci4y1b79V/) [video_outdoor](https://www.bilibili.com/video/BV1VT4y157NH/).
* [My work of the first period](https://vio.readthedocs.io/) is mostly to study and to prepare the modules. And we have built all the basic algorithm interface of C++, C#, and java to support.
* We use a fast blur detection algorithm to reject bad image frames.
* We have built a IMU based scale estimation algorithm.
* We have built a system to allow to use a third-party lidar device to help optimize our map.
* We are now developping a deep learning based feature detection algorithm to deal with the illumination changing.
* We are now developping a solid lidar based visual-lidar system to get a better and more dense result.
* We are working with Deep learning based MVS methods. [articles research](https://docs.qq.com/slide/DUndnS2pwbkRiQmZM) [DeepMVS test](https://gitee.com/gggliuye/VIO/blob/master/DeepMVS/Result_show.ipynb)


# Diary
Some the develop diary. 
Most of them are in my private workfile (invisible here)

[Diary](Diary/)

# ServerLocalization

[ServerLocalization](ServerLocalization/)

## Mappings

[Colmap extremely large scene](https://www.voxxlr.com/s/1594282119587)

[RealSense lidar pop art](https://www.voxxlr.com/s/1594283047256)

[RealSense lidar office](https://www.voxxlr.com/s/1594283095264)

# WebGL demo
(worked with my own effort)
* First demo : use threejs to load and show a point cloud (which I encoded into json form).
* Second demo : use threejs to show a computer vision algorithm based 3d reconstruction.
[WebGL demo](../WEBGL/threejs)



## Home
[Home](../)
