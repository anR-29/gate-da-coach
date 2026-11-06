# Mean, median, mode, covariance and correlation

> **Time:** ~30 min · **Pehle aana chahiye:** $E[X]$ aur $\mathrm{Var}(X)$, joint PMF table se marginals nikaalna · **Day:** 11, 14

## Ye topic kyun?

Data ko ek-do numbers me summarise karna statistics ka pehla kaam hai: "typical value kya hai" (mean, median, mode) aur "do cheezein saath-saath kaise badalti hain" (covariance, correlation). GATE DA me yahan se aasaan NAT (mean update, corrected mean, median), formula NAT ($\rho$, $\mathrm{Var}(aX+bY)$) aur concept MSQ (zero covariance vs independence) aate hain — 1–2 marks, par traps se bhare.

## Picture se samjho

Mean ko ek **seesaw ka balance point** socho: saare data points weights hain, aur mean wo jagah hai jahan rakhne par seesaw balance ho jaaye. Median sirf **beech wala** point hai — usse fark nahi padta ki end wala point kitna door hai.

<figure class="fig">
<svg viewBox="0 0 320 175" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="50" x2="300" y2="50" stroke="currentColor"/>
<circle cx="36" cy="43" r="5" style="fill:var(--info)"/>
<circle cx="44" cy="43" r="5" style="fill:var(--info)"/>
<circle cx="60" cy="43" r="5" style="fill:var(--info)"/>
<circle cx="68" cy="43" r="5" style="fill:var(--info)"/>
<circle cx="92" cy="43" r="5" style="fill:var(--info)"/>
<polygon points="60,52 54,64 66,64" style="fill:var(--mark)"/>
<text x="60" y="78" text-anchor="middle" font-size="10" fill="currentColor">mean = median = 5</text>
<text x="200" y="40" font-size="11" fill="currentColor">2, 3, 5, 6, 9</text>
<line x1="20" y1="130" x2="300" y2="130" stroke="currentColor"/>
<circle cx="36" cy="123" r="5" style="fill:var(--info)"/>
<circle cx="44" cy="123" r="5" style="fill:var(--info)"/>
<circle cx="60" cy="123" r="5" style="fill:var(--good)"/>
<circle cx="68" cy="123" r="5" style="fill:var(--info)"/>
<circle cx="292" cy="123" r="5" style="fill:var(--bad)"/>
<polygon points="100,132 94,144 106,144" style="fill:var(--mark)"/>
<text x="100" y="158" text-anchor="middle" font-size="10" fill="currentColor">mean = 10</text>
<line x1="60" y1="112" x2="60" y2="100" style="stroke:var(--good)"/>
<text x="60" y="96" text-anchor="middle" font-size="10" style="fill:var(--good)">median = 5</text>
<text x="200" y="110" font-size="11" fill="currentColor">2, 3, 5, 6, 34</text>
<text x="292" y="148" text-anchor="end" font-size="10" style="fill:var(--bad)">outlier</text>
</svg>
<figcaption>9 ko 34 se badla: mean 5 se 10 pe khisak gaya, median 5 hi raha. Mean outlier se hilta hai, median nahi.</figcaption>
</figure>

Ek bada outlier seesaw ko apni taraf kheench leta hai, isliye balance point (mean) bhi khisakta hai. Median sirf order dekhta hai — teesra number abhi bhi 5 hai. Isliye salary jaise skewed data me median zyada "typical" lagta hai.

Ab do variables. Har student ke liye ($x$ = padhai ke ghante, $y$ = marks) ek point plot karo. Points ka pattern batata hai ki dono saath badhte hain, ulta chalte hain, ya koi seedha (linear) rishta nahi.

