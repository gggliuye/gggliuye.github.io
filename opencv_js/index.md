---
layout: page
title: Web AR
subtitle: -- Opencv Javascript
---

## Optical Flow Test

[Test Opencv Optical Flow](https://gggliuye.github.io/opencv_js/video_optical_flow.html)

* Detect and track corner features using LK optical flow.
* Keep tracking about 80 points.
* TODO : filter tracked points using two view geometry.


## Marker Tracker Test

[Test Opencv Marker Tracking](https://gggliuye.github.io/opencv_js/video_marker.html)

* Hasn't implement marker detection. User has to focus the marker image in the center to properly process the algortihm.
* Using NCC as the main threshold for refining matches points, and use LK optical flow for getting a rather good initial guess.
* Estimate the homography between the marker image and the input image.
