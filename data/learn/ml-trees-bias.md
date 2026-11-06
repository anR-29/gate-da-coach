# Decision trees and the bias–variance trade-off

> **Time:** ~35 min · **Pehle aana chahiye:** probability (fractions $p_i$), $\log_2$ (jaise $\log_2 8 = 3$), expectation $E[\cdot]$ aur variance $\mathrm{Var}(\cdot)$ ka basic idea · **Day:** 47, 49

## Ye topic kyun?

Decision tree "20 sawaalon" ke khel jaisa hai: har step par data ke baare me ek haan/na sawaal poochho, aur aakhir me ek answer do. Sawaal kaunsa poochhein — ye entropy, Gini aur information gain se tay hota hai. Bias–variance trade-off batata hai ki model bahut simple (underfit) hai ya bahut complex (overfit), aur kya karna chahiye. GATE DA me yahan se NAT aate hain (entropy, Gini, gain, expected error) aur MCQ/MSQ (kaunsa attribute root par, diagnosis, kaunsa change variance ghatata hai).

## Picture se samjho

10 logon ka data hai: 5 ne loan chukaaya (+), 5 ne nahi (−). Abhi "kaun chukaayega" ka koi andaza nahi — poora confusion. Ek sawaal poochho: "kya $x_1 \le 3$?". Haan wale group me 4+ aur 1−, na wale me 1+ aur 4−. Ab dono groups pehle se zyada "saaf" (pure) hain.

<figure class="fig">
<svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
<rect x="175" y="15" width="150" height="50" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="210" y="37" font-size="13" fill="currentColor">5+ / 5−</text>
<text x="210" y="55" font-size="12" style="fill:var(--bad)">H = 1</text>
<line x1="220" y1="65" x2="135" y2="140" stroke="currentColor"/>
<line x1="280" y1="65" x2="365" y2="140" stroke="currentColor"/>
<text x="95" y="100" font-size="12" style="fill:var(--info)">x₁ ≤ 3: haan</text>
<text x="335" y="100" font-size="12" style="fill:var(--info)">nahi</text>
<rect x="55" y="140" width="160" height="50" rx="6" fill="none" style="stroke:var(--good)" stroke-width="1.5"/>
<text x="95" y="162" font-size="13" fill="currentColor">4+ / 1−</text>
<text x="85" y="180" font-size="12" style="fill:var(--good)">H = 0.722</text>
<rect x="285" y="140" width="160" height="50" rx="6" fill="none" style="stroke:var(--good)" stroke-width="1.5"/>
<text x="325" y="162" font-size="13" fill="currentColor">1+ / 4−</text>
<text x="315" y="180" font-size="12" style="fill:var(--good)">H = 0.722</text>
<text x="40" y="228" font-size="13" style="fill:var(--mark)">Gain = 1 − (5/10)(0.722) − (5/10)(0.722) = 0.278</text>
</svg>
<figcaption>Ek split: parent poora mixed (entropy 1), bachche zyada pure (entropy 0.722). Impurity jitni ghati, wahi information gain hai.</figcaption>
</figure>

Dhyan do: tree ka har sawaal "mixed" group ko "pure" groups me todne ki koshish hai. Jis sawaal se impurity sabse zyada ghate, wahi poochho.

Ab "impurity" naapne ke do tarike — entropy aur Gini — dono do classes ke liye $p$ (class + ka fraction) par kaise depend karte hain:

