# Central limit theorem and confidence intervals

> **Time:** ~35 min · **Pehle aana chahiye:** mean aur variance ke rules ($E[aX]=aE[X]$, $\text{Var}(aX)=a^2\text{Var}(X)$), normal distribution aur $\Phi$ (z-table) padhna · **Day:** 12, 14

## Ye topic kyun?

Real life me hum poori population nahi dekh sakte — sirf ek sample dekhte hain. Central limit theorem (CLT) batata hai ki sample ka average kaise behave karta hai, aur confidence interval (CI) us average se population mean $\mu$ ke liye ek "range" banata hai. GATE DA me yahan se 1–2 mark ke NAT (SD of sum, SE, CI ka endpoint/width, sample size $n$) aur MCQ/MSQ (CI ka sahi interpretation, width kab badhti hai) aate hain.

## Picture se samjho

Socho ek dukaan me har customer ka bill bahut skewed hai: zyada log chhota bill banate hain, kuch log bahut bada. Ek akela bill bilkul unpredictable hai. Lekin agar tum 100 customers ka **average** bill lo, aur ye kaam baar-baar karo, to wo averages ek saaf bell curve banate hain — aur wo bell bahut patla hota hai.

<figure class="fig">
<svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="160" x2="230" y2="160" stroke="currentColor"/>
<rect x="25" y="50" width="24" height="110" style="fill:var(--info)" opacity="0.7"/>
<rect x="50" y="80" width="24" height="80" style="fill:var(--info)" opacity="0.7"/>
<rect x="75" y="105" width="24" height="55" style="fill:var(--info)" opacity="0.7"/>
<rect x="100" y="122" width="24" height="38" style="fill:var(--info)" opacity="0.7"/>
<rect x="125" y="134" width="24" height="26" style="fill:var(--info)" opacity="0.7"/>
<rect x="150" y="142" width="24" height="18" style="fill:var(--info)" opacity="0.7"/>
<rect x="175" y="148" width="24" height="12" style="fill:var(--info)" opacity="0.7"/>
<rect x="200" y="152" width="24" height="8" style="fill:var(--info)" opacity="0.7"/>
<text x="125" y="30" text-anchor="middle" font-size="13" fill="currentColor">Ek bill X (skewed)</text>
<text x="125" y="182" text-anchor="middle" font-size="12" fill="currentColor">spread: SD = σ</text>
<line x1="240" y1="100" x2="272" y2="100" stroke="currentColor" stroke-width="2"/>
<polygon points="280,100 270,94 270,106" fill="currentColor"/>
<text x="258" y="88" text-anchor="middle" font-size="11" fill="currentColor">n ka</text>
<text x="258" y="122" text-anchor="middle" font-size="11" fill="currentColor">average</text>
<line x1="290" y1="160" x2="500" y2="160" stroke="currentColor"/>
<path d="M 300 160 C 360 160, 365 50, 395 50 C 425 50, 430 160, 490 160" fill="none" style="stroke:var(--good)" stroke-width="2.5"/>
<line x1="395" y1="50" x2="395" y2="160" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<text x="395" y="176" text-anchor="middle" font-size="12" fill="currentColor">μ</text>
<text x="395" y="30" text-anchor="middle" font-size="13" fill="currentColor">x̄ ka distribution (bell)</text>
<text x="395" y="198" text-anchor="middle" font-size="12" fill="currentColor">spread: SE = σ/√n</text>
</svg>
<figcaption>Ek observation skewed ho sakta hai, par bahut saare observations ka average normal (bell) jaisa banta hai, centre μ par, spread σ/√n.</figcaption>
</figure>

Notice karo: (1) bell ka centre wahi $\mu$ hai jo population ka mean hai — average "bias" nahi karta. (2) Bell ka spread $\sigma$ nahi, $\sigma/\sqrt n$ hai — jitna bada $n$, utna patla. (3) Shape original data ki shape pe depend nahi karta; isi ko CLT kehte hain.

