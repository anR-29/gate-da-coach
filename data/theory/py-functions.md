# Functions, recursion, scope and closures

## Core ideas
- A recursive call runs to completion before the caller's next line: statements before the call run on the way down, statements after it run while unwinding (reverse order).
- Call count: $C(n)=1+\sum C(\text{subcalls})$; base calls count too. Naive Fibonacci: $C(n)=2F(n+1)-1$.
- Memoised recursion still **enters** the function on a cache hit; count those calls if the counter is at the top.
- Default arguments are evaluated **once**, at `def` time. A mutable default (`[]`, `{}`) is shared by every call that omits it; it lives in `f.__defaults__`.
- Safe idiom: `def f(x, acc=None): if acc is None: acc = []`.
- `acc += (x,)` on a tuple default rebinds a local; the default stays unchanged.
- LEGB: Local → Enclosing → Global → Built-in. Any assignment in a function makes the name local **everywhere** in that function.
- `global x` binds to the module; `nonlocal x` binds to the nearest enclosing function (SyntaxError if none).
- Closures look variables up **when called** (late binding). `lambda x, i=i: ...` freezes the current value.
- Each call of an outer function creates a fresh set of enclosed variables.

## Shortcuts
| Pattern | Result |
|---|---|
| `T(n)=2T(n-1)+1`, `T(0)=0` | $2^n-1$ |
| Halving chain from $n$ to 0 | $\lfloor\log_2 n\rfloor+2$ calls |
| `[lambda: i for i in range(k)]` | all return `k-1` |
| print before and after recursive call | `n ... 1 1 ... n` |

## Traps
1. Reading `print` after the recursive call in call order. Fix: it runs during unwinding.
2. Forgetting the top call or the base calls in a count. Fix: draw the recursion tree, count nodes.
3. Assuming a mutable default resets each call. Fix: it is created once.
4. Assuming passing an alias of the default creates a new list. Fix: same object.
5. Reading a global before a later local assignment in the same function. Fix: that raises `UnboundLocalError`.
6. Thinking `global` refers to the enclosing function. Fix: it always means module level.
7. Expecting closures to capture values at creation. Fix: they capture variables.
8. Assuming comprehension variables leak in Python 3. Fix: they do not; `for` loop variables do.

## Recall
- Defaults are evaluated once, at definition time.
- `if acc is None: acc = []` avoids shared defaults.
- Assignment anywhere in a function ⇒ local throughout ⇒ early read gives `UnboundLocalError`.
- `nonlocal` → enclosing function; `global` → module.
- Closures are late-binding; use `i=i` to freeze.
- Naive fib(n) makes $2F(n+1)-1$ calls (fib(5): 15).
- `T(n)=2T(n-1)+1` ⇒ $2^n-1$.
- Shadowing a builtin inside a function affects only that function.
