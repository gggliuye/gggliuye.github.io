---
layout: page_coursera
title: Project Management
---

https://www.coursera.org/professional-certificates/google-project-management

Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Study/MBA/pm'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
