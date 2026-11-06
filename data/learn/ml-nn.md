# Perceptrons and feed-forward neural networks

> **Time:** ~40 min · **Pehle aana chahiye:** vectors ka dot product, matrix × vector, chain rule of derivatives, logistic regression ka sigmoid · **Day:** 50, 51

## Ye topic kyun?

Neural network chhote-chhote "neurons" ko layers me jodkar banta hai; har neuron weighted sum leta hai aur ek simple function (activation) lagata hai. GATE DA isse calculation-heavy tareeke se poochta hai: perceptron ke updates trace karo (NAT), forward pass karke output nikaalo (NAT), parameters gino (NAT), backprop se ek gradient nikaalo (NAT, 2 marks), aur XOR / linear layers / dead ReLU / cross-entropy par concept MCQ-MSQ. Sab mechanical hai — rules pakke ho gaye to marks pakke.

## Picture se samjho

Perceptron ek seedhi line (2D me) ya plane (zyada dimensions me) kheenchta hai: line ke ek taraf "+1", doosri taraf "−1". Sawaal: kya har pattern ek line se alag ho sakta hai? XOR dekho.

<figure class="fig">
<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="200" x2="230" y2="200" stroke="currentColor"/>
<line x1="60" y1="220" x2="60" y2="40" stroke="currentColor"/>
<text x="224" y="216" style="fill:currentColor" font-size="12">x₁</text>
<text x="40" y="44" style="fill:currentColor" font-size="12">x₂</text>
<line x1="48" y1="128" x2="132" y2="212" style="stroke:var(--info)" stroke-dasharray="5 4"/>
<line x1="108" y1="68" x2="192" y2="152" style="stroke:var(--info)" stroke-dasharray="5 4"/>
<circle cx="60" cy="200" r="8" style="fill:var(--bad)"/>
<circle cx="180" cy="80" r="8" style="fill:var(--bad)"/>
<circle cx="180" cy="200" r="8" style="fill:var(--good)"/>
<circle cx="60" cy="80" r="8" style="fill:var(--good)"/>
<text x="66" y="194" style="fill:currentColor" font-size="11">(0,0)</text>
<text x="188" y="76" style="fill:currentColor" font-size="11">(1,1)</text>
<text x="188" y="196" style="fill:currentColor" font-size="11">(1,0)</text>
<text x="68" y="76" style="fill:currentColor" font-size="11">(0,1)</text>
<text x="134" y="226" style="fill:currentColor" font-size="11">x₁+x₂=0.5 (OR)</text>
<text x="196" y="160" style="fill:currentColor" font-size="11">x₁+x₂=1.5 (NAND)</text>
<circle cx="340" cy="70" r="7" style="fill:var(--good)"/><text x="354" y="74" style="fill:currentColor" font-size="12">XOR = 1</text>
<circle cx="340" cy="98" r="7" style="fill:var(--bad)"/><text x="354" y="102" style="fill:currentColor" font-size="12">XOR = 0</text>
<text x="330" y="140" style="fill:currentColor" font-size="12">Ek line se green/red</text>
<text x="330" y="158" style="fill:currentColor" font-size="12">alag nahi ho sakte.</text>
<text x="330" y="184" style="fill:currentColor" font-size="12">Do lines ki patti (strip)</text>
<text x="330" y="202" style="fill:currentColor" font-size="12">ke andar = XOR = 1.</text>
</svg>
<figcaption>XOR: diagonal pattern. Ek line kaafi nahi, do lines (OR aur NAND) milkar kaam karti hain.</figcaption>
</figure>

Dhyan do: green points (0,1) aur (1,0) ek diagonal par hain, red points doosre diagonal par. Koi bhi ek seedhi line inhe alag nahi kar sakti — isliye single perceptron XOR nahi seekh sakta. Lekin do lines ki patti ke andar exactly green points hain: "OR bhi true, NAND bhi true" = XOR. Yahi hidden layer ka kaam hai: pehle naye features (OR, NAND) banao, phir unpar ek line (AND).