Ab dusri picture: confidence interval kya "guarantee" deta hai.

<figure class="fig">
<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg">
<line x1="260" y1="22" x2="260" y2="210" style="stroke:var(--mark)" stroke-width="2" stroke-dasharray="5 4"/>
<text x="260" y="15" text-anchor="middle" font-size="12" fill="currentColor">μ (fixed, par unknown)</text>
<line x1="205" y1="30" x2="295" y2="30" style="stroke:var(--good)" stroke-width="3"/>
<line x1="230" y1="39" x2="320" y2="39" style="stroke:var(--good)" stroke-width="3"/>
<line x1="193" y1="48" x2="283" y2="48" style="stroke:var(--good)" stroke-width="3"/>
<line x1="217" y1="57" x2="307" y2="57" style="stroke:var(--good)" stroke-width="3"/>
<line x1="245" y1="66" x2="335" y2="66" style="stroke:var(--good)" stroke-width="3"/>
<line x1="185" y1="75" x2="275" y2="75" style="stroke:var(--good)" stroke-width="3"/>
<line x1="210" y1="84" x2="300" y2="84" style="stroke:var(--good)" stroke-width="3"/>
<line x1="223" y1="93" x2="313" y2="93" style="stroke:var(--good)" stroke-width="3"/>
<line x1="200" y1="102" x2="290" y2="102" style="stroke:var(--good)" stroke-width="3"/>
<line x1="275" y1="111" x2="365" y2="111" style="stroke:var(--bad)" stroke-width="3"/>
<line x1="213" y1="120" x2="303" y2="120" style="stroke:var(--good)" stroke-width="3"/>
<line x1="191" y1="129" x2="281" y2="129" style="stroke:var(--good)" stroke-width="3"/>
<line x1="237" y1="138" x2="327" y2="138" style="stroke:var(--good)" stroke-width="3"/>
<line x1="204" y1="147" x2="294" y2="147" style="stroke:var(--good)" stroke-width="3"/>
<line x1="221" y1="156" x2="311" y2="156" style="stroke:var(--good)" stroke-width="3"/>
<line x1="182" y1="165" x2="272" y2="165" style="stroke:var(--good)" stroke-width="3"/>
<line x1="226" y1="174" x2="316" y2="174" style="stroke:var(--good)" stroke-width="3"/>
<line x1="209" y1="183" x2="299" y2="183" style="stroke:var(--good)" stroke-width="3"/>
<line x1="197" y1="192" x2="287" y2="192" style="stroke:var(--good)" stroke-width="3"/>
<line x1="240" y1="201" x2="330" y2="201" style="stroke:var(--good)" stroke-width="3"/>
<text x="375" y="115" font-size="12" style="fill:var(--bad)">miss!</text>
<text x="260" y="230" text-anchor="middle" font-size="12" fill="currentColor">20 alag samples → 20 intervals; ~19 μ ko cover karte hain</text>
</svg>
<figcaption>Har naya sample ek naya interval deta hai. μ hilta nahi; intervals hilte hain. "95%" ka matlab: lambe run me ~95% intervals μ ko pakadte hain.</figcaption>
</figure>

Dhyan do: $\mu$ ki line ek jagah fixed hai. Randomness intervals me hai, $\mu$ me nahi. Isliye "95% confidence" procedure ki quality hai, kisi ek computed interval ke baare me probability statement nahi.

## Concept step-by-step

### 1. iid ka matlab, aur sum ka mean/variance

**Idea:** $X_1,\dots,X_n$ "iid" hain matlab **i**ndependent (ek dusre pe asar nahi) aur **i**dentically **d**istributed (sab ka same distribution, same mean $\mu$, same variance $\sigma^2$).

Sum $S=X_1+\dots+X_n$ ke liye:
$$E[S]=n\mu,\qquad \text{Var}(S)=n\sigma^2,\qquad \text{SD}(S)=\sigma\sqrt n.$$