<figure class="fig">
<svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="230" x2="460" y2="230" stroke="currentColor"/>
<line x1="50" y1="230" x2="50" y2="30" stroke="currentColor"/>
<text x="465" y="234" font-size="13" fill="currentColor">p</text>
<text x="46" y="248" font-size="11" fill="currentColor">0</text>
<text x="240" y="248" font-size="11" fill="currentColor">0.5</text>
<text x="446" y="248" font-size="11" fill="currentColor">1</text>
<text x="30" y="54" font-size="11" fill="currentColor">1</text>
<text x="22" y="144" font-size="11" fill="currentColor">0.5</text>
<polyline points="50,230.0 70,178.4 90,145.6 110,120.2 130,100.1 150,84.0 170,71.4 190,61.9 210,55.2 230,51.3 250,50.0 270,51.3 290,55.2 310,61.9 330,71.4 350,84.0 370,100.1 390,120.2 410,145.6 430,178.4 450,230.0" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<polyline points="50,230.0 70,212.9 90,197.6 110,184.1 130,172.4 150,162.5 170,154.4 190,148.1 210,143.6 230,140.9 250,140.0 270,140.9 290,143.6 310,148.1 330,154.4 350,162.5 370,172.4 390,184.1 410,197.6 430,212.9 450,230.0" fill="none" style="stroke:var(--good)" stroke-width="2.5"/>
<polyline points="50,230 250,140 450,230" fill="none" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<line x1="250" y1="230" x2="250" y2="50" style="stroke:var(--muted)" stroke-dasharray="2 3"/>
<text x="262" y="44" font-size="12" style="fill:var(--info)">entropy (max 1)</text>
<text x="300" y="138" font-size="12" style="fill:var(--good)">Gini (max 0.5)</text>
<text x="300" y="200" font-size="12" style="fill:var(--muted)">misclass. error 1 − max p</text>
</svg>
<figcaption>Binary node ke liye entropy, Gini aur misclassification error. Teeno p = 0 ya 1 (pure node) par zero aur p = 0.5 par maximum hain.</figcaption>
</figure>

Dhyan do: entropy aur Gini dono **concave** (upar ko ubhre hue) curves hain — isi wajah se kisi bhi split ka gain kabhi negative nahi hota (step 4). Scale alag hai: entropy max 1, Gini max 0.5.

Teesri picture: model ki complexity badhao (polynomial degree, tree depth) to errors kaise badalte hain.

<figure class="fig">
<svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg">
<line x1="50" y1="230" x2="470" y2="230" stroke="currentColor"/>
<line x1="50" y1="230" x2="50" y2="25" stroke="currentColor"/>
<text x="330" y="256" font-size="12" fill="currentColor">model complexity →</text>
<text x="12" y="30" font-size="12" fill="currentColor">error</text>
<polyline points="50,45.8 70,78.5 90,104.5 110,125.0 130,141.1 150,153.7 170,163.3 190,170.6 210,175.9 230,179.6 250,181.8 270,182.7 290,182.5 310,181.2 330,178.7 350,175.2 370,170.5 390,164.5 410,157.0 430,148.0 450,137.1" fill="none" style="stroke:var(--bad)" stroke-width="2.5"/>
<polyline points="50,76.0 70,115.9 90,145.5 110,167.4 130,183.6 150,195.6 170,204.5 190,211.1 210,216.0 230,219.7 250,222.3 270,224.3 290,225.8 310,226.9 330,227.7 350,228.3 370,228.7 390,229.1 410,229.3 430,229.5 450,229.6" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<polyline points="50,65.0 70,98.2 90,124.8 110,146.0 130,162.9 150,176.4 170,187.2 190,195.8 210,202.7 230,208.2 250,212.6 270,216.1 290,218.9 310,221.1 330,222.9 350,224.4 370,225.5 390,226.4 410,227.1 430,227.7 450,228.2" fill="none" style="stroke:var(--muted)" stroke-dasharray="5 3"/>
<polyline points="50,227.2 70,226.8 90,226.2 110,225.5 130,224.7 150,223.7 170,222.6 190,221.3 210,219.7 230,217.9 250,215.7 270,213.1 290,210.1 310,206.5 330,202.3 350,197.3 370,191.5 390,184.6 410,176.4 430,166.8 450,155.4" fill="none" style="stroke:var(--mark)" stroke-dasharray="5 3"/>
<line x1="270" y1="182.7" x2="270" y2="230" style="stroke:var(--bad)" stroke-dasharray="2 3"/>
<text x="232" y="246" font-size="11" style="fill:var(--bad)">sweet spot</text>
<text x="70" y="250" font-size="11" fill="currentColor">underfit</text>
<text x="400" y="250" font-size="11" fill="currentColor">overfit</text>
<line x1="310" y1="30" x2="335" y2="30" style="stroke:var(--bad)" stroke-width="2.5"/>
<text x="342" y="34" font-size="12" fill="currentColor">test error (U-shape)</text>
<line x1="310" y1="50" x2="335" y2="50" style="stroke:var(--info)" stroke-width="2.5"/>
<text x="342" y="54" font-size="12" fill="currentColor">training error</text>
<line x1="310" y1="70" x2="335" y2="70" style="stroke:var(--muted)" stroke-dasharray="5 3"/>
<text x="342" y="74" font-size="12" fill="currentColor">bias²</text>
<line x1="310" y1="90" x2="335" y2="90" style="stroke:var(--mark)" stroke-dasharray="5 3"/>
<text x="342" y="94" font-size="12" fill="currentColor">variance</text>
</svg>
<figcaption>Complexity badhne par bias² girta hai, variance badhta hai. Test error (inka sum + noise) U-shape banata hai; training error lagataar girta hai.</figcaption>
</figure>

