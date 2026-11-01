# LU and singular value decomposition

## Core ideas
- **LU (Doolittle):** $A=LU$, $L$ unit lower triangular holding the multipliers $l_{ij}=$ (entry to clear)/(pivot), $U$ = the eliminated upper-triangular matrix.
- Exists without row swaps iff every leading pivot is non-zero (all leading principal minors $\neq0$ for invertible $A$). Otherwise use $PA=LU$.
- $\det A=\prod u_{ii}$. Solve $Ax=b$ by $Ly=b$ (forward) then $Ux=y$ (back).
- **SVD:** $A=U\Sigma V^T$, $U,V$ orthogonal, $\Sigma$ diagonal with $\sigma_1\ge\sigma_2\ge\dots\ge0$.
- $\sigma_i=\sqrt{\lambda_i(A^TA)}$; $A^TA$ and $AA^T$ share their non-zero eigenvalues.
- $\operatorname{rank}A=$ number of non-zero singular values.
- $\lVert A\rVert_2=\sigma_1=\max_{\lVert x\rVert=1}\lVert Ax\rVert$; $\lVert A\rVert_F^2=\sum a_{ij}^2=\sum\sigma_i^2$.
- Square $A$: $|\det A|=\prod\sigma_i$.
- Rank one $uv^T$: single singular value $\lVert u\rVert\lVert v\rVert$.
- Symmetric: $\sigma_i=|\lambda_i|$; symmetric PSD: $\sigma_i=\lambda_i$.

## Shortcuts
| Situation | Shortcut |
|---|---|
| $2\times2$ LU | $l_{21}=a_{21}/a_{11}$, $u_{22}=a_{22}-l_{21}a_{12}$ |
| Entry of $LU$ | row $i$ of $L$ · column $j$ of $U$ (all terms) |
| $\sigma$ of $2\times2$ | $\sigma_1\sigma_2=|\det A|$, $\sigma_1^2+\sigma_2^2=\sum a_{ij}^2$ |
| Equal columns | rank 1, one non-zero $\sigma$ |

## Traps
1. **Copying $a_{22}$ into $U$** without subtracting $l_{21}u_{12}$; or adding instead of subtracting.
2. **Singular ⇒ no LU.** $\begin{pmatrix}1&1\\1&1\end{pmatrix}$ has an LU; a zero pivot with a non-zero entry below is the real obstacle.
3. **Singular values = eigenvalues.** Only for symmetric PSD; $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ has $\lambda=0,0$, $\sigma=1,0$.
4. **Forgetting the square root** of $\lambda(A^TA)$.
5. **Negative singular values.** Always $\sigma\ge0$ (use $|\lambda|$ for symmetric).
6. **Rank-one $\sigma$ split as $\lVert u\rVert,\lVert v\rVert$.** It is their product.
7. **Arithmetic slips in products.** Write every term $l_{ik}u_{kj}$ with its sign.

## Recall
- $\det A=\prod u_{ii}$ in $A=LU$.
- $\sigma_i=\sqrt{\lambda_i(A^TA)}$.
- rank $=$ number of $\sigma_i>0$.
- $\sigma(uv^T)=\lVert u\rVert\lVert v\rVert$.
- Symmetric PSD: $\sigma=\lambda$; symmetric: $\sigma=|\lambda|$.
- $\lVert A\rVert_F^2=\sum\sigma_i^2$; $\lVert A\rVert_2=\sigma_1$.
