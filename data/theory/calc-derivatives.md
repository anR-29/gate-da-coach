# Differentiability, Taylor series and series sums

## Core ideas
- Differentiable ⇒ continuous; the converse fails ($|x|$, ReLU at 0).
- At a joint $a$ of a piecewise function: (1) continuity, (2) $f'(a^-)=f'(a^+)$. Both are needed.
- $|g(x)|$ has a corner where $g$ has a simple root ($g(a)=0$, $g'(a)\ne0$); $x|x|$, $|x|^3$, $(\max(0,x))^2$ are smooth at 0.
- Rules: $(uv)'=u'v+uv'$, $\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}$, $(f(g))'=f'(g)\,g'$.
- Taylor about $a$: $f(x)=\sum_n \frac{f^{(n)}(a)}{n!}(x-a)^n$. Coefficient $c_n$ ⇒ $f^{(n)}(a)=n!\,c_n$.
- Products of series: the $x^n$ coefficient is $\sum_k a_k b_{n-k}$ (collect all pairs).
- Geometric: $\sum_{n\ge0}r^n=\frac{1}{1-r}$, $|r|<1$. From $n=1$: $\frac{r}{1-r}$.
- Differentiated geometric: $\sum_{n\ge1}nx^n=\frac{x}{(1-x)^2}$.
- Telescoping: split with partial fractions, list the first few terms, keep the survivors.

## Shortcuts
| Function | Maclaurin series |
|---|---|
| $e^x$ | $\sum x^n/n!$ |
| $\sin x$ | $x-\frac{x^3}{6}+\frac{x^5}{120}-\dots$ |
| $\cos x$ | $1-\frac{x^2}{2}+\frac{x^4}{24}-\dots$ |
| $\ln(1+x)$ | $x-\frac{x^2}{2}+\frac{x^3}{3}-\dots$ ($-1<x\le1$) |
| $\frac{1}{1-x}$ | $1+x+x^2+\dots$ ($\lvert x\rvert<1$) |
| $\sqrt{a^2+h}$ | $a+\frac{h}{2a}-\frac{h^2}{8a^3}$ |

## Traps
1. Assuming continuity implies differentiability. Fix: compare one-sided derivatives.
2. Matching slopes at a joint but skipping continuity (or the reverse). Fix: write both equations.
3. Confusing coefficient with derivative: $c_3=\frac13$ means $f'''(0)=2$.
4. Forgetting the inner power: coefficient of $x^3$ in $e^{2x}$ is $\frac{2^3}{3!}$.
5. Expanding about the wrong point: $\ln x$ about 1 uses powers of $(x-1)$.
6. Missing the $\frac{1}{2!}$ in a second-order approximation.
7. Wrong start index in geometric sums ($n=0$ vs $n=1$).
8. Forgetting the $\frac12$ in $\frac{1}{n(n+2)}=\frac12\left(\frac1n-\frac1{n+2}\right)$.
9. Terms $\to0$ does not imply convergence ($\sum\frac1n$ diverges).

## Recall
- Differentiable at $a$ ⇔ continuous and $f'(a^-)=f'(a^+)$.
- $\frac{d}{dx}x|x|=2|x|$; $|x|$ and ReLU are not differentiable at 0.
- $f^{(n)}(a)=n!\cdot c_n$.
- $\frac{d^n}{dx^n}\frac{1}{1-x}\Big|_0=n!$.
- $\sum_{n\ge0}r^n=\frac{1}{1-r}$; $\sum_{n\ge1}nx^n=\frac{x}{(1-x)^2}$.
- $\sum_{n\ge1}\frac{1}{n(n+1)}=1$; $\sum_{n\ge1}\frac{1}{n(n+2)}=\frac34$.
- $\sum\frac1n$ diverges; $\sum\frac{(-1)^n}{n}$ converges.
- $\ln(1+x)$ series converges at $x=1$ to $\ln2$.