<figure class="fig">
<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
<rect x="15" y="20" width="95" height="95" fill="none" stroke="currentColor" stroke-opacity="0.4"/>
<rect x="120" y="20" width="95" height="95" fill="none" stroke="currentColor" stroke-opacity="0.4"/>
<rect x="225" y="20" width="92" height="95" fill="none" stroke="currentColor" stroke-opacity="0.4"/>
<circle cx="25" cy="100" r="3" style="fill:var(--info)"/>
<circle cx="35" cy="95" r="3" style="fill:var(--info)"/>
<circle cx="45" cy="85" r="3" style="fill:var(--info)"/>
<circle cx="55" cy="80" r="3" style="fill:var(--info)"/>
<circle cx="65" cy="68" r="3" style="fill:var(--info)"/>
<circle cx="75" cy="60" r="3" style="fill:var(--info)"/>
<circle cx="85" cy="50" r="3" style="fill:var(--info)"/>
<circle cx="95" cy="35" r="3" style="fill:var(--info)"/>
<circle cx="130" cy="35" r="3" style="fill:var(--bad)"/>
<circle cx="140" cy="45" r="3" style="fill:var(--bad)"/>
<circle cx="150" cy="52" r="3" style="fill:var(--bad)"/>
<circle cx="160" cy="65" r="3" style="fill:var(--bad)"/>
<circle cx="170" cy="72" r="3" style="fill:var(--bad)"/>
<circle cx="180" cy="85" r="3" style="fill:var(--bad)"/>
<circle cx="190" cy="92" r="3" style="fill:var(--bad)"/>
<circle cx="200" cy="100" r="3" style="fill:var(--bad)"/>
<polyline points="231,35 241,66 251,88 261,101 271,105 281,101 291,88 301,66 311,35" fill="none" style="stroke:var(--good)" stroke-dasharray="3 3"/>
<circle cx="231" cy="35" r="3" style="fill:var(--good)"/>
<circle cx="251" cy="88" r="3" style="fill:var(--good)"/>
<circle cx="271" cy="105" r="3" style="fill:var(--good)"/>
<circle cx="291" cy="88" r="3" style="fill:var(--good)"/>
<circle cx="311" cy="35" r="3" style="fill:var(--good)"/>
<text x="62" y="132" text-anchor="middle" font-size="11" fill="currentColor">Cov &gt; 0</text>
<text x="167" y="132" text-anchor="middle" font-size="11" fill="currentColor">Cov &lt; 0</text>
<text x="271" y="132" text-anchor="middle" font-size="11" fill="currentColor">Cov = 0, Y = X²</text>
<text x="317" y="146" text-anchor="end" font-size="9.5" fill="currentColor">dependent, but not linear</text>
</svg>
<figcaption>Upar jaata pattern: positive covariance. Neeche jaata: negative. Parabola: covariance 0, phir bhi Y poori tarah X pe depend karta hai.</figcaption>
</figure>

Teesra panel sabse important hai: $Y=X^2$ me $Y$ ko $X$ se exactly nikaal sakte ho (strong dependence), phir bhi covariance 0 hai. Covariance sirf **seedhi line wala** (linear) rishta naapta hai.

<figure class="fig">
<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
<rect x="160" y="20" width="130" height="70" style="fill:var(--good);opacity:0.15"/>
<rect x="30" y="90" width="130" height="70" style="fill:var(--good);opacity:0.15"/>
<rect x="30" y="20" width="130" height="70" style="fill:var(--bad);opacity:0.12"/>
<rect x="160" y="90" width="130" height="70" style="fill:var(--bad);opacity:0.12"/>
<line x1="30" y1="90" x2="290" y2="90" stroke="currentColor" stroke-dasharray="4 3"/>
<line x1="160" y1="20" x2="160" y2="160" stroke="currentColor" stroke-dasharray="4 3"/>
<text x="225" y="50" text-anchor="middle" font-size="11" fill="currentColor">(+)(+) = +</text>
<text x="95" y="130" text-anchor="middle" font-size="11" fill="currentColor">(−)(−) = +</text>
<text x="95" y="50" text-anchor="middle" font-size="11" fill="currentColor">(−)(+) = −</text>
<text x="225" y="130" text-anchor="middle" font-size="11" fill="currentColor">(+)(−) = −</text>
<text x="294" y="94" font-size="10" fill="currentColor">ȳ</text>
<text x="160" y="174" text-anchor="middle" font-size="10" fill="currentColor">x̄</text>
<text x="160" y="13" text-anchor="middle" font-size="10" fill="currentColor">sign of (x − x̄)(y − ȳ) in each quadrant</text>
</svg>
<figcaption>Covariance = (x − x̄)(y − ȳ) ka average. Zyada points green quadrants me → positive; red me → negative.</figcaption>
</figure>

Mean ke through do lines kheencho. Har point ka "deviation product" uske quadrant ke hisaab se plus ya minus hai. Covariance in sab ka average hai: agar plus wale hawi hain to Cov positive.

## Concept step-by-step

### 1. Mean aur use update karna

