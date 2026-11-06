# Linear and ridge regression

> **Time:** ~35 min · **Pehle aana chahiye:** mean ($\bar x$), summation $\sum$, derivative ko zero rakh kar minimum nikaalna (Class 12 calculus), matrix multiplication aur inverse ka basic idea · **Day:** 43, 49

## Ye topic kyun?

Hamare paas data points $(x_i, y_i)$ hain aur hum ek seedhi line chahte hain jo $x$ se $y$ predict kare — jaise ghar ka area se price, ya padhai ke ghante se marks. Least squares batata hai ki "best" line kaunsi hai, aur ridge regression usi line ko thoda control me rakhta hai taaki model overfit na kare. GATE DA me yahan se mostly 1–2 mark ke NAT aate hain (slope, intercept, residual, $R^2$, ridge weight nikaalo) aur MCQ/MSQ aate hain ki kaunsa formula sahi hai, residuals ki kaunsi property hamesha true hai, aur $\lambda$ badhane se kya hota hai.

## Picture se samjho

Socho tumhare paas 5 students ka data hai: $x$ = padhai ke ghante, $y$ = test score (10 me se). Points ek line ke aas-paas bikhre hain, par exactly line par nahi. Hum ek line kheenchte hain. Har point se line tak ki **seedhi vertical doori** us point ki galti hai — isse **residual** kehte hain.

<figure class="fig">
<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="260" x2="480" y2="260" stroke="currentColor"/>
<line x1="50" y1="260" x2="50" y2="25" stroke="currentColor"/>
<text x="470" y="282" font-size="13" fill="currentColor">x</text>
<text x="30" y="35" font-size="13" fill="currentColor">y</text>
<text x="116" y="278" font-size="11" fill="currentColor">1</text>
<text x="186" y="278" font-size="11" fill="currentColor">2</text>
<text x="256" y="278" font-size="11" fill="currentColor">3</text>
<text x="326" y="278" font-size="11" fill="currentColor">4</text>
<text x="396" y="278" font-size="11" fill="currentColor">5</text>
<line x1="50" y1="218.4" x2="470" y2="45.6" style="stroke:var(--info)" stroke-width="2"/>
<line x1="120" y1="196" x2="120" y2="189.6" style="stroke:var(--bad)" stroke-width="2"/>
<line x1="190" y1="164" x2="190" y2="160.8" style="stroke:var(--bad)" stroke-width="2"/>
<line x1="260" y1="100" x2="260" y2="132" style="stroke:var(--bad)" stroke-width="2"/>
<line x1="330" y1="132" x2="330" y2="103.2" style="stroke:var(--bad)" stroke-width="2"/>
<line x1="400" y1="68" x2="400" y2="74.4" style="stroke:var(--bad)" stroke-width="2"/>
<circle cx="120" cy="196" r="5" style="fill:var(--mark)"/>
<circle cx="190" cy="164" r="5" style="fill:var(--mark)"/>
<circle cx="260" cy="100" r="5" style="fill:var(--mark)"/>
<circle cx="330" cy="132" r="5" style="fill:var(--mark)"/>
<circle cx="400" cy="68" r="5" style="fill:var(--mark)"/>
<circle cx="260" cy="132" r="6" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<text x="270" y="150" font-size="12" style="fill:var(--good)">(x̄, ȳ) = (3, 4)</text>
<text x="300" y="40" font-size="12" style="fill:var(--info)">ŷ = 1.3 + 0.9x</text>
<text x="110" y="88" font-size="12" style="fill:var(--bad)">residual e = y − ŷ</text>
<line x1="225" y1="90" x2="255" y2="108" style="stroke:var(--bad)"/>
</svg>
<figcaption>Points (1,2), (2,3), (3,5), (4,4), (5,6) aur unki least squares line. Laal vertical tukde residuals hain; hara gola mean point hai.</figcaption>
</figure>

