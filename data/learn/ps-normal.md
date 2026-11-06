# Normal, standard normal, t and chi-squared

> **Time:** ~35 min · **Pehle aana chahiye:** PDF/CDF ka idea, $E[X]$, $\mathrm{Var}(X)=E[X^2]-(E[X])^2$ · **Day:** 8

## Ye topic kyun?

Normal (bell curve) statistics ka sabse important distribution hai: heights, measurement errors, sample means — sab iske aas-paas aate hain. Chi-square aur $t$ isi se bante hain aur aage confidence intervals aur hypothesis tests me seedhe use hote hain. GATE DA me yahan se 1–2 mark ke NAT/MCQ aate hain: standardise karke $\Phi$ table se probability, $aZ+b$ ka mean/variance, aur $Z^2$ / chi-square ka mean-variance.

## Picture se samjho

Ek class ke 1000 students ki height ka histogram banao. Zyada log average ke paas, bahut lambe ya bahut chhote kam. Ye shape ek ghanti (bell) jaisi hai — symmetric, beech me peak. Yahi normal distribution hai.

<figure class="fig">
<svg viewBox="0 0 320 215" xmlns="http://www.w3.org/2000/svg">
<polygon points="120,170 120,91 130,72 140,55 150,44 160,40 170,44 180,55 190,72 200,91 200,170" style="fill:var(--mark);opacity:0.35"/>
<line x1="15" y1="170" x2="305" y2="170" stroke="currentColor"/>
<polyline points="20,170 30,169 40,169 50,167 60,164 70,160 80,152 90,142 100,128 110,110 120,91 130,72 140,55 150,44 160,40 170,44 180,55 190,72 200,91 210,110 220,128 230,142 240,152 250,160 260,164 270,167 280,169 290,169 300,170" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="160" y1="40" x2="160" y2="170" stroke="currentColor" stroke-dasharray="3 3"/>
<text x="80" y="186" text-anchor="middle" font-size="11" fill="currentColor">μ−2σ</text>
<text x="120" y="186" text-anchor="middle" font-size="11" fill="currentColor">μ−σ</text>
<text x="160" y="186" text-anchor="middle" font-size="11" fill="currentColor">μ</text>
<text x="200" y="186" text-anchor="middle" font-size="11" fill="currentColor">μ+σ</text>
<text x="240" y="186" text-anchor="middle" font-size="11" fill="currentColor">μ+2σ</text>
<text x="160" y="140" text-anchor="middle" font-size="12" fill="currentColor">≈ 68%</text>
<text x="160" y="205" text-anchor="middle" font-size="11" fill="currentColor">±1σ: 68%   ±2σ: 95%   ±3σ: 99.7%</text>
<text x="230" y="60" font-size="11" style="fill:var(--info)">N(μ, σ²)</text>
</svg>
<figcaption>Normal curve: centre μ pe, spread σ (SD). Mean ± 1 SD ke beech lagbhag 68% area.</figcaption>
</figure>

Dhyan do: curve ka centre $\mu$ hai aur chaudai $\sigma$ (standard deviation) se tay hoti hai. Har normal curve ek hi shape ka hai — bas shift aur stretch. Isliye hum har normal ko ek "standard" curve pe le aate hain.