Dhyan do: training error akela dekh kar model mat chuno — wo hamesha complex model ko pasand karega. Test (ya validation) error ka minimum "sweet spot" hai.

## Concept step-by-step

### 1. Decision tree kaise kaam karta hai

Tree me har **internal node** ek sawaal hai (jaise "age ≤ 30?" ya "Outlook = Sunny?"), har branch ek answer, aur har **leaf** ek prediction (us leaf ke training examples ki majority class). Naya point aaye to root se shuru karke sawaalon ke answers ke hisaab se neeche jaao.

Tree **greedily** banta hai: har node par wo split chuno jo abhi impurity sabse zyada ghatata hai; phir har child par yahi dohraao, jab tak node pure na ho jaaye ya koi stopping rule (max depth, min samples) na lage.

**Dhyan do:** greedy matlab har step par local best — poore tree ka global best guarantee nahi.

### 2. Entropy

Node me classes ke fractions $p_1, p_2, \dots$. **Entropy** (bits me):
$$H = -\sum_i p_i\log_2 p_i, \qquad (0\log 0 = 0 \text{ maana jaata hai}).$$
Ye "kitna surprise / confusion" hai. Pure node ($p = 1$): $H = 0$. Do classes 50–50: $H = -2 \times 0.5\log_2 0.5 = 1$ (binary maximum). $k$ classes barabar: $H = \log_2 k$.

Example: 6+, 2− → $p = 0.75, 0.25$. $H = -(0.75\log_2 0.75 + 0.25\log_2 0.25) = 0.75(0.415) + 0.25(2) = 0.311 + 0.5 = 0.811$.

Yaad rakhne layak: $H(0.25) = 0.811$, $H(1/3) = 0.918$, $H(0.2) = 0.722$, $H(1/6) = 0.650$, $H(0.1) = 0.469$.

**Dhyan do:** $\log_2$ use karo, natural log nahi (bits ke liye). $\ln$ se answer $\ln 2 = 0.693$ guna chhota aayega.

### 3. Gini impurity aur misclassification error

**Gini:**
$$G = 1 - \sum_i p_i^2.$$
Matlab: node se do random examples (replacement ke saath) uthao, to unki classes alag hone ki probability. Binary: $G = 1 - p^2 - (1-p)^2 = 2p(1-p)$, max $0.5$ at $p = 0.5$.

Example: 6+, 2−: $G = 1 - (0.5625 + 0.0625) = 0.375$. Teen classes 5, 3, 2 (n = 10): $G = 1 - (0.25 + 0.09 + 0.04) = 0.62$.

