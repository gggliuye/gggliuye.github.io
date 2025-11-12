---
layout: page_coursera
title: Google Tools for Trading
---


[MBA Home](../../0index)

<!-- Left Sidebar (TOC) -->
<aside class="d-none d-lg-block">
  <nav id="toc" class="toc"></nav>
</aside>


# Construct Stock Market Indices

[Coursera Link](https://www.coursera.org/learn/construct-stock-market-indices/home/module/1), [Certification link](https://www.coursera.org/account/accomplishments/verify/BBZI6U5EL03Z).
* Use Google Finance to import stock price data
* Identify the free float of the stock
* Use free-floated weighting to construct an index

A **Stock Market Index** (plural: Indices, pronounced “IN-duh-seez”) is a statistical measure that tracks the overall performance of a group of stocks — usually representing a specific market, sector, or investment theme.
* Market-Capitalization Weighted (most modern ones)
  * Companies with larger market value <u>(price × free float)</u> have greater influence.
  * Free float shares = Total shares * Free float shares (%)
  * Example: S&P 500.
* Price-Weighted
  * Companies with higher stock prices affect the index more, regardless of size.
  * Example: Dow Jones.
* Equal-Weighted
  * Every company counts equally, no matter its size.


| Index                                   | Country / Region | What it Represents                                                |
| --------------------------------------- | ---------------- | ----------------------------------------------------------------- |
| **S&P 500**                             | USA              | 500 largest U.S. companies (like Apple, Microsoft, Amazon)        |
| **Dow Jones Industrial Average (DJIA)** | USA              | 30 major blue-chip companies                                      |
| **NASDAQ Composite**                    | USA              | All stocks listed on NASDAQ, heavy in tech (Apple, Tesla, NVIDIA) |
| **FTSE 100**                            | UK               | 100 largest companies on London Stock Exchange                    |
| **Nikkei 225**                          | Japan            | 225 leading companies in Japan                                    |
| **Hang Seng Index**                     | Hong Kong        | 50 largest companies listed in Hong Kong                          |
| **CSI 300**                             | China            | 300 largest A-share companies from Shanghai & Shenzhen exchanges  |


Use google finance to get data : `GOOGLEFINANCE(证券代码, [属性], [起始日期], [结束日期 | 天数], [间隔])` [GOOGLE FINANCE documentation](https://support.google.com/docs/answer/3093281?hl=zh-Hans) [📄 google sheet link](https://docs.google.com/spreadsheets/d/1tfJevtRWhG7hWrdJjrNvxMJnGvC988UNqyqnGTEqN3o/edit?usp=sharing)
```
=GOOGLEFINANCE("NASDAQ:META", "price", DATE(2016,1,1), DATE(2025, 1, 1), "WEEKLY")
```

Make your own price index :

$$
Increase_{k} = \sum_{i} (Weight_{i} * Price_{i})
$$

<div align="center">    
<img src="https://www.helloimg.com/i/2025/11/12/69143962a207a.png" width="55%"/>
</div>

<p></p>

# Compare Stock Sharpe and Sortino Ratios

[Coursera Link](https://www.coursera.org/learn/compare-stock-returns-google-sheets/home/module/1). [Certification link](https://www.coursera.org/account/accomplishments/verify/01W0LRTEF3VD).
[📄 google sheet link A](https://docs.google.com/spreadsheets/d/1I9YAQZBWTQuIQEUEk9OqKlVU5Xu_Hd_w3U93gGPqSm0/edit?usp=sharing).
[📄 google sheet link B](https://docs.google.com/spreadsheets/d/1tfJevtRWhG7hWrdJjrNvxMJnGvC988UNqyqnGTEqN3o/edit?usp=sharing).

**Sharpe Ratio** - *“How much extra return am I earning for every unit of total risk I take?”*

$$
Sharpe Ratio = \frac{R_{p} - R_{f}}{\sigma_{p}}
$$

* $R_{p}$ = average return of your portfolio
* $R_{f}$ = risk-free rate  (e.g. 3% from Treasury bills)
* $\sigma_{p}$ = standard deviation of the portfolio’s returns
* All volatility (up + down), General portfolio comparison.

The **Sortino Ratio** refines the Sharpe by only counting downside volatility — the “bad” risk (returns below a target or risk-free rate). - *“How much good return am I earning for every unit of downside risk I take?”*

$$
Sortino Ratio = \frac{R_{p} - R_{f}}{\sigma_{d}}
$$

* $\sigma_{d}$ = downside deviation (volatility of negative returns only)
* When avoiding losses is your focus (e.g. conservative investor)

**Adjusted Closing Price** represents the true value of a stock’s closing price after accounting for corporate actions, such as Dividends
Stock splits,
Reverse splits,
Bonus issues,
Rights offerings.

<div align="center">    
<img src="https://www.helloimg.com/i/2025/11/12/69143967843e2.png" width="70%"/>
</div>
