# z, t and chi-squared hypothesis tests

> **Time:** ~40 min · **Pehle aana chahiye:** normal distribution aur $\Phi$ table, standard error $\sigma/\sqrt n$ (CLT wala lesson), expectation aur variance ke rules · **Day:** 13, 14

## Ye topic kyun?

Hypothesis test ek decision machine hai: "kya data itna ajeeb hai ki hum purana claim ($H_0$) chhod dein?" Machine learning me A/B testing, feature significance, model comparison sab isi pe chalte hain. GATE DA me sawaal aate hain: kaunsa test ($z$, $t$, $\chi^2$) lagega, statistic ki value (NAT), p-value se decision (MCQ/MSQ), Type I/II error aur power (NAT), aur estimator unbiased hai ya nahi (MSQ). Zyaadatar 1–2 mark.

## Picture se samjho

Court case socho. Accused ko tab tak **innocent** maante hain jab tak saboot strong na ho. Ye default assumption hi **null hypothesis $H_0$** hai. Prosecution ka claim **alternative $H_1$** hai. Judge poochta hai: "Agar ye sach me innocent hota, to aisa saboot milna kitna unlikely tha?" Agar bahut unlikely → guilty (reject $H_0$). Warna → "saboot kaafi nahi" (fail to reject). Dhyan do — court "innocent proved" kabhi nahi kehta, sirf "not guilty".

Statistics me "saboot" ek number hai — **test statistic** (jaise $z$). $H_0$ sach ho to ye statistic ek known bell curve follow karta hai. Agar observed value bell ki door wali tail me gire, to $H_0$ pe shak hota hai.

<figure class="fig">
<svg viewBox="0 0 520 215" xmlns="http://www.w3.org/2000/svg">
<polygon points="358,170 358,152 371,160 384,164 397,167 410,169 423,169 436,170 449,170 460,170" style="fill:var(--bad)" opacity="0.45"/>
<polygon points="60,170 73,170 86,170 98,169 111,169 124,167 136,164 149,160 162,152 162,170" style="fill:var(--bad)" opacity="0.45"/>
<polyline points="60,170 72,170 85,170 98,169 110,169 122,167 135,165 148,160 160,154 172,144 185,131 198,115 210,97 222,79 235,64 248,54 260,50 272,54 285,64 298,79 310,97 322,115 335,131 348,144 360,154 372,160 385,165 398,167 410,169 422,169 435,170 448,170 460,170" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="50" y1="170" x2="470" y2="170" stroke="currentColor"/>
<line x1="260" y1="170" x2="260" y2="176" stroke="currentColor"/>
<text x="260" y="190" text-anchor="middle" font-size="12" fill="currentColor">0</text>
<text x="162" y="190" text-anchor="middle" font-size="12" fill="currentColor">−1.96</text>
<text x="358" y="190" text-anchor="middle" font-size="12" fill="currentColor">1.96</text>
<line x1="365" y1="110" x2="365" y2="168" style="stroke:var(--mark)" stroke-width="2.5"/>
<text x="372" y="105" font-size="12" style="fill:var(--mark)">observed z = 2.1</text>
<text x="260" y="140" text-anchor="middle" font-size="12" fill="currentColor">fail to reject</text>
<text x="260" y="155" text-anchor="middle" font-size="12" fill="currentColor">(95% area)</text>
<text x="430" y="150" text-anchor="middle" font-size="11" style="fill:var(--bad)">reject 2.5%</text>
<text x="90" y="150" text-anchor="middle" font-size="11" style="fill:var(--bad)">reject 2.5%</text>
<text x="260" y="25" text-anchor="middle" font-size="13" fill="currentColor">H₀ sach ho to z ka distribution: N(0,1)</text>
<text x="260" y="208" text-anchor="middle" font-size="11" fill="currentColor">two-sided test, α = 0.05</text>
</svg>
<figcaption>Null distribution. Laal tails "rejection region" hain, total area α. Observed z = 2.1 laal region me gira, to 5% level pe H₀ reject.</figcaption>
</figure>

Notice karo: (1) Bell $H_0$ ko sach maan kar banta hai. (2) Laal area ka total hi $\alpha$ (significance level) hai — "kitna galat-alarm bardasht hai". (3) Observed value ke aage ki tail ka area hi p-value hai; agar wo $\alpha$ se chhota, to value laal region me hai.

