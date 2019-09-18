## 2019/09/17

### Future directions

When working in a company out of school, I found I am kind of lost, nobody tells me what to do, or how to make myself better.
I must find a correct direction for myself. For my recent work, I am thinking some possible choices:

+ **ORBSLAM with IMU** : This is an update based on a open source project, and It has already been done by someone else. However, I is a wonderful examine for my recent study, VIO system. It should be of some useness, and it is easier to complete.
+ **VINS with map building and reuse** : The current VINS Fusion does has map building support, but it has great limitation as well as the VINS system.
+ **Deep Learning Feature Extraction** : This is also a possible direction, however it is more into Deep Learning area. I should learn more before entering into another domain. 
+ **Visual Lidar SLAM** : This is a wonderful subject. It can be useful in a lot of applications. For our case, the most useful part, will be making a extremly accurate map without third party help (i.e. other lidar scan companys). It will also be useful for robot and self-driving too. However it is very difficult.
+ **Image Retrieval Methods** : As I learn more about single image localization algorithms. I found Image Retrieval part is a great limitation of performance. If we need more accuate match, it may take more time. If we want fast processing, we will loss robustness. The latest [NetVLAD](https://arxiv.org/abs/1511.07247) is a breakthrough in this field, but I think its Triplet selection method has defect. But this work will only has limited contribution to our project, and the leaders in our company will not understand its value.

We want to use VINS to realize AR applications. 

### Some thoughts about VINS

First, let's talk about the loop closing method used by [VINS Fusion](https://github.com/HKUST-Aerial-Robotics/VINS-Fusion). 

+ VINS Fusion will save all the info about keyframes (points and camera pose). 
+ When loop detected, the current pose will be estimated by slide window in tracking thread and also by the detected loop match keyframe.
+ However, the pose graph will be optimized only with keyframes' poses and the current loop relative pose. (the edge in optimization system, will only contain the relative pose between several close keyframes within the same sequence)
+ No map point, or should I say, no point is optimized in this process.

As a result, VINS will not have a "real" map, but only several keyframes. This makes VINS very fast, but also limit its usage.

I have done a small adjustment to VINS, which allow saving marginalized map points. However we cannot form a "real" map from it, as they are marginalized forever.
We can try to make VINS system to have more connection with the feature points (keep the edge of all the points and pass them to global optimization, and link the new observed point to viewed point if possible). But it makes VINS more like a ORBSLAM with IMU fused. So way not make ORBSLAM with IMU.
If I made ORBSLAM with IMU, I can also save the keyframes and all its points, then import into a VINS system (as they all use edge points and Brief descriptors). **That is a better way !!!**


## 2019/09/18

I talked with our algrithme engineers this morning, I found that we really need to talk to share our work, our knowledges and our perspective of our project. It may be difficult to understand each other, while I will try my best to learn and be modest to our people's opinions. 

Also, I talked with one of our manager about our current projects. He said that we have a lots of projects currently working with. Pop art show is the one with highest priority. This is my main project too, which is AR art show about the recent POP art. And an another one with high priority is to travel on a car while enjoying foreign scenes. We have already sent some people to europe to take video( from about august this year). As he said, our big boss is quite obsessed with AR glasses, and he cut off almost all projects based on telephone, (using his word, they are "low"). Considering that, I should focus more on AR glasses if I want to be higher position in this company. 

We also talked about Vuforia image localization. As the economy battle between US and China, all the cloud service of Vuforia has been cut off. It is like they have our throat in hand. In my opinion, this is a great chance for us, and it makes the localization based on image more useful and valuable than ever before in China. I should spare some of my time in this field.


[BACK](../)