Mean $\bar x=\frac1n\sum x_i$, yaani **total / count**. Har update problem ka mantra: pehle **total** nikaalo, use theek karo, phir nayi count se divide karo.

- Naya point add: $\bar x_{new}=\frac{n\bar x+x_{new}}{n+1}$.
- Point hatao: $\frac{n\bar x-x_{old}}{n-1}$.
- Galat value theek karo (count same): $\frac{n\bar x-\text{galat}+\text{sahi}}{n}$.

**Example 1:** 8 values ka mean 15 → total 120. Value 24 add: $\frac{144}{9}=16$.

**Example 2:** 25 values ka mean 30 (total 750). Ek value 62 thi par 26 likhi gayi. Corrected total $=750-26+62=786$, mean $=\frac{786}{25}=31.44$.

**Dhyan do:** Purane mean aur naye point ka seedha average ($\frac{15+24}{2}$) galat hai — purana mean $n$ points ka weight leke baitha hai.

### 2. Median

Median = sorted data ka beech wala value.
1. Pehle **sort** karo.
2. $n$ odd: position $\frac{n+1}{2}$ wali value.
3. $n$ even: beech ke do values ka average (positions $\frac n2$ aur $\frac n2+1$).

**Example:** 7, 3, 9, 1, 12, 5 → sorted 1, 3, 5, 7, 9, 12 ($n=6$). Middle two: 5 aur 7, median $=6$.

**Dhyan do:** Bina sort kiye beech wala number uthana sabse common galti hai.

### 3. Mode

Mode = sabse zyada baar aane wali value. Ek se zyada ho sakte hain (bimodal), ya koi value repeat na ho to koi mode nahi.

**Example:** 2, 4, 4, 5, 7, 7, 7 → mode 7.

**Dhyan do:** Mode ek value hai, uski frequency (3) nahi.

### 4. Outliers aur shifting/scaling

- Mean outliers se hilta hai; median aur mode generally nahi (jab tak outlier beech ki position ya most-frequent value ko na chhuye).
- Har value me $c$ jodo: mean, median, mode sab $c$ se badhte hain; range aur variance same.
- Har value ko $k$ se guna karo: mean, median, mode $k$ guna; variance $k^2$ guna.
- Right-skewed data (lambi right tail, jaise income) me aam taur pe mean > median.

**Example:** 2, 3, 5, 6, 9 me 9 → 34: total 25 se 50, mean 5 → 10; median 5 hi; range 7 → 32.

**Dhyan do:** Sabse bada value badalne se range zaroor badalti hai (max − min).

### 5. Covariance

Covariance naapta hai ki $X$ aur $Y$ saath-saath kis direction me chalte hain:
$$\mathrm{Cov}(X,Y)=E\big[(X-\mu_X)(Y-\mu_Y)\big]=E[XY]-E[X]E[Y].$$
**Kyun doosra form:** expand karo: $E[XY-\mu_YX-\mu_XY+\mu_X\mu_Y]=E[XY]-\mu_X\mu_Y-\mu_X\mu_Y+\mu_X\mu_Y=E[XY]-\mu_X\mu_Y$.

Properties: $\mathrm{Cov}(X,X)=\mathrm{Var}(X)$; $\mathrm{Cov}(X,Y)=\mathrm{Cov}(Y,X)$; $\mathrm{Cov}(aX+b,\,cY+d)=ac\,\mathrm{Cov}(X,Y)$ (constants $b,d$ gayab).

**Example (table se):**

| | $Y=0$ | $Y=1$ |
|---|---|---|
| $X=0$ | 0.3 | 0.1 |
| $X=1$ | 0.2 | 0.4 |

1. $E[X]=P(X=1)=0.6$, $E[Y]=P(Y=1)=0.5$.
2. $E[XY]$: sirf $(1,1)$ cell me $XY=1$, to $E[XY]=0.4$.
3. $\mathrm{Cov}=0.4-0.6\times0.5=0.1$.

**Dhyan do:** $E[XY]$ ko cell-by-cell nikaalo ($\sum xy\,p(x,y)$); $E[X]E[Y]$ se mat badlo — wo tabhi barabar hai jab Cov 0 ho.

### 6. Correlation $\rho$

