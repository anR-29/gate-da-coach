# Normal, standard normal, t and chi-squared

## Core ideas
- $X\sim N(\mu,\sigma^2)$: the second parameter is the **variance**. Standardise with the SD: $Z=(X-\mu)/\sigma$.
- $P(a<X<b)=\Phi\!\left(\frac{b-\mu}{\sigma}\right)-\Phi\!\left(\frac{a-\mu}{\sigma}\right)$; $\Phi(-z)=1-\Phi(z)$.
- $aZ+b\sim N(b,a^2)$; in general $E[aX+b]=a\mu+b$, $\mathrm{Var}=a^2\sigma^2$.
- $E[Z^2]=1$, $E[Z^4]=3$, so $\mathrm{Var}(Z^2)=2$.
- $\chi^2_k=\sum_{i=1}^kZ_i^2$ (independent): mean $k$, variance $2k$; df add for independent sums.
- If $X_i\sim N(0,\sigma^2)$: $X_i^2=\sigma^2Z_i^2$, variance $2\sigma^4$.
- $t_k=Z/\sqrt{V/k}$ with $V\sim\chi^2_k$ independent; heavier tails than $N(0,1)$, tends to $N(0,1)$ as $k\to\infty$.
- Sample (normal data): $(n-1)s^2/\sigma^2\sim\chi^2_{n-1}$; $(\bar X-\mu)/(s/\sqrt n)\sim t_{n-1}$.

## Shortcuts
| Fact | Value |
|---|---|
| $\Phi(1),\Phi(2),\Phi(3)$ | 0.8413, 0.9772, 0.9987 |
| $z_{0.025}$, $z_{0.05}$ | 1.96, 1.645 |
| median of a normal | $\mu$ |
| $E[W^2]$ | $\mathrm{Var}(W)+(E[W])^2$ |

## Traps
1. **Dividing by $\sigma^2$**: for $N(50,16)$, $\sigma=4$.
2. **Wrong tail**: $P(X>c)=1-\Phi(z)$.
3. **Lower-bound sign**: $z=-1$ contributes $\Phi(-1)=0.1587$, not $\Phi(1)$.
4. **$a$ not squared** in $\mathrm{Var}(aZ+b)$.
5. **$\mathrm{Var}(Z^2)=1$**: that is $E[Z^2]$; the variance is 2.
6. **$(Z_1+Z_2+Z_3)^2$ is not $\chi^2_3$**: it is $3\chi^2_1$.
7. **Scaling chi-square by $\sigma^2$** instead of $\sigma^4$ for variance.

## Recall
- $Z=(X-\mu)/\sigma$
- $\Phi(-z)=1-\Phi(z)$
- $aZ+b\sim N(b,a^2)$
- $E[Z^2]=1$, $E[Z^4]=3$, $\mathrm{Var}(Z^2)=2$
- $\chi^2_k$: mean $k$, var $2k$
- $t_k=Z/\sqrt{\chi^2_k/k}$
- $(n-1)s^2/\sigma^2\sim\chi^2_{n-1}$