<figure class="fig">
<svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="40" x2="290" y2="40" stroke="currentColor"/>
<line x1="30" y1="100" x2="290" y2="100" stroke="currentColor"/>
<text x="10" y="44" font-size="12" style="fill:var(--info)">X</text>
<text x="10" y="104" font-size="12" style="fill:var(--good)">Z</text>
<line x1="60" y1="35" x2="60" y2="45" stroke="currentColor"/>
<line x1="110" y1="35" x2="110" y2="45" stroke="currentColor"/>
<line x1="160" y1="35" x2="160" y2="45" stroke="currentColor"/>
<line x1="210" y1="35" x2="210" y2="45" stroke="currentColor"/>
<line x1="260" y1="35" x2="260" y2="45" stroke="currentColor"/>
<text x="60" y="30" text-anchor="middle" font-size="11" fill="currentColor">42</text>
<text x="110" y="30" text-anchor="middle" font-size="11" fill="currentColor">46</text>
<text x="160" y="30" text-anchor="middle" font-size="11" fill="currentColor">50</text>
<text x="210" y="30" text-anchor="middle" font-size="11" fill="currentColor">54</text>
<text x="260" y="30" text-anchor="middle" font-size="11" fill="currentColor">58</text>
<line x1="60" y1="95" x2="60" y2="105" stroke="currentColor"/>
<line x1="110" y1="95" x2="110" y2="105" stroke="currentColor"/>
<line x1="160" y1="95" x2="160" y2="105" stroke="currentColor"/>
<line x1="210" y1="95" x2="210" y2="105" stroke="currentColor"/>
<line x1="260" y1="95" x2="260" y2="105" stroke="currentColor"/>
<text x="60" y="120" text-anchor="middle" font-size="11" fill="currentColor">−2</text>
<text x="110" y="120" text-anchor="middle" font-size="11" fill="currentColor">−1</text>
<text x="160" y="120" text-anchor="middle" font-size="11" fill="currentColor">0</text>
<text x="210" y="120" text-anchor="middle" font-size="11" fill="currentColor">1</text>
<text x="260" y="120" text-anchor="middle" font-size="11" fill="currentColor">2</text>
<line x1="210" y1="48" x2="210" y2="90" style="stroke:var(--mark)" stroke-width="1.5"/>
<polygon points="206,84 214,84 210,92" style="fill:var(--mark)"/>
<text x="218" y="72" font-size="10" fill="currentColor">(54 − 50)/4 = 1</text>
<text x="160" y="136" text-anchor="middle" font-size="10" fill="currentColor">X ~ N(50, 16): σ = 4, so subtract 50, divide by 4</text>
</svg>
<figcaption>Standardising: X ki scale ko Z ki scale pe map karna. Har 4 units (ek σ) = Z me 1 unit.</figcaption>
</figure>

Standardising ka matlab hai sirf ruler badalna: "50 se kitne SD door?" Upar wali line ka 54 neeche wali line ke 1 pe aata hai. Probability same rehti hai, kyunki hum sirf scale badal rahe hain.

<figure class="fig">
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
<polygon points="20,170 30,169 40,169 50,167 60,164 70,160 80,152 90,142 100,128 100,170" style="fill:var(--bad);opacity:0.45"/>
<polygon points="220,170 220,128 230,142 240,152 250,160 260,164 270,167 280,169 290,169 300,170" style="fill:var(--bad);opacity:0.45"/>
<line x1="15" y1="170" x2="305" y2="170" stroke="currentColor"/>
<polyline points="20,170 30,169 40,169 50,167 60,164 70,160 80,152 90,142 100,128 110,110 120,91 130,72 140,55 150,44 160,40 170,44 180,55 190,72 200,91 210,110 220,128 230,142 240,152 250,160 260,164 270,167 280,169 290,169 300,170" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<text x="100" y="186" text-anchor="middle" font-size="11" fill="currentColor">−z</text>
<text x="160" y="186" text-anchor="middle" font-size="11" fill="currentColor">0</text>
<text x="220" y="186" text-anchor="middle" font-size="11" fill="currentColor">z</text>
<text x="60" y="130" text-anchor="middle" font-size="11" fill="currentColor">Φ(−z)</text>
<text x="262" y="130" text-anchor="middle" font-size="11" fill="currentColor">1 − Φ(z)</text>
<text x="160" y="22" text-anchor="middle" font-size="11" fill="currentColor">mirror image: the two red tails are equal</text>
</svg>
<figcaption>Symmetry: Φ(−z) = 1 − Φ(z). Left tail ka area right tail ke barabar.</figcaption>
</figure>

Table me aksar sirf positive $z$ ke liye $\Phi(z)=P(Z\le z)$ diya hota hai. Negative $z$ chahiye to mirror use karo: left tail = right tail = $1-\Phi(z)$.

## Concept step-by-step

### 1. Normal distribution $N(\mu,\sigma^2)$

Normal ki density:
$$f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}.$$
Isme do parameters: $\mu$ = mean (centre), $\sigma^2$ = **variance**. Curve $\mu$ ke around symmetric hai, isliye mean = median = mode = $\mu$. Thumb rule: $\mu\pm\sigma$ me ~68%, $\mu\pm2\sigma$ me ~95%, $\mu\pm3\sigma$ me ~99.7%.

