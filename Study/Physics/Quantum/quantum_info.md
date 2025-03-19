---
layout: page_coursera
title: Introduction to Quantum Information
---

[Physics Home](../../index)

[Introduction to Quantum Information](https://www.coursera.org/learn/introduction-to-quantum-information/home/module/1), [Certification link](https://www.coursera.org/account/accomplishments/verify/).

1. [Quantum Theory & Qubit](#l1)
2. [Bipartite quantum systems](#l2)
3. [Quantum computing](#l3)
4. [](#l4)


<a name="l1"></a>
# 1. Quantum Theory & Qubit
<p></p>

* State (
$$
|\psi \rangle \in \mathcal{H}
$$
)
* Dynamics ($$U^{+}U = UU^{+} = I$$)
* Measurement (
$$
P(i) = \langle \psi | M_{i} | \psi\rangle
$$
)
* Obserable ($$A = A^{+}$$).

## 1.1 Qubit State
<p></p>


* **Qubit state** (of 2 level system):
$
| \psi (\theta, \phi) \rangle = \cos \frac{\theta}{2} |0\rangle + e^{i\phi}\sin \frac{\theta}{2} |1\rangle
$
* Pauli matrices & Hadamard transformation (both unitary and hermitian)
  * Pauli X(Not gate) Y Z.
  $$
  X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \quad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
  $$
  * Hadamard :
  $
  H |0\rangle = | + \rangle
  $ and
  $
  H |1\rangle = | - \rangle
  $
* Phase operation $$\begin{bmatrix} 1 & 0 \\  0 & e^{i \alpha} \end{bmatrix}$$

Mixed state :
* Pure state
$$
\rho = |\psi\rangle \langle \psi |
$$
  * where $tr(\rho^{2}) = 1$
* Mixed state (a combination of pure states) :
$$
\sum_{i = 0}^{n}q_{i}|\psi_{i}\rangle \langle \psi_{i} |
$$
  * where $tr(\rho^{2}) < 1$
* probability :
$$
P(i) = tr[M_{i}\rho]
$$

## 1.2 Bloch Sphere

$$
\begin{align}
\rho(\theta, \phi) & = |\psi(\theta, \phi)\rangle \langle(\theta, \phi) \psi |  \\
  & = \begin{bmatrix} \cos^{2} \frac{\theta}{2} & e^{i\phi}\sin \frac{\theta}{2}\cos \frac{\theta}{2} \\ e^{-i\phi}\sin \frac{\theta}{2}\cos \frac{\theta}{2} & \sin^{2} \frac{\theta}{2} \end{bmatrix} \\
  & = \frac{1}{2} (I + \hat{n} \vec{\sigma})
\end{align}
$$

where n is the **bloch vector** (which lies in the **bloch sphere**).
(to understand the sphere better, consider different cases of $\theta$ and $\phi$)
Any point in the bloch sphere <==> a qubit state.

<div align="center">    
<img src="https://www.researchgate.net/publication/316828699/figure/fig3/AS:669404337565697@1536609839396/color-online-Bloch-sphere-representation-of-the-Bloch-vector-v-for-qubits-d-2-All.png" width="60%"/>
</div>


$$
\begin{align}
\hat{n} \vec{\sigma} & = \begin{bmatrix} n_{x} & n_{y} & n_{z} \end{bmatrix}  \begin{bmatrix} X & Y & Z\end{bmatrix} \\
& = n_{x}X + n_{y}Y + n_{z}Z \\
& = (\sin\theta\cos\phi)X + (\sin\theta\sin\phi)Y + (\cos\theta)Z
\end{align}
$$

Mixture of states:

$$
\begin{align}
\rho &= q_{0}\rho_{0} + q_{1}\rho_{1} \\
& = \frac{1}{2} (I + (q_{0}\hat{n}_{0} + q_{1}\hat{n}_{1} ) \vec{\sigma})
\end{align}
$$

$$
tr(\rho^{2}) < 1
$$

## 1.3 Qubit Dynamics

$$
e^{ixA} = \sum_{n=0}^{\inf} \frac{1}{n!}(ixA)^{n}  = (\cos x) I + i(\sin x)A
$$

Single-Qubit Dynamics : qubit transformation. (Rotation in the bloch sphere)
Each transformation of qubit state, can be mapped to a combination of rotation operations.

$$
\begin{align}
& R_{x}(\theta) = exp[-i\frac{\theta}{2}X] \\
& R_{Y}(\theta) = exp[-i\frac{\theta}{2}Y] \\
& R_{Z}(\theta) = exp[-i\frac{\theta}{2}Z]
\end{align}
$$

## 1.4 Quantum state discrimination

(1) **Discrimination**: If the states are not orthogonal, perfect discrimination is impossible. Instead, the aim is to **minimize error** or **maximize success probability** in identifying the prepared state. (still possible to have wrong result)

$$
\begin{align}
P_{success} & = max_{M_{0}, M_{1}}(q_{0} \langle \psi_{0} | M_{0} | \psi_{0} \rangle  + q_{1} \langle \psi{1} |M_{1} |\psi_{1}\rangle ) \\
& = \frac{1}{2} + \frac{1}{2} \| q_{0}  |\psi_{0}\rangle   \langle \psi_{0} |  -q_{1} |\psi_{1}\rangle  \langle \psi_{1} | \|
\end{align}
$$

Measurement Strategy: Two detectors are used to conclude the state based on detection events. The optimal measurement is defined by the relationship between the two states, often represented geometrically.

(2) **Unambiguous Discrimination**: This method introduces a <u>third detector</u> to eliminate ambiguity, ensuring that if a state is detected, the conclusion is always correct (for $M_{0}$ and $M_{1}$), although it may result in inconclusive outcomes (from $M_{2}$).

## 1.5 No-go theorems
<p></p>

1. Non-orthogonal quantum states cannot be perfectly discriminated.
2. Cloning of unknown quantum states is not possible.
  * **Perfect Discrimination <==> Perfect Cloning**

<a name="l2"></a>
# 2. Bipartite quantum systems

## 2.1 Two-qubit entanglement

Two qubits forming a composite Hilbert space spanned by the basis states |00⟩, |01⟩, |10⟩, and |11⟩.
A two-qubit state can be expressed as <u>a linear combination</u> of these basis states, with complex coefficients that must be normalized.

$$
\begin{align}
| \psi \rangle_{AB} &\in \mathcal{H}_{A} \otimes \mathcal{H}_{B} \\
&= span \{|00\rangle, |01\rangle, |10\rangle, |11\rangle \} \\
&= \alpha |00\rangle + \beta |01\rangle + \gamma |10\rangle + \delta |11\rangle, where \| |\psi \rangle \| = 1 \\
\end{align}
$$

**LOCC (Local Operations and Classical Communication)**: This framework allows two parties (Alice and Bob) to perform local operations and communicate classically to prepare quantum states.

<div align="center"><pre class="mermaid">
graph LR
subgraph A["qubit A
Local Operation"]
end
subgraph B["qubit B
Local Operation"]
end
A <--"Classical Communication"--> B
</pre></div>

- Product states (which can be expressed as a product of individual qubit states).
$$
|\Psi \rangle_{AB} = |\psi \rangle_{A} \otimes | \psi'\rangle_{B}
$$

$$
\begin{align}
|\Psi \rangle_{AB} \approx_{L.U}
|\Psi'' \rangle_{AB} & = |\phi \rangle_{A} \otimes | \phi'\rangle_{B} \\
& = (U_{A}|\psi \rangle_{A}) \otimes (U_{B}| \psi'\rangle_{B}) \\
& = U_{A} \otimes U_{B} |\Psi \rangle_{AB}
\end{align}
$$

- Entangled states (which cannot be expressed as a product of individual qubit states)

**Schmidt Decomposition**: This method is introduced as a way to determine if a two-qubit state is entangled. It simplifies the state into a form that reveals the entanglement properties through Schmidt coefficients.

$$
\begin{align}
|\psi \rangle & = \sum_{ij}C_{ij}|i\rangle |j\rangle \\
& C_{ij} =_{SVD} (UDV^{+})_{ij} \\
&= \sum_{k}\lambda_{k} (\sum_{i} U_{ik}|i\rangle) \otimes (\sum_{j} V_{jk}^{*}|j\rangle) \\
& =   \sum_{k}\lambda_{k} |u_{k}\rangle \otimes |v_{k}\rangle
\end{align}
$$

## 2.2 Two-qubit

**Universality**: Any quantum circuit can be constructed using a combination of single qubit operations and two-qubit gates. This property allows for arbitrary transformations of quantum states.

**Controlled Gates**: The lecture explains the concept of controlled gates, such as the **CNOT (Controlled NOT-X) gate**, **CPhase (Controlled Phase-Z) gate**. <u>The action on the second qubit depends on the state of the first qubit.</u>

$$
|0\rangle \langle 0| \otimes I + |1\rangle \langle 1| \otimes U
$$

$$
|\phi^{+}\rangle = \frac{1}{\sqrt 2}(|00\rangle + |11\rangle) =U_{CNOT}(H\otimes I) |00\rangle
$$

**Entanglement**: The lecture emphasizes the importance of entanglement in generating complex quantum states, which can be achieved through direct interactions between qubits or by using intermediate particles.

**Two qubit measurement** : joint measurement, can be formed with individual measurements.

Example for $$M_{\phi^{+}} = | \phi^{+} \rangle \langle \phi^{+} |$$:

$$
\begin{align}
Prob(\phi^{+}) &= tr[\rho M_{\phi^{+}}] \\
&= tr[(H\otimes I )U^{+} \rho U (H\otimes)I |00\rangle \langle 00 | ]
\end{align}
$$

## 2.3 Quantum teleportation

Quantum Teleportation: It allows the transfer of quantum states without physically moving the particles.

**One-Time Pad**: A classical method where two parties share a secret bit (SA and SB) to securely transmit a message (M).
The classical one-time pad can be translated into a quantum context, using quantum states and operations.

<a name="l3"></a>
# 3. Quantum computing

**Computation** is the transformation of input into a meaningful output that solves a problem, utilizing finite resources (time, steps, or space).
- Classical computing uses logic gates (like NAND and OR) to process bits.
- Quantum computing transforms classical bits into **qubits**, allowing for more complex operations.
- Two main quantum algorithms are discussed:
  - **Grover's Algorithm**: Optimizes database searching, achieving a quadratic speedup by amplifying the probability of finding a target state.
  - **Shor's Algorithm**: Focuses on prime number factorization, combining quantum and classical processes, with the quantum Fourier transformation being a key component.
  
<a name="l4"></a>
# 4.
