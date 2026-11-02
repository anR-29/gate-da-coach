# Naive Bayes and LDA

## Core ideas
- Bayes rule for classification: $P(c \mid x) = \dfrac{P(c)P(x \mid c)}{\sum_{c'} P(c')P(x \mid c')}$. Predict the class with the largest numerator.
- **Naive Bayes** assumes features are independent *given the class*: $P(x \mid c) = \prod_j P(x_j \mid c)$.
- Estimates: $P(c) = n_c/n$; $P(x_j = v \mid c) = $ count of $v$ in class $c$ $/ n_c$.
- **Laplace smoothing**: $P(w \mid c) = \dfrac{\text{count}(w, c) + 1}{N_c + V}$ ($V$ = number of possible values / vocabulary size). Binary feature: $V = 2$.
- Probability the prediction is wrong at $x$: $1 - \max_c P(c \mid x)$.
- **LDA**: class densities $N(\mu_k, \Sigma)$ with one shared $\Sigma$; the quadratic terms cancel, so the boundary is linear. Different $\Sigma_k$ gives QDA (quadratic).
- Fisher direction: $w \propto S_W^{-1}(\mu_1 - \mu_2)$; maximises $\dfrac{(w^\top(\mu_1-\mu_2))^2}{w^\top S_W w}$.
- 1-D, equal variance $\sigma^2$: threshold $t = \dfrac{\mu_1 + \mu_2}{2} + \dfrac{\sigma^2\ln(\pi_1/\pi_2)}{\mu_2 - \mu_1}$ (the larger prior gains territory).
- LDA gives at most $K - 1$ discriminant directions; it is supervised (PCA is not).

## Shortcuts
| Step | Do this |
|---|---|
| NB posterior | multiply prior × likelihoods per class, then normalise |
| Compare two classes | ratio of scores; the denominator cancels |
| 2×2 inverse | $\frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$ |
| Equal priors, equal variance | threshold = midpoint of the means |

## Traps
1. Dropping the prior $P(c)$ (C7). Imbalanced classes change the answer.
2. Stopping at the unnormalised score instead of the posterior.
3. Reporting $\max$ posterior when the error probability $1 - \max$ is asked.
4. Laplace: adding 1 (or 2) to the denominator instead of $V$.
5. Confusing conditional independence (NB) with marginal independence.
6. Fisher: using $\mu_1 - \mu_2$ without $S_W^{-1}$, or multiplying by $S_W$.
7. LDA threshold: shifting toward the more likely class's mean (wrong way), or using $\sigma$ for $\sigma^2$.
8. Fisher criterion: forgetting to square the mean difference.

## Recall
- $P(c \mid x) \propto P(c)\prod_j P(x_j \mid c)$.
- Laplace: $(\text{count} + 1)/(N_c + V)$.
- Error at $x$ = $1 - \max_c P(c \mid x)$.
- Fisher: $w \propto S_W^{-1}(\mu_1 - \mu_2)$.
- Shared covariance → linear boundary (LDA); separate → quadratic (QDA).
- 1-D threshold: midpoint $+ \sigma^2\ln(\pi_1/\pi_2)/(\mu_2 - \mu_1)$.
- LDA: at most $K - 1$ directions.
