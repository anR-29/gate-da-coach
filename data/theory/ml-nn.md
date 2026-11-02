# Perceptrons and feed-forward neural networks

## Core ideas
- Perceptron: predict $\operatorname{sign}(w^\top x + b)$. Mistake when $y(w^\top x + b) \le 0$ (a score of 0 counts); update $w \leftarrow w + \eta y x$, $b \leftarrow b + \eta y$.
- Convergence (Novikoff): if $\lVert x_i\rVert \le R$ and some unit $w^*$ has margin $\gamma$, mistakes $\le (R/\gamma)^2$. Non-separable data (XOR) never converge.
- XOR needs a hidden layer: XOR = AND(OR, NAND), so two hidden threshold units and one output.
- Dense layer: $z = Wx + b$, $W$ is $n_{out} \times n_{in}$; parameters $n_{in} n_{out} + n_{out}$. Input layer has none.
- Activations: $\mathrm{ReLU}(z) = \max(0, z)$; $\sigma(z) = 1/(1 + e^{-z})$, $\sigma(0) = 0.5$, $\sigma' = \sigma(1 - \sigma) \le 0.25$.
- No nonlinearity: $W_3(W_2(W_1x + b_1) + b_2) + b_3$ is one affine map, so depth adds nothing.
- One hidden layer with enough nonlinear units approximates any continuous function on a compact set.
- Backprop: $\delta^{(L)} = \partial L/\partial z^{(L)}$; $\delta^{(l)} = (W^{(l+1)\top}\delta^{(l+1)}) \odot \phi'(z^{(l)})$; $\partial L/\partial W^{(l)} = \delta^{(l)} a^{(l-1)\top}$, $\partial L/\partial b^{(l)} = \delta^{(l)}$.
- ReLU gate: $\phi'(z) = 1$ if $z > 0$, else 0. A unit inactive on every input is dead: its weights never change.
- SGD step: $w \leftarrow w - \eta \nabla_w L$.

## Shortcuts
| Loss and output | $\partial L/\partial z$ (output pre-activation) |
|---|---|
| $\tfrac12(\hat y - y)^2$, linear output | $\hat y - y$ |
| $(\hat y - y)^2$, linear output | $2(\hat y - y)$ |
| Cross-entropy, sigmoid output | $p - y$ |
| Cross-entropy, softmax output | $p_k - y_k$ |
| $\tfrac12(p - y)^2$, sigmoid output | $(p - y)\,p(1 - p)$ |

| Network | Parameters |
|---|---|
| $n_0 \to n_1 \to \dots \to n_L$ | $\sum_l (n_{l-1} n_l + n_l)$ |
| $d \to H \to K$ | $(d + 1)H + (H + 1)K$ |

## Traps
1. Using the strict test $y(w^\top x + b) < 0$: from $w = 0$ nothing ever updates. Fix: zero counts as a mistake.
2. Subtracting $yx$ in the perceptron update. Fix: add $\eta y x$.
3. Skipping ReLU on a negative pre-activation, or forgetting it in the second layer. Fix: clip every hidden layer.
4. Passing gradient through an inactive ReLU (C9 dead ReLU). Fix: multiply by the 0/1 gate.
5. Multiplying by $\sigma'$ again with cross-entropy. Fix: sigmoid/softmax + CE gives $p - y$ directly.
6. Dropping the factor 2 when the loss has no ½, or adding it when it has one.
7. Counting units instead of weights, or forgetting biases. Fix: $n_{in} n_{out} + n_{out}$ per layer.
8. $W$ as $n_{in} \times n_{out}$ in $Wx$. Fix: rows are output units.
9. Moving along the gradient. Fix: SGD subtracts.

## Recall
- Perceptron: if $y(w^\top x + b) \le 0$: $w \mathrel{+}= \eta y x$, $b \mathrel{+}= \eta y$.
- Mistake bound $(R/\gamma)^2$; XOR is not linearly separable.
- Dense layer parameters: $n_{in} n_{out} + n_{out}$.
- Linear layers without activation collapse to one affine map.
- $\delta^{(l)} = (W^{(l+1)\top}\delta^{(l+1)}) \odot \phi'(z^{(l)})$; $\nabla_W = \delta a^\top$.
- ReLU$'$ = 1 if $z > 0$ else 0; dead ReLU gets zero gradient forever.
- Softmax/sigmoid + cross-entropy: $\partial L/\partial z = p - y$.
- $\sigma(0) = 0.5$, $\sigma'(0) = 0.25$.