Covariance ki unit ($X$ unit × $Y$ unit) hoti hai, isliye "kitna strong" compare karna mushkil. SDs se divide karke unitless bana do:
$$\rho=\frac{\mathrm{Cov}(X,Y)}{\sigma_X\,\sigma_Y},\qquad -1\le\rho\le1.$$
$\rho=\pm1$ tabhi jab $Y=aX+b$ exactly (perfect line). Positive scaling se $\rho$ nahi badalta; ek variable ko negative se multiply karo to sign ulta.

**Example:** $\mathrm{Var}(X)=25$, $\mathrm{Var}(Y)=36$, $\mathrm{Cov}=-12$. $\sigma_X=5$, $\sigma_Y=6$, $\rho=\frac{-12}{30}=-0.4$.

Table wale example me: $\mathrm{Var}(X)=0.6-0.36=0.24$, $\mathrm{Var}(Y)=0.25$, $\rho=\frac{0.1}{\sqrt{0.24\times0.25}}\approx0.408$.

**Dhyan do:** **SDs** se divide karo, variances se nahi ($\frac{-12}{25\times36}$ galat).

### 7. $\mathrm{Var}(aX+bY)$

$$\mathrm{Var}(aX+bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)+2ab\,\mathrm{Cov}(X,Y).$$
**Kyun:** $\mathrm{Var}(W)=\mathrm{Cov}(W,W)$, aur $\mathrm{Cov}(aX+bY,\,aX+bY)$ ko $(a+b)^2$ ki tarah expand karo: $a^2\mathrm{Cov}(X,X)+b^2\mathrm{Cov}(Y,Y)+2ab\,\mathrm{Cov}(X,Y)$.

Special: $\mathrm{Var}(X-Y)=\mathrm{Var}X+\mathrm{Var}Y-2\mathrm{Cov}$. Independent ho to $\mathrm{Var}(X\pm Y)=\mathrm{Var}X+\mathrm{Var}Y$ — variances **add** hote hain, minus ke liye bhi.

**Example:** $\mathrm{Var}X=9$, $\mathrm{Var}Y=4$, $\mathrm{Cov}=3$.
- $\mathrm{Var}(X+Y)=9+4+6=19$.
- $\mathrm{Var}(X-Y)=9+4-6=7$.
- $\mathrm{Var}(3X-2Y)=81+16+2(3)(-2)(3)=97-36=61$.

**Dhyan do:** Cross-term ka sign $a$, $b$ aur Cov teeno ke sign se banta hai. $a=2,b=-3,\mathrm{Cov}=-2$: $2ab\,\mathrm{Cov}=2(2)(-3)(-2)=+24$.

### 8. Zero covariance vs independence

- Independent ⇒ $E[XY]=E[X]E[Y]$ ⇒ Cov $=0$. ✓
- Isliye Cov $\ne0$ ⇒ dependent (contrapositive). ✓
- Cov $=0$ ⇒ independent? **Nahi.**
- Dependent ⇒ Cov $\ne0$? **Nahi.**

**Counter-example:** $X$ uniform on $\{-2,-1,1,2\}$, $Y=X^2$. $E[X]=0$, $E[XY]=E[X^3]=\frac{-8-1+1+8}{4}=0$, to Cov $=0-0=0$. Lekin $Y$ poori tarah $X$ se tay hai — dependent. (Check: $P(X=1,Y=1)=\frac14$, par $P(X=1)P(Y=1)=\frac14\cdot\frac12=\frac18$.)

Exception: agar $(X,Y)$ **jointly normal** ho, tab Cov $=0$ ⇔ independent.

**Dhyan do:** $\rho=0$ ka matlab "koi **linear** rishta nahi", "koi rishta nahi" nahi.

## Solved examples

**Example 1 (NAT, easy):** The mean of 12 observations is 25. Two more observations, 30 and 44, are added. Find the new mean.

**Soch:** Mean update → total nikaalo.

**Solution:**
1. Old total $=12\times25=300$.
2. New total $=300+30+44=374$, count 14.
3. New mean $=\frac{374}{14}\approx26.714$.
Answer: **26.71**.

**Galti kahan hoti hai:** $\frac{25+30+44}{3}=33$ — purane mean ko ek point jaisa treat karna.

**Example 2 (MCQ, easy):** Data: 9, 4, 15, 4, 7, 12, 20. The median is
(A) 4  (B) 7  (C) 9  (D) 10.14

**Soch:** Median → sort first.

**Solution:**
1. Sorted: 4, 4, 7, 9, 12, 15, 20 ($n=7$).
2. Position $\frac{7+1}{2}=4$: value 9. Answer: **(C)**.

