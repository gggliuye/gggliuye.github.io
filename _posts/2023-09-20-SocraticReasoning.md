---
layout: post
title: Socratic Reasoning in Large Language Model
tags: [Philosophy, Math, AI]
comments: true
---

[Large Language Model for Science: A Study on P vs. NP](https://arxiv.org/pdf/2309.05689.pdf), [LLM4Science](https://github.com/microsoft/LMOps/tree/main/LLM4Science). ([GPT-4在97轮对话中探索世界难题，给出P≠NP结论](https://mp.weixin.qq.com/s/BTePI71LOq7kwjMwzdtypw)).
LLMs have successfully interpolated existing knowledge, it remains open **whether they can extrapolate novel knowledge from the vast solution space.**

Problem-solving patterns in **Socratic Reason**:

| Patterns | Decription |
|----------|------------|
| Deduction | Derive a conclusion for a given problem directly.|
| Transformation | Transform the problem into a homogeneous or similar problem, or abstract the problem. |
| Decomposition | Break the problem into manageable subproblems, or make a plan for reasoning steps. |
| Verification | Check the conclusion or its relationship with others to verify or correct it. |
| Integration | Summarize multiple conclusions to derive a new conclusion. |

[P & NP](https://en.wikipedia.org/wiki/P_versus_NP_problem):

* "P" or "class P": The general class of questions for which some algorithm can **provide** an answer in polynomial time.
* "NP", "nondeterministic polynomial time": The class of questions for which an answer can be **verified** in polynomial time.
* "NP-complete problems": a set of problems to each of which any other NP problem can be reduced in polynomial time and whose solution may still be verified in polynomial time.
* "NP-hard problems": at least as hard as NP problems.



## Proof by contradiction (of P!=NP)

framework:

1. From a well known NP-complete problem : [Boolean Satisfiability Problem](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem)
  * Def: whether the variables of a given Boolean formula can be consistently replaced by the values TRUE or FALSE in such a way that the formula evaluates to TRUE. If this is the case, the formula is called satisfiable.
2. **Reduce** (convert) the problem through a polynomial-time reduction.
  * into [Constraint Satisfaction Problems](https://en.wikipedia.org/wiki/Constraint_satisfaction_problem) (~ find feasible set), by converting variables into boolean, and converting constraints to conjunctions & disjunctions.
3. Attempt to prove the new problem cannot be solved in polynomial time.
  * Study **Phase Transitions** (the difficulty of solving the problem rapidly changes from easy to hard as some *parameter varies*) to show the existence of hard instances. Identify the phase transition point.
  * Construct instances with strong symmetries, near the phase transition point.
  * Proof by contradiction, the hard instance cannot be solved in polynomial time.

Construct the (CSP) problem using **Model RB** with constraint symmetry requirement. (<n>less percise by easier to understand</n>)

* n variables $${x_{1}, x_{2}, ..., x_{n}}$$ with same domain size.
* m constrains randomly generated $$C_{i} = (X_{i}, R_{i})$$, $$X_{i} = {x_{i1}, x_{i2}, ..., x_{ik}}$$ and $$R_{i}$$ being the permitted set.
  * define isomorphic relation $$R^{*}$$, ensure symmetry by including all permutations (e.g. (a, b, c), (b, c, a), ...).
  * generate random permitted set $$R_{i}$$, using bijection apply to $$R^{*}$$. (to increase complexity)
