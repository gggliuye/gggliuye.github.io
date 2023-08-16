---
layout: page_tree_math
title: Proximal Algorithms Home
---

This pages are my notes when learning Proxima Algorithms from the materials online, mainly from stanford engineer pages : [EE364b](https://web.stanford.edu/class/ee364b/lectures.html), [Proximal Algorithms](http://stanford.edu/~boyd/papers/prox_algs.html), and [Math301](https://statweb.stanford.edu/~candes/teaching/math301/).

These pages will include the important definitions, some of my interpretations, and more derivatives and proofs than the original handouts.
These pages are corresponding with the paper [Proximal Algorithms Foundations and Trends in Optimization 2014](http://stanford.edu/~boyd/papers/pdf/prox_algs.pdf).

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'ConvexOptimization/ProximalAlgorithms'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
