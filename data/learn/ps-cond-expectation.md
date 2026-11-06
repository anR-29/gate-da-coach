# Conditional expectation, variance and total variance

> **Time:** ~30 min · **Pehle aana chahiye:** conditional PMF $p(x\mid y)$, $E[X]$ aur $\mathrm{Var}(X)=E[X^2]-(E[X])^2$, binomial/Poisson ka mean-variance · **Day:** 10

## Ye topic kyun?

Bahut saare problems do stage me hote hain: pehle koi group/machine/route randomly chuna jaata hai, phir usi ke hisaab se result aata hai. Poore population ka mean ya variance nikaalna ho to "group by group" sochna sabse aasaan hai — yahi law of total expectation aur law of total variance hai. GATE DA me yahan se NAT (overall mean, mixture variance), MCQ (formula ka matlab) aur MSQ (within/between ke properties) aate hain. Ye idea aage ANOVA aur ML (bias–variance, clustering) me bhi dikhta hai.

## Picture se samjho

Ek factory me teen machines hain. Har item kisi ek machine se aata hai. Har machine ka apna average weight hai. Poore factory ka average weight? Har machine ka average lo, aur use us machine ke **hisse (probability)** se weight karo.

<figure class="fig">
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="40" cy="95" r="6" fill="currentColor"/>
<line x1="40" y1="95" x2="150" y2="35" stroke="currentColor"/>
<line x1="40" y1="95" x2="150" y2="95" stroke="currentColor"/>
<line x1="40" y1="95" x2="150" y2="155" stroke="currentColor"/>
<text x="88" y="56" font-size="11" style="fill:var(--info)">0.3</text>
<text x="88" y="90" font-size="11" style="fill:var(--info)">0.5</text>
<text x="88" y="140" font-size="11" style="fill:var(--info)">0.2</text>
<rect x="150" y="22" width="150" height="26" rx="4" fill="none" stroke="currentColor"/>
<rect x="150" y="82" width="150" height="26" rx="4" fill="none" stroke="currentColor"/>
<rect x="150" y="142" width="150" height="26" rx="4" fill="none" stroke="currentColor"/>
<text x="225" y="39" text-anchor="middle" font-size="11" fill="currentColor">A : E[X | A] = 10</text>
<text x="225" y="99" text-anchor="middle" font-size="11" fill="currentColor">B : E[X | B] = 20</text>
<text x="225" y="159" text-anchor="middle" font-size="11" fill="currentColor">C : E[X | C] = 40</text>
<text x="160" y="192" text-anchor="middle" font-size="11" style="fill:var(--mark)">E[X] = 0.3·10 + 0.5·20 + 0.2·40 = 21</text>
</svg>
<figcaption>Law of total expectation: har branch ka conditional mean × us branch ki probability, phir add.</figcaption>
</figure>

Dhyan do: simple average $\frac{10+20+40}{3}\approx23.3$ galat hai, kyunki machine B zyada items banati hai. Weights (probabilities) hi decide karte hain ki kaun sa group zyada "count" hoga.

Ab spread (variance). Do groups socho, dono barabar size ke. Har group ke andar bhi values bikhri hain (**within**), aur dono groups ke centres bhi ek doosre se door hain (**between**). Poora spread = dono ka jod.

