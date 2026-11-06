# Support vector machines

> **Time:** ~35 min · **Pehle aana chahiye:** vector ka dot product $w^\top x$ aur length $\lVert w\rVert = \sqrt{w_1^2 + w_2^2}$, line/plane ki equation, point se line ki doori (Class 11), logistic regression ka "linear boundary" idea · **Day:** 46, 49

## Ye topic kyun?

Agar do classes ko ek seedhi line se alag kiya ja sakta hai, to aisi bahut saari lines hain. SVM (support vector machine) wo line chunta hai jo dono classes se **sabse zyada door** ho — yaani sabse chauda "khaali raasta" (margin) chhodti hai. Ye naye data par zyada robust hota hai. GATE DA me yahan se NAT aate hain (margin width, point ki doori, hinge loss, kernel value) aur MCQ/MSQ (support vectors kaun, $C$ ka asar, valid kernel, RBF ki properties).

## Picture se samjho

Socho do gaon hain (plus aur minus) aur beech se ek sadak banani hai. Sadak jitni chaudi ho, utna achha — dono taraf ke gharon se door. Sadak ki beech wali line **decision boundary** hai, aur sadak ke dono kinare **margin hyperplanes**. Kinaron ko jo ghar chhoo rahe hain, wahi sadak ki chaudai tay karte hain — wo **support vectors** hain.

<figure class="fig">
<svg viewBox="0 0 580 320" xmlns="http://www.w3.org/2000/svg">
<line x1="60" y1="300" x2="350" y2="300" style="stroke:var(--muted)"/>
<line x1="60" y1="300" x2="60" y2="15" style="stroke:var(--muted)"/>
<line x1="60" y1="60" x2="300" y2="300" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="100" y1="20" x2="340" y2="260" style="stroke:var(--info)" stroke-dasharray="6 4"/>
<line x1="60" y1="140" x2="220" y2="300" style="stroke:var(--info)" stroke-dasharray="6 4"/>
<line x1="146" y1="214" x2="214" y2="146" style="stroke:var(--mark)" stroke-width="2"/>
<polygon points="220,140 209,144 216,151" style="fill:var(--mark)"/>
<polygon points="140,220 144,209 151,216" style="fill:var(--mark)"/>
<circle cx="220" cy="140" r="6" style="fill:var(--good)"/>
<circle cx="300" cy="140" r="6" style="fill:var(--good)"/>
<circle cx="260" cy="60" r="6" style="fill:var(--good)"/>
<rect x="134" y="214" width="12" height="12" style="fill:var(--bad)"/>
<rect x="94" y="254" width="12" height="12" style="fill:var(--bad)"/>
<rect x="174" y="274" width="12" height="12" style="fill:var(--bad)"/>
<circle cx="220" cy="140" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
<circle cx="140" cy="220" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="228" y="132" font-size="11" fill="currentColor">(3, 3)</text>
<text x="100" y="212" font-size="11" fill="currentColor">(1, 1)</text>
<text x="360" y="60" font-size="12" style="fill:var(--info)">— boundary: x₁ + x₂ = 4 (f = 0)</text>
<text x="360" y="80" font-size="12" style="fill:var(--info)">- - margin: f = +1 aur f = −1</text>
<text x="360" y="100" font-size="12" style="fill:var(--info)">w = (0.5, 0.5), b = −2</text>
<text x="360" y="130" font-size="12" style="fill:var(--mark)">width = 2/‖w‖ = 2√2 ≈ 2.83</text>
<text x="360" y="160" font-size="12" fill="currentColor">○ = support vectors</text>
<circle cx="365" cy="190" r="6" style="fill:var(--good)"/>
<text x="378" y="194" font-size="12" fill="currentColor">class +1</text>
<rect x="359" y="210" width="12" height="12" style="fill:var(--bad)"/>
<text x="378" y="221" font-size="12" fill="currentColor">class −1</text>
</svg>
<figcaption>Maximum-margin line. Sirf do gol ghere wale points (3,3) aur (1,1) margin ko chhoote hain; baaki points hata do to bhi line wahi rahegi.</figcaption>
</figure>

Dhyan do: margin ki chaudai yahan exactly do support vectors ki doori $\lVert(3,3) - (1,1)\rVert = \sqrt 8 = 2.83$ hai, kyunki $w$ unhi ko jodne wali direction me hai. Baaki points (jaise (5,3), (0,0)) margin se bahar hain — wo solution me koi role nahi lete.