**Misclassification error:** $1 - \max_i p_i$ (majority predict karne par galti ka fraction). Ye split rank karne ke liye bahut "mota" hai — aksar do splits ko barabar bata deta hai jab entropy unme farak dekh leti hai (Example 3).

**Dhyan do:** Gini $= 1 - \sum p^2$, sirf $\sum p^2$ nahi. Binary Gini 1 tak kabhi nahi jaata.

### 4. Information gain

$$\text{Gain} = H(\text{parent}) - \sum_k \frac{n_k}{n}H(\text{child}_k).$$
Har child ki entropy ko uske **size ke fraction** se weight karo. Gini ke saath same formula "Gini decrease" deta hai. Sabse bada gain wala split chuno.

Example (picture): parent 5+/5−, $H = 1$. Children 4+/1− aur 1+/4−, dono $H = 0.722$, dono ka weight $5/10$. Weighted $= 0.722$. Gain $= 1 - 0.722 = 0.278$.

**Gain $\ge 0$ kyun:** parent ka class-fraction children ke fractions ka weighted average hai. Entropy concave hai, to "average ki entropy $\ge$ entropies ka average" (Jensen). Yaani split se weighted impurity kabhi nahi badhti.

**Many-valued attributes:** agar attribute har row ke liye alag value deta hai (jaise customer ID), to har child me ek hi example → sab pure → gain maximum. Par ye bekaar split hai (generalise nahi karta). Isliye C4.5 **gain ratio** use karta hai (gain ko split ki apni entropy se divide).

**Dhyan do:** children ki entropy ka seedha average mat lo, size se weight karo. Aur answer me weighted child entropy nahi, **parent minus** wo likho.

### 5. Bias aur variance kya hain

Socho hum alag-alag random training sets par same algorithm baar-baar train karte hain. Har baar ek model $\hat f$ milta hai. Kisi fixed input $x_0$ par:
- **Bias** $= E[\hat f(x_0)] - f(x_0)$: average prediction sach se kitna door hai (systematic galti). Bahut simple model (seedhi line jab sach curve hai) → bada bias.
- **Variance** $= \mathrm{Var}(\hat f(x_0)) = E[(\hat f(x_0) - E\hat f(x_0))^2]$: training set badalne par prediction kitna hilta hai. Bahut flexible model (deep tree) → bada variance.

Dartboard socho: bias = teer ka average centre se kitna door; variance = teer aapas me kitne bikhre hue.

**Dhyan do:** bias aur variance ek model ke nahi, ek **learning method** ke hote hain (bahut saare training sets par average).

### 6. Bias–variance decomposition

Data: $y = f(x_0) + \varepsilon$, $E[\varepsilon] = 0$, $\mathrm{Var}(\varepsilon) = \sigma^2$ (noise), $\varepsilon$ training set se independent. Tab
$$E[(y - \hat f(x_0))^2] = \text{bias}^2 + \text{variance} + \sigma^2.$$
**Kyun:** $y - \hat f = \varepsilon + (f - \hat f)$. Square karke expectation: cross term $2E[\varepsilon]E[f - \hat f] = 0$. Bacha $\sigma^2 + E[(f - \hat f)^2]$. Ab $f - \hat f = (f - E\hat f) + (E\hat f - \hat f)$; square karke expectation: pehla term constant, doosre ka mean 0, to cross term 0. Bacha $(f - E\hat f)^2 + \mathrm{Var}(\hat f) = \text{bias}^2 + \text{variance}$.

Example: bias $0.4$, variance $0.1$, noise SD $0.3$: $0.16 + 0.1 + 0.09 = 0.35$.

**Estimator wala version:** $\theta$ ko estimate karne wala $T$: $\text{MSE} = E[(T - \theta)^2] = \text{bias}^2 + \mathrm{Var}(T)$. Agar $T = cX$, to $E[T] = cE[X]$ aur $\mathrm{Var}(T) = c^2\mathrm{Var}(X)$.

