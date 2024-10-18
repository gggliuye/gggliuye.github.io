---
layout: page
title: Real Estate Theory
---

# Table of Contents

* [Log Periodic Power Law Singularity (LPPLS) model](#llppls)
* [Rent-Price Ratio](#lrpr)
* [Papers](#lpapers)

<a name="llppls"></a>
## Log Periodic Power Law Singularity (LPPLS) model

The asset price p(t) follows a standard diffusive dynamics with varying drift (or conditional expected return) μ(t) in the presence of discontinuous jumps (where σ (t) is the volatility and dW is the increment of a Wiener process, dj represents a discontinuous jump $E_{t}[dj] = h(t)dt$):

$$
\frac{dp}{p} = \mu(t)dt + \sigma(t)dW - \kappa dj
$$

**LPPLS**:

$$
E[\ln p(t)] = A + B | t_{c} - t |^{m} + C|t_{c} - t |^{m}cos(\omega \ln |t_{c} - t| + \phi)
$$

<a name="lrpr"></a>
## Rent-Price Ratio

Rent-Price Ratio (price / rent-annual)
* High Ratio (>20): potential overvaluation or lower rental yields.
* Moderate Ratio (15-20): a balanced market .
* Low Ratio (<15): buying may be more advantageous than renting.
* Interest Rates: Lower interest rates make mortgages cheaper, potentially increasing property prices.


<a name="lpapers"></a>
## Papers

Real estate price forecasting methods (from <img src="/assets/img/paperread/chrown.png" height="25"/> [The Oxford Handbook of Economic Forecasting](https://academic.oup.com/edited-volume/28323)):
1. Uses lagged return. housing price changes exhibit positive serial correlation.
  * But difficult to disentangle spurious correlations from actual market inefficiencies.
2. Uses valuation ratios : the rent-price ratio, price-income ratio.
  * But not be able to capture fully the time variations in the conditioning set.
3. Evidence of the relevance of property, and/or region-specific, economic variables : such as demography, income, construction costs, and zoning restrictions.


<img src="/assets/img/paperread/thumbs.png" height="25"/> [Understanding the impact of city government relocation on local residential property prices in Hangzhou, China 2024](https://www.sciencedirect.com/science/article/pii/S0197397523002291). The impact of government relocation on the property market.
* The impact is **spatially concentrated and temporally transient**.
* The average treatment effect over the seven-year post-relocation period was positive (4.76%), but it did not reach statistical significance.
* There was a significantly positive effect (12.7%) on transaction prices within a 5 km radius of the new city hall during the first year following relocation; however, this effect **diminished rapidly** in subsequent years.
* For transactions within **1 km** of the new government site, the significant positive effect persisted for **five years**.

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Forecasting Methods for the Real Estate Market: A Review 2023](https://www.researchgate.net/publication/376033071_Forecasting_Methods_for_the_Real_Estate_Market_A_Review)
* Time Series Analysis:
  * ARIMA Models (AutoRegressive Integrated Moving Average)
  * Exponential Smoothing. work for seasonality.
  * Regression Analysis. no non-linearity captured.
* Hedonic Pricing Model, based on the fundamental characteristics of the property.
* Artificial Intelligent Modeling.
* Econometric Forecasting Method : (1) VAR Models (Vector Autoregression); (2) Panel Data Models.
* Spatial Analysis Forecasting Methods: (1) Geospatial Forecasting; (2) Spatial Autoregressive Models (SAR).

<img src="/assets/img/paperread/thumbs.png" height="25"/> [Anticipating critical transitions of the housing market: new evidence from China 2019](https://www.researchgate.net/publication/331954277_Anticipating_critical_transitions_of_the_housing_market_new_evidence_from_China) detect housing bubbles by finding the evidence of market inefficiencies. use Log Periodic Power Law Singularity (LPPLS) model to predict critical time (~ bubbles break time).


<img src="/assets/img/paperread/chrown0.png" height="25"/> [House Price Index Construction in the Nascent Housing Market: The Case of China 2014](https://link.springer.com/article/10.1007/s11146-013-9416-1). Chinese housing market is facing a greater risk of mispricing than reported by the existing official metrics.
* Main methods:
  1. the simple average method without quality adjustment.
    * without the substantial complex-level quality
  2. the matching approach with the repeat sales modeling framework.
    * without effect of developers’ pricing behaviors.
  3. the hedonic modeling approach.
* *Average Price Index*, *70 Cities Index*. mistrusted and widely criticized: conflict, underestimated,
* Newly-built sector prices could reflect real pricing.
* **Hedonic modeling**: $P_{ijt} = \alpha OU_{it} + \lambda UU_{it} + \beta OC_{jt} + \phi UC_{jt} + \theta PB_{ijt} + \delta_{t} D_{ijt} + \mu_{ijt}$
  * U : unit-level housing characteristics; C: complex-level housing characteristics. O: observed; U: unobserved. PB : developers’ pricing behaviors; D: time dummies; μ : error term.