Doosri picture: kya ho agar data seedhi line se alag hi na ho? 1-D me points $-2, 2$ (plus) aur $-1, 1$ (minus) — koi ek threshold inhe alag nahi kar sakta. Par har point ko $(x, x^2)$ par le jao, to ek horizontal line alag kar deti hai.

<figure class="fig">
<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="150" x2="235" y2="150" stroke="currentColor"/>
<text x="120" y="172" font-size="11" fill="currentColor">0</text>
<line x1="125" y1="145" x2="125" y2="155" stroke="currentColor"/>
<circle cx="35" cy="150" r="6" style="fill:var(--good)"/>
<circle cx="215" cy="150" r="6" style="fill:var(--good)"/>
<rect x="74" y="144" width="12" height="12" style="fill:var(--bad)"/>
<rect x="164" y="144" width="12" height="12" style="fill:var(--bad)"/>
<text x="25" y="135" font-size="11" fill="currentColor">−2</text>
<text x="72" y="135" font-size="11" fill="currentColor">−1</text>
<text x="166" y="135" font-size="11" fill="currentColor">1</text>
<text x="210" y="135" font-size="11" fill="currentColor">2</text>
<text x="30" y="200" font-size="12" fill="currentColor">1-D: koi ek cut kaam nahi karta</text>
<text x="226" y="182" font-size="12" style="fill:var(--mark)">φ(x) = (x, x²)</text>
<line x1="238" y1="150" x2="266" y2="150" style="stroke:var(--mark)" stroke-width="2"/>
<polygon points="274,150 264,145 264,155" style="fill:var(--mark)"/>
<line x1="280" y1="210" x2="480" y2="210" stroke="currentColor"/>
<line x1="380" y1="215" x2="380" y2="30" stroke="currentColor"/>
<polyline points="290.0,50.0 299.0,80.4 308.0,107.6 317.0,131.6 326.0,152.4 335.0,170.0 344.0,184.4 353.0,195.6 362.0,203.6 371.0,208.4 380.0,210.0 389.0,208.4 398.0,203.6 407.0,195.6 416.0,184.4 425.0,170.0 434.0,152.4 443.0,131.6 452.0,107.6 461.0,80.4 470.0,50.0" fill="none" style="stroke:var(--muted)" stroke-dasharray="3 3"/>
<circle cx="290" cy="50" r="6" style="fill:var(--good)"/>
<circle cx="470" cy="50" r="6" style="fill:var(--good)"/>
<rect x="329" y="164" width="12" height="12" style="fill:var(--bad)"/>
<rect x="419" y="164" width="12" height="12" style="fill:var(--bad)"/>
<line x1="282" y1="110" x2="482" y2="110" style="stroke:var(--info)" stroke-width="2"/>
<text x="390" y="104" font-size="12" style="fill:var(--info)">x² = 2.5</text>
<text x="386" y="40" font-size="11" fill="currentColor">x²</text>
</svg>
<figcaption>Feature map φ(x) = (x, x²) ke baad points ek seedhi line (x² = 2.5) se alag ho jaate hain. Kernel trick yahi kaam φ ko bina explicitly banaye karta hai.</figcaption>
</figure>

Dhyan do: nayi space me boundary seedhi hai, par purani 1-D space me ye "$|x| > 1.58$" ban jaati hai — non-linear. Yahi kernels ki taakat hai.

## Concept step-by-step

### 1. Linear classifier aur scaling

$f(x) = w^\top x + b$. Prediction $= \operatorname{sign} f(x)$: positive to class $+1$, negative to $-1$. Boundary: $w^\top x + b = 0$. Vector $w$ boundary ke perpendicular hai.

Example: $w = (0.5, 0.5)$, $b = -2$. Point $(5, 3)$: $f = 2.5 + 1.5 - 2 = 2 > 0$ → class $+1$.

Ek ajeeb baat: $(w, b)$ ko kisi bhi $c > 0$ se multiply karo, $(2w, 2b)$: boundary $2(w^\top x + b) = 0$ — **wahi line**. Isliye hum ek "standard scale" chunte hain (step 3).

**Dhyan do:** $(cw, cb)$ alag boundary nahi hai; sirf $f$ ki values scale hoti hain.

### 2. Point se boundary ki doori

