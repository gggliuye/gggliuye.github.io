---
layout: page_coursera
title: Innovation
---

[MBA Home](../../0index)

[Innovation: From Creativity to Entrepreneurship Specialization](https://www.coursera.org/specializations/innovation-creativity-entrepreneurship) from [Gies and our online programs](https://giesonline.illinois.edu/)

Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Study/MBA/innov'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
