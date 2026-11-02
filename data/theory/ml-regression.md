# Linear and ridge regression

## Core ideas
- Least squares minimises $\sum_i (y_i - \hat y_i)^2$; set each partial derivative to 0.
- **Through the origin** ($\hat y = wx$): $w = \dfrac{\sum x_iy_i}{\sum x_i^2}$. For $\hat y = w\,\phi(x)$: $w = \sum \phi_i y_i / \sum \phi_i^2$.
- **With intercept** ($\hat y = a + bx$): $b = \dfrac{S_{xy}}{S_{xx}} = \dfrac{\sum (x-\bar x)(y-\bar y)}{\sum (x-\bar x)^2}$, $a = \bar y - b\bar x$.
- Normal equations: $\sum y = na + b\sum x$, $\sum xy = a\sum x + b\sum x^2$; matrix form $X^\top X\beta = X^\top y$.
- Residual $e_i = y_i - \hat y_i$ (observed minus fitted). Always $\sum x_ie_i = 0$; with an intercept also $\sum e_i = 0$ and the line passes through $(\bar x, \bar y)$.
- $R^2 = 1 - SSE/SST = S_{xy}^2/(S_{xx}S_{yy}) = r^2$, in $[0, 1]$ on training data when an intercept is fitted.
- **Ridge**: minimise $\sum (y - wx)^2 + \lambda w^2$. 1-D: $w = \dfrac{\sum xy}{\sum x^2 + \lambda}$. Matrix: $w = (X^\top X + \lambda I)^{-1}X^\top y$ (always invertible for $\lambda > 0$).
- Larger $\lambda$: weights shrink toward 0 (never exactly 0), bias up, variance down, training error up. Standardise features; do not penalise the intercept.

## Shortcuts
| Quantity | Formula |
|---|---|
| SSE, no intercept | $\sum y^2 - (\sum xy)^2/\sum x^2$ |
| SSE, with intercept | $S_{yy} - S_{xy}^2/S_{xx}$ |
| $S_{xy}$ from raw sums | $\sum xy - n\bar x\bar y$ |
| Ridge shrink factor (diagonal $X^\top X$) | $d_j/(d_j + \lambda)$ |
| Ridge halves OLS (1-D) | $\lambda = \sum x^2$ |

## Traps
1. Using $S_{xy}/S_{xx}$ when the model has no intercept (or $\sum xy/\sum x^2$ when it has one). Read the model first.
2. Using $\sum y/\sum x$ as the slope. Least squares weights each point by $x$.
3. Feature $x^2$: the denominator is $\sum x^4$, not $\sum x^2$.
4. Intercept sign: $a = \bar y - b\bar x$, not $+$.
5. Reporting $r$ when $R^2$ is asked (or the reverse).
6. Residual sign: $y - \hat y$, not $\hat y - y$.
7. Ridge: adding $\lambda^2$ or $2\lambda$ instead of $\lambda$ (the 2s cancel).
8. Thinking ridge sets weights to exactly 0 (that is lasso).

## Recall
- Through origin: $w = \sum xy / \sum x^2$.
- With intercept: $b = S_{xy}/S_{xx}$, $a = \bar y - b\bar x$.
- Normal equations: $X^\top X\beta = X^\top y$.
- With intercept: $\sum e = 0$, line through $(\bar x, \bar y)$.
- $R^2 = 1 - SSE/SST = S_{xy}^2/(S_{xx}S_{yy})$.
- Ridge 1-D: $w = \sum xy/(\sum x^2 + \lambda)$.
- Ridge: $(X^\top X + \lambda I)^{-1}X^\top y$; larger $\lambda$ = more bias, less variance.
