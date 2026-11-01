# Bernoulli, binomial and Poisson models

## Core ideas
- Bernoulli($p$): one trial, mean $p$, variance $p(1-p)$.
- Binomial($n,p$): number of successes in **fixed** $n$ independent trials with constant $p$. $P(X=k)=\binom nk p^k(1-p)^{n-k}$, mean $np$, variance $np(1-p)$.
- Poisson($\lambda$): counts in an interval at a constant rate. $P(X=k)=e^{-\lambda}\lambda^k/k!$, mean = variance = $\lambda$.
- $\lambda$ = rate × interval length (same units).
- Poisson approximation: Binomial($n,p$) with large $n$, small $p$ ≈ Poisson($np$).
- Geometric: trials until the first success. Hypergeometric: draws without replacement.
- Independent Poissons add: Poisson($\lambda_1$)+Poisson($\lambda_2$) = Poisson($\lambda_1+\lambda_2$).

## Shortcuts
| Words | Event | Compute as |
|---|---|---|
| at most $k$ / no more than $k$ | $X\le k$ | sum $0..k$ |
| fewer than $k$ | $X\le k-1$ | sum $0..k-1$ |
| at least $k$ | $X\ge k$ | $1-P(X\le k-1)$ |
| more than $k$ | $X\ge k+1$ | $1-P(X\le k)$ |

Model choice: fixed $n$ → binomial; rate over time/space → Poisson; finite lot, no replacement → hypergeometric; "until first" → geometric.

## Traps
1. **Direction reversal**: computed $P(X\le1)$ when asked $P(X\ge2)$. Fix: write the event in symbols before calculating.
2. **Complement boundary**: $P(X\ge3)=1-P(X\le2)$, not $1-P(X\le3)$.
3. **Rate not scaled**: 6 per hour over 20 minutes is $\lambda=2$, not 6.
4. **Expectation vs probability**: "expected number" is $np$; "probability of exactly $k$" needs the full PMF.
5. **Missing $\binom nk$ or $k!$**: $P(X=2)$ in Poisson is $e^{-\lambda}\lambda^2/2$.
6. **Binomial for card dealing**: without replacement → hypergeometric.

## Recall
- Binomial: $\binom nk p^k q^{n-k}$, mean $np$, var $npq$
- Poisson: $e^{-\lambda}\lambda^k/k!$, mean = var = $\lambda$
- $\lambda$ = rate × time
- Binomial ≈ Poisson($np$) for large $n$, small $p$
- $P(X\ge k)=1-P(X\le k-1)$
- $P(\text{none})$ in Poisson $=e^{-\lambda}$
- $P(X\le1)=e^{-\lambda}(1+\lambda)$
