---
layout: page_tree_math
title: 1. Introduction
---

[Back To ADMM Home](../00index).

## 1.1 Goal

**Background:** BigData -> extremely large amount of data. Very high-dimensional data, distributed stored data.

* Decentralized collection or storage.
* Distributed solution methods (e.g. ADMM).

Robust methods for :

* Arbitraty-scale optimization
  * Machine learning/statistics with huge data-size
  * Dynamic optimziation on large-scale network
* Decentralized optimization
  * Devices/processors/agents coordinate to solve large problem, by passing relatively small messages.


## 1.2 Closely Related Algorithms

* Dual Decomposition. (explained in Chapter 2)
* The method of multipliers. (explained in Chapter 2)
* Douglas-Rachford splitting. (lots of them 1950s, 1979)
* Proximal point algorithm. (Rockafellar 1976)
* Dykstra's alternating projections. (1983)
* Spingarn's method of partial inverses. (1985)
* Rockafellar-Wets progressive hedging. (1991)
* Proximal methods. (Rockafellar, many others, 1976-present)
* Bregman iterative algorithms for l1 problems. (2008-present)
* Most of these are special cases of the proximal point algorithm.


**ADMM: The blender of the decomposability of dual ascent with the superior convergence properties of the method of multipliers.**

## 1.3 BluePrint

* Dual problem $\to$ Dual ascent method $\to$ Decomposition.
* Method of Multipliers $\to$ Augmented Lagrangian $\to$ Cannot decompose (as the variables are entangled)
* ADMM $\to$ Decomposed variation of augmented lagrangian method.

## 1.4 Interpretation as tatonnement process

* Tatonnement process: iteratively update prices to clear market.
* Work towards equilibrium by increasing/decreasing prices of goods based on excess demand/supply.
* Dual decomposition is the simplest tatonnement algorithm.
* ADMM adds proximal regulization:
  * incorporate agents' prior commitment to help clear market.
  * convergence far more robust convergence that dual decompostion.

[Back To ADMM Home](../00index).