**Kyun?** Expectation hamesha add hoti hai: $E[S]=\mu+\dots+\mu=n\mu$. Variance tab add hoti hai jab variables independent hon (covariance terms zero ho jaate hain): $\text{Var}(S)=\sigma^2+\dots+\sigma^2=n\sigma^2$. SD variance ka square root hai, isliye $\sqrt{n\sigma^2}=\sigma\sqrt n$.

**Example:** $n=36$, mean 5, SD 6. $E[S]=180$, $\text{Var}(S)=36\cdot36=1296$, $\text{SD}(S)=6\sqrt{36}=36$.

**Dhyan do:** SD add nahi hoti, variance add hoti hai. $\text{SD}(S)=n\sigma=216$ likhna sabse common galti hai.

### 2. Sample mean $\bar X$ aur standard error

**Idea:** $\bar X=S/n$. Kisi cheez ko $1/n$ se scale karo to mean $1/n$ se scale hota hai, variance $1/n^2$ se.
$$E[\bar X]=\frac{n\mu}{n}=\mu,\qquad \text{Var}(\bar X)=\frac{n\sigma^2}{n^2}=\frac{\sigma^2}{n},\qquad SE=\text{SD}(\bar X)=\frac{\sigma}{\sqrt n}.$$

"Standard error" (SE) bas sample mean ki SD ka naam hai.

**Example:** $\sigma=6$, $n=36$: $SE=6/6=1$. Matlab ek bill ka spread 6 hai, par 36 bills ke average ka spread sirf 1.

**Dhyan do:** $SE\neq\sigma/n$ aur $SE\neq\sigma^2/n$. $\sigma^2/n$ variance hai, SE nahi.

### 3. Central limit theorem (CLT)

**Idea:** Data ki shape kuch bhi ho (skewed, uniform, coin toss), agar $n$ bada hai (rule of thumb $n\ge30$) to $\bar X$ lagbhag normal hota hai.
$$Z=\frac{\bar X-\mu}{\sigma/\sqrt n}\ \approx\ N(0,1).$$
Equivalent form sum ke liye: $\dfrac{S-n\mu}{\sigma\sqrt n}\approx N(0,1)$.

Kaise use karein: (a) mean aur SE nikalo, (b) $z=(\text{value}-\text{mean})/SE$, (c) $\Phi(z)$ table se probability.

**Example:** $n=64$, $\mu=10$, $\sigma=8$. $P(\bar X>11)$? $SE=8/8=1$, $z=(11-10)/1=1$, $P=1-\Phi(1)=1-0.8413=0.1587$.

**Dhyan do:** CLT $\bar X$ (ya sum) ke baare me hai, ek akele $X$ ke baare me nahi. Skewed data ka ek observation normal nahi ban jaata.

### 4. Binomial ka normal approximation

**Idea:** Binomial$(n,p)$ = $n$ Bernoulli (0/1) variables ka sum hai. Ek Bernoulli ka mean $p$, variance $p(1-p)$. Step 1 se sum ka mean $np$, variance $np(1-p)$. CLT se:
$$\text{Bin}(n,p)\approx N\big(np,\ np(1-p)\big),\qquad z=\frac{x-np}{\sqrt{np(1-p)}}.$$

**Example:** fair coin 100 baar: mean 50, variance 25, SD 5. $P(\text{heads}\ge60)\approx P(Z\ge2)=1-0.9772=0.0228$.

**Dhyan do:** $N(np,np(1-p))$ me dusra number **variance** hai. Standardise karte waqt uska root (SD) lo. $z=10/25$ likhna galat hai.

### 5. Confidence interval jab $\sigma$ pata ho ($z$-interval)

