---
layout: page_tree_paper
title: Deep Learning
---

# Table of Contents

1. [Image Generation](#lgeneration)
    1. [Diffusion Model](#ldiff_model)
    2. [VAE (variational auto-encoder)](#lvae)
    3. [GANS](#lgans)

<br/><br/>

<a name="lgeneration"></a>
# 1. Image Generation

Differences : ([GANS vs VAEs](https://ai.stackexchange.com/questions/25601/what-are-the-fundamental-differences-between-vae-and-gan-for-image-generation), [GANS vs Diffusion](https://www.sabrepc.com/blog/Deep-Learning-and-AI/gans-vs-diffusion-models))
* <u>GANS</u> : capture less diversity, and difficult to train.
* <u>Likelihood-Based Model</u> (VAEs, Diffusion Models), short of visual sample quality.

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

**OpenAI Guided Diffusion**  [guided-diffusion](https://github.com/openai/guided-diffusion):

* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Denoising Diffusion Probabilistic Models 2020](https://arxiv.org/pdf/2006.11239.pdf), [github](https://github.com/hojonathanho/diffusion).
* <img src="/assets/img/paperread/chrown0.png" height="25"/> [Diffusion Models Beat GANs on Image Synthesis 2021](https://arxiv.org/abs/2105.05233). with <h>Classifier Guidance</h>.

**Image-Text** : Blended Diffusion.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Blended Diffusion for Text-driven Editing of Natural Images 2022](https://arxiv.org/abs/2111.14818), [github](https://github.com/omriav/blended-diffusion), **DDPM + [CLIP](#lclip)** (<h>guided fusion using CLIP loss gradient - instead of a classifier</h>), and combine the noised raw image to preserve the background. but very slow.
* <img src="/assets/img/paperread/thumbs.png" height="25"/> [Blended Latent Diffusion 2023](https://arxiv.org/pdf/2206.02779.pdf), [github](https://github.com/omriav/blended-latent-diffusion). **DDPM + [CLIP](#lclip) + [VAE](#lvae)**, process diffusion in the latent space (<h>VAE encoded space</h>).


[DreamBooth: Fine Tuning Text-to-Image Diffusion Models for Subject-Driven Generation 2023](https://dreambooth.github.io/). can mimic the appearance of subjects.


<a name="lvae"></a>
## 1.2 VAE (variational auto-encoder)

**Encoder-Decoder Transformer.**

<img src="/assets/img/paperread/chrown0.png" height="25"/> [DALL-E : Zero-Shot Text-to-Image Generation 2021](https://arxiv.org/abs/2102.12092), image token (32x32x8192 : [dVAE](https://github.com/openai/DALL-E) - discrete variational autoencoder, based on GPT-3) + text token (256 : BPE-encode) -> train an autoregressive transformer (models the <h>joint distribution</h> over the text and image tokens).

<a name="lgans"></a>
## 1.3 GAN

<img src="/assets/img/paperread/chrown.png" height="25"/> [Generative Adversarial Networks 2014](https://arxiv.org/abs/1406.2661)

<div align="center">    
<img src="/assets/img/paperread/gan_diagram.svg" width="50%"/>
</div>

### 1.3.1 Image-Text Pairing

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