Ab dusri picture: do tarah ki galti.

<figure class="fig">
<svg viewBox="0 0 520 222" xmlns="http://www.w3.org/2000/svg">
<polygon points="275,160 275,141 283,147 291,152 299,155 307,157 316,158 324,159 332,160 340,160" style="fill:var(--bad)" opacity="0.5"/>
<polygon points="180,160 192,159 204,158 216,156 228,152 239,146 251,135 263,120 275,102 275,160" style="fill:var(--info)" opacity="0.45"/>
<polygon points="275,160 275,102 287,82 298,65 310,54 321,50 333,55 344,69 356,87 367,106 379,123 391,137 402,147 414,153 425,157 437,158 448,159 460,160" style="fill:var(--good)" opacity="0.25"/>
<polyline points="60,160 70,159 80,159 90,157 100,155 110,151 120,145 130,136 140,124 150,110 160,93 170,77 180,63 190,53 200,50 210,53 220,63 230,77 240,93 250,110 260,124 270,136 280,145 290,151 300,155 310,157 320,159 330,159 340,160" fill="none" stroke="currentColor" stroke-width="2"/>
<polyline points="180,160 190,159 200,159 210,157 220,155 230,151 240,145 250,136 260,124 270,110 280,93 290,77 300,63 310,53 320,50 330,53 340,63 350,77 360,93 370,110 380,124 390,136 400,145 410,151 420,155 430,157 440,159 450,159 460,160" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<line x1="50" y1="160" x2="470" y2="160" stroke="currentColor"/>
<line x1="275" y1="30" x2="275" y2="170" style="stroke:var(--mark)" stroke-width="2" stroke-dasharray="5 3"/>
<text x="275" y="22" text-anchor="middle" font-size="12" style="fill:var(--mark)">cutoff</text>
<text x="200" y="42" text-anchor="middle" font-size="12" fill="currentColor">H₀ curve</text>
<text x="335" y="42" text-anchor="middle" font-size="12" style="fill:var(--good)">H₁ curve</text>
<text x="200" y="182" text-anchor="middle" font-size="12" fill="currentColor">fail to reject ←</text>
<text x="360" y="182" text-anchor="middle" font-size="12" fill="currentColor">→ reject H₀</text>
<text x="260" y="198" text-anchor="middle" font-size="11" style="fill:var(--bad)">α (laal): H₀ sach, phir bhi reject</text>
<text x="260" y="213" text-anchor="middle" font-size="11" style="fill:var(--info)">β (neela): H₁ sach, reject nahi</text>
<text x="400" y="110" font-size="11" style="fill:var(--good)">power = 1 − β</text>
</svg>
<figcaption>Do curves: H₀ sach ho to statistic kahan girega, aur H₁ sach ho to kahan. Cutoff ke right me reject. α = H₀ curve ka right area; β = H₁ curve ka left area; power = H₁ curve ka right area.</figcaption>
</figure>

Cutoff ko right khiskao: laal ($\alpha$) chhota hoga, par neela ($\beta$) bada. Yahi trade-off hai. Dono ko saath me chhota karna ho to curves ko patla karo — yani $n$ badhao (SE ghatega).

## Concept step-by-step

### 1. Test ke 5 steps

**Idea:** Har test ek hi recipe follow karta hai.
1. **Parameter** pehchano: mean $\mu$? variance $\sigma^2$? counts?
2. **$H_0$ aur $H_1$** likho. $H_0$ me hamesha "=" hota hai ($\mu=\mu_0$). $H_1$ batata hai tail: $\mu>\mu_0$ (right), $\mu<\mu_0$ (left), $\mu\neq\mu_0$ (two-sided).
3. **Statistic** aur uska null distribution ($Z$, $t_{n-1}$, $\chi^2$).
4. **p-value** ya critical value nikalo.
5. **Decision words me:** "reject $H_0$" ya "fail to reject $H_0$".

**Example:** "Kya bulb ki average life 1000 hours se kam hai?" → parameter $\mu$, $H_0:\mu=1000$, $H_1:\mu<1000$ (left tail).

**Dhyan do:** Jo claim tum *prove* karna chahte ho wo $H_1$ me jaata hai, $H_0$ me nahi.

