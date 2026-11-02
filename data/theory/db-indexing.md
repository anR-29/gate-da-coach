# File organization and indexing

## Core ideas
- Blocking factor $bfr = \lfloor B / R \rfloor$ (unspanned); data blocks $= \lceil r / bfr \rceil$.
- Binary search on a sorted file of b blocks: $\lceil \log_2 b \rceil$ block accesses.
- Primary index: on the ordering key; **sparse**, one entry per data block.
- Clustering index: on an ordering non-key field; one entry per distinct value.
- Secondary index: any non-ordering field; **dense**, one entry per record. A file has at most one primary/clustering index but many secondary ones.
- Multilevel index: divide entries by the index bfr level by level until one block; search = levels + 1 data access.
- B+ tree internal node of order p: $p \cdot P + (p-1) \cdot K \le B$. Leaf: $n(K + P_r) + P_{next} \le B$.
- B-tree node also stores a data pointer per key: $p \cdot P + (p-1)(K + P_r) \le B$.
- B+ tree: data pointers only in linked leaves → higher fanout, good for ranges. Hash: equality only.

## Shortcuts
| Quantity | Formula |
|---|---|
| Max keys, h levels, fanout p, leaf cap. m | $p^{h-1} \cdot m$ |
| Min keys, h levels | $2 \cdot \lceil p/2 \rceil^{h-2} \cdot \lceil m/2 \rceil$ |
| Sparse index entries | data blocks |
| Dense index entries | records |
| Min levels for N keys | leaves = ⌈N/m⌉, then divide by p until 1 |

## Traps
1. Using p keys with p pointers. Fix: p − 1 keys.
2. Forgetting the next-leaf pointer in a leaf.
3. Floor where a ceiling is needed (blocks, levels, log₂).
4. Dense vs sparse: entries per record vs per block.
5. Forgetting the final data-block access.
6. Giving the root the same minimum fill as other nodes (root needs only 2 children).
7. Using the B-tree count $p^h - 1$ for a B+ tree.
8. Expecting a hash index to help a range query.

## Recall
- bfr = ⌊B/R⌋; blocks = ⌈r/bfr⌉.
- Internal B+: p·P + (p−1)·K ≤ B.
- Leaf B+: n(K + P_r) + P_next ≤ B.
- Accesses via multilevel index = levels + 1.
- Binary search: ⌈log₂ b⌉.
- Secondary index is dense; primary is sparse.
- Clustering index entries = distinct values.