<figure class="fig">
<svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg">
<line x1="20" y1="110" x2="300" y2="110" stroke="currentColor"/>
<circle cx="80" cy="100" r="4" style="fill:var(--info)"/>
<circle cx="92" cy="100" r="4" style="fill:var(--info)"/>
<circle cx="100" cy="100" r="4" style="fill:var(--info)"/>
<circle cx="108" cy="100" r="4" style="fill:var(--info)"/>
<circle cx="120" cy="100" r="4" style="fill:var(--info)"/>
<circle cx="200" cy="100" r="4" style="fill:var(--good)"/>
<circle cx="212" cy="100" r="4" style="fill:var(--good)"/>
<circle cx="220" cy="100" r="4" style="fill:var(--good)"/>
<circle cx="228" cy="100" r="4" style="fill:var(--good)"/>
<circle cx="240" cy="100" r="4" style="fill:var(--good)"/>
<line x1="160" y1="40" x2="160" y2="120" stroke="currentColor" stroke-dasharray="4 3"/>
<text x="160" y="34" text-anchor="middle" font-size="11" fill="currentColor">overall mean 7</text>
<line x1="156" y1="62" x2="104" y2="62" style="stroke:var(--mark)" stroke-width="1.5"/>
<polygon points="104,58 104,66 96,62" style="fill:var(--mark)"/>
<line x1="164" y1="62" x2="216" y2="62" style="stroke:var(--mark)" stroke-width="1.5"/>
<polygon points="216,58 216,66 224,62" style="fill:var(--mark)"/>
<text x="160" y="80" text-anchor="middle" font-size="10" style="fill:var(--mark)">between: means 4 and 10 are 3 away</text>
<text x="100" y="128" text-anchor="middle" font-size="11" fill="currentColor">4</text>
<text x="220" y="128" text-anchor="middle" font-size="11" fill="currentColor">10</text>
<text x="100" y="146" text-anchor="middle" font-size="10" style="fill:var(--info)">within: var 1</text>
<text x="220" y="146" text-anchor="middle" font-size="10" style="fill:var(--good)">within: var 1</text>
<text x="160" y="164" text-anchor="middle" font-size="11" fill="currentColor">Var(X) = 1 (within) + 9 (between) = 10</text>
</svg>
<figcaption>Total variance = groups ke andar ka spread (within) + group means ka overall mean se spread (between).</figcaption>
</figure>

Agar sirf within dekho (1) to tum ye bhool gaye ki groups 4 aur 10 pe alag-alag baithe hain. Agar sirf between dekho (9) to groups ke andar ka bikhraav chhoot gaya. Sahi answer dono ka sum, 10.

## Concept step-by-step

### 1. $E[X\mid Y=y]$ number hai, $E[X\mid Y]$ random variable hai

$E[X\mid Y=y]=\sum_x x\,p(x\mid y)$ — "jab $Y=y$ pata ho tab $X$ ka average". Ye ek **number** hai.

$E[X\mid Y]$ me $Y$ ki value abhi fix nahi hai. Ye $Y$ ka ek **function** hai, isliye khud ek random variable hai: jab $Y=y$ aaye, tab iski value $E[X\mid Y=y]$.

**Example:** $P(Y=0)=0.4$, $P(Y=1)=0.6$; $E[X\mid Y=0]=2$, $E[X\mid Y=1]=5$. To $E[X\mid Y]$ ek random variable hai jo 0.4 probability se 2 aur 0.6 probability se 5 leta hai.

**Dhyan do:** Agar question bole "$E[X\mid Y]=2Y+1$, find $E[X]$", to answer "$2Y+1$" nahi ho sakta — $E[X]$ ek number hai.

### 2. Law of total expectation

$$E[X]=E\big[E[X\mid Y]\big]=\sum_y E[X\mid Y=y]\,P(Y=y).$$

**Kyun:** $\sum_y\Big(\sum_x x\,p(x\mid y)\Big)p_Y(y)=\sum_y\sum_x x\,p(x,y)=E[X]$, kyunki $p(x\mid y)p_Y(y)=p(x,y)$.

**Example (discrete):** Upar wale case me $E[X]=0.4\times2+0.6\times5=0.8+3=3.8$.

**Example (joint table se, aur check):**

| | $Y=0$ | $Y=1$ |
|---|---|---|
| $X=1$ | 0.30 | 0.10 |
| $X=4$ | 0.10 | 0.50 |

1. $p_Y(0)=0.40$, $p_Y(1)=0.60$.
2. $E[X\mid Y=0]=\frac{1(0.30)+4(0.10)}{0.40}=\frac{0.70}{0.40}=1.75$.
3. $E[X\mid Y=1]=\frac{1(0.10)+4(0.50)}{0.60}=\frac{2.10}{0.60}=3.5$.
4. Total expectation: $0.40(1.75)+0.60(3.5)=0.7+2.1=2.8$.
5. Direct check: $P(X=1)=0.4$, $P(X=4)=0.6$, $E[X]=0.4+2.4=2.8$ ✓.

