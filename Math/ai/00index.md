---
layout: page_tree_math
title: Artificial Intelligence Home
---

Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Math/ai'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}

Further reading:
* [Artificial Intelligence - A Modern Approach, 4th US ed](https://aima.cs.berkeley.edu/), [online read](https://archive.org/details/artificial-intelligence-a-modern-approach-4th-edition/page/n1321/mode/2up).
* [Artificial General Intelligence — A gentle introduction](https://cis.temple.edu/~pwang/AGI-Intro.html)


Links:
* [Artificial General Intelligence (AGI) Conference](https://www.agi-conference.org/)
  * [AGI-conf 2023 papers](https://agi-conf.org/2023/2023-accepted-papers/)
* [Cognitive Science Society](https://cognitivesciencesociety.org/)

Questions ([Pei Wang's answer](https://www.iiim.is/2010/05/questions-about-artificial-intelligence/)):
- What is AI ? (what is intelligence ?)
- Can AI be built ?
- How to build AI ?
- Should AI be built ?
