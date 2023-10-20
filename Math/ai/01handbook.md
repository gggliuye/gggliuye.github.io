---
layout: page_tree_math
title: The Cambridge Handbook of Artificial Intelligence
---

# Table of Contents

I only have access to a really old version.

[Part I: Foundations](#p1)
1. [History, motivations, and core themes](#lhisto)
2. [Philosophical foundation](#lphilofond)
3. [Philosophical challenges](#lphiloc)

[Part II: Architectures](#p2)

{:start="4"}
4. [GOFAI](#l4)
5. [Connectionism](#l5)
6. [Dynamical systems and embedded cognition](#l6)

<p></p>

<a name="p1"></a>
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

<a name="lphiloissue"></a>
## 2.5 Philosophical issues

(1) <u>The critique of Hubert Dreyfus.</u> [What Computers Can't Do 1972](https://archive.org/details/whatcomputerscan00hube).
* Empirically, AI researches has *failed* to deliver the goods.
  * reply : not yet, AI is a young field, it has future.
* Philosophically (from phenomenology and existentialism point of view) *"Holistic context" problem*, our ability to understand the world and other people is a non-declarative type of know-how skill that is not amenable to *GOFAI-style* propositional codification.
  * Intelligence requires the ability to figure out what rules to apply, and when they can be applied (**finding relevance dependence**), while machines that merely store rules do not begin to do this.
  * reply : <n>this might be true for GOFAI, but not true for neural networks, as we can develop a reinforcement learning system (as ChatGPT did) learn by "ongoing involvement with the world".</n>
  * from [Pei Wang 2010](https://www.iiim.is/2010/05/questions-about-artificial-intelligence/) : The fact that the system’s low-level activities are predetermined by various programs does not necessarily mean that its behaviors when solving a problem always follow a fixed procedure - the same problem may get different solutions.

**Predict & Explain**, an encoding R might correctly predict behavior, but it does not necessarily explain it.

(2) <u>Block's critique of machine functionalism via the "China brain" thought experiments</u>: imagine the entire population of China simulating a human mind for an hour. The system might well be isomorphic to the brain (~ programmed robot), but it would not seem to harbor any sensation, pains, itches, or beliefs and desires for that matter. <n>reply: recall deny in "Cognitive Revolution", we cannot localize these "intentional terminologies" in the mind.</n>

(3) <u>Searle's "Chinese Room" thought experiment</u> (against GOFAI). similar to [Blockhead thought experiment](https://en.wikipedia.org/wiki/Blockhead_(thought_experiment)).
* Searle thought the key is : <u>the causal powers of neuroprotein</u>, but how it could ground intentionality is a philosophical mystery.
* systems reply : the overall system does understand chinese. It is whole persons who understand stories and questions, not their language centers or their frontal lobes.
* robot reply : Searle is not functioning as a full-fledged robot (need robot's causal transactions with the real world).
* <n>I think such "Chinese Room" will not be seen intelligent by the outsider (since it will always gives the same answer given the same input, while an intelligent identity will consider the real content), so the arguments based on it shall be invalid.</n>

(4) **Gödelian arguments**, formal systems (as mechanism system is) cannot be both consistent and complete.
* Some argue that human intelligence is, or human can prove itself to be consistent. so machine cannot have human intelligence.
* However, both a mechanism that is represented by system, and :
  1. We can prove that: If s in consistent, then s cannot prove $$G(s)$$.
  2. Neither we nor the mechanism represented by s can prove that : s cannot prove $$G(s)$$.


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

**Mechanism vs. Rationality (and Free Will)**.
* Machine cannot have ration.
* Machine is a deterministic system, which cannot have free will.
  * "Compatibilist" tradition disagree with it, it holds <u>free will to be present when reasoning processes have their normal effects on behavior</u>.

**Gödelian arguments** see upper text.

## 3.2 Classical approach

GOFAI : Logical principles (or, rules) apply to propositions and, in general, depend on the terms and internal structure of those propositions.

The details of the following topics are added to [2.5 Philosophical issues](#lphiloissue): (1) Searle's "Chinese Room"; (2) The critique of Hubert Dreyfus.

## 3.3 Connectionism

Neural Networks. Rule-like results without rules.

(1) Systematicity critic, Fodor and Pylyshyn (1988; see also Fodor 2000). Natural languages are learned in systems of sentences, NN cannot yield systematicity. Reply of connectionists: some kinds of networks that will yield systematicity.

(2) Psychological realism, some argue that a brain-inspired device should also be able to provide premium artificial intelligence.
* It is not clear how a brain could apply *"backpropagation"* or *"state value update"* to the adjustment of synaptic connections among neurons.
  * <n>Planes are inspired by birds, but not all mechanism of planes can be found in birds.</n>
* Can reinforcement learning be scaled up to real-world problems ?
  * <n>Sure it can.</n>

(3) Distributed **Representations**. “Knowledge” of a connectionist device is also distributed across the weights of its connections.
* black box.
* encoder-decoder. does not have psychologically realistic examples. <n>I am sure we have now.</n>

## 3.4 Dynamical systems theory

Views cognition as depending on a continuous interaction of a cognitive agent with its surroundings. Intelligence arises from a design that can exploit the information present in an environment **without** first converting that information into an **internal representation**. (Robots)

* What is to count as a "representation"?
* We can offer description and explanatory mechanism to DST, while cannot be applied to Cognitive Systems. Which indicates that, they should be different.
* Many instances of intelligence rely heavily on memory, while memory requires *representations*.

<a name="p2"></a>
# Part II: Architectures

<a name="l4"></a>
# 4. GOFAI

Symbolic AI: Search, Planning & Heuristic.

<div align="center">  
  <pre class="mermaid">
    erDiagram
      Rules ||--o{ Possibilities : generates
      Heuristic ||--o{ SearchSpace : guide
      Planning {
        FinalGoal xxx
        SubGoal xxx
        etc etc
      }
      Planning  ||--o{ SearchSpace : guide
      Possibilities  ||--o{ SearchSpace : "offerd to"
      SearchSpace  ||--o{ Output : gives
  </pre>
</div>

* Strengths: Model hierarchy and sequential order, to allow for precision in problem solving, and to represent specific propositional contents.
* Weakness:
  * Frame problem: situation - action relationship; reasoning with incomplete knowledge; inconsistent of the logic.
  * The definition of the task (or other concepts) might be impossible.
* Hybrid:
  * GOFAI + PDP.
  * GOFAI + Robot.

Philosophy:
* Searke's Chinese Room.
* Physical Symbol Systems (PPS), claims that the mind is a PPS.
* "all computation is Turing computation" is it true?
* "intentionality is grounded in our evolutionary history".
  * "empty-program" argument.
  * the cartesian separation of mind, body and world.

In sum :
* Considered as technology, GOFAI is a hugely impressive, though largely invisible (and therefore unrecognized), success.
* Considered as psychology, it is partially successful but needs to be complemented by other AI methodologies.
* Considered as philosophy, it is partly mistaken (see Chapter 3), and some (i.e., the anti-naturalists) would say that it is fundamentally on the wrong track.

<a name="l5"></a>
# 5. Connectionism

Learning :
* Supervised Learning - backpropagation. (<n>Layered NN</n>)
  * Layered feedforward NNs have been shown to be *universal approximators*.
  * Recurrent NNs have been shown to be *Turing-equivalent*.
* Unsupervised Learning, requires no error signal. (<n>~Clustering, SVM, etc</n>)
* Reinforcement Learning, requires only indication of good/bad.

Representation:
* Localist representation. Node <-> Concept.
* Distributed representation. Set of nodes <-> Concept.

Cognitive Science: for learning higher level behaviors, **simplification** is applied. <n>Classification of the abilities and define area in brain for them, while neither these definition nor the area are identifiable. The same story could be applied to NNs.</n> (recall : the theoretical legitimacy of explaining human hebavior by positing unobservable mental entities, or that intentional terminology had any place in a science of the mind.)

Hybrid systems, "use the right tool for the right job".
* Combination of
  * symbolic models (which capture explicit knowledge).
  * connectionist models (which capture implicit knowledge).
* Example: **CLARION**, 4 subsystems, each consistent of a top (symbolic) layer and a bottom (connectionist) layer.
  1. action-centered subsystem (ACS), control internal/external actions.
  2. the non-action-centered subsystem (NACS), maintain general knowledge.
  3. the motivational subsystem (MS), provide underlying motivations.
  4. the metacognitive subsystem (MCS), monitor and modify the operations of the other subsystems.

<a name="l6"></a>
# 6. Dynamical systems and embedded cognition

The situated, embodied, dynamical (SED) framework, focuses on concrete action and emphasizes the way in which an agent’s behavior arises from the dynamical interaction between its brain, its body, and its environment.

## 6.1 Situated activity

**Situated activity**, stresses three ideas:
1. **Concrete Action**. other than the abstract description.
2. **Situatedness**. The immediate environment offers : constraints, opportunities, and meaning.
3. **Interactionism**. Actor with environment - ongoing **interaction**.

Important precursors:
* Martin Heidegger (1927/1962), ([Heideggerian terminology](https://en.wikipedia.org/wiki/Heideggerian_terminology)) the distinction he drew between objects being:
  * **zuhanden ("ready-to-hand")**. an attitude like that of a scientist or theorist, of merely looking at or **observing** something. When a thing is revealed as present-at-hand, it stands apart from any useful set of equipment but soon loses this mode of being present-at-hand and becomes something, for example, that must be repaired or replaced.
  * **vorhanden ("present-at-hand")**. **involved** in the world in an ordinary, and more involved, way, undertaking tasks with a view to achieving something.
* James Gibson’s Ecological Psychology (Gibson 1979), emphasized the structure inherent in an organism’s environment and the importance of the organism/environment relation to a theory of perception.
  * affordances – the possibilities for action that an environment presents to an agent, relative to the capabilities of a particular organism.
* Social sciences. Lucy Suchman (1987), action must be understood as situated, in the sense that it is contingent upon the actual circumstances as they unfold. (not "action results from the execution of a plan") <n>动机 -> 后果</n>

More:
* Reactive architectures and internal representation are both important, and can fit together.
* The **Extended Mind** : (1) agent can change the environment; (2) agent cooperate; (3) distributed phenomenon in cognition.

## 6.2 Embodiment

Embodiment (many aspects of cognition are shaped by the body):
1. Physical embodiment. emphasizes physical interactions mediated by the body.
  * Maurice Merleau-Ponty (1962), argument that how we perceive an object is shaped by the kinds of interactions with it that our body allows.
  * Brooks (1991b), only physically instantiated AI systems will exhibit truly intelligent behavior.
2. Biological embodiment. organism's existence.
  * the specific characteristics of biological sensors, and the ways these sensory and motor capabilities are knitted together in human bodies fundamentally define our own particular mode of embodiment.
  * The organization of living systems is indispensable to their cognitive capabilities.
3. Conceptual embodiment. most abstract concepts are ultimately grounded in our bodily experiences and body-oriented metaphors.


## 6.3 Dynamics

Dynamics:
1. Dynamical systems theory (DST). describes how the state of some system evolves over time mathematically.
2. The dynamical framework.
3. The dynamical hypothesis.

Van Gelder (van Gelder 1995; 1998): (1) the nature hypothesis (Cognitive systems are dynamical systems) and (2) the knowledge hypothesis (only that cognitive systems are best understood using the tools of dynamical systems theory).


## 6.4 Toward an integrated perspective

An integrated theoretical framework that combines the insights from situatedness, embodiment, and dynamics.

1. Brains, bodies, and environments are dynamical systems.
2. Brain, body, and environment dynamics are coupled.
3. The agent is subject to viability constraints.