**Idea:** CLT se $P(-1.96\le Z\le1.96)=0.95$. $Z=(\bar X-\mu)/(\sigma/\sqrt n)$ ko $\mu$ ke liye ulta karo:
$$\bar X-1.96\frac{\sigma}{\sqrt n}\ \le\ \mu\ \le\ \bar X+1.96\frac{\sigma}{\sqrt n}.$$
General form, confidence level $1-\alpha$:
$$\bar x\pm z_{\alpha/2}\frac{\sigma}{\sqrt n}.$$
Yahan $z_{\alpha/2}$ wo point hai jiske right me $\alpha/2$ area hai (dono tails me milaakar $\alpha$). Yaad rakho: 90% → 1.645, 95% → 1.96, 99% → 2.576.

**Margin of error** $E=z_{\alpha/2}\sigma/\sqrt n$. **Width** $=2E$.

**Example:** $n=64$, $\sigma=16$, $\bar x=50$, 95%: $SE=16/8=2$, $E=1.96\times2=3.92$, CI $=(46.08,\ 53.92)$, width $7.84$.

**Dhyan do:** 95% ke liye $z_{0.025}=1.96$ use hota hai, $z_{0.05}=1.645$ nahi — kyunki 5% dono tails me baant-ta hai.

### 6. Confidence interval jab $\sigma$ pata na ho ($t$-interval)

**Idea:** Asli life me $\sigma$ unknown hota hai, to hum sample SD $s$ use karte hain:
$$s=\sqrt{\frac{1}{n-1}\sum(x_i-\bar x)^2}.$$
$s$ khud random hai, to extra uncertainty aati hai. Isliye normal ki jagah **$t$-distribution** use hota hai — ye bhi bell jaisa, symmetric, par tails moti. Iska ek parameter hai: degrees of freedom (df) $=n-1$. Jaise-jaise df badhta hai, $t\to z$.
$$\bar x\pm t_{\alpha/2,\,n-1}\frac{s}{\sqrt n}\qquad(\text{data normal, }\sigma\text{ unknown}).$$

**Example:** $n=9$, $\bar x=30$, $s=6$, $t_{0.025,8}=2.306$. $SE=6/3=2$, margin $=4.612$, CI $=(25.388,\ 34.612)$.

**Dhyan do:** df $=n-1=8$, $n=9$ nahi. Aur chhote $n$ me $z$ lagana galat hai — interval zarurat se patla banega.

### 7. Width kis cheez se badalti hai

Margin $=z\cdot\sigma/\sqrt n$. Har factor alag se dekho:
- $n$ ko 4 guna karo → $\sqrt n$ 2 guna → width **aadhi**. ($n$ double karne se width sirf $1/\sqrt2\approx0.707$ guna hoti hai, aadhi nahi.)
- Confidence 95% se 99% → $z$ 1.96 se 2.576 → width **badhti** hai. Zyada pakka hona hai to jaal bada chahiye.
- $\sigma$ bada → width badhti hai.
- $\bar x$ badalne se width nahi badalti, sirf interval khisakta hai.

**Dhyan do:** "Higher confidence → narrower" ulta hai. Higher confidence hamesha wider.

### 8. Sample size formula

**Idea:** Chahiye ki margin $\le E$: $z\sigma/\sqrt n\le E\iff\sqrt n\ge z\sigma/E\iff n\ge(z\sigma/E)^2$.

**Example:** $\sigma=5$, $E=1$, 95%: $(1.96\times5)^2=9.8^2=96.04$ → $n=97$.

**Dhyan do:** Hamesha **upar** round karo. $n=96$ par margin $1.96\times5/\sqrt{96}\approx1.0002>1$ — condition fail.

### 9. Sahi interpretation

**Idea:** $\mu$ ek fixed number hai (unknown). Random cheez $\bar X$ hai, isliye interval random hai — *data aane se pehle*. "95%" ka matlab: agar ye procedure baar-baar chalayein, to lagbhag 95% intervals $\mu$ ko cover karenge (figure 2).

