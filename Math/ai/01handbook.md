---
layout: page_tree_math
title: The Cambridge Handbook of Artificial Intelligence
---

# Table of Contents

1. [Part I: Foundations](#l1)
    1. [History, motivations, and core themes](#lhisto)
    2. [Philosophical foundation](#lphilofond)
    3. [Philosophical challenges](#lphiloc)
2. [Part II: Architectures](#l2)

Further reading:
* [Artificial Intelligence - A Modern Approach](https://people.engr.tamu.edu/guni/csce421/files/AI_Russell_Norvig.pdf)
* [Artificial Intelligence - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/artificial-intelligence/)
* [Philosophy of Artificial Intelligence](https://philpapers.org/browse/philosophy-of-artificial-intelligence)

<p></p>

<a name="l1"></a>
# Part I: Foundations

<a name="lhisto"></a>
# 1. History, motivations, and core themes

Key moments:
* McCulloch and Pitts: artificial neuron.
* Alan Turing. Turing machine, Turing test.
* The Dartmouth Workshop.
* Neural net winter. Minsky's dissertation, *Perceptrons* (1969).
* Connectionsim, Parallel Distributed Processing volumes (1986).
* The AI winter, 1980s.

<a name="lphilofond"></a>
# 2. Philosophical foundation

[The Cambridge Handbook of Artificial Intelligence](https://www.academia.edu/71977270/The_Cambridge_Handbook_of_Artificial_Intelligence). I read the version pressed 2014.

## 2.1 Turing Test & Its Problems

(1) **Blockhead thought experiment** [wiki](https://en.wikipedia.org/wiki/Blockhead_(thought_experiment)): not only the behavior of an organism that determines whether it is intelligent, we must also consider **how** the organism achieves intelligence.

(2) **Disembodied intelligence** (not interacted with physics world), TT is unrealistic and may even have obstructed AI progress. **Total TT**, robots must be able to operate in the physical environment.

> The reduction of mind to de-contextualized fragments is ultimately impossible and misleading.

## 2.2 Philosophical AI : The example of mechanizing reasoning

Three levels for mechanizing deduction:
1. **Proof Checking**: Given a deduction D that purports to derive a conclusion P from a number of premises, decide whether or not D is correct.
2. **Proof Discovery**: Given a number of premises and a putative conclusion P, decide whether P follows logically from the premises, and if it does, produce a formal derivative of it.
  * The problem is algorithmic-ally unsolvable. (P!=NP).
3. **Conjecture generation**: Given a number of premises, generate an "interesting" conclusion P that is likely to follow logically from the premises.
  * The ability to <n>process inductive reasoning should be more important,</n> conjecture generation is the leading way to inductive reasoning.

## 2.3 Historical and conceptual roots of AI

(1) [Dartmouth workshop](https://en.wikipedia.org/wiki/Dartmouth_workshop): 1956 conference at Dartmouth College.

(2) The theory of computability.

(3) The ["Cognitive Revolution"](https://en.wikipedia.org/wiki/Cognitive_revolution) began from 1950s.
* **Overthew behaviorism** (interested in "learning", which was seen as "the novel association of stimuli with responses") and rehabilitated mentalistic psychology. The cognitive and behaviorist positions are framed as rationalist and empiricist, respectively by Noam Chomsky.
* Main ideas:
  * The Scientific Method.
  * Mediation and information processing.
  * **Innateness**. Innate structure in the mind based on some inherent genetic coding.
  * Modularity of the mind.
* [A Review of BF Skinner's Verbal Behavior 1959](https://chomsky.info/1967____/) by Noam Chomsky.
* While deny the theoretical legitimacy of explaining human hebavior by positing unobservable mental entities, or that intentional terminology had any place in a science of the mind.
* The similiarities between human thought and information processing; the existence of "cogntive map"; internal representation of information.

## 2.4 Computational theories of mind and the problem of mental content

**Computational theory of mind (CTM)**, two cores (assumptions):

* **Mental Representation** of a proposition. From Russel's analysis (1940) of intentional sentences : psychological attitude towards a proposition.

<div align="center">  
  <pre class="mermaid">
        graph LR
        B["Language"] <--> A["Mentalese (language of thought)"]
  </pre>
</div>

* **Syntactic Engine** (syntax can mirror semantics), a mental process is a sequence of tokenings of mental representations which express the propositional content of the corresponding thoughts (~ orchestrated by an algorithm).

<div align="center">  
  <pre class="mermaid">
        graph LR
        B["Syntax"] <--> A["Semantics"]
  </pre>
</div>

(example 1) **Turing-machine Functionalism**, a mental state is not to be found in the biology of the brain (or in the physics that underwrites the hardware of its central processing unit, in the case of a machine) but rather in the *role* that the state plays in one's mental life (or computations), and particularly in the **causal relations** that it bears to stimuli (inputs), behavior (outputs), and other mental (Computational) states.

(example 2) **Physical Symbol System Hypothesis (PSSH)** a machine that produces through time an evolving collection of symbol structures - a collection of symbol tokens related in some physical way and subject to a variety of syntactic operations (creation, modification, reproduction, destruction).

(example 3) Good old fashioned artificial intelligence [GOFAI](https://en.wikipedia.org/wiki/GOFAI).

**Problem** : <u>How these primitives acquire meaning?</u>
* **Information theory** : covariance. The meaning of a symbol is determined by whatever the tokenings of that symbol systematically (nomologically) covary with.
* **Evolutionary theory** : adaption. The meaning of an intentional state is the function for which it was selected.
* **Conceptual-role semantics** (CRS, or procedural semantics) : relation (~ functionalism). The meaning of a mentalese symbol S is fixed by the role S plays in one's cognitive life.
  * Issue of externalism. CRS lack of a connection between mentalese and the world.

## 2.5 Philosophical issues

(1) <u>The critique of Hubert Dreyfus.</u> [What Computers Can't Do 1972](https://archive.org/details/whatcomputerscan00hube).
* Empirically, AI researches has *failed* to deliver the goods.
  * reply : not yet, AI is a young field, it has future.
* Philosophically (from phenomenology and existentialism point of view) *"Holistic context" problem*, our ability to understand the world and other people is a non-declarative type of know-how skill that is not amenable to GOFAI-style propositional codification.
  * reply : <n>we can develop a reinforcement learning system (as ChatGPT did) learn by "ongoing involvement with the world".</n>

**Predict & Explain**, an encoding R might correctly predict behavior, but it does not necessarily explain it.

(2) <u>Block's critique of machine functionalism via the "China brain" thought experiments</u>: imagine the entire population of China simulating a human mind for an hour. The system might well be isomorphic to the brain (~ programmed robot), but it would not seem to harbor any sensation, pains, itches, or beliefs and desires for that matter. <n>reply: recall deny in "Cognitive Revolution", we cannot localize these "intentional terminologies" in the mind.</n>

(3) <u>Searle's "Chinese Room" thought experiment.</u> similar to [Blockhead thought experiment](https://en.wikipedia.org/wiki/Blockhead_(thought_experiment)).

* systems reply : the overall system does understand chinese.
* robot reply : Searle is not functioning as a full-fledged robot (need robot's causal transactions with the real world).

## 2.6 AI from below : Situated intelligence

Turning the spotlight away from internal representations and processes toward external behavior and continuous interaction with the environment.
**Situated AI**, amounted to “looking at simpler animals as a bottom-up model for building intelligence”. the “prime component of a robot’s intellect” is not to be found in reasoning but rather in “the dynamics of the interaction of the robot and its environment.”

An overall trend away from statics and toward dynamics, from the abstract and decontextualized to the concrete and context-bound, from justification to discovery, from isolated contemplation to social interaction, and **from thinking to doing**.

<a name="lphiloc"></a>
# 3. Philosophical challenges

## 3.1 Concepts

**Intelligence**:

<div align="center">  
  <pre class="mermaid">
        graph LR
        B["intelligence"] --> A["task intelligence
        (able to carry out some tasks)"]
        B --> C["thing intelligence
        (the intelligence used to carry out a task)"]
        C --> D["premium thing intelligence
        (can enlighten how human have thing intelligence)"]
        C --> E["regular thing intelligence
        (cannot ...)"]
  </pre>
</div>

**AI** (Searle 1980):
* Strong AI : “the appropriately programmed computer really is a mind, in the sense that computers given the right programs can be literally said to understand and have other cognitive states”.
* Weak AI : provide a useful tool for rigorous formulation and testing of hypotheses about the mind.

**Turing Test**. <n>We could make some other rules to separate AI and people, while since these rules are made by human, ask human directly to "tell" is obviously more thoughtful. But something has intelligence doesn't necessarily act like a ordinary human.</n> [Blockhead thought experiment](https://en.wikipedia.org/wiki/Blockhead_(thought_experiment)) makes the definition questionable but still highly effective.

**Purpose, consciousness, intentionality**:
* <n>Surly we have some close goals for our actions, but our life might be meaningless and nonsense.</n>
* <n>And I think purpose (in a positive way) is not the reason for our existence, but adaption is. Since the life unable to adapt, will die.</n>
* Purpose without **consciousness** could be counted as (thing) intelligent ?
* **Intentionality** : possession of internal states or events that represent worldly objects and their properties. (<n>tokenings</n>)

<a name="l2"></a>
# Part II: Architectures