**Example:** $X\sim N(50,16)$ ka matlab mean 50, variance 16, SD $\sigma=\sqrt{16}=4$. Median bhi 50.

**Dhyan do:** $N(50,16)$ me 16 variance hai, SD nahi. GATE question aksar "(variance 16)" likhta hai — hamesha $\sigma=\sqrt{\text{second parameter}}$ lo.

### 2. Standard normal $Z$ aur $\Phi$

$Z\sim N(0,1)$: mean 0, variance 1. Iski CDF ko $\Phi(z)=P(Z\le z)$ likhte hain. Iska closed form nahi hai, isliye table use hoti hai. Yaad rakhne layak values:

| $z$ | 0 | 0.5 | 1 | 1.645 | 1.96 | 2 | 3 |
|---|---|---|---|---|---|---|---|
| $\Phi(z)$ | 0.5 | 0.6915 | 0.8413 | 0.95 | 0.975 | 0.9772 | 0.9987 |

Symmetry se: $\Phi(-z)=1-\Phi(z)$ aur $P(Z>z)=1-\Phi(z)$.

**Example:** $\Phi(-1)=1-0.8413=0.1587$. $P(-1<Z<1)=0.8413-0.1587=0.6826$ (yahi "68%" hai).

**Har probability ko $\Phi$ me kaise badlo (4 patterns):**
1. $P(Z\le z)=\Phi(z)$ — seedha table.
2. $P(Z>z)=1-\Phi(z)$ — right tail.
3. $P(Z\le-z)=1-\Phi(z)$ — negative $z$, mirror.
4. $P(z_1<Z<z_2)=\Phi(z_2)-\Phi(z_1)$ — interval; agar $z_1$ negative hai to $\Phi(z_1)=1-\Phi(|z_1|)$.

Exam me hamesha ek chhoti bell curve banao aur jo area chahiye use shade karo. Phir upar ke 4 me se pattern match karo. Isse "wrong tail" wali galti almost khatam ho jaati hai.

**Dhyan do:** $z_{0.025}=1.96$ ka matlab: right tail me 0.025 area, yaani $\Phi(1.96)=0.975$. Isi tarah $z_{0.05}=1.645$.

### 3. Standardising: $Z=\frac{X-\mu}{\sigma}$

Agar $X\sim N(\mu,\sigma^2)$, to $Z=\frac{X-\mu}{\sigma}\sim N(0,1)$. Kyun? $X-\mu$ ka mean 0 ho jaata hai; $\sigma$ se divide karne par variance $\sigma^2/\sigma^2=1$ ho jaata hai; aur normal ko shift/stretch karne se wo normal hi rehta hai. Isliye
$$P(a<X<b)=\Phi\!\left(\frac{b-\mu}{\sigma}\right)-\Phi\!\left(\frac{a-\mu}{\sigma}\right).$$

**Example:** $X\sim N(50,16)$, $\sigma=4$.
1. $P(X<54)=\Phi\!\left(\frac{54-50}{4}\right)=\Phi(1)=0.8413$.
2. $P(X>58)=1-\Phi(2)=1-0.9772=0.0228$.
3. $P(46<X<58)=\Phi(2)-\Phi(-1)=0.9772-0.1587=0.8185$.

**Ulta sawaal (parameters nikaalo):** Agar $P(X<40)=0.5$ to $\mu=40$ (median = mean). Agar saath me $P(X<43)=0.8413$, to $\frac{43-40}{\sigma}=1\Rightarrow\sigma=3$, variance 9.

**Dhyan do:** $X>c$ ke liye $1-\Phi(z)$ lo, $\Phi(z)$ nahi. Aur lower limit ka $z$ negative ho to $\Phi(-1)=0.1587$ lagao, $\Phi(1)$ nahi.

### 4. Linear transform $aX+b$

Kisi bhi random variable ke liye: $E[aX+b]=a\mu+b$ aur $\mathrm{Var}(aX+b)=a^2\sigma^2$ ($b$ sirf shift karta hai, spread nahi badalta; $a$ spread ko $|a|$ guna karta hai, variance ko $a^2$ guna). Normal ke liye bonus: result bhi normal hai. Isliye
$$aZ+b\sim N(b,\,a^2).$$

