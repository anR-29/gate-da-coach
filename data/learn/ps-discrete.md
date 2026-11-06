# Discrete random variables, PMFs and moments

> **Time:** ~30 min · **Pehle aana chahiye:** Basic probability (outcomes, $P$ ka sum 1), summation $\sum$ ka matlab · **Day:** 4

## Ye topic kyun?

Probability ke sawaal aksar ek **number** ke baare me hote hain: kitne heads, kitne defective, kitna profit. Us number ko **random variable** kehte hain, aur uski poori jaankari ek table (PMF) me hoti hai. GATE DA me is par seedhe NAT aate hain: "$k$ nikalo", "$E[X]$ ya $E[X^2]$ nikalo", "$\mathrm{Var}(3X-5)$ kitna?" — 1–2 mark, par galti $E[X^2]$ aur $(E[X])^2$ ke confusion me ya $a^2$ bhoolne me hoti hai. Aage binomial, Poisson aur ML ke loss functions sab inhi tools par chalte hain.

## Picture se samjho

Ek **PMF** (probability mass function) ko danda-chart (stick chart) ki tarah socho: har value $x$ par ek danda, jiski oonchai $P(X=x)$ hai. Saare dandon ki oonchaiyon ka sum 1.

<figure class="fig">
<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="170" x2="320" y2="170" stroke="currentColor"/>
<rect x="45" y="140" width="30" height="30" style="fill:var(--info);fill-opacity:0.6"/>
<rect x="115" y="80" width="30" height="90" style="fill:var(--info);fill-opacity:0.6"/>
<rect x="185" y="50" width="30" height="120" style="fill:var(--info);fill-opacity:0.6"/>
<rect x="255" y="110" width="30" height="60" style="fill:var(--info);fill-opacity:0.6"/>
<text x="60" y="134" text-anchor="middle" font-size="11" fill="currentColor">0.1</text>
<text x="130" y="74" text-anchor="middle" font-size="11" fill="currentColor">0.3</text>
<text x="200" y="44" text-anchor="middle" font-size="11" fill="currentColor">0.4</text>
<text x="270" y="104" text-anchor="middle" font-size="11" fill="currentColor">0.2</text>
<text x="60" y="186" text-anchor="middle" font-size="12" fill="currentColor">0</text>
<text x="130" y="186" text-anchor="middle" font-size="12" fill="currentColor">1</text>
<text x="200" y="186" text-anchor="middle" font-size="12" fill="currentColor">2</text>
<text x="270" y="186" text-anchor="middle" font-size="12" fill="currentColor">3</text>
<polygon points="179,172 170,192 188,192" style="fill:var(--mark)"/>
<text x="179" y="210" text-anchor="middle" font-size="12" fill="currentColor">E[X] = 1.7  (balance point)</text>
<text x="330" y="174" font-size="12" fill="currentColor">x</text>
</svg>
<figcaption>PMF: values 0,1,2,3 par probabilities 0.1, 0.3, 0.4, 0.2. Triangle wahan hai jahan ye "seesaw" balance hoga — wahi mean hai.</figcaption>
</figure>

Socho har danda ek vazan hai jiska weight uski probability hai. Ek seesaw par rakho to wo ek point par balance hoga — wo point $E[X]$ (mean) hai: $0(0.1)+1(0.3)+2(0.4)+3(0.2)=1.7$. Mean zaroori nahi ki koi possible value ho (1.7 kabhi aata hi nahi). **Variance** batata hai ki vazan balance point se kitna door phaila hua hai.

Ab doosri picture: agar har value me 4 jod do, ya har value ko 2 se guna kar do, to phailaav (spread) ka kya hota hai?

