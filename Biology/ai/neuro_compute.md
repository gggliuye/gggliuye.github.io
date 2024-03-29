---
layout: page_tree_bio
title: Neuromorphic Computing
---

# Physics Overview

## Paper Read

<img src="/assets/img/paperread/chrown0.png" height="25"/> [Physics for Neuromorphic Computing 2020](https://arxiv. org/abs/2003.04711)

**Human brain:**
* large inter-connectivity - high dimension (higher factorial dimension for white matter).
  * memory and computation are not separated. synchronous communication is avoided.
  * large fan-in/fan-out & low energy consumption.
* Compared to neuron networks :
  * neurons are more than non-linear functions : spike, leaky, stochastic, oscillate, synchronize, etc.
  * synapses are more than analog weights : leaky, time scale, parameter pattern, stochastic, etc.

Map AI to  physical system:
1. Neuromorphic chips - using memristor (memory-resistor).
  * hard for learning.
2. Photonic Neural networks.
  * neurons - optical resonators; synapses - interferometers & optically active phase change materials.
  * large size; energy cost of lasers.  

Materials and physics used - oxide (氧化物) electronics.
* Conductive bridge devices can emulate long short term memory.
* Materials exhibit phase transitions (e.g. Mott insulators) can emulate spiking neurons.
* Chaicogenide-based phase change memories.
* Organic materials.
* Flux quantization in superconductive Josephson junctions.

Unsupervised learning with [Spike Timing Dependent Plasticity (STDP)](#STDP) - weight updated depending on the the timing of spikes occurring on both sides of a synapse.

|   | CMOS synapses and neurons | Resistive switching synapses with CMOS neurons | Photonic synapses and neurons | Spintronic synapses and neurons | Superconductive synapses and neurons|
| Connections | wires | wires| light | microwaves | wires or microwaves |
|Min neuron lateral size| 10 µm | 10 µm |100 µm | 10nm | 20 nm|
|Min synapse lateral size| 10 µm | 10 nm |1 µm | 10nm | 20 nm|
| Advantages | commercial | Nanoscale synapse, technology-ready | Wavelength multiplexing, can be totally passive (zero energy consumption) | Nanoscale synapses and neurons, almost commercial technology| Low energy consumption beside cryogenic requirements, all identical spikes|
|Disadvantages| Size of neurons and synapses, no in-memory computing|Size of neurons, complex wiring|Size of neurons and synapses, dissipation due to lasers | Scalability to be demonstrated | Scalability to be demonstrated |
| Chips | Inference | Inference coming soon | no | no |no|

<p></p>

<a name="SNN"></a>
# [Spiking-Neural-Network](https://en.wikipedia.org/wiki/Spiking_neural_network)


## Paper Read

<img src="/assets/img/paperread/chrown.png" height="25"/>  [Spiking Neural Networks and Their Applications: A Review 2022](https://www.researchgate.net/publication/362314380_Spiking_Neural_Networks_and_Their_Applications_A_Review)
* Introduction of : **biological neurons** (dendrites, soma, axon, synapse, neurotransmitters), **artificial neural networks** ($$r = f(Wu + b)$$), **spiking neural networks** (spike times).
* Spiking Neuron Models (see [wiki - Biological neuron model](https://en.wikipedia.org/wiki/Biological_neuron_model) for more):
  1. Hodgkin-Huxley Model. (efficiency-, plausibility+) include K Na channels.
  2. Leaky Integrate and Fire Model. (efficiency+, plausibility-) ignore iron channels.
  3. Izhikevich Model. (efficiency+, plausibility+) use 2d system (potential & ionic current).
  4. Adaptive Exponential Integrate-and-Fire Model. (efficiency+, plausibility=) 2d system (potential & adaption slow variable).
* Synaptic Models: decay and rise of the PSC (post-synaptic current).
* SNN Learning:
  1. Spike-Based Backpropagation.
  2. [Spike Timing Dependent Plasticity (STDP)](#STDP).
  3. ANN-to-SNN Conversion. convert RELU to IF neurons.
* Spike Encoding : decode/encode spikes into/from information - rate encoding & pulse encoding.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Spike-FlowNet: Event-based Optical Flow Estimation with Energy-Efficient Hybrid Neural Networks 2020](https://arxiv.org/abs/2003.06696), [github](https://github.com/chan8972/Spike-FlowNet). ANN+SNN optical flow for event camera.
* ANN for pixel-based images rely on photo-consistency constraints; SNN fits Event camera (bio-inspired silicon retinas).
* SNN problem : The number of <u>spikes drastically vanish</u> at deeper layers.
* Make an simple implementation of IF (integrate-and-fire) SNN [in python](https://github.com/chan8972/Spike-FlowNet/blob/master/models/FlowNetS_spike.py#L21).

<img src="/assets/img/paperread/chrown.png" height="25"/> [Intel Loihi](https://www.intel.com/content/www/us/en/research/neuromorphic-computing.html) ([wikichip](https://en.wikichip.org/wiki/intel/loihi)) based works:
* [Reinforcement co-Learning of Deep and Spiking Neural Networks for Energy-Efficient Mapless Navigation with Neuromorphic Hardware 2020](https://arxiv.org/abs/2003.01157) hybrid SNN + DNN framework.
  * SNN (LIF leaky-integrate-and-fire) : state-to-action network. (trained by backpropagation using pseudo-gradient function)
    * transform to an end-to-end SNN compared to their previous work.
  * DNN : action-value (critic ) network.
* [Spiking Neural Network on Neuromorphic Hardware for Energy-Efficient Unidimensional SLAM 2019](https://arxiv.org/abs/1903.02504),
  * [mammalian brains space representation](/Biology/others/#lspace).
  * head direction network, reference frame transformation network, distance mapping network, observation likelihood network, bayesian inference network.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [python implementation 2018](https://github.com/Shikhargupta/Spiking-Neural-Network), [SpykeTorch 2021](https://github.com/miladmozafari/SpykeTorch), [Brian2 2008](https://www.frontiersin.org/articles/10.3389/neuro.11.005.2008/full).

<img src="/assets/img/paperread/chrown0.png" height="25"/> [First-Spike-Based Visual Categorization Using Reward-Modulated STDP 2017](https://arxiv.org/abs/1705.09132) : supervised learingin - Reward-Modulated STDP (using RL). R-STDP can change the behavior of a neuron. [implementation using SpykeTorch](https://github.com/yeliu-deepmirror/SpykeTorch/blob/master/tutorial.ipynb).

<div align="center">    
<img src="https://github.com/yeliu-deepmirror/SpykeTorch/raw/master/assets/SNN-encoding.png" width="90%"/>
</div>

* Layer 1 : convert image to spike latencies based on the saliency of its oriented edges.
* Layer 2 : local pooling.
* Layer 3 : integrate-and-fire neurons. (trainable)
* Layer 4 : decision making.
* RL supervised update [github](https://github.com/yeliu-deepmirror/SpykeTorch/blob/master/SpykeTorch/snn.py#L121) :

$$
\Delta W_{ij}=
\begin{cases}
    a_{LTP}\times \left(W_{ij}-W_{LB}\right)\times \left(W_{UP}-W_{ij}\right) & \ \ \ t_j - t_i \leq 0,\\
    a_{LTD}\times \left(W_{ij}-W_{LB}\right)\times \left(W_{UP}-W_{ij}\right) & \ \ \ t_j - t_i > 0,\\
\end{cases}
$$

* My test playground - [SNN Heading Estimation](https://github.com/yeliu-deepmirror/SpykeTorch/wiki/Heading-Estimation-Test).



<a name="STDP"></a>
<img src="/assets/img/paperread/chrown0.png" height="25"/> [Bioinspired Programming of Memory Devices for Implementing an Inference Engine 2015](https://hal.science/hal-01822199/document).
* problem : **von Neumann bottleneck** - requirement of large energy budget from the separation of memory and computing. (a neuron only performs basis operations, which depend on a high number of memory access)
* [long term memory <- synaptic plasticity](/Biology/rs/free_will/#l2.7). synapse tend to reinforce causal links. -> [Spike-timing-dependent plasticity](https://en.wikipedia.org/wiki/Spike-timing-dependent_plasticity) - local, **unsupervised**.
  * Any synapse that contribute to the firing of a post-synaptic neuron should be made strong i.e it's value should be increased.
  * Synapses that don't contribute to the firing of a post-synaptic neuron should be dimished i.e it's value should be decreased.
* Memory devices:
  1. Multilevel Memory : (a) cumulative memristive device; (b) phase change memory.
  2. Stochastic Synapse : (c) conductive bridge memory; (d) STT-MTJ (basic cell of STT-MARAM).
