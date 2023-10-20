---
layout: page_tree_math
title: Artificial Intelligence - Stanford Encyclopedia of Philosophy
---

[Artificial Intelligence - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/artificial-intelligence/)

# Table of Contents

{:start="1"}
1. [History](#l1)
2. [What Exactly is AI?](#l2)
3. [Approaches to AI](#l3)

{:start="7"}
7. [Philosophical AI](#l7)
8. [Philosophy of Artificial Intelligence](#l8)
9. [Future](#l9)

<p></p>

<a name="l1"></a>
# 1. History

<div align="center">  
  <pre class="mermaid">
  timeline
    title AI
    section Classic
      long before : Aristotle's theory of the syllogism
           : Descartes’ test
      1950 - Alan Turing Mind paper : "Can a machine think?"
           : Turing Test (TT)
      1956 - Dartmouth workshop : The term 'artificial intelligence'
           : Logic Theorist (LT)
    section Modern Age
      1997 - Deep Blue : won Kasparov in chess
      2002 - Russell & Norvig : Artificial Intelligence A Modern Approach
      2011 - IBM Watson : won quiz show Jeopardy - question answering (QA)
  </pre>
</div>

<a name="l2"></a>
# 2. What Exactly is AI?

Four Possible Goals for AI According to AIMA:

|   | Human-Based	 | Ideal Rationality |
|---|----------|------------|
| Reasoning-Based | Systems that think like humans. | Systems that think rationally. |
| Behavior-Based | Systems that act like humans. | Systems that act rationally. |

Russell & Norvig are in the “acting rationally” camp. <n>Russell’s picture is similar to a Reinforcement Learning machine, which find an optimal action w.r.t. the environment, according to a value function.</n>
* How to model the environment E.
* How to design the value function V.

Newell (1973):

> AI is the field devoted to building artifacts that are intelligent, where ‘intelligent’ is operationalized through intelligence tests (such as the Wechsler Adult Intelligence Scale), and other tests of mental ability (including, e.g., tests of mechanical ability, creativity, and so on).

<a name="l3"></a>
# 3. Approaches to AI

Largely based on [Artificial Intelligence - A Modern Approach](https://people.engr.tamu.edu/guni/csce421/files/AI_Russell_Norvig.pdf).

## 3.1 The Intelligent Agent Continuum

**Agent <-> Environment** :

> The main unifying theme is the idea of an intelligent agent. We define AI as the study of agents that receive percepts from the environment and perform actions. Each such agent implements a function that maps percept sequences to actions, and we cover different ways to represent these functions… (Russell & Norvig 2009, vii)

* Decision making.
* Reading. (1) learn knowledge from reading; (2) learn a language.
* Subjective consciousness and creativity.

## 3.2 Logic-Based AI: Some Surgical Points

nonmonotonic reasoning.

## 3.3 Non-Logicist AI: A Summary

artificial neural networks.


## 3.4 AI Beyond the Clash of Paradigms

<a name="l7"></a>
# 7. Philosophical AI

AI is philosophy (**turn out to be incorrect as it constrains the field**). Daniel Dennett (1979): AI should be viewed "as a most abstract inquiry into the possibility of intelligence or knowledge". AI is the <u>attempt to explain intelligence</u> by a *top-down* approach – by designing and implementing abstract algorithms that capture cognition. (However, AI can reveal *only* possible mechanistically realizable modes.)
1. Philosophy of physics certainly entertains the proposition that the physical universe can be perfectly modeled in digital terms, but of course philosophy of physics **can’t be** identified with this doctrine.
2. we now know well that information processing ([hypercomputation](https://en.wikipedia.org/wiki/Hypercomputation)) **can** exceed standard computation (Turing Machines). (<n>why can't we extend algorithms with these hypercomputation machines, which may help overcome the first problem as well.</n>)
3. <n>I think the AI approach of intelligence (if possible), is one approach, not the only approach. And may not be the same as human approach to intelligence.</n>

<a name="l8"></a>
# 8. Philosophy of Artificial Intelligence

## 8.1 “Strong” versus “Weak” AI

Searle 1997, [see here also](/Math/ai/01handbook/#lphiloc):
* “Strong” AI seeks to create artificial persons: machines that have *all the mental powers* we have, including phenomenal consciousness.
* “Weak” AI, on the other hand, seeks to build *information-processing machines* that appear to have the full mental repertoire of human persons.
  * can pass Total Turing Test.

## 8.2 The Chinese Room Argument Against “Strong AI”

[The Chinese Room Argument](https://plato.stanford.edu/entries/chinese-room/), see also "Philosophical issues" in [AI handbook](/Math/ai/01handbook/#lphilofond).
* "Understanding" is nowhere to be found.
* Since CRA is sound, there can’t be conscious machines, nor malevolent machines.

## 8.3 The Gödelian Argument Against “Strong AI”

[Gödel’s Incompleteness Theorems](https://plato.stanford.edu/entries/goedel-incompleteness/).
Roger Penrose, *The Emperor’s New Mind (1989)*, *Shadows of the Mind (1994)* ([Book Reviews](https://journalpsyche.org/archive/volume-2-1995-1996/), & LaForte et. al 1998; Bringsjord and Xiao 2000; Shapiro 2003; Bowie 1982).

* **F** & **F'**:
  * **F**: the totality of methods of (unassailable) mathematical reasoning that are in principle humanly accessible can be encapsulated in some (not necessarily computational) sound formal system.
  * **F'**: F + assertion “I am F.”.
* If “I am F.”, then  Gödel statement G(F′) is true.
* Since I am therefore capable of perceiving something beyond the powers of F′, I deduce that I cannot be F after all.

## 8.4 Additional Topics and Readings in Philosophy of AI

Hubert Dreyfus (1972, 1992), Stuart Dreyfus (1987).
human expertise is not based on the explicit, disembodied, mechanical manipulation of **symbolic information** (such as formulae in some logic, or probabilities in some Bayesian network), and that AI’s efforts to build machines with such expertise are doomed if based on the symbolic paradigm.

<a name="l9"></a>
# 9. Future

worry about "bad" AI.
* Bostrom (2014) an exceedingly dark picture of a possible future.
* Searle (2014) we needn’t worry, since without consciousness, there won't be malicious motivation.
* Human's malicious motivation will influence the usage of powerful machines.
* Andy Clark (2003) humans will gradually become, at least to an appreciable degree, cyborgs, courtesy of artificial limbs and sense organs, and implants.