$$\text{dist}(x) = \frac{|w^\top x + b|}{\lVert w\rVert}, \quad \lVert w\rVert = \sqrt{\textstyle\sum w_j^2}.$$
Kyun: $x$ se boundary tak perpendicular jaana hai, yaani $w$ ki direction me. $x - t\,\frac{w}{\lVert w\rVert}$ boundary par tab hoga jab $w^\top x + b - t\lVert w\rVert = 0$, to $t = (w^\top x + b)/\lVert w\rVert$. (Class 11 ka $|ax + by + c|/\sqrt{a^2 + b^2}$ yahi hai.)

Example: boundary $3x_1 + 4x_2 - 5 = 0$, point $(3, 1)$: score $= 9 + 4 - 5 = 8$, $\lVert w\rVert = 5$, distance $= 1.6$.

**Dhyan do:** raw score (8) doori nahi hai. Divide by $\lVert w\rVert$ (Euclidean), na $\lVert w\rVert^2$, na $|w_1| + |w_2|$.

### 3. Margin aur uski chaudai $2/\lVert w\rVert$

Scale aise fix karo ki boundary ke sabse paas wale points par $|f(x)| = 1$ ho. Matlab har training point ke liye
$$y_i(w^\top x_i + b) \ge 1.$$
Ab do **margin hyperplanes**: $w^\top x + b = +1$ aur $w^\top x + b = -1$. Boundary se har ek ki doori step 2 se $1/\lVert w\rVert$. To dono ke beech
$$\text{width} = \frac{2}{\lVert w\rVert}.$$
Example: $w = (0.5, 0.5)$: $\lVert w\rVert = \sqrt{0.5} = 0.7071$, width $= 2/0.7071 = 2.83$ (picture se match).

**Dhyan do:** $1/\lVert w\rVert$ sirf **aadhi** chaudai hai (boundary se ek kinare tak).

### 4. Hard-margin SVM ka optimisation

Width $2/\lVert w\rVert$ maximise karna = $\lVert w\rVert$ minimise karna = $\tfrac12\lVert w\rVert^2$ minimise karna (sab monotone, square se calculus easy):
$$\min_{w,b}\ \tfrac12\lVert w\rVert^2 \quad \text{s.t.}\quad y_i(w^\top x_i + b) \ge 1\ \ \forall i.$$
Ye convex problem hai (ek hi minimum). "Hard" kyunki koi bhi point margin ke andar nahi aa sakta — data linearly separable hona chahiye.

**Dhyan do:** constraint me $\ge 1$ hai, $\ge 0$ nahi. $\ge 0$ sirf "sahi side" kehta; $\ge 1$ margin bhi maangta hai.

### 5. Support vectors

Lagrange multipliers (har constraint ke liye ek $\alpha_i \ge 0$) se solution aata hai:
$$w = \sum_i \alpha_i y_i x_i.$$
Jo points margin se bahar hain ($y_if(x_i) > 1$), unka constraint "dheela" hai, to $\alpha_i = 0$. Sirf jo points exactly margin par hain ($y_if(x_i) = 1$) unka $\alpha_i > 0$ ho sakta hai — ye **support vectors** hain.

Natije:
- Non-support vector hata do → $w, b$ same.
- Support vectors boundary ke **sabse paas** wale points hain, door wale nahi.

**Do support vectors shortcut:** agar ek $x_+$ aur ek $x_-$ hi SVs hain, to $w \propto x_+ - x_-$ aur width $= \lVert x_+ - x_-\rVert$. Exact $w = \dfrac{2(x_+ - x_-)}{\lVert x_+ - x_-\rVert^2}$, aur $b$ aisa ki $w^\top x_+ + b = 1$.

Example: $x_+ = (3,3)$, $x_- = (1,1)$: $x_+ - x_- = (2, 2)$, $\lVert\cdot\rVert^2 = 8$, $w = (4,4)/8 = (0.5, 0.5)$. $b$: $0.5 \cdot 3 + 0.5 \cdot 3 + b = 1 \Rightarrow b = -2$. Check $x_-$: $1 - 2 = -1$ ✓. Width $= \sqrt 8 = 2.83$ ✓. Baaki points ke liye bhi $y_if \ge 1$ check karo: $(5,3) \to 2$, $(4,5) \to 2.5$, $(0,0) \to -(-2) = 2$, $(2,-0.5) \to 1.25$ ✓.

