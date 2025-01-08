---
layout: page_coursera
title: Corporate Finance Essentials
---

[MBA Home](../../0index)

[Corporate Finance Essentials](https://www.coursera.org/learn/corporate-finance-essentials/home/week/1), [Certification link](https://www.coursera.org/account/accomplishments/verify/XJI2ZNTQFAQF).

1. [Returns, Volatility, and Beta](#l1)
2. [Correlation and Diversification](#l2)
3. [CAPM and the Cost of Capital](#l3)
4. [Project Evaluation](#l4): NPV & IRR.
5. [Corporate Value Creation](#l5): EVA.

<a name="l1"></a>
# 1. Returns, Volatility, and Beta

Periodic return source : (1) capital gain or loss; (2) cash flow.
* **Arithmetic Mean Returns**: representing a simple average.
* **Geometric Mean Returns**: reflects the average rate at which an investment grows over time, considering <u>compounding effects</u>.
* Arithmetic Mean Returns is *always higher* than Geometric Mean Returns. **Misleading information** can lead to poor investment decisions.

**Volatility (SD - Standard Derivation)** of returns. measure of variability,

**Beta** measure of relative risk (referencing the market), reaction of an asset to fluctuations in the market. $StockRisk = \beta^{2} SystematicRisk + IdiosyncraticRisk $

<a name="l2"></a>
# 2. Correlation and Diversification

Portfolio risk - we want to reduce fluctuation, with <u>diversified correlation.</u>

* **Correlation** (Rho) the sign and the strength of the relationship between two variables.
👍 [Country Correlation Matrix](https://www.msci.com/zh/research-and-insights/global-investing-trends/global-country-correlation-matrix)
* **Diversification** : usually thought of in terms of risk reduction.
  1. Investers do not really want to reduce risk. As high risk is linked with high expected return.
  2. Investers do not really want to maximize returns. which would also maximize risk.
  3. Investers want to maximize <u>risk-adjusted returns</u>. (a "best" combination, thought diverification)
* The lower the correlation between assets, the higher the benfits of diverification.

<a name="l3"></a>
# 3. CAPM and the Cost of Capital
<p></p>
* Cost of captial is related to **RISK** (not cash flows).
* **The weighted-average cost of capital (WACC)**.
  1. From the point of view of investors, the average required return on the capital provided.
  2. From the point of view of the company, the average cost of raising capital.
  3. A hurdle rate : the minimum required return on the company's investments.
* $R_{WACC} = x_{D} (1-t_{c})R_{D} + x_{E}R_{E}$
  * $R_D$ $R_E$ are the required return on debt and equity.
  * $t_c$ is the corporate tax rate, $ (1-t_{c})R_{D}$ is the after-tax cost of debt.
  * x are proportions of the debt and equity. (we want to find the best proportions)

<u>The debt tax shield</u> $ (1-t_{c})R_{D}$. We debt we will pay fewer tax, since we pay the interest, which has a effect of discount on the required return of debt.

Required returns: (1) The corporate tax rate; (2) The cost of debt; (3) The cost of equity and the CAPM; (4) The proportions of debt and equity.

The objective of **CFO** : <u>get the lowest possible Cost of captial.</u>

## 3.1 The cost of debt

<u>The cost of debt</u> : **Bond** represents a promise to pay back a principal amount (face value) along with interest payments over a specified period until maturity.
* When the perceived risk of a company increases, investors are willing to pay less for the bond, leading to a higher required return. (high risk - high return, low risk - low return)
* The return on a bond can be calculated based on the cash flows received and the price paid for the bond.
* <u>Yield to maturity (YTM)</u> is the mean annual return from holding a bond until maturity and is a more accurate <u>measure of the cost of debt</u>. (Since the interest rate will not change.)
  * **objective** : <u>observable</u> for the investors (it can be directly obtained from market data or bank quotes)

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

<a name="l4"></a>
# 4. Project Evaluation

Using NPV & IRR.
To decide which project to invest.

## 4.1 Net Present Value (NPV)

$$
NPV = CF_{0} + \frac{CF_{1}}{(1+DR)} + \frac{CF_{2}}{(1+DR)^{2}} + ... + \frac{CF_{T}}{(1+DR)^{T}}
$$

* $CF_{0}$ : the first cash flow.
* The subsequent expected cash flow : $CF_{1}$, ..., $CF_{T}$.
* DR : discount rate. The later the money received, the higher the discount.

## 4.2 The Internal Rate of Return (IRR)

$$
CF_{0} + \frac{CF_{1}}{(1+IRR)} + \frac{CF_{2}}{(1+IRR)^{2}} + ... + \frac{CF_{T}}{(1+IRR)^{T}} = 0
$$

* The IRR is the discount rate that makes the NPV of a project equal to zero, requiring the input of initial investment and expected cash flows. **Useful but has limitations**.
* The equation might have <u>multiple solutions</u> or <u>no solution</u>. In which case, higher IRR does not always mean a better project.
  * In such cases, relying on NPV is essential.
* <u>Scale problem</u>, IRR is a relative rate, scale is not considered.
  * example : [CF0 = -100, CF1 = 150] v.s. [CF0 = -200, CF1 = 280]
  * Bias to invest in small project, since smaller projects are easier to get higher return.

## 4.3 More discount rates

* Discount rates across countries or divisions.
* Discount rates over time. NPV become more complicated, and IRR will be useless.

<a name="l5"></a>
# 5. Corporate Value Creation

## 5.1 Three Underlying Issues:

1. Shareholder (owner) value v. Stakeholder (who a role to play) value.
  * It there really a conflict? Can you benefit both?
  * Reasons to focus on shareholder : (1) It is a boarder criterion; (2) It is "objectively" quantifiable; (3) shareholders are the owner of the company.
2. Common managerial mistakes :
  * Focusing on short-term market reactions. (particularly on reactions to earning announcements)
  * Aiming for Growth for the Sake of Growth. (disregarding the return of that growth)
3. What to do with the capital entrusted is clear, the way to get there is far less clear.
  * How to find "good" project.
  * Value-based management.

## 5.2 Economic value added (EVA)

EVA a measure of profitability that differs from traditional accounting profits. **Idea** : (1) To 'charge' managers for the use of capital; (2) To claim profits only if cash is left after this charge.

* **EVA = NOPAT - (Capital × WACC)**
* **Return on Capital = NOPAT / Capital**
  * NOPAT: Net Operating Profit After Taxes.
  * Captial : Debt + Equity + ...
  * WACC : Cost of Capital
  * NOPAT & Captial subject to <u>proprietary adjustments</u>.


| | Pros | Cons |
|--------------|------|------|
| **Level of EVA** | Easy to measure; reflects profitability. More sustainable (if the moat persists). | Can lead to an <u>unequal endowment problem</u>, where executives may be rewarded for doing little if the division is already profitable. |
| **Change in EVA** | Encourages improvement; rewards executives for turning around underperforming divisions. | Not sustainable in <u>the medium or long term</u>. In competitive markets, it may be challenging to consistently increase EVA, potentially leading to <u>lower compensation for executives</u>. |
