# Conditional expectation, variance and total variance

## Core ideas
- $E[X\mid Y]$ is a function of $Y$ (a random variable); $E[X\mid Y=y]$ is a number.
- Law of total expectation: $E[X]=E\big[E[X\mid Y]\big]=\sum_y E[X\mid Y=y]P(Y=y)$.
- Law of total variance: $\mathrm{Var}(X)=\underbrace{E[\mathrm{Var}(X\mid Y)]}_{\text{within}}+\underbrace{\mathrm{Var}(E[X\mid Y])}_{\text{between}}$.
- Both parts are $\ge0$, so $\mathrm{Var}(X)\ge E[\mathrm{Var}(X\mid Y)]$.
- If $E[X\mid Y]$ is constant, the between part is 0; if $X$ is a function of $Y$, the within part is 0.
- Random sums: $N$ random, $X_i$ iid mean $\mu$: $E\big[\sum_{i=1}^N X_i\big]=E[N]\mu$.

## Shortcuts
| Mixture with weights $w_i$, means $m_i$, variances $v_i$ | Formula |
|---|---|
| mean | $\bar m=\sum w_im_i$ |
| within | $\sum w_iv_i$ |
| between | $\sum w_i(m_i-\bar m)^2$ |
| total | within + between |

Poisson($N$) given $N$: $\mathrm{Var}(X)=E[N]+\mathrm{Var}(N)$.

## Traps
1. **Unweighted average** of group means: use the group probabilities.
2. **Swapped weights**: match each weight to its own group.
3. **Only within** (averaging variances) or **only between**: total needs both.
4. **Adding group variances**: $4+4=8$ is not the mixture variance.
5. **Plugging one value of $Y$** into $E[X\mid Y]$ instead of averaging over $Y$.
6. **Forgetting the inner expectation** in two-stage experiments (die then coins: $E[k/2]$, not $E[k]$).

## Recall
- $E[X]=E[E[X\mid Y]]$
- $\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]+\mathrm{Var}(E[X\mid Y])$
- Within = $\sum w_iv_i$; between = $\sum w_i(m_i-\bar m)^2$
- $E[\sum_{i=1}^NX_i]=E[N]E[X]$
- $\mathrm{Var}(X)\ge E[\mathrm{Var}(X\mid Y)]$
