# Support vector machines

## Core ideas
- Linear classifier $f(x) = w^\top x + b$; predict $\operatorname{sign} f(x)$.
- Distance of $x$ from the boundary: $|w^\top x + b|/\lVert w\rVert$ (Euclidean norm).
- Hard margin: $\min \frac12\lVert w\rVert^2$ s.t. $y_i(w^\top x_i + b) \ge 1$. Margin hyperplanes $f = \pm 1$, **width $2/\lVert w\rVert$**.
- Support vectors: points with $y_if(x_i) = 1$ ($\alpha_i > 0$). $w = \sum_i \alpha_i y_i x_i$; removing a non-support vector changes nothing.
- Two support vectors $x_+$, $x_-$ alone: $w \propto x_+ - x_-$, width $= \lVert x_+ - x_-\rVert$.
- Soft margin: $\min \frac12\lVert w\rVert^2 + C\sum\xi_i$, $\xi_i = \max(0, 1 - y_if(x_i))$ (hinge loss).
- $\xi = 0$: outside margin; $0 < \xi \le 1$: inside margin, correct side; $\xi > 1$: misclassified.
- Large $C$: narrow margin, few violations, high variance ($C \to \infty$ = hard margin). Small $C$: wide margin, more bias.
- Kernel $K(x, z) = \phi(x)^\top\phi(z)$; polynomial $(1 + x^\top z)^p$, RBF $\exp(-\gamma\lVert x - z\rVert^2)$ (infinite-dimensional). Valid kernels give symmetric PSD Gram matrices.

## Shortcuts
| Quantity | Formula |
|---|---|
| Margin width | $2/\lVert w\rVert$ |
| Half-width (boundary to SV) | $1/\lVert w\rVert$ |
| Point-to-boundary distance | $\lvert w^\top x + b\rvert/\lVert w\rVert$ |
| Hinge loss | $\max(0, 1 - yf)$ |
| Degree-2 poly features ($d = 2$) | 6 (with the 1) |

## Traps
1. Width $1/\lVert w\rVert$ (that is half) or $2/\lVert w\rVert^2$ (C4).
2. Using the $\ell_1$ norm $|w_1| + |w_2|$.
3. Forgetting to divide the score by $\lVert w\rVert$ when a distance is asked.
4. Counting only misclassified points in the hinge loss; points inside the margin also pay.
5. Perceptron loss $\max(0, -yf)$ instead of the hinge.
6. Direction of $C$: the hard margin is $C \to \infty$, not $C \to 0$.
7. RBF: using $\lVert x - z\rVert$ instead of $\lVert x - z\rVert^2$, or dropping $\gamma$.
8. Thinking $(cw, cb)$ is a different boundary.

## Recall
- Width $= 2/\lVert w\rVert$.
- Distance $= |w^\top x + b|/\lVert w\rVert$.
- SVs: $y_if(x_i) = 1$, $\alpha_i > 0$.
- Soft margin: $\frac12\lVert w\rVert^2 + C\sum \max(0, 1 - y_if_i)$.
- Large $C$ → narrow margin, overfit risk.
- Poly kernel $(1 + x^\top z)^p$; RBF $e^{-\gamma\lVert x-z\rVert^2}$.
