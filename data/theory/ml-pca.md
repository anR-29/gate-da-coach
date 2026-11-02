# PCA and dimensionality reduction

## Core ideas
- Center the data: $\tilde x_i = x_i - \bar x$. Covariance $C = \frac1n\sum_i \tilde x_i \tilde x_i^\top$ (or $\frac{1}{n-1}$; use what the question states).
- Principal components are orthonormal eigenvectors of $C$, sorted by eigenvalue $\lambda_1 \ge \lambda_2 \ge \dots$
- Variance of the data along PC $k$ is $\lambda_k$; PC1 maximizes $u^\top C u$ over unit $u$, and the maximum is $\lambda_{\max}$.
- Variance along any unit direction $u$: $u^\top C u$ (normalize $u$ first).
- Total variance $= \operatorname{trace}(C) = \sum_k \lambda_k$.
- Explained variance ratio of the top $k$: $\sum_{j \le k}\lambda_j / \sum_j \lambda_j$.
- Reconstruction from the top $k$ PCs: mean squared error $= \sum_{j > k}\lambda_j$.
- SVD route: centered $X = U\Sigma V^\top$; PCs = columns of $V$; $\lambda_k = \sigma_k^2/n$.
- PCA is unsupervised and not scale-invariant: standardize features with different units (correlation-matrix PCA).
- LDA is supervised: maximizes between-class over within-class scatter; at most $C - 1$ directions.

## Shortcuts
| Situation | Result |
|---|---|
| $2\times2$ $C$ | $\lambda = \frac{T}{2} \pm \sqrt{\frac{T^2}{4} - D}$, $T$ = trace, $D$ = det |
| Block-diagonal $C$ | eigenvalues of each block |
| Diagonal $C$ | PCs are the axes, $\lambda$ = diagonal entries |
| No centering | top direction ≈ mean vector |
| Scale a feature by $c$ | its variance × $c^2$; PCs tilt toward it |

## Traps
1. Reporting the largest diagonal entry, the trace or $\lambda_{\min}$ instead of $\lambda_{\max}$ (C6). Fix: solve for eigenvalues and take the largest.
2. Diagonal entries as eigenvalues when off-diagonal terms are nonzero.
3. Forgetting to center: the raw second-moment matrix gives different eigenvalues.
4. $n$ vs $n - 1$ divisor. Fix: use the one stated.
5. $u^\top C u$ with an unnormalized $u$ (C4).
6. Singular value vs eigenvalue: $\lambda = \sigma^2/n$, not $\sigma$.
7. Fraction lost vs fraction retained.
8. Expecting PCA to keep the class-separating direction. Fix: PCA ignores labels; use LDA.

## Recall
- Variance along PC1 = $\lambda_{\max}(C)$.
- Variance along unit $u$ = $u^\top C u$.
- Total variance = trace(C) = Σλ.
- Explained ratio (top $k$) = $\sum_{j\le k}\lambda_j / \sum\lambda_j$.
- Reconstruction MSE = sum of dropped eigenvalues.
- $\lambda_k = \sigma_k^2 / n$ for centered $X$.
- Always center; standardize if units differ.
- LDA: supervised, at most $C - 1$ directions; PCA: unsupervised, up to $d$.
