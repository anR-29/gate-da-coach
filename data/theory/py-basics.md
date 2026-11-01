# Python types, expressions and control flow

## Core ideas
- `/` always returns `float`; `//` floors toward $-\infty$; `%` takes the sign of the divisor. Always `a == (a//b)*b + a%b`.
- `int ** negative int` gives a `float` (`2 ** -1 == 0.5`); any float operand makes `//` and `%` return float.
- `**` is right-associative and binds tighter than unary minus: `-3 ** 2 == -9`, `2 ** 3 ** 2 == 512`.
- Precedence (high → low): `**`, unary `-`, `* / // %`, `+ -`, comparisons, `not`, `and`, `or`.
- `and`/`or` return an operand and short-circuit: `x and y` returns x if x is falsy, else y; `x or y` returns x if x is truthy, else y.
- Falsy: `0`, `0.0`, `""`, `[]`, `()`, `{}`, `set()`, `None`, `False`. Everything else (including `[0]`, `"0"`) is truthy.
- Comparison chaining: `a < b == c` means `a < b and b == c` (b evaluated once).
- Slicing `s[start:stop:step]` excludes stop, clamps out-of-range indices, never raises. Negative step starts from the end.
- Strings are immutable; `upper()`, `replace()` return new strings.
- `for ... else` / `while ... else`: the else runs when the loop ends **without** `break` (also when it runs zero times).

## Shortcuts
| Expression | Value |
|---|---|
| `7 // -2`, `7 % -2` | `-4`, `-1` |
| `-7 // 2`, `-7 % 2` | `-4`, `1` |
| `divmod(-17, 5)` | `(-4, 3)` |
| `len(range(a, b, k))` ($b>a$, $k>0$) | $\lceil (b-a)/k\rceil$ |
| `s[::-1]` | reversed copy |
| `0.1 + 0.2 == 0.3` | `False` |

## Traps
1. C-style truncation for `//` and `%` with negatives. Fix: floor, then remainder = a − b·q.
2. Evaluating `**` left to right. Fix: right to left.
3. Treating `and`/`or` results as booleans. Fix: they return an operand.
4. `not a == b` read as `(not a) == b`. Fix: `not` is below `==`.
5. Treating slice stop as inclusive. Fix: stop is excluded.
6. Expecting `s[-1:-4]` to reverse. Fix: needs step `-1`.
7. Thinking loop-else runs after break. Fix: it runs only if no break.
8. Loop variable after `for k in range(3)` is 2, not 3; after an empty loop it is unbound.

## Recall
- `a == (a // b) * b + a % b` always.
- `/` → float; `2 ** -1 == 0.5`.
- `-3 ** 2 == -9`; `2 ** 3 ** 2 == 512`.
- `x or y` returns the first truthy operand (or the last one).
- `x and y` returns the first falsy operand (or the last one).
- `1 < 3 > 2` is `1 < 3 and 3 > 2`.
- `True == 1`, `hash(True) == hash(1) == hash(1.0)`.
- loop-else runs iff the loop was not broken.
- `range(10, 0, -3)` → 10, 7, 4, 1.