**Galti kahan hoti hai:** (A) — unsorted list ka 4th number (4) le lena (ye mode bhi hai, isliye aur confusing). (D) mean hai.

**Example 3 (NAT, medium):** The mean of 40 values is 50. Later it is found that a value 72 was recorded as 27, and one value 15 was a duplicate entry that must be removed. Find the corrected mean.

**Soch:** Do corrections → total pe dono apply karo, count bhi update.

**Solution:**
1. Total $=40\times50=2000$.
2. Fix 27 → 72: $2000+45=2045$.
3. Remove 15: $2045-15=2030$, count 39.
4. Mean $=\frac{2030}{39}\approx52.05$.
Answer: **52.05**.

**Galti kahan hoti hai:** Remove karne ke baad bhi 40 se divide karna ($2030/40=50.75$).

**Example 4 (NAT, medium):** $\mathrm{Var}(X)=16$, $\mathrm{Var}(Y)=25$, $\rho(X,Y)=-0.3$. Find $\mathrm{Var}(3X-2Y)$.

**Soch:** $\rho$ se pehle Cov, phir $\mathrm{Var}(aX+bY)$.

**Solution:**
1. $\mathrm{Cov}=\rho\sigma_X\sigma_Y=-0.3\times4\times5=-6$.
2. $a^2\mathrm{Var}X=9\times16=144$; $b^2\mathrm{Var}Y=4\times25=100$.
3. Cross $=2(3)(-2)(-6)=+72$.
4. Total $=144+100+72=316$.
Answer: **316**.

**Galti kahan hoti hai:** Cross-term ko $-72$ lena (sirf "$-2Y$ hai to minus" soch ke) → 172. Ya Cov $=\rho\times16\times25$ (variances use karna).

**Example 5 (MCQ, medium):** The joint PMF is

| | $Y=1$ | $Y=2$ |
|---|---|---|
| $X=0$ | 0.2 | 0.3 |
| $X=2$ | 0.4 | 0.1 |

$\mathrm{Cov}(X,Y)$ equals
(A) $0.2$  (B) $-0.2$  (C) $1.2$  (D) $0$

**Soch:** $E[XY]-E[X]E[Y]$, cell by cell.

**Solution:**
1. $P(X=2)=0.5$, $E[X]=1$.
2. $P(Y=1)=0.6$, $P(Y=2)=0.4$, $E[Y]=0.6+0.8=1.4$.
3. $E[XY]=2\cdot1\cdot0.4+2\cdot2\cdot0.1=0.8+0.4=1.2$ ($X=0$ wale cells 0 dete hain).
4. $\mathrm{Cov}=1.2-1\times1.4=-0.2$. Answer: **(B)**.

**Galti kahan hoti hai:** (C) — $E[XY]$ ko hi Cov maan lena. (A) — subtraction ulta karna.

**Example 6 (MSQ, hard):** $X\sim U(-1,1)$ and $Y=X^2$. Which statements are true?
(A) $\mathrm{Cov}(X,Y)=0$
(B) $X$ and $Y$ are independent
(C) Since $\rho=0$, $X$ and $Y$ have no relationship
(D) $\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)$

**Soch:** Symmetric $X$, $Y=X^2$ → classic "Cov 0 par dependent".

**Solution:**
1. $E[X]=0$, $E[XY]=E[X^3]=0$ (odd function, symmetric range). Cov $=0$. (A) true.
2. $Y$ is determined by $X$ → dependent. (B) false.
3. $\rho=0$ sirf linear rishta nahi batata; yahan exact quadratic rishta hai. (C) false.
4. $\mathrm{Var}(X+Y)=\mathrm{Var}X+\mathrm{Var}Y+2\cdot0$. (D) true. (Numbers: $\mathrm{Var}X=\frac13$, $\mathrm{Var}Y=\frac15-\frac19=\frac4{45}$.)
Answer: **(A), (D)**.

**Galti kahan hoti hai:** (D) ko reject karna kyunki "ye to independent nahi hain". Variance add karne ke liye independence nahi, sirf **Cov = 0** chahiye.

## Confusions clear karo

**Q:** Mean, median, mode me kaun sa use karu?
**A:** Symmetric data bina outliers → mean. Outliers ya skew (salary, house price) → median. Categories (sabse popular colour) → mode.

