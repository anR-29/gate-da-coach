# Maxima, minima, convexity and gradient descent

## Core ideas
- Critical points: $f'(x)=0$ or $f'$ undefined, **inside** the domain.
- Second-derivative test: $f''(c)>0$ min, $f''(c)<0$ max, $f''(c)=0$ inconclusive (use the sign change of $f'$).
- Closed interval $[a,b]$: absolute extrema are among the critical points and the endpoints $a$, $b$.
- Convex on $I$ ⇔ $f''\ge0$ on $I$ (twice differentiable) ⇔ $f'$ non-decreasing ⇔ tangent lines lie below $f$.
- Convex: every local minimum is global; a minimiser need not exist ($e^x$).
- Inflection point: $f''$ **changes sign** (not merely $f''=0$).
- $\sum_i (x-a_i)^2$ is minimised at the mean; $\sum_i|x-a_i|$ at the median.
- Gradient descent: $x_{k+1}=x_k-\eta\,\nabla f(x_k)$.
- On $f(x)=cx^2$: $x_{k+1}=(1-2c\eta)x_k$; converges iff $|1-2c\eta|<1$.

## Shortcuts
| Situation | Quick result |
|---|---|
| $x+y=S$, max $xy$ | $x=y=S/2$ |
| $x+ky=S$, max $xy$ | $x=S/2$, $y=S/(2k)$ |
| Fence 3 sides, length $L$ | sides $L/4$, $L/2$; area $L^2/8$ |
| Box from $a\times a$ sheet | cut $x=a/6$, $V=\frac{2a^3}{27}$ |
| $ax^2+bx+c\ge0\ \forall x$ ($a>0$) | $b^2-4ac\le0$ |

## Traps
1. Ignoring endpoints on a closed interval. Fix: always tabulate $f$ at endpoints.
2. Using a critical point outside the domain. Fix: check feasibility first.
3. Reporting the location $x^*$ when the value $f(x^*)$ is asked (or vice versa).
4. Calling $f''=0$ an inflection. Fix: check the sign change ($x^4$ has none).
5. Convexity sign reversed (solving $f''\le0$). Fix: convex means $f''\ge0$.
6. GD sign error ($x+\eta f'$). Fix: descent subtracts the gradient.
7. Forgetting the 2 in $\frac{d}{dw}(wx-y)^2=2(wx-y)x$, or the chain factor $x$.
8. Assuming convexity guarantees GD convergence. Fix: the step size must be small enough.

## Recall
- Absolute extrema on $[a,b]$: compare $f$ at critical points and endpoints.
- $f''>0$ ⇒ local min; $f''<0$ ⇒ local max; $f''=0$ ⇒ test fails.
- Convex ⇔ $f''\ge0$; local min of convex $f$ is global.
- $f(y)\ge f(x)+f'(x)(y-x)$ for convex $f$.
- $\arg\min\sum(x-a_i)^2=$ mean; $\arg\min\sum|x-a_i|=$ median.
- GD: $x\leftarrow x-\eta f'(x)$.
- On $x^2$: GD converges iff $0<\eta<1$; $\eta=1$ oscillates; $\eta>1$ diverges.
- $xe^{-x}$: max $1/e$ at $x=1$, inflection at $x=2$.
