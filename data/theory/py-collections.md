# Lists, tuples, sets, dicts and program tracing

## Core ideas
- `b = a` creates an alias (same object). `a[:]`, `list(a)`, `copy.copy(a)` copy only the outer list; `copy.deepcopy` copies nested objects.
- `[[0]*3]*2` repeats one inner list (aliased rows); use `[[0]*3 for _ in range(2)]`.
- List `+=` mutates in place (aliases see it); `x = x + [..]` builds a new list and rebinds only `x`.
- `t[0] += [4]` on a tuple holding a list: the list is extended, **then** `TypeError` is raised on the tuple assignment.
- A `for` loop over a list walks indices of the live list: `remove` skips the next element, `append` gets visited. Iterate over `list(a)` or a copy to be safe.
- Changing a dict's size while iterating over it raises `RuntimeError`; iterating over `list(d)` is safe.
- Dicts preserve insertion order; reassigning a key keeps its position; a new key goes to the end.
- Keys that are equal and hash equal collapse: `1`, `1.0`, `True` are one key.
- Comprehensions: for-clauses nest left to right; dict comprehension keeps the **last** value per key; a generator can be consumed once.
- `sorted()` is stable and returns a new list; `list.sort()` returns `None`. Key tuples compare left to right; negate numbers for descending.

## Shortcuts
| Operation | Note |
|---|---|
| `A < B` | proper subset |
| `max(d, key=d.get)` | first key with the largest value |
| `del a[::2]` | removes indices 0, 2, 4, ... |
| `a[i:j] = [x]` | replaces a slice; length can change |
| `deque.popleft()` vs `pop()` | FIFO (BFS) vs LIFO (DFS) |

## Traps
1. Treating `b = a` as a copy. Fix: assignment never copies.
2. Assuming a shallow copy copies inner lists.
3. Assuming `[[0]*n]*m` gives independent rows.
4. Expecting `remove` inside a `for` loop to see every element.
5. Assuming the first value wins in a dict comprehension. Fix: the last value wins.
6. Assuming dict keys come out sorted. Fix: insertion order.
7. Iterating a generator twice. Fix: the second pass is empty.
8. Mixing up `pop()` and `popleft()` when tracing BFS.
9. Using 1-based indices with `enumerate`. Fix: it starts at 0 unless told otherwise.

## Recall
- Alias: `b = a`; shallow: `a[:]`; deep: `copy.deepcopy(a)`.
- `[[0]*3]*2` → both rows are the same list.
- `x += [..]` mutates; `x = x + [..]` rebinds.
- `len({1: 'a', True: 'b', 1.0: 'c'}) == 1`.
- Dict comprehension: last value per key, first position.
- `sorted(key=lambda p: (-p[1], p[0]))`: score descending, name ascending.
- `list.sort()` returns `None`.
- `sum(g)` twice on one generator → second is 0.
- Removing from a list while iterating skips elements.
- Sets: `A | B` union, `A & B` intersection, `A - B` difference, `A ^ B` symmetric difference.
