---
layout: post
title: Antialiasing Related Algorithms
comments: true
tags: [CS, DEV]
---


# Antialiasing Algorithms

**References** :
* [Unity Anti-aliasing](https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@12.0/manual/Anti-Aliasing.html).
* [Anti-aliasing techniques comparison](https://www.sapphirenation.net/anti-aliasing-comparison-performance-quality).
* [Anti-Aliasing in Gaming](https://vokigames.com/anti-aliasing-in-gaming-the-battle-for-perfect-graphics/).

> SSAA – we get an excellent picture but a noticeable load on the video card. MSAA – rarely used, suitable for games with large objects in the graphics. FXAA – the edges of objects are indeed smoothed, but so much so that the entire image is blurred. MLAA – the algorithm loads the processor without affecting the comfort in the game, but the picture is blurry. SMAA – the game’s performance drops a lot, and the picture becomes fuzzy. TXAA – an excellent option for games where most frames are static. DSR – the technology is rarely used and puts a large load on the video card. CSAA / CFAA – we get a picture of excellent quality, including small objects.

* [Grid AA](https://mp.weixin.qq.com/s/WJLwJMdvug98QWyFvV4e7A)


**Algorithms** :
* SSAA: supersample anti-aliasing that temporarily uses a much higher resolution render buffer to render the scene in (super sampling).
* MSAA: [multisample anti-aliasing](https://learnopengl.com/Advanced-OpenGL/Anti-Aliasing) samples multiple locations within every pixel and combines these samples to produce the final pixel.
  * Solves spatial aliasing issues.
  * Much more resource intensive.
* FXAA: [Fast Approximate Anti-Aliasing](https://www.geeks3d.com/20110405/fxaa-fast-approximate-anti-aliasing-demo-glsl-opengl-test-radeon-geforce/). Smooths edges on a per-pixel level.
  * Drawback : sharp, high contrast noise in textures gets blurred a bit.
  * An implementation [edge smoothing](https://handmade.network/forums/t/8799-anti-aliasing_in_fragment_shader).
* NFAA: [Normal Filtered Anti-Aliasing](https://www.gamedev.net/forums/topic/580517-nfaa---a-post-process-anti-aliasing-filter-results-implementation-details/#google_vignette).
  * In best cases it resembles 16x MSAA and in worst cases it's like 2x MSAA.
* SMAA: Subpixel morphological anti-aliasing developed from [morphological anti-aliasing](https://www.iryoku.com/mlaa/).finds patterns in the borders of an image and blends the pixels on these borders according to the pattern it finds.
  * Has much sharper results than FXAA and is well suited for flat, cartoon-like, or clean art styles.
* TAA : [Temporal anti-aliasing](https://en.wikipedia.org/wiki/Temporal_anti-aliasing) uses frames from a history buffer to smooth edges more effectively than FXAA.
  * Drawback: it often creates ghosting artifacts in extreme situations.
  * [Step-by-step](https://ziyadbarakat.wordpress.com/2020/07/28/temporal-anti-aliasing-step-by-step/)
* [Phone-wire AA](https://www.humus.name/index.php?page=3D&ID=89).


# Mipmap

[Mipmap](https://en.wikipedia.org/wiki/Mipmap) or pyramids are pre-calculated, optimized sequences of images, each of which is a progressively lower resolution representation of the previous.
* enable : `glGenerateMipmap(GL_TEXTURE_2D);`
* set properly `GL_TEXTURE_MAX_LEVEL`: the highest defined mipmap level.


# Anisotropic

When viewing a texture from a distance, texture coordinates change, especially at oblique angles. The different sampling points can cause the colors of distant pixels to change continuously. [OpenGL anisotropic](https://stackoverflow.com/questions/55949751/how-do-i-get-anisotropic-filtering-extensions-to-work)

```
GLfloat max_anisotropy = 8.0f;
glGetFloatv(GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT, &max_anisotropy);
glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MAX_ANISOTROPY_EXT,
                (kAntiSotropyValue > max_anisotropy) ? max_anisotropy : kAntiSotropyValue);
```