Ek baar interval compute ho gaya, jaise $(12.1,\ 15.3)$, to $\mu$ ya to andar hai ya nahi — probability 0 ya 1, hume pata nahi kaunsa. Isliye "$P(12.1<\mu<15.3)=0.95$" technically galat hai.

**Dhyan do:** CI $\mu$ ke liye hai, individual observations ke liye nahi. "95% customers ka bill is range me hai" — galat.

### 10. CI aur hypothesis test ka link

Two-sided test $H_0:\mu=\mu_0$ at level $\alpha$ tab hi reject karta hai jab $\mu_0$ $(1-\alpha)$ CI ke **bahar** ho. Kyun? Dono same inequality $|\bar x-\mu_0|>z_{\alpha/2}\,SE$ check karte hain.

**Example:** 95% CI $(48,56)$. $H_0:\mu=50$ → 50 andar → 5% pe reject nahi. $H_0:\mu=57$ → bahar → reject.

**Dhyan do:** Ye link sirf **two-sided** test aur matching level ($\alpha$ ↔ $1-\alpha$) ke liye hai.

## Solved examples

**Example 1 (NAT, easy):** $X_1,\dots,X_{36}$ iid, mean 5, SD 6. $S=X_1+\dots+X_{36}$ ki SD kya hai?

**Soch:** "SD of sum" → variances add karo, phir root.

**Solution:**
1. $\text{Var}(X_i)=6^2=36$.
2. $\text{Var}(S)=36\times36=1296$.
3. $\text{SD}(S)=\sqrt{1296}=36$ (ya seedha $6\sqrt{36}=6\times6=36$).

**Answer: 36.**

**Galti kahan hoti hai:** $n\sigma=36\times6=216$ — SDs ko add kar diya. Ya $\sigma/\sqrt n=1$ — sum ki jagah mean ka SE de diya.

**Example 2 (NAT, medium):** Ek fair coin 100 baar uchhala. Normal approximation se (continuity correction nahi) $P(\text{heads}\ge60)$? $\Phi(0.4)=0.6554$, $\Phi(2)=0.9772$.

**Soch:** Coin tosses ka count = Binomial = Bernoulli ka sum → CLT.

**Solution:**
1. Mean $np=100\times0.5=50$.
2. Variance $np(1-p)=100\times0.25=25$; SD $=5$.
3. $z=(60-50)/5=2$.
4. $P(Z\ge2)=1-0.9772=0.0228$.

**Answer: 0.0228.**

**Galti kahan hoti hai:** variance se divide kiya: $z=10/25=0.4$, answer $1-0.6554=0.3446$. Ya $\Phi(2)=0.9772$ hi answer likh diya (right tail ki jagah left tail).

**Example 3 (NAT, medium):** $n=49$, $\sigma=14$ (known), $\bar x=80$. 95% CI ka **lower limit** nikalo ($z_{0.025}=1.96$). Ek single number enter karo.

**Soch:** $\sigma$ known → $z$-interval. NAT ek number maangta hai.

**Solution:**
1. $SE=14/\sqrt{49}=14/7=2$.
2. Margin $=1.96\times2=3.92$.
3. Lower $=80-3.92=76.08$.

**Answer: 76.08.**

**Galti kahan hoti hai:** $z_{0.05}=1.645$ use kiya → $80-3.29=76.71$. Ya $SE=14/49$ liya → $80-0.56=79.44$.

**Example 4 (MCQ, medium):** Ek normal population se $n=9$ ka sample: $\bar x=30$, $s=6$, $\sigma$ unknown. Diya hai $t_{0.025,8}=2.306$, $t_{0.025,9}=2.262$, $z_{0.025}=1.96$. 95% CI hai:
(A) $(26.08,\ 33.92)$ (B) $(25.476,\ 34.524)$ (C) $(25.388,\ 34.612)$ (D) $(16.164,\ 43.836)$

**Soch:** $\sigma$ unknown + chhota $n$ + normal data → $t$ with df $=n-1$.

