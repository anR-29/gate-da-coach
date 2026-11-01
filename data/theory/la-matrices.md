# Matrices, partitions and special matrices

## Core ideas
- **Symmetric** $A^T=A$: real eigenvalues, orthogonal eigenvectors, always diagonalizable.
- **Skew-symmetric** $A^T=-A$: zero diagonal; $\det A=0$ for odd $n$; eigenvalues $0$ or purely imaginary.
- **Orthogonal** $Q^TQ=I$: $Q^{-1}=Q^T$, $\det Q=\pm1$, length preserving.
- **Idempotent** $A^2=A$: eigenvalues $0/1$, $\operatorname{rank}=\operatorname{tr}$, $I-A$ also idempotent, singular unless $A=I$.
- **Nilpotent** $N^k=0$: all eigenvalues $0$, $\operatorname{tr}N=\det N=0$, $I+N$ invertible; non-zero nilpotent is never symmetric.
- Every square $A=\tfrac12(A+A^T)+\tfrac12(A-A^T)$ (symmetric + skew).
- **Block products** follow the scalar pattern but keep the order: $\begin{pmatrix}A&B\\0&D\end{pmatrix}^{-1}=\begin{pmatrix}A^{-1}&-A^{-1}BD^{-1}\\0&D^{-1}\end{pmatrix}$.
- $\det\begin{pmatrix}A&B\\0&D\end{pmatrix}=\det A\cdot\det D$.
- $AB=\sum_i a_ib_i^T$ (columns of $A$ times rows of $B$).

## Shortcuts
| Rule | Form |
|---|---|
| Transpose of product | $(AB)^T=B^TA^T$ |
| Inverse of product | $(AB)^{-1}=B^{-1}A^{-1}$ |
| Swap transpose and inverse | $(A^T)^{-1}=(A^{-1})^T$ |
| Scalar | $(cA)^{-1}=\tfrac1cA^{-1}$ |
| $A^2-sA+pI=0$ | $A^{-1}=\tfrac1p(sI-A)$ |
| $\begin{pmatrix}I&B\\0&I\end{pmatrix}^k$ | $\begin{pmatrix}I&kB\\0&I\end{pmatrix}$ |

## Traps
1. **$(AB)^{-1}=A^{-1}B^{-1}$.** Reverse the order.
2. **$(cA)^{-1}=cA^{-1}$.** Divide by $c$, do not multiply.
3. **Copying $A^{-1}$'s entries onto $A$.** Entries of an inverse are not reciprocals of entries; invert the whole matrix.
4. **$(A+B)^{-1}=A^{-1}+B^{-1}$.** False even for $A=B=I$.
5. **Product of symmetric matrices is symmetric.** Only if they commute.
6. **Idempotent ⇒ symmetric.** $\begin{pmatrix}1&1\\0&0\end{pmatrix}$ is idempotent, not symmetric.
7. **Block order.** $D^{-1}BA^{-1}$ may not even be defined.

## Recall
- $(AB)^T=B^TA^T$, $(AB)^{-1}=B^{-1}A^{-1}$.
- $(cA)^{-1}=c^{-1}A^{-1}$.
- Skew-symmetric, odd $n$: $\det=0$.
- Idempotent: eigenvalues $0,1$; rank $=$ trace.
- Nilpotent: eigenvalues all $0$; $I+N$ invertible.
- $\det\begin{pmatrix}A&B\\0&D\end{pmatrix}=\det A\det D$.
- $AB=\sum_i(\text{col}_i A)(\text{row}_i B)$.