Square ka expectation chahiye to: $E[W^2]=\mathrm{Var}(W)+(E[W])^2$ (ye bas variance formula ko ulta likhna hai).

**Example:** $W=3Z-1$. $E[W]=-1$, $\mathrm{Var}(W)=9$. $E[W^2]=9+(-1)^2=10$.

**Dhyan do:** $\mathrm{Var}(3Z-1)$ = 9, 3 nahi. $a$ hamesha square hota hai, aur minus sign gayab ho jaata hai: $\mathrm{Var}(-2Z)=4$.

### 5. $Z$ ke moments: $E[Z^2]=1$, $E[Z^4]=3$, $\mathrm{Var}(Z^2)=2$

- $E[Z]=0$ (symmetry).
- $E[Z^2]=\mathrm{Var}(Z)+0^2=1$.
- $E[Z^4]=3$. Kyun: density $\varphi(z)$ ka derivative $-z\varphi(z)$ hai. By parts: $\int z^3\cdot z\varphi\,dz=\left[-z^3\varphi\right]+\int3z^2\varphi\,dz=0+3\cdot1=3$.
- Isliye $\mathrm{Var}(Z^2)=E[Z^4]-(E[Z^2])^2=3-1=2$.

**Example:** $\mathrm{Var}(5Z^2)=25\times2=50$.

**Dhyan do:** $E[Z^2]=1$ hai, par $\mathrm{Var}(Z^2)=2$. Dono ko mix mat karo.

### 6. Chi-square $\chi^2_k$

Agar $Z_1,\ldots,Z_k$ independent $N(0,1)$ hain, to
$$Z_1^2+Z_2^2+\cdots+Z_k^2\sim\chi^2_k\quad(k=\text{degrees of freedom, df}).$$
Mean: har $Z_i^2$ ka mean 1, to total $k$. Variance: independent hain to variances add hote hain, har ek ka 2, to total $2k$. Do independent chi-square add karo to df add: $\chi^2_a+\chi^2_b=\chi^2_{a+b}$. Ye hamesha $\ge0$ hota hai aur right-skewed.

**Example:** $\chi^2_5$: mean 5, var 10. Agar $V\sim\chi^2_4$ aur $Z$ independent, to $Z^2+V\sim\chi^2_5$.

**Kya chi-square NAHI hai:**
- $(Z_1+Z_2+Z_3)^2$: yahan $Z_1+Z_2+Z_3\sim N(0,3)=\sqrt3\,Z$, to square $=3Z^2=3\chi^2_1$. Mean 3 same hai, par variance $9\times2=18$, jabki $\chi^2_3$ ka 6.
- $3Z_1^2$: wahi $3\chi^2_1$, variance 18.

**Dhyan do:** Pehle square karo, phir add karo. "Add phir square" chi-square nahi deta.

### 7. Non-standard normal ka square: $\sigma^4$ wala trap

Agar $X_i\sim N(0,\sigma^2)$, to $X_i=\sigma Z_i$, aur $X_i^2=\sigma^2Z_i^2$. Isliye
$$E[X_i^2]=\sigma^2,\qquad\mathrm{Var}(X_i^2)=(\sigma^2)^2\cdot2=2\sigma^4.$$
$k$ independent ka sum: $\sum X_i^2=\sigma^2\chi^2_k$, mean $k\sigma^2$, variance $2k\sigma^4$.

**Example:** $X_1,X_2\sim N(0,9)$ iid. $\mathrm{Var}(X_1^2)=2\times81=162$.

**Dhyan do:** Constant $c=\sigma^2$ se multiply kiya to variance $c^2=\sigma^4$ se multiply hoga, $\sigma^2$ se nahi.

### 8. Student's $t$ distribution

Agar $Z\sim N(0,1)$ aur $V\sim\chi^2_k$ independent hain, to
$$t_k=\frac{Z}{\sqrt{V/k}}.$$
Shape: $Z$ jaisa symmetric bell, centre 0, par **tails moti (heavier)** — kyunki denominator bhi random hai, kabhi chhota aakar value ko bada kar deta hai. Jaise-jaise $k\to\infty$, $V/k\to1$ aur $t_k\to N(0,1)$. (Extra: $k>2$ ke liye $\mathrm{Var}(t_k)=\frac{k}{k-2}>1$.)