### 2. $z$-test (mean, $\sigma$ known)

**Idea:** CLT se $H_0$ ke under $\bar X\sim N(\mu_0,\sigma^2/n)$. Standardise karo:
$$z=\frac{\bar x-\mu_0}{\sigma/\sqrt n}\ \sim\ N(0,1)\text{ under }H_0.$$
$z$ batata hai ki $\bar x$, $\mu_0$ se kitne "standard errors" door hai. Bada $|z|$ = ajeeb data.

**Example:** $\mu_0=50$, $\sigma=5$, $n=25$, $\bar x=51.5$. $SE=5/5=1$, $z=1.5/1=1.5$.

**Dhyan do:** Denominator SE ($\sigma/\sqrt n$) hai, $\sigma$ nahi. Bade $n$ (≈30+) pe $\sigma$ unknown ho tab bhi $s$ daal kar $z$ chal jaata hai.

### 3. $t$-test (mean, $\sigma$ unknown, normal data)

**Idea:** $\sigma$ ki jagah sample SD $s$ use karo. $s$ khud random hai, to extra uncertainty → moti tails wala $t$ distribution, df $=n-1$:
$$t=\frac{\bar x-\mu_0}{s/\sqrt n}\ \sim\ t_{n-1}.$$

**Example:** $n=25$, $\bar x=103$, $s=10$, $\mu_0=100$. $SE=10/5=2$, $t=3/2=1.5$, df $=24$. Two-sided 5% critical value $t_{0.025,24}=2.064$; $1.5<2.064$ → fail to reject.

**Dhyan do:** df $=n-1$, $n$ nahi. Aur $\chi^2$ kabhi mean test nahi karta.

### 4. $\chi^2$-test for one variance (normal data)

**Idea:** Agar sawaal spread/variability ka hai ("machine ka variance 10 hai kya?"), to statistic:
$$\chi^2=\frac{(n-1)s^2}{\sigma_0^2}\ \sim\ \chi^2_{n-1}.$$
**Kyun?** Normal data me $(n-1)s^2/\sigma^2$ ka distribution $\chi^2_{n-1}$ hota hai — ye $n-1$ independent squared standard normals ka sum jaisa hai (ek df $\bar x$ estimate karne me chala gaya). $\chi^2$ hamesha $\ge0$ aur right-skewed hota hai.

**Example:** $n=11$, $s^2=18$, $H_0:\sigma^2=10$. $\chi^2=10\times18/10=18$, df $=10$.

**Dhyan do:** Numerator me $(n-1)s^2$ hai, sirf $s^2$ nahi; aur denominator me $\sigma_0^2$ (variance), $\sigma_0$ nahi.

### 5. $\chi^2$-test for counts

**Idea:** Jab data categories ke **counts** hain (die ke faces, gender × preference table), to observed $O$ ko expected $E$ (jo $H_0$ ke under aana chahiye) se compare karo:
$$\chi^2=\sum\frac{(O-E)^2}{E}.$$
- **Goodness of fit** ($k$ categories, e.g. die fair hai?): df $=k-1$ (kyunki total fixed hai, $k-1$ counts free hain).
- **Independence** ($r\times c$ table): df $=(r-1)(c-1)$. Expected cell $=\dfrac{\text{row total}\times\text{column total}}{\text{grand total}}$.

Bada $\chi^2$ = observed expected se door = $H_0$ pe shak. Ye test hamesha **right tail** wala hota hai.

**Example (independence):** 2×2 table $\begin{pmatrix}30&20\\20&30\end{pmatrix}$, sab row/col totals 50, grand 100. Har $E=50\times50/100=25$. $\chi^2=4\times(5^2/25)=4$, df $=1$. 5% critical value $3.841$ → $4>3.841$ → reject independence.

**Dhyan do:** $(O-E)^2/E$ me $E$ se divide hota hai, $O$ se nahi. Aur df me categories ki ginti $-1$ hai.

### 6. p-value

**Idea:** p-value $=P(\text{statistic itna ya isse zyada extreme}\mid H_0\text{ sach})$. Chhota p = "agar $H_0$ sach hota to aisa data bahut rare hota".

**Rule:** reject $H_0$ iff $p\le\alpha$.

Tail ke hisaab se ($z$ ke liye):

