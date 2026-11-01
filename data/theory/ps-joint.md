# Joint, marginal and conditional distributions

## Core ideas
- Joint PMF $p(x,y)\ge0$, $\sum_x\sum_y p(x,y)=1$ over **every** listed cell.
- Marginals: $p_X(x)=\sum_y p(x,y)$ (row sum), $p_Y(y)=\sum_x p(x,y)$ (column sum).
- Conditional: $p(x\mid y)=p(x,y)/p_Y(y)$; $E[X\mid Y=y]=\sum_x x\,p(x\mid y)$.
- Independent $\iff p(x,y)=p_X(x)p_Y(y)$ for **all** cells (one failing cell is enough to show dependence).
- Continuous: $f_X(x)=\int f(x,y)\,dy$; integrate over the region **inside the support**.
- Independent uniforms: joint density is constant on the rectangle, so $P(\text{region})=\dfrac{\text{area of region}}{\text{area of rectangle}}$.

## Shortcuts
| Region in $[0,1]^2$ (iid $U(0,1)$) | Probability |
|---|---|
| $X\ge Y$ | 1/2 |
| $X+Y\le c$ ($c\le1$) | $c^2/2$ |
| $\lvert X-Y\rvert\le d$ | $1-(1-d)^2$ |
| $X\ge kY$ ($k\ge1$) | $1/(2k)$ |

Different ranges ($X\sim U(0,a)$, $Y\sim U(0,b)$): sketch the rectangle $a\times b$ and the line; no symmetry.

## Traps
1. **Counting cells instead of weights** when normalising $c(x+y)$.
2. **Joint used as conditional**: $p(1,1)$ is not $P(X=1\mid Y=1)$; divide by the column total.
3. **Dividing by the wrong marginal**: given $Y$, divide by $p_Y$, not $p_X$.
4. **Assuming symmetry** for uniforms with different ranges.
5. **Triangle area without $\frac12$**.
6. **Reversed region**: $P(X\ge Y)$ vs $P(X<Y)$ — shade before integrating.

## Recall
- $\sum\sum p(x,y)=1$
- $p_X(x)=\sum_y p(x,y)$
- $p(x\mid y)=p(x,y)/p_Y(y)$
- Independent ⇔ every cell = product of marginals
- Uniform region probability = area ratio
- iid $U(0,1)$: $P(X+Y\le c)=c^2/2$ for $c\le1$
