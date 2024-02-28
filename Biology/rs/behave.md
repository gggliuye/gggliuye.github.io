---
layout: page_tree_bio
title: 《Behave - The Biology of Humans at Our Best and Worst》
---

## 1. One second before

[Whole brain model](https://www.neuroanatomy.ca/3D/wholebrainPG.html), Three metaphorical layers.

<div align="center"> <pre class="mermaid">
  graph TD
  subgraph L3["layer 3 - cortex"]
    FC["Frontal lobe"]
    PL["Parietal lobe"]
    TL["Temporal lobe"]
    OL["Occipital lobe"]
  end
  subgraph L2["layer 2 - limbic system"]
    A["Amygdala
    Hippocampus
    Thalamus
    Basal ganglia
    Cingulate gyrus"]
    HYP["Hypothalamus"]
  end
  subgraph L1["layer 1 - autonomic nervous system"]
    SNS["SNS sympathetic nervous system
    - four Fs : fear, fight, flight, sex"]
    SNS --> norepinephrine & epinephrine
    PNS["PNS parasympathetic nervous system
    - calm vegetative states"]
    PNS --> acetylcholine
  end
  L3 <--quasi member--> L2
  HYP --influence--> L1
</pre> </div>

**Amygdala** (杏仁核): [lecture](https://nba.uth.tmc.edu/neuroscience/m/s4/chapter06.html), [wikipedia](https://en.wikipedia.org/wiki/Amygdala).
* function : (1) **fear and anxiety** -> generating aggression; (2) **implicit distrust and vigilance** -> social emotional decision making; etc.
* parts : (1) central amygdala : innate fears. (2) basolateral amygdala : learned fears. (frontal cortex helps stop false fear)


<div align="center"> <pre class="mermaid">
  graph LR
  SI["Sensors"] --> CR["Cortical regions"]
  CR --> A["Amygdala"]
  SI ==stronger but less accurate==> A
  PAG["Periaqueductal gray
  (ancient region helps
  process pyhsical pain)"] --"unpredictable context
  dependent pain"--> A
  A --> PAG
  IC["Insular cortex"] --"physics and moral
  disgust"--> A
  A --> IC
  FC["Frontal cortex"] <--> A
  H["Hippocampus"] <--fear learning--> A
  A --> M["Motor"]
  A --alarms--> BB["Brain and Body"]
  A --> LC["Locus coeruleus"]
</pre> </div>

**Frontal Cortex**: "do the harder thing when it's the right thing to do."
* [dlPFC & vmPFC](#l2.2). dlPFC and vmPFC can be *inversely correlated*, but mostly intertwined in a *collaborative relationship*.
* FPC is effected by limbic system (emotions), but thought could regulate emotion as well.
  * Antecedent strategies work better than response-focused strategies.
* "RIGHT" is used in neurobiological and instrumental sense, rather than a moral one.


**Dopamine System**:
* **Mesolimbic dopamine pathway**: the tegmentum sends projections to the accumbens and other limbic areas.\
  * sex, pleasurable aesthetics.
* **Mesocortical dopamine pathway**: the tegmentum projects to PFC.
* Social interactions.
* Habituation, the first time is the best.
* Anticipation - Learning.
  * Anticipation driven by reward.
  * Anticipation driven by uncertainty (in mesocortical pathway).