Dhyan do: residual **vertical** hai (y-direction me), perpendicular doori nahi — kyunki hum $y$ predict kar rahe hain. Kuch residuals upar (positive), kuch neeche (negative) hain. Least squares wo line chunta hai jiske liye in laal tukdon ki **lambaiyon ke squares ka sum** sabse chhota ho. Aur notice karo: line exactly hare gole $(\bar x, \bar y)$ se guzarti hai — ye intercept wale model ki khaas property hai.

Ab ridge ki picture. Ridge me hum line ke slope $w$ par "jurmana" (penalty) lagate hain: $\lambda$ jitna bada, $w$ utna chhota.

<figure class="fig">
<svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="230" x2="460" y2="230" stroke="currentColor"/>
<line x1="50" y1="230" x2="50" y2="30" stroke="currentColor"/>
<text x="445" y="252" font-size="13" fill="currentColor">λ</text>
<text x="28" y="40" font-size="13" fill="currentColor">w</text>
<polyline points="50.0,65.7 76.0,102.2 102.0,125.5 128.0,141.5 154.0,153.3 180.0,162.4 206.0,169.5 232.0,175.2 258.0,180.0 284.0,184.0 310.0,187.4 336.0,190.3 362.0,192.9 388.0,195.2 414.0,197.1 440.0,198.9" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="50" cy="65.7" r="4" style="fill:var(--mark)"/>
<text x="58" y="60" font-size="12" fill="currentColor">λ = 0: OLS, w = 23/14 ≈ 1.64</text>
<line x1="50" y1="147.9" x2="141" y2="147.9" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<line x1="141" y1="147.9" x2="141" y2="230" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<circle cx="141" cy="147.9" r="4" style="fill:var(--mark)"/>
<text x="150" y="140" font-size="12" fill="currentColor">λ = Σx² = 14: w aadha (0.82)</text>
<text x="135" y="248" font-size="11" fill="currentColor">14</text>
<text x="300" y="220" font-size="12" style="fill:var(--muted)">w → 0 par kabhi exactly 0 nahi</text>
</svg>
<figcaption>Data x = 1, 2, 3 aur y = 2, 3, 5 par ridge weight w = Σxy/(Σx² + λ) = 23/(14 + λ). λ badhne par w smoothly ghatta hai.</figcaption>
</figure>

Dhyan do: curve kabhi zero ko touch nahi karta — ridge weights ko chhota karta hai, khatam nahi. Aur $\lambda = \sum x^2$ par weight bilkul aadha ho jaata hai; ye GATE ka favourite shortcut hai.

## Concept step-by-step

### 1. Residual aur Sum of Squared Errors (SSE)

Model ek prediction $\hat y_i$ ("y-hat", yaani fitted value) deta hai. **Residual** = observed minus fitted:
$$e_i = y_i - \hat y_i.$$
Hum chahte hain saare residuals chhote hon. Seedha $\sum e_i$ chhota karna bekaar hai (positive aur negative cancel ho jaate). Isliye hum squares jodte hain:
$$SSE = \sum_i (y_i - \hat y_i)^2.$$
**Least squares** = wo parameters chuno jo SSE minimum kare. Tarika hamesha same: har parameter ke saath partial derivative lo, zero rakho, solve karo.

Example: upar wale data par line $\hat y = 1.3 + 0.9x$ ke residuals: $x=1$ par $\hat y = 2.2$, $e = 2 - 2.2 = -0.2$. Saare: $-0.2, -0.1, 1.0, -0.9, 0.2$. $SSE = 0.04 + 0.01 + 1 + 0.81 + 0.04 = 1.9$.

**Dhyan do:** residual ka sign $y - \hat y$ hai. Point line ke upar hai to residual positive. $\hat y - y$ likhoge to sign ulta aa jaayega aur NAT galat.

### 2. Line through the origin: $\hat y = wx$