<figure class="fig">
<svg viewBox="0 0 470 240" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="80" x2="220" y2="50" stroke="currentColor" opacity="0.6"/><line x1="60" y1="80" x2="220" y2="120" stroke="currentColor" opacity="0.6"/><line x1="60" y1="80" x2="220" y2="190" stroke="currentColor" opacity="0.6"/>
<line x1="60" y1="160" x2="220" y2="50" stroke="currentColor" opacity="0.6"/><line x1="60" y1="160" x2="220" y2="120" stroke="currentColor" opacity="0.6"/><line x1="60" y1="160" x2="220" y2="190" stroke="currentColor" opacity="0.6"/>
<line x1="220" y1="50" x2="380" y2="120" stroke="currentColor" opacity="0.6"/><line x1="220" y1="120" x2="380" y2="120" stroke="currentColor" opacity="0.6"/><line x1="220" y1="190" x2="380" y2="120" stroke="currentColor" opacity="0.6"/>
<circle cx="60" cy="80" r="18" style="fill:var(--info)"/><text x="52" y="85" style="fill:currentColor" font-size="13">x₁</text>
<circle cx="60" cy="160" r="18" style="fill:var(--info)"/><text x="52" y="165" style="fill:currentColor" font-size="13">x₂</text>
<circle cx="220" cy="50" r="18" style="fill:var(--mark)"/><text x="212" y="55" style="fill:currentColor" font-size="13">h₁</text>
<circle cx="220" cy="120" r="18" style="fill:var(--mark)"/><text x="212" y="125" style="fill:currentColor" font-size="13">h₂</text>
<circle cx="220" cy="190" r="18" style="fill:var(--mark)"/><text x="212" y="195" style="fill:currentColor" font-size="13">h₃</text>
<circle cx="380" cy="120" r="18" style="fill:var(--good)"/><text x="373" y="125" style="fill:currentColor" font-size="13">ŷ</text>
<text x="30" y="225" style="fill:currentColor" font-size="12">input (2): 0 params</text>
<text x="160" y="232" style="fill:currentColor" font-size="12">W₁: 3×2 = 6, b₁: 3 → 9</text>
<text x="330" y="170" style="fill:currentColor" font-size="12">W₂: 1×3 = 3</text>
<text x="330" y="186" style="fill:currentColor" font-size="12">b₂: 1 → 4</text>
<text x="330" y="212" style="fill:currentColor" font-size="12">total = 13</text>
</svg>
<figcaption>2 → 3 → 1 network. Har line ek weight hai; har non-input neuron ka ek bias.</figcaption>
</figure>

Dhyan do: lines gino — 2×3 = 6 aur 3×1 = 3, total 9 weights. Biases sirf hidden aur output neurons par: 3 + 1 = 4. Total parameters 13. Input layer ke paas koi parameter nahi.

<figure class="fig">
<svg viewBox="0 0 450 190" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="150" x2="200" y2="150" stroke="currentColor"/><line x1="110" y1="170" x2="110" y2="40" stroke="currentColor"/>
<polyline points="20,150 110,150 190,70" fill="none" style="stroke:var(--mark)" stroke-width="3"/>
<text x="40" y="60" style="fill:currentColor" font-size="13">ReLU(z) = max(0, z)</text>
<text x="30" y="142" style="fill:currentColor" font-size="11">slope 0</text>
<text x="160" y="118" style="fill:currentColor" font-size="11">slope 1</text>
<text x="190" y="166" style="fill:currentColor" font-size="11">z</text>
<line x1="240" y1="150" x2="420" y2="150" stroke="currentColor"/><line x1="330" y1="170" x2="330" y2="40" stroke="currentColor"/>
<line x1="240" y1="50" x2="420" y2="50" stroke="currentColor" stroke-dasharray="4 4" opacity="0.6"/>
<polyline points="250,148.2 290,138.1 310,123.1 330,100 350,76.9 370,61.9 410,51.8" fill="none" style="stroke:var(--info)" stroke-width="3"/>
<circle cx="330" cy="100" r="4" style="fill:var(--bad)"/>
<text x="336" y="104" style="fill:currentColor" font-size="11">σ(0) = 0.5</text>
<text x="252" y="44" style="fill:currentColor" font-size="11">1</text>
<text x="260" y="30" style="fill:currentColor" font-size="13">σ(z) = 1/(1+e⁻ᶻ)</text>
<text x="410" y="166" style="fill:currentColor" font-size="11">z</text>
</svg>
<figcaption>Do common activations. ReLU negative ko 0 kar deta hai; sigmoid har z ko (0, 1) me daba deta hai.</figcaption>
</figure>

Dhyan do: ReLU ki slope do hi values leti hai — 0 (z < 0) ya 1 (z > 0). Backprop me yahi slope ek "gate" banti hai. Sigmoid ki slope beech me (z = 0) sabse zyada 0.25 hai, aur dono kinaron par lagbhag 0 (saturation).

## Concept step-by-step

### 1. Perceptron: prediction aur mistake

Perceptron ek score banata hai $s = w^\top x + b$ aur predict karta hai $\operatorname{sign}(s)$. Labels $y \in \{+1, -1\}$.