Dekho, step 4 me $0.40\times1.75=0.70$ wahi column ka "$\sum x\,p(x,y)$" hai — divide karke wapas multiply kiya, isliye law hamesha kaam karta hai.

**Example (continuous $Y$):** $Y\sim U(0,2)$ aur $E[X\mid Y]=3Y+2$. To $E[X]=E[3Y+2]=3E[Y]+2=3(1)+2=5$.

**Dhyan do:** Group means ka seedha (unweighted) average mat lo, aur weights ko galat group se match mat karo. Har mean ke saath **usi group** ki probability.

### 3. Two-stage experiments aur random sums

Pattern: "pehle $N$ random aata hai, phir $N$ ke hisaab se kuch karte hain". Trick: andar wala expectation $N$ ke terms me likho, phir bahar wala.

**Random sum:** $S=X_1+\cdots+X_N$, jahan $X_i$ iid mean $\mu$, aur $N$ unse independent.
1. $E[S\mid N=n]=n\mu$, to $E[S\mid N]=N\mu$.
2. $E[S]=E[N\mu]=\mu E[N]$.
$$E\Big[\sum_{i=1}^N X_i\Big]=E[N]\,\mu.$$

**Example:** $N$ uniform on $\{1,2,3,4\}$; phir $N$ fair dice roll karo. Expected total? Ek die ka mean 3.5, $E[N]=2.5$. Answer $2.5\times3.5=8.75$.

**Dhyan do:** Inner expectation bhoolna common hai. "Die dikhaye $k$, phir $k$ coins toss" → heads ka expectation $E[k/2]$ hai, $E[k]$ nahi.

### 4. Conditional variance

$Y=y$ diya ho to $X$ ka variance:
$$\mathrm{Var}(X\mid Y=y)=E[X^2\mid Y=y]-\big(E[X\mid Y=y]\big)^2.$$
Ye bhi $y$ pe depend karta hai, isliye $\mathrm{Var}(X\mid Y)$ ek random variable hai.

**Example:** Given $Y=1$, $X$ ki values 4 aur 6, prob $\frac12$ each. $E[X\mid Y=1]=5$, $E[X^2\mid Y=1]=\frac{16+36}{2}=26$, $\mathrm{Var}(X\mid Y=1)=26-25=1$.

**Dhyan do:** Ye normal variance formula hi hai — bas har cheez "given $Y=y$" duniya me.

### 5. Law of total variance

$$\mathrm{Var}(X)=\underbrace{E\big[\mathrm{Var}(X\mid Y)\big]}_{\text{within: andar ka average spread}}+\underbrace{\mathrm{Var}\big(E[X\mid Y]\big)}_{\text{between: group means ka spread}}.$$

**Kyun (derivation):**
1. $E[X^2\mid Y]=\mathrm{Var}(X\mid Y)+(E[X\mid Y])^2$.
2. Dono taraf expectation: $E[X^2]=E[\mathrm{Var}(X\mid Y)]+E\big[(E[X\mid Y])^2\big]$.
3. Minus $(E[X])^2=\big(E[E[X\mid Y]]\big)^2$:
$\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]+\Big(E\big[(E[X\mid Y])^2\big]-\big(E[E[X\mid Y]]\big)^2\Big)$, aur bracket wala part $\mathrm{Var}(E[X\mid Y])$ hai.

**Example (picture wala):** Do groups, prob 0.5 each, means 4 aur 10, variance 1 each.
1. Within $=0.5(1)+0.5(1)=1$.
2. Overall mean $=7$. Between $=0.5(4-7)^2+0.5(10-7)^2=9$.
3. Total $=10$. Direct check: $E[X^2]=0.5(1+16)+0.5(1+100)=59$, $59-49=10$ ✓.

**Dhyan do:** Group variances add karna ($1+1=2$) mixture variance nahi hai. Average karo (weights se) aur between jodo.

