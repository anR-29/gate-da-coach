# Graph traversal and shortest paths

## Core ideas
- **BFS:** FIFO queue; mark a vertex when it is enqueued; scan neighbours in the given order. Levels = fewest edges from s (unweighted shortest paths). Time $O(V+E)$.
- **DFS:** go to the first unvisited neighbour; backtrack only when none is left. A stack DFS that pushes neighbours in list order visits them in reverse.
- **Valid order checks:** BFS: the new neighbours of each dequeued vertex form one block, blocks in dequeue order. DFS: you may not leave a vertex that still has an unvisited neighbour.
- **Edge types (directed DFS):** tree (to a new vertex), back (to an open ancestor), forward (to a finished descendant, $d[u]<d[v]$), cross (to a finished vertex with $d[v]<d[u]$). Undirected DFS: only tree and back edges.
- **Cycle test:** a directed graph has a cycle iff DFS finds a back edge.
- **Topological sort:** reverse of DFS finishing order, or Kahn (remove in-degree-0 vertices). Count orders by fixing constraints and interleaving independent chains.
- **Components:** start a BFS/DFS from each unvisited vertex; isolated vertices count. $m \ge n-k$, equality iff forest.
- **Dijkstra:** extract the smallest tentative $d$, relax out-edges $d[v]=\min(d[v], d[u]+w)$. Correct only for $w \ge 0$; a finalized vertex is never updated.
- **Bellman-Ford:** $V-1$ rounds over all edges; works with negative edges if no reachable negative cycle.

## Shortcuts
| Question | Tool |
|---|---|
| Fewest edges | BFS |
| Number of shortest paths | BFS levels, sum counts from the level above |
| Cycle in directed graph | back edge |
| Order respecting edges | topological sort |
| Weighted, $w \ge 0$ | Dijkstra |
| Negative edges | Bellman-Ford |

## Traps
1. Giving the DFS order when BFS is asked (or the reverse). Fix: queue = level by level; recursion = dive first.
2. Sorting adjacency lists that are given in a stored order. Fix: scan them as stored.
3. Reading a DFS-tree depth as a distance. Fix: only BFS levels are shortest hop counts.
4. Calling a→d a tree edge when d was reached earlier through another child. Fix: track discovery times.
5. Forgetting to reverse the finishing order in DFS topological sort.
6. Using $k = n - m$ for components when the graph has cycles.
7. Ignoring edge direction in a directed BFS.
8. Believing "no negative cycle" is enough for Dijkstra. Fix: one negative edge can already break it.
9. Adding a constant to all weights to remove negatives. Fix: this penalises paths with more edges.

## Recall
- BFS/DFS: $O(V+E)$ with adjacency lists.
- BFS tree: every edge joins levels differing by at most 1.
- Cross edge: $d[v] < f[v] < d[u]$; forward edge: $d[u] < d[v] < f[v] < f[u]$.
- Directed cycle iff back edge.
- Topological order = reverse finishing order.
- Components: $m \ge n-k$; forest iff $m = n-k$.
- Dijkstra needs all $w \ge 0$; Bellman-Ford needs no negative cycle.
