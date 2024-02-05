---
layout: page_tree_math
title: Finance
---


Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Math/finance'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