**Dhyan do:** shortcut sirf tab valid hai jab baaki saare points constraint satisfy karein — hamesha check karo.

### 6. Soft margin aur hinge loss

Real data me thode points galat side ya margin ke andar hote hain. Har point ko ek **slack** $\xi_i \ge 0$ do:
$$\min\ \tfrac12\lVert w\rVert^2 + C\sum_i \xi_i \quad\text{s.t.}\quad y_i f(x_i) \ge 1 - \xi_i.$$
Optimum par $\xi_i = \max(0,\ 1 - y_if(x_i))$ — ye **hinge loss** hai.

Teen zones ($m = y f(x)$, "functional margin"):
- $m \ge 1$: margin ke bahar, sahi side → $\xi = 0$.
- $0 < m < 1$: margin ke andar par sahi side → $0 < \xi < 1$ (phir bhi loss!).
- $m = 0$: boundary par → $\xi = 1$.
- $m < 0$: galat side (misclassified) → $\xi > 1$.

<figure class="fig">
<svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="230" x2="470" y2="230" stroke="currentColor"/>
<line x1="210" y1="240" x2="210" y2="40" stroke="currentColor"/>
<text x="496" y="252" text-anchor="end" font-size="12" fill="currentColor">m = y·f(x)</text>
<text x="216" y="48" font-size="12" fill="currentColor">loss</text>
<polyline points="50,50 290,230 450,230" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="290" y1="235" x2="290" y2="60" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<text x="205" y="248" font-size="11" fill="currentColor">0</text>
<text x="286" y="248" font-size="11" fill="currentColor">1</text>
<text x="126" y="248" font-size="11" fill="currentColor">−1</text>
<text x="196" y="174" font-size="11" fill="currentColor">1</text>
<text x="60" y="80" font-size="12" style="fill:var(--bad)">misclassified: ξ &gt; 1</text>
<text x="214" y="130" font-size="12" style="fill:var(--mark)">margin ke andar:</text>
<text x="214" y="146" font-size="12" style="fill:var(--mark)">0 &lt; ξ &lt; 1</text>
<text x="320" y="210" font-size="12" style="fill:var(--good)">safe: ξ = 0</text>
<text x="110" y="30" font-size="12" style="fill:var(--info)">hinge = max(0, 1 − m)</text>
</svg>
<figcaption>Hinge loss m = 1 tak zero nahi hota. Sahi side par par margin ke andar wale points bhi thoda loss dete hain.</figcaption>
</figure>

Example: $w = (1, -1)$, $b = 0$; point $(1, 0.5)$, $y = +1$: $f = 0.5$, $m = 0.5$, $\xi = 0.5$ (andar, sahi side). Point $(2, 1)$, $y = -1$: $f = 1$, $m = -1$, $\xi = 2$ (misclassified).

**Dhyan do:** sirf misclassified points ka loss mat gino. Aur perceptron loss $\max(0, -m)$ hinge nahi hai (usme "1" nahi).

### 7. $C$ ka asar

$C$ batata hai ki slack (galtiyon) ka jurmana kitna bhaari hai.
- **Bada $C$:** galti mehngi → model har point ko sahi karne ki koshish → margin **patla**, kam violations, **high variance** (overfit). $C \to \infty$ = hard margin.
- **Chhota $C$:** galti sasti → margin **chauda**, zyada points andar/galat, **zyada bias**, kam variance.

**Dhyan do:** hard margin $C \to \infty$ par hai, $C \to 0$ par nahi. Aur $C$ RBF ki chaudai nahi hai — wo $\gamma$ hai.

### 8. Kernels

**Feature map** $\phi$ data ko badi space me le jaata hai jahan wo linear-separable ho jaaye. SVM ka dual sirf dot products $x_i^\top x_j$ use karta hai. To unhe $\phi(x_i)^\top\phi(x_j)$ se badal do — aur ise seedha ek function se nikaalo:
$$K(x, z) = \phi(x)^\top\phi(z).$$
Ye **kernel trick** hai: $\phi$ kabhi explicitly banana nahi padta.