Noise $\sigma^2$ ko koi model kam nahi kar sakta — ye **irreducible error** hai.

**Dhyan do:** bias ka **square** lo; noise ka SD diya ho to use square karo. $\mathrm{Var}(cX) = c^2\mathrm{Var}(X)$, $c\,\mathrm{Var}(X)$ nahi.

### 7. Diagnosis: underfit ya overfit?

| Lakshan | Diagnosis | Ilaaj |
|---|---|---|
| Training aur test error dono high, aur paas-paas | High bias (underfit) | complex model, zyada features, kam regularisation |
| Training error low, test error bahut zyada (bada gap) | High variance (overfit) | zyada data, regularisation, simple model, bagging |

Complexity badhane par: bias ↓, variance ↑, training error lagataar ↓, test error U-shape.

**Variance ghatane wale changes** (thoda bias badh sakta hai): zyada training data; ridge me bada $\lambda$; SVM me chhota $C$; k-NN me bada $k$; shallow (kam gehra) tree / pruning; bagging (random forest).
**Ulta (variance badhate hain):** deep tree, chhota $k$, bada $C$, chhota $\lambda$, high-degree polynomial.

**Dhyan do:** high-bias model ko zyada data dene se khaas fayda nahi — wo model hi itna simple hai ki pattern pakad nahi sakta.

## Solved examples

**Example 1 (NAT, easy):** Ek node me teen classes ke 4, 2, 2 examples hain. Entropy ($\log_2$) = ______.

**Soch:** "entropy" + counts → fractions banao, $-\sum p\log_2 p$.

**Solution:**
1. $n = 8$; $p = 1/2, 1/4, 1/4$.
2. $-\frac12\log_2\frac12 = \frac12 \times 1 = 0.5$.
3. $-\frac14\log_2\frac14 = \frac14 \times 2 = 0.5$, do baar → $1$.
4. $H = 0.5 + 1 = 1.5$ bits.

**Galti kahan hoti hai:** natural log → $1.04$. Ya sochna ki entropy 1 se zyada nahi ho sakti — wo limit sirf **do** classes ke liye hai (3 classes me max $\log_2 3 = 1.585$).

**Example 2 (NAT, medium):** Node: 8 A, 4 B. Split: left child 7 A, 1 B; right child 1 A, 3 B. Gini decrease (parent Gini minus size-weighted child Gini) = ______ (do decimal).

**Soch:** Gini ke saath gain; weight $n_k/n$.

**Solution:**
1. Parent: $p = 2/3, 1/3$; $G = 1 - (4/9 + 1/9) = 4/9 = 0.444$.
2. Left (n = 8): $G = 1 - (49/64 + 1/64) = 14/64 = 0.219$.
3. Right (n = 4): $G = 1 - (1/16 + 9/16) = 6/16 = 0.375$.
4. Weighted $= \frac{8}{12}(0.219) + \frac{4}{12}(0.375) = 0.146 + 0.125 = 0.271$.
5. Decrease $= 0.444 - 0.271 = 0.174 \approx 0.17$.

**Galti kahan hoti hai:** children ka simple average $(0.219 + 0.375)/2 = 0.297$ → decrease $0.15$. Ya weighted child Gini $0.27$ ko hi answer likh dena.

**Example 3 (MCQ, medium):** ID3 root split information gain se chunta hai:

| # | A | B | C | Y |
|---|---|---|---|---|
| 1 | 1 | Low | 1 | + |
| 2 | 1 | Low | 1 | + |
| 3 | 1 | Mid | 1 | + |
| 4 | 0 | Mid | 1 | + |
| 5 | 1 | Mid | 1 | − |
| 6 | 0 | Mid | 1 | − |
| 7 | 0 | High | 1 | − |
| 8 | 0 | High | 0 | − |

Root par kaunsa attribute aayega? (A) A (B) B (C) C (D) A aur B ka tie

**Soch:** har attribute ke children ke class counts gino, weighted entropy nikaalo.