**Solution:**
1. df $=9-1=8$ → $t=2.306$.
2. $SE=s/\sqrt n=6/3=2$.
3. Margin $=2.306\times2=4.612$.
4. CI $=(30-4.612,\ 30+4.612)=(25.388,\ 34.612)$.

**Answer: (C).**

**Galti kahan hoti hai:** (A) $z=1.96$ use kiya. (B) df $=n=9$ le liya ($2.262\times2=4.524$). (D) $s/\sqrt n$ ki jagah $s$ hi le liya: $2.306\times6=13.836$.

**Example 5 (NAT, hard):** $\sigma=12$ known. 95% margin of error at most 2 chahiye. Minimum $n$?

**Soch:** "Smallest $n$ for margin ≤ E" → $n\ge(z\sigma/E)^2$, round up.

**Solution:**
1. $z\sigma/E=1.96\times12/2=11.76$.
2. $n\ge11.76^2=138.2976$.
3. $n$ integer hona chahiye aur condition $\ge$ hai, to $n=139$.

**Answer: 139.**

**Galti kahan hoti hai:** 138 likh diya (neeche round kiya) — $n=138$ par margin $1.96\times12/\sqrt{138}\approx2.002>2$. Ya square karna bhool gaye: 11.76 → 12.

**Example 6 (MSQ, hard):** $\sigma$ known, $\bar x\pm1.96\sigma/\sqrt n$ se ek 95% CI mila: $(40,\ 46)$. Kaunse statements sahi hain?
(A) Probability 0.95 hai ki $\mu$ 40 aur 46 ke beech hai.
(B) Agar yahi procedure bahut saare naye samples pe chalayein, to lagbhag 95% intervals $\mu$ ko cover karenge.
(C) $H_0:\mu=47$ ka two-sided 5% test $H_0$ ko reject karega.
(D) Population ke lagbhag 95% observations 40 aur 46 ke beech hain.

**Soch:** Interpretation question → $\mu$ fixed hai; CI–test link check karo.

**Solution:**
1. (A) galat: computed interval ke baad $\mu$ ke baare me probability statement nahi.
2. (B) sahi: yahi "95% confidence" ki definition hai.
3. (C) sahi: 47 interval ke bahar hai → two-sided 5% test reject karega.
4. (D) galat: CI mean ke liye hai; individual observations bahut zyada spread hote hain ($\sigma$, $\sigma/\sqrt n$ nahi).

**Answer: (B), (C).**

**Galti kahan hoti hai:** (A) tick karna, kyunki roz ki bhasha me yahi bolte hain. Aur (C) chhod dena kyunki "test" alag chapter lagta hai.

## Confusions clear karo

**Q:** Standard deviation aur standard error me farak kya hai?
**A:** SD ($\sigma$) ek akele observation ka spread hai. SE ($\sigma/\sqrt n$) sample mean $\bar X$ ka spread hai. Data badhane se SD nahi badalta, SE ghatta hai.

**Q:** CLT ke liye data normal hona zaroori hai kya?
**A:** Nahi. CLT ka kamaal yahi hai — kisi bhi shape ka data (finite variance ke saath), $n$ bada ho to $\bar X$ normal jaisa. Lekin chhote $n$ ke $t$-interval ke liye data normal maana jaata hai.

**Q:** $z$ kab, $t$ kab?
**A:** $\sigma$ diya hai (known) → $z$. $\sigma$ nahi diya, sirf $s$ hai, aur $n$ chhota → $t_{n-1}$. Bahut bade $n$ pe $t\approx z$, to fark kam ho jaata hai.

**Q:** $s$ me $n-1$ se kyun divide karte hain?
**A:** $\bar x$ data se hi nikla hai, to deviations $x_i-\bar x$ ka sum hamesha 0 hota hai — sirf $n-1$ deviations "free" hain. $n-1$ se divide karne par $s^2$ average me $\sigma^2$ ke barabar aata hai (unbiased).