**Polynomial kernel:** $K(x, z) = (1 + x^\top z)^p$. $d = 2$, $p = 2$ par expand karo:
$(1 + x_1z_1 + x_2z_2)^2 = 1 + 2x_1z_1 + 2x_2z_2 + x_1^2z_1^2 + x_2^2z_2^2 + 2x_1x_2z_1z_2$,
yaani $\phi(x) = (1, \sqrt2x_1, \sqrt2x_2, x_1^2, x_2^2, \sqrt2x_1x_2)$ — **6 features**. Check: $x = (1,1)$, $z = (2,0)$: $K = (1 + 2)^2 = 9$; $\phi(x)^\top\phi(z) = 1 + 4 + 0 + 4 + 0 + 0 = 9$ ✓. Isme $x_1x_2$ feature hai, isliye degree-2 kernel XOR (jahan label $= \operatorname{sign}(x_1x_2)$ jaisa ho) ko alag kar leta hai.

**RBF (Gaussian) kernel:** $K(x, z) = \exp(-\gamma\lVert x - z\rVert^2)$. Ye 0 aur 1 ke beech hai ($x = z$ par 1). Iska $\phi$ **infinite-dimensional** hai ($e^{(\cdot)}$ ki Taylor series me har degree ke terms). Bada $\gamma$ → kernel jaldi girta hai → bahut local, wiggly boundary (overfit).

Example: $x = (1, -1)$, $z = (2, 1)$, $\gamma = 0.25$: $\lVert x - z\rVert^2 = 1 + 4 = 5$, $K = e^{-1.25} = 0.287$.

**Valid kernel (Mercer):** $K$ kisi space me inner product hona chahiye — matlab symmetric ($K(x,z) = K(z,x)$) aur har data set ka Gram matrix $[K(x_i, x_j)]$ positive semi-definite. Har function kernel nahi ho sakta.

**Dhyan do:** RBF me $\lVert x - z\rVert^2$ (square) hai, $\lVert x - z\rVert$ nahi; aur $\gamma$ mat bhoolo.

## Solved examples

**Example 1 (NAT, easy):** 3 features wala hard-margin SVM: $w = (1, 2, 2)$, $b = 4$. Margin hyperplanes $w^\top x + b = \pm 1$ ke beech ki doori = ______ (do decimal).

**Soch:** "margin width" → $2/\lVert w\rVert$; $b$ ka koi role nahi.

**Solution:**
1. $\lVert w\rVert = \sqrt{1 + 4 + 4} = 3$.
2. Width $= 2/3 = 0.67$.

**Galti kahan hoti hai:** $1/3 = 0.33$ (half-width), ya $2/9 = 0.22$ ($\lVert w\rVert^2$ se divide).

**Example 2 (MCQ, easy):** Boundary $2x_1 - x_2 + 5 = 0$ se point $(2, -1)$ ki Euclidean doori hai: (A) 10 (B) $2\sqrt5$ (C) 2 (D) $10/3$

**Soch:** distance $= |w^\top x + b|/\lVert w\rVert$.

**Solution:**
1. Score $= 2(2) - (-1) + 5 = 10$.
2. $\lVert w\rVert = \sqrt{4 + 1} = \sqrt5$.
3. Distance $= 10/\sqrt5 = 2\sqrt5 \approx 4.47$. Answer **(B)**.

**Galti kahan hoti hai:** (A) raw score; (C) $\lVert w\rVert^2 = 5$ se divide; (D) $\ell_1$ norm $|2| + |-1| = 3$ se divide.

**Example 3 (NAT, medium):** Hard-margin linear SVM is data par:

| point | $x_1$ | $x_2$ | label |
|---|---|---|---|
| A | 4 | 3 | +1 |
| B | 5 | 5 | +1 |
| C | 1 | −1 | −1 |
| D | 0 | −2 | −1 |

Optimal margin ki width $2/\lVert w\rVert$ = ______.

**Soch:** do classes ke sabse paas wale points ko candidate SVs maano, shortcut lagao, phir baaki points check karo.

**Solution:**
1. Cross-class pair distances: A–C $= \sqrt{9 + 16} = 5$; A–D $= \sqrt{16 + 25} = 6.40$; B–C $= \sqrt{16 + 36} = 7.21$; B–D aur bhi zyada. Sabse paas: A, C.
2. $x_+ - x_- = (3, 4)$, $\lVert\cdot\rVert^2 = 25$, $w = 2(3,4)/25 = (0.24, 0.32)$.
3. $b$: $0.24(4) + 0.32(3) + b = 1 \Rightarrow 1.92 + b = 1 \Rightarrow b = -0.92$.
4. Check: C: $0.24 - 0.32 - 0.92 = -1$ ✓; B: $1.2 + 1.6 - 0.92 = 1.88 \ge 1$ ✓; D: $-0.64 - 0.92 = -1.56 \le -1$ ✓.
5. Saare constraints satisfied aur margin A–C doori ke barabar (isse bada ho hi nahi sakta), to optimal. Width $= \lVert(3,4)\rVert = 5$.