| $H_1$ | p-value |
|---|---|
| $\mu>\mu_0$ | $P(Z\ge z)=1-\Phi(z)$ |
| $\mu<\mu_0$ | $P(Z\le z)=\Phi(z)$ |
| $\mu\neq\mu_0$ | $2P(Z\ge\lvert z\rvert)=2(1-\Phi(\lvert z\rvert))$ |

**Example:** two-sided, $z=1.5$, $\Phi(1.5)=0.9332$: $p=2\times0.0668=0.1336>0.05$ → fail to reject.

**Dhyan do:** p-value "$H_0$ sach hone ki probability" **nahi** hai. Wo $H_0$ ko sach *maan kar* calculate hota hai.

### 7. Decision ki bhasha

- $p\le\alpha$: "Reject $H_0$; data $H_1$ ke favour me significant evidence deta hai."
- $p>\alpha$: "Fail to reject $H_0$; evidence kaafi nahi." **"Accept $H_0$" ya "$H_0$ proved" mat bolo** — chhota sample bhi reject na kar paaye, iska matlab ye nahi ki $H_0$ sach hai.
- Same p-value alag $\alpha$ pe alag decision de sakta hai: $p=0.03$ → $\alpha=0.05$ pe reject, $\alpha=0.01$ pe fail to reject.

**Dhyan do:** "$p>\alpha$ to reject" — direction ulta. Chhota p hi reject karta hai.

### 8. Type I, Type II error aur power

|  | $H_0$ sach | $H_1$ sach |
|---|---|---|
| Reject $H_0$ | **Type I error** (prob $\alpha$) | sahi (prob = power) |
| Fail to reject | sahi | **Type II error** (prob $\beta$) |

$$\alpha=P(\text{reject}\mid H_0),\quad \beta=P(\text{fail to reject}\mid H_1),\quad \text{power}=1-\beta=P(\text{reject}\mid H_1).$$

**Kaise nikalein:** rejection rule fix karo (cutoff), phir $\alpha$ ke liye $H_0$ wale distribution me area, power ke liye $H_1$ wale distribution me area.

**Example:** $n=16$, $\sigma=4$ (SE $=1$). $H_0:\mu=10$ vs $H_1:\mu=12$. Rule: reject if $\bar x>11.5$.
- $\alpha=P(\bar X>11.5\mid\mu=10)=P(Z>1.5)=1-0.9332=0.0668$.
- Power $=P(\bar X>11.5\mid\mu=12)=P(Z>-0.5)=\Phi(0.5)=0.6915$. $\beta=0.3085$.

**Facts:** (a) $\alpha+\beta=1$ **nahi** hota — dono alag curves ke areas hain. (b) Cutoff fix $n$ pe: $\alpha$ ghatao → $\beta$ badhega. (c) $n$ badhao → SE ghate → curves patle → power badhe. (d) Power hamesha $H_1$ ke under nikalta hai.

**Dhyan do:** Type I = "false alarm" (innocent ko saza). Type II = "miss" (guilty chhoot gaya).

### 9. Estimators: unbiased aur variance

**Idea:** Estimator ek formula hai jo data se unknown parameter $\theta$ ka guess deta hai ($\hat\theta$). **Unbiased** matlab average me sahi: $E[\hat\theta]=\theta$.

- $\bar X$: $E[\bar X]=\mu$ → unbiased. $\text{Var}(\bar X)=\sigma^2/n$ — $n$ badhne pe $1/n$ ki tarah ghatta hai. Bias pehle se 0 hai, $n$ se nahi badalta.
- Akela $X_1$ bhi unbiased hai ($E[X_1]=\mu$), par uska variance $\sigma^2$ — bahut zyada. Do unbiased estimators me, **kam variance wala better**.
- Weighted: $T=\sum a_iX_i$ ke liye $E[T]=\mu\sum a_i$, to unbiased iff $\sum a_i=1$. $\text{Var}(T)=\sigma^2\sum a_i^2$ (independence).