**Q:** "95% CI (40, 46)" bolne ka sahi tareeka kya hai?
**A:** "Hum 95% confident hain ki $\mu$ 40 aur 46 ke beech hai", jahan confident ka matlab hai: jo method use kiya wo 95% baar sahi interval deta hai. "$\mu$ ke 95% chance" mat bolo.

**Q:** Interval ka centre kya hota hai?
**A:** Hamesha $\bar x$. Isliye agar interval $(a,b)$ diya ho to $\bar x=(a+b)/2$ aur margin $=(b-a)/2$.

**Q:** $n$ double karne se width aadhi kyun nahi hoti?
**A:** Width $\propto1/\sqrt n$. $n\to2n$ karne pe width $\times1/\sqrt2\approx0.707$. Aadhi karne ke liye $n$ ko 4 guna karna padta hai.

## Khud try karo

**1.** $X_1,\dots,X_{25}$ iid, SD 10. (a) Sum ki SD? (b) $\bar X$ ka SE?

<details><summary>Answer dekho</summary>

(a) $\text{SD}(S)=10\sqrt{25}=50$. (b) $SE=10/\sqrt{25}=2$.

</details>

**2.** $n=64$, $\mu=10$, $\sigma=8$. CLT se $P(\bar X>11)$? ($\Phi(1)=0.8413$)

<details><summary>Answer dekho</summary>

$SE=8/\sqrt{64}=1$. $z=(11-10)/1=1$. $P=1-0.8413=0.1587$.

</details>

**3.** $\sigma=20$ known, $n=100$. 90% CI ki **total width**? ($z_{0.05}=1.645$)

<details><summary>Answer dekho</summary>

$SE=20/10=2$. Margin $=1.645\times2=3.29$. Width $=2\times3.29=6.58$.

</details>

**4.** $\sigma=15$, 99% confidence ($z_{0.005}=2.576$), margin at most 3. Minimum $n$?

<details><summary>Answer dekho</summary>

$n\ge(2.576\times15/3)^2=12.88^2=165.8944$. Upar round: $n=166$.

</details>

**5.** Abhi $n=50$ hai. Baaki sab same rakhkar CI ki width aadhi karni hai. Naya $n$?

<details><summary>Answer dekho</summary>

Width $\propto1/\sqrt n$. Aadhi width ke liye $\sqrt n$ double → $n$ 4 guna → $n=200$.

</details>

## Ek page me

- iid sum: mean $n\mu$, variance $n\sigma^2$, SD $\sigma\sqrt n$ (variance add hoti hai, SD nahi).
- Sample mean: mean $\mu$, variance $\sigma^2/n$, $SE=\sigma/\sqrt n$.
- CLT: bade $n$ pe $(\bar X-\mu)/(\sigma/\sqrt n)\approx N(0,1)$, data ki shape kuch bhi ho.
- Binomial $\approx N(np,\,np(1-p))$; standardise $\sqrt{np(1-p)}$ se.
- $\sigma$ known: $\bar x\pm z_{\alpha/2}\sigma/\sqrt n$. $z_{0.025}=1.96$, $z_{0.05}=1.645$, $z_{0.005}=2.576$.
- $\sigma$ unknown, normal data: $\bar x\pm t_{\alpha/2,n-1}\,s/\sqrt n$; df $=n-1$.
- Width $=2\times$ margin; $n\times4$ → width aadhi; higher confidence ya bada $\sigma$ → wider.
- Sample size: $n\ge(z\sigma/E)^2$, hamesha upar round.
- $\mu$ fixed hai; "95%" = procedure ka long-run coverage rate.
- CI $\mu$ ke liye hai, individual observations ke liye nahi.
- Two-sided level-$\alpha$ test $\mu_0$ ko reject karta hai iff $\mu_0$ $(1-\alpha)$ CI ke bahar.
- NAT me ek hi number do (endpoint, width ya $n$), "a–b" nahi.

Revision ke liye **Short note** tab dekho.
