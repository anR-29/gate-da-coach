# Logistic regression and k-NN

> **Time:** ~35 min · **Pehle aana chahiye:** $e^x$ aur natural log $\ln$, chain rule se derivative, Euclidean distance $\sqrt{(x_1-y_1)^2 + (x_2-y_2)^2}$, linear regression ka idea ($w^\top x + b$) · **Day:** 44, 49

## Ye topic kyun?

Classification me answer ek **class** hota hai (spam / not spam, pass / fail), number nahi. Logistic regression har input ko ek **probability** deta hai ki wo class 1 me hai, aur k-NN (k-nearest neighbours) bina koi formula seekhe, sirf "paas wale padosiyon" ko dekh kar class batata hai. GATE DA me inse 1–2 mark ke NAT aate hain (sigmoid ki value, threshold wala boundary, cross-entropy loss, k-NN ka vote ya mean) aur MCQ/MSQ aate hain ($k$ ka asar, scaling, $\sigma'$, log-odds).

## Picture se samjho

Linear regression ka output $z = w^\top x + b$ kuch bhi ho sakta hai: $-50$, $3$, $200$. Par probability $0$ aur $1$ ke beech honi chahiye. To hum $z$ ko ek "S-shaped" machine se guzarte hain jo kisi bhi number ko $(0,1)$ me daba deti hai — ye **sigmoid** hai.

<figure class="fig">
<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="220" x2="475" y2="220" stroke="currentColor"/>
<line x1="250" y1="230" x2="250" y2="30" stroke="currentColor"/>
<line x1="40" y1="40" x2="460" y2="40" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<text x="478" y="224" font-size="13" fill="currentColor">z</text>
<text x="256" y="36" font-size="12" fill="currentColor">p = 1</text>
<text x="256" y="236" font-size="12" fill="currentColor">0</text>
<polyline points="40.0,219.6 57.5,219.3 75.0,218.8 92.5,218.0 110.0,216.8 127.5,214.7 145.0,211.5 162.5,206.3 180.0,198.5 197.5,187.2 215.0,171.6 232.5,152.0 250.0,130.0 267.5,108.0 285.0,88.4 302.5,72.8 320.0,61.5 337.5,53.7 355.0,48.5 372.5,45.3 390.0,43.2 407.5,42.0 425.0,41.2 442.5,40.7 460.0,40.4" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<circle cx="250" cy="130" r="5" style="fill:var(--mark)"/>
<text x="140" y="126" font-size="12" style="fill:var(--mark)">z = 0 → p = 0.5</text>
<circle cx="298.5" cy="76" r="5" style="fill:var(--good)"/>
<line x1="298.5" y1="76" x2="298.5" y2="220" style="stroke:var(--good)" stroke-dasharray="3 3"/>
<text x="306" y="96" font-size="12" style="fill:var(--good)">z = ln 4 ≈ 1.39 → p = 0.8</text>
<text x="50" y="205" font-size="12" fill="currentColor">z bahut negative → p ≈ 0</text>
<text x="330" y="75" font-size="12" fill="currentColor">z bahut positive → p ≈ 1</text>
<text x="294" y="236" font-size="11" fill="currentColor">1.39</text>
</svg>
<figcaption>Sigmoid σ(z) = 1/(1 + e^(−z)). Beech me (z = 0) sabse tez chadhta hai; dono kinaron par flat ho jaata hai.</figcaption>
</figure>

Dhyan do: curve $z = 0$ par exactly $0.5$ deta hai, aur $z = 0$ ke dono taraf symmetric hai — $z = 2$ par jitna upar, $z = -2$ par utna hi neeche. Beech me slope sabse zyada ($0.25$) hai, kinaron par lagbhag zero.

Ab 2-D me dekho. Model $z = x_1 + x_2 - 3$ lo. Jahan $z = 0$ hai (yaani $x_1 + x_2 = 3$), wahan $p = 0.5$ — ye ek **seedhi line** hai. Line ke ek taraf class 1, doosri taraf class 0.

<figure class="fig">
<svg viewBox="0 0 530 310" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="290" x2="320" y2="290" stroke="currentColor"/>
<line x1="40" y1="290" x2="40" y2="15" stroke="currentColor"/>
<text x="305" y="306" font-size="12" fill="currentColor">x₁</text>
<text x="18" y="25" font-size="12" fill="currentColor">x₂</text>
<line x1="40" y1="155" x2="175" y2="290" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="40" y1="92.6" x2="237.4" y2="290" style="stroke:var(--mark)" stroke-width="2" stroke-dasharray="6 4"/>
<line x1="107.5" y1="222.5" x2="148" y2="182" style="stroke:var(--good)" stroke-width="2"/>
<polygon points="152.5,177.5 141,183 147,189" style="fill:var(--good)"/>
<text x="150" y="200" font-size="11" style="fill:var(--good)">w = (1, 1)</text>
<circle cx="220" cy="110" r="5" style="fill:var(--good)"/>
<circle cx="265" cy="200" r="5" style="fill:var(--good)"/>
<circle cx="175" cy="65" r="5" style="fill:var(--good)"/>
<rect x="80" y="240" width="10" height="10" style="fill:var(--bad)"/>
<rect x="58" y="195" width="10" height="10" style="fill:var(--bad)"/>
<rect x="125" y="262" width="10" height="10" style="fill:var(--bad)"/>
<text x="235" y="60" font-size="12" style="fill:var(--good)">class 1 side (z &gt; 0)</text>
<text x="48" y="282" font-size="11" style="fill:var(--bad)">class 0</text>
<text x="330" y="140" font-size="12" style="fill:var(--info)">— z = 0: x₁ + x₂ = 3</text>
<text x="340" y="156" font-size="12" style="fill:var(--info)">(threshold 0.5)</text>
<text x="330" y="190" font-size="12" style="fill:var(--mark)">- - z = ln 4: x₁ + x₂ ≈ 4.39</text>
<text x="340" y="206" font-size="12" style="fill:var(--mark)">(threshold 0.8)</text>
</svg>
<figcaption>Logistic regression ka decision boundary ek line hai. Threshold 0.5 se 0.8 karne par line parallel khisak jaati hai (curve nahi banti).</figcaption>
</figure>

Dhyan do: threshold badalne se boundary **parallel shift** hoti hai, kyunki ab condition $z = \text{constant}$ hai, aur $z$ abhi bhi linear hai. Vector $w$ boundary ke perpendicular hai aur class 1 ki taraf point karta hai.

Teesri picture: k-NN. Ek naya point (star) aaya. Uske paas ke $k$ training points dekho, unka majority vote = prediction.

<figure class="fig">
<svg viewBox="0 0 510 300" xmlns="http://www.w3.org/2000/svg">
<circle cx="130" cy="180" r="48" fill="none" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<circle cx="130" cy="180" r="94" fill="none" style="stroke:var(--muted)"/>
<circle cx="175" cy="180" r="6" style="fill:var(--mark)"/>
<circle cx="220" cy="135" r="6" style="fill:var(--mark)"/>
<circle cx="40" cy="270" r="6" style="fill:var(--mark)"/>
<rect x="79" y="219" width="12" height="12" style="fill:var(--info)"/>
<rect x="124" y="84" width="12" height="12" style="fill:var(--info)"/>
<rect x="259" y="39" width="12" height="12" style="fill:var(--info)"/>
<polygon points="130,170 133,177 140,178 135,183 136,190 130,186 124,190 125,183 120,178 127,177" fill="currentColor"/>
<text x="182" y="176" font-size="11" fill="currentColor">P1 (d=1)</text>
<text x="56" y="245" font-size="11" fill="currentColor">P2 (1.41)</text>
<text x="142" y="84" font-size="11" fill="currentColor">P3 (2)</text>
<text x="228" y="130" font-size="11" fill="currentColor">P4 (2.24)</text>
<text x="48" y="292" font-size="11" fill="currentColor">P5 (2.83)</text>
<text x="277" y="50" font-size="11" fill="currentColor">P6 (4.24)</text>
<circle cx="330" cy="200" r="6" style="fill:var(--mark)"/>
<text x="342" y="204" font-size="12" fill="currentColor">class A</text>
<rect x="324" y="219" width="12" height="12" style="fill:var(--info)"/>
<text x="342" y="230" font-size="12" fill="currentColor">class B</text>
<text x="320" y="256" font-size="12" fill="currentColor">k = 1 (dashed): A</text>
<text x="320" y="274" font-size="12" fill="currentColor">k = 3 (solid): A, B, B → B</text>
</svg>
<figcaption>Query (2, 2) star hai. Chhota circle sabse paas wala 1 point pakadta hai, bada circle 3 points. Answer k par depend karta hai.</figcaption>
</figure>

Dhyan do: $k = 1$ par answer A, $k = 3$ par B. Isliye k-NN sawaalon me sabse pehle distances ki **sorted list** banao, phir pehle $k$ lo.

## Concept step-by-step

### 1. Sigmoid function

**Definition:** $\sigma(z) = \dfrac{1}{1 + e^{-z}}$.

- $z = 0$: $e^0 = 1$, to $\sigma(0) = 1/2$.
- $z \to +\infty$: $e^{-z} \to 0$, $\sigma \to 1$. $z \to -\infty$: $e^{-z} \to \infty$, $\sigma \to 0$.
- **Symmetry:** $\sigma(-z) = \dfrac{1}{1 + e^{z}} = \dfrac{e^{-z}}{e^{-z} + 1} = 1 - \sigma(z)$.

Example: $\sigma(1) = 1/(1 + e^{-1}) = 1/(1 + 0.3679) = 0.731$; isliye $\sigma(-1) = 1 - 0.731 = 0.269$.

**Dhyan do:** exponent me **minus** $z$ hai. $1/(1 + e^{z})$ likh diya to answer $1 - p$ aa jaayega (0.731 ki jagah 0.269).

### 2. Logistic model aur log-odds

Model: $P(y = 1 \mid x) = p = \sigma(z)$, jahan $z = w^\top x + b$ (score).

**Odds** = $\dfrac{p}{1-p}$ ("haan" ke chances / "na" ke chances). $p = 0.8$ → odds $= 0.8/0.2 = 4$.

$p = 1/(1 + e^{-z})$ ko ulta karo: $1 + e^{-z} = 1/p \Rightarrow e^{-z} = \dfrac{1-p}{p} \Rightarrow e^{z} = \dfrac{p}{1-p}$. Log lo:
$$\ln\frac{p}{1-p} = z = w^\top x + b.$$
Yaani **log-odds linear hai**, $p$ khud linear nahi. Isliye ise "logistic regression" kehte hain.

Table yaad rakho: $p = 0.5 \to z = 0$; $p = 0.8 \to z = \ln 4 \approx 1.386$; $p = 0.9 \to z = \ln 9 \approx 2.197$; $p = 0.2 \to z = -\ln 4$.

**Dhyan do:** score = **log** of odds. $p = 0.8$ par score $4$ nahi, $\ln 4$ hai. Aur $\ln 0.8$ (probability ka log) bhi galat hai.

### 3. Decision boundary aur threshold

Rule: class 1 predict karo agar $p \ge t$ (threshold, default $t = 0.5$).

$\sigma$ hamesha badhta hua (increasing) function hai, to $\sigma(z) \ge t \iff z \ge \sigma^{-1}(t) = \ln\dfrac{t}{1-t}$.

- $t = 0.5$: $\ln 1 = 0$, boundary $w^\top x + b = 0$ — ek line/hyperplane.
- Koi bhi $t$: boundary $w^\top x + b = \ln\frac{t}{1-t}$ — phir bhi linear, bas shift.

Example: $p = \sigma(x_1 + x_2 - 3)$, $t = 0.8$. Class 1 jab $x_1 + x_2 - 3 \ge \ln 4$, yaani $x_1 + x_2 \ge 4.386$.

**Dhyan do:** threshold $t$ par $z = t$ mat rakho. $z = \ln\frac{t}{1-t}$ rakho.

### 4. Sigmoid ka derivative

$\sigma(z) = (1 + e^{-z})^{-1}$. Chain rule:
$$\sigma'(z) = \frac{e^{-z}}{(1 + e^{-z})^2} = \underbrace{\frac{1}{1 + e^{-z}}}_{\sigma}\cdot\underbrace{\frac{e^{-z}}{1 + e^{-z}}}_{1 - \sigma} = \sigma(z)(1 - \sigma(z)).$$
$\sigma(1-\sigma)$ maximum tab hai jab $\sigma = 0.5$ (yaani $z = 0$): $0.5 \times 0.5 = 0.25$.

Example: $\sigma = 0.3$ → $\sigma' = 0.3 \times 0.7 = 0.21$.

**Dhyan do:** $\sigma' \ne \sigma$ (wo $e^z$ ki property hai) aur $\sigma' \ne \sigma^2$.

### 5. Cross-entropy loss aur gradient

Training ka loss (ek point ka):
$$L = -[\,y\ln p + (1-y)\ln(1-p)\,].$$
$y = 1$ ho to sirf $-\ln p$ bachta hai (p bada to loss chhota). $y = 0$ ho to sirf $-\ln(1-p)$.

Example: $y = 1, p = 0.9$: $L = -\ln 0.9 = 0.105$. $y = 0, p = 0.9$: $L = -\ln 0.1 = 2.303$ (confident aur galat → bada loss).

**Gradient:** $\dfrac{\partial L}{\partial p} = -\dfrac{y}{p} + \dfrac{1-y}{1-p} = \dfrac{p - y}{p(1-p)}$. Phir $\dfrac{\partial p}{\partial z} = p(1-p)$, aur $\dfrac{\partial z}{\partial w} = x$. Multiply karo: $p(1-p)$ cancel ho jaata hai:
$$\frac{\partial L}{\partial w} = (p - y)\,x, \qquad \frac{\partial L}{\partial b} = p - y.$$
Gradient descent: $w \leftarrow w - \eta(p - y)x$.

Ye loss $w$ me **convex** hai (ek hi valley, local minimum = global minimum). Par agar data **linearly separable** hai aur koi regularisation nahi, to $w$ ko bada karte jaao to loss ghatta hi jaata hai — $\lVert w\rVert \to \infty$, finite minimum nahi milta.

**Dhyan do:** sum maanga hai ya mean, dhyan se padho. Log natural ($\ln$) hai jab tak alag na likha ho. $y = 0$ wale point par $\ln(1-p)$ lagta hai.

### 6. k-NN: algorithm

k-NN me "training" kuch nahi — bas data store karo. Naye point $x_0$ ke liye:
1. Har training point se distance nikaalo (usually Euclidean).
2. Distances ko chhote se bade sort karo.
3. Pehle $k$ points lo.
4. Classification: unka majority vote. Regression: unke $y$ ka **mean**.

Example (figure wala): query $(2,2)$. Distances: P1 1 (A), P2 1.414 (B), P3 2 (B), P4 2.236 (A), P5 2.828 (A), P6 4.243 (B). $k = 3$: A, B, B → **B**.

Cost: training $O(1)$ (sirf store), har prediction $O(nd)$ ($n$ points, $d$ features ki distance).

**Dhyan do:** agar query khud training set me hai aur sawaal "naya point" ki baat kare, to query ko uska apna neighbour mat gino. Regression me $x$ ka mean nahi, $y$ ka mean.

### 7. $k$ ka asar (bias–variance)

- $k = 1$: har training point ka sabse paas wala padosi wo khud hai, to **training error 0**. Boundary bahut tedhi-medhi → **low bias, high variance** (overfit).
- $k$ badhao: zyada padosiyon ka average → boundary smooth, **bias badhta, variance ghatta**.
- $k = n$: har query par saare points vote karte hain → hamesha poore data ki majority class. Training error maximum.

Two-class problem me odd $k$ lene se tie nahi hota.

**Dhyan do:** "$k = 1$ = high bias" ulta hai. $k = 1$ sabse flexible model hai.

### 8. Feature scaling

Distance me har feature ka difference square hokar judta hai. Agar ek feature (salary, 20,000–1,00,000) ki range doosre (age, 20–60) se bahut badi hai, to distance practically sirf salary decide karega. Isliye pehle scale karo:
- **min–max:** $x' = \dfrac{x - \min}{\max - \min}$ (range $[0,1]$);
- **z-score:** $x' = \dfrac{x - \mu}{\sigma}$.

Example: rooms (range 1–5) aur area (500–2500 sq ft). Raw distance me rooms ka 3 ka farak area ke 100 ke farak ke saamne kuch nahi. Scale karne ke baad rooms ka farak $3/4 = 0.75$ aur area ka $100/2000 = 0.05$ — ab rooms dominate karta hai. (Pura hisaab Example 6 me.)

**Dhyan do:** scaling se nearest neighbour badal sakta hai, aur isliye prediction bhi.

## Solved examples

**Example 1 (NAT, easy):** Logistic model $w = (1, -2)$, $b = 1$. Input $x = (2, 1)$ par $P(y = 1 \mid x)$ = ______ (do decimal).

**Soch:** seedha $z$ nikaalo, phir $\sigma$.

**Solution:**
1. $z = 1 \cdot 2 + (-2)\cdot 1 + 1 = 1$.
2. $\sigma(1) = 1/(1 + e^{-1}) = 1/1.3679 = 0.731$.
3. Answer $\approx 0.73$.

**Galti kahan hoti hai:** $1/(1 + e^{+1}) = 0.27$ — sigmoid me sign ulta.

**Example 2 (NAT, medium):** Classifier $P(y = 1 \mid x) = \sigma(2x_1 + x_2 - 4)$ use karta hai aur class 1 tabhi predict karta hai jab probability **kam se kam 0.9** ho. Line $x_2 = 0$ par sabse chhota $x_1$ jo class 1 milta hai = ______ (do decimal).

**Soch:** threshold 0.5 nahi hai → $z = \ln\frac{t}{1-t}$.

**Solution:**
1. $\sigma(z) \ge 0.9 \iff z \ge \ln(0.9/0.1) = \ln 9 = 2.197$.
2. $x_2 = 0$: $2x_1 - 4 \ge 2.197$.
3. $x_1 \ge (4 + 2.197)/2 = 3.099 \approx 3.10$.

**Galti kahan hoti hai:** $z \ge 0.9$ rakhna → $x_1 \ge 2.45$. Ya threshold ignore karke $z \ge 0$ → $x_1 \ge 2$.

**Example 3 (NAT, medium):** Teen training points par predicted probabilities: (y = 1, p = 0.9), (y = 0, p = 0.3), (y = 0, p = 0.6). Total (sum) cross-entropy loss, natural log ke saath = ______ (do decimal).

**Soch:** har point par sirf ek term bachta hai: $y = 1$ → $-\ln p$, $y = 0$ → $-\ln(1-p)$.

**Solution:**
1. Point 1: $-\ln 0.9 = 0.1054$.
2. Point 2: $-\ln(1 - 0.3) = -\ln 0.7 = 0.3567$.
3. Point 3: $-\ln(1 - 0.6) = -\ln 0.4 = 0.9163$.
4. Sum $= 1.378 \approx 1.38$.

**Galti kahan hoti hai:** $y = 0$ points par bhi $-\ln p$ lagana: $0.105 + 1.204 + 0.511 = 1.82$. Ya sum ki jagah mean ($0.46$) likhna.

**Example 4 (MSQ, medium):** Binary logistic regression, $p = \sigma(w^\top x + b)$, cross-entropy se train. Kaunse sahi hain?
(A) $\sigma'(0) = 0.25$
(B) $\sigma(-2) = 1 - \sigma(2)$
(C) Threshold 0.5 se 0.7 karne par decision boundary curved ho jaati hai
(D) Ek point ke loss ka $w$ ke saath gradient $(y - p)x$ hai

**Soch:** step 1, 3, 4, 5 ki properties.

**Solution:**
1. (A): $\sigma(0)(1 - \sigma(0)) = 0.5 \times 0.5 = 0.25$ ✓.
2. (B): symmetry $\sigma(-z) = 1 - \sigma(z)$ ✓.
3. (C): nayi boundary $w^\top x + b = \ln(0.7/0.3) = 0.847$ — abhi bhi linear, sirf shift. ✗
4. (D): gradient $(p - y)x$ hai; $(y - p)x$ uska negative (descent direction) hai. ✗

Answer: **(A), (B)**.

**Galti kahan hoti hai:** (D) ko sahi maan lena kyunki update rule me $(y - p)x$ dikhta hai ($w \leftarrow w + \eta(y - p)x$). Gradient aur update direction alag cheezein hain.

**Example 5 (MSQ, medium):** Training points (Euclidean distance, majority vote): P1 (3,2) A, P2 (1,1) B, P3 (2,4) B, P4 (4,3) A, P5 (0,0) A, P6 (5,5) B. Query $(2,2)$. Kaunse statements sahi hain?
(A) $k = 1$ par prediction A
(B) $k = 3$ par prediction A
(C) $k = 5$ par prediction A
(D) $k = 4$ par prediction B

**Soch:** sorted distance list banao, phir har $k$ ke liye pehle $k$ gino.

**Solution:**
1. Distances: P1 $1$, P2 $\sqrt 2 = 1.414$, P3 $2$, P4 $\sqrt 5 = 2.236$, P5 $\sqrt 8 = 2.828$, P6 $\sqrt{18} = 4.243$.
2. Sorted classes: A, B, B, A, A, B.
3. $k = 1$: A ✓. $k = 3$: A, B, B → B, to (B) ✗.
4. $k = 5$: A, B, B, A, A → 3 A vs 2 B → A ✓.
5. $k = 4$: A, B, B, A → 2–2 tie, B nahi → (D) ✗.

Answer: **(A), (C)**.

**Galti kahan hoti hai:** $k = 3$ par sabse paas wale ki class (A) likh dena, ya distances bina sort kiye table ke order me pehle 3 points le lena.

**Example 6 (MCQ, hard):** 1-NN, do features: rooms (range 1 se 5) aur area (range 500 se 2500 sq ft). Training: P = (2 rooms, 1000 sq ft) class X; Q = (5 rooms, 1100 sq ft) class Y. Query = (5 rooms, 1000 sq ft). Raw distance aur min–max scaling ke baad prediction kya hoga?
(A) dono me X (B) dono me Y (C) raw me X, scaled me Y (D) raw me Y, scaled me X

**Soch:** alag-alag range wale features + distance → scaling ka sawaal.

**Solution:**
1. Raw: $d(\text{query}, P) = \sqrt{3^2 + 0^2} = 3$; $d(\text{query}, Q) = \sqrt{0^2 + 100^2} = 100$. P paas → X.
2. Scaled: rooms ka farak $/4$, area ka farak $/2000$.
3. $d(\text{query}, P) = \sqrt{0.75^2 + 0} = 0.75$; $d(\text{query}, Q) = \sqrt{0 + 0.05^2} = 0.05$. Q paas → Y.
4. Answer **(C)**.

**Galti kahan hoti hai:** sochna ki scaling sirf numbers chhote karti hai, order nahi badalti → (A). Order badal jaata hai kyunki dono features ka relative weight badalta hai.

## Confusions clear karo

**Q:** Logistic "regression" hai to ye classification kaise karta hai?
**A:** Ye log-odds par linear regression jaisa hai (naam wahin se). Output probability hai, aur threshold lagakar class milti hai. Use classification ke liye hi hota hai.

**Q:** Probability, odds aur log-odds me farak?
**A:** $p = 0.8$ probability hai. Odds $= p/(1-p) = 4$. Log-odds $= \ln 4 = 1.386$, aur yahi $w^\top x + b$ ke barabar hai.

**Q:** Boundary linear hai to model linear hai, phir $p$ linear kyun nahi?
**A:** $z$ linear hai, aur boundary $z = $ constant hai, isliye boundary linear. Par $p = \sigma(z)$ ek S-curve hai — $x$ double karne se $p$ double nahi hota.

**Q:** Squared error ki jagah cross-entropy kyun?
**A:** Sigmoid ke saath squared error non-convex ho jaata hai aur gradient me $\sigma'$ factor rahta hai jo kinaron par lagbhag 0 hai (seekhna ruk jaata). Cross-entropy convex hai aur gradient seedha $(p - y)x$.

**Q:** k-NN me tie aaye to?
**A:** Two-class me odd $k$ lo to tie nahi aata. Warna koi rule chahiye (jaise nearest ka vote ya random) — GATE usually tie se bachne wala data deta hai, ya option me "tie" rakhta hai.

**Q:** k-NN "lazy" kyun kehlata hai?
**A:** Training me kuch seekhta nahi, sirf data rakhta hai. Saara kaam prediction ke time hota hai ($O(nd)$ per query), isliye bade data par prediction slow hai.

**Q:** $k = 1$ ka training error 0 kyun hai?
**A:** Training point ko predict karte waqt uska sabse paas wala point wo khud hai (distance 0), to apna hi label milta hai (agar duplicate points alag label ke saath na hon).

## Khud try karo

**1.** Logistic model ne $p = 0.2$ diya. Score $w^\top x + b$ kitna hai?

<details><summary>Answer dekho</summary>

Odds $= 0.2/0.8 = 0.25$, score $= \ln 0.25 = -\ln 4 \approx -1.386$.

</details>

**2.** Kisi $z$ par $\sigma(z) = 0.3$. $\sigma'(z)$ = ?

<details><summary>Answer dekho</summary>

$\sigma' = \sigma(1 - \sigma) = 0.3 \times 0.7 = 0.21$.

</details>

**3.** Point $x = (1, 2)$, $y = 0$, model ne $p = 0.7$ diya. Loss ka $w$ ke saath gradient kya hai? $\eta = 0.5$ aur $w = (0, 0)$ se ek gradient descent step ke baad $w$?

<details><summary>Answer dekho</summary>

Gradient $= (p - y)x = 0.7 \times (1, 2) = (0.7, 1.4)$.
$w \leftarrow w - \eta \cdot \text{grad} = (0,0) - 0.5(0.7, 1.4) = (-0.35, -0.7)$.

</details>

**4.** k-NN regression, $k = 3$, distance $|x - x_0|$: data $x = 1, 3, 4, 6, 10$; $y = 2, 6, 5, 9, 20$. $x_0 = 5$ par prediction?

<details><summary>Answer dekho</summary>

Distances: $4, 2, 1, 1, 5$. Teen sabse paas: $x = 4$ (y 5), $x = 6$ (y 9), $x = 3$ (y 6). Prediction $= (5 + 9 + 6)/3 = 6.67$. (Galti: $x$ ka mean $4.33$ likhna.)

</details>

**5.** 7 training points me 4 class A aur 3 class B hain. $k = 7$ par kisi bhi query ki prediction?

<details><summary>Answer dekho</summary>

Saare 7 vote karte hain → hamesha A (overall majority). Ye maximum-bias case hai.

</details>

## Ek page me

- $\sigma(z) = 1/(1 + e^{-z})$; $\sigma(0) = 0.5$; $\sigma(-z) = 1 - \sigma(z)$.
- Model: $p = \sigma(w^\top x + b)$; log-odds $\ln\frac{p}{1-p} = w^\top x + b$ (linear), $p$ linear nahi.
- $p = 0.8 \to z = \ln 4$; $p = 0.9 \to z = \ln 9$; score = log of odds, odds nahi.
- Threshold $t$: boundary $w^\top x + b = \ln\frac{t}{1-t}$ — hamesha linear; $t = 0.5$ par $z = 0$.
- $\sigma' = \sigma(1 - \sigma)$, max $0.25$ at $z = 0$.
- Loss $-[y\ln p + (1-y)\ln(1-p)]$; gradient $(p - y)x$; convex; separable data par $\lVert w\rVert \to \infty$.
- k-NN: distances → sort → pehle $k$ → vote (regression: $y$ ka mean).
- $k = 1$: training error 0, low bias, high variance. $k$ ↑: smoother, bias ↑. $k = n$: hamesha majority.
- Pehle features scale karo (min–max ya z-score), warna badi range wala feature distance decide karega.
- k-NN training free, prediction $O(nd)$ per query.

Revision ke liye **Short note** tab dekho.