Mistake kab? Jab $y \cdot s \le 0$. Agar $y = +1$ aur $s$ positive, product positive (sahi). Agar sign ulta ho ya $s = 0$ ho, product $\le 0$ (mistake). **Score 0 bhi mistake gina jaata hai.**

Kyun? Shuru me $w = 0, b = 0$ hota hai, to har score 0 hai. Agar "strictly < 0" ko mistake maano to kabhi update hi nahi hoga aur perceptron kuch seekhega hi nahi.

Tiny example: $w = (1, -1)$, $b = 0$, point $x = (2, 2)$, $y = +1$. $s = 2 - 2 = 0$, $y s = 0 \le 0$ → mistake.

Dhyan do: condition $y(w^\top x + b) \le 0$ hai, sirf $w^\top x + b \le 0$ nahi — $y$ se multiply karna zaroori hai.

### 2. Perceptron update rule

Mistake par:
$$w \leftarrow w + \eta\, y\, x, \qquad b \leftarrow b + \eta\, y$$
($\eta$ = learning rate, aksar 1.) Sahi classify hua to kuch nahi badalta.

Kyun ye direction? Update ke baad naya score: $y(w + \eta y x)^\top x = y\,w^\top x + \eta \lVert x\rVert^2$ (kyunki $y^2 = 1$). Matlab $y \cdot$score badh jaata hai — point sahi side ki taraf khisakta hai.

Tiny example: $w = (0,0)$, $b = 0$, $\eta = 1$. Points in order: $(2,1), +1$; $(1,3), -1$; $(0,-1), +1$.
1. $(2,1)$: $ys = 0$ → mistake. $w = (2,1)$, $b = 1$.
2. $(1,3)$, $y=-1$: $s = 2 + 3 + 1 = 6$, $ys = -6$ → mistake. $w = (2,1) - (1,3) = (1,-2)$, $b = 0$.
3. $(0,-1)$, $y = +1$: $s = 0 + 2 + 0 = 2$, $ys = 2 > 0$ → sahi, no change.
Pass ke baad $w = (1,-2)$, $b = 0$.

Dhyan do: update me $+\eta y x$ hai. $y = -1$ par ye apne aap subtract ho jaata hai; khud se ek aur minus mat lagao.

### 3. Convergence aur XOR

**Linearly separable** = koi line/plane saare $+1$ ko saare $-1$ se alag kar sake.

**Novikoff ka theorem:** agar har $\lVert x_i\rVert \le R$ hai aur koi unit vector $w^*$ har point ko margin $\gamma$ se sahi classify karta hai ($y_i\, w^{*\top} x_i \ge \gamma$), to perceptron ki total mistakes
$$M \le \left(\frac{R}{\gamma}\right)^2$$

Kyun (short argument, $w$ zero se shuru, bias $x$ me ek extra "1" coordinate maan ke): har mistake par $w^\top w^*$ kam se kam $\gamma$ badhta hai, to $M$ mistakes ke baad $w^\top w^* \ge M\gamma$. Aur $\lVert w\rVert^2$ har mistake par zyada se zyada $R^2$ badhta hai (kyunki mistake par $y\,w^\top x \le 0$), to $\lVert w\rVert \le \sqrt{M} R$. Cauchy–Schwarz: $M\gamma \le w^\top w^* \le \lVert w\rVert \le \sqrt{M}R$, to $\sqrt M \le R/\gamma$.

Tiny example: $R = 2$, $\gamma = 0.25$ → $M \le 8^2 = 64$.

Important facts:
- Separable data par perceptron finite steps me rukta hai, lekin answer **order par depend** karta hai, aur ye max-margin line nahi hai (wo SVM hai).
- Non-separable data (jaise XOR) par kabhi ek bhi poora pass bina update ke nahi hoga — kabhi converge nahi.

**XOR with a hidden layer** (threshold unit: output 1 agar score $> 0$):
- $h_1 = \text{OR} = [x_1 + x_2 - 0.5 > 0]$
- $h_2 = \text{NAND} = [-x_1 - x_2 + 1.5 > 0]$
- $\text{out} = \text{AND}(h_1, h_2) = [h_1 + h_2 - 1.5 > 0]$

| $x_1, x_2$ | OR | NAND | AND = XOR |
|---|---|---|---|
| 0, 0 | 0 | 1 | 0 |
| 0, 1 | 1 | 1 | 1 |
| 1, 0 | 1 | 1 | 1 |
| 1, 1 | 1 | 0 | 0 |

Dhyan do: bias add karne se XOR separable nahi hota (bias sirf line ko khiskata hai). Ek hidden layer of 2 units kaafi hai; 2 hidden layers zaroori nahi.

### 4. Dense layer, shapes aur parameter count

