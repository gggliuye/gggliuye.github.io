---
layout: page_tree_math
title: Mathematical Finance
---

References:
* [Mathematics of Financial Markets](http://www.untag-smd.ac.id/files/Perpustakaan_Digital_1/FINANCE%20Mathematics%20of%20financial%20markets%202nd%20ed.pdf)
* [Advanced Financial Mathematics Notes](https://www.uni-muenster.de/imperia/md/content/Stochastik/financial_mathematics.pdf)
* [Introduction to Mathematical Finance ETH](https://metaphor.ethz.ch/x/2023/fs/401-3888-00L/)

# 1. Introduction


## 1.1 Arbitrage


An arbitrage denotes an opportunity for a trader to achieve a risk-less profit. For example, this means that he may receive a positive payoff without any initial capital. **no-arbitrage principle** (arbitrage shouldn't happen, but *can* happen). <n>Finance is different from pure Math, pure Math based on assumption (which came from no where). While Finance must base on real world, you cannot invent concepts or rules. for an example, "no-arbitrage principle" is apparently not based on real world.</n>


**Theorem (Put-Call Parity)**. We consider a put and a call with same strike K and maturity T on a dividend-free underlying. Let $S_{0}$, c, p denote the inital price of the underling, call and put. Then:

$$
p + S_{0} =  c + KB(0, T)
$$

Put-Call Parity 对等 : A correspondence between put and call price of an underlying with the same maturity and strike. <u>A put can be seen as an insurance contract protecting against downside stock movements.</u>

**Chooser-Option**
