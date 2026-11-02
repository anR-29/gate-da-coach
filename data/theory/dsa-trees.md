# Binary trees and binary search trees

## Core ideas
- Traversals: preorder N L R, inorder L N R, postorder L R N, level order with a queue (a stack gives a depth-first order instead).
- Rebuild a tree: the root is the first key of the preorder (last of the postorder, first of the level order); its position in the **inorder** splits the left and right subtrees. Recurse.
- Inorder plus any one of pre/post/level fixes the tree (distinct keys). Pre + post fixes it only for full trees (0 or 2 children).
- Height in edges (single node = 0): max nodes $2^{h+1} - 1$; min nodes $h + 1$.
- Min height for n nodes: $\lceil \log_2(n+1) \rceil - 1 = \lfloor \log_2 n \rfloor$; max height $n - 1$.
- Leaves: $n_0 = n_2 + 1$ for every binary tree; one-child nodes do not matter. Full tree with L leaves has $2L - 1$ nodes.
- BST: left < node < right; the inorder is sorted. Insertion follows one root-to-leaf path; the shape depends on the order.
- BST search path: each key must lie in the open interval set by **all** earlier keys.
- BST delete: leaf → remove; one child → splice; two children → copy the inorder successor (min of the right subtree), delete it there.
- Search, insert, delete cost Θ(h): Θ(log n) if balanced, Θ(n) for a chain (sorted inserts).

## Shortcuts
| Quantity | Formula (height in edges) |
|---|---|
| Max nodes, height h | $2^{h+1} - 1$ |
| Min height, n nodes | $\lfloor \log_2 n \rfloor$ |
| Leaves | $n_2 + 1$ |
| Full tree, L leaves | $2L - 1$ nodes |
| Distinct shapes, n nodes | Catalan $C_n$ |

## Traps
1. Mixing height conventions (edges vs levels). Fix: read the definition in the stem.
2. Reversed preorder taken as postorder. Fix: reversed preorder is R L N.
3. Treating the insertion order as the preorder or level order. Fix: build the tree.
4. Assuming a BST is balanced. Fix: trace the inserts.
5. Checking a search path only against the parent. Fix: keep the (lo, hi) interval.
6. Successor vs predecessor in deletion; forgetting the successor's right child.
7. Adding one-child nodes into the leaf count.
8. Level order with `pop()` (stack) instead of `popleft()`.

## Recall
- Pre N L R, in L N R, post L R N; BST inorder is sorted.
- Unique rebuild needs inorder (or a full tree for pre + post).
- Max nodes at height h: $2^{h+1} - 1$.
- Min height: $\lfloor \log_2 n \rfloor$ edges.
- $n_0 = n_2 + 1$.
- BST delete (2 children): inorder successor = min of right subtree.
- BST operations Θ(h); worst case Θ(n).