### 6. Mixture formula (sabse common GATE form)

Groups $i$ with weights $w_i$ (sum 1), means $m_i$, variances $v_i$:

| Part | Formula |
|---|---|
| overall mean | $\bar m=\sum w_im_i$ |
| within | $\sum w_iv_i$ |
| between | $\sum w_i(m_i-\bar m)^2$ |
| total variance | within + between |

**Example:** $w=(0.3,0.7)$, $m=(2,12)$, $v=(4,9)$.
1. $\bar m=0.6+8.4=9$.
2. Within $=0.3(4)+0.7(9)=1.2+6.3=7.5$.
3. Between $=0.3(2-9)^2+0.7(12-9)^2=14.7+6.3=21$.
4. Total $=28.5$.

**Dhyan do:** Normal mixture me "$N(5,4)$" ka variance 4 hai (second parameter variance hai). Aur between me har group ka distance **overall mean** se lo, doosre group se nahi.

### 7. Special cases (MSQ favourites)

- Dono parts $\ge0$, isliye $\mathrm{Var}(X)\ge E[\mathrm{Var}(X\mid Y)]$ aur $\mathrm{Var}(X)\ge\mathrm{Var}(E[X\mid Y])$.
- $E[X\mid Y]$ constant ho (har group ka mean same) → between $=0$ → $\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]$.
- $X$ khud $Y$ ka function ho ($X=g(Y)$) → $Y$ pata hote hi $X$ fix → within $=0$ → $\mathrm{Var}(X)=\mathrm{Var}(E[X\mid Y])$.

**Example:** Do groups, means dono 5, variances 2 aur 6, weights 0.5 each. Between $=0$, total $=4$.

**Dhyan do:** Formula **sum** hai, product nahi.

### 8. Poisson (ya binomial) given $N$

Agar given $N$, $X\sim$ Poisson($N$): $E[X\mid N]=N$, $\mathrm{Var}(X\mid N)=N$. To
$$E[X]=E[N],\qquad\mathrm{Var}(X)=E[N]+\mathrm{Var}(N).$$
**Example:** $N=2$ ya $4$ (prob $\frac12$ each). $E[N]=3$, $\mathrm{Var}(N)=1$. $\mathrm{Var}(X)=3+1=4$.

Binomial version: given $N$, $X\sim\text{Bin}(N,p)$: $E[X\mid N]=Np$, $\mathrm{Var}(X\mid N)=Np(1-p)$, so
$$\mathrm{Var}(X)=p(1-p)E[N]+p^2\mathrm{Var}(N).$$

**Dhyan do:** $\mathrm{Var}(X)=E[N]$ likh dena (sirf within) — between part $\mathrm{Var}(N)$ chhoot gaya.

## Solved examples

**Example 1 (NAT, easy):** Machine A makes 50% of items (mean weight 100 g), B makes 30% (mean 110 g), C makes 20% (mean 90 g). Find the mean weight of a randomly chosen item.

**Soch:** Groups + probabilities + group means → total expectation.

**Solution:**
1. $E[X]=0.5(100)+0.3(110)+0.2(90)$.
2. $=50+33+18=101$.
Answer: **101 g**.

**Galti kahan hoti hai:** $\frac{100+110+90}{3}=100$ — weights ignore kar diye.

**Example 2 (MCQ, easy):** $Y\sim U(2,6)$ and $E[X\mid Y]=3Y-1$. Then $E[X]$ equals
(A) $3Y-1$  (B) 11  (C) 17  (D) 5

**Soch:** $E[X]=E[E[X\mid Y]]$ — $Y$ pe average karo.

**Solution:**
1. $E[Y]=\frac{2+6}{2}=4$.
2. $E[X]=3(4)-1=11$. Answer: **(B)**.

**Galti kahan hoti hai:** (A) — random variable ko answer maan lena; (C) — $Y$ ki ek value (6) plug kar dena, average nahi kiya.

**Example 3 (NAT, medium):** $N$ is uniform on $\{1,2,3,4\}$. Given $N$, a fair coin is tossed $N$ times. Find the expected number of heads.