**Galti kahan hoti hai:** $\lVert w\rVert = 0.4$ nikaal kar $1/0.4 = 2.5$ likh dena (half-width). Ya galat pair (A–D) chun lena.

**Example 4 (NAT, medium):** Soft-margin SVM, $C = 1$, $w = (1, -1)$, $b = 0$. Data: A $(3, 0)$, $y = +1$; B $(1, 0.5)$, $y = +1$; C $(0, 2)$, $y = -1$; D $(2, 1)$, $y = -1$. Objective $\tfrac12\lVert w\rVert^2 + C\sum\xi_i$ = ______.

**Soch:** har point ka $m = yf$ nikaalo, hinge lagao.

**Solution:**
1. A: $f = 3$, $m = 3$, $\xi = 0$.
2. B: $f = 0.5$, $m = 0.5$, $\xi = 0.5$ (andar, sahi side).
3. C: $f = -2$, $m = 2$, $\xi = 0$.
4. D: $f = 1$, $m = -1$, $\xi = 2$ (misclassified).
5. $\tfrac12\lVert w\rVert^2 = \tfrac12(1 + 1) = 1$. $\sum\xi = 2.5$.
6. Objective $= 1 + 1 \times 2.5 = 3.5$.

**Galti kahan hoti hai:** B ko ignore karna (sirf misclassified gina) → $1 + 2 = 3$. Ya perceptron loss $\max(0, -m)$ → $1 + 1 = 2$.

**Example 5 (MSQ, medium):** Kaunse statements sahi hain?
(A) Soft-margin SVM me $C \to \infty$ par solution hard-margin SVM ki taraf jaata hai (separable data par)
(B) $C$ ghatane se margin chauda hone ka rujhaan hota hai
(C) RBF kernel me boundary ki smoothness $C$ se hi tay hoti hai; $\gamma$ ka koi asar nahi
(D) $K(x, z) = x_1 - z_1$ ek valid kernel hai

**Soch:** $C$ ki direction, $\gamma$ ka role, Mercer condition.

**Solution:**
1. (A) slack infinitely mehnga → koi violation nahi → hard margin ✓.
2. (B) chhota $C$ → violations saste → wider margin ✓.
3. (C) $\gamma$ RBF ki "reach" tay karta hai; bada $\gamma$ = wiggly boundary ✗.
4. (D) $K(x,z) = x_1 - z_1$ symmetric hi nahi ($K(z,x) = -K(x,z)$), aur $K(x,x) = 0$ — inner product nahi ✗.

Answer: **(A), (B)**.

**Galti kahan hoti hai:** (A) ko ulta yaad rakhna ("$C \to 0$ = hard"). $C$ violation ka **jurmana** hai; jurmana infinite = koi violation allowed nahi.

**Example 6 (NAT, hard):** RBF kernel $K(x, z) = \exp(-\gamma\lVert x - z\rVert^2)$, $\gamma = 0.25$, $x = (1, -1)$, $z = (2, 1)$. $K(x, z)$ = ______ (teen decimal).

**Soch:** squared distance pehle, phir $\gamma$ se multiply, phir $e^{-(\cdot)}$.

**Solution:**
1. $x - z = (-1, -2)$, $\lVert x - z\rVert^2 = 1 + 4 = 5$.
2. Exponent $= -0.25 \times 5 = -1.25$.
3. $K = e^{-1.25} = 0.287$.

**Galti kahan hoti hai:** $\lVert x - z\rVert = \sqrt5 = 2.236$ (bina square) → $e^{-0.559} = 0.572$. Ya $\gamma$ bhool kar $e^{-5} = 0.007$.

## Confusions clear karo

**Q:** Margin "1" kyun? Ye arbitrary nahi?
**A:** Haan, ye sirf scale chunna hai. $(w, b)$ ko kisi bhi $c$ se scale karo, boundary same. Hum scale aisa fix karte hain ki sabse paas wale points par $|f| = 1$ ho; tab width $2/\lVert w\rVert$ ban jaati hai.

