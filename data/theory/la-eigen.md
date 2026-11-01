# Eigenvalues and eigenvectors

## Core ideas
- $Av=\lambda v$, $v\neq0$. Eigenvalues solve $\det(A-\lambda I)=0$.
- $\sum\lambda_i=\operatorname{tr}A$, $\prod\lambda_i=\det A$. Use both to find missing eigenvalues and to **check** any answer.
- Triangular $A$: eigenvalues are the diagonal entries. **Not** true for other matrices.
- Same eigenvector $v$: $A^k\to\lambda^k$, $A^{-1}\to1/\lambda$, $A+cI\to\lambda+c$, $cA\to c\lambda$, $p(A)\to p(\lambda)$, $(A-cI)^{-1}\to1/(\lambda-c)$.
- Rank one $uv^T$: eigenvalues $v^Tu$ and $0$ ($n-1$ times); $(uv^T)^k=(v^Tu)^{k-1}uv^T$. If $v^Tu=0$ it is nilpotent.
- $I+xx^T$: eigenvalues $1+x^Tx$ and $1$ ($n-1$ times). All-ones $J_n$: $n,0,\dots,0$.
- **AM** = multiplicity as a root; **GM** $=n-\operatorname{rank}(A-\lambda I)$; $1\le$ GM $\le$ AM.
- Diagonalizable $\iff$ GM $=$ AM for every eigenvalue. Distinct eigenvalues or symmetric $\Rightarrow$ diagonalizable.
- Equal row sums $s\Rightarrow A\mathbf{1}=s\mathbf{1}$ (eigenvalue $s$). Equal column sums $\Rightarrow s$ is an eigenvalue of $A$ too (via $A^T$).

## Shortcuts
| Given | Do |
|---|---|
| $2\times2$ | $\lambda^2-(\operatorname{tr})\lambda+\det=0$ |
| $3\times3$, one eigenvalue known | other two: sum $=\operatorname{tr}-\lambda_1$, product $=\det/\lambda_1$ |
| Candidate eigenvector | compute $Av$, test proportionality |
| $\det A=0$ | $0$ is an eigenvalue |
| $A-\lambda I$ all rows equal | GM $=n-1$ |

## Traps
1. **Diagonal of a non-triangular matrix.** $\begin{pmatrix}1&2\\3&2\end{pmatrix}$ has $4,-1$, not $1,2$. Check trace and det.
2. **GM = rank.** GM $=n-\operatorname{rank}(A-\lambda I)$; reduce before counting pivots.
3. **GM = AM by default.** Repeated eigenvalues need the rank check.
4. **Rank-one eigenvalue $=\lVert u\rVert\lVert v\rVert$ or $\lVert u\rVert^2$.** It is $v^Tu$; $\lVert u\rVert\lVert v\rVert$ is the singular value.
5. **Transforming only the largest $\lambda$.** For $(A-4I)^2$ the largest value can come from the smallest $\lambda$.
6. **Skipping scaled vectors in MSQ.** $2v$ is an eigenvector whenever $v$ is.
7. **No cross-check.** Always confirm $\sum\lambda=\operatorname{tr}$, $\prod\lambda=\det$.

## Recall
- $\sum\lambda_i=\operatorname{tr}A$, $\prod\lambda_i=\det A$.
- GM $=n-\operatorname{rank}(A-\lambda I)\le$ AM.
- Eigenvalues of $uv^T$: $v^Tu$, $0,\dots,0$.
- $\det(I+xx^T)=1+x^Tx$.
- $f(A)$ has eigenvalues $f(\lambda_i)$, same eigenvectors.
- Row sums all $s\Rightarrow s$ is an eigenvalue, eigenvector $\mathbf{1}$.
- Diagonalizable $\iff$ GM $=$ AM for all $\lambda$.