Yahan sirf ek parameter hai, $w$ (koi intercept nahi, line $(0,0)$ se guzarti hai).
$$SSE(w) = \sum (y_i - wx_i)^2.$$
Derivative: $\dfrac{d}{dw}SSE = \sum 2(y_i - wx_i)(-x_i) = -2\sum x_i(y_i - wx_i)$. Zero rakho:
$$\sum x_iy_i - w\sum x_i^2 = 0 \;\Rightarrow\; w = \frac{\sum x_iy_i}{\sum x_i^2}.$$

Tiny example: $x = 1, 2, 3$, $y = 2, 3, 5$. $\sum xy = 2 + 6 + 15 = 23$, $\sum x^2 = 1 + 4 + 9 = 14$, to $w = 23/14 \approx 1.643$.

Zero-derivative condition khud ek property hai: $\sum x_i e_i = 0$ **hamesha**. Par $\sum e_i = 0$ **zaroori nahi**. Check: data $(1,1), (2,4)$: $w = (1 + 8)/(1 + 4) = 1.8$; residuals $1 - 1.8 = -0.8$ aur $4 - 3.6 = 0.4$. $\sum e = -0.4 \ne 0$, par $\sum xe = -0.8 + 0.8 = 0$. ✓

**Minimum SSE (shortcut):** $w$ wapas daalne par
$$SSE_{min} = \sum y^2 - \frac{(\sum xy)^2}{\sum x^2}.$$
Kyun: $SSE = \sum y^2 - 2w\sum xy + w^2\sum x^2$; $w = \sum xy/\sum x^2$ daalo to beech wale do terms milkar $-(\sum xy)^2/\sum x^2$ ban jaate hain. Example: $\sum y^2 = 4 + 9 + 25 = 38$, to $SSE = 38 - 529/14 = 38 - 37.786 = 0.214$.

**Feature $\phi(x)$:** agar model $\hat y = w\,\phi(x)$ hai (jaise $\hat y = wx^2$), to bas $x$ ki jagah $\phi$ rakho: $w = \sum \phi_i y_i / \sum \phi_i^2$. Feature $x^2$ ho to denominator $\sum (x^2)^2 = \sum x^4$ hai.

**Dhyan do:** $\sum y / \sum x$ slope nahi hai. Wo $\sum(y - wx) = 0$ solve karta hai, jo least squares ki condition nahi. Least squares har point ko uske $x$ se weight karta hai.

### 3. Line with intercept: $\hat y = a + bx$

Ab do parameters. $SSE(a,b) = \sum (y_i - a - bx_i)^2$.

- $\partial/\partial a = 0$: $\sum (y_i - a - bx_i) = 0 \Rightarrow \sum y = na + b\sum x$.
- $\partial/\partial b = 0$: $\sum x_i(y_i - a - bx_i) = 0 \Rightarrow \sum xy = a\sum x + b\sum x^2$.

Ye do equations **normal equations** hain. Dhyan se dekho: pehli me $a$ ka coefficient $n$ hai (kyunki constant $a$ ko $n$ baar joda), sirf $a$ nahi.

Pehli equation ko $n$ se divide karo: $\bar y = a + b\bar x$. Matlab line **$(\bar x, \bar y)$ se guzarti hai**, aur
$$a = \bar y - b\bar x.$$
Ise doosri me daal kar solve karne par
$$b = \frac{S_{xy}}{S_{xx}}, \quad S_{xy} = \sum (x_i - \bar x)(y_i - \bar y), \quad S_{xx} = \sum (x_i - \bar x)^2.$$

Raw sums se: $S_{xy} = \sum xy - n\bar x\bar y$, $S_{xx} = \sum x^2 - n\bar x^2$ (centering ka shortcut).