**Q:** $\tfrac12\lVert w\rVert^2$ kyun, seedha $\lVert w\rVert$ kyun nahi?
**A:** Dono ka minimiser same hai. Square smooth hai (derivative $w$), aur $\tfrac12$ derivative ka 2 cancel karta hai. Convex quadratic problem bana rehta hai.

**Q:** Support vectors kaun — paas wale ya door wale?
**A:** Paas wale: jo exactly margin par hain ($y_if = 1$), soft margin me margin ke andar/galat side wale bhi ($\alpha_i > 0$). Door wale points ka $\alpha_i = 0$.

**Q:** SVM aur logistic regression me farak?
**A:** Dono linear boundary dete hain. Logistic sab points se probability-based (cross-entropy) loss leta hai; SVM ka hinge loss margin ke bahar wale points par exactly zero hai, isliye solution sirf SVs par depend karta hai. SVM probability nahi deta.

**Q:** Kernel me $\phi$ infinite-dimensional ho to computation kaise?
**A:** Hum $\phi$ kabhi banate hi nahi. Sirf $K(x_i, x_j)$ (ek number) chahiye, jo RBF me ek simple formula hai.

**Q:** Degree-2 polynomial kernel kitne features banata hai ($d = 2$)?
**A:** $1, x_1, x_2, x_1^2, x_2^2, x_1x_2$ — 6 (constant 1 ke saath).

## Khud try karo

**1.** $w = (0.6, 0.8)$, $b = -0.4$. Margin width? Point $(1, 1)$ ki boundary se doori?

<details><summary>Answer dekho</summary>

$\lVert w\rVert = \sqrt{0.36 + 0.64} = 1$. Width $= 2$. Score at $(1,1)$ $= 0.6 + 0.8 - 0.4 = 1$, doori $= 1/1 = 1$ (ye point exactly margin par hai).

</details>

**2.** Scores: ($y = +1$, $f = 0.3$), ($y = -1$, $f = 0.2$), ($y = +1$, $f = 1.5$). Total hinge loss?

<details><summary>Answer dekho</summary>

$m$: $0.3$, $-0.2$, $1.5$. Hinge: $0.7$, $1.2$, $0$. Total $= 1.9$.

</details>

**3.** $K(x, z) = (1 + x^\top z)^3$, $x = (1, 0)$, $z = (1, 1)$. $K$ = ?

<details><summary>Answer dekho</summary>

$x^\top z = 1$. $K = (1 + 1)^3 = 8$.

</details>

**4.** Hard-margin SVM train hua. Ek training point jiska $y_if(x_i) = 3$ hai, use data se hata diya. Naya $w$?

<details><summary>Answer dekho</summary>

Wahi. $y_if = 3 > 1$ matlab margin se bahar, $\alpha_i = 0$, support vector nahi. Uska constraint active nahi tha, to solution nahi badalta.

</details>

## Ek page me

- $f(x) = w^\top x + b$, predict $\operatorname{sign} f$; $(cw, cb)$ wahi boundary.
- Point–boundary doori $= |w^\top x + b|/\lVert w\rVert$ (Euclidean norm).
- Hard margin: $\min\tfrac12\lVert w\rVert^2$ s.t. $y_i(w^\top x_i + b) \ge 1$.
- Margin hyperplanes $f = \pm1$; width $= 2/\lVert w\rVert$, half-width $1/\lVert w\rVert$.
- Support vectors: $y_if = 1$, $\alpha_i > 0$; $w = \sum\alpha_iy_ix_i$; non-SV hatao → kuch nahi badalta.
- Do SVs: $w \propto x_+ - x_-$, width $= \lVert x_+ - x_-\rVert$ (baaki points check karo).
- Soft margin: $\tfrac12\lVert w\rVert^2 + C\sum\xi_i$, $\xi_i = \max(0, 1 - y_if_i)$ (hinge).
- $\xi = 0$ bahar; $0 < \xi < 1$ andar sahi side; $\xi > 1$ misclassified.
- Bada $C$: patla margin, high variance; $C \to \infty$ = hard margin. Chhota $C$: chauda margin.
- Kernel $K = \phi(x)^\top\phi(z)$; poly $(1 + x^\top z)^p$ ($d = 2, p = 2$ → 6 features); RBF $e^{-\gamma\lVert x - z\rVert^2}$ (infinite-dim).
- Valid kernel: symmetric, PSD Gram matrix (Mercer).

Revision ke liye **Short note** tab dekho.
