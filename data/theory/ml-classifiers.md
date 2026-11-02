# Logistic regression and k-NN

## Core ideas
- Logistic model: $P(y = 1 \mid x) = \sigma(z)$, $z = w^\top x + b$, $\sigma(z) = \dfrac{1}{1 + e^{-z}}$.
- Log-odds is linear: $\ln\dfrac{p}{1-p} = z$. Inverse: $z = \sigma^{-1}(p)$.
- Threshold 0.5 $\iff z = 0$: a linear boundary. Threshold $t$ $\iff z = \ln\dfrac{t}{1-t}$.
- $\sigma'(z) = \sigma(z)(1 - \sigma(z))$, maximum $0.25$ at $z = 0$; $\sigma(-z) = 1 - \sigma(z)$.
- Cross-entropy per point: $-[y\ln p + (1-y)\ln(1-p)]$; gradient $(p - y)x$; convex in $w$.
- Separable data without regularisation: $\lVert w\rVert \to \infty$.
- **k-NN**: compute distances to all training points, take the $k$ nearest, majority vote (regression: mean of their $y$).
- $k = 1$: zero training error, high variance. Larger $k$: smoother, more bias. $k = n$: always the majority class.
- Scale features (min–max or z-score) first; otherwise the widest-range feature decides the distance.
- No training cost; prediction costs $O(nd)$ per query.

## Shortcuts
| $p$ | odds | log-odds $z$ |
|---|---|---|
| 0.5 | 1 | 0 |
| 0.8 | 4 | $\ln 4 \approx 1.386$ |
| 0.9 | 9 | $\ln 9 \approx 2.197$ |
| 0.2 | 0.25 | $-\ln 4$ |

## Traps
1. Using $e^{+z}$ in the sigmoid (gives $1 - p$).
2. Calling the odds $p/(1-p)$ the score; the score is its log.
3. With a threshold other than 0.5, solving $z = t$ instead of $z = \ln\frac{t}{1-t}$.
4. $\sigma' = \sigma$ (that is $e^z$) or $\sigma^2$; correct is $\sigma(1 - \sigma)$.
5. Cross-entropy for $y = 0$ uses $\ln(1 - p)$, not $\ln p$; sum vs mean as asked; natural log unless stated.
6. Thinking $p$ itself is linear in $x$; only the log-odds is.
7. k-NN: using the $k = 1$ answer, or counting the query point as its own neighbour.
8. Forgetting to scale, or averaging $x$ instead of $y$ in k-NN regression.

## Recall
- $\sigma(z) = 1/(1 + e^{-z})$; $\sigma(-z) = 1 - \sigma(z)$.
- $\ln\frac{p}{1-p} = w^\top x + b$.
- Boundary at threshold $t$: $w^\top x + b = \ln\frac{t}{1-t}$.
- $\sigma' = \sigma(1 - \sigma)$.
- Loss $-[y\ln p + (1-y)\ln(1-p)]$; gradient $(p - y)x$.
- k-NN: small $k$ = high variance; large $k$ = high bias.
- Always scale features before k-NN.
