# Clustering: k-means, k-medoids, hierarchical

## Core ideas
- k-means objective (SSE): $J = \sum_k \sum_{x \in C_k} \lVert x - \mu_k\rVert^2$.
- Lloyd: assign each point to the nearest centroid, then set $\mu_k$ = mean of its points. Neither step raises $J$, so it converges, but only to a local minimum that depends on the start.
- k-means++: next seed chosen with probability $\propto D(x)^2$ (squared distance to the nearest chosen seed).
- k-means is not scale-invariant and favours compact convex clusters; outliers pull the mean.
- k-medoids: centres are data points; cost $= \sum$ dissimilarities (unsquared). Medoid = point with least total distance to its cluster. PAM tries medoid/non-medoid swaps, about $O(k(n-k)^2)$ per pass. Works from a distance matrix alone.
- Agglomerative clustering: start with $n$ singletons, merge the closest pair; $n - 1$ merges. Divisive is top-down.
- Linkage between clusters $X, Y$: single $= \min d(x, y)$, complete $= \max d(x, y)$, average $= \frac{1}{|X||Y|}\sum d(x, y)$.
- Merge height = linkage distance at that merge. Cut at height $h$: clusters $= n - \#\{\text{merges} \le h\}$.
- Single linkage = Kruskal's MST; it chains. Complete linkage gives compact clusters. Centroid linkage can give inversions.

## Shortcuts
| Linkage | Distance | Behaviour |
|---|---|---|
| Single | min cross pair | chaining, MST edges |
| Complete | max cross pair | compact, sensitive to outliers |
| Average (UPGMA) | mean of all cross pairs | in between |
| Ward | increase in SSE | spherical, like k-means |

- For fixed $X, Y$: single ≤ average ≤ complete.
- After merging $A \cup B$: $d_{single}(A \cup B, C) = \min(d_{AC}, d_{BC})$, $d_{complete} = \max(\cdot)$, $d_{avg} = \frac{|A| d_{AC} + |B| d_{BC}}{|A| + |B|}$.
- Medoid of 1D data with absolute distance = a data point at the median.

## Traps
1. Swapping single and complete linkage (C2). Fix: single = nearest pair, complete = farthest pair.
2. Under complete linkage, merging the pair with the largest distance. Fix: compute max per pair, then merge the smallest.
3. Averaging sub-cluster distances equally in UPGMA. Fix: weight by sizes (all point pairs).
4. Reading off a merge below the cut as a cluster, or counting merges as clusters. Fix: $n$ − merges below the cut.
5. SSE with plain distances or with the old centroids. Fix: squared distances to the current centroids.
6. Stopping k-means after one iteration when asked for convergence.
7. Using the mean as a medoid. Fix: the medoid must be a data point.
8. "More clusters always lower SSE" for a given run. Fix: true only for the optimum.

## Recall
- k-means: assign to nearest, update to mean; SSE never increases.
- k-means++ seeds ∝ $D(x)^2$.
- Medoid = data point minimizing total (unsquared) distance.
- Single = min, complete = max, average = mean of all cross pairs.
- single ≤ average ≤ complete for the same pair of clusters.
- $n$ points → $n - 1$ merges.
- Clusters after cut at $h$ = $n$ − merges at height ≤ $h$.
- Single linkage = MST; delete the $k - 1$ heaviest edges for $k$ clusters.
