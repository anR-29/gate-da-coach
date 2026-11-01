# Mean, median, mode, covariance and correlation

## Core ideas
- Mean $\bar x=\frac1n\sum x_i$. Adding a point: new mean $=\frac{n\bar x+x_{new}}{n+1}$. Correcting a value: adjust the **total**, then divide.
- Median: sort, take the middle value (average the two middles for even $n$). Mode: most frequent value.
- Mean is sensitive to outliers; median and mode are not.
- $\mathrm{Cov}(X,Y)=E[XY]-E[X]E[Y]$; $\mathrm{Cov}(X,X)=\mathrm{Var}(X)$.
- $\rho=\dfrac{\mathrm{Cov}(X,Y)}{\sigma_X\sigma_Y}\in[-1,1]$ — divide by **SDs**.
- $\mathrm{Var}(aX+bY)=a^2\mathrm{Var}X+b^2\mathrm{Var}Y+2ab\,\mathrm{Cov}(X,Y)$.
- Independent ⇒ Cov $=0$. **Converse is false** (e.g. $X$ symmetric, $Y=X^2$).
- Exception: jointly normal and Cov $=0$ ⇒ independent.

## Shortcuts
| Statement | True? |
|---|---|
| independent ⇒ Cov = 0 | yes |
| Cov ≠ 0 ⇒ dependent | yes (contrapositive) |
| Cov = 0 ⇒ independent | no |
| dependent ⇒ Cov ≠ 0 | no |
| $\rho=0$ ⇒ no relation | no (only no **linear** relation) |

## Traps
1. **Averaging old mean with new point**: the old mean carries $n$ points of weight.
2. **Median without sorting**.
3. **Correlation divided by variances** instead of SDs.
4. **Cross-term sign**: $2ab\,\mathrm{Cov}$ with $a=2,b=-3,\mathrm{Cov}=-2$ is $+24$.
5. **Variances subtracted**: $\mathrm{Var}(X-Y)=\mathrm{Var}X+\mathrm{Var}Y-2\mathrm{Cov}$.
6. **Implication reversal in MSQs**: Cov $=0$ does not give independence.

## Recall
- New mean $=(n\bar x+x)/(n+1)$
- $\mathrm{Cov}=E[XY]-E[X]E[Y]$
- $\rho=\mathrm{Cov}/(\sigma_X\sigma_Y)$
- $\mathrm{Var}(aX+bY)=a^2\sigma_X^2+b^2\sigma_Y^2+2ab\,\mathrm{Cov}$
- Independent ⇒ Cov 0; not conversely
- Jointly normal: Cov 0 ⇔ independent