Example (picture wala data): $x = 1..5$, $y = 2, 3, 5, 4, 6$. $\bar x = 3$, $\bar y = 4$.
Deviations $x - \bar x$: $-2, -1, 0, 1, 2$; $y - \bar y$: $-2, -1, 1, 0, 2$.
$S_{xy} = 4 + 1 + 0 + 0 + 4 = 9$, $S_{xx} = 4 + 1 + 0 + 1 + 4 = 10$. To $b = 0.9$, $a = 4 - 0.9 \times 3 = 1.3$.
Raw sums se check: $\sum xy = 2 + 6 + 15 + 16 + 30 = 69$, $n\bar x\bar y = 60$, $S_{xy} = 9$. ✓

Residuals: $-0.2, -0.1, 1.0, -0.9, 0.2$; inka sum $= 0$. Intercept wale model me **$\sum e_i = 0$** (ye $a$ ki normal equation hai) aur $\sum x_ie_i = 0$ (ye $b$ ki).

**Dhyan do:** $a = \bar y - b\bar x$ me **minus** hai. Aur model padho pehle: intercept hai to $S_{xy}/S_{xx}$; nahi hai to $\sum xy/\sum x^2$. Inko mix karna sabse common galti hai.

### 4. Matrix form: $X^\top X\beta = X^\top y$

Bahut features hon to sab equations ek saath likhte hain. Design matrix $X$ ki har row ek data point hai; intercept ke liye pehla column saare 1s ka. $\beta$ = parameters ka vector. SSE $= \lVert y - X\beta\rVert^2$. Gradient zero karne par
$$X^\top X\beta = X^\top y \quad\Rightarrow\quad \beta = (X^\top X)^{-1}X^\top y \;(\text{agar invertible}).$$

Example: $\hat y = a + bx$ ke liye
$$X^\top X = \begin{pmatrix} n & \sum x \\ \sum x & \sum x^2 \end{pmatrix}, \quad X^\top y = \begin{pmatrix} \sum y \\ \sum xy \end{pmatrix}$$
— ye bilkul step 3 ki do normal equations hain. Picture wale data par: $\begin{pmatrix} 5 & 15 \\ 15 & 55 \end{pmatrix}\begin{pmatrix} a \\ b\end{pmatrix} = \begin{pmatrix} 20 \\ 69\end{pmatrix}$. Check: $5(1.3) + 15(0.9) = 6.5 + 13.5 = 20$ ✓, $15(1.3) + 55(0.9) = 19.5 + 49.5 = 69$ ✓.

**Dhyan do:** $X^\top X$ singular ho sakta hai (jaise features $d > n$ ho, ya do columns same hon). Tab OLS ka unique solution nahi milta — yahi ridge ka ek bada fayda hai (step 6).

### 5. $R^2$: fit kitna achha hai

Total variation $SST = S_{yy} = \sum (y - \bar y)^2$ (agar hum sirf $\bar y$ predict karte to itni galti hoti). Line ke baad bachi galti $SSE$. To
$$R^2 = 1 - \frac{SSE}{SST}.$$
Intercept wale model me $SSE = S_{yy} - S_{xy}^2/S_{xx}$, isliye
$$R^2 = \frac{S_{xy}^2}{S_{xx}S_{yy}} = r^2,$$
jahan $r$ correlation coefficient hai.

Example: $S_{yy} = 4 + 1 + 1 + 0 + 4 = 10$. $SSE = 10 - 81/10 = 1.9$ (step 1 se match ✓). $R^2 = 1 - 1.9/10 = 0.81$. Aur $r = 9/\sqrt{10 \cdot 10} = 0.9$, $r^2 = 0.81$ ✓.

Kyun $R^2 \in [0,1]$ (training data par, intercept ke saath)? OLS kam se kam "$\hat y = \bar y$" (yaani $b = 0$) jitna achha to kar hi sakta hai, to $SSE \le SST$.

**Dhyan do:** sawaal $R^2$ maange to $r$ mat likho (0.9 vs 0.81). Aur bina intercept ke ya test data par $R^2$ negative bhi ho sakta hai.