<figure class="fig">
<svg viewBox="0 0 380 190" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="40" x2="344" y2="40" stroke="currentColor"/>
<line x1="30" y1="95" x2="344" y2="95" stroke="currentColor"/>
<line x1="30" y1="150" x2="344" y2="150" stroke="currentColor"/>
<text x="352" y="44" font-size="12" fill="currentColor">X</text>
<text x="352" y="99" font-size="12" fill="currentColor">X+4</text>
<text x="352" y="154" font-size="12" fill="currentColor">2X</text>
<circle cx="40" cy="40" r="5" style="fill:var(--info)"/>
<circle cx="78" cy="40" r="5" style="fill:var(--info)"/>
<circle cx="116" cy="40" r="5" style="fill:var(--info)"/>
<circle cx="154" cy="40" r="5" style="fill:var(--info)"/>
<circle cx="192" cy="95" r="5" style="fill:var(--good)"/>
<circle cx="230" cy="95" r="5" style="fill:var(--good)"/>
<circle cx="268" cy="95" r="5" style="fill:var(--good)"/>
<circle cx="306" cy="95" r="5" style="fill:var(--good)"/>
<circle cx="40" cy="150" r="5" style="fill:var(--mark)"/>
<circle cx="116" cy="150" r="5" style="fill:var(--mark)"/>
<circle cx="192" cy="150" r="5" style="fill:var(--mark)"/>
<circle cx="268" cy="150" r="5" style="fill:var(--mark)"/>
<text x="40" y="60" text-anchor="middle" font-size="10" fill="currentColor">0</text>
<text x="154" y="60" text-anchor="middle" font-size="10" fill="currentColor">3</text>
<text x="192" y="115" text-anchor="middle" font-size="10" fill="currentColor">4</text>
<text x="306" y="115" text-anchor="middle" font-size="10" fill="currentColor">7</text>
<text x="40" y="170" text-anchor="middle" font-size="10" fill="currentColor">0</text>
<text x="268" y="170" text-anchor="middle" font-size="10" fill="currentColor">6</text>
<text x="97" y="24" text-anchor="middle" font-size="11" fill="currentColor">range 3</text>
<text x="249" y="79" text-anchor="middle" font-size="11" fill="currentColor">range 3 (sirf khiska)</text>
<text x="154" y="134" text-anchor="middle" font-size="11" fill="currentColor">range 6 (do guna phaila)</text>
</svg>
<figcaption>+4 karne se poora set sirf khiskta hai, phailaav same. ×2 karne se har doori do guni ho jaati hai.</figcaption>
</figure>

Dhyan do: shift (+b) se spread nahi badalta, isliye variance par $b$ ka koi asar nahi. Scale (×a) se har doori $|a|$ guna hoti hai, to SD $|a|$ guna aur variance (jo doori ka square hai) $a^2$ guna.

## Concept step-by-step

### 1. Random variable kya hai?

**Random variable** $X$ ek rule hai jo har outcome ko ek number deta hai. "Random" isliye ki outcome random hai, to number bhi random hai.

Example: 2 fair coins, $X$ = heads ki ginti. Outcomes TT, TH, HT, HH → $X$ = 0, 1, 1, 2. Isliye
$P(X=0)=1/4$, $P(X=1)=2/4=1/2$, $P(X=2)=1/4$.

**Discrete** matlab $X$ gin sakne layak values leta hai (0, 1, 2, …), beech ki values nahi.

Dhyan do: $X$ (capital) random variable hai; $x$ (small) uski koi ek specific value.

### 2. PMF aur normalisation

**PMF** $p(x)=P(X=x)$. Do shartein:
1. $p(x)\ge0$ har $x$ ke liye.
2. $\sum p(x)=1$, **poore support** par (support = saari values jo $X$ le sakta hai).

Aksar PMF $p(x)=k\cdot w(x)$ form me diya jaata hai, $k$ unknown. Tab $k\sum w(x)=1$, to

$$k=\frac{1}{\sum_{\text{support}} w(x)}.$$

Example: $p(x)=k(x+2)$ for $x=0,1,2$. Weights $2,3,4$, sum 9, to $k=1/9$. PMF: $2/9,\ 3/9,\ 4/9$.

Dhyan do: support me $x=0$ diya hai to use mat chhodo. Yahan $x=0$ chhod kar $3+4=7$ lete to $k=1/7$ aa jaata — galat. (Kabhi $x=0$ par weight 0 hota hai, jaise $p(x)=kx$; tab chhodne se fark nahi padta.)

### 3. Expectation (mean)

$$E[X]=\sum_x x\,p(x).$$

Ye **weighted average** hai: har value ko uski probability se weight karo. Long run me bahut baar experiment karo to $X$ ka average isi ke paas aata hai.

Example (picture wala): $E[X]=0(0.1)+1(0.3)+2(0.4)+3(0.2)=0+0.3+0.8+0.6=1.7$.

General rule — kisi function $g$ ka expectation:

$$E[g(X)]=\sum_x g(x)\,p(x).$$

Matlab values ko pehle $g$ se badlo, **probabilities wahi rehti hain**.