Dense (fully connected) layer: $z = Wx + b$. Agar input $n_{in}$ dims aur output $n_{out}$ units:
- $W$ ka shape $n_{out} \times n_{in}$ (har **row** ek output unit ke weights),
- $b \in \mathbb{R}^{n_{out}}$,
- parameters $= n_{in} n_{out} + n_{out}$.

Poore network $n_0 \to n_1 \to \dots \to n_L$ ke liye: $\sum_l (n_{l-1} n_l + n_l)$. Ek hidden layer wala $d \to H \to K$: $(d+1)H + (H+1)K$.

Tiny example: $5 \to 3 \to 2$: $(5+1)\cdot 3 + (3+1)\cdot 2 = 18 + 8 = 26$.

Dhyan do: units (neurons) ginna parameters ginna nahi hai, aur biases bhoolna bahut common hai.

### 5. Activations aur forward pass

Forward pass = layer by layer: $z = Wx + b$, phir har component par activation.
- $\mathrm{ReLU}(z) = \max(0, z)$
- $\sigma(z) = \dfrac{1}{1 + e^{-z}}$, $\sigma(0) = 0.5$, aur $\sigma'(z) = \sigma(z)(1 - \sigma(z))$, jo max $0.25$ hai ($z = 0$ par).

$\sigma'$ kyun aisa: $\sigma = (1 + e^{-z})^{-1}$, derivative $= e^{-z}/(1 + e^{-z})^2 = \sigma \cdot \frac{e^{-z}}{1 + e^{-z}} = \sigma(1 - \sigma)$.

Tiny example: $W = \begin{pmatrix} 1 & -1 \\ 2 & 0 \end{pmatrix}$, $b = (0, -5)$, $x = (3, 1)$. $z = (3 - 1 + 0,\; 6 + 0 - 5) = (2, 1)$. ReLU → $(2, 1)$. Agar $b_2 = -7$ hota to $z_2 = -1$ → ReLU 0.

Dhyan do: har hidden layer par ReLU lagao — doosri layer me bhi. Output layer pe usually activation nahi (regression) ya sigmoid/softmax (classification).

### 6. Activation ke bina depth bekaar

Bina nonlinearity ke:
$$W_3(W_2(W_1x + b_1) + b_2) + b_3 = \underbrace{(W_3W_2W_1)}_{A}x + \underbrace{(W_3W_2b_1 + W_3b_2 + b_3)}_{d}$$
Ye ek hi affine map $Ax + d$ hai. To 10 linear layers = 1 linear layer; XOR abhi bhi nahi bana sakte, decision boundary ab bhi ek seedhi line/plane hai.

Ulta, **universal approximation:** ek hidden layer jisme kaafi nonlinear units (ReLU ya sigmoid) hon, kisi bhi continuous function ko ek bounded closed set par jitna chaho utna accurately approximate kar sakti hai.

Tiny example: $\mathrm{ReLU}(x) - \mathrm{ReLU}(-x) = x$ (har $x$ ke liye), aur $\mathrm{ReLU}(x) + \mathrm{ReLU}(-x) = |x|$. ReLU units jod kar kinked (piecewise linear) shapes ban jaate hain.

Dhyan do: "sigmoid hidden units + linear output = linear function" galat hai; output hidden values me linear hai, input me nahi.

### 7. Loss ka gradient output par (shortcut table)

Backprop ki shuruaat output ke pre-activation $z$ par gradient se hoti hai.

| Loss aur output | $\partial L/\partial z$ |
|---|---|
| $\tfrac12(\hat y - y)^2$, linear output ($\hat y = z$) | $\hat y - y$ |
| $(\hat y - y)^2$, linear output | $2(\hat y - y)$ |
| cross-entropy, sigmoid output | $p - y$ |
| cross-entropy, softmax output | $p_k - y_k$ |
| $\tfrac12(p - y)^2$, sigmoid output | $(p - y)\,p(1 - p)$ |

**Sigmoid + CE kyun $p - y$:** $L = -[y\ln p + (1-y)\ln(1-p)]$. $\partial L/\partial p = -\frac{y}{p} + \frac{1-y}{1-p} = \frac{p - y}{p(1-p)}$. Aur $\partial p/\partial z = p(1-p)$. Multiply: $p(1-p)$ cancel → $p - y$.

**Softmax + CE kyun $p_k - y_k$:** $p_j = e^{z_j}/\sum_i e^{z_i}$, $\partial p_j/\partial z_k = p_j(\delta_{jk} - p_k)$. $L = -\sum_j y_j \ln p_j$, to $\partial L/\partial z_k = -\sum_j y_j(\delta_{jk} - p_k) = -y_k + p_k\sum_j y_j = p_k - y_k$ (one-hot me $\sum_j y_j = 1$).