### 6. Ridge regression

Problem: kam data, bahut features, ya features aapas me milte-julte → OLS weights bahut bade aur unstable ho jaate hain (thoda data badla, weights bahut badal gaye = **high variance**). Ridge ek penalty jodta hai:
$$\min_w \sum (y_i - wx_i)^2 + \lambda w^2, \quad \lambda \ge 0.$$

1-D derivation: derivative $= -2\sum x_i(y_i - wx_i) + 2\lambda w = 0$. Dono taraf ka $2$ cancel:
$$\sum xy = w\left(\sum x^2 + \lambda\right) \;\Rightarrow\; w = \frac{\sum xy}{\sum x^2 + \lambda}.$$
Example: $x = 1,2,3$, $y = 2,3,5$, $\lambda = 6$: $w = 23/(14 + 6) = 1.15$ (OLS 1.643 se chhota).

Matrix form: gradient $-2X^\top(y - Xw) + 2\lambda w = 0$ se
$$w = (X^\top X + \lambda I)^{-1}X^\top y.$$
$X^\top X$ ke eigenvalues $\ge 0$ hote hain; $\lambda I$ jodne se sab $\ge \lambda > 0$ ho jaate hain, to matrix **hamesha invertible** (chahe $X^\top X$ singular ho).

**Shrink factor:** agar $X^\top X$ diagonal hai, diagonal entries $d_j$, to $w_j^{ridge} = \dfrac{(X^\top y)_j}{d_j + \lambda} = \dfrac{d_j}{d_j + \lambda}\, w_j^{OLS}$. Har feature alag factor se sikudta hai.

**Halving shortcut (1-D):** $w_\lambda = w_0/2$ chahiye to $\sum x^2 + \lambda = 2\sum x^2$, yaani $\lambda = \sum x^2$.

**$\lambda$ badhane ka asar:**
- weights $0$ ki taraf shrink, par kabhi exactly $0$ nahi (exactly 0 karna **lasso**, $\ell_1$ penalty, ka kaam hai);
- bias badhta, variance ghatta;
- training error badhta (kyunki $\lambda = 0$ wala OLS hi training SSE ka minimum hai);
- $\lambda \to \infty$ par $w \to 0$.

**Practical rules:** features ko pehle standardise karo (penalty har weight ko same tarah punish karti hai, to metre vs centimetre jaise scale se answer badal jaata hai). Intercept ko penalise mat karo (warna predictions $y$ ke shift par depend karne lagenge).

**Dhyan do:** denominator me $\lambda$ hi aata hai — $\lambda^2$ ya $2\lambda$ nahi. Penalty $\lambda w^2$ ka derivative $2\lambda w$ hai, aur wo $2$ SSE ke $2$ se cancel ho jaata hai.

## Solved examples

**Example 1 (MCQ, easy):** Model $\hat y = wx$ (no intercept) ko least squares se points $(1, 4)$ aur $(3, 5)$ par fit kiya. $w$ hai: (A) 2.25 (B) 1.9 (C) 0.5 (D) 4.75

**Soch:** "no intercept" → $w = \sum xy / \sum x^2$.

**Solution:**
1. $\sum xy = 1\cdot 4 + 3 \cdot 5 = 19$.
2. $\sum x^2 = 1 + 9 = 10$.
3. $w = 19/10 = 1.9$. Answer **(B)**.

**Galti kahan hoti hai:** $\sum y/\sum x = 9/4 = 2.25$ (A) lena. Ye "average ratio" lagta hai par least squares ka answer nahi. Aur $S_{xy}/S_{xx}$ lagana bhi galat, kyunki model me intercept nahi hai.

**Example 2 (NAT, easy):** $n = 5$ points ke liye $\sum x = 15$, $\sum y = 30$, $\sum x^2 = 55$, $\sum xy = 104$. Line $\hat y = a + bx$ ka intercept $a$ = ______.

