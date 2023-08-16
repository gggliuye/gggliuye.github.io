---
layout: page_tree_math
title: 10. Implementation
---

[Back To ADMM Home](../00index).

$$
  \begin{align*}
  & minimize\quad  \sum_{i=1}^{N}f_{i}(x_{i}) + g(z) \\
  & subject \ to \quad x_{i}-z = 0
  \end{align*}
$$

## 10.1 Abstract Implementation

$$
  \begin{align*}
  u_{i} &:= u_{i} + x_{i} - z \\
  x_{i} &:= \arg\min(f_{i}(x_{i}) + (\rho/2)\|x_{i}-z+u_{i}\|_{2}^{2}) \\
  z &:= \mathbf{prox}_{g, N\rho}(\bar{x} + \bar{u})
  \end{align*}
$$

* Mutable states.
* Local comutation.
* Global aggregation.
* Synchronization.

## 10.2 MPI


<div align="center">    
<img src="../images/admm_mpi.PNG" width="60%"/>
</div>


## 10.3 Graph Computing Frameworks


## 10.4 MapReduce

[wiki MapReduce](https://en.wikipedia.org/wiki/MapReduce)

A MapReduce framework (or system) is usually composed of three operations (or steps):

* Map: each worker node applies the map function to the local data, and writes the output to a temporary storage. A master node ensures that only one copy of the redundant input data is processed.
* Shuffle: worker nodes redistribute data based on the output keys (produced by the map function), such that all data belonging to one key is located on the same worker node.
* Reduce: worker nodes now process each group of output data, per key, in parallel.

<div align="center">    
<img src="../images/admm_mapreduce.PNG" width="60%"/>
</div>


But MapReduce tasks are not designed to be iterative and do not preserve state in the Mappers across iterations,
so the implementation requires some understanding of the underlying infrastructure.

[Back To ADMM Home](../00index).