Tiny example: logits $z = (\ln 3, 0, 0)$ → $e^z = (3, 1, 1)$, $p = (0.6, 0.2, 0.2)$. True class 2: $\partial L/\partial z = (0.6, -0.8, 0.2)$.

Squared error + sigmoid me extra $p(1-p)$ factor hai; jab sigmoid saturate ho ($p \approx 0$ ya $1$) to ye ~0 ho jaata hai aur learning ruk jaati hai — chahe prediction bilkul galat ho. CE me ye problem nahi.

Dhyan do: CE ke saath $\sigma'$ dobara multiply mat karo. Aur loss me ½ hai ya nahi, dekh ke factor 2 lagao.

### 8. Backpropagation

Backprop = chain rule, output se peeche ki taraf. Notation: $\delta^{(l)} = \partial L/\partial z^{(l)}$ (layer $l$ ke pre-activation par gradient), $a^{(l)} = \phi(z^{(l)})$ (activation output), $a^{(0)} = x$.

1. Output: $\delta^{(L)}$ table se.
2. Peeche: $\delta^{(l)} = \big(W^{(l+1)\top}\delta^{(l+1)}\big) \odot \phi'(z^{(l)})$ ($\odot$ = element-wise multiply).
3. Gradients: $\dfrac{\partial L}{\partial W^{(l)}} = \delta^{(l)}\, a^{(l-1)\top}$, $\dfrac{\partial L}{\partial b^{(l)}} = \delta^{(l)}$.

Matlab weight $W_{ij}$ (unit $i$, input $j$) ka gradient $= \delta_i \times (\text{input } j \text{ ki value})$.

**ReLU gate:** $\phi'(z) = 1$ agar $z > 0$, warna 0. To inactive unit ($z \le 0$) ka $\delta = 0$ — na uske incoming weights update hote, na wo peeche gradient bhejta.

**Dead ReLU:** agar koi unit har training input par $z < 0$ hai, to uske $w$ aur $b$ ka gradient hamesha 0 — wo kabhi nahi badlenge, unit "mar" gaya. Bada learning rate bhi kuch nahi karega (step = $\eta \times 0$).

Tiny example (scalar): $\hat y = w_2\,\mathrm{ReLU}(w_1 x + b_1)$, $L = \tfrac12(\hat y - y)^2$, $w_1 = 1$, $b_1 = 0$, $w_2 = 2$, $x = 3$, $y = 4$.
- Forward: $z = 3$, $h = 3$, $\hat y = 6$.
- $\partial L/\partial \hat y = 6 - 4 = 2$. $\partial L/\partial w_2 = 2 \cdot h = 6$.
- $\partial L/\partial h = 2 \cdot w_2 = 4$; gate ($z > 0$) = 1, to $\delta = 4$.
- $\partial L/\partial w_1 = \delta \cdot x = 12$, $\partial L/\partial b_1 = 4$.

Dhyan do: agar sab hidden weights shuru me barabar hon to har unit ko same gradient milta hai aur wo hamesha identical rehte hain (symmetry). Isliye random initialisation.

### 9. Ek SGD step

SGD (stochastic gradient descent): ek example (ya chhota batch) ka gradient lo aur **ulti** direction me chalo:
$$w \leftarrow w - \eta\, \nabla_w L$$

Tiny example 1: $\hat y = wx$, $L = \tfrac12(\hat y - y)^2$, $w = 1$, $(x, y) = (2, 4)$, $\eta = 0.1$. $\hat y = 2$, $\nabla = (2 - 4)\cdot 2 = -4$, new $w = 1 + 0.4 = 1.4$. Agar $L = (\hat y - y)^2$ hota: $\nabla = -8$, new $w = 1.8$.

Tiny example 2 (logistic): $w = (0,0)$, $b = 0$, $x = (1, 2)$, $y = 1$, $\eta = 0.5$. $p = \sigma(0) = 0.5$, $\partial L/\partial z = -0.5$, $\nabla_w = -0.5\,x = (-0.5, -1)$. New $w = (0.25, 0.5)$, new $b = 0.25$.

Dhyan do: gradient ke saath plus karna (ascent) galti hai; descent me minus.

## Solved examples

**Example 1 (NAT, easy):** A fully connected network has layer sizes 20 → 16 → 8 → 3, with a bias on every hidden and output unit. The number of trainable parameters is ______.

**Soch:** "parameters" → har layer $n_{in}n_{out} + n_{out}$, phir jodo.