**Soch:** raw sums diye hain + intercept model → $S_{xy}$, $S_{xx}$ raw sums se banao.

**Solution:**
1. $\bar x = 3$, $\bar y = 6$.
2. $S_{xx} = 55 - 5 \cdot 3^2 = 10$.
3. $S_{xy} = 104 - 5 \cdot 3 \cdot 6 = 14$.
4. $b = 14/10 = 1.4$.
5. $a = \bar y - b\bar x = 6 - 4.2 = 1.8$.

**Galti kahan hoti hai:** $a = \bar y + b\bar x = 10.2$ (sign galat). Ya $b = \sum xy/\sum x^2 = 104/55$ lena (origin wala formula).

**Example 3 (NAT, medium):** Line $\hat y = a + bx$ ko data $x = 0, 1, 2, 3$; $y = 2, 1, 4, 5$ par OLS se fit kiya. $R^2$ = ______ (do decimal tak).

**Soch:** "$R^2$" + intercept → $S_{xy}^2/(S_{xx}S_{yy})$ sabse tez.

**Solution:**
1. $\bar x = 1.5$, $\bar y = 3$.
2. $x - \bar x = -1.5, -0.5, 0.5, 1.5$; $y - \bar y = -1, -2, 1, 2$.
3. $S_{xy} = 1.5 + 1 + 0.5 + 3 = 6$; $S_{xx} = 2.25 + 0.25 + 0.25 + 2.25 = 5$; $S_{yy} = 1 + 4 + 1 + 4 = 10$.
4. $R^2 = 36/(5 \times 10) = 0.72$.
5. Cross-check: $b = 1.2$, $a = 3 - 1.8 = 1.2$; residuals $0.8, -1.4, 0.4, 0.2$ (sum 0 ✓); $SSE = 0.64 + 1.96 + 0.16 + 0.04 = 2.8$; $1 - 2.8/10 = 0.72$ ✓.

**Galti kahan hoti hai:** $r = 6/\sqrt{50} \approx 0.85$ likh dena. Sawaal $R^2$ maang raha hai, jo $r^2$ hai.

**Example 4 (MSQ, medium):** Model $\hat y = wx$ (**no intercept**) points $(1, 1)$ aur $(2, 4)$ par least squares se fit hua; $e_i = y_i - \hat y_i$. Kaunse statements sahi hain?
(A) $\sum e_i = 0$ (B) $\sum x_ie_i = 0$ (C) $w = 1.8$ (D) Line $(\bar x, \bar y)$ se guzarti hai

**Soch:** no-intercept model me sirf ek normal equation hai: $\sum xe = 0$. Baaki properties intercept se aati hain.

**Solution:**
1. $w = (1 + 8)/(1 + 4) = 9/5 = 1.8$ → (C) sahi.
2. Residuals: $1 - 1.8 = -0.8$, $4 - 3.6 = 0.4$.
3. $\sum e = -0.4 \ne 0$ → (A) galat.
4. $\sum xe = -0.8 + 0.8 = 0$ → (B) sahi.
5. $(\bar x, \bar y) = (1.5, 2.5)$; $1.8 \times 1.5 = 2.7 \ne 2.5$ → (D) galat.

Answer: **(B), (C)**.

**Galti kahan hoti hai:** intercept wale model ki properties ($\sum e = 0$, mean point se guzarna) ko har model par laga dena.

**Example 5 (NAT, medium):** Ridge (no intercept, do features) me $X^\top X = \begin{pmatrix} 2 & 0 \\ 0 & 8\end{pmatrix}$, $X^\top y = \begin{pmatrix} 6 \\ 4 \end{pmatrix}$, $\lambda = 2$. $w_1 + w_2$ = ______.

**Soch:** diagonal $X^\top X$ → har weight alag: $w_j = (X^\top y)_j/(d_j + \lambda)$.

