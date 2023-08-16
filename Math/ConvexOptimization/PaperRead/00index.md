---
layout: page_tree_math
title: Paper Read Home
---

These pages consist of various summary of the paper I found valuable.

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'ConvexOptimization/PaperRead'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
