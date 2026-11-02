# Searching and asymptotic complexity

## Core ideas
- Linear search, n items: successful average $\frac{n+1}{2}$ (uniform position), unsuccessful n. Works on any order and on linked lists.
- Binary search needs **sorted** data with O(1) indexing. With `mid = (lo + hi) // 2` and `while lo <= hi`, worst case $\lfloor \log_2 n \rfloor + 1$ probes.
- For $n = 2^k - 1$ the probes form a perfect tree: $2^{j-1}$ keys are found with exactly j comparisons.
- On an unsorted array binary search can miss a present key; on a linked list it costs Θ(n) time.
- Loop counting: write the inner count as a function of the outer variable and sum. $\sum i = \frac{n(n+1)}{2}$; nested k < j < i gives $\binom{n}{3}$.
- Doubling/dividing a variable → log iterations; $1 + 2 + 4 + \dots + 2^k < 2^{k+1}$ (geometric, Θ(largest term)).
- $\sum_{i=1}^n n/i = n H_n = \Theta(n \log n)$; $\log n! = \Theta(n \log n)$.
- Growth ladder: $1 < \log\log n < \log n < (\log n)^k < n^{\varepsilon} < n < n\log n < n^{1+\varepsilon} < n^k < c^n < n! < n^n$.
- $f = O(g)$: some c, $n_0$ with $f(n) \le c\,g(n)$ for all $n \ge n_0$. Θ needs both O and Ω.

## Shortcuts
| Pattern | Order |
|---|---|
| `i *= 2` outer, inner `range(n)` | n log n |
| `i *= 2` outer, inner `range(i)` | n |
| `for i`, inner doubles j from i to n | n |
| three nested strictly decreasing ranges | n³/6 |
| $a^{\log_b n}$ | $n^{\log_b a}$ |

## Traps
1. $\lfloor \log_2 n \rfloor$ without the +1, or a ceiling where a floor belongs.
2. Midpoint rounding: `//` rounds down.
3. Successful vs unsuccessful linear-search averages; mixing them by probability.
4. Judging growth from small n ($(\log n)^{10}$ vs $\sqrt n$).
5. $2^{2n}$ is not $O(2^n)$; $2^{n+1}$ is.
6. Nested loops are not automatically n²: check how the variables move.
7. Off-by-one in `range` bounds and `<` vs `<=`.
8. Calling f = Θ(g) when the bound fails on a subsequence (e.g. odd n).

## Recall
- Binary search worst case: ⌊log₂ n⌋ + 1 comparisons.
- Linear search: (n + 1)/2 successful, n unsuccessful.
- Binary search needs sorted, random-access data.
- $\sum_{i=1}^{n} i = n(n+1)/2$; $\sum n/i = \Theta(n\log n)$.
- $a^{\log_b n} = n^{\log_b a}$.
- polylog < $n^{\varepsilon}$ < n log n < $n^{1+\varepsilon}$ < $c^n$.
- Constants in exponents matter; additive constants in exponents do not.
