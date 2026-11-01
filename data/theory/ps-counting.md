# Counting and event models

## Core ideas
- Build the sample space first; probabilities by counting need **equally likely** outcomes.
- Dice and coins are distinguishable: two dice give $36$ ordered pairs, three coins give $2^3=8$.
- Union: $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.
- Three sets: $|A\cup B\cup C|=\sum|A|-\sum|A\cap B|+|A\cap B\cap C|$.
- Without replacement, use **one route**: sequential fractions $\frac{5}{8}\cdot\frac{4}{7}$ (ordered) **or** $\binom{K}{k}/\binom{N}{n}$ (unordered).
- Hypergeometric: $P(X=k)=\dfrac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}$, mean $nK/N$.
- "At least one": $1-P(\text{none})$.

## Shortcuts
| Situation | Use |
|---|---|
| "or", overlap given | inclusion–exclusion |
| "divisible by $a$ or $b$" | overlap = multiples of $\text{lcm}(a,b)$ |
| draws without replacement, exact count | hypergeometric |
| "at least one" | complement of "none" |
| max of two dice $=k$ | $(k^2-(k-1)^2)/36$ |
| smallest $n$ with $1-q^n\ge c$ | $n=\lceil \ln(1-c)/\ln q\rceil$ |

## Traps
1. **Missed overlap**: adding $|A|+|B|$ counts $A\cap B$ twice. Fix: always subtract the intersection once.
2. **Subtracting the overlap twice** gives "exactly one", not "at least one".
3. **Mixed routes**: ordered numerator over $\binom{N}{n}$ (or the reverse). Fix: ordered/ordered or unordered/unordered.
4. **Unordered dice outcomes**: {1,6} is two outcomes, (1,6) and (6,1). Sums 2–12 are *not* equally likely.
5. **$\binom{n}{2}$ arithmetic**: $\binom{7}{2}=\frac{7\cdot6}{2}=21$, not 42.
6. **Binomial used for no-replacement draws**: $p$ changes after each draw, so use hypergeometric.
7. **Product instead of lcm**: overlap of "divisible by 4" and "by 6" is multiples of 12, not 24.
8. **Rounding $n$ down** in "at least one" problems: always round up.

## Recall
- $P(A\cup B)=P(A)+P(B)-P(A\cap B)$
- $|A\cup B\cup C|=\sum|A|-\sum|A\cap B|+|A\cap B\cap C|$
- $\binom{n}{2}=n(n-1)/2$; $\binom{n}{3}=n(n-1)(n-2)/6$
- Hypergeometric: $\binom{K}{k}\binom{N-K}{n-k}/\binom{N}{n}$
- $P(\ge1)=1-P(0)$; independent trials: $1-(1-p)^n$
- Two dice: 36 ordered outcomes; $P(\text{sum}=7)=6/36$
- Without replacement: $\frac{a}{N}\cdot\frac{a-1}{N-1}=\binom{a}{2}/\binom{N}{2}$