**Soch:** Two-stage → inner expectation $N$ me likho.

**Solution:**
1. $E[\text{heads}\mid N]=\frac N2$.
2. $E[N]=\frac{1+2+3+4}{4}=2.5$.
3. $E[\text{heads}]=\frac{2.5}{2}=1.25$.
Answer: **1.25**.

**Galti kahan hoti hai:** $E[N]=2.5$ hi answer likh dena — inner step ($\times\frac12$) bhool gaye.

**Example 4 (NAT, medium):** With probability 0.3, $X$ comes from a population with mean 2 and variance 4; otherwise from a population with mean 12 and variance 9. Find $\mathrm{Var}(X)$.

**Soch:** Mixture → within + between.

**Solution:**
1. $\bar m=0.3(2)+0.7(12)=9$.
2. Within $=0.3(4)+0.7(9)=7.5$.
3. Between $=0.3(49)+0.7(9)=21$.
4. $\mathrm{Var}(X)=28.5$.
Answer: **28.5**.

**Galti kahan hoti hai:** Sirf within (7.5) dena, ya variances add karna ($4+9=13$). Dono me between part missing hai.

**Example 5 (MSQ, medium):** $Y$ is any random variable with finite variance and $X=2Y+3$. Which statements are true?
(A) $\mathrm{Var}(X\mid Y)=0$
(B) $E[\mathrm{Var}(X\mid Y)]=\mathrm{Var}(X)$
(C) $\mathrm{Var}(X)=\mathrm{Var}(E[X\mid Y])$
(D) $E[X\mid Y]=2E[Y]+3$

**Soch:** $X$ is a function of $Y$ → within 0.

**Solution:**
1. Given $Y$, $X=2Y+3$ fixed hai, to conditional variance 0. (A) true.
2. Isliye within $=0$, so (B) false (jab tak $\mathrm{Var}(Y)=0$ na ho).
3. Total = between: (C) true.
4. $E[X\mid Y]=2Y+3$ (random variable), not $2E[Y]+3$ (number). (D) false.
Answer: **(A), (C)**.

**Galti kahan hoti hai:** (D) — $E[X\mid Y]$ aur $E[X]$ ko mix karna.

**Example 6 (NAT, hard):** Same setup as Example 3 ($N$ uniform on $\{1,2,3,4\}$, then $N$ fair coin tosses). Find the variance of the number of heads $H$.

**Soch:** Given $N$, $H\sim\text{Bin}(N,\frac12)$ → total variance.

**Solution:**
1. $E[H\mid N]=\frac N2$, $\mathrm{Var}(H\mid N)=\frac N4$.
2. $E[N]=2.5$, $\mathrm{Var}(N)=\frac{1+4+9+16}{4}-2.5^2=7.5-6.25=1.25$.
3. Within $=E[\frac N4]=\frac{2.5}{4}=0.625$.
4. Between $=\mathrm{Var}(\frac N2)=\frac{1.25}{4}=0.3125$.
5. $\mathrm{Var}(H)=0.9375$.
Answer: **0.9375**.

**Galti kahan hoti hai:** Sirf within (0.625), ya between me $\frac12$ ko square na karna ($\frac{1.25}{2}$).

## Confusions clear karo

**Q:** $E[X\mid Y]$ aur $E[X\mid Y=y]$ me kya farak hai?
**A:** $E[X\mid Y=y]$ ek number hai (specific $y$ ke liye). $E[X\mid Y]$ ek random variable hai — $Y$ ka function.

**Q:** Weighted average kab, simple average kab?
**A:** Groups ki probabilities alag ho to hamesha weighted. Simple average tabhi chalega jab saare groups equally likely hon.

**Q:** "Within" aur "between" ko yaad kaise rakhu?
**A:** Within = "andar ka" = har group ka variance, weights se average. Between = "groups ke beech" = group means kitne bikhre hain overall mean ke around.

