---
layout: page_mba
title: Financial Markets
---


[Financial Markets Coursera](https://www.coursera.org/learn/financial-markets-global/home/). [Talk with ChatGPT](https://chatgpt.com/share/aa073c42-1c11-44f2-9145-d4e9eb45eaf8). [Certification link](https://www.coursera.org/account/accomplishments/verify/3XB9BHY50930)

1. [Introduction](#l1): the basics of financial markets, insurance, and CAPM (Capital Asset Pricing Model).
2. [Debt, Forecasting, Behavioral Finance](#l2): some details of behavioral finance, forecasting, pricing, debt, and inflation.
3. [Financial Instruments](#l3): Stocks, bonds, dividends, shares, market caps; what are these? Who needs them? Why?
4. [Real Estate](#l4): recessions, bubbles, the mortgage crisis, and regulation.
5. [Options and bond markets](#l5): Derivatives (衍生品).
6. [Investment](#l6): investment banking, underwriting processes, brokers, dealers, exchanges, and new innovations in financial markets.
7. [Nonprofits, Corporations & Philanthropy](#l7)
8. [Career](#l8): your career in finance.

<a name="l1"></a>
# 1. Introduction

The basics of financial markets, insurance, and CAPM (Capital Asset Pricing Model).

**Financial institutions** are a pillar of civilized society, <u>directing resources across space and time to their best uses, supporting and incentivizing people in their productive ventures,</u> and managing the economic **risks** they take on. The workings of these institutions are important to comprehend if we are to predict their actions today and their evolution in the coming information age.


* **VaR** variance and “value at risk” (for describing portfolio)
  * 1% one-year VaR of 10 million means 1% chance that a portfolio will lose 10 million in a year.
* **Stress Test** usually organized by governement, to see how some firm will stand up to a financial crisis. A method of accessing risks to firms or portfolios.
  * ["The Dodd-Frank Wall Street Reform and Consumer Protection Act"](https://en.wikipedia.org/wiki/Dodd%E2%80%93Frank_Wall_Street_Reform_and_Consumer_Protection_Act) in response to 2007-2008 crisis.
  * Economic **scenarios analysis**: tries to incorporate all potential economic and financial crises, such as recessions, appreciation and depreciation of currency, liquidity crisis, etc.
  * It is inadequate.
* **S&P 500** (Standard & Poor's 500 stock price index ) used as a benchmark for returns.
  * **Correlation** of individual company and the market.
  * **Capital Asset Pricing Model (CAPM)**. $StockRisk = \beta^{2} SystematicRisk + IdiosyncraticRisk $
    * low beta - safe.
    * negative beta : gold.
* **Distribution & Outliers**
  * Normal distribution. Cauchy distribution with **fat tails** (exhibits a large skewness or kurtosis).
  * On October 19, 1987 the stock market fell 20.47 percent in one day.


<a name="l1.1"></a>
## 1.1 Insurance

Deal with Risk - **Insurance**：
* Problems facing by insurance companies:
  * **Risk Pooling**（风险池化）the source of all value in insurance.
    * 通过将多个独立的风险（如不同地区或客户的需求波动、供应链中不同供应商的风险等）组合在一起，从而减少整体风险的不确定性和波动性。
  * **Moral Hazard** dealt with partially by deductions and coinsurance.
    * 一个人或机构可以在行为上做出选择而无需承担这些行为的全部后果时，从而导致不良（高风险）行为增加。信息不对称，风险转移，行为变化。
  * **Selection Bias** dealt with by group policies, by testing and referrals, and by mandatory government insurance.
    * 保险公司的评估可能面临选择偏差。
  * Example : weather insurance, the definition is vital.
* Insurance Milestones.
* Insurance is a Local Phenomenon (in US). US's insurance system is complicated.
  * If insurance company failed. Gov tends to bail it out,
  * The China Insurance Regulatory Commission.
* Health Insurance in US.
  * U.S. has had something like 45 million people uninsured. US health insurance is private, and it's often through employers.
    * Has high charge rate (for health people).
    * Caused by selection bias (the people who sign up for insurance are the people who know they're sick and need it. )
  * U.S. Patient Protection and Affordable Care Act 2010 (**Obamacare**)
    * Try to deal with selection bias problem by forcing everyone to sign up (or else face a tax penalty).
* Disasters:
  * Flood Insurance. to discourage building house in designated high-risk area.
  * Terrorism risks. US force insurance companies to offer against terrorism (while gov pays 90%).
    * Governments need to involve sometimes.

<a name="l1.2"></a>
## 1.2 Portfolio

Deal with Risk - **Portfolio Management**
* Portfolio Diversification. (Don't put all eggs in One Basket)
  * **CAPM** : *asserts* that all investors hold their optimal (tangency) portfolio, as a result <u>the tangency portfolio equals the market portfolio.</u>
  * return $r_{i} = r_{f} + \beta_{i}(r_{market} - r_{risk free rate})$
* Investment Companies as Providers of Diversification
  * Since it is difficult for individual people.
  * Investment trusts; Mutual funds; Closed end investment companies; Unit investment trusts.
* **Equity Premium Puzzle** (3.9% over 200 years) we should invest all in stocks ?
  * The average return on stocks has been significantly higher than the return on risk-free assets (such as government bonds), by a margin that is much larger than can be explained by standard economic theories.
  * Equity Premium = Expected Return on Stocks − Risk-Free Rate.
  * answer : US equity premium may reflect a selection bias.
* **Short Sales**
  * Brokers can enable you to hold <u>a negative quantity of a tradable asset</u>.
  * It won't happen with ideal tangency portfolio. (since every one will short a stock at the same time)
* Calculating the **Optimal Portfolio**.
* **Efficient Portfolio Frontier**. risk - return graph.
  * Limitations and Assumptions: (1) Dependence on Historical Data for returns and risks; (2) Market Efficiency Assumption; (3) Normal Distribution of Returns.
* **Gordon Growth Model**
  * To determine the intrinsic value of a stock, based on the present value of its expected future dividends.
  * $P = \frac{X}{r - g} = \frac{X}{1+r} + \frac{X(1+g)}{(1+r)^{2}} + ...$
    * P: present price of the stock.
    * X: The expected dividend (股利) in the next period (usually one year).
    * r: The required rate of return (or discount rate) for the investor.
    * g: The constant growth rate of the dividend per year.
  * Assumptions: (1) Dividends Grow at a Constant Rate; (2) r > g; (3) Stable Business.
  * Limitations: Fit only stable, mature companies with predictable growth rates. <u>While the world is changing very fast.</u>

<a name="l1.3"></a>
## 1.3 Others

**Q&A**:
* Hedge Found, more a private thing ~ family office.
* Avoid systemic crisis. more macro-credential regulation and more measures of risk.
* Black Swan, that talked about rare, low-probably events as being sometimes really big. (e.g. house prices)
  * find subtle evidence.
* Hedging against the <u>labor market risks</u>:
  * Unemployment insurance
  * Livelihood (wage) insurance (for wage decrease). if you help people, people will take more risk (<n>to a make better world</n>).

**Philanthropy Capitalism**（慈善资本主义）是一种将资本主义的市场驱动力与慈善事业结合在一起的理念。它主张通过商业手段和市场机制来解决社会问题，而不仅仅依靠传统的慈善捐赠或政府干预。这种模式认为，企业和富有的个人可以利用他们的资源、创新能力和市场力量，在追求盈利的同时，也能对社会产生积极的影响。
* 特点：（1）盈利与社会影响；（2）市场驱动；（3）可持续性。
* 实践：（1）Impact Investing；（2）社会企业；（3）企业社会责任（CSR）。
* 批评：（1）效力与规模—难以覆盖脆弱和贫困群体；（2）利益冲突导致社会目标被牺牲；（3）社会责任的转移。

<a name="l2"></a>
# 2. Debt, Forecasting, Behavioral Finance

**Debt**:
* Invention Takes Time: progress is slow.
* **Limited Liability** (负债).
  * Protection against liability: investors in stocks can never be pursued for the mistakes of the company invested in.
  * But might encourage corruption, creating lottery effect.
* **Inflation Indexed Debt** (通货膨胀率连结债券) pays back index to inflation.
* **Unidad de Fomento** (UF值) price to be tied to consumer price index (CPI).
  * money is often defined in terms of the: a store of value, a unit of account and a medium of transaction.
* Real Estate: Risk Management Devices.
  * Insurance against house price.
  * Short the housing market can help stop bubbles, and protect people.

**Forecasting**:
* **The Efficient Markets Hypothesis** (***half truth***).
  * <u>semi-strong form: all publicly information is already incorporated in the market prices.</u>
* **Random Walk Hypothesis** with growth.
  * $x_{t} = x_{t - 1} + \varepsilon_{t} $. Totally unforecastable. so better make prediction with the price today.
  * First-order autoregressive (AR-1) Model: $x_{t} = x_{0} + \rho (x_{t -1} - x_{0} ) + \varepsilon_{t} $. elastic tied to the lamp post.
* **Price as PDV**: the price of a stock should be the present discounted value of expected dividends.
  * **P/E ratio** (price-earnings ratio) ： the amount investors are willing to pay for each unit of the company's earnings.
  * P/E ratio = (Price per Share) / (Earning per Share EPS)

**Behavioral Finance**:
(Adam Smith "The Wealth of Nations", "The Theory of Moral Sentiments" - As people mature, <u>the desire for praise morphs</u> into <u>a desire for praiseworthiness</u>. (unknown mathematicians v.s. famous actors))
<img style="float: right;" src="/assets/img/company/prospect_thoery.jpg" width="30%"/>
1. **Prospect Theory** :  how people make decisions between alternatives that involve risk and uncertainty, especially when the probabilities of outcomes are known. Challenges the traditional economic assumption that people are rational actors who always make decisions to <u>maximize utility</u>.
  * (1) <u>Value function</u> : overly focused on little losses, little gains.
  * (2) <u>Weighting function</u> : overweight small probabilities and underweight large probabilities.
  * (3) Reference dependence, decisions are based on perception from a specific reference point.
  * (3) Framing effect, decisions are influenced by how the choices are presented rather than by the actual outcomes.
  * Criticisms: (1) being descriptive rather than predictive; (2) does not account for all the complexities of decision-making in real-world scenarios.
2. **Overconfidence**: most people think they're above average.
3. **Cognitive Dissonance** : the discomfort a person feels when their behavior does not align with their values or beliefs. (strengthen decision rightness, ignore bad decision)
4. **Mental Compartments** : we tend to (ignore the whole thing) separate thoughts and feelings that seem to conflict.
  * Option salespeople use these tactics: buy a put option on a single stock.
5. **Attention Anomalies** : we tend to pay attention to the same things that other people pay attention. (we cannot pay attention to everything)
6. **Anchoring** : decisions are based on perception from a specific reference anchor.
  * stock price prediction anchored to past value.
7. **Representativeness Heuristic** : people judge by familiar patterns.
  * manipulators try to create patterns to fool investors.
8. **Disjunction Effect** : inability to make decisions in advance in anticipation of future information.
9. **Magical Thinking** : people believes that specific thoughts, words, emotions, or ritual behaviors have a special influence on the world around them. (built from repeating behaviors)
10. **Quasi-Magical Thinking** :
  * People bet more on coin not yet tossed.
  * People pay more for lottery ticket in which they choose the number.
11. **Culture and Social Contagion**.
12. **Antisocial Personality Disorder**.

**Q&A**:
* How to measure the irrational molde in prediction ?
  * Central Bank policy: strategies and actions implemented by a central bank to manage a country’s monetary system and achieve specific economic objectives.
  * People tend to focus on short-term. transactions tax.
  * Mike O'Brennan at UCLA proposed that  create separate markets for corporate dividends at various horizons.

<a name="l3"></a>
# 3. Financial Instruments

**Interest Rates**:
* Term is the time that you have to leave your money in and cannot get it out at least without a penalty.
* Interbank Market Interest Rates:
  * Federal Funds interest rates (over night rate), virtually zeros since crisis.
  * [EONIA (Euro Overnight Index Average )](https://corporatefinanceinstitute.com/resources/economics/euro-overnight-index-average-eonia/) went even to negative. (since it is costly to store cash)
* Source: "Interest rates tend to be small positive numbers like 3% or 5% because of <u>technical progress, time preferences</u> (people are naturally impatient.) and <u>advantages to round aboutness</u> (round about production process -  time-consuming method of production)."
* Compound Interest $A = P(1 + r/n)^{nt}$:
  * If $n \to \inf$, continuous compounding, balance is $e^{rt}$.

## 3.1 Bonds

**Discount Bonds** (zero-coupon bonds) (貼現債券) being redeemed at their full face value at maturity. Normally sold with discount. Yield to Maturity r : $P = \frac{1}{(1+r)^{T}}$.
**Coupon Bonds** (息票债券) debt security that pays periodic interest payments, known as coupons, to the bondholder.

**Consol** (永续债券) and **Annuity** (年金):
* Consol pays constant quantity x forever (no maturity date). Consol PDV = x/r.
* Growing Consol pays $x(1+g)^{t-1}$ in t. Growing Consol PDV = x/(r - g).
* Annuity pays x from time 1 to T. Annuity PDV = $x\frac{1-1/(1+r)^{T}}{r}$.
  * No principal repayment at maturity in an annuity.

**Forward rates** (远期利率/汇率) refer to the agreed-upon interest rates or exchange rates for a financial contract that will take effect at a future date.

**Inflation** (通货膨胀) the rate at which the general level of prices for goods and services is rising, eroding purchasing power over time. Interest rates with inflation: $(1 + r_{money}) = (1 + r_{real}) (1 +r)$, $r_{money} \approx r_{real} + i$.

**Indexed Bonds** (指数债券) bonds whose interest payments and/or principal repayment are adjusted based on an underlying index, often to account for inflation or changes in interest rates. Designed to protect investors from inflation or other economic fluctuations.

**Leverage** (杠杆) putting more money into the asset than you have.
* Irving Fisher “The Debt-Deflation Theory of Great Depressions” 1933.
  * Deflation redistributed real wealth from debtors to creditors.
  * The overall level of debt in the economy (hence leverage) rises in real value because of deflation.
* John Geanakoplos [“The Leverage Cycle”](https://en.wikipedia.org/wiki/Leverage_cycle) 2009 ([paper](https://web.stanford.edu/~piazzesi/Reading/Geanakoplos2009)).
  * <u>Supply and demand do determine both the equilibrium leverage (or margin) and the interest rate.</u>
  * "In the absence of intervention, leverage becomes too high in boom times, and too low in bad times. As a result, in boom times asset prices are too high, and in crisis times they are too low. This is the leverage cycle." "fed should manage system."
* Debt is a good thing, but not always well managed.

## 3.2 STOCK

**Market Capitalization** (the price per share multiplied by the number of shares, and this is common stock) by Country.
* Households market is bigger than the direct holdings on the stock market.

**Corporation**
* Compare *publicani* of ancient Rome, essentially corporations.
* *Shareholder Democracy* : (1) Shareholder vote for *Board of Directors*; (2) Board of Directors votes the CEO; (3) In Germany, firms have Supervisory Board and Management Board.
* <u>For-Profit</u> (objectives focus on shareholders) vs. <u>Non-Profit</u> (don't distribute profits to shareholders).

Two **RETURN** components : capital gains which is the appreciation in the price per **Shares** (股份) and **Dividends** (股息 or 红利):
* Shares are about ratio : total value of company divided by total number of shares. Share price adjustment : by splitting (essentially meaningless).
* Dividends:
  * *Most* of the returns got on the stock market are in the dividends.
  * A dividend is <u>a message that the company is making money</u>, and <u>it will build up trust</u>.
  * X dividend date: when a company pays a dividend, the share price pretty much has to drop.
* Young people prefer company without dividends (recent 20 years).

<u>Common vs. Preferred Stock (优先股) </u>:
* Preferred stock *typically* has a specified dividend which does not grow through time (but no force) (!= corporate bonds).
* Preferred shareholders usually <u>do not have voting rights</u> in the company.
* Made for Gov to avoid the situation : if US gov buy common stock, the gov would be owning parts of companies - socialism.

**Corporate Charter** (公司章程):
* All common shareholders are treated equally. All shareholders have one vote, and they elect the Board.
* Allow for takeovers of companies.
  * Shareholder Democracy won't work well for large company (Berle and Means 1933). (why do I even bother vote, since my vote is miniscule)
* Share with voting right, and share without.

How Corporations **Raise Money**?
* (1) Retained earnings, save until got enough money; (2) Borrow money, issue debt; (3) Issue new shares (leads to dilution 稀釋).
* <u>Stuart Myers Pecking Order Theory</u>: firms like to raise money through retained earnings first, through borrowing second, equity only as last resort.
  * Without issuing new shares, share price doesn't matter for the company.

**Share Repurchase**: (instead of issuing new shares to raise money) the company can repurchase shares outstanding (reverse dilution).
* It's an alternative way of paying a dividend. (<u>but not taxed the same</u>)
* Tax incentive (激勵):
  * Dividends tax payed at marginal tax rate.
  * Share Repurchase: (Capital gains taxes) won't pay tax until sell the share.

**PDV of Expected Dividends**
* **price earnings ratio**, price per share divided by earnings per share.
  * dividend price ratio, dividends per share divided by price per share.
* <u>All the value of the star Inherently is due to the dividends.</u> The price of a share is the present discounted value of its expected future dividends.
  * But dividends do not serve as it was designed now.
* Gordon Model: $P/E = I/(r - g)$.
  * high r : riskier in that they co-vary with the market.
  * high g : the price will reflect the growth in earnings already.
  * **Value investing** says invest in low P/E. (when a company is hot, people bid it up too high.)


Others:
* People's answer to "stocks are the best investment", strongly correlated with the recent behavior of the market.
* Recessions are substantially psychological - a long-term pessimism.
* Nominal rate : without considering inflation.

<a name="l4"></a>
# 4. Real Estate

**Direct Participation Program** (直接参与计划)
* Allows investors to participate directly in the cash flow and tax benefits of an underlying business venture.
* Pass-Through Taxation (without corporate profits taxes 企业所得税); Limited partners, Limited Liability; Illiquidity; High Risk and High Reward; For accredited investors.
* Examples :
  * Real Estate Partnerships: Investors pool their money to invest in commercial or residential real estate projects.
  * Oil and Gas Partnerships: Investors fund drilling and exploration projects with the potential for significant returns if resources are discovered.
* Wanted to protect small investors, while it just kick off them.

**REIT** (Real Estate Investment Trust), available to small investors to share the cake. Can also escape corporate taxes. Has restrictions.

<a name="l4.1"></a>
## 4.1 Mortgage

Mortgage : to mortgage your house means to offer it as collateral for a loan. <h>House price rise <-> New Mortgage <-> Sell Repacked Mortgage.</h>
* Bubbles:
  * 2017 mortgages owned by households was $13.2 trillion, there were 48 million in the United States. In 2012, 11 million homes that were under water.
  * Millions of houses were foreclosed in early 1930s in crisis. Turn to have long term mortgage.
* the 30-year mortgage rate tracks the 10-year government bond yield.
* Kinds of Mortage.
  * Conventional, fixed rate mortgage (amortizing, long term).
  * Adjustable rate mortgage (ARM).
  * Price level adjusted mortgage (PLAM) payment adjusted to inflation so constant in real terms.
  * Dual rate mortgages (DRAMs) same as PLAM but interest rate floats.
  * Shared appreciation mortgages (SAMs).
* Risk management: Private Mortgage Insurance (PMI).
* <u>Repack the mortgage, and sold them to general people.</u> (leads to liar's loan， "天才"！)
  * Collateralized Mortgage Obligations (CMOs 擔保抵押證券) divide the cash flow of a mortgage pass-through security into a number of tranches (信貸分檔) in terms of prepayment risk.
  * Collateralized Debt Obligations (CDOs 債務擔保證券) divide the cash flow into a number of tranches in terms of default risk.

Post Crisis Regulation :
* **QRM** Qualified Residential Mortgage:
  * 2010 [Dodd-Frank Wall Street Reform and Consumer Protection Act](https://www.investopedia.com/terms/d/dodd-frank-financial-regulatory-reform-bill.asp): Mortgage originator, have to hold at least 5% of the mortgages you issue, unless it's a QRM  (undefined yet).
  * Took 4 years to define QRM in 689 pages.
* **Excess Reserves** (超額準備金) [not hold until 2008](https://en.wikipedia.org/wiki/Excess_reserves).
  * After 2008, keep increasing, not where to invest. Decreasing since 2015.

Others:
* <u>Moral hazard and adverse selection</u> (逆選擇), manipulation and deception.
  * Bank might stop to loan money.
  * Local offices, build local interaction to decide whether to loan.
* China - Real Estate:
  * (1) Hard to invest abroad; (2) A fear of corruption, a fear of being taken advantage of; (3)Marriage.
  * Will they stay up there? towards liberalizing (invest abroad), might be slow down in economic growth rate.

## 4.2 Bubble
<p></p>

* House index of interest rate is stable for 100 years. House is not a good long-term investment.
* People accept 12% price increase per year for the next 10 years in 2004.
* Public attitudes were changing since 2005 : obvious -> stupid. (<u>but they rarely mentioned the word "bubble"</u>)

<div align="center">    
<img src="/assets/img/company/home_price_index.jpeg" width="60%"/>
</div>

* Rational Bubble.
* Bubbles don't crash completely.
* Short Sell : If you can't short sell, there is nothing to stop crazy people from bidding up the price.

## 4.3 Regulation
<p></p>

* MicroPrudential vs Macroprudential Regulation
* Business Wants Regulation : having a referee at a sports event.


Q&A:
* Dodd-Frank Act. wanted to get banks responsible for ability to pay and responsible for checking out borrowers.  
* Short sale restrictions.
* Public expectations that prices can never fall (China).
  * But is Real Estate a good investment ? might not.
* A tax benefit to homeownership (USA) to encourage homeownership for better citizens.
* Anti-corruption laws in China.

**Five Levels of Financial Regulation**:

<u>(1) Within-firm regulation: </u>
* Board of Directors acts like a regulator & Outside directors represent a broader community.
* Tunneling Problem = Expropriation (不動產徵收) by minority shareholders (~steal. figuratively, as by an underground tunnel)
  * Asset sales; Contracts, as for prices paid for inputs; Excessive executive compensation; Loan guarantees; Expropriation of corporate opportunities; Dilutive share issues; Insider trading.
* Common law is very useful in preventing tunneling and other kinds of abuse.
* Directors’ Duties to Prevent Tunneling : Duty of Care & Duty of loyalty.


|  | Common Law (普通法) | Civil Law (民法) |
| Origin | originated in England and is used in countries that were once part of the British Empire (US, Canada, Australia, and India). | Originated in continental Europe, particularly in Roman law, and is used in most European countries|
| Basis | based on precedent, the outcomes of previous judicial decisions influence future cases. | based on written legal codes and statutes, with less emphasis on judicial decisions. |
| Judges  | judges having significant power to interpret and shape the law. |  judges playing a more limited role in interpreting the law.|
| Role |  framework for legal interpretation  |  structured, codified rules in specific areas |

<u>(2) Trade Groups: </u> Stock Exchange : Text of Buttonwood Agreement 1792 (1st in US). Companies made a deal to not decrease the price.

<u>(3) Local Government Regulation: </u> Bank Regulation. Belonged to states until the National Banking Act of 1863.

<u>(4) National Government Regulation:</u>
* An innovative spirit and government support for regulators. Making regulation an attractive career.
* Securities and Exchange Commission (**SEC** 美国证券交易委员会) set up in 1934, to force organizations to maintain financial transparency.
  * Crimes of financial markets:
    * <u>Insider Trading</u>: block by trying to define access to this wealth, by disclosure rules.
    * <u>Front Running and Decimalization</u>.
  * Financial Accounting Standards Board (FASB) (recognized as authoritative by SEC in 1973) defines Generally Accepted Accounting Principles (GAAP), used for EDGAR.
* Securities Investor Protection Corporation (SIPC) : insures people against the failure of a brokerage firm.
* The 2008 Financial Crisis as Result of Regulatory Failure before Crisis.
  * Dodd-Frank Act 2010.
  * European Supervisory Framework Created 2010.

<u>(5) International Regulation: </u>
* Bank for International Settlements. Banker's bank : provides an intermediary for the central banks to deal with each other.
* Basel Committee on Banking Supervision: an international committee that formulates broad supervisory standards and guidelines, and recommends statements of best practice in banking supervision.
* G-7 Countries, G20.
* Financial Stability Board.

<a name="l5"></a>
# 5. Options and bond markets

**Forwards and Futures Contracts** (a forward contract usually only has one specified delivery date, whereas there is a range of delivery dates in a futures contract)
* Grains are historically the origin of forwards and futures.
  * It is essential in preventing grain shortages.
  * Warehouses buy from the farmer in forwards, and then hedge on futures.
* **Forward Contract**: a contract to deliver at a future date (exercise date or maturity date) at a specified exercise price.
  * Both sides are locked into the contract, no liquidity. need to establish that the counterparty has good credit
  * Forward exchange rate (Y/\\$) = spot exchange rate (Y/\\$) $\times \frac{1 + r_{Y}}{1 + r_{\$}}$.
  * Forward Rate Agreements.
* **Futures contracts** differ from forward contracts in that <u>contractors deal with an exchange rather than each other</u>, and thus do not need to assess each others’ credit.
  * Futures contracts are standardized retail products, rather than custom products.
  * Futures contracts rely on margin calls to guarantee performance.
  * Forwards are rigid, <u>Futures create meaningful price and it create clarity for the future</u>.
  * <u>Most futures contracts are closed out without delivery.</u> Mostly used to hedge against price fluctuations.
* **Cash-Settle Futures** : the final delivery is replaced by a settlement in cash. The difference between the contract price and the market price of the underlying asset at expiration is exchanged between the buyer and seller. (So, the contract means put up **margin** at the beginning).
  * Can be on financial indices, interest rates, or commodities that are difficult to deliver.
* Fair Value in Futures Contracts : $P_{future} = P_{spot}(1+r+s)$ (r: interest rate, s : storage cost).

Futures **Examples**:
* Rice Futures:
  * First Futures Market: Osaka. Futures exchange had precise definitions of quality, delivery date and place. The contract can be traded, which <u>creates liquidity in the rice trade</u>.
  * CBOT Rough Rice Futures (GBX)
* Wheat Futures.
* Oil Futures.
  * (has no obvious spot price) Oil Prices : nearest future prices.
  * Oil prices have not significantly increased over the past century. This is in contrast to the stock market, which has shown significant growth.
  * The Organization of Petroleum Exporting Countries (OPEC) was established to fix oil prices and limit production.
* SPI (Stock Price Index) & FFR (Federal Funds Rate) Futures.

**Options** With options, one pays money to have a choice in the future (Forwards contract is bound to buy).
* Exercise date, Exercise price, Definition of underlying and number of shares.
  * “Ask” is the price to purchase an option.
  * “Bid” is the price to sell the option back to the dealer.
  * “Last” is the last price the option was sold for.
* Why Have Options?
  * Theoretical Reason: Kenneth Arrow : a major source of economic inefficiency is the absence of markets for risks. Stephen Ross : financial options have a central place in the form of “completing the market.”
  * Behavioral Reason: Salience and Attention. As insurance. Peace of mind.
* Put/Call parity.
  * <u>put option price - call option price = present value of strike price + present value of dividends - price of stock</u>
  * <u>price of stock = call price + pdv strike + pdv dividends - put price</u>
* Using Options to Hedge:
  * To put a floor on one's holding of stock.
  * (Stop-loss order: will be operated by broker - human.)

**Q&A:**
* Speculators help to stabilize the market prices.
* The biggest arsenal against economic inequality is the insurance industry.

<a name="l6"></a>
# 6. Investment

## 6.1 Investment banks

**Investment banks**: Underwriting securities (manage the process of issuing new shares in companies or issuing debt for companies). Commercial banks take deposits and make loans.
* Two Basic Kinds of Offerings: (1) Bought deal (synonym: Firm commitment offering): The underwriter agrees to buy all shares that are not sold; (2) Best efforts: the underwriter says that if the issue is not sold, deal collapses.
* <u>Initial Public Offerings IPO</u>. the process through which a private company offers its shares to the public for the first time.
  * underwriters usually underprice IPOs, aim to create a "pop" on the first day of trading, leading to positive publicity and investor excitement.
* <u>Ratings Agencies</u>. They have improved their practices due to new regulations and the need to restore their reputation. Despite accepting money for ratings, they now exercise more care in their evaluations.
* <u>Glass-Steagall Act 1933</u>. create the modern concept of "Investment Banks", separated investment banking from commercial banking.

## 6.2 Professional Money Managers

**Professional Money Managers** who invest other people's money by managing their portfolios.

* <u>Prudent Person Rule</u> : prudent person as someone who acts with care, skill, prudence, and diligence in a similar capacity and familiar with such matters.
* A <u>financial planner</u> offers comprehensive planning for life, whereas a <u>financial advisor</u> advises on the value of securities.

## 6.3 Funds
<p></p>

* <u>Open-End</u>: can pull your money in and out. owning a share in a portfolio, and you can get it out at market value at 4:00 pm of every day.
  * <u>Mutual Fund</u> are investment companies that allow individuals to invest their money in a diversified portfolio of stocks, bonds, or other securities. *only deal at the closing price*.
  * <u>Exchange-Traded Funds (ETFs)</u>  traded on stock exchanges and can be bought and sold *throughout the trading day*.
* <u>Closed-End Funds</u>: the fund invests the money, and it pays dividends out, but it doesn't redeem.
  * (+) trading continually all day long. (-) doesn't track the value of the underlying assets necessarily (value of fund != value of investment).

## 6.4 Exchanges, Brokers, Dealers, Clearinghouses
<p></p>

* **B**rokers act on behalf of **O**thers as their **A**gent for which they earn a **C**ommission.
  * Acts as an agent for others and earns a commission by bringing buyers and sellers together.
* A **D**ealer always acts for **H**imself, in other words as a **P**rincipal in the transaction for which he makes a **M**arkup.
  * When buying from a dealer, the dealer owns the shares being sold and sells them at a higher price. When selling to a dealer, the dealer buys at a lower price.

The Traditional Four Markets:
* First Market: NYSE (New York Stock Exchange).
* Second market: NASDAQ National Market (replaced the “pink sheets” in 1971).
* Third market: Nasdaq small cap.
* Fourth market: large institutions trade amongst themselves without the use of a securities firm.

<u>High frequency trading</u> is not seen as adding value to the market and is considered to be siphoning money away from investors.

<u>Payment for Order Flow</u> is The compensation and benefit a brokerage receives by directing orders to different parties to be executed.

## 6.5 Public Finance

Government Debt and Default.
* <u>Repudiation of a debt</u> (refuse to pay). <u>Odious debt</u> (refuse to pay old gov debt). However, repudiation is **rare**.
* Governments in danger of default often pay higher interest rates to attract investors.
* <u>Loan default</u> means you've failed to make the required payment by the due date you agreed to.

“Government as Risk Manager of Last Resort” - David Moss. Government involvement in Corporations. Bankruptcy allows companies to reorganize or shut down, with the government often accepting some of the losses in the process. As a result, <u>Government act like a shareholder.</u>

Municipal (city/town gov) Finance.

* Motivation (why not finance everything by taxes?) <u>borrow money for construction - then charge as tax</u> assuming steady population growth.
* Connecticut adopted a constitutional amendment in 1991 against deficit spending (spending exceeds revenue) on the general account at time that it instituted a state income tax. Can still run deficit on capital account.
* Revenue Bonds.

Government Social Insurance.
* The first major government involvement in insurance, which occurred in Germany in the 1870s.
* Driven by the belief that the private sector may not be able to effectively handle certain aspects of insurance and that some insurance programs may be difficult to sell to the public.
* Forms : families with dependent children, progressive taxes, free public education, social security, worker's compensation, and government health insurance.

<a name="l7"></a>
# 7. Nonprofits, Corporations & Philanthropy

## 7.1 Nonprofits

People are not completely selfish. In the United States alone, there were 1.41 million non-profit companies in 2013, employing 10.2% of the workforce.
Motivations for working in non-profits can vary, from a desire to make a meaningful impact to a need for companionship and a sense of loyalty. Additionally, non-profits may have informal executive bonus systems to incentivize good work.

## 7.2 Corporations

The Rochdale society, established in the 1840s, was the first cooperative grocery store.


## 7.3 Alternative Forms

**Benefit Corporation** (created in Maryland, 2010), Halfway between for-profit and non-profit. Company charter must state a social or environmental
purpose, and is required to pursue that as well as profit. Example: Grower’s Secret and NPK balance of planet.

<a name="l8"></a>
# 8. Career
<p></p>

<h>Finance is about making civilization work better.</h> Accumulating wealth while you're young and giving it away constructively when you're older. Emphasizing the importance of maintaining humanity in the business world and finding purpose in life and finance.

The rise in debt for advanced economies and the increasing share of profits and wages in the financial industry.
* whether these trends contribute to a better society or if they are simply rent-seeking behaviors.
* Critics of Modern Finance:
  1. Critics 1: Adair Turner Between Debt and the Devil Oct 2015 : Corporate debt is a kind of “economic pollution” that needs to be taxed.
  2. Critics 2: Rana Foroohar Makers & Takers May 2016: tax evasion.

<u>Democratization of Finance</u>, which benefit everyone, not just the wealthy.
* Crowdfunding platforms like [Crowdcube](https://www.crowdcube.com/) allow entrepreneurs to present their ideas and connect with potential investors. (regulations needed)
* Involves addressing societal and environmental issues.

Finance and War

* Reparations (赔偿) imposed on Germany after World War I. Confiscation (充公) of financial holdings in East Germany after World War II.
* Not all governments confiscate or nullify financial arrangements after a war.
* It is important to be aware of the potential risks and disruptions that war can bring to long-term investments and to consider the basic ethics of the investment being made.

Finance and Population Growth

<u>The Importance of Financial Theory:</u>
* Mathematical Finance (**skepticism**)
  * The world will never be the same again because of the development of mathematical finance.
  * The theory of allocation of scarce resources was not understood by most people in early 20th century.
* <u>Behavioral Finance is the salvation of mathematical finance, for it explains the frictions that inhibit it.</u>
  * Hardcore mathematical finance people have a tendency to be irrelevant.
  * Law schools are as necessary as the math, finance people.

Wealth and Poverty
* Popular theory: inequality is because of political power, evil people.
* **Alternative theory: inequality is due to unmanaged risks.** (<n>doubt</n>)
* Risk Management : Democratizing finance and providing financial advice to all individuals, regardless of income level, to reduce poverty and inequality.
