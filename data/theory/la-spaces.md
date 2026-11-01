# Vector spaces, subspaces, basis and independence

## Core ideas
- A subset $W\subseteq V$ is a **subspace** iff $0\in W$ and $u+cv\in W$ for all $u,v\in W$, scalars $c$.
- Always subspaces: spans, null spaces $\{x: Ax=0\}$, column/row spaces, solution sets of homogeneous linear conditions.
- Never subspaces: affine sets $\{x: Ax=b\}$ with $b\neq0$ (no zero vector), sets defined by inequalities or products ($x_1\ge0$, $xy=0$).
- $v_1,\dots,v_k$ are **independent** iff $c_1v_1+\dots+c_kv_k=0$ forces all $c_i=0$ iff $\operatorname{rank}[v_1\cdots v_k]=k$.
- Square case: $n$ vectors in $\mathbb{R}^n$ are independent iff $\det[v_1\cdots v_n]\neq0$.
- A **basis** is an independent spanning set; every basis of $V$ has $\dim V$ vectors.
- $\dim\operatorname{span}\{v_i\}=$ number of pivots after row reduction.
- $\dim(W_1+W_2)=\dim W_1+\dim W_2-\dim(W_1\cap W_2)$.

## Shortcuts
| Situation | Shortcut |
|---|---|
| $k>n$ vectors in $\mathbb{R}^n$ | dependent, no work needed |
| Set contains $0$ | dependent |
| $n$ vectors in an $n$-dim space | independent $\iff$ spanning $\iff$ basis |
| Solution set of $m$ independent equations in $\mathbb{R}^n$ | dimension $n-m$ |
| $n\times n$ symmetric / skew / upper-triangular / trace-0 | $\tfrac{n(n+1)}2$ / $\tfrac{n(n-1)}2$ / $\tfrac{n(n+1)}2$ / $n^2-1$ |
| New vectors as combos of independent $v_i$ | independent iff coefficient matrix invertible |

## Traps
1. **Affine set taken as subspace.** "Defined by linear equations" is not enough; test $0$ first.
2. **Patching in zero.** $\{x:Ax=b\}\cup\{0\}$ is still not closed: $2x$ leaves the set.
3. **Pairwise non-parallel ⇒ independent.** False: $(1,0,0),(0,1,0),(1,1,0)$.
4. **Counting vectors as dimension.** Row reduce; a vector can be a combination (not just a multiple) of others.
5. **Stopping after one dependency.** After removing one dependent vector, check the rest again.
6. **Dimension of a solution set = number of equations.** It is $n$ minus the number of independent equations.

## Recall
- Subspace test: $0\in W$, closed under $u+cv$.
- $\{x: Ax=b\}$ is a subspace iff $b=0$.
- Independent $\iff$ rank $=$ number of vectors.
- More than $n$ vectors in $\mathbb{R}^n$ are dependent.
- $\dim\{x\in\mathbb{R}^n: Ax=0\}=n-\operatorname{rank}A$.
- $\dim(W_1\cap W_2)\ge\dim W_1+\dim W_2-n$.
- dim symmetric $n\times n=n(n+1)/2$; skew $=n(n-1)/2$.
