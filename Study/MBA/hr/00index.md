---
layout: page_coursera
title: Human Resource
---

[MBA Home](../../0index)

[Human Resource Management: HR for People Managers Specialization](https://www.coursera.org/programs/open-access-guyana-ngeor/specializations/human-resource-management).

Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Study/MBA/hr'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
