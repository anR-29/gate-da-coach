# Limits, continuity and composition

## Core ideas
- $\lim_{x\to a}f(x)=L$ exists iff $\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=L$. The value $f(a)$ plays no part.
- Continuity at $a$: $\lim_{x\to a^-}f=\lim_{x\to a^+}f=f(a)$ (three things must agree).
- L'Hôpital: if the form is $0/0$ or $\infty/\infty$, $\lim\frac{f}{g}=\lim\frac{f'}{g'}$. Differentiate top and bottom **separately**.
- Taylor substitution is often faster: $e^u=1+u+\frac{u^2}{2}+\dots$, $\cos u=1-\frac{u^2}{2}+\dots$, $\ln(1+u)=u-\frac{u^2}{2}+\dots$
- $1^\infty$ form: $\lim f^g=e^{\lim (f-1)g}$; so $\left(1+\frac{a}{x}\right)^{bx}\to e^{ab}$.
- $\sqrt{u^2}=|u|$. One-sided limits often hinge on this sign.
- Composition: if $g(x)\to b$ and $f$ is continuous at $b$, then $f(g(x))\to f(b)$. If $f$ is not continuous at $b$, check how $g$ approaches $b$ (from one side? equal to $b$?).
- Floor: $\lfloor x\rfloor$ jumps at every integer; left limit at $n$ is $n-1$, right limit is $n$.

## Shortcuts
| Limit ($x\to0$) | Value |
|---|---|
| $\frac{\sin ax}{bx}$, $\frac{\tan ax}{bx}$ | $a/b$ |
| $\frac{e^{ax}-1}{x}$ | $a$ |
| $\frac{a^x-1}{x}$ | $\ln a$ |
| $\frac{\ln(1+ax)}{x}$ | $a$ |
| $\frac{1-\cos ax}{x^2}$ | $a^2/2$ |
| $\frac{\ln x}{x}$ as $x\to\infty$ | $0$ |

## Traps
1. Using $f(a)$ as the limit. Fix: compute both one-sided limits; ignore the point value.
2. Checking continuity from one side only. Fix: write left limit, right limit and $f(a)$ in a row.
3. Stopping L'Hôpital while the form is still $0/0$. Fix: re-check the form after each step.
4. Applying the quotient rule inside L'Hôpital. Fix: differentiate numerator and denominator separately.
5. $\sqrt{\sin^2x}=\sin x$. Fix: it is $|\sin x|$; negative on the left of 0.
6. Treating $1^\infty$ as 1. Fix: use $e^{\lim(f-1)g}$.
7. Dropping scale factors: $\frac{\sin3x}{x}\to3$, not 1.
8. Composition order: $(f\circ g)(x)=f(g(x))$, inner function first.

## Recall
- Limit exists ⇔ left limit = right limit.
- Continuous at $a$ ⇔ left = right = $f(a)$.
- $\lim_{x\to0}\frac{\sin ax}{x}=a$, $\lim_{x\to0}\frac{e^{ax}-1}{x}=a$, $\lim_{x\to0}\frac{a^x-1}{x}=\ln a$.
- $\lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12$.
- $\left(1+\frac{a}{x}\right)^{bx}\to e^{ab}$; generally $1^\infty\to e^{\lim(f-1)g}$.
- $1-\cos2x=2\sin^2x$, so $\sqrt{1-\cos2x}=\sqrt2|\sin x|$.
- $\lfloor x\rfloor$ at integer $n$: left limit $n-1$, right limit $n$.
- $\lim f(g(x))=f(\lim g(x))$ only when $f$ is continuous there.
