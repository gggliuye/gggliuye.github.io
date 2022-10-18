# gggliuye page


# test locally

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


# markdown to pdf

* install dependences
```
sudo apt-get install pandoc texlive-latex-base texlive-fonts-recommended texlive-extra-utils texlive-latex-extra
```
* run 
```
pandoc Study/PaperRead/3d_reconstruction.md -o data/3d_reconstruction.pdf
```