**Solution:**
1. $X^\top X + 2I = \text{diag}(4, 10)$.
2. $w_1 = 6/4 = 1.5$, $w_2 = 4/10 = 0.4$.
3. $w_1 + w_2 = 1.9$.

(OLS hota to $(3, 0.5)$, sum 3.5. Shrink factors: $2/4 = 0.5$ aur $8/10 = 0.8$ — chhote $d_j$ wala feature zyada sikudta hai.)

**Galti kahan hoti hai:** $\lambda^2 = 4$ jodna → $(1, 1/3)$, sum 1.33. Ya penalty bhool kar OLS ka 3.5 likh dena.

**Example 6 (MCQ, hard):** Model $\hat y = w x^2$ ko points $(1, 2), (2, 7), (3, 20)$ par least squares se fit kiya. $w$ hai: (A) 15 (B) 15/7 (C) 29/6 (D) 20/7

**Soch:** feature $\phi = x^2$ → $w = \sum \phi y / \sum \phi^2 = \sum x^2y / \sum x^4$.

**Solution:**
1. $\sum x^2 y = 1\cdot 2 + 4 \cdot 7 + 9 \cdot 20 = 2 + 28 + 180 = 210$.
2. $\sum x^4 = 1 + 16 + 81 = 98$.
3. $w = 210/98 = 15/7 \approx 2.14$. Answer **(B)**.

**Galti kahan hoti hai:** denominator $\sum x^2 = 14$ lena → $210/14 = 15$ (A). Denominator hamesha feature ka square hai: $(x^2)^2 = x^4$. (C) $= \sum y/\sum x = 29/6$ wali galti hai.

## Confusions clear karo

**Q:** Residual vertical kyun naapte hain, line se perpendicular doori kyun nahi?
**A:** Kyunki hum $x$ diya hua maan kar $y$ predict kar rahe hain. Galti $y$ me hai, to galti $y$-direction me naapte hain. (Perpendicular doori wala method alag hai — wo PCA jaisa lagta hai.)

**Q:** Squares hi kyun? Absolute value kyun nahi?
**A:** Square smooth hai, to derivative lekar seedha closed-form formula mil jaata hai. Absolute value bhi valid loss hai (outliers par robust), par uska simple formula nahi hota.

**Q:** Kab $\sum xy/\sum x^2$ aur kab $S_{xy}/S_{xx}$?
**A:** Model dekho. $\hat y = wx$ (koi constant nahi) → $\sum xy/\sum x^2$. $\hat y = a + bx$ → $S_{xy}/S_{xx}$ (centred sums). Agar $\bar x = 0$ ho to dono same nikalte hain, warna nahi.

**Q:** $\sum e_i = 0$ hamesha hota hai kya?
**A:** Nahi. Sirf jab model me intercept ho. $\sum x_ie_i = 0$ dono cases me hota hai (slope ki normal equation).

**Q:** $R^2$ aur $r$ me farak?
**A:** $r$ correlation hai, $-1$ se $+1$, sign batata hai line upar ja rahi ya neeche. $R^2 = r^2$ (simple regression with intercept), $0$ se $1$, batata hai variation ka kitna hissa line ne explain kiya.

**Q:** Ridge aur lasso me kya farak hai?
**A:** Ridge penalty $\lambda\sum w_j^2$ ($\ell_2$): weights chhote hote hain, zero nahi. Lasso penalty $\lambda\sum |w_j|$ ($\ell_1$): kuch weights exactly zero ho jaate hain, yaani feature selection.

**Q:** $\lambda$ badhane se training error kam kyun nahi ho sakta?
**A:** $\lambda = 0$ par hum exactly training SSE minimise kar rahe hain — usse kam koi $w$ nahi de sakta. Penalty $w$ ko us best point se door kheenchti hai, to training SSE sirf badh sakta hai (ya same rahe). Fayda test data par milta hai (kam variance).


## Khud try karo

