# Central limit theorem and confidence intervals

## Core ideas
- $X_1,\dots,X_n$ iid, mean $\mu$, variance $\sigma^2$. Sum $S$: mean $n\mu$, variance $n\sigma^2$, SD $\sigma\sqrt n$.
- Sample mean $\bar X$: mean $\mu$, variance $\sigma^2/n$, standard error $SE=\sigma/\sqrt n$.
- CLT: for large $n$, $\dfrac{\bar X-\mu}{\sigma/\sqrt n}\approx N(0,1)$ whatever the shape of the data.
- Bernoulli sums: Binomial($n,p$) ≈ $N(np,\ np(1-p))$; standardise with $\sqrt{np(1-p)}$.
- CI for $\mu$, $\sigma$ known: $\bar x\pm z_{\alpha/2}\,\sigma/\sqrt n$.
- CI for $\mu$, $\sigma$ unknown, normal data: $\bar x\pm t_{\alpha/2,\,n-1}\,s/\sqrt n$.
- Width $=2\times$ margin; margin $\propto\sigma/\sqrt n$. Sample size: $n\ge(z\sigma/E)^2$, round **up**.
- **Interpretation**: $\mu$ is fixed. 95% is the long-run share of intervals (from repeated samples) that cover $\mu$.

## Shortcuts
| Change (others fixed) | Width |
|---|---|
| $n\times4$ | halves |
| higher confidence | wider |
| larger $\sigma$ | wider |

CI–test link: two-sided test at level $\alpha$ rejects $\mu_0$ iff $\mu_0$ is outside the $(1-\alpha)$ CI.

## Traps
1. **SD of a sum as $n\sigma$**: variances add, so SD is $\sigma\sqrt n$.
2. **SE as $\sigma/n$ or $\sigma^2/n$**: SE is $\sigma/\sqrt n$.
3. **Standardising with the variance** ($np(1-p)$) instead of its root.
4. **$z$ when $\sigma$ is unknown and $n$ small**: use $t_{n-1}$; df is $n-1$.
5. **"P($\mu$ in this interval) = 0.95"**: wrong; no probability on a fixed $\mu$.
6. **CI is about individual observations**: wrong; it targets $\mu$.
7. **NAT asks for one number**: enter the requested endpoint or width, not "a–b".

## Recall
- Sum: mean $n\mu$, SD $\sigma\sqrt n$
- $SE(\bar X)=\sigma/\sqrt n$
- Binomial ≈ $N(np,np(1-p))$
- $\bar x\pm z_{\alpha/2}\sigma/\sqrt n$; $\bar x\pm t_{n-1}s/\sqrt n$
- $z_{0.025}=1.96$, $z_{0.05}=1.645$
- $n\ge(z\sigma/E)^2$, round up
- 95% = coverage rate of the procedure
