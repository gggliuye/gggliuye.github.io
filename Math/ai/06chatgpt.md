---
layout: page_tree_math
title: LLM algorithms
---

[link of a port to use ChatGPT](https://www.min2k.com/)

# Table of Contents

1. [ChatGPT - Higher Level Discussions](#lhld)
2. [Algorithm Papers](#papers)

<p></p>

<a name="lhld"></a>
# 1. ChatGPT - Higher Level Discussions

<img src="/assets/img/paperread/thumbs.png" height="25"/> [An era of ChatGPT as a significant futuristic support tool: A study on features, abilities, and challenges 2022](https://www.sciencedirect.com/science/article/pii/S2772485923000066)

<img src="/assets/img/paperread/chrown0.png" height="25"/> [ChatGPT is no stochastic parrot. But it also claims that 1 is greater than 1 2023](https://link.springer.com/article/10.1007/s13347-023-00619-6). Gamer changer but not real intelligence.
* **intelligent "behavior" != "intelligence"**.
* ChatGPT is **much more than a stochastic parrot**. It can generate novel propositional content and respond to arbitrary questions and scenarios coherently and informatively.
* Testing with more questions:
  * From the example of "happy Italian", we found that ChatGPT can **describe** modus ponens, but not able to **apply** it properly. (<n>ChatGPT needs correct human guide</n>, as in [LLM discussion on P!=NP](/2023-09-20-SocraticReasoning/))
  * ChatGPT cannot handle **spatial layout and ordering relations**.
  * ChatGPT works poor with **math** problems. (<n>apparently</n> [LLM4Science](https://github.com/microsoft/LMOps/tree/main/LLM4Science) <n>does a better job.</n>)

<img src="/assets/img/paperread/chrown0.png" height="25"/> [AI as Agency Without Intelligence: on ChatGPT, Large Language Models, and Other Generative Models 2023](https://link.springer.com/article/10.1007/s13347-023-00621-y)

* What is **Understanding** : one knows how to correct and improve it. Example of writing an essay on Descartes’ Meditations is not to summarize what has already been said, but to :
  * take the electronic text of one of the Meditations and try to improve its translation into English (thus one learns to check the original);
  * clarify the less clear passages with a more accessible paraphrase (thus one sees if one has really understood the text);
  * try to criticise or refne the arguments, changing or strengthening them (thus one realizes that others have tried to do the same, and that is not so easy);
  * and while doing all this, learn the nature, internal structure, dynamics and mechanisms of the content on which one is working.
* LLMs are **fragile**.
* LLMs are **not stochastic parrots**. LLMs synthesize texts in new ways, restructuring the contents on which they have been trained, not providing simple repetitions or juxtapositions. LLMs are like **trickster**: they gobble data in astronomical quantities and regurgitate (what looks to us as) information.
* Other **issues** (consider DALL-E, text to image generator):
  * copyright and reproduction right of the data used in trainning.
  * mental health problem, caused by some harmful content.
  * security considerations.
  * financial and environmental costs of new systems.
* AI-to-AI bridge. [Socratic Models](https://socraticmodels.github.io/), [Wolfram-Alpha & ChatGPT](https://writings.stephenwolfram.com/2023/01/wolframalpha-as-the-way-to-bring-computational-knowledge-superpowers-to-chatgpt/).

<img src="/assets/img/paperread/chrown.png" height="25"/> [Large Language Model for Science: A Study on P vs. NP](/2023-09-20-SocraticReasoning/).

<a name="papers"></a>
# 2. Algorithm Papers

<img src="/assets/img/paperread/chrown.png" height="25"/> [LLaVA: Large Language and Vision Assistant 2023](https://llava-vl.github.io/), Open source LLM, work better for **visual instruction**.