**Q:** Even $n$ me median data ki value na ho to?
**A:** Koi baat nahi. 1, 3, 5, 7, 9, 12 ka median 6 hai, jo list me nahi hai.

**Q:** Covariance 50 hai — strong relation hai?
**A:** Pata nahi; covariance unit pe depend karta hai. Correlation nikaalo: $\rho$ $\pm1$ ke paas → strong linear.

**Q:** $\mathrm{Var}(X-Y)$ me variances subtract kyun nahi hote?
**A:** $Y$ ka coefficient $-1$ hai, aur variance me $(-1)^2=1$. Spread kabhi cancel nahi hota; sirf covariance term ka sign badalta hai.

**Q:** Cov = 0 ho to $X,Y$ independent hain?
**A:** Zaroori nahi ($Y=X^2$ example). Sirf jointly normal me ye sach hai. Ulta, Cov $\ne0$ ho to pakka dependent.

**Q:** $\rho$ 1 se bada aa gaya — kya galti hui?
**A:** Shayad variances se divide kiya, SDs ki jagah nahi — ya kahin Cov galat hai. $\lvert\rho\rvert\le1$ hamesha.

## Khud try karo

**1.** The mean of 15 values is 40. The value 68 is removed. Find the new mean.

<details><summary>Answer dekho</summary>

Total $=600$. New total $=532$, count 14. Mean $=\frac{532}{14}=38$.

</details>

**2.** Data: 6, 1, 8, 3, 8, 2, 10, 8. Find mean, median and mode.

<details><summary>Answer dekho</summary>

Sorted: 1, 2, 3, 6, 8, 8, 8, 10. Mean $=\frac{46}{8}=5.75$. Median $=\frac{6+8}{2}=7$. Mode $=8$.

</details>

**3.** $E[X]=3$, $E[Y]=-1$, $E[XY]=1$, $\mathrm{Var}(X)=4$, $\mathrm{Var}(Y)=9$. Find Cov and $\rho$.

<details><summary>Answer dekho</summary>

$\mathrm{Cov}=1-(3)(-1)=4$. $\rho=\frac{4}{2\times3}\approx0.667$.

</details>

**4.** $\mathrm{Var}(X)=5$, $\mathrm{Var}(Y)=7$, $\mathrm{Cov}(X,Y)=2$. Find $\mathrm{Var}(X-Y)$ and $\mathrm{Var}(2X+Y)$.

<details><summary>Answer dekho</summary>

$\mathrm{Var}(X-Y)=5+7-4=8$. $\mathrm{Var}(2X+Y)=4(5)+7+2(2)(1)(2)=20+7+8=35$.

</details>

**5.** $\mathrm{Cov}(X,Y)=1.5$. Find $\mathrm{Cov}(2X+1,\,-3Y+4)$. What happens to $\rho$?

<details><summary>Answer dekho</summary>

$\mathrm{Cov}=2\times(-3)\times1.5=-9$ (constants 1, 4 gayab). $\rho$ ka magnitude same rehta hai, sign ulta ho jaata hai (ek scale negative hai).

</details>

## Ek page me

- Mean = total / count; update ke liye pehle total theek karo, phir nayi count se divide.
- Median: pehle sort; odd → beech wala, even → do beech walon ka average.
- Mode: sabse frequent value.
- Mean outliers se hilta hai; median, mode nahi. Range zaroor badalti hai.
- $\mathrm{Cov}=E[XY]-E[X]E[Y]$; $\mathrm{Cov}(X,X)=\mathrm{Var}X$; $\mathrm{Cov}(aX+b,cY+d)=ac\,\mathrm{Cov}$.
- $\rho=\frac{\mathrm{Cov}}{\sigma_X\sigma_Y}\in[-1,1]$ — SDs se divide.
- $\mathrm{Var}(aX+bY)=a^2\sigma_X^2+b^2\sigma_Y^2+2ab\,\mathrm{Cov}$; cross-term ka sign dhyan se.
- $\mathrm{Var}(X-Y)=\mathrm{Var}X+\mathrm{Var}Y-2\mathrm{Cov}$ (variances add hote hain).
- Independent ⇒ Cov 0; Cov $\ne0$ ⇒ dependent.
- Cov 0 ⇏ independent ($X$ symmetric, $Y=X^2$); jointly normal me ⇔.
- $\rho=0$ = no **linear** relation only.

Revision ke liye **Short note** tab dekho.
