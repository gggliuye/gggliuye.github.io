# gggliuye page


# test locally (ubuntu)

reference :

https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll


* install jekyllrb following: https://jekyllrb.com/docs/installation/
* install bundle
```
bundle install
```
* execute server
```
bundle exec jekyll serve
```

# test locally (windows) :

* download & install ruby+devkit https://rubyinstaller.org/downloads/
* install jekyll:
```
gem install jekyll
```
* install bundle
```
bundle install
```
* start server
```
bundle exec jekyll serve
```

# markdown to pdf

* install dependences
```
sudo apt-get install pandoc texlive-latex-base texlive-fonts-recommended texlive-extra-utils texlive-latex-extra
```
* run markdown to pdf

use pandoc : https://pandoc.org/installing.html

```
pandoc Study/PaperRead/3d_reconstruction.md -o data/3d_reconstruction.pdf
```

to include chinese, use latex kernel :

```
sudo apt-get install texlive-xetex
pandoc -t latex --pdf-engine=xelatex Study/patent/patent_v1.md -o data/patent_v1.pdf
```
and add heading to markdown :

```
---
CJKmainfont: Noto Serif CJK SC
---
```
