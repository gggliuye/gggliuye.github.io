---
layout: page_tree_math
title: NARS (Non-Axiomatic Reasoning System)
---

Links:
* [Open-NARS](https://www.opennars.org//)
* [github](https://github.com/opennars/opennars)
* [NARS workshop 2023](https://cis.temple.edu/tagit/events/workshop2023/workshop2023/)
* [A General Theory of Intelligence](https://cis.temple.edu/~pwang/GTI-book/)
* [Non-Axiomatic Logic A Model of Intelligent Reasoning 2013](https://www.worldscientific.com/worldscibooks/10.1142/8665#t=aboutBook)

Major Design Decisions:

* Belief : "the essence of intelligence is the principle of adapting to the environment while working with **insufficient** knowledge and resources".
* A [unified approach](https://cis.temple.edu/~pwang/AGI-Intro.html), that is, the system depends on a single core technique to carry out various cognitive functions and to solve various problems.

<div align="center">  
  <pre class="mermaid">
        graph LR
        A["Reasoning System"] --> B["Logic Part"]
        A --> C["Control Part"]
        B --> D["formal language for knowledge representation"]
        B --> E["semantic theory of the language"]
        B --> F["set of inference rules"]
        C --> G["memory structure"]
        C --> H["control mechanism"]
  </pre>
</div>

* Non-Axiomatic: the system's beliefs are summaries of the system's experience, and are always revisable.
  * a "term" names a "concept" that represents a recurring pattern in the system's experience.
  * a "statement" represents the substitutability of one term to another.


*Non-Axiomatic Logic*, defined on a formal language *Narsese*.
* the simplest non-axiomatic logic in the framework of term logic:
  * [NAL-1:] Inference on atomic terms and inheritance statements, where a statement may have both positive and negative evidence, and the impact of future evidence also needs to be considered. The rules include deduction, abduction, induction, revision, choice, etc.
* ideas from set theory to specify compound terms:
  * [NAL-2:] Variants of the inheritance copula are introduced, including similarity, instance, and property. New inference rules include comparison, analogy, and resemblance. Also, a term can represent a set defined by its sole instance or property.
  * [NAL-3:] Compound terms can be derived by taking intersection, union, or difference of the extension (instances) or intension (properties) of the existing terms. Inference rules composite new terms, according to the patterns in the experience of the system.
  * [NAL-4:] Using term operators product and image, NAL is extended to cover arbitrary relations among terms that cannot be directly taken as copulas. The meaning of such a relation is determined by the system's experience, rather than fixed and built-in.
* propositional logic :
  * [NAL-5:] When a statement is taken as a term, NAL can express statement on statement, as well as carry out inference on such "higher-order statements". Two higher-order copulas, implication and equivalence, are added into the logic to express derivation relations among statements.
* predicate logic:
  * [NAL-6:] Variable terms can be used as symbols for other terms. In inference rules, variable terms can be introduced, unified, or eliminated (i.e., instantiated). With variable terms, the system can carry out hypothetical inference on abstract symbols, so as to serve as a meta-logic of an arbitrary reasoning system.
* from logic programming to extend the reasoning framework to procedural knowledge and sensorimotor mechanism:
  * [NAL-7:] An event is a statement with temporal attribute, specified with respect to another event. In temporal inference, both the logical information and the temporal information in the premises are processed to derive a prediction or explanation.
  * [NAL-8:] An operation is an event that can be directly realized by the system, via the execution of some programs in the host system. A goal is an event the system desires to realize. With procedural inference, the system attempts to use the operations to realize the goals.
  * [NAL-9:] When the operations involved in procedural inference are the internal operations of NARS, a self-referential loop is formed that gives the system the ability of self-awareness and self-control. Other related topics include emotion and consciousness.

Control and Implementation:
* Task (new tasks at any moment), belief (summarized from previous experience), and concept (clustered by tasks and beliefs).
* Dynamic resource allocation : case-by-case manner.
* Computer implementation