**Solution:**
1. Parent: 4+, 4− → $H = 1$.
2. A: A=1 → rows 1,2,3,5 → 3+/1− ($H = 0.811$); A=0 → 1+/3− ($H = 0.811$). Gain $= 1 - 0.811 = 0.189$.
3. B: Low → 2+/0− ($H = 0$); High → 0+/2− ($H = 0$); Mid → 2+/2− ($H = 1$, weight $4/8$). Gain $= 1 - 0.5 = 0.5$.
4. C: C=1 → 4+/3− ($H = 0.985$, weight $7/8$); C=0 → 0+/1− ($H = 0$). Gain $= 1 - 0.862 = 0.138$.
5. Sabse bada: B (0.5). Answer **(B)**.

**Galti kahan hoti hai:** misclassification error se compare karna: A ke 2/8 galat, B ke bhi 2/8 (Mid me 2) → "tie" (D). Entropy farak pakad leti hai kyunki B ke do children bilkul pure hain.

**Example 4 (NAT, medium):** Test point $x_0$ par method ka bias $0.4$ aur variance $0.1$ hai. Noise ka **standard deviation** $0.3$ hai (training set se independent). Expected squared prediction error = ______ (do decimal).

**Soch:** bias² + variance + noise variance.

**Solution:**
1. $\text{bias}^2 = 0.16$.
2. Noise variance $= 0.3^2 = 0.09$.
3. Total $= 0.16 + 0.1 + 0.09 = 0.35$.

**Galti kahan hoti hai:** $0.4 + 0.1 + 0.3 = 0.8$ (kuch bhi square nahi kiya), ya $0.16 + 0.1 + 0.3 = 0.56$ (noise SD square nahi kiya).

**Example 5 (NAT, hard):** $X \sim N(\theta, 9)$ (variance 9), $\theta = 6$. Estimator $T = \frac23 X$. $E[(T - \theta)^2]$ = ______.

**Soch:** MSE = bias² + variance; $\mathrm{Var}(cX) = c^2\mathrm{Var}(X)$.

**Solution:**
1. $E[T] = \frac23 \times 6 = 4$, bias $= 4 - 6 = -2$, bias² $= 4$.
2. $\mathrm{Var}(T) = \frac49 \times 9 = 4$.
3. MSE $= 4 + 4 = 8$.

Interesting: unbiased estimator $X$ ka MSE $= 9$ hai. Thoda bias lekar ($T$) variance itna ghata ki total MSE kam ho gaya — yahi ridge/shrinkage ka idea hai.

**Galti kahan hoti hai:** $\mathrm{Var}(T) = \frac23 \times 9 = 6$ lena → MSE $10$.

**Example 6 (MSQ, medium):** Ek model ka training error 2% aur validation error 25% hai. Kaunse steps validation error ghatane me madad karenge (usually)?
(A) Zyada training data lana
(B) Decision tree ki max depth badhana
(C) Ridge me $\lambda$ badhana
(D) k-NN me $k$ ghatana

**Soch:** low train + bada gap → high variance (overfit). Variance ghatane wale steps chuno.

**Solution:**
1. (A) zyada data variance ghatata hai ✓.
2. (B) gehra tree → aur zyada variance ✗.
3. (C) bada $\lambda$ → weights shrink, variance ↓ ✓.
4. (D) chhota $k$ → zyada flexible, variance ↑ ✗.

Answer: **(A), (C)**.

**Galti kahan hoti hai:** diagnosis ulta karna (high bias samajhna) aur complexity badhane wale options (B, D) chun lena.

## Confusions clear karo

**Q:** Entropy aur Gini me se kaunsa use karein?
**A:** Practice me dono lagbhag same splits chunte hain. Gini thoda fast hai (log nahi). GATE me jo maanga ho wahi lagao — scale alag hai (binary max 1 vs 0.5).