**Q:** Do groups ka variance 4 aur 4 hai — total 8?
**A:** Nahi. Within $=4$ (average), plus between (means ka spread). Agar means same hon to total 4; alag hon to usse zyada.

**Q:** Kya $\mathrm{Var}(X)$ kabhi $E[\mathrm{Var}(X\mid Y)]$ se chhota ho sakta hai?
**A:** Nahi, kyunki between part $\ge0$ hai. "Condition karne se average variance kam ya barabar hota hai."

**Q:** Question me kaise pehchaanu ki total expectation/variance lagana hai?
**A:** Trigger words: "with probability … otherwise …", "a randomly chosen member of group …", "first a die is rolled, then …", "given $N$, $X$ is …". Matlab do stage hain — pehle group, phir value. Bas groups ki list banao: weight, mean, variance.

**Q:** Random sum me $E[N]\mu$ ke liye kya shart hai?
**A:** $X_i$ ka mean same ($\mu$) ho aur $N$ unke values pe depend na kare (independent ho).

## Khud try karo

**1.** 25% customers premium hain (mean spend 40), baaki regular (mean spend 20). Overall mean spend?

<details><summary>Answer dekho</summary>

$0.25(40)+0.75(20)=10+15=25$.

</details>

**2.** Two equally likely groups: means 3 and 7, variances 2 and 6. Find $\mathrm{Var}(X)$.

<details><summary>Answer dekho</summary>

Within $=\frac{2+6}{2}=4$. Overall mean 5, between $=\frac{(3-5)^2+(7-5)^2}{2}=4$. Total $=8$.

</details>

**3.** $N$ takes values 0, 1, 2 with probabilities 0.2, 0.5, 0.3. Given $N$, $X\sim$ Poisson($N$). Find $\mathrm{Var}(X)$.

<details><summary>Answer dekho</summary>

$E[N]=0.5+0.6=1.1$, $E[N^2]=0.5+1.2=1.7$, $\mathrm{Var}(N)=1.7-1.21=0.49$. $\mathrm{Var}(X)=E[N]+\mathrm{Var}(N)=1.59$.

</details>

**4.** Ek shop me ek ghante me aane wale customers ki sankhya $N$ ka mean 8 hai, aur har customer (independently) average 250 rupaye kharch karta hai. Expected hourly revenue?

<details><summary>Answer dekho</summary>

Random sum: $E[N]\mu=8\times250=2000$.

</details>

**5.** With probability 0.25, $X\sim N(0,1)$; otherwise $X\sim N(4,1)$. Find $E[X]$ and $\mathrm{Var}(X)$.

<details><summary>Answer dekho</summary>

1. $E[X]=0.25(0)+0.75(4)=3$.
2. Within $=1$. Between $=0.25(0-3)^2+0.75(4-3)^2=2.25+0.75=3$.
3. $\mathrm{Var}(X)=4$.

</details>

## Ek page me

- $E[X\mid Y=y]$ = number; $E[X\mid Y]$ = random variable (function of $Y$).
- $E[X]=\sum_y E[X\mid Y=y]P(Y=y)$ — har mean ko apni probability se weight karo.
- Two-stage: andar ka expectation pehle ($E[\text{heads}\mid k]=k/2$), phir bahar.
- Random sum: $E[\sum_{i=1}^N X_i]=E[N]\mu$.
- $\mathrm{Var}(X)=E[\mathrm{Var}(X\mid Y)]+\mathrm{Var}(E[X\mid Y])$ = within + between.
- Mixture: mean $\sum w_im_i$; within $\sum w_iv_i$; between $\sum w_i(m_i-\bar m)^2$.
- Group variances add mat karo; sirf within ya sirf between bhi galat.
- $\mathrm{Var}(X)\ge E[\mathrm{Var}(X\mid Y)]$.
- Same group means → between 0; $X=g(Y)$ → within 0.
- Poisson($N$): $\mathrm{Var}(X)=E[N]+\mathrm{Var}(N)$; Bin($N,p$): $p(1-p)E[N]+p^2\mathrm{Var}(N)$.

Revision ke liye **Short note** tab dekho.
