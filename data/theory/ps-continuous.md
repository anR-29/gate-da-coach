# PDFs, CDFs, uniform and exponential models

## Core ideas
- PDF: $f\ge0$ and $\int f=1$ over the support. $f(x)$ is a **density**, not a probability; $P(X=x)=0$.
- CDF: $F(x)=P(X\le x)=\int_{-\infty}^x f$; $f=F'$; $P(a<X\le b)=F(b)-F(a)$.
- Median $m$: **solve** $F(m)=0.5$. Percentile $q$: solve $F(x_q)=q$.
- Uniform $U(a,b)$: $f=\frac1{b-a}$, mean $\frac{a+b}2$, var $\frac{(b-a)^2}{12}$.
- Uniform conditional: $P(X\in A\mid X\in B)=\frac{\text{len}(A\cap B)}{\text{len}(B)}$.
- Exponential: $f=\lambda e^{-\lambda x}$, $P(X>t)=e^{-\lambda t}$, mean $1/\lambda$, var $1/\lambda^2$, median $\ln2/\lambda$.
- Memoryless: $P(X>s+t\mid X>s)=P(X>t)$.
- $\lfloor X\rfloor$ for exponential $X$ is geometric on $\{0,1,\dots\}$: $P(k)=(e^{-\lambda})^k(1-e^{-\lambda})$.

## Shortcuts
| Task | Method |
|---|---|
| find constant | set area to 1 |
| interval probability | $F(b)-F(a)$ |
| median | set $F(m)=0.5$, solve |
| "has not happened by $s$" (exponential) | restart the clock |
| "given $X>c$" (uniform) | new uniform on the restricted range |
| mean given, exponential | $\lambda=1/\text{mean}$ |

## Traps
1. **Computed $F(0.5)$** instead of solving $F(m)=0.5$. Fix: the unknown is inside $F$.
2. **Density as probability**: $f(0.5)=0.75$ is not $P(X=0.5)$.
3. **Dividing cut-offs** ($7/4$) in uniform conditionals. Fix: divide **lengths** ($3/6$).
4. **Not knowing memoryless**: computing $P(X>1100)$ when told it has survived 600 h.
5. **$\lambda$ = mean**: for mean 5, $\lambda=1/5$.
6. **Height = 1**: normalise the area, not the peak.
7. **Mean vs median**: for skewed densities they differ.

## Recall
- $\int f=1$; $P(a<X\le b)=F(b)-F(a)$
- Median: $F(m)=0.5$
- $U(a,b)$: mean $(a+b)/2$, var $(b-a)^2/12$
- Exp: $P(X>t)=e^{-\lambda t}$, mean $1/\lambda$, var $1/\lambda^2$
- Exp median $=\ln2/\lambda$
- Memoryless: $P(X>s+t\mid X>s)=e^{-\lambda t}$
- $\lfloor X\rfloor\sim$ Geometric, $p=1-e^{-\lambda}$