**Solution:**
1. 20 → 16: $20 \times 16 + 16 = 336$.
2. 16 → 8: $16 \times 8 + 8 = 136$.
3. 8 → 3: $8 \times 3 + 3 = 27$.
4. Total $= 336 + 136 + 27 = 499$.

**Answer: 499.**

**Galti kahan hoti hai:** biases bhool jaana → $320 + 128 + 24 = 472$; ya input layer ke 20 biases bhi jod dena → 519.

**Example 2 (MCQ, easy):** Inputs $x_1, x_2 \in \{0, 1\}$. A threshold unit outputs 1 when $-2x_1 - 2x_2 + 3 > 0$ and 0 otherwise. It computes
(A) AND (B) OR (C) NAND (D) XOR

**Soch:** Boolean unit → chaaron inputs par score nikaalo.

**Solution:**
1. $(0,0)$: $3 > 0$ → 1.
2. $(0,1)$ ya $(1,0)$: $-2 + 3 = 1 > 0$ → 1.
3. $(1,1)$: $-4 + 3 = -1$ → 0.
4. Sirf $(1,1)$ par 0 → NAND.

**Answer: (C).**

**Galti kahan hoti hai:** negative weights dekh ke bina calculate kiye "AND ka ulta... shayad OR" bolna, ya XOR chunna — XOR kisi single threshold unit se nahi banta.

**Example 3 (NAT, medium):** $h = \mathrm{ReLU}(W_1x + b_1)$, $\hat y = v^\top h + c$ with
$W_1 = \begin{pmatrix} 1 & 2 \\ -1 & 1 \\ 3 & 0 \end{pmatrix}$, $b_1 = (0, 1, -4)^\top$, $v = (1, -2, 2)^\top$, $c = 1$. Find $\hat y$ for $x = (2, -1)^\top$.

**Soch:** forward pass: rows of $W_1$ = hidden units, phir ReLU, phir output.

**Solution:**
1. $z_1 = 1\cdot2 + 2\cdot(-1) + 0 = 0$.
2. $z_2 = -1\cdot 2 + 1\cdot(-1) + 1 = -2$.
3. $z_3 = 3\cdot 2 + 0 + (-4) = 2$.
4. ReLU: $h = (0, 0, 2)$.
5. $\hat y = 1\cdot 0 + (-2)\cdot 0 + 2 \cdot 2 + 1 = 5$.

**Answer: 5.**

**Galti kahan hoti hai:** $z_2 = -2$ par ReLU bhool jaana → $h_2 = -2$ → $\hat y = 0 + 4 + 4 + 1 = 9$. Ya $W_1$ ke columns ko units maan lena.

**Example 4 (NAT, medium):** A perceptron starts at $w = (0, 0)$, $b = 0$, $\eta = 1$, and cycles through these points in order, updating $w \leftarrow w + yx$, $b \leftarrow b + y$ whenever $y(w \cdot x + b) \le 0$, until a full pass has no update.

| point | $x_1$ | $x_2$ | $y$ |
|---|---|---|---|
| 1 | 1 | 0 | +1 |
| 2 | 1 | 1 | −1 |
| 3 | 3 | 1 | +1 |
| 4 | 0 | 1 | −1 |

The total number of updates is ______.

**Soch:** perceptron trace — har point par $y\cdot s$, $\le 0$ to update. Score 0 bhi mistake.

**Solution:**
Pass 1:
1. P1: $s = 0$, $ys = 0$ → update. $w = (1, 0)$, $b = 1$. (1)
2. P2: $s = 1 + 0 + 1 = 2$, $ys = -2$ → update. $w = (0, -1)$, $b = 0$. (2)
3. P3: $s = 0 - 1 + 0 = -1$, $ys = -1$ → update. $w = (3, 0)$, $b = 1$. (3)
4. P4: $s = 0 + 0 + 1 = 1$, $ys = -1$ → update. $w = (3, -1)$, $b = 0$. (4)

Pass 2:
5. P1: $s = 3$, $ys = 3$ ✓.
6. P2: $s = 3 - 1 = 2$, $ys = -2$ → update. $w = (2, -2)$, $b = -1$. (5)
7. P3: $s = 6 - 2 - 1 = 3$ ✓. P4: $s = -2 - 1 = -3$, $ys = 3$ ✓.

Pass 3: P1: $2 - 1 = 1$ ✓; P2: $2 - 2 - 1 = -1$, $ys = 1$ ✓; P3: 3 ✓; P4: $ys = 3$ ✓. Koi update nahi → stop.

**Answer: 5** (final $w = (2, -2)$, $b = -1$).

