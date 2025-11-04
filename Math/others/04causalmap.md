---
layout: page_tree_math
title: Stochastic Process
---


# [Stochastic Process](https://en.wikipedia.org/wiki/Stochastic_process)

**Bernoulli process** : a sequence of independent and identically distributed (iid) random variables. A finite or infinite sequence of binary random variables, so it is a discrete-time stochastic process that takes only two values, canonically 0 and 1.

**Random walk** : a path that consists of sums of iid random variables or random vectors in Euclidean space. An example of Markov processes.

**Wiener process** (or **Brownian motion process**) $W_{t}$ : a stochastic process with stationary and independent increments that are normally distributed based on the size of the increments.
* Properties:
  * $W_{0} = 0$ almost surely.
  * $W_{t}$ has independent increments.
  * $W_{t}$ has independent Gaussian increments. $(W_{t + u} - W_{t}) \sim \mathcal{N}(0, u)$
* Brownian Motion with drift : $U_{t} = W_{t} + \mu t$.
* [Geometric Brownian Motion](https://en.wikipedia.org/wiki/Geometric_Brownian_motion) the logarithm of the randomly varying quantity follows a Brownian motion (usually used for non-negative process):
  * $G(t) = G(0)exp[(\mu - \frac{1}{2}\sigma^{2})t + \sigma W(t)]$
  * $log[G(t)] = log[G(0)] + (\mu - \frac{1}{2}\sigma^{2})t + \sigma W(t)$ a brownian motion.
  * $\partial G(t) = (\mu - \frac{1}{2}\sigma^{2})G(t) \partial t + \sigma \partial W(t) = \mu^{*}G(t) \partial t + \sigma \partial W(t)$ a stochastic process following it, is called to follow a GBM.
  * model fitting : estimate $\mu$ and $\sigma$.
* [python simulation](https://medium.com/@mlblogging.k/simulating-brownian-motion-and-stock-prices-using-python-17b6b4bd2a1).

**Poisson process** : consists of points randomly located on a mathematical space with the essential feature that the points occur independently of one another.
* Used for modeling number of events and times at which events occur in a fixed interval of time or space.
  * The number of events occurring is modeled by [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
  * The time between events by exponential distribution.
* [python simulation](https://medium.com/@abhash-rai/poisson-process-simulation-and-analysis-in-python-e62f69d1fdd0)

# Causal Map

[Designing Universal Causal Deep Learning Models: The Geometric (Hyper)Transformer 2022](https://arxiv.org/abs/2201.13094)

**Causal Map** : given two metric spaces $\mathcal{X}$ and $\mathcal{Y}$. a causal map $F: \mathcal{X}^{\mathbb{Z}} \to \mathcal{Y}^{\mathbb{Z}}$ is a function which maps discrete-time paths in $\mathcal{X}$ to discrete-time paths in $\mathcal{Y}$ while respecting the causal forward-flow of information in time.
* In [stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) - a special case : the universal approximation of a stochastic process' evolution, conditioned on its realized trajectory.
  * $\mathcal{X} = \mathbb{R}^{d}$ and $\mathcal{Y}$ being a space of laws of a process on a pre-specified number of future steps.
* <u>GHTs (geometric hyper transformers) can approximate any causal map over any time-horizon.</u> GHTs are consist of :
  * A **transformer network** gives "encoder" parameters. since transformers has advantages over RNN : (1) avoid recursion; (2) can learn encode before decode into prediction.
  * A small **hypernetwork** to interpolate "encoder" parameters and predict future steps.


# Markov Chain : The Strange Math That Predicts (Almost) Anything


<div align="center">    
<iframe width="560" height="315" src="https://www.youtube.com/embed/KZeIEiBrT_w?si=8SNaOEbMnfrE9NuW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Nekrasov

**Independence <-> The Law of Large Numbers ？**
* Independent events follow the law of large numbers.
* If the law of large numbers is seen, we can infer that the underlying events are independent.

**Nekrasov**: Because the statistics (of social events) followed the law of large numbers, the decisions causing them must be independent. In other word, they must be <u>acts of free will.</u>

## Markov

**Markov** : dependent events could also follow the law of large numbers. Markov chain is a way to do probability with dependent events.

**The letters were dependent.**

The probability of the appearance :

| Vowel | Consonant |
| 43% | 57% |

<p></p>

| VV | CC | VC | CV|
|6% | 19% | 37.5% | 37.5 %|

<div align="center"><pre class="mermaid">
graph LR
V --0.87--> C
C --0.67--> V
V --0.13--> V
C --0.33--> C
</pre></div>

Using the upper graph (Markov chain), we can generate a sequence of vowels and consonants. Which also follow the law of large numbers.

> "Thus, free will is not necessary to do probability."


## Nuclear Fission - Monte Carlo Method

Trillions of trillions of neutrons, all interacting with their surroundings. Impossible to compute all possible outcomes.
And we need to model the whole chain of events, where each step influenced the next.

<div align="center"><pre class="mermaid">
graph LR
Traveling --> Traveling
Traveling --> LE["Leave of Absorb"]
Traveling --> Fission
</pre></div>

With a random initial point, we could simulate to get the statistic of the reaction ratio.

## Search Engine
<p></p>

* Yahoo - The first search engine, only tracing the keywords, the quality of the result is low.
* Google - links of page, reflect the quality. Links of pages could be model by Markov chain.

<p></p>
## Text prediction - ChatGPT

System with a **feedback** loop will become hard to model using Markov chains (e.g. weather).

**Memeoryless property.**
Using Markov chain : you can forget about the complicated past, by only looking at the current state, we can predict the rest.
