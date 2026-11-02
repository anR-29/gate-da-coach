# Hash tables

## Core ideas
- Load factor $\alpha = n/m$ (keys per slot).
- **Chaining**: each slot holds a list. α may exceed 1. Delete = remove from the list.
- Chaining, simple uniform hashing: unsuccessful search ≈ $\alpha$ comparisons; successful ≈ $1 + \alpha/2$. Worst case Θ(n) (all keys in one chain).
- **Open addressing**: every key in its own slot, so $\alpha \le 1$.
- Linear probing: $h(k, i) = (h(k) + i) \bmod m$. Primary clustering: runs grow.
- Quadratic probing: $h(k, i) = (h(k) + i^2) \bmod m$. Secondary clustering (same home → same sequence). Prime m and $\alpha \le 1/2$ guarantee an empty slot.
- Search in open addressing stops at a match or the first **empty** slot. Delete with a "deleted" marker (tombstone); emptying the slot breaks later searches.
- Uniform-hashing estimates for open addressing: unsuccessful ≈ $\frac{1}{1-\alpha}$, successful ≈ $\frac{1}{\alpha}\ln\frac{1}{1-\alpha}$.

## Shortcuts
| Quantity from a given table | How to count |
|---|---|
| Successful average (chaining) | k-th key in a chain costs k; average over the n keys |
| Unsuccessful average (chaining) | chain length per slot; average over all m slots (empty = 0) |
| Successful average (probing) | probes used when each key was inserted; average over n |
| Unsuccessful average (probing) | from each home slot, count up to and including the first empty slot; average over m |

## Traps
1. Successful vs unsuccessful averages swapped. Fix: successful averages over keys, unsuccessful over slots.
2. Averaging only over non-empty slots.
3. Forgetting mod m (no wrap-around) in probing.
4. Using i instead of $i^2$ for quadratic probing.
5. Counting only collisions when "probes" include the final slot (read the stem's convention).
6. Emptying a slot on delete in open addressing.
7. Writing α = m/n, or claiming α ≤ 1 for chaining.
8. Treating expected O(1) as worst-case O(1).

## Recall
- α = n/m; chaining allows α > 1, open addressing α ≤ 1.
- Chaining: unsuccessful α, successful ≈ 1 + α/2.
- Linear: (h + i) mod m; quadratic: (h + i²) mod m.
- Linear → primary clustering; quadratic → secondary clustering.
- Open-addressing delete needs a tombstone.
- Unsuccessful probe count includes the empty slot reached.