**Galti kahan hoti hai:** P1 par $s = 0$ ko "sahi" maan lena (strict $< 0$ test) — tab pehla update hi nahi hota aur poora trace badal jaata hai. Ya pass 2 ke beech me ruk jaana.

**Example 5 (NAT, hard):** $h = \mathrm{ReLU}(Wx + b)$, $\hat y = v^\top h$, $L = \tfrac12(\hat y - y)^2$, with $W = \begin{pmatrix} 2 & -1 \\ 1 & 1 \end{pmatrix}$ (row $i$ = hidden unit $i$), $b = (0, -2)^\top$, $v = (1, 2)^\top$, $x = (1, 3)^\top$, $y = 1$. After one SGD step with $\eta = 0.1$, the new value of $W_{22}$ (unit 2, input 2) is ______.

**Soch:** ek weight ka gradient → forward, $\partial L/\partial \hat y$, ReLU gate, $\delta_i \times x_j$, phir minus step.

**Solution:**
1. Forward: $z_1 = 2 - 3 + 0 = -1$, $z_2 = 1 + 3 - 2 = 2$. $h = (0, 2)$.
2. $\hat y = 1\cdot 0 + 2 \cdot 2 = 4$. $\partial L/\partial \hat y = 4 - 1 = 3$.
3. $\delta_1 = v_1 \cdot 3 \cdot \mathrm{gate}(z_1) = 1 \cdot 3 \cdot 0 = 0$. $\delta_2 = 2 \cdot 3 \cdot 1 = 6$.
4. $\partial L/\partial W_{22} = \delta_2 \cdot x_2 = 6 \cdot 3 = 18$.
5. New $W_{22} = 1 - 0.1 \times 18 = -0.8$.

**Answer: −0.8.**

**Galti kahan hoti hai:** step me plus karna → $2.8$; ya $x_1$ use karna → gradient 6 → $0.4$. Aur agar $W_{12}$ poocha hota, to answer gradient 0 (unit 1 inactive) — gate bhoolne wale $1 \cdot 3 \cdot 3 = 9$ likh dete.

**Example 6 (MSQ, hard):** Which statements are correct?
- (A) For softmax logits $z = (\ln 3, 0, 0)$ with cross-entropy and true class 2, $\partial L/\partial z_2 = -0.8$.
- (B) For a sigmoid output with cross-entropy, $\partial L/\partial z = (p - y)\,p(1 - p)$.
- (C) A ReLU unit whose pre-activation is negative on every training input never changes its incoming weights or bias under gradient descent.
- (D) Three stacked linear layers without activations can represent XOR.

**Soch:** har option ek rule: softmax-CE $= p - y$; extra factor sirf squared error me; dead ReLU; linear collapse.

**Solution:**
1. (A) $p = (3, 1, 1)/5 = (0.6, 0.2, 0.2)$. $\partial L/\partial z_2 = p_2 - 1 = -0.8$ → sahi.
2. (B) Ye squared error wala form hai; CE me $p(1-p)$ cancel ho jaata hai → galat.
3. (C) Gate har input par 0 → $\delta = 0$ → $\nabla w = \delta x^\top = 0$, $\nabla b = 0$ → sahi.
4. (D) Linear layers ek affine map ban jaate hain → ek line → XOR nahi → galat.

**Answer: (A), (C).**

**Galti kahan hoti hai:** (A) me $-y_2/p_2 = -5$ likhna (ye $\partial L/\partial p_2$ hai, softmax chain nahi lagaya). (C) me "bias ka input hamesha 1 hai to bias update hoga" sochna — bias ka gradient bhi $\delta = 0$ hai.

## Confusions clear karo

**Q:** Perceptron aur logistic regression me farak kya hai?
**A:** Dono linear score $w^\top x + b$ banate hain. Perceptron sirf galti par hard update karta hai (sign dekhta hai). Logistic regression sigmoid se probability deta hai aur har point par cross-entropy ka smooth gradient leta hai.

**Q:** $W$ ka shape $n_{out}\times n_{in}$ kyun, ulta kyun nahi?
**A:** $z = Wx$ me $x$ column vector ($n_{in} \times 1$) hai. Result $n_{out}\times 1$ chahiye, to $W$ $n_{out}\times n_{in}$. Har row ek output unit hai jo input se dot product karti hai. (Code me kabhi $xW$ likhte hain, tab shape ulta hota hai — question ka convention dekho.)

**Q:** ReLU ka derivative $z = 0$ par kya hai?
**A:** Wahan technically defined nahi; convention se 0 lete hain (gate "> 0" hai). GATE ke numbers me aksar $z$ clearly positive ya negative hota hai.