Dhyan do: $E[X]$ ke liye probabilities ko average nahi karte; values ko probabilities se guna karke jodte hain.

### 4. $E[X^2]$: pehle square, phir weight

$g(x)=x^2$ lo:

$$E[X^2]=\sum_x x^2\,p(x).$$

Example: $X$ values $-2, 1, 3$ with probabilities $0.2, 0.5, 0.3$.
- $E[X]=-2(0.2)+1(0.5)+3(0.3)=-0.4+0.5+0.9=1.0$.
- $E[X^2]=4(0.2)+1(0.5)+9(0.3)=0.8+0.5+2.7=4.0$.

Dekho: $(E[X])^2=1$, par $E[X^2]=4$. Dono bilkul alag.

Dhyan do: $(-2)^2=+4$. Negative value ka square positive hota hai; $-4\times0.2$ likhna common galti hai.

### 5. Variance aur uska shortcut

**Variance** = mean se doori ka square, average karke:

$$\mathrm{Var}(X)=E\big[(X-\mu)^2\big],\qquad \mu=E[X].$$

Square isliye ki left aur right ki dooriyan cancel na hon. **SD** (standard deviation) $=\sqrt{\mathrm{Var}}$, wapas original units me.

**Shortcut kyun?** $(X-\mu)^2=X^2-2\mu X+\mu^2$. Expectation lo (step 6 ki linearity se):
$E[X^2]-2\mu E[X]+\mu^2=E[X^2]-2\mu^2+\mu^2$. To

$$\mathrm{Var}(X)=E[X^2]-(E[X])^2.$$

Example (picture wala): $E[X^2]=0+1(0.3)+4(0.4)+9(0.2)=0.3+1.6+1.8=3.7$. $\mathrm{Var}=3.7-1.7^2=3.7-2.89=0.81$, SD $=0.9$.
Definition se check: $(0-1.7)^2(0.1)+(1-1.7)^2(0.3)+(2-1.7)^2(0.4)+(3-1.7)^2(0.2)=0.289+0.147+0.036+0.338=0.81$. ✓

Variance ek squares ka average hai, isliye kabhi negative nahi: $\mathrm{Var}\ge0$, yani **$E[X^2]\ge(E[X])^2$ hamesha**. Barabar tab hi jab $X$ constant ho.

Dhyan do: agar aapka variance negative aaye, to kahin galti hai (aksar $E[X^2]$ me sign).

### 6. Linearity: $E[aX+b]$

$$E[aX+b]=\sum(ax+b)p(x)=a\sum x\,p(x)+b\sum p(x)=aE[X]+b.$$

(Last step: $\sum p(x)=1$.)

Example: $E[X]=1.7$ to $E[10X-3]=17-3=14$. $Y=a-bX$ ho to $E[Y]=a-bE[X]$.

Dhyan do: ye sirf **linear** functions ($aX+b$) ke liye hai. $E[X^2]$ ke liye $(E[X])^2$ nahi likh sakte.

### 7. $\mathrm{Var}(aX+b)$ aur SD

$Y=aX+b$ ho to $E[Y]=a\mu+b$, aur $Y-E[Y]=a(X-\mu)$ — $b$ cancel ho gaya! Ab square karo:

$$\mathrm{Var}(aX+b)=E\big[a^2(X-\mu)^2\big]=a^2\,\mathrm{Var}(X),\qquad \mathrm{SD}(aX+b)=|a|\,\mathrm{SD}(X).$$

- $b$ (shift) gayab — picture wali baat.
- $a$ square hota hai, to minus sign bhi gayab: $a=-4$ par factor $+16$.
- SD me $|a|$, kyunki SD kabhi negative nahi.

Example: $\mathrm{Var}(X)=2.5$. $\mathrm{Var}(-4X+1)=16\times2.5=40$. Agar SD$(X)=3$ to SD$(7-2X)=2\times3=6$.

Agar $E[X]$ aur $E[X^2]$ diye hain to **pehle** $\mathrm{Var}(X)=E[X^2]-(E[X])^2$ nikaalo, phir $a^2$ lagao.

Dhyan do: $\mathrm{Var}(3X)=9\,\mathrm{Var}(X)$, $3\,\mathrm{Var}(X)$ nahi. Aur $E[X^2]$ ko seedha variance maan kar $a^2$ se guna mat karo.

### 8. $E[g(X)]\ne g(E[X])$

