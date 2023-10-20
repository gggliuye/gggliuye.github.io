---
layout: page
title: Lidar Mapping
---


# VLIO - Lidar Odometry Video

<div align="center">  
<iframe src="//player.bilibili.com/player.html?aid=261580358&bvid=BV1He411L7ti&cid=860597168&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="70%" height="300"> </iframe>
</div>

# Lidar Mapping (loop closed) Example

<!-- example in https://codepen.io/iangilman/pen/PjdyGv -->
<div id="seadragon-viewer-lidarpcl" style="width:90%; height:600px;"></div>


<script src="//cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/openseadragon.min.js"></script>
<script>

var viewer = OpenSeadragon({
  id: 'seadragon-viewer-lidarpcl',
  prefixUrl: '//cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/',
  tileSources: 'https://raw.githubusercontent.com/gggliuye/for_fun/master/zoom_images/dm/lidar_pcl.dzi',
  crossOriginPolicy: 'Anonymous'
});

</script>