**$s^2$ me $n-1$ kyun?** Identity: $\sum(X_i-\mu)^2=\sum(X_i-\bar X)^2+n(\bar X-\mu)^2$. Expectation lo: $n\sigma^2=E\big[\sum(X_i-\bar X)^2\big]+n\cdot\frac{\sigma^2}{n}$. To $E\big[\sum(X_i-\bar X)^2\big]=(n-1)\sigma^2$. Isliye $\frac1{n-1}\sum(X_i-\bar X)^2$ unbiased hai, aur $\frac1n\sum(\cdot)$ average me $\frac{n-1}{n}\sigma^2$ deta hai — **biased low**.

**Example:** $T=(X_1+2X_2+3X_3)/k$. $E[T]=6\mu/k$ → unbiased iff $k=6$.

**Dhyan do:** "$n$ badhne se $E[\bar X]$ $\mu$ ke paas aata hai" — galat; wo pehle se hi $\mu$ hai. $n$ sirf variance ghatata hai.

## Solved examples

**Example 1 (MCQ, easy):** Ek packing machine ke weights normal hain. Quality team check karna chahti hai ki weights ka variance 2.25 hai ya nahi, $n=20$ ke sample se. Test statistic ka distribution $H_0$ ke under hai:
(A) $N(0,1)$ (B) $t_{19}$ (C) $\chi^2_{19}$ (D) $\chi^2_{20}$

**Soch:** Sawaal "variance" ka hai, mean ka nahi → $\chi^2$ for one variance.

**Solution:**
1. Statistic $\chi^2=(n-1)s^2/\sigma_0^2=19s^2/2.25$.
2. Null distribution $\chi^2_{n-1}=\chi^2_{19}$.

**Answer: (C).**

**Galti kahan hoti hai:** (D) df $=n$ le liya. (B) "$\sigma$ unknown hai to $t$" — par $t$ mean ke liye hai, variance ke liye nahi.

**Example 2 (NAT, easy):** Normal sample: $n=25$, $\bar x=103$, $s=10$. $H_0:\mu=100$ ke liye $t$ statistic?

**Soch:** Mean ka test, $\sigma$ unknown ($s$ diya) → $t$.

**Solution:**
1. $SE=s/\sqrt n=10/5=2$.
2. $t=(103-100)/2=1.5$.

**Answer: 1.5.**

**Galti kahan hoti hai:** $s$ se divide kiya ($3/10=0.3$) — SE bhool gaye. Ya $s/n=0.4$ se divide karke $7.5$.

**Example 3 (MSQ, medium):** Ek two-sided $z$-test me $z=2.1$ aaya. $\Phi(2.1)=0.9821$. Kaunse sahi hain?
(A) p-value $=0.0358$
(B) $\alpha=0.05$ pe $H_0$ reject hoga
(C) $\alpha=0.01$ pe $H_0$ reject hoga
(D) $H_0$ ke sach hone ki probability $0.0358$ hai

**Soch:** Two-sided → tail double karo. Phir $p$ vs $\alpha$.

**Solution:**
1. Ek tail: $1-0.9821=0.0179$.
2. Two-sided: $p=2\times0.0179=0.0358$ → (A) sahi.
3. $0.0358\le0.05$ → reject → (B) sahi.
4. $0.0358>0.01$ → fail to reject → (C) galat.
5. (D) galat: p-value $H_0$ maan kar nikala gaya hai, $H_0$ ki probability nahi.

**Answer: (A), (B).**

**Galti kahan hoti hai:** two-sided me double karna bhool gaye → $p=0.0179$, to (A) galat lagta hai aur chhoot jaata hai. Aur (D) tick ho jaata hai kyunki roz ki bhasha me log p-value ko "$H_0$ ki probability" bol dete hain.

**Example 4 (NAT, medium):** Ek die 120 baar phenka: faces 1–6 ke counts $25,17,15,23,24,16$. "Die fair hai" ke liye $\chi^2$ goodness-of-fit statistic?

**Soch:** Category counts + "fair" → $\chi^2=\sum(O-E)^2/E$.

**Solution:**
1. Fair die: har face $E=120/6=20$.
2. $O-E$: $5,-3,-5,3,4,-4$. Squares: $25,9,25,9,16,16$; sum $=100$.
3. $\chi^2=100/20=5$. df $=6-1=5$.
4. (Bonus) $\chi^2_{0.05,5}=11.07$; $5<11.07$ → fail to reject fairness.

**Answer: 5.**

