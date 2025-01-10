---
layout: page_coursera
title: Corporate Finance Essentials II
---

[MBA Home](../../0index)

[Corporate Finance Essentials II](https://www.coursera.org/learn/corporate-finance-essentials-ii/home/module/1), [Certification link](https://www.coursera.org/account/accomplishments/verify/SMEFLWTVSYZ6).

1. [Market Efficiency](#l1): ideal condition, and hard to beat market in <u>higher risk-adjusted return in long term</u>.
2. [Bonds](#l2): YTM & Risk.
3. [Stocks](#l3): valuation with multiples.
4. [Capital Structure](#l4): optimal mix of debt and equity.
5. [Dividend Policy](#l5): relevant decision variables.

<a name="l1"></a>
# 1. Market Efficiency

1. Market price = Intrinsic value.
2. Price predictability - No ability to successfully/consistently forecast prices.
  * All known information is incorporated in prices.
  * Only new (unknown, unpredictable) information affects prices.

Market Efficiency is an "extreme hypothesis" - an ideal state, not strictly achievable.
Market Efficiency applies to markets and companies.

## 1.1 Market Efficiency Levels

1. **Weak-form efficiency**: Prices reflect all past trading information.
2. **Semi-strong form efficiency**: Prices reflect all publicly available information, including financial reports and macroeconomic data.
3. **Strong form efficiency**: Prices reflect all information, both public and private.

## 1.2 Fundamental and Technical Analysis

* **Fundamental analysis** (by analysis the company and market) : <u>long-term oriented</u>, produces long-term valuation (not timing) signals.
* **Technical analysis** (focus on data) : <u>short-term oriented</u>, produces short-term timing (not valuation) signals.
  * The more efficient the market is the less effective the technical analysis will be.

## 1.3 Some Points

1. Careful with **Overfitting** on history data.
2. **Correlation** does not imply **Causation**.
3. Careful with **Backtesting**.
4. Successful strategies are self-defeating - Market Competition.

## 1.4 Beat the Market

Beating the market is <u>obtaining a higher risk-adjusted return than the market consistently over time</u> - **very hard to maintain in the long term**.

## 1.5 Investing

* Active management : require advance tech and more effort, to beat the market.
  * Mutual funds.
* Passive management : to keep with market return.
  * Index funds / EFTs.

<a name="l2"></a>
# 2. Bonds

**Bonds** (债券) are <u>contracts between a borrower and a lender, specifying the terms of borrowing, including the amount borrowed (principal or face value), interest rate (coupon), and maturity date.</u>
* **Indenture** is the contract that outlines these terms.
* **Principal** (Face Value) is the nominal amount that will be repaid at maturity.
* **Coupon** (Interest Rate) refers to the interest payments made to the bondholder, typically expressed as a percentage of the principal.
* Types:
  * **Coupon Bonds**: Pay periodic interest until maturity.
    * $V_{0} = \frac{C}{(1+R)} + \frac{C}{(1+R)^{2}} + ... + \frac{C + P}{(1+R)^{T}}$ (to compute V0)
    * $p_{0} = \frac{C}{(1+YTM)} + \frac{C}{(1+YTM)^{2}} + ... + \frac{C + P}{(1+YTM)^{T}}$ (to compute YTM)
  * **Zero-Coupon Bonds**: Do not pay interest but are sold at a discount and repay the face value at maturity.
    * $V_{0} = \frac{P}{(1+R)^{T}}$
  * **Perpetual Bonds** (Consols) : Pay interest indefinitely without repaying the principal.
    * $V_{0} = \frac{C}{(1+R)} + \frac{C}{(1+R)^{2}} + ... = \frac{C}{R}$
* **Discount Rate** (折现率) of Bonds : $R = R_{f} + RP$ ([see former course](../03corpfin/#l3))
  * RP : risk premium (default risk, interest rate risk, and liquidity risk)
* **Yield to Maturity** (YTM 到期收益率) annualized return from buying a bond at its market price and holding it until maturity. ([see former course](../03corpfin/#l4))
* **Risk**:
  * **Default (credit) Risk** - <u>Credit rating agencies</u>: Standard & Poor's / Moody's / Fitch / ...
    * Relevant variables : <u>(1) Debt ratio = Debt / (Debt + Equity); (2) Interest coverage  = EBIT/Interest.</u>
  * <u>Interest-rate (market) risk</u>: Longer maturity bonds tend to have higher price volatility.
  * <u>Liquidity risk</u>: The ease of buying or selling a bond at market price; well-known bonds are more liquid.
  * <u>Sovereign Risk</u>: The reliability of different countries in terms of default risk.
  * <u>Currency Risk</u>: Exposure to exchange rate fluctuations when investing in bonds priced in different currencies.

[The Essential Finantial Tooklit - Bonds](https://drive.google.com/file/d/1PqNdDndQS-5ocxpFO-aoGn8IX8md6tH5/view?usp=drive_link)

## 2.1 Case Study

High risk <-> High YTM:

|  |  US-08 | GE Captial | Motorla | Trump |
|---|-----|-------------|---------|-------|
| **Annual YTM** | 3.43% | 4.95% | 6.77% | 25.68% |
| **Rating** |   AAA | AAA | BBB+ | CC |

<a name="l3"></a>
# 3. Stocks Valuation

**Value** (subjective) is not **Price** (objective).

(1) **Absolute** Valuation (DCF models)

(2) **Relative** Valuation (Multiples).
* Two critical Issues:
  1. Determining a **benchmark**
    * Historical benchmark. (of the same company)
    * Cross-sectional benchmark. (with other companies of the similar circumstances)
  2. Why the multiple and the benchmark may differ?
    * Fundamentals explain the difference (trivial) - No trading opportunity.
    * Fundamentals cannot explain the difference - Trading opportunity.
    * Critical fundamentals : begin with growth and risk.
* **P/E ratio** - Price divide by some measure of the company.
  * P : stock price, E : could change to be any value.
  * PEG ratio = (P/E)/g. (price - earnings to growth ratio)
  * Trailing PE (use history E) & Forward PE (use future E).

[The Essential Finantial Toolkit - Multiples](https://drive.google.com/file/d/1ynmZwwgrL7KMIiLKurVR4SWY-6mZRiw6/view?usp=sharing)

## 3.1 Case Study

P/E ratio using Earnings per share;

| Hilton Historical | 2001 | previous 5y| previous 10y|  
|--|-----|-------------|---------------|
| P/E | 14.2| 23.7 |23.4 |

Estimate price by reference P/E ratio $$ P^{*} = (P/E)^{*} * E $$

| Cross-sectional  | Hilton | Sector| Marriott|  Starwood |
|--|-----|-------------|---------------|---|
| P/E | 14.2| 22.9 |23.7 | 18.5 |

Value Trap. "Hilton is cheap" ? <u>Never conclude with only the upper two models.</u>

<a name="l4"></a>
# 4. Capital Structure

Capital Structure:
* Proportions of sources of financing. Right-hand side of the balance sheet.
* Objective : <u>Finding the best (cheapest) way to finance the long-term projects of a company.</u>
  * What financial instruments, and in that proportions, minimize a company's [cost of capital](../03corpfin/#l3).
  * Optimal capital structure - find the best $x_{D}$ and $x_{E}$

Debt Ratios and Required Returns:
* Higher Debt Ratio - Worse credit rating - higher the cost of debt - higher the required return on (cost of) debt.
* Higher Debt Ratio - higher the beta - higher the cost of equity - higher the required return on (cost of) equity.

## 4.1 Case Study

|Debt ratio|0%|10%|20%|30%|40%|50%|60%|
|--|--|--|--|--|--|--|--|
|Equity ratio|100.0%|90.0%|80.0%|70.0%|60.0%|50.0%|40.0%|
|Cost of debt|2.0%|2.1%|2.5%|3.2%|4.0%|5.3%|7.0%|
|After-tax cost of debt|1.6%|1.7%|2.0%|2.6%|3.2%|4.2%|5.5%|
|Cost of equity|5.0%|5.2%|5.5%|6.0%|7.0%|8.2%|10.0%|
|Cost of capital|5.00%|4.85%|**4.80%**|4.96%|5.46%|6.19%|7.32%|

<p></p>
## 4.2 Final Points

* **Credit Ratings**: AAA ratings are rare. Companies with AAA ratings have low debt levels, which can limit their ability to finance operations.
* **Financial Flexibility**: <u>CFOs prioritize financial flexibility</u>, which allows companies to raise debt quickly for investment opportunities. This flexibility is crucial for maintaining a healthy capital structure.

<a name="l5"></a>
# 5. Dividend Policy
<p></p>

* **Trade-off** : The decision involves a trade-off between paying out dividends and reinvesting in the company for growth.
* **Optimal Dividend Payout Ratio** <u>(DPR = DPS/EPS)</u>: The ideal scenario is to find a payout ratio that maximizes the share price, though this is challenging to determine.
* Relevant variables : <u>environment, clienteles (shareholders), growth opportunities, smoothing, signals, taxes, ...</u>
  * how the environment is.
  * what shareholders really want.
  * managers tend to make the dividend smooth.
  * dividend is a (good/bad) signal to the public.

**Share Buybacks**. Dividends tend to be stable, buybacks can fluctuate significantly.
