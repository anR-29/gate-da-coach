# Decision trees and the bias–variance trade-off

## Core ideas
- Entropy (bits): $H = -\sum_i p_i\log_2 p_i$. Binary: max 1 at $p = 0.5$; 0 for a pure node.
- Gini: $G = 1 - \sum_i p_i^2$. Binary: $2p(1-p)$, max 0.5.
- Misclassification error: $1 - \max_i p_i$ (too coarse to rank splits well).
- Information gain $= H(\text{parent}) - \sum_k \frac{n_k}{n}H(\text{child}_k)$; Gini decrease is the same with $G$.
- Choose the split with the largest gain. Gain $\ge 0$ always (concavity).
- Raw gain prefers many-valued attributes (IDs); C4.5 uses gain ratio.
- Expected test error at $x_0$: $E[(y - \hat f)^2] = \text{bias}^2 + \text{variance} + \sigma^2_{\text{noise}}$.
- High bias (underfit): training and test error both high and close. High variance (overfit): low training error, big gap to test error.
- More complexity: bias down, variance up; test error is U-shaped, training error falls steadily.
- Variance reducers: more data, regularisation (larger $\lambda$, smaller SVM $C$), larger $k$ in k-NN, shallower trees, bagging.

## Shortcuts
| $p$ (binary) | $H$ (bits) | Gini |
|---|---|---|
| 0.5 | 1 | 0.5 |
| 0.25 | 0.811 | 0.375 |
| 1/3 | 0.918 | 0.444 |
| 1/6 | 0.650 | 0.278 |
| 0.1 | 0.469 | 0.18 |

## Traps
1. Natural log instead of $\log_2$ for entropy in bits.
2. Averaging child impurities equally; weight by child size $n_k/n$.
3. Reporting the weighted child impurity instead of the gain (parent minus it).
4. Gini written as $\sum p_i^2$ (forgot $1 -$).
5. Thinking binary Gini can reach 1.
6. Bias–variance: adding the noise SD (not variance), or the bias unsquared (C4).
7. Variance of $cX$ is $c^2\mathrm{Var}(X)$, not $c\,\mathrm{Var}(X)$.
8. Prescribing more data for a high-bias model, or less capacity for an underfit one.

## Recall
- $H = -\sum p\log_2 p$; $G = 1 - \sum p^2$.
- Gain = parent − weighted children.
- Binary max: $H = 1$, $G = 0.5$.
- MSE = bias² + variance + noise.
- Underfit: both errors high; overfit: big train–test gap.
- Complexity up: bias down, variance up.
