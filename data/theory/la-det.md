# Determinants

## Core ideas
- $\det(AB)=\det A\det B$, $\det(A^T)=\det A$, $\det(A^{-1})=1/\det A$.
- $\det(cA)=c^n\det A$ for $n\times n$ $A$ (every row is scaled).
- Row operations: swap $\Rightarrow\times(-1)$; scale one row by $c\Rightarrow\times c$; add a multiple of another row $\Rightarrow$ no change.
- Triangular (or block triangular): determinant $=$ product of diagonal entries (blocks).
- $\det A=\prod\lambda_i$; $\det A=0\iff A$ singular $\iff0$ is an eigenvalue.
- $\det p(A)=\prod_i p(\lambda_i)$ for any polynomial $p$ (also for $A^{-1}$ terms).
- $\det(A-tI)=\chi(t)$; for $2\times2$: $\chi(t)=t^2-(\operatorname{tr}A)t+\det A$.
- $\det(\operatorname{adj}A)=(\det A)^{n-1}$.

## Shortcuts
| Expression ($n\times n$) | Value |
|---|---|
| $\det(cA^{-1})$ | $c^n/\det A$ |
| $\det(-A)$ | $(-1)^n\det A$ |
| $\det(A^kB^T)$ | $(\det A)^k\det B$ |
| $\det(A-I)$ | $\prod(\lambda_i-1)=\chi(1)$ |
| $\det(I+xx^T)$ | $1+x^Tx$ |
| skew-symmetric, $n$ odd | $0$ |

## Traps
1. **$\det(cA)=c\det A$.** Use $c^n$. Only scaling a *single row* gives a factor $c$.
2. **Plugging $\det A$ into $p$.** $\det(A^2+I)\neq(\det A)^2+1$; transform each eigenvalue, then multiply.
3. **Adding instead of multiplying.** $\det p(A)$ is a product of $p(\lambda_i)$, not a sum.
4. **Additivity.** $\det(A+B)\neq\det A+\det B$.
5. **Forgetting the row-swap sign** or treating row replacement as scaling.
6. **$\det(A^T)=-\det A$.** Transpose never changes the determinant.

## Recall
- $\det(cA)=c^n\det A$.
- $\det(A^{-1})=1/\det A$; $\det A^T=\det A$.
- $\det p(A)=\prod p(\lambda_i)$.
- $\det(\operatorname{adj}A)=(\det A)^{n-1}$.
- Swap: $-1$; scale row: $c$; row replacement: $1$.
- $\det(A-tI)$ at $t$ $=\prod(\lambda_i-t)$.
