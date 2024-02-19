---
layout: page_tree_bio
title: Neuromorphic Computing
---

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

<a name="STDP"></a>
<img src="/assets/img/paperread/chrown0.png" height="25"/> [Bioinspired Programming of Memory Devices for Implementing an Inference Engine 2015](https://hal.science/hal-01822199/document).
* problem : **von Neumann bottleneck** - requirement of large energy budget from the separation of memory and computing. (a neuron only performs basis operations, which depend on a high number of memory access)
* long term memory <- synaptic plasticity.
