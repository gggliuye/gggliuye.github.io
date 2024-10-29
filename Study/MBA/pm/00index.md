---
layout: page_coursera
title: Project Management
---

[MBA Home](../../0index)

[Google Project Management: Professional Certificate](https://www.coursera.org/professional-certificates/google-project-management)

<div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="b2d3561f-558d-4cbd-938a-e48e38064325" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>

Pages:

{% assign folder1 = site.pages | where_exp: "item" , "item.path contains 'Study/MBA/pm'"%}
{% for item in folder1 %}
* [{{item.title}}]({{item.url}})
{% endfor %}
