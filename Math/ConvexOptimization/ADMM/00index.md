---
layout: page_tree_math
title: Alternating Direction Method of Multipliers Home
---

**Alternating Direction Method of Multipliers**

This pages are my notes when learning Proxima Algorithms from the materials online, mainly from stanford engineer pages :
[EE364b](https://web.stanford.edu/class/ee364b/lectures.html), and [ADMM](http://stanford.edu/~boyd/papers/admm_distr_stats.html).

These pages will include the important definitions, some of my interpretations, and more derivatives and proofs than the original handouts.
These pages are corresponding with the paper [Distributed Optimization and Statistical Learning via the Alternating Direction Method of Multipliers 2010](http://stanford.edu/~boyd/papers/pdf/admm_distr_stats.pdf).

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'ConvexOptimization/ADMM'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
