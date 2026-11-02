# Sorting and divide and conquer

## Core ideas
- **Selection:** pass i swaps the minimum of `a[i:]` into slot i. Always $n(n-1)/2$ comparisons and $n-1$ swap statements (some are self-swaps). Unstable.
- **Insertion:** pass i inserts `a[i]` into the sorted prefix. Shifts = inversions; time $\Theta(n + I)$. Stable with strict `>`.
- **Bubble:** pass p sweeps left to right and parks the p-th largest at the end. Swaps = inversions. Large items rise in one pass; small items sink one slot per pass.
- **Inversion:** a pair $i<j$ with $a_i > a_j$. Reversed array: $n(n-1)/2$.
- **Merge:** runs of size m, n cost between $\min(m,n)$ and $m+n-1$ comparisons. Merge sort is $\Theta(n\log n)$ on every input, $\Theta(n)$ extra space, stable if ties go left.
- **Lomuto partition** (pivot `a[hi]`): `i = lo-1`; for each `a[j] <= pivot`: `i += 1`, swap `a[i], a[j]` (self-swap when `i == j`); finally swap `a[i+1], a[hi]`. A call on k items makes $k-1$ comparisons.
- **Quicksort:** best/average $\Theta(n\log n)$; sorted, reversed or all-equal input with an end pivot gives $T(n)=T(n-1)+\Theta(n)=\Theta(n^2)$. Any constant-ratio split stays $\Theta(n\log n)$.
- **Master theorem** $T(n)=aT(n/b)+f(n)$: compare $f$ with $n^{\log_b a}$. Smaller: $\Theta(n^{\log_b a})$. Equal: $\Theta(n^{\log_b a}\log n)$. Larger (regular): $\Theta(f(n))$.

## Shortcuts
| Algorithm | Best | Worst | Stable | Swaps |
|---|---|---|---|---|
| Selection | $n^2$ | $n^2$ | No | $\le n-1$ real |
| Insertion | $n$ | $n^2$ | Yes | shifts = inversions |
| Bubble (flag) | $n$ | $n^2$ | Yes | = inversions |
| Merge | $n\log n$ | $n\log n$ | Yes | n/a |
| Quick (end pivot) | $n\log n$ | $n^2$ | No | depends |

| Recurrence | Solution |
|---|---|
| $2T(n/2)+n$ | $n\log n$ |
| $T(n-1)+n$ | $n^2$ |
| $T(n/2)+1$ | $\log n$ |
| $2T(n/2)+1$ | $n$ |
| $T(\sqrt n)+1$ | $\log\log n$ |

## Traps
1. Not counting a selection pass whose minimum is already in place. Fix: every outer iteration is a pass; the swap line still runs.
2. Counting comparisons as swaps. Fix: swaps = inversions; comparisons follow the loop bounds.
3. Forgetting the last no-swap pass of early-exit bubble sort. Fix: the flag stops the loop only after a clean pass (unless the loop limit ends it first).
4. Adding a failing comparison for every insertion pass. Fix: a key that reaches index 0 stops on `j >= 0`.
5. Using $m+n-1$ for every merge. Fix: stop counting when one run empties.
6. Leaving out self-swaps or the final pivot swap in Lomuto when the convention counts them.
7. Assuming merge sort is $\Theta(n)$ on sorted input. Fix: copying is $\Theta(n)$ per level.
8. Using $a/b$ instead of $\log_b a$ in the master theorem, or missing the extra log in the tie case.

## Recall
- Bubble swaps = insertion shifts = number of inversions.
- Selection: $n(n-1)/2$ comparisons on every input; unstable.
- Merge of m and n items: at most $m+n-1$ comparisons.
- Merge sort worst comparisons for $n=2^k$: $n\log_2 n - n + 1$.
- Lomuto partition of k items: $k-1$ comparisons.
- Quicksort worst: $T(n)=T(n-1)+\Theta(n)=\Theta(n^2)$.
- $aT(n/b)+f(n)$: compare $f(n)$ with $n^{\log_b a}$.
- Strassen-type $7T(n/2)+n^2 = \Theta(n^{\log_2 7})$.
