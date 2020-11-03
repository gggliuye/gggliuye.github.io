---
layout: home
title: gggliuye's website
subtitle: Empty is form, form is empty
css:
  - /assets/css/index.css
---

<div id="header" markdown="1">

# Ye Liu {#title}

## {#subtitle}

</div>

<div id="learning-section-out" class="page-section">
  <div id="learning-section">
    <div class="section-title">My Post-School Study</div>
	<div id="learning-list" markdown="1">
{% for info in site.data.learn_info %}
{% if info.icon %}<span class="learning-icon fa-fw {{ info.icon }}" aria-hidden="true"></span>{% endif info.icon %}
<span class="learning-content">{{ info.content }}</span>
{: .learning-text }
{% endfor %}
</div>
  </div>
</div>
