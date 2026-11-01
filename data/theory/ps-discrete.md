# Discrete random variables, PMFs and moments

## Core ideas
- A PMF needs $p(x)\ge0$ and $\sum_{\text{all }x}p(x)=1$ over the **full support** (include $x=0$ if listed).
- $E[X]=\sum x\,p(x)$; $E[g(X)]=\sum g(x)\,p(x)$.
- $E[X^2]=\sum x^2p(x)$ — square the **values**, then weight.
- $\mathrm{Var}(X)=E[X^2]-(E[X])^2\ge0$, so $E[X^2]\ge(E[X])^2$.
- Linearity: $E[aX+b]=aE[X]+b$.
- $\mathrm{Var}(aX+b)=a^2\mathrm{Var}(X)$; $\mathrm{SD}(aX+b)=|a|\,\mathrm{SD}(X)$.
- In general $E[g(X)]\ne g(E[X])$ (e.g. $E[1/X]\ne1/E[X]$).

## Shortcuts
| Given | Do |
|---|---|
| $p(x)=k\cdot w(x)$ | $k=1/\sum w(x)$ over the support |
| $E[X]$ and $E[X^2]$ | Var $=E[X^2]-(E[X])^2$ first |
| $Y=a-bX$ | $E[Y]=a-bE[X]$, Var$(Y)=b^2$Var$(X)$ |
| SD wanted | take $|a|$, never a negative SD |

## Traps
1. **$E[X^2]$ vs $(E[X])^2$**: squaring the mean gives $(E[X])^2$. Fix: square each value, then weight.
2. **Sign kept when squaring**: $(-1)^2p=+p$.
3. **Support dropped**: normalising over $x=1..3$ when $x=0$ is listed changes $k$.
4. **$E[X^2]$ used as the variance** in $\mathrm{Var}(aX+b)$. Fix: subtract $(E[X])^2$ first.
5. **Forgetting $a^2$**: $\mathrm{Var}(3X)=9\mathrm{Var}(X)$, not $3\mathrm{Var}(X)$; with $a=-2$, factor is $+4$.
6. **Keeping $b$**: shifts never change variance or SD.

## Recall
- $\sum p(x)=1$ over the whole support
- $E[X]=\sum xp(x)$, $E[X^2]=\sum x^2p(x)$
- $\mathrm{Var}(X)=E[X^2]-(E[X])^2$
- $E[aX+b]=aE[X]+b$
- $\mathrm{Var}(aX+b)=a^2\mathrm{Var}(X)$
- $\mathrm{SD}(aX+b)=|a|\mathrm{SD}(X)$
- $E[g(X)]\ne g(E[X])$ unless $g$ is linear
