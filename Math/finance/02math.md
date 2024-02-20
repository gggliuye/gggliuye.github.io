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

## 1.2 Single-Period Option Pricing Models (discount factor == 1)

A **martingale** is a sequence of random variables (i.e., a stochastic process) for which, at a particular time, the conditional expectation of the next value in the sequence is equal to the present value, regardless of all prior values.

The connection between the ‘fair price’ of a claim and a replicating (or ‘hedge’) portfolio that mimics the value of the claim - the price π(H) will be ﬁxed by the market in order to maintain market equilibrium.

**Assumptions** :
* hedging strategy (η, θ) : value $$V_{t} = \eta + \theta S_{t}$$ : the value of cash + stock value. (<n>value of cash came out of nowhere</n>)
* probability distribution satisfying $$E(\Delta S) = 0$$ - the conditional expectation of price remain constant. (<n>which is ideal, not in reality</n>)

<n>The upper pricing method is based on martingale assumption. while it deliberately mix up the concept of 'value' and 'price'. The value should be constant, but the price never will be in equilibrium state (even though we want it to be). </n>
<p></p>
<n>在科学上，我们确实经常做近似（忽略一些变量的影响），但是这些忽略都是在与主要的研究对象（变量）对比的情况下的。但是在金融中，主要研究的对象就是价格的差异和不平衡，那么我们就不能在一开始就把它直接消除。</n>
<p></p>

## 1.3 A General Single-Period Model (discount factor != 1)

Considering β. Optimize the discounted cost increment $$\Delta \bar C = \beta \eta_{1} - \eta_{0}$$.

$$
\begin{align*}
V_{0} & = \eta_{0} + \theta S_{0} \\
\beta V_{1} & = \beta \eta_{1} + \beta \theta S_{1}
\end{align*}
$$

## 1.4 A Single-Period Binomial Model

No recourse to external funds : $$\eta_{1} = \eta_{0}$$

$$
\begin{align*}
V_{0} & = \eta + \theta S_{0} \\
\beta V_{1} & = \beta \eta + \beta \theta S_{1}
\end{align*}
$$