Non-linear function ke saath expectation andar-bahar nahi hota.

Example: $X=1$ ya $4$, dono $1/2$ chance. $E[X]=2.5$.
- $E[1/X]=\frac12\cdot1+\frac12\cdot\frac14=0.625$.
- $1/E[X]=1/2.5=0.4$.
Alag hain. Isi tarah $E[X^2]\ne(E[X])^2$ (variance hi ye farak hai).

Dhyan do: $E[g(X)]$ ke liye hamesha values par $g$ lagao, phir weight karo.

### 9. Exam me table method

Exam me sab kuch ek table me karo, galti kam hogi. Columns: $x$, $p(x)$, $x\,p(x)$, $x^2p(x)$. Last do columns ka sum = $E[X]$ aur $E[X^2]$.

Example: $X$ values $-1, 0, 2, 4$ with probabilities $0.1, 0.4, 0.3, 0.2$.

| $x$ | $p(x)$ | $x\,p(x)$ | $x^2p(x)$ |
|---|---|---|---|
| −1 | 0.1 | −0.1 | 0.1 |
| 0 | 0.4 | 0 | 0 |
| 2 | 0.3 | 0.6 | 1.2 |
| 4 | 0.2 | 0.8 | 3.2 |
| **Sum** | **1.0** | **1.3** | **4.5** |

1. $p(x)$ column ka sum 1 hai — PMF valid. ✓
2. $E[X]=1.3$, $E[X^2]=4.5$.
3. $\mathrm{Var}(X)=4.5-1.3^2=4.5-1.69=2.81$.
4. Ab koi bhi linear sawaal: $E[2X+1]=3.6$, $\mathrm{Var}(2X+1)=4\times2.81=11.24$.

Table ke teen fayde: (a) $p$ column ka sum check ho jaata hai, (b) $x^2p$ column me har entry positive honi chahiye — negative dikhe to square me galti hai, (c) $E[X]$ aur $E[X^2]$ dono ek saath milte hain.

Dhyan do: $x^2p(x)$ column me $x=-1$ ki entry $+0.1$ hai, $-0.1$ nahi. Ye column kabhi negative nahi hota.

## Solved examples

**Example 1 (NAT, easy):** $P(X=x)=kx^2$ for $x=1,2,3$. $E[X]$ nikalo (2 decimal).

**Soch:** "$k$ wala PMF" → pehle normalise, phir weighted sum.

**Solution:**
1. $\sum x^2=1+4+9=14$, to $k=1/14$.
2. PMF: $1/14,\ 4/14,\ 9/14$.
3. $E[X]=\frac{1\cdot1+2\cdot4+3\cdot9}{14}=\frac{1+8+27}{14}=\frac{36}{14}\approx2.57$. **Answer: 2.57.**

**Galti kahan hoti hai:** $k$ nikale bina values ka simple average $(1+2+3)/3=2$ le lena — PMF uniform nahi hai.

**Example 2 (MCQ, easy):** $X$ ki values $-2, 0, 1$ hain, probabilities $0.25, 0.25, 0.5$. $E[X^2]$ = ?
(A) 0 (B) 1.5 (C) −0.5 (D) 1.0

**Soch:** $E[X^2]$ → har value ko square karo, phir weight.

**Solution:**
1. Squares: $4, 0, 1$.
2. $E[X^2]=4(0.25)+0(0.25)+1(0.5)=1+0+0.5=1.5$. **Answer (B).**

**Galti kahan hoti hai:** (A) 0 $=(E[X])^2$, kyunki $E[X]=-0.5+0+0.5=0$. (C) −0.5: $(-2)^2$ ki jagah $-4$ le liya. (D) 1.0: square ki jagah $|x|$ use kiya.

**Example 3 (NAT, medium):** $P(X=x)=c(4-x)$ for $x=0,1,2,3$. $\mathrm{Var}(X)$ nikalo.

**Soch:** Normalise (support me $x=0$ hai!), phir $E[X]$, $E[X^2]$, shortcut.

**Solution:**
1. Weights: $4,3,2,1$, sum 10, to $c=0.1$. PMF: $0.4,0.3,0.2,0.1$.
2. $E[X]=0(0.4)+1(0.3)+2(0.2)+3(0.1)=0.3+0.4+0.3=1.0$.
3. $E[X^2]=0+1(0.3)+4(0.2)+9(0.1)=0.3+0.8+0.9=2.0$.
4. $\mathrm{Var}=2.0-1.0^2=1.0$. **Answer: 1.**

