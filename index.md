---
layout: base
title: gggliuye's website
css:
  - /assets/css/index.css
---

<div id="header" markdown="1">

# Ye Liu {#title}

## Empty is form, form is empty

</div>

<div id="main-sections" style="margin-top:-30px;">

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

<div id="post-section-out" class="page-section">
<div class="container-md" role="main">
  <div class="row">
    <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">

{% assign posts = paginator.posts | default: site.posts %}

<div class="posts-list">
  {% for post in posts %}
  <article class="post-preview">
    <a href="{{ post.url | absolute_url }}">
      <h2 class="post-title">{{ post.title }}</h2>

      {% if post.subtitle %}
        <h3 class="post-subtitle">
        {{ post.subtitle }}
        </h3>
      {% endif %}
    </a>

    <p class="post-meta">
      {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
      Posted on {{ post.date | date: date_format }}
    </p>

    <div class="post-entry-container">
      {%- capture thumbnail -%}
        {% if post.thumbnail-img %}
          {{ post.thumbnail-img }}
        {% elsif post.cover-img %}
          {% if post.cover-img.first %}
            {{ post.cover-img[0].first.first }}
          {% else %}
            {{ post.cover-img }}
          {% endif %}
        {% else %}
        {% endif %}
      {% endcapture %}
      {% assign thumbnail=thumbnail | strip %}
      {% if thumbnail != "" %}
      <div class="post-image">
        <a href="{{ post.url | absolute_url }}">
          <img src="{{ thumbnail | absolute_url }}">
        </a>
      </div>
      {% endif %}
      <div class="post-entry">
        {% assign excerpt_length = site.excerpt_length | default: 50 %}
        {{ post.excerpt | strip_html | xml_escape | truncatewords: excerpt_length }}
        {% assign excerpt_word_count = post.excerpt | number_of_words %}
        {% if post.content != post.excerpt or excerpt_word_count > excerpt_length %}
          <a href="{{ post.url | absolute_url }}" class="post-read-more">[Read&nbsp;More]</a>
        {% endif %}
      </div>
    </div>

    {% if post.tags.size > 0 %}
    <div class="blog-tags">
      Tags:
      {% if site.link-tags %}
      {% for tag in post.tags %}
      <a href="{{ '/tags' | absolute_url }}#{{- tag -}}">{{- tag -}}</a>
      {% endfor %}
      {% else %}
        {{ post.tags | join: ", " }}
      {% endif %}
    </div>
    {% endif %}

   </article>
  {% endfor %}
</div>

{% if paginator.total_pages > 1 %}
<ul class="pagination main-pager">
  {% if paginator.previous_page %}
  <li class="page-item previous">
    <a class="page-link" href="{{ paginator.previous_page_path | absolute_url }}">&larr; Newer Posts</a>
  </li>
  {% endif %}
  {% if paginator.next_page %}
  <li class="page-item next">
    <a class="page-link" href="{{ paginator.next_page_path | absolute_url }}">Older Posts &rarr;</a>
  </li>
  {% endif %}
</ul>
{% endif %}

{% include comments.html %}
</div>
</div>
</div>
</div>