**Example:** $Z$ aur $V\sim\chi^2_6$ independent: $\frac{Z}{\sqrt{V/6}}\sim t_6$. Numerator aur denominator dono me df same (6) hona chahiye.

**Dhyan do:** $V$ ko uske df se divide karna zaroori hai. $Z/\sqrt V$ $t$ nahi hai.

### 9. Normal sample se aane wale results

$X_1,\ldots,X_n$ iid $N(\mu,\sigma^2)$, sample mean $\bar X$, sample variance $s^2=\frac{1}{n-1}\sum(X_i-\bar X)^2$:
$$\frac{(n-1)s^2}{\sigma^2}\sim\chi^2_{n-1},\qquad\frac{\bar X-\mu}{s/\sqrt n}\sim t_{n-1}.$$
Ek df "kharch" hota hai kyunki $\bar X$ data se estimate hua hai. Pehle result se: $E[s^2]=\frac{\sigma^2}{n-1}(n-1)=\sigma^2$ aur $\mathrm{Var}(s^2)=\frac{\sigma^4}{(n-1)^2}\cdot2(n-1)=\frac{2\sigma^4}{n-1}$.

**Example:** $n=10$, $\sigma^2=4$, observed $s^2=8$. Statistic $=\frac{9\times8}{4}=18$, compare with $\chi^2_9$.

**Dhyan do:** df $n-1$ hai, $n$ nahi. Aur $t$ tab aata hai jab $\sigma$ unknown ho aur $s$ use karo.

## Solved examples

**Example 1 (MCQ, easy):** $Z\sim N(0,1)$ and $W=4-2Z$. Then $(E[W],\mathrm{Var}(W))$ is
(A) $(4,-4)$  (B) $(4,2)$  (C) $(4,4)$  (D) $(0,4)$

**Soch:** Linear transform $aZ+b$ with $a=-2$, $b=4$ → $N(b,a^2)$.

**Solution:**
1. $E[W]=4-2\cdot0=4$.
2. $\mathrm{Var}(W)=(-2)^2\cdot1=4$.
Answer: **(C)**.

**Galti kahan hoti hai:** (A) — $a$ ko square kiye bina sign ke saath le lena; (B) — $|a|$ lena, $a^2$ nahi.

**Example 2 (NAT, easy):** $X\sim N(60,25)$ (variance 25). Find $P(X<55)$. Use $\Phi(1)=0.8413$.

**Soch:** Normal + probability → standardise with SD.

**Solution:**
1. $\sigma=\sqrt{25}=5$.
2. $z=\frac{55-60}{5}=-1$.
3. $P=\Phi(-1)=1-0.8413=0.1587$.
Answer: **0.1587**.

**Galti kahan hoti hai:** 25 se divide karna: $z=-5/25=-0.2$, jisse $\Phi(-0.2)\approx0.42$ aata hai — bilkul galat.

**Example 3 (NAT, medium):** $X\sim N(70,100)$. Find $P(60<X<100)$. Use $\Phi(1)=0.8413$, $\Phi(3)=0.9987$.

**Soch:** Interval → dono ends standardise, $\Phi(z_2)-\Phi(z_1)$.

**Solution:**
1. $\sigma=10$.
2. $z_1=\frac{60-70}{10}=-1$, $z_2=\frac{100-70}{10}=3$.
3. $P=\Phi(3)-\Phi(-1)=0.9987-(1-0.8413)=0.9987-0.1587=0.8400$.
Answer: **0.84**.

**Galti kahan hoti hai:** $\Phi(3)-\Phi(1)=0.1574$ likh dena — lower end ka minus sign bhool gaye.

**Example 4 (MCQ, medium):** $X$ is normal with $P(X<30)=0.5$ and $P(X>36)=0.0228$. Given $\Phi(2)=0.9772$, the variance of $X$ is
(A) 3  (B) 6  (C) 9  (D) 36

**Soch:** $P(X<\cdot)=0.5$ → wahi mean. Right tail 0.0228 → $\Phi(z)=0.9772$ → $z=2$.