**Q:** Hidden layer me units ki sankhya parameters ke formula me kaise aati hai?
**A:** $d \to H \to K$: pehli layer $(d+1)H$, doosri $(H+1)K$. Dono me $H$ hai; agar total diya ho to linear equation se $H$ nikaalo.

**Q:** Novikoff bound "mistakes" ka hai ya "passes" ka?
**A:** Total mistakes (= total updates) ka. Ek pass me kai mistakes ho sakti hain.

**Q:** Gradient descent me minus kyun?
**A:** Gradient wo direction hai jahan loss sabse tez **badhta** hai. Loss ghatana hai, to ulta chalo.

**Q:** Sigmoid ka max derivative 0.25 hone ka kya asar hai?
**A:** Kai sigmoid layers me backprop karte waqt har layer par $\le 0.25$ multiply hota hai, to gradient chhota hota jaata hai (vanishing gradient). ReLU ki slope 1 hai, isliye deep networks me ReLU popular hai.

## Khud try karo

1. Network $12 \to 6 \to 4 \to 1$ (sab hidden/output units par bias). Parameters?

<details><summary>Answer dekho</summary>

$12\cdot6 + 6 = 78$, $6\cdot4 + 4 = 28$, $4\cdot1 + 1 = 5$. Total $= 111$.

</details>

2. Network: 6 inputs → $H$ hidden → 2 outputs, biases ke saath, total 65 parameters. $H$?

<details><summary>Answer dekho</summary>

$(6+1)H + (H+1)\cdot 2 = 7H + 2H + 2 = 9H + 2 = 65$ → $H = 7$.

</details>

3. Example 3 ke $h = (0, 0, 2)$ ko ek aur ReLU layer me bhejo: $W_2 = \begin{pmatrix} 1 & -1 & 1 \\ 2 & 0 & -1 \end{pmatrix}$, $b_2 = (0, -3)^\top$. Second hidden layer ka output?

<details><summary>Answer dekho</summary>

$z^{(2)}_1 = 0 - 0 + 2 + 0 = 2$, $z^{(2)}_2 = 0 + 0 - 2 - 3 = -5$. ReLU → $(2, 0)$.

</details>

4. Logistic regression, $w = (0, 0)$, $b = 0$, ek SGD step $\eta = 1$ on $x = (2, -1)$, $y = 0$, cross-entropy. Naya $w$ aur $b$?

<details><summary>Answer dekho</summary>

$p = \sigma(0) = 0.5$. $\partial L/\partial z = p - y = 0.5$. $\nabla_w = 0.5\,x = (1, -0.5)$, $\nabla_b = 0.5$.
New $w = (0,0) - (1, -0.5) = (-1, 0.5)$, new $b = -0.5$.

</details>

5. 3-class softmax, logits $z = (0, \ln 2, \ln 5)$, true class 3, cross-entropy. $\partial L/\partial z$?

<details><summary>Answer dekho</summary>

$e^z = (1, 2, 5)$, sum 8, $p = (0.125, 0.25, 0.625)$. $p - y = (0.125, 0.25, -0.375)$.

</details>

## Ek page me

- Perceptron mistake: $y(w^\top x + b) \le 0$ (zero bhi mistake); update $w \mathrel{+}= \eta y x$, $b \mathrel{+}= \eta y$.
- Separable + margin $\gamma$, radius $R$ → mistakes $\le (R/\gamma)^2$; final $w$ order par depend karta hai, max-margin nahi.
- XOR linearly separable nahi; XOR = AND(OR, NAND) → 2 hidden threshold units kaafi.
- Dense layer: $W$ is $n_{out}\times n_{in}$, params $n_{in}n_{out} + n_{out}$; input layer ke 0 params; $d\to H\to K$: $(d+1)H + (H+1)K$.
- ReLU $= \max(0,z)$, slope 1 ya 0. $\sigma(0) = 0.5$, $\sigma' = \sigma(1-\sigma) \le 0.25$.
- Bina activation ke saari layers ek affine map; ek nonlinear hidden layer (enough units) = universal approximator.
- Output gradients: ½SE → $\hat y - y$; SE → $2(\hat y - y)$; sigmoid/softmax + CE → $p - y$; ½SE + sigmoid → $(p-y)p(1-p)$.
- Backprop: $\delta^{(l)} = (W^{(l+1)\top}\delta^{(l+1)})\odot\phi'(z^{(l)})$; $\nabla W = \delta a^\top$, $\nabla b = \delta$.
- Inactive ReLU → $\delta = 0$; dead ReLU kabhi update nahi hota, bada $\eta$ bhi nahi bachata.
- SGD: $w \leftarrow w - \eta\nabla L$ (minus!).

Revision ke liye **Short note** tab dekho.
