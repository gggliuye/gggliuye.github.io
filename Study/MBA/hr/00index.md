---
layout: page_coursera
title: Human Resource
---

[MBA Home](../../0index)

[Human Resource Management: HR for People Managers Specialization](https://www.coursera.org/programs/open-access-guyana-ngeor/specializations/human-resource-management).


**The People Manager Value Proposition:**

<div align="center"><pre class="mermaid">
graph LR
A[Organizational Objectives, Needs, and Values] --> A1["What do we need our people to accomplish?"]
A1 --> B[HR Strategy<br>Achieving goals through employee performance]
subgraph T["--"]
E[Who and how to attract and retain?]
C[How to manage performance?]
D[How to motivate and reward?]
E --> C
C --> D
end
B --> T
</pre></div>


Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Study/MBA/hr'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
