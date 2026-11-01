# z, t and chi-squared hypothesis tests

## Core ideas
- Steps: parameter → $H_0$, $H_1$ (tail) → statistic and its null distribution → p-value or critical value → decision in words.
- Mean, $\sigma$ known (or large $n$): $z=\dfrac{\bar x-\mu_0}{\sigma/\sqrt n}$.
- Mean, $\sigma$ unknown, normal data: $t=\dfrac{\bar x-\mu_0}{s/\sqrt n}$ with $n-1$ df.
- Variance (normal data): $\chi^2=\dfrac{(n-1)s^2}{\sigma_0^2}$ with $n-1$ df.
- Counts: $\chi^2=\sum\dfrac{(O-E)^2}{E}$ (goodness of fit: $k-1$ df; $r\times c$ table: $(r-1)(c-1)$ df).
- p-value $=P(\text{statistic at least as extreme as observed}\mid H_0)$. Reject $H_0$ iff $p\le\alpha$.
- Type I: reject a true $H_0$ (prob $\alpha$). Type II: fail to reject when $H_1$ is true (prob $\beta$). Power $=1-\beta$.
- Estimators: unbiased if $E[\hat\theta]=\theta$. $\bar X$ unbiased, $\mathrm{Var}(\bar X)=\sigma^2/n$; $s^2$ (divide by $n-1$) unbiased.

## Shortcuts
| Question about | Test |
|---|---|
| mean, $\sigma$ known | $z$ |
| mean, $\sigma$ unknown | $t_{n-1}$ |
| one variance | $\chi^2_{n-1}$ |
| fit / independence of counts | $\chi^2$ |

| Tail | p-value |
|---|---|
| $H_1:\mu>\mu_0$ | $P(Z\ge z)$ |
| $H_1:\mu<\mu_0$ | $P(Z\le z)$ |
| two-sided | $2P(Z\ge\lvert z\rvert)$ |

## Traps
1. **$\chi^2$ for a mean**: $\chi^2$ tests variances and counts, not means.
2. **p-value = P($H_0$ true)**: wrong; it is computed assuming $H_0$.
3. **"Accept $H_0$"**: say "fail to reject"; not rejecting is not proof.
4. **Reject when $p>\alpha$**: direction reversed.
5. **Wrong tail** for one-sided tests; **forgetting to double** for two-sided.
6. **Power under $H_0$**: power is computed under $H_1$.
7. **$\alpha+\beta=1$**: false.
8. **Bias vs variance**: larger $n$ shrinks $\mathrm{Var}(\bar X)$ like $1/n$; bias was already 0.

## Recall
- $z=(\bar x-\mu_0)/(\sigma/\sqrt n)$; $t=(\bar x-\mu_0)/(s/\sqrt n)$, df $n-1$
- $\chi^2=(n-1)s^2/\sigma_0^2$; $\chi^2=\sum(O-E)^2/E$
- Reject $H_0$ iff $p\le\alpha$
- $\alpha=P(\text{reject}\mid H_0)$, power $=P(\text{reject}\mid H_1)$
- Smaller $\alpha$ ⇒ larger $\beta$; larger $n$ ⇒ more power
- $E[\bar X]=\mu$, $\mathrm{Var}(\bar X)=\sigma^2/n$
- $\frac1n\sum(X_i-\bar X)^2$ is biased; use $n-1$
