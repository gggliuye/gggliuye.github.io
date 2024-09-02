---
layout: page_tree_math
title: China Property Market
---

# Table of Contents

* [Papers](#lpapers)
* [Log Periodic Power Law Singularity (LPPLS) model](#llppls)
* [Rent-Price Ratio](#lrpr)
* [Bubbles](#lbubbles)
* [Graphs & Analysis](#lgraphs)
* [房屋问题的分析](#lright)

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

**Data 2024/05:**

万博：

| 小区 | 面积 | 租金(月) | 售价 | RPR |
|----|-----|--------|------|------|
|万科欧泊| 95 | 5000  | 400w |  66 |
| 万科欧泊 | 188 | 11000 | 850w | 64.4 |
| 万科欧泊 | 143 | 9000 | 800w |  74 |
| 锦绣香江山水华府 | 91 | 4500-5000 | 400w | 66-74 |
| 锦绣香江紫荆雅园 | 180 | 7000 - 1w | 660w | 55-78 |
| 信基城 | 117-159 | 5500 | 400w-500w | 60-75 |
| 碧桂园蓝天苑 | 150 | 5000 | 500w | 83 |
| 雅居乐尺山 | 100 | 4400 | 300w-400w | 56-75 |

南沙：

| 小区 | 面积 | 租金(月) | 售价 | RPR |
|----|-----|--------|------|------|
|金茂湾| 120 | 4000  | 400w |  83 |
| 龙光棕榈 | 97 | 2400 | 200w | 69.4 |
| 云山诗意 | 112 | 2500 | 200w |  66.66 |

[US](https://smartasset.com/mortgage/price-to-rent-ratio-in-us-cities): 5 (Detroit) ~ 51 (San Francisco).

<div align="center">    
<img src="https://www.stlouisfed.org/-/media/project/frbstl/stlouisfed/blog/2021/may/blogimage_housevaluation_052421.jpg" width="65%"/>
</div>

<a name="lbubbles"></a>
## Bubbles

**美、日、中对比：**

|  相似之处 | 房地产市场泡沫 | 高杠杆率| 银行体系的风险|
|---|--------------|------|------|
| 美国（2008年次贷危机）| 次贷危机的核心是房地产市场的泡沫破裂。银行向信用不良的借款人发放次级贷款，当房价下跌时，这些贷款大量违约，导致金融系统崩溃。| 许多购房者和金融机构使用高杠杆，借款比例高，风险敞口大。|银行大量坏账，金融机构倒闭或需要政府救助。|
| 日本（1990年代初）|1980年代末期，日本的房地产市场和股市泡沫巨大。随着政府收紧货币政策，泡沫破裂，导致房地产价格大幅下跌，银行坏账激增。| 企业和个人大量借款投资房地产，杠杆率极高。| 日本银行体系背负大量坏账，金融机构面临严重的资产负债表问题。|
| 中国（目前情况）| 中国的房地产市场在过去几十年中迅速增长，房价高企，政府和银行对房地产行业的依赖性增强。最近几年来，房地产市场增速放缓，部分开发商出现债务危机。| 房地产开发商和购房者普遍使用高杠杆，借款比例高，尤其是在房地产市场繁荣期。| 部分房地产开发商违约可能导致银行体系坏账增加，影响金融稳定。 |
|  **区别之处** | **政府干预和调控** | **经济结构和增长模式**| **国际环境**|
| 美国 | 美国政府迅速采取行动，出台了包括TARP在内的一系列救市措施，并且美联储大幅降低利率，实施量化宽松政策。| 次贷危机发生时，美国经济多样化，科技、服务等行业具有较强的活力和韧性。|次贷危机期间，全球经济相对稳定，美国通过国际合作和协调应对危机。|
| 日本 |日本政府在泡沫破裂初期反应较为迟缓，后期采取了大规模的公共投资和宽松货币政策，但经济长期低迷。| 泡沫经济时期，日本经济高度依赖制造业和房地产，泡沫破裂后经济增长长期低迷。| 泡沫破裂时，日本处于冷战结束后的国际经济重组期，外部环境复杂。|
| 中国 | 中国政府有较强的宏观调控能力，通过政策调整和资金注入试图稳定市场。近年来，政府采取措施限制房地产投机，促进经济转型。| 中国经济正在从高速增长向高质量发展转变，政府积极推动科技创新和产业升级，但房地产在经济中的比重仍然较高。| 当前中国面临复杂的国际环境，包括中美贸易摩擦、地缘政治紧张等，对经济稳定产生一定影响。|


<a name="lgraphs"></a>
## Graphs & Analysis

(Data got from [国家统计局-数据](https://data.stats.gov.cn/index.htm))

<div align="center">    
<img src="/assets/img/math/house_invest.png" width="65%"/>
</div>

<div align="center">    
<img src="/assets/img/math/house_guangzhou.png" width="95%"/>
</div>

**Analysis**:
* 新房数据的可靠性更高（二手房的数据，可能会由于避税而造假）。
* &#x2612; Model Matching approach:
  * 无法参考他国历史的模型：由于中国和资本主义国家的政府干预模式不同。
  * 无法参考本国历史的模型：中国房地产市场出于新的阶段。
* &#x2612; Hedonic modeling approach: 价格的波动不是由于房产本身的一些固定特性（面积、楼层等）导致的。
* &#x2612; LPPLS: 中国是政策导向的（并不是西方的自由市场偏向），按照时序系统去分析可能不如研究政策方向。
* 可能需要从价格和价值的对比分析上寻找方向。

**Policy**:
* 23/09:开放限购-番禺、黄埔。
* 24/05:(利好底部刚需) (1)首付比例下降到最低15%;(2)公积金利率下降到2.85%、商贷款不设下限;(3)3000亿资金建设保障房。
  * <u>清理底部库存，为改善房提供更多需求方。</u>
  * 广州：（1）首付15%/25%；（2）6个月社保购房；（3）取证即可售。
* 24/07：三中全会，租售并举。
* 24/08/01：（广州）“在我市行政区域内购买新建商品住房的住房公积金缴存人，可申请提取本人及其配偶下住房公积金支付购首付”。
* 24/08/23：[房屋体检、房屋养老金、房屋保险](https://m.yicai.com/news/102245939.html)。22城试点房屋养老金，资金暂时来源于公共资金。

对于改善购房的影响：
* 刚需住房和底部库存进一步被消化。
* 卖掉房子的消费者可以进一步购置改善住房。
  * 在不改变市场库存的情况下，增加改善房的需求方。
* 对早已不限购的番禺的影响：
  * 原本只能在非限购区域买房的群体可以去其他地区购房，番禺的优势被去除。
  * 会有好的影响吗？感觉不会特别对番禺有好影响。

<a name="lright"></a>
## 房屋问题的分析

房产是一个好的金融产品吗？

房地产投资的收益来源：
1. （++）租金——稳定的现金流（类似于**分红**，[Dividend Yield](https://www.investopedia.com/articles/markets/071616/history-sp-500-dividend-yield.asp) : 3%~5%）。
2. （？）资本增值（但是交易过于困难，或者是否能有房产所有分割后共同所有的金融产品——Real Estate Investment Trust REIT）。
3. （+）税收优惠（对一般人来说是有利的）。
4. （++）通胀保护（对抗通货膨胀的有效工具）。
5. 强制性储蓄效应。

房产的缺点：
1. 流动性差，难以快速变现。
2. 高进入门槛，资本需求大。
3. 管理和维护成本，房产投资需要考虑维护成本、管理费用、物业税等长期开销。。
4. 市场风险，房地产市场波动。


中国的房地问题：
* 前提：房产是人权问题——市场上有很多金融产品，其中也有很多是一般人负担不起的。之所以房屋成为金融产品、房屋的价格居高不下成为问题，是因为房屋是一个社会保障和关乎人权的问题。
  * 房屋的社会保障属性：房屋联系到户口、房屋联系到社会保险、房屋联系到子女教育、等等。
* 解决思路：解构房产和人权的紧密联系（也正是三中权会强调的“租售同权”）：
  * 租房获得和直接拥有房产具有同样的社会保障权益。
* 解构人权的困难：
  * <u>观念上的关系解构困难</u>：结婚对房产的需求是根深蒂固的，需要时间来缓解矛盾。
    * 积极的地方：房价最贵的大城市，人们的思想同时也更加开放。
    * 消极的地法：小城市的传统观念难以消除。
    * 解决思路：<u>对社会思想进行改造。</u>
  * <u>租房的不稳定性</u>，租房者的被动不稳定性更强（主动换租不是问题），[24年中国租房调查](https://www.thepaper.cn/newsDetail_forward_27616517)。
    * 消极的地方：保障性住房也有各种条件和时间的限制，更加不稳定。
    * 解决思路：<u>增加房屋交易的难度；对租房进行进一步保障。<u>
* 房价的趋势：$ Price = (1 + k)(BaseValue + G) $
  * （+）因为房价过低会影响社会的稳定，所以国家会控制房价的稳定。
    * 目前：通过对交易的松绑。交易手续费比例（k）。
    * 其他：为房屋增加其他价值属性（不设计人权的）——“改善”需求（G）。
  * （-）房产库存在一些区域是过量的，不过在大城市这个问题相对较小。
    * 针对小城市做一些政策？
  * （-）房屋作为金融产品的特点：交易周期长、成本高。
    * 拥有房产的利润来源：租房的租金 — **Price-to-Rent Ratio** (Base Value)。
    * 对一般人来说是低质量的投资方式，普通人的炒房热会下降。
    * 对金融组织来说则是可以接受的，只要有利润就可以进行。


分析一下美国与中国的异同，看看能否将美国市场作为参考：

|     | 美国  | 中国 |
|------|------|-----|
| 地区 | 美国住房市场的地域多样性使得居民在经济能力范围内选择住房的可能性更大。 | 优质教育资源通常与房产紧密相关。 |
| 社会地位 |租房者在社会地位上不会因未购房而受到明显影响，尤其是在大城市，租房是相当普遍的生活方式。| 房产不仅是财富积累的手段，更是社会地位和婚姻市场中的重要资产。|
| 市场流动性| 房地产市场较为成熟，流动性相对较好，金融产品如REITs也增加了流动性。| 房地产市场流动性较差，交易周期长且成本高，普通投资者难以通过房产快速变现。|


房产作为金融产品，有其独特的优势和缺点。尽管它在收益来源、税收优惠和通胀保护方面表现出色，但也面临着流动性差、进入门槛高和市场风险的挑战。在中国，房产问题还与社会保障和人权紧密联系，需要通过政策和观念上的改变来解决。与美国相比，中国市场的社会压力更大，房产的投资价值也更为复杂。
