---
layout: page_tree_math
title: Artificial Intelligence Home
---

Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Math/ai'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}

Links:
* [Artificial General Intelligence (AGI) Conference](https://www.agi-conference.org/)
  * [AGI-conf 2023 papers](https://agi-conf.org/2023/2023-accepted-papers/)
* [Cognitive Science Society](https://cognitivesciencesociety.org/)
