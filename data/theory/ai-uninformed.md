# Uninformed search: BFS, DFS, UCS, IDS

## Core ideas
- **Expand** = remove a node from the frontier and generate its successors. Always apply the stated tie rule (usually alphabetical) and the stated goal-test point.
- **BFS**: FIFO queue, level by level. Returns the path with the fewest edges, which is the cheapest only when all step costs are equal.
- **DFS**: LIFO stack or recursion, follows the first successor as deep as possible. Not optimal. Tree-search DFS can loop on cycles or infinite paths. Graph search on a finite graph terminates.
- **UCS**: pops the lowest path cost $g(n)$. A frontier node's $g$ is lowered when a cheaper path appears. Optimal if every step cost $\ge\varepsilon>0$ **and** the goal test happens when the goal is popped.
- **IDS**: depth-limited DFS with limits $0,1,\dots,d$. Every iteration restarts at the root. Gets BFS's guarantees with DFS's memory.
- **Graph search**: keep a reached/explored set. A node already in the frontier or already expanded is not added again.
- **Goal test on generation** stops while the goal's parent is being expanded, so the goal is never expanded. **On expansion**, the goal waits in the frontier until it is popped.
- IDS generated nodes: $N=d\,b+(d-1)b^2+\dots+1\cdot b^d$. BFS: $b+b^2+\dots+b^d$. For $b=10,d=5$ the counts are 123,450 and 111,110, about 11% overhead.

## Shortcuts
| Strategy | Complete? | Optimal? | Time | Space |
|---|---|---|---|---|
| BFS | yes (finite $b$) | unit costs | $O(b^d)$ | $O(b^d)$ |
| UCS | yes (costs $\ge\varepsilon$) | yes | $O(b^{1+\lfloor C^*/\varepsilon\rfloor})$ | same |
| DFS | no (infinite depth / cycles in tree search) | no | $O(b^m)$ | $O(bm)$ |
| DLS ($\ell$) | no if $\ell<d$ | no | $O(b^\ell)$ | $O(b\ell)$ |
| IDS | yes (finite $b$) | unit costs | $O(b^d)$ | $O(bd)$ |

Trace template: write `expand X → frontier [..]` on one line per step, crossing out nodes already reached.

## Traps
1. **BFS ↔ DFS order swap**: listing the depth-first order for BFS. Fix: BFS empties a level before going deeper. DFS takes the first successor of the newest node.
2. **Tie order reversed**: popping B before A when they are tied, or pushing children onto a stack so that the last one comes out first. Fix: follow the stated rule literally.
3. **Goal test point**: stopping when the goal is generated although the stem says on expansion, or the reverse. With the test on expansion, BFS generates an extra level, $O(b^{d+1})$.
4. **UCS stopped early**: accepting the first copy of the goal that is generated (for example a costly direct edge). Fix: stop only when the goal is popped with the minimum $g$.
5. **Missed cost update**: keeping a frontier node's first $g$. Fix: lower it when a cheaper path is generated.
6. **Edge weight instead of path cost**: UCS orders by total $g$ from the start, not by the last edge.
7. **IDS counts**: counting only the last iteration, or forgetting limit 0. The root is visited $d+1$ times.
8. **Path vs expansion order**: the returned path is not the list of expanded nodes. In a tree every node has exactly one path from the root.
9. **Memory swap**: DFS time $O(b^m)$ vs space $O(bm)$. IDS space is $O(bd)$, not $O(b^d)$.

## Recall
- BFS = FIFO, DFS = LIFO, UCS = min $g$, IDS = DFS with limits $0..d$
- BFS/IDS optimal only for equal step costs; UCS optimal for costs $\ge\varepsilon>0$
- UCS: goal test when popped; BFS may test on generation safely
- BFS late goal test: $O(b^{d+1})$ instead of $O(b^d)$
- DFS: time $O(b^m)$, space $O(bm)$; IDS: time $O(b^d)$, space $O(bd)$
- IDS generated nodes $=\sum_{i=1}^{d}(d-i+1)\,b^i$
- IDS visits the root $d+1$ times
- Complete-tree visits per IDS iteration with limit $\ell$: $\sum_{i=0}^{\ell} b^i$
