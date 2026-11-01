# Systems, Gaussian elimination, rank and nullity

## Core ideas
- **Rank** = number of pivots after row reduction = dim column space = dim row space; $\operatorname{rank}A=\operatorname{rank}A^T$.
- **Rank–nullity** for $m\times n$ $A$: $\operatorname{rank}A+\dim N(A)=n$ (columns). Also $\dim N(A^T)=m-\operatorname{rank}A$.
- $\operatorname{rank}(AB)\le\min(\operatorname{rank}A,\operatorname{rank}B)$; $\operatorname{rank}(A+B)\le\operatorname{rank}A+\operatorname{rank}B$; $\operatorname{rank}(A^TA)=\operatorname{rank}A$.
- $Ax=b$ is **consistent** iff $\operatorname{rank}A=\operatorname{rank}[A\,|\,b]$.
- If consistent: **unique** iff $\operatorname{rank}A=n$; otherwise infinitely many (free variables $=n-r$).
- General solution $=$ particular solution $+$ null space.
- $A^2=0$ (n×n) $\Rightarrow$ column space $\subseteq N(A)$ $\Rightarrow\operatorname{rank}A\le n/2$.

## Shortcuts
| Shape and rank of $A$ ($m\times n$, rank $r$) | Conclusion |
|---|---|
| $r=m$ (full row rank) | $Ax=b$ solvable for every $b$ |
| $r=n$ (full column rank) | at most one solution; $A^TA$ invertible |
| $r=m=n$ | exactly one solution for every $b$ |
| $n>m$ | $Ax=0$ has non-trivial solutions |
| RREF row $(0\cdots0\,|\,c)$, $c\ne0$ | inconsistent |
| Parameter $k$ in a square system | $\det=0$ only flags trouble; then compare ranks of $A$ and $[A|b]$ |

## Traps
1. **Counting non-zero rows before reducing.** Rank is the number of pivots after elimination.
2. **Stopping at the first dependent pair.** After $R_2=2R_1$, still test $R_4$ against $R_1,R_3$ (combinations, not just multiples).
3. **Dropping an independent row.** Remove only rows proven to be combinations of others.
4. **Near-miss rows.** $R_1+R_2=(3,7,4,1)$ vs $R_3=(3,7,4,2)$: check every entry.
5. **Nullity from rows.** Use $n$ (columns), not $m$.
6. **Singular ⇒ no solution.** Singular means *no or infinitely many*; check the right side.
7. **Right-side arithmetic.** Apply the same row operation to $b$ (sign of each term).

## Recall
- rank + nullity $=n$ (number of columns).
- $\dim N(A^T)=m-r$.
- Consistent iff $\operatorname{rank}A=\operatorname{rank}[A|b]$.
- Unique iff consistent and $r=n$.
- $r=m\Rightarrow$ solvable for all $b$; $r=n\Rightarrow$ at most one solution.
- $\operatorname{rank}(A^TA)=\operatorname{rank}A$.
- $A^2=0\Rightarrow\operatorname{rank}A\le n/2$.
