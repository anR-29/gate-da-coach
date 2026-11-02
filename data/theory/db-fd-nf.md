# Functional dependencies and normal forms

## Core ideas
- $X^+$: start with X; fire every FD whose **whole** LHS is in the set; repeat until nothing changes.
- $X \to Y$ follows from F iff $Y \subseteq X^+$. X is a superkey iff $X^+$ = all attributes.
- Armstrong: reflexivity, augmentation, transitivity. Derived: union, decomposition (of the RHS), pseudo-transitivity. The LHS cannot be split.
- Keys: attributes on no RHS are in every key. Grow from them, test closures, keep minimal sets, and **keep searching** after the first key.
- Prime attribute: belongs to some candidate key.
- 2NF: no non-prime attribute depends on a proper subset of a key.
- 3NF: for every nontrivial $X \to A$: X superkey **or** A prime. BCNF: X superkey.
- Minimal cover: single-attribute RHS → remove extraneous LHS attributes → remove redundant FDs.
- Binary decomposition is lossless iff $(R_1 \cap R_2) \to R_1$ or $(R_1 \cap R_2) \to R_2$.
- Dependency preserving: every FD follows from the FDs projected onto the parts (no join needed to check it).

## Shortcuts
| Situation | Conclusion |
|---|---|
| Two-attribute relation | always BCNF |
| All attributes prime | at least 3NF |
| Two cycles of sizes m and n | m·n keys |
| Key is a single attribute | no partial dependency (2NF) |
| 3NF synthesis | lossless + preserving |
| BCNF decomposition | lossless, may lose FDs |

## Traps
1. Firing CD → E with only C in the set. Fix: the whole LHS must be present.
2. Stopping at the first candidate key. Fix: try swapping in attributes that reach the key's members.
3. Reading a chain backwards (A → B → D gives nothing from D).
4. Calling a transitive FD (C → D, C outside the key) a partial one.
5. Forgetting a second key that makes an attribute prime (3NF vs BCNF).
6. Missing a partial dependency like C → E with C inside key AC.
7. Claiming {AB, CD} is lossless: no common attribute means a Cartesian product.
8. Assuming lossless implies preserving, or the reverse; they are independent.

## Recall
- Y ⊆ X⁺ ⇔ X → Y.
- Never-on-RHS attributes are in every key.
- BCNF: LHS superkey. 3NF: LHS superkey or RHS prime.
- 2NF: no partial dependency of a non-prime attribute.
- Lossless binary: common attributes are a key of one side.
- Preservation test: Z = X; repeat Z ∪= (closure(Z ∩ Ri) ∩ Ri).
- R(A,B,C), AB → C, C → B: 3NF, not BCNF, no preserving BCNF split.
- BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF.