**Galti kahan hoti hai:** $(O-E)^2$ ko $O$ se divide karna, ya $\sum(O-E)=0$ likh dena (square bhool gaye). df ke liye 6 likhna bhi common hai.

**Example 5 (NAT, hard):** $X_1,\dots,X_{16}$ iid $N(\mu,16)$. $H_0:\mu=10$ vs $H_1:\mu=12$. Rule: reject $H_0$ if $\bar x>11.5$. Power nikalo. ($\Phi(0.5)=0.6915$, $\Phi(1.5)=0.9332$)

**Soch:** "Power" → $H_1$ ke under reject hone ki probability.

**Solution:**
1. $\sigma=\sqrt{16}=4$, $SE=4/\sqrt{16}=1$.
2. $H_1$ ke under $\bar X\sim N(12,1)$.
3. Power $=P(\bar X>11.5)=P\!\left(Z>\frac{11.5-12}{1}\right)=P(Z>-0.5)=\Phi(0.5)=0.6915$.
4. (Check) $\alpha=P(Z>1.5)=0.0668$, $\beta=0.3085$.

**Answer: 0.6915.**

**Galti kahan hoti hai:** $H_0$ ke under calculate kiya → $0.0668$ ($\alpha$ aa gaya). Ya $\beta=0.3085$ de diya. Ya variance 16 ko SD maan kar $SE=4$ liya → $P(Z>-0.125)$.

**Example 6 (MSQ, hard):** $X_1,X_2,X_3$ iid, mean $\mu$, variance $\sigma^2$. $T=(2X_1+X_2+X_3)/4$. Kaunse sahi hain?
(A) $T$ unbiased hai $\mu$ ke liye
(B) $\text{Var}(T)<\text{Var}(\bar X)$
(C) $\frac13\sum_{i=1}^3(X_i-\bar X)^2$ unbiased hai $\sigma^2$ ke liye
(D) $X_1$ akela unbiased hai $\mu$ ke liye

**Soch:** Unbiased → weights ka sum 1? Variance → weights ke squares ka sum.

**Solution:**
1. (A) weights $\frac24,\frac14,\frac14$, sum $=1$ → $E[T]=\mu$ → sahi.
2. (B) $\text{Var}(T)=\sigma^2\left(\frac4{16}+\frac1{16}+\frac1{16}\right)=\frac{6}{16}\sigma^2=0.375\sigma^2$. $\text{Var}(\bar X)=\sigma^2/3\approx0.333\sigma^2$. $T$ ka zyada → galat.
3. (C) $n$ se divide → biased low (average $\frac23\sigma^2$) → galat.
4. (D) $E[X_1]=\mu$ → sahi (bas variance bada).

**Answer: (A), (D).**

**Galti kahan hoti hai:** (B) tick karna, ye soch kar ki "unbiased hai to utna hi achha" — par unequal weights variance badhate hain; equal weights ($\bar X$) sabse kam variance dete hain. (D) chhod dena kyunki ek observation "estimator" nahi lagta — par unbiased ka matlab sirf $E[\hat\theta]=\theta$ hai.

## Confusions clear karo

**Q:** $z$, $t$ aur $\chi^2$ me kaise choose karun?
**A:** Pehle poocho "kis cheez ka test?" Mean + $\sigma$ known → $z$. Mean + $\sigma$ unknown (normal, chhota $n$) → $t_{n-1}$. Ek variance → $\chi^2_{n-1}$. Category counts (fit ya independence) → $\chi^2=\sum(O-E)^2/E$.

**Q:** p-value 0.03 ka matlab "3% chance $H_0$ sach hai"?
**A:** Nahi. Matlab: "agar $H_0$ sach hota, to itna ya isse extreme data 3% baar aata." Ye data ki probability hai given $H_0$, $H_0$ ki probability nahi.

**Q:** "Fail to reject" aur "accept" me kya farak?
**A:** Accept ka matlab "$H_0$ sach saabit hua" — ye test kabhi nahi karta. Fail to reject ka matlab "data me $H_0$ ke against kaafi saboot nahi mila." Chhota sample hamesha fail to reject kar sakta hai.

**Q:** One-sided test me $z$ ulti direction me aaye to?
**A:** $H_1:\mu>\mu_0$ aur $z=-1.5$: $p=P(Z\ge-1.5)=\Phi(1.5)=0.9332$ — bahut bada, kabhi reject nahi. Tail $H_1$ decide karta hai, $z$ ka sign nahi.