**Galti kahan hoti hai:** $x=0$ chhod dena: weights $3+2+1=6$, $c=1/6$, aur saare numbers badal jaate hain.

**Example 4 (MCQ, medium):** $E[X]=3$, $E[X^2]=13$. $Y=2-4X$ ke liye $(E[Y],\mathrm{Var}(Y))$ = ?
(A) $(-10, 64)$ (B) $(-10, 208)$ (C) $(-10, -64)$ (D) $(14, 64)$

**Soch:** Linear transform. $E$ ke liye linearity; Var ke liye pehle $\mathrm{Var}(X)$, phir $a^2$.

**Solution:**
1. $E[Y]=2-4(3)=-10$.
2. $\mathrm{Var}(X)=13-3^2=4$.
3. $\mathrm{Var}(Y)=(-4)^2\times4=64$. **Answer (A).**

**Galti kahan hoti hai:** (B) $16\times13=208$: $E[X^2]$ ko variance maan liya. (C) $a$ ka sign rakh kar $-4\times16$. (D) $2+4\cdot3$: minus sign bhool gaye.

**Example 5 (MSQ, medium):** $X$ ki values 2 aur 4, dono probability $1/2$. Kaun se sahi hain?
(A) $\mathrm{Var}(X)=1$
(B) $E[X^2]=9$
(C) $E[1/X]=1/3$
(D) $\mathrm{SD}(3-2X)=2$

**Soch:** Har option ko seedha calculate karo; (C) me $E[g(X)]\ne g(E[X])$ wala jaal.

**Solution:**
1. $E[X]=3$, $E[X^2]=\frac{4+16}{2}=10$, $\mathrm{Var}=10-9=1$. (A) sahi, (B) galat ($9=(E[X])^2$).
2. $E[1/X]=\frac12\left(\frac12+\frac14\right)=\frac38=0.375\ne\frac13$. (C) galat.
3. SD$(X)=1$, SD$(3-2X)=|-2|\times1=2$. (D) sahi.
**Answer: (A), (D).**

**Galti kahan hoti hai:** (C) tick karna: $1/E[X]=1/3$ ko $E[1/X]$ samajhna. (B) me mean ka square le lena.

**Example 6 (NAT, hard):** Ek dukaan rozana $X$ units bechti hai: $P(X=3)=0.2$, $P(X=4)=0.3$, $P(X=5)=0.4$, $P(X=6)=0.1$. Roz ka profit $Y=50X-200$ (rupees). $Y$ ka standard deviation (2 decimal)?

**Soch:** Pehle $\mathrm{Var}(X)$, phir SD$(aX+b)=|a|$SD$(X)$; $-200$ ka asar nahi.

**Solution:**
1. $E[X]=3(0.2)+4(0.3)+5(0.4)+6(0.1)=0.6+1.2+2.0+0.6=4.4$.
2. $E[X^2]=9(0.2)+16(0.3)+25(0.4)+36(0.1)=1.8+4.8+10+3.6=20.2$.
3. $\mathrm{Var}(X)=20.2-4.4^2=20.2-19.36=0.84$.
4. SD$(X)=\sqrt{0.84}\approx0.9165$.
5. SD$(Y)=50\times0.9165\approx45.83$. **Answer: ≈ 45.83.** (Variance $=2500\times0.84=2100$.)

**Galti kahan hoti hai:** SD par 50 ki jagah $50^2$ lagana ($2500\times0.9165$), ya variance (2100) ko hi answer likh dena.

## Confusions clear karo

**Q:** $E[X^2]$ aur $(E[X])^2$ me farak kya hai?
**A:** $E[X^2]$: pehle har value square, phir weighted average. $(E[X])^2$: pehle average, phir square. Inka farak hi variance hai, aur $E[X^2]$ hamesha bada ya barabar hota hai.

**Q:** Variance me $b$ kyun gayab ho jaata hai?
**A:** $+b$ poore distribution ko khiskata hai, mean bhi utna hi khisakta hai. Mean se dooriyan same rehti hain, to variance same.

**Q:** $\mathrm{Var}(-2X)$ me minus kahan gaya?
**A:** Variance me $a^2$ aata hai, $(-2)^2=4$. Ulta karne (reflect) se spread nahi badalta. SD me $|a|=2$.

