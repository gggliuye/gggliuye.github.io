---
layout: page_tree_math
title: LLM algorithms
---

[link of a port to use ChatGPT](https://www.min2k.com/)

# Table of Contents

1. [ChatGPT: 30 Year History](#history)
2. [ChatGPT - Higher Level Discussions](#lhld)
3. [Algorithm Papers](#papers)

<p></p>

<a name="history"></a>
# 1. ChatGPT: 30 Year History

youtube : [ChatGPT - 30 Year History - How AI Learned to Talk](https://www.youtube.com/watch?v=OFS90-FX6pg)

**Recurrent neural network**:
* [Serial Order: A Parallel Distributed Processing Approach 1986](https://cseweb.ucsd.edu/~gary/PAPER-SUGGESTIONS/Jordan-TR-8604-OCRed.pdf). First paper on sequential learning.
  * Symbol sequence to sequence. Train by predicting next symbol.
  * Could used to generation of sequence -> Trajectory pattern.
* [Finding structure in time 1990](https://www.sciencedirect.com/science/article/abs/pii/036402139090002E), large network train on language.
  * Observation of word boundary detection. Observation of word clustering. -> Semantic ?
* [Generating Text with Recurrent Neural Networks 2011](https://icml.cc/2011/papers/524_icmlpaper.pdf), push the experiment forwards.
  * Word compression in language understanding.
* [The Unreasonable Effectiveness of Recurrent Neural Networks 2015](https://karpathy.github.io/2015/05/21/rnn-effectiveness/). First "large" language model Hinton/Sutskever.
* [Learning to Generate Reviews and Discovering Sentiment 2017](https://arxiv.org/abs/1704.01444) (Ilya from OpenAI) trained on Amazon reviews (larger).
  * Sentiment neuron **emerge** from training to predict next word.
  * Size limiting the performance.

**Transformer** (encoder - decoder):
* Impractical to train.
* [Attention Is All You Need 2017](https://arxiv.org/abs/1706.03762), adaptive connection.
  * Leads to shallower wider network, practical to train.
  * look at everything all at once, without need of internal memory.

**GPT-1** : [Improving Language Understanding by Generative Pre-Training 2018](https://paperswithcode.com/paper/improving-language-understanding-by) use transformer in next word prediction. trained on 7000 books. show zero-shot behaviors.

**GPT-2** : [Language Models are Unsupervised Multitask Learners 2018](https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) same approach. data from Reddit, much large network.<u> But still drift to none sense after many sentences.</u>

**GPT-3** : same approach, 100 bigger network - **175 billion parameters**. **trained on entire network data**. **context learning** during inference.

**ChatGPT** : shape the network to better follow human instruction.



<a name="lhld"></a>
# 2. ChatGPT - Higher Level Discussions

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

<img src="/assets/img/paperread/thumbs.png" height="25"/> [New Theory Suggests Chatbots Can Understand Text](https://www.quantamagazine.org/new-theory-suggests-chatbots-can-understand-text-20240122/)
* It's important that AI scientists reach consensus on risks-similar to climate scientists, who have rough consensus on climate change-to shape good policy. [conversation: Geoff Hinton with Andrew Ng](https://www.linkedin.com/posts/andrewyng_had-an-insightful-conversation-with-geoff-activity-7073688821803978752-DO9h/)
* **Random Graphs**, which give rise to unexpected behaviors after they meet certain thresholds, could be a way to model the behavior of LLMs.

<a name="papers"></a>
# 3. Algorithm Papers

<img src="/assets/img/paperread/chrown.png" height="25"/> [LLaVA: Large Language and Vision Assistant 2023](https://llava-vl.github.io/), Open source LLM, work better for **visual instruction**.