**Solution:**
1. $\mu=30$.
2. $P(X\le36)=0.9772=\Phi(2)$, so $\frac{36-30}{\sigma}=2\Rightarrow\sigma=3$.
3. Variance $=9$. Answer: **(C)**.

**Galti kahan hoti hai:** (A) — $\sigma=3$ nikaal ke wahi likh dena; sawaal variance pooch raha hai.

**Example 5 (MSQ, medium):** $Z_1,Z_2,Z_3,Z_4$ are iid $N(0,1)$. Which statements are true?
(A) $Z_1^2+Z_2^2+Z_3^2+Z_4^2$ has mean 4 and variance 8
(B) $(Z_1+Z_2)^2\sim\chi^2_2$
(C) $\dfrac{Z_1}{\sqrt{(Z_2^2+Z_3^2+Z_4^2)/3}}\sim t_3$
(D) $\mathrm{Var}(Z_1^2+Z_2^2)=2$

**Soch:** Chi-square = square then add; $t$ = $Z$ over $\sqrt{\chi^2/\text{df}}$, independent.

**Solution:**
1. (A) $\chi^2_4$: mean 4, var 8. True.
2. (B) $Z_1+Z_2\sim N(0,2)$, square $=2\chi^2_1$, not $\chi^2_2$. False.
3. (C) Numerator $Z_1$, denominator uses $Z_2,Z_3,Z_4$ (independent of $Z_1$), $\chi^2_3/3$. True.
4. (D) $\chi^2_2$ variance $=4$. False.
Answer: **(A), (C)**.

**Galti kahan hoti hai:** (B) "do $Z$ hain to $\chi^2_2$" — par ye add karke square hai. (D) — $E[Z^2]=1$ ki tarah $\mathrm{Var}(Z^2)=1$ maan lena.

**Example 6 (NAT, hard):** $X_1,X_2$ are iid $N(0,9)$. Find $\mathrm{Var}(X_1^2+X_2^2)$.

**Soch:** Non-standard normal ka square → $X_i=3Z_i$, factor $\sigma^4$.

**Solution:**
1. $X_i^2=9Z_i^2$.
2. $\mathrm{Var}(X_i^2)=81\times2=162$.
3. Independent, to add: $162+162=324$.
Answer: **324**.

**Galti kahan hoti hai:** $9\times\mathrm{Var}(\chi^2_2)=9\times4=36$ — scale factor ko square karna bhool gaye ($\sigma^2$ ki jagah $\sigma^4$ chahiye).

## Confusions clear karo

**Q:** $N(\mu,\sigma^2)$ me doosra number SD hai ya variance?
**A:** Variance. Standardise karte waqt uska square root lo. $N(100,225)$ → $\sigma=15$.

**Q:** Table me $\Phi(-1.5)$ nahi hai, kya karu?
**A:** $\Phi(-1.5)=1-\Phi(1.5)$. Picture: left tail = right tail.

**Q:** $P(X>c)$ aur $P(X\ge c)$ me farak?
**A:** Normal continuous hai, to koi farak nahi.

**Q:** $E[Z^2]$ aur $\mathrm{Var}(Z^2)$ me farak?
**A:** $E[Z^2]=1$ (average square). $\mathrm{Var}(Z^2)=E[Z^4]-1=3-1=2$ (squares kitne bikhre hain).

**Q:** $(Z_1+Z_2+Z_3)^2$ ka mean bhi 3 hai, to wo $\chi^2_3$ kyun nahi?
**A:** Mean same hai par distribution alag: wo $3\times\chi^2_1$ hai, variance 18. $\chi^2_3$ ka variance 6 hai. Mean match hona kaafi nahi.

**Q:** $t$ kab use karte hain, $Z$ kab?
**A:** Population $\sigma$ pata ho → $Z$. $\sigma$ unknown, sample $s$ use kiya → $t_{n-1}$. Bade $n$ pe dono lagbhag same.

**Q:** Chi-square negative ho sakta hai?
**A:** Nahi, ye squares ka sum hai, hamesha $\ge0$. Isliye iska shape symmetric nahi, right side ko khincha hua (right-skewed) hota hai. Jaise-jaise $k$ badhta hai, shape dheere-dheere bell jaisa ho jaata hai.

