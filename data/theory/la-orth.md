# Orthogonality, projections and quadratic forms

## Core ideas
- Projection onto line $a$: $P=\dfrac{aa^T}{a^Ta}$, $Px=\dfrac{a^Tx}{a^Ta}a$.
- Onto column space of full-column-rank $A$: $P=A(A^TA)^{-1}A^T$; residual $b-Pb\perp$ every column.
- **Orthogonal projection** $\iff P^2=P$ and $P^T=P$. Eigenvalues $0/1$; $\operatorname{rank}P=\operatorname{tr}P$; $I-P$ projects onto the complement.
- **Orthogonal matrix** $Q^TQ=I$: $\lVert Qx\rVert=\lVert x\rVert$, $\det Q=\pm1$, every eigenvalue has $|\lambda|=1$ (real ones $\pm1$). Products, inverses, transposes stay orthogonal; sums do not.
- Reflection $H=I-2uu^T$ ($\lVert u\rVert=1$): symmetric, orthogonal, eigenvalues $-1,1,\dots,1$.
- **Quadratic form** $x^TAx$ with symmetric $A$: put half of each cross coefficient off the diagonal ($ax^2+bxy+cy^2\to\begin{pmatrix}a&b/2\\b/2&c\end{pmatrix}$).
- PD $\iff$ all eigenvalues $>0$ $\iff$ all leading minors $>0$. PSD $\iff$ all eigenvalues $\ge0$.
- **Gram** $G=A^TA$ is always PSD ($x^TGx=\lVert Ax\rVert^2$); PD $\iff$ columns of $A$ independent.
- **Rayleigh**: $\lambda_{\min}\le\dfrac{x^TAx}{x^Tx}\le\lambda_{\max}$, attained at eigenvectors.

## Shortcuts
| Test | Quick check |
|---|---|
| $2\times2$ PD | $a_{11}>0$ and $\det>0$ |
| PSD not PD | $\det=0$ with non-negative diagonal |
| Indefinite | $\det<0$ (2×2), or diagonal entries of both signs |
| Max of $x^TAx$, $\lVert x\rVert=r$ | $r^2\lambda_{\max}$ |
| Diagonal entry $a_{ii}$ | lies in $[\lambda_{\min},\lambda_{\max}]$ |

## Traps
1. **Not halving the cross term.** $3x^2+4xy+2y^2$ uses off-diagonal $2$, not $4$.
2. **Dividing by $\lVert a\rVert$ instead of $\lVert a\rVert^2$** in a projection.
3. **Idempotent ⇒ orthogonal projection.** Needs symmetry too.
4. **Orthogonal ⇒ eigenvalues $\pm1$.** Rotations have complex $\lambda$ with $|\lambda|=1$.
5. **Positive entries ⇒ PD**, or **negative off-diagonal ⇒ not PD**. Use eigenvalues/minors.
6. **Max of $x^TAx$ = largest diagonal entry or largest $|\lambda|$.** It is $\lambda_{\max}$ with sign.
7. **Splitting $(A^TA)^{-1}$** when $A$ is not square.

## Recall
- $P=aa^T/(a^Ta)$; $P=A(A^TA)^{-1}A^T$.
- Orthogonal projection: $P^2=P=P^T$, rank $=$ trace.
- $Q^TQ=I\Rightarrow\det Q=\pm1$, $|\lambda|=1$.
- PD $\iff$ eigenvalues $>0$ $\iff$ leading minors $>0$.
- $A^TA$ PD $\iff$ independent columns.
- $\max_{\lVert x\rVert=1}x^TAx=\lambda_{\max}$, $\min=\lambda_{\min}$.