**Q:** Gain kabhi negative ho sakta hai?
**A:** Nahi. Entropy/Gini concave hain, to weighted child impurity kabhi parent se zyada nahi hoti. Worst case gain $= 0$ (jab har child ka class mix parent jaisa hi ho).

**Q:** Weighted average kyun, simple average kyun nahi?
**A:** 1 example wala pure child aur 99 examples wala mixed child barabar important nahi ho sakte. Weight = us child me kitne examples gaye.

**Q:** Deep tree overfit kyun karta hai?
**A:** Gehra tree har chhote region ko alag leaf de deta hai, yahan tak ki ek-ek noisy point ke liye. Training error ~0, par naye data par galat — high variance. Pruning ya max depth isse rokte hain.

**Q:** Training error badhe to bias badha?
**A:** Usually haan — training error bias ka achha indicator hai. Variance train–test gap se dikhta hai.

**Q:** Noise ($\sigma^2$) ko kaise kam karein?
**A:** Model se nahi kar sakte; ye data me hi hai. Sirf behtar measurement ya naye features (jo $y$ ko zyada explain karein) madad kar sakte hain.

**Q:** Bias aur variance dono ek saath kam kyun nahi hote?
**A:** Ek model family me complexity ka ek "knob" hai: ghumao to ek ghatta hai, doosra badhta hai. Kuch tricks (zyada data, bagging) variance ghata dete hain bina bias badhaye, isliye wo itne useful hain.

## Khud try karo

**1.** Node me teen classes ke 5, 3, 2 examples. Gini?

<details><summary>Answer dekho</summary>

$p = 0.5, 0.3, 0.2$. $G = 1 - (0.25 + 0.09 + 0.04) = 0.62$.

</details>

**2.** Parent 4+/4−. Split: left 3+/0−, right 1+/4−. Information gain (bits)?

<details><summary>Answer dekho</summary>

Parent $H = 1$. Left pure, $H = 0$. Right $p = 0.2$, $H = 0.722$. Weighted $= \frac58 \times 0.722 = 0.451$. Gain $= 1 - 0.451 = 0.549 \approx 0.55$.

</details>

**3.** Training MSE 30, validation MSE 31, jabki ek simple baseline 5 deta hai. Diagnosis aur ek ilaaj?

<details><summary>Answer dekho</summary>

Dono errors high aur paas-paas → high bias (underfit). Ilaaj: zyada complex model ya zyada features, regularisation kam karo. Zyada data se khaas fayda nahi.

</details>

**4.** $\mathrm{Var}(X) = 2$. $\mathrm{Var}(3X)$ = ?

<details><summary>Answer dekho</summary>

$3^2 \times 2 = 18$.

</details>

## Ek page me

- Tree: har node ek sawaal, leaf = majority class; greedy split jo impurity sabse zyada ghataye.
- Entropy $H = -\sum p\log_2 p$; binary max 1 ($p = 0.5$); $k$ barabar classes → $\log_2 k$.
- Gini $= 1 - \sum p^2$; binary $2p(1-p)$, max 0.5.
- Misclassification error $1 - \max p$ — splits rank karne me mota.
- Gain $= H(\text{parent}) - \sum (n_k/n)H(\text{child}_k)$; size se weight karo; gain $\ge 0$.
- Raw gain many-valued attributes (IDs) ko pasand karta hai → gain ratio.
- Expected test error $= \text{bias}^2 + \text{variance} + \sigma^2_{\text{noise}}$ (bias square, noise SD square).
- Estimator: MSE $= \text{bias}^2 + \mathrm{Var}$; $\mathrm{Var}(cX) = c^2\mathrm{Var}(X)$.
- Underfit: train aur test dono high, paas-paas. Overfit: train low, bada gap.
- Complexity ↑: bias ↓, variance ↑, test error U-shape, training error lagataar ↓.
- Variance ghataao: zyada data, bada $\lambda$, chhota $C$, bada $k$, shallow tree, bagging.

Revision ke liye **Short note** tab dekho.