**Q:** $\alpha+\beta=1$ kyun nahi?
**A:** $\alpha$ $H_0$ curve ka area hai, $\beta$ $H_1$ curve ka. Do alag curves ke areas ka sum 1 hone ki koi wajah nahi. (Example 5: $0.0668+0.3085\neq1$.)

**Q:** Power badhane ke tareeke?
**A:** $n$ badhao (sabse common), $\alpha$ badhao (cutoff peeche), ya $H_1$ ka true value $\mu_0$ se door ho. $\sigma$ chhota ho to bhi power badhti hai.

**Q:** Discrete test me $\alpha$ kaise nikalein?
**A:** Wahi definition: $H_0$ ke under rejection event ki probability. Jaise fair coin 5 baar, "sab same" pe reject: $\alpha=P(\text{HHHHH or TTTTT})=2/32=0.0625$.

## Khud try karo

**1.** $H_1:\mu>\mu_0$ ke liye observed $z=-1.5$ aaya. $\Phi(1.5)=0.9332$. p-value?

<details><summary>Answer dekho</summary>

Right-tail test: $p=P(Z\ge-1.5)=\Phi(1.5)=0.9332$. (0.0668 galat hai — wo left tail hai.) Decision: fail to reject.

</details>

**2.** Fair coin ko 5 baar uchhalte hain; $H_0$ (fair) reject karte hain agar paanchon toss same aayein. Type I error ki probability?

<details><summary>Answer dekho</summary>

$\alpha=P(\text{reject}\mid H_0)=P(5H)+P(5T)=\frac1{32}+\frac1{32}=\frac2{32}=0.0625$.

</details>

**3.** $T=(X_1+2X_2+3X_3)/k$, $X_i$ iid mean $\mu$, variance $\sigma^2$. Unbiased ke liye $k$? Us $k$ pe $\text{Var}(T)/\sigma^2$?

<details><summary>Answer dekho</summary>

$E[T]=(1+2+3)\mu/k=6\mu/k$ → $k=6$. $\text{Var}(T)=\sigma^2(1+4+9)/36=14/36\,\sigma^2\approx0.389\sigma^2$.

</details>

**4.** Normal sample $n=16$, $s^2=12$. $H_0:\sigma^2=8$ ke liye statistic ki value aur df?

<details><summary>Answer dekho</summary>

$\chi^2=(n-1)s^2/\sigma_0^2=15\times12/8=22.5$, df $=15$.

</details>

**5.** 2 rows × 3 columns ki contingency table pe independence ka $\chi^2$ test. df?

<details><summary>Answer dekho</summary>

$(r-1)(c-1)=(2-1)(3-1)=2$.

</details>

## Ek page me

- Steps: parameter → $H_0$ (=) aur $H_1$ (tail) → statistic → p-value → decision words me.
- Mean, $\sigma$ known: $z=(\bar x-\mu_0)/(\sigma/\sqrt n)$.
- Mean, $\sigma$ unknown, normal: $t=(\bar x-\mu_0)/(s/\sqrt n)$, df $n-1$.
- Ek variance: $\chi^2=(n-1)s^2/\sigma_0^2$, df $n-1$.
- Counts: $\chi^2=\sum(O-E)^2/E$; fit df $k-1$, table df $(r-1)(c-1)$.
- p-value $=P(\text{itna extreme}\mid H_0)$; two-sided me double karo.
- Reject iff $p\le\alpha$; warna "fail to reject", kabhi "accept" nahi.
- $\alpha=P(\text{reject}\mid H_0)$, $\beta=P(\text{not reject}\mid H_1)$, power $=1-\beta$ ($H_1$ ke under).
- $\alpha+\beta\neq1$; chhota $\alpha$ → bada $\beta$; bada $n$ → zyada power.
- Unbiased: $E[\hat\theta]=\theta$; $\sum a_iX_i$ unbiased iff $\sum a_i=1$, variance $\sigma^2\sum a_i^2$.
- $E[\bar X]=\mu$, $\text{Var}(\bar X)=\sigma^2/n$; $s^2$ me $n-1$, $n$ se divide karna biased low.

Revision ke liye **Short note** tab dekho.