**1.** Model $\hat y = wx$ (no intercept), data $x = 1, 2, 2$; $y = 1, 3, 2$. $w$ = ? (do decimal)

<details><summary>Answer dekho</summary>

$\sum xy = 1 + 6 + 4 = 11$, $\sum x^2 = 1 + 4 + 4 = 9$. $w = 11/9 \approx 1.22$.

</details>

**2.** Line $\hat y = a + bx$, data $x = 1, 2, 3$; $y = 1, 2, 6$. $a$, $b$, residuals aur $R^2$ nikaalo.

<details><summary>Answer dekho</summary>

$\bar x = 2$, $\bar y = 3$. Deviations: $x$: $-1, 0, 1$; $y$: $-2, -1, 3$.
$S_{xy} = 2 + 0 + 3 = 5$, $S_{xx} = 2$, $S_{yy} = 4 + 1 + 9 = 14$.
$b = 2.5$, $a = 3 - 5 = -2$.
Fitted: $0.5, 3, 5.5$; residuals $0.5, -1, 0.5$ (sum 0 ✓). $SSE = 0.25 + 1 + 0.25 = 1.5$.
$R^2 = 1 - 1.5/14 = 25/28 \approx 0.89$.

</details>

**3.** No-intercept ridge, inputs $x = 2, 2, 1$. Kis $\lambda$ par ridge weight OLS weight ka aadha hoga?

<details><summary>Answer dekho</summary>

Halving tab hota hai jab $\lambda = \sum x^2 = 4 + 4 + 1 = 9$. ($y$ values ki zaroorat hi nahi, jab tak $\sum xy \ne 0$.)

</details>

**4.** Ridge me $\lambda \to \infty$ karo. Weights, bias, variance aur training error ka kya hoga?

<details><summary>Answer dekho</summary>

Weights $\to 0$ (par kisi finite $\lambda$ par exactly 0 nahi). Bias badhta hai (model bahut simple), variance ghatta hai (data badlo to bhi $w \approx 0$), training error badhta hai aur $\sum y^2$ ki taraf jaata hai (no-intercept case me).

</details>

## Ek page me

- Residual $e = y - \hat y$ (observed minus fitted); least squares $\sum e^2$ minimise karta hai.
- Through origin $\hat y = wx$: $w = \sum xy/\sum x^2$; feature $\phi$: $w = \sum \phi y/\sum \phi^2$ ($x^2$ ho to denominator $\sum x^4$).
- No-intercept $SSE_{min} = \sum y^2 - (\sum xy)^2/\sum x^2$.
- With intercept: $b = S_{xy}/S_{xx}$, $a = \bar y - b\bar x$; $S_{xy} = \sum xy - n\bar x\bar y$.
- Normal equations: $\sum y = na + b\sum x$, $\sum xy = a\sum x + b\sum x^2$; matrix $X^\top X\beta = X^\top y$.
- $\sum x_ie_i = 0$ hamesha; $\sum e_i = 0$ aur line through $(\bar x, \bar y)$ sirf intercept ke saath.
- $R^2 = 1 - SSE/SST = S_{xy}^2/(S_{xx}S_{yy}) = r^2$; intercept wale model me training $R^2 \in [0,1]$.
- Ridge 1-D: $w = \sum xy/(\sum x^2 + \lambda)$ — sirf $\lambda$, na $\lambda^2$ na $2\lambda$.
- Ridge matrix: $(X^\top X + \lambda I)^{-1}X^\top y$, $\lambda > 0$ par hamesha invertible.
- Diagonal $X^\top X$: shrink factor $d_j/(d_j + \lambda)$; 1-D me $\lambda = \sum x^2$ weight ko aadha karta hai.
- $\lambda \uparrow$: weights shrink (exactly 0 nahi — wo lasso), bias ↑, variance ↓, training error ↑.
- Features standardise karo; intercept penalise mat karo.

Revision ke liye **Short note** tab dekho.
