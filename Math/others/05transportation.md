---
layout: page_tree_math
title: Transportation Theory
---


## Problem Formation

[wiki Transportation Theory](https://en.wikipedia.org/wiki/Transportation_theory_(mathematics)) (Monge–Kantorovich transportation problem) - the study of optimal transportation and allocation of resources.


**Problem Formation - mines-factories example**: There are mines and factories form two disjoint subsets M and F of the Euclidean plane $\mathbb{R}^{2}$. Suppose also that we have a cost function c : $\mathbb{R}^{2} \times \mathbb{R}^{2} \to [0, \infty)$, so that c(x, y) is the cost of transporting one shipment of iron from x to y.
* ignore the time taken to do the transporting.
* objective function : $c(T) = \sum_{m\in {M}} c(m, T(m))$
* a transport plan is a *bijection*: if each mine can supply only one factory.

**Monge and Kantorovich formulations**: let X Y be two separable metric spaces such that any probability measure on X or Y is a Radon measure [^radon_measure] (i.e. they are Radon spaces).  Let $c : X \times Y \to [0, \infty]$ be a Borel-measurable function [^measurable_function] Given probability measures $\mu$ on X and $\nu$ on Y Monge's formulation of the optimal transportation problem is to find a transport map $T : X \to Y$ that realizes the infimum :

$$
\inf \{\int_{X} c(x, T(x)) d\mu (x) | T_{*}(\mu) \} = \nu
$$

where $T_{*}(\mu)$ denotes the push forward [^pushforward] of $\mu$ by T. A map T that attains this infimum (i.e. makes it a minimum instead of an infimum) is called an <u>"optimal transport map"</u>.

* can be ill-posed (no T satisfying $T_{*}(\mu) = \nu$).
* <u>Kantorovich's formulation</u> - find a probability measure $\gamma$ on $X\times Y$ that attains the infimum (where $\Gamma(\mu, \nu)$ denotes the collection of all probability measures on $X\times Y$ with marginals $\mu$ on X and $\nu$ on Y) :

$$
\inf \{ \int_{X\times Y} c(x, y) d\gamma (x, y) | \gamma \in \Gamma(\mu, \nu)  \}
$$

* <u>Duality formula</u> :

$$
\sup \{ \int_{X}\phi(x)d\mu (x) + \int_{Y} \psi(y) d\nu (y)  : \phi(x) + \psi(y) \le c(x, y) \}
$$


**FootNotes** :

[^radon_measure]: Radon measure ([wiki](https://en.wikipedia.org/wiki/Radon_measure)) : a measure on the σ-algebra of Borel sets [^borel_set] of a Hausdorff topological space X that is finite on all compact sets, outer regular on all Borel sets, and inner regular on open sets.
[^borel_set]: Borel Set : any set in a topological space that can be formed from open sets (or, equivalently, from closed sets) through the operations of countable union, countable intersection, and relative complement.
[^measurable_function]: a measurable function is a function between the underlying sets of two measurable spaces that preserves the structure of the spaces: the preimage of any measurable set is measurable.
[^pushforward]: a pushforward measure is obtained by transferring ("pushing forward") a measure from one measurable space to another using a measurable function.