**Q:** Mean ek possible value kyun nahi hota?
**A:** Mean balance point hai, koi outcome nahi. Die ka mean 3.5 hai, jo kabhi aata hi nahi.

**Q:** $k$ nikalte waqt support kaise decide karun?
**A:** Sawaal me jo values likhi hain ("for $x=0,1,2,3$"), sab lo. Unme se kisi ko chhodna mat, chahe wo 0 ho.

**Q:** Kya $E[X+Y]=E[X]+E[Y]$ aur $\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)$ hamesha?
**A:** Expectation wala hamesha sahi hai (linearity). Variance wala sirf tab jab $X$ aur $Y$ independent hon. Isi se binomial ka variance $npq$ aata hai (agle lesson me).

**Q:** PMF me koi probability negative ya 1 se badi aaye to?
**A:** To wo PMF hi nahi hai. $k$ nikalne ke baad har $p(x)$ check karo: $0\le p(x)\le1$. Galat $k$ ka sabse tez signal yahi hai.

**Q:** SD aur variance me se kaunsa poochha hai, kaise pakka karun?
**A:** Variance = squared units (rupees²), SD = original units. Sawaal ka shabd padho; SD ke liye last me square root lo aur $|a|$ lagao.

## Khud try karo

**1.** $P(X=x)=k(x+1)$ for $x=0,1,2,3,4$. $k$ aur $E[X]$ nikalo.

<details><summary>Answer dekho</summary>

Weights $1,2,3,4,5$, sum 15, $k=1/15$.
$E[X]=\frac{0\cdot1+1\cdot2+2\cdot3+3\cdot4+4\cdot5}{15}=\frac{0+2+6+12+20}{15}=\frac{40}{15}\approx2.667$.

</details>

**2.** $\mathrm{Var}(X)=9$. $\mathrm{Var}(-2X+10)$ aur $\mathrm{SD}(-2X+10)$?

<details><summary>Answer dekho</summary>

$\mathrm{Var}=(-2)^2\times9=36$. SD $=|-2|\times3=6$. (10 ka koi asar nahi.)

</details>

**3.** $X=-1$ ya $+1$, dono probability $1/2$. $E[X]$, $E[X^2]$, $\mathrm{Var}(X)$?

<details><summary>Answer dekho</summary>

$E[X]=-0.5+0.5=0$. $E[X^2]=1(0.5)+1(0.5)=1$. $\mathrm{Var}=1-0=1$.

</details>

**4.** Ek shehar ka temperature $C$ (°C) ka mean 25 aur SD 4 hai. $F=1.8C+32$ ka mean, SD aur variance?

<details><summary>Answer dekho</summary>

Mean $=1.8(25)+32=77$. SD $=1.8\times4=7.2$. Variance $=7.2^2=51.84$ (ya $1.8^2\times16=3.24\times16=51.84$).

</details>

**5.** $E[X]=2$, $\mathrm{Var}(X)=3$. $E[X^2]$ aur $E[(X+1)^2]$ nikalo.

<details><summary>Answer dekho</summary>

$E[X^2]=\mathrm{Var}+(E[X])^2=3+4=7$.
$E[(X+1)^2]=E[X^2+2X+1]=7+2(2)+1=12$.

</details>

## Ek page me

- Random variable = har outcome ko ek number; PMF $p(x)=P(X=x)$.
- $p(x)\ge0$, $\sum p(x)=1$ **poore support** par; $k=1/\sum w(x)$.
- $E[X]=\sum x\,p(x)$ = balance point.
- $E[g(X)]=\sum g(x)\,p(x)$: values badlo, probabilities wahi.
- $E[X^2]=\sum x^2p(x)$ — pehle square (negative bhi positive), phir weight.
- $\mathrm{Var}(X)=E[X^2]-(E[X])^2\ge0$, isliye $E[X^2]\ge(E[X])^2$.
- $E[aX+b]=aE[X]+b$.
- $\mathrm{Var}(aX+b)=a^2\mathrm{Var}(X)$: $b$ gayab, sign gayab.
- $\mathrm{SD}(aX+b)=|a|\,\mathrm{SD}(X)$ — SD kabhi negative nahi.
- $E[X]$, $E[X^2]$ diye hon to pehle Var nikaalo, phir $a^2$.
- $E[1/X]\ne1/E[X]$; non-linear $g$ ke liye $E[g(X)]\ne g(E[X])$.

Revision ke liye **Short note** tab dekho.