**Q:** 68–95–99.7 rule kab kaam aata hai?
**A:** Jab table na diya ho aur rough answer chahiye, ya options me se galat wale jaldi kaatne hon. Jaise $N(50,16)$ me $P(42<X<58)$ = $\mu\pm2\sigma$ = lagbhag 0.95. Exact NAT ke liye question me diye $\Phi$ values hi use karo.

**Q:** $\chi^2$ aur $t$ ke "degrees of freedom" ka simple matlab kya hai?
**A:** $\chi^2_k$ me $k$ = kitne independent squared normals jode. $t_k$ me wahi $k$ denominator wale chi-square ka hai. Sample se aane par ek df $\bar X$ estimate karne me chala jaata hai, isliye $n-1$.

## Khud try karo

**1.** $X\sim N(20,9)$. Find $P(17<X<26)$. Use $\Phi(1)=0.8413$, $\Phi(2)=0.9772$.

<details><summary>Answer dekho</summary>

$\sigma=3$. $z_1=\frac{17-20}{3}=-1$, $z_2=\frac{26-20}{3}=2$. $P=0.9772-0.1587=0.8185$.

</details>

**2.** $Z\sim N(0,1)$. Find $E[(3Z-1)^2]$.

<details><summary>Answer dekho</summary>

$W=3Z-1$: $\mathrm{Var}=9$, mean $=-1$. $E[W^2]=9+1=10$.

</details>

**3.** $Z_1,Z_2,Z_3$ iid $N(0,1)$. Find $\mathrm{Var}\big((Z_1+Z_2+Z_3)^2\big)$.

<details><summary>Answer dekho</summary>

$Z_1+Z_2+Z_3\sim N(0,3)$, so it equals $\sqrt3Z$ in distribution. Square $=3Z^2$. Variance $=9\times2=18$ (not 6).

</details>

**4.** A sample of $n=11$ comes from a normal population with $\sigma^2=5$. Find $E[s^2]$ and $\mathrm{Var}(s^2)$.

<details><summary>Answer dekho</summary>

$\frac{10s^2}{5}=2s^2\sim\chi^2_{10}$. So $E[2s^2]=10\Rightarrow E[s^2]=5$. $\mathrm{Var}(2s^2)=20\Rightarrow\mathrm{Var}(s^2)=5$. (Formula: $\frac{2\sigma^4}{n-1}=\frac{50}{10}=5$.)

</details>

**5.** $X\sim N(100,16)$. Find $c$ with $P(X<c)=0.975$.

<details><summary>Answer dekho</summary>

$\Phi(1.96)=0.975$, so $\frac{c-100}{4}=1.96\Rightarrow c=100+7.84=107.84$.

</details>

## Ek page me

- $N(\mu,\sigma^2)$: second parameter **variance**; symmetric, mean = median = $\mu$.
- Standardise: $Z=\frac{X-\mu}{\sigma}$ — SD se divide karo.
- $P(a<X<b)=\Phi(z_b)-\Phi(z_a)$; $P(X>c)=1-\Phi(z_c)$; $\Phi(-z)=1-\Phi(z)$.
- Yaad: $\Phi(1)=0.8413$, $\Phi(2)=0.9772$, $\Phi(3)=0.9987$; $z_{0.025}=1.96$, $z_{0.05}=1.645$.
- $aZ+b\sim N(b,a^2)$; $\mathrm{Var}(aX+b)=a^2\sigma^2$.
- $E[W^2]=\mathrm{Var}(W)+(E[W])^2$.
- $E[Z^2]=1$, $E[Z^4]=3$, $\mathrm{Var}(Z^2)=2$.
- $\chi^2_k=\sum Z_i^2$ (square then add): mean $k$, var $2k$; independent df add.
- $(Z_1+\cdots+Z_k)^2=k\chi^2_1$, not $\chi^2_k$.
- $X_i\sim N(0,\sigma^2)$: $\mathrm{Var}(X_i^2)=2\sigma^4$.
- $t_k=Z/\sqrt{V/k}$: heavier tails, $\to N(0,1)$ as $k\to\infty$.
- Normal sample: $(n-1)s^2/\sigma^2\sim\chi^2_{n-1}$, $(\bar X-\mu)/(s/\sqrt n)\sim t_{n-1}$.

Revision ke liye **Short note** tab dekho.
