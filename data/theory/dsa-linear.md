# Stacks, queues and linked lists

## Core ideas
- **Stack** (LIFO): `push` and `pop` act on the top; in Python `append` / `pop()`. Write it bottom → top and pop the rightmost.
- **Queue** (FIFO): enqueue at the rear, dequeue at the front (`deque.append` / `popleft`).
- **Valid pop orders** for inputs 1..n pushed in order: when x is popped, every smaller value still on the stack must leave in decreasing order. Forbidden pattern: …c…a…b with a < b < c.
- Number of valid pop orders of n inputs = Catalan number $C_n = \frac{1}{n+1}\binom{2n}{n}$: 1, 2, 5, 14, 42.
- **Postfix evaluation**: operator pops b (top) then a, pushes `a op b`.
- **Circular queue** of size m: `rear = (rear + 1) % m` on enqueue, `front = (front + 1) % m` on dequeue.
- **Two-stack queue**: enqueue → push IN; dequeue → if OUT is empty move all of IN to OUT, then pop OUT. Worst case Θ(n) per dequeue, amortized O(1).
- **Deque**: `append`, `appendleft`, `pop`, `popleft` all O(1).
- **Singly linked list** (head only): insert/delete at front O(1); delete last, search, access k-th Θ(n).
- **Doubly linked list**: insert q after p — `q.prev = p; q.next = p.next; p.next.prev = q; p.next = q` (overwrite `p.next` last).

## Shortcuts
| Task | Rule |
|---|---|
| Max stack depth | track size after every op; peak ≠ final |
| Two-stack queue cost | each element: 1 push IN, 1 pop IN, 1 push OUT, 1 pop OUT |
| Iterative reversal | `while cur:` with `nxt = cur.next; cur.next = prev; prev, cur = cur, nxt` |
| Delete node p (not last), no head | copy `p.next.val` into p, then `p.next = p.next.next` |

## Traps
1. Popping the oldest element from a stack (FIFO thinking). Fix: always the most recent surviving push.
2. Reporting the final size when the peak is asked. Fix: write the size after every step.
3. Reversing operands in postfix. Fix: first popped = right operand.
4. Forgetting `% m` in a circular queue.
5. Refilling OUT while it is non-empty, or pushing new items onto OUT; both break FIFO order.
6. Loop condition `while cur.next` stops before the last node. Fix: check what happens on the tail.
7. Overwriting `p.next` before reading it in an insertion.
8. Expecting O(log n) binary search on a linked list.

## Recall
- Stack LIFO, queue FIFO; postfix: pop b, pop a, push a op b.
- Valid stack permutations of n: $C_n = \frac{1}{n+1}\binom{2n}{n}$; $C_4 = 14$.
- Forbidden pop pattern: c, a, b with a < b < c.
- Circular index: (i + 1) mod m.
- Two-stack queue: amortized O(1), worst case Θ(n) per dequeue.
- Singly list, head only: delete-last Θ(n), insert-front O(1).
- DLL insert after p: q.prev, q.next, p.next.prev, then p.next.
