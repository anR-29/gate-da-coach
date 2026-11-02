# Relational algebra and tuple calculus

## Core ideas
- Algebra uses **set** semantics: π and ∪ remove duplicate tuples.
- $\sigma_p(R)$ keeps rows where p is true; $\pi_L(R)$ keeps columns L and removes duplicates.
- Natural join: equal values on **all** common attributes; size = Σ over common values of (count in R)·(count in S).
- ∪, ∩, − need union-compatible schemas and compare **whole tuples**.
- Division $R(A,B) \div S(B)$: A values paired with **every** b in S. $= \pi_A(R) - \pi_A((\pi_A(R) \times S) - R)$. Empty S gives $\pi_A(R)$.
- Outer joins: left adds unmatched R tuples, full adds unmatched tuples of both, padded with NULL.
- TRC: $\{t \mid P(t)\}$. ∃ = at least one, ¬∃ = none, $\forall x (P \Rightarrow Q)$ = every x with P has Q.
- Safe query: the answer uses only values from the database; $\{t \mid \neg(t \in R)\}$ is unsafe.
- Safe TRC = safe DRC = relational algebra (no aggregation).

## Shortcuts
| Fact | Rule |
|---|---|
| $\sigma_{p \land q}$ | $\sigma_p(\sigma_q(R))$ |
| $\sigma_{p \lor q}$ | $\sigma_p(R) \cup \sigma_q(R)$ |
| $R \cap S$ | $R - (R - S)$ |
| π over ∪ | distributes; over − or ∩ it does not |
| $\lvert R \bowtie S\rvert$, B key of S | ≤ $\lvert R\rvert$ |
| $\lvert R \cup S\rvert$ | from $\max(\lvert R\rvert, \lvert S\rvert)$ to $\lvert R\rvert + \lvert S\rvert$ |

## Traps
1. Counting selected rows after π. Fix: π removes duplicates.
2. Reading ∨ as ∩ or AND. Fix: OR ↔ ∪, AND ↔ ∩.
3. Matching tuples on one attribute in ∩. Fix: all attributes must be equal.
4. Using σ-⋈-π for "every". Fix: "every" needs ÷ or ∀.
5. Writing ∀ with ∧. Fix: pair ∀ with ⇒ and ∃ with ∧.
6. Reading the two conditions of one σ as different joined rows. Fix: they test the same tuple.
7. Natural join on unexpected common columns (two tables both having `name`).
8. Forgetting strictness in theta joins (A < C vs A ≤ C).

## Recall
- Division = π_A(R) − π_A((π_A(R) × S) − R).
- R ÷ ∅ = π_A(R).
- σ_{p∨q} = σ_p ∪ σ_q; σ_{p∧q} = σ_p ∘ σ_q.
- R ∩ S = R − (R − S).
- Join size = Σ_v count_R(v)·count_S(v).
- Full outer = inner + unmatched R + unmatched S.
- "Every red part": ∀p (red(p) ⇒ supplies(t, p)).
- Unsafe: ¬(t ∈ R) without a positive binding.
