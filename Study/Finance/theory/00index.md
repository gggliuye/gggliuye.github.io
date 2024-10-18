---
layout: page
title: Finance Theory
---

Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Study/Finance/theory'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
