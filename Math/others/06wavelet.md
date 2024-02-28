---
layout: page_tree_math
title: Wavelet Theory
---


* [A Wavelet Tour of Signal Processing 2009](https://wavelet-tour.github.io/)
* [Wavemap 2023](https://ethz-asl.github.io/wavemap/).

# Multi-Resolution Analysis


[Mathlab example](https://www.mathworks.com/help/wavelet/ug/practical-introduction-to-multiresolution-analysis.html)
Multiresolution analysis refers to breaking up a signal into components, which produce the original signal exactly when added back together. To be useful for data analysis, how the signal is decomposed is important.


**A Multi-Resolution Analysis** of the Lebesgue space $ L^{2}(\mathbb {R} )$ consists of a sequence of nested subspaces

$$
\{0\}\dots \subset V_{1}\subset V_{0}\subset V_{-1}\subset \dots \subset V_{-n}\subset V_{-(n+1)}\subset \dots \subset L^{2}(\mathbb {R} )
$$

that satisfies certain self-similarity relations in time-space and scale-frequency, as well as completeness and regularity relations.

* Self-similarity in space(time): $\forall (j, k) \in \mathbb{Z}^{2}$, $f(x) \in V_{j} \Leftrightarrow f(x - 2^{j}k) \in V_{j}$
* Self-similarity in scale: $\forall j \in \mathbb{Z}$, $f(x) \in V_{j} \Leftrightarrow f(x/2) \in V_{j+1}$
* Subspaces are nested: $\forall j \in \mathbb{Z}$, $V_{j+1} \subset V_{j}$
* Completeness demands that those nested subspaces fill the whole space:
  * $\lim_{j\to -\infty}V_{j} = closure (\bigcap_{j = -\infty}^{\infty} V_{j}) =L^{2}(\mathbb{R}) $
  * $\lim_{j\to \infty} V_{j} = \bigcap_{j = -\infty}^{\infty} V_{j} = {0}$
* $V_{0}$ admits a [Riesz basis](https://en.wikipedia.org/wiki/Riesz_sequence).

## Orthogonal wavelet bases

Wavelets represent the difference between the consecutive resolutions of a signal's MRA. (wavelets capture signal structure at different scales)
* Wavelets span a second subspace $W_{j}$ which is the orthogonal complement to $V_{j}$, i.e. $V_{j} \oplus W_{j} = V_{j-1}$.
* The scaling functions and wavelet functions can be seen as complementary low and high-pass filters that, when combined, <u>can perfectly reconstruct the signal from the next finer scale.</u>
  * Scaling function $\phi$ : orthogonal basis for all $V_{j}$ can be obtained by translating and dilating a signal function: $\phi_{jk}(x) = \frac{1}{2^{j}} \phi(\frac{x - 2^{j}k}{2^{j}})$.
  * Wavelet function $\psi$ : orthogonal basis for all $W_{j}$ can be obtained by translating and dilating a signal function: $\psi_{jk}(x) = \frac{1}{2^{j}} \psi(\frac{x - 2^{j}k}{2^{j}})$.
  * wavelet function average to be zero : $\int_{-\infty}^{\infty}\psi(x)dx = 0$.

Box filters : common used Riesz basis in robotics : box functions arranged to span the cells of a regular grid. Then then scale $2^{j}$ is the cell width.
* the unit box filter can be used as a scaling function :

$$
\phi(x)= \left\{ \begin{array}{rcl}
1 & 0 \le x < 1 \\ 0 & otherwise
\end{array} \right.
$$

$$
\phi_{jk}(x)= \left\{ \begin{array}{rcl}
1/2^{j} & 2^{j}k \le x < 2^{j}(k+1) \\ 0 & otherwise
\end{array} \right.
$$

* The corresponding Haar wavelet function :

$$
\psi(x)= \left\{ \begin{array}{rcl}
-1 & 0 \le x < 1/2 \\ 1 & 1/2\le x < 1 \\ 0 & otherwise
\end{array} \right.
$$

* The orthogonal wavelet basis of $\mathbb{R}$ :

$$
b = \left\{ \sum_{k=1}^{n} \phi(x_{k})^{o_{k}} \psi(x_{k})^{1-o_{k}}  \right\} _{\forall o \in {0, 1}^{n}}
$$

## The Fast Wavelet Transform

The discrete wavelet transform for a function f and wavelet $\psi$ is defined as the projection of f onto the set of all integer scalings and translations of the wavelet function $$\{ \psi_{jk} \}_{j,k\in \mathbb{Z} }$$. Each wavelet coefficient $d_{jk}$ is thus computed as :

$$
d_{jk} = \sum_{x=-\infty}^{\infty} f(x)\frac{1}{2^{j}} (\frac{x - 2^{j}k}{2^{j}})
$$

Can be computed by FWT algorithm in O(N) time:
1. initialize a the finest scale.
2. iteratively filter and downsample to obtain the next coarser scale.
