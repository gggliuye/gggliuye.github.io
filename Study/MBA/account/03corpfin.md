---
layout: page_coursera
title: Corporate Finance Essentials
---

[MBA Home](../../0index)

[Corporate Finance Essentials](https://www.coursera.org/learn/corporate-finance-essentials/home/week/1), [Certification link](https://www.coursera.org/account/accomplishments/verify/).


# 1. Returns, Volatility, and Beta

Periodic return source : (1) capital gain or loss; (2) cash flow.
* **Arithmetic Mean Returns**: representing a simple average.
* **Geometric Mean Returns**: reflects the average rate at which an investment grows over time, considering <u>compounding effects</u>.
* Arithmetic Mean Returns is *always higher* than Geometric Mean Returns. **Misleading information** can lead to poor investment decisions.

**Volatility (SD - Standard Derivation)** of returns. measure of variability,

**Beta** measure of relative risk (referencing the market), reaction of an asset to fluctuations in the market. $StockRisk = \beta^{2} SystematicRisk + IdiosyncraticRisk $

# 2. Correlation and Diversification

Portfolio risk - we want to reduce fluctuation, with <u>diversified correlation.</u>

* **Correlation** (Rho) the sign and the strength of the relationship between two variables.
👍 [Country Correlation Matrix](https://www.msci.com/zh/research-and-insights/global-investing-trends/global-country-correlation-matrix)
* **Diversification** : usually thought of in terms of risk reduction.
  1. Investers do not really want to reduce risk. As high risk is linked with high expected return.
  2. Investers do not really want to maximize returns. which would also maximize risk.
  3. Investers want to maximize <u>risk-adjusted returns</u>. (a "best" combination, thought diverification)
* The lower the correlation between assets, the higher the benfits of diverification.

# 3. CAPM and the Cost of Capital
<p></p>
* Cost of captial is related to **RISK** (not cash flows).
* The weighted-average cost of capital (WACC).
  1. From the point of view of investors, the average required return on the capital provided.
  2. From the point of view of the company, the average cost of raising capital.
  3. A hurdle rate : the minimum required return on the company's investments.
* $R_{WACC} = x_{D} (1-t_{c})R_{D} + x_{E}R_{E}$
  * $R_D$ $R_E$ are the required return on debt and equity.
  * $t_c$ is the corporate tax rate, $ (1-t_{c})R_{D}$ is the after-tax cost of debt.
  * x are proportions of the debt and equity. (we want to find the best proportions)

<u>The debt tax shield</u> $ (1-t_{c})R_{D}$. We debt we will pay fewer tax, since we pay the interest, which has a effect of discount on the required return of debt.

Required returns:
* The corporate tax rate.
* The cost of debt.
* The cost of equity and the CAPM.
* The proportions of debt and equity.

## 3.1 The cost of debt

<u>The cost of debt</u> : **Bond** represents a promise to pay back a principal amount (face value) along with interest payments over a specified period until maturity.
* When the perceived risk of a company increases, investors are willing to pay less for the bond, leading to a higher required return. (high risk - high return, low risk - low return)
* The return on a bond can be calculated based on the cash flows received and the price paid for the bond.
* Yield to maturity (YTM) is the mean annual return from holding a bond until maturity and is a more accurate <u>measure of the cost of debt</u>. (Since the interest rate will not change.)
  * objective : <u>observable</u> for the investors (it can be directly obtained from market data or bank quotes)

## 3.2 The cost of equity

<u>The cost of equity</u> is subjective : <u>not observable, hence must be estimated</u> using models like the CAPM, with <u>large uncertainty</u>.

**Capital Asset Pricing Model (CAPM)** : $R_{Ri} = R_{f} + MRP \cdot \beta_{i}$

* $R_{E}$: required return of the cost of equity.
* $R_{f}$: **risk-free rate** - the return expected from an investment with zero risk, often represented by the yield on long-term government bonds.
  * But the mature day people used varies a lot. [more details](/Study/Finance/theory/01words)
* MRP: **Market(or Equity) Risk Premium**. the historical difference between equity returns and debt returns.
  * Market Risk Premium (MRP) = Expected Market Return − Risk-Free Rate.
  * The additional return that investors demand for investing in the stock market (equities) instead of risk-free securities, such as government bonds.
  * 5% to 6% for US.
* $\beta$ : measure of relative risk - company's sensitivity to market fluctuations.
  * The only thing, different among companies.
