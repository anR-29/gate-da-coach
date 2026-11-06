# Joint, marginal and conditional distributions

> **Time:** ~35 min · **Pehle aana chahiye:** conditional probability $P(A\mid B)$, PMF aur $E[X]$, uniform distribution, double integral ka basic idea · **Day:** 9

## Ye topic kyun?

Real data me ek saath do cheezein hoti hain: kisi student ke maths aur physics marks, ek customer ki age aur spend. Joint distribution batata hai ki **dono** milkar kaise behave karte hain, aur usi se hum ek variable ka akela behaviour (marginal) ya "ek pata ho to doosra kaisa" (conditional) nikaalte hain. GATE DA me yahan se table-based NAT/MCQ (constant, marginal, conditional, independence check) aur "do uniforms → area ratio" wale sawaal aate hain.

## Picture se samjho

Joint PMF ko ek table socho. Har cell = "X ye aur Y wo, dono ek saath" ki probability. Saare cells ka total 1. Row ka total likh do side me, column ka total neeche — ye margin pe likhe totals hi **marginal** distributions hain (naam yahin se aaya).

<figure class="fig">
<svg viewBox="0 0 330 160" xmlns="http://www.w3.org/2000/svg">
<rect x="70" y="40" width="180" height="60" fill="none" stroke="currentColor"/>
<line x1="130" y1="40" x2="130" y2="100" stroke="currentColor"/>
<line x1="190" y1="40" x2="190" y2="100" stroke="currentColor"/>
<line x1="70" y1="70" x2="250" y2="70" stroke="currentColor"/>
<rect x="250" y="40" width="60" height="60" style="fill:var(--info);opacity:0.2"/>
<rect x="70" y="100" width="180" height="30" style="fill:var(--good);opacity:0.25"/>
<text x="100" y="32" text-anchor="middle" font-size="11" fill="currentColor">Y=0</text>
<text x="160" y="32" text-anchor="middle" font-size="11" fill="currentColor">Y=1</text>
<text x="220" y="32" text-anchor="middle" font-size="11" fill="currentColor">Y=2</text>
<text x="280" y="32" text-anchor="middle" font-size="11" style="fill:var(--info)">row sum</text>
<text x="62" y="59" text-anchor="end" font-size="11" fill="currentColor">X=0</text>
<text x="62" y="89" text-anchor="end" font-size="11" fill="currentColor">X=1</text>
<text x="100" y="59" text-anchor="middle" font-size="12" fill="currentColor">0.10</text>
<text x="160" y="59" text-anchor="middle" font-size="12" fill="currentColor">0.20</text>
<text x="220" y="59" text-anchor="middle" font-size="12" fill="currentColor">0.10</text>
<text x="100" y="89" text-anchor="middle" font-size="12" fill="currentColor">0.15</text>
<text x="160" y="89" text-anchor="middle" font-size="12" fill="currentColor">0.25</text>
<text x="220" y="89" text-anchor="middle" font-size="12" fill="currentColor">0.20</text>
<text x="280" y="59" text-anchor="middle" font-size="12" style="fill:var(--info)">0.40</text>
<text x="280" y="89" text-anchor="middle" font-size="12" style="fill:var(--info)">0.60</text>
<text x="100" y="119" text-anchor="middle" font-size="12" style="fill:var(--good)">0.25</text>
<text x="160" y="119" text-anchor="middle" font-size="12" style="fill:var(--good)">0.45</text>
<text x="220" y="119" text-anchor="middle" font-size="12" style="fill:var(--good)">0.30</text>
<text x="62" y="119" text-anchor="end" font-size="10" style="fill:var(--good)">col sum</text>
<text x="280" y="119" text-anchor="middle" font-size="12" fill="currentColor">1</text>
<text x="165" y="150" text-anchor="middle" font-size="11" fill="currentColor">row sums = p_X, column sums = p_Y</text>
</svg>
<figcaption>Joint PMF table. Margins pe likhe totals hi marginal PMFs hain.</figcaption>
</figure>

Is table ko poore lesson me use karenge. Note karo: row sums $0.40+0.60=1$ aur column sums $0.25+0.45+0.30=1$ — har marginal khud ek valid PMF hai. "Given $Y=2$" ka matlab: sirf $Y=2$ wala column dekho aur use uske total (0.30) se divide karo.

Ab continuous case. Do independent uniform $U(0,1)$ lo. Point $(X,Y)$ unit square me kahin bhi barabar chance se girta hai — jaise square board pe random dart. To kisi region ki probability = us region ka area / poore square ka area.

<figure class="fig">
<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg">
<polygon points="30,150 102,150 30,78" style="fill:var(--mark);opacity:0.45"/>
<rect x="30" y="30" width="120" height="120" fill="none" stroke="currentColor"/>
<line x1="102" y1="150" x2="30" y2="78" style="stroke:var(--info)" stroke-width="2"/>
<text x="30" y="165" text-anchor="middle" font-size="10" fill="currentColor">0</text>
<text x="102" y="165" text-anchor="middle" font-size="10" fill="currentColor">c</text>
<text x="150" y="165" text-anchor="middle" font-size="10" fill="currentColor">1</text>
<text x="22" y="82" text-anchor="end" font-size="10" fill="currentColor">c</text>
<text x="22" y="34" text-anchor="end" font-size="10" fill="currentColor">1</text>
<text x="90" y="22" text-anchor="middle" font-size="11" fill="currentColor">X + Y ≤ c : area c²/2</text>
<polygon points="190,150 214,150 310,54 310,30 286,30 190,126" style="fill:var(--good);opacity:0.45"/>
<rect x="190" y="30" width="120" height="120" fill="none" stroke="currentColor"/>
<line x1="190" y1="150" x2="310" y2="30" stroke="currentColor" stroke-dasharray="3 3"/>
<text x="190" y="165" text-anchor="middle" font-size="10" fill="currentColor">0</text>
<text x="214" y="165" text-anchor="middle" font-size="10" fill="currentColor">d</text>
<text x="310" y="165" text-anchor="middle" font-size="10" fill="currentColor">1</text>
<text x="275" y="125" text-anchor="middle" font-size="10" fill="currentColor">corner</text>
<text x="222" y="58" text-anchor="middle" font-size="10" fill="currentColor">corner</text>
<text x="250" y="22" text-anchor="middle" font-size="11" fill="currentColor">|X − Y| ≤ d : 1 − (1 − d)²</text>
<text x="170" y="190" text-anchor="middle" font-size="11" fill="currentColor">X, Y iid U(0,1): probability = shaded area</text>
</svg>
<figcaption>Left: X+Y ≤ c ek triangle hai. Right: |X−Y| ≤ d diagonal ke around ek band hai; bahar do corner triangles bachte hain.</figcaption>
</figure>

Left me triangle ki dono legs $c$ hain, area $\frac{c^2}{2}$. Right me band ke bahar do triangles hain, har ek ki legs $(1-d)$, to band ka area $1-2\cdot\frac{(1-d)^2}{2}=1-(1-d)^2$. Formulas ratne ki zaroorat nahi — bas picture banao aur area nikaalo.

<figure class="fig">
<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
<polygon points="60,180 160,180 160,80" style="fill:var(--mark);opacity:0.45"/>
<rect x="60" y="30" width="100" height="150" fill="none" stroke="currentColor"/>
<line x1="60" y1="180" x2="160" y2="80" style="stroke:var(--info)" stroke-width="2"/>
<text x="60" y="195" text-anchor="middle" font-size="10" fill="currentColor">0</text>
<text x="110" y="195" text-anchor="middle" font-size="10" fill="currentColor">1</text>
<text x="160" y="195" text-anchor="middle" font-size="10" fill="currentColor">2</text>
<text x="52" y="134" text-anchor="end" font-size="10" fill="currentColor">1</text>
<text x="52" y="84" text-anchor="end" font-size="10" fill="currentColor">2</text>
<text x="52" y="34" text-anchor="end" font-size="10" fill="currentColor">3</text>
<text x="170" y="198" font-size="11" fill="currentColor">x</text>
<text x="60" y="22" text-anchor="middle" font-size="11" fill="currentColor">y</text>
<text x="105" y="75" text-anchor="middle" font-size="10" style="fill:var(--info)">y = x</text>
<text x="180" y="100" font-size="11" fill="currentColor">X ~ U(0,2), Y ~ U(0,3)</text>
<text x="180" y="120" font-size="11" fill="currentColor">rectangle area = 6</text>
<text x="180" y="140" font-size="11" fill="currentColor">X &gt; Y triangle = 2</text>
<text x="180" y="160" font-size="11" style="fill:var(--mark)">P(X &gt; Y) = 2/6 = 1/3</text>
</svg>
<figcaption>Alag ranges: rectangle 2×3 hai, symmetry nahi. P(X&gt;Y) = 1/3, 1/2 nahi.</figcaption>
</figure>

Jab ranges alag hon to "$X>Y$ ka chance aadha" wali symmetry toot jaati hai. Rectangle aur line $y=x$ draw karo, phir area gin lo.

## Concept step-by-step

### 1. Joint PMF

Do discrete random variables $X,Y$ ka joint PMF: $p(x,y)=P(X=x,\,Y=y)$ ("dono ek saath"). Valid hone ke liye:
$$p(x,y)\ge0,\qquad \sum_x\sum_y p(x,y)=1\ \text{(har listed cell pe)}.$$

**Constant nikaalna:** $p(x,y)=c(x+2y)$ for $x\in\{1,2\}$, $y\in\{0,1\}$.
1. Har cell ka weight likho: $(1,0)\to1$, $(1,1)\to3$, $(2,0)\to2$, $(2,1)\to4$.
2. Total weight $=1+3+2+4=10$.
3. $10c=1\Rightarrow c=0.1$.

Kisi event ki probability = us event wale cells ka sum. $E[g(X,Y)]=\sum_x\sum_y g(x,y)p(x,y)$.

**Dhyan do:** Cells **gino** mat (4 cells → $c=\frac14$ galat). Har cell ka **weight** add karo.

### 2. Marginal PMF

Sirf $X$ ka distribution chahiye? $Y$ ki saari values pe add kar do (total probability):
$$p_X(x)=\sum_y p(x,y)\ \text{(row sum)},\qquad p_Y(y)=\sum_x p(x,y)\ \text{(column sum)}.$$

**Example (upar wali table):** $p_X(0)=0.10+0.20+0.10=0.40$, $p_X(1)=0.60$. $p_Y(0)=0.25$, $p_Y(1)=0.45$, $p_Y(2)=0.30$. Then $E[X]=0.6$, $E[Y]=0.45+0.60=1.05$.

**Dhyan do:** Marginals se joint wapas nahi ban sakta (jab tak independent na ho). Joint me zyada information hai.

### 3. Conditional PMF aur conditional mean

"$Y=y$ pata hai" → duniya sirf us column tak simat gayi. Column ko uske total se divide karo taaki naya total 1 ho:
$$p(x\mid y)=\frac{p(x,y)}{p_Y(y)},\qquad E[X\mid Y=y]=\sum_x x\,p(x\mid y).$$
Ye bas $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$ hai, table pe.

**Example:**
1. $P(X=1\mid Y=2)=\frac{0.20}{0.30}=\frac23$.
2. $P(X=0\mid Y=2)=\frac{0.10}{0.30}=\frac13$. (Dono ka sum 1 — check.)
3. $E[X\mid Y=1]=0\cdot\frac{0.20}{0.45}+1\cdot\frac{0.25}{0.45}=\frac59\approx0.556$.

**Dhyan do:** $p(1,2)=0.20$ joint hai, conditional nahi. Aur "given $Y$" me $p_Y$ (column total) se divide karo, $p_X$ (row total) se nahi.

### 4. Independence

$X$ aur $Y$ independent hain agar aur sirf agar **har** cell me
$$p(x,y)=p_X(x)\,p_Y(y).$$
Matlab $Y$ jaanne se $X$ ki probabilities nahi badalti: $p(x\mid y)=p_X(x)$.

**Example (humari table):** $p_X(0)p_Y(0)=0.40\times0.25=0.10=p(0,0)$ ✓. Lekin $p_X(0)p_Y(1)=0.40\times0.45=0.18\ne0.20$ ✗. Ek cell fail → **dependent**.

Independent table kaisa dikhta hai: har row doosri row ka multiple hoti hai. Jaise rows $(0.08,0.20,0.12)$ aur $(0.12,0.30,0.18)$ — doosri = pehli $\times1.5$.

**Dhyan do:** Ek cell match hone se independence prove nahi hoti; **saare** cells check karne padte hain. Dependence ke liye ek failing cell kaafi hai. Independent ho to $\mathrm{Cov}(X,Y)=0$ bhi.

### 5. Continuous joint density

Continuous me table ki jagah surface $f(x,y)\ge0$ hota hai, aur probability = volume:
$$P((X,Y)\in R)=\iint_R f(x,y)\,dx\,dy,\qquad \iint f=1.$$
Marginal: doosre variable pe integrate karo — **sirf support ke andar**:
$$f_X(x)=\int f(x,y)\,dy.$$
Conditional density $f(y\mid x)=\frac{f(x,y)}{f_X(x)}$; independence: $f(x,y)=f_X(x)f_Y(y)$.

**Example (rectangle support):** $f(x,y)=x+y$ on $[0,1]^2$. Check: $\int_0^1\int_0^1(x+y)\,dy\,dx=\int_0^1(x+\tfrac12)dx=\tfrac12+\tfrac12=1$ ✓. Marginal $f_X(x)=x+\frac12$.

**Example (triangle support):** $f(x,y)=2$ on $0\le y\le x\le1$. Fixed $x$ ke liye $y$ sirf $0$ se $x$ tak jaata hai, to $f_X(x)=\int_0^x2\,dy=2x$. Aur $f(y\mid x)=\frac{2}{2x}=\frac1x$ — given $X=x$, $Y$ uniform on $[0,x]$. Yahan support triangle hai, isliye $X,Y$ dependent hain ($X$ chhota → $Y$ bhi chhota).

**Dhyan do:** Triangle support pe $y$ ko $0$ se $1$ tak integrate karna sabse common galti hai. Limits hamesha support ki picture se lo.

### 6. Independent uniforms → area ratio

$X\sim U(0,a)$ aur $Y\sim U(0,b)$ independent hain. To
$$f(x,y)=f_X(x)f_Y(y)=\frac1a\cdot\frac1b=\frac1{ab}$$
— poore $a\times b$ rectangle pe constant. Kisi region $R$ pe integrate karo: $\iint_R\frac1{ab}=\frac{\text{area}(R)}{ab}$. Isliye
$$P(R)=\frac{\text{area of region}}{\text{area of rectangle}}.$$

**Example:** $X\sim U(0,2)$, $Y\sim U(0,3)$, $P(X>Y)$. Region $y<x$ rectangle ke andar = triangle $(0,0),(2,0),(2,2)$, area $\frac12\cdot2\cdot2=2$. Answer $\frac26=\frac13$ (teesri picture).

**Dhyan do:** Triangle ka area $\frac12\times$base$\times$height — $\frac12$ mat bhoolo.

### 7. Unit square ke standard shapes (iid $U(0,1)$)

| Region | Shape | Probability |
|---|---|---|
| $X\ge Y$ | diagonal ke neeche ka triangle | $\frac12$ |
| $X+Y\le c$, $c\le1$ | legs $c$ wala triangle | $\frac{c^2}{2}$ |
| $X+Y\le c$, $1<c\le2$ | square minus top corner (legs $2-c$) | $1-\frac{(2-c)^2}{2}$ |
| $\lvert X-Y\rvert\le d$ | band minus 2 corners | $1-(1-d)^2$ |
| $X\ge kY$, $k\ge1$ | triangle $(0,0),(1,0),(1,\frac1k)$ | $\frac1{2k}$ |

**Example:** $P(X+Y\le0.8)=\frac{0.64}{2}=0.32$. $P(\lvert X-Y\rvert\le0.4)=1-0.36=0.64$. $P(X\ge4Y)=\frac18$.

**Dhyan do:** $c>1$ wale case me $c^2/2$ 1 se zyada bhi aa sakta hai ($c=1.6$ → 1.28) — wahan complement corner use karo.

### 8. Region ki direction aur alag ranges

Integrate karne se pehle **shade** karo: $X\ge Y$ diagonal ke neeche (x-axis ki taraf), $X<Y$ upar. Alag ranges me pehle rectangle banao, phir line, phir dekho line rectangle ko kahan kaatti hai.

**Example:** $X\sim U(0,1)$, $Y\sim U(0,4)$, $P(Y<X)$. Rectangle $1\times4$, area 4. Region $y<x$: triangle $(0,0),(1,0),(1,1)$, area $\frac12$. Answer $\frac{1/2}{4}=\frac18$.

**Dhyan do:** "Do uniforms hain to $\frac12$" sirf tab sach hai jab dono same range ke iid hon.

## Solved examples

**Example 1 (MCQ, easy):** The joint PMF of $X,Y$ is

| | $Y=0$ | $Y=1$ |
|---|---|---|
| $X=0$ | 0.15 | 0.25 |
| $X=1$ | 0.35 | 0.25 |

$P(X=1\mid Y=0)$ equals
(A) 0.35  (B) 0.7  (C) 0.583  (D) 0.5

**Soch:** "Given $Y=0$" → $Y=0$ column, uske total se divide.

**Solution:**
1. $p_Y(0)=0.15+0.35=0.50$.
2. $P(X=1\mid Y=0)=\frac{0.35}{0.50}=0.7$. Answer: **(B)**.

**Galti kahan hoti hai:** (A) — joint cell ko hi answer maan lena. (C) — row total $p_X(1)=0.60$ se divide karna ($0.35/0.6$).

**Example 2 (NAT, easy):** $p(x,y)=c\,x(y+1)$ for $x\in\{1,2,3\}$, $y\in\{0,1\}$. Find $P(X\ge2,\,Y=1)$.

**Soch:** Pehle saare weights ka sum = 1 se $c$; phir required cells add.

**Solution:**
1. Weights: $y=0$: $1,2,3$; $y=1$: $2,4,6$. Total $=6+12=18$, so $c=\frac1{18}$.
2. Required cells $(2,1),(3,1)$: weights $4+6=10$.
3. $P=\frac{10}{18}\approx0.556$.
Answer: **0.556**.

**Galti kahan hoti hai:** 6 cells gin ke $c=\frac16$ lena — tab answer $\frac{10}{6}>1$ aata hai, jo impossible hai.

**Example 3 (NAT, medium):** $X,Y$ iid $U(0,1)$. Find $P(X+Y\le1.4)$.

**Soch:** Unit square + line → area. $c=1.4>1$, isliye complement corner.

**Solution:**
1. Line $x+y=1.4$ square ke top-right corner se triangle kaatti hai jahan $X+Y>1.4$.
2. Us triangle ki legs $2-1.4=0.6$, area $\frac{0.36}{2}=0.18$.
3. $P=1-0.18=0.82$.
Answer: **0.82**.

**Galti kahan hoti hai:** $\frac{c^2}{2}=\frac{1.96}{2}=0.98$ — ye formula sirf $c\le1$ ke liye hai.

**Example 4 (MSQ, medium):** The joint PMF is

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---|---|---|
| $X=0$ | 0.08 | 0.20 | 0.12 |
| $X=1$ | 0.12 | 0.30 | 0.18 |

Which statements are true?
(A) $X$ and $Y$ are independent
(B) $P(X=1\mid Y=2)=0.6$
(C) $P(Y=1\mid X=0)=0.20$
(D) $E[Y\mid X=1]=1.1$

**Soch:** Marginals nikaalo, har cell ko product se compare karo.

**Solution:**
1. $p_X=(0.4,0.6)$, $p_Y=(0.2,0.5,0.3)$.
2. Products: $0.4\times(0.2,0.5,0.3)=(0.08,0.20,0.12)$ ✓; $0.6\times(0.2,0.5,0.3)=(0.12,0.30,0.18)$ ✓. Saare match → (A) true.
3. (B) $\frac{0.18}{0.30}=0.6$. True.
4. (C) $\frac{0.20}{0.40}=0.5$, not 0.20. False.
5. (D) Independent hai to $E[Y\mid X=1]=E[Y]=0\cdot0.2+1\cdot0.5+2\cdot0.3=1.1$. True.
Answer: **(A), (B), (D)**.

**Galti kahan hoti hai:** (C) — joint 0.20 ko conditional samajhna.

**Example 5 (MCQ, medium):** $X\sim U(0,2)$ and $Y\sim U(0,3)$ are independent. $P(X>Y)$ equals
(A) $\frac12$  (B) $\frac13$  (C) $\frac23$  (D) $\frac16$

**Soch:** Alag ranges → rectangle draw karo, symmetry mat maano.

**Solution:**
1. Rectangle $2\times3$, area 6.
2. $y<x$ wala part: triangle $(0,0),(2,0),(2,2)$, area $2$.
3. $P=\frac26=\frac13$. Answer: **(B)**.

**Galti kahan hoti hai:** (A) — "iid jaisa symmetric" maan lena. (C) — region ulta le lena ($X<Y$ ka area 4).

**Example 6 (NAT, hard):** $(X,Y)$ has joint density $f(x,y)=c\,xy$ on $0\le y\le x\le1$ (zero elsewhere). Find $P(X\le0.5)$.

**Soch:** Triangle support → limits $y:0\to x$. Constant, phir marginal $f_X$, phir integrate.

**Solution:**
1. $\int_0^1\int_0^x xy\,dy\,dx=\int_0^1 x\cdot\frac{x^2}{2}dx=\frac18$. So $c=8$.
2. $f_X(x)=\int_0^x8xy\,dy=8x\cdot\frac{x^2}{2}=4x^3$ on $[0,1]$.
3. $P(X\le0.5)=\int_0^{0.5}4x^3dx=0.5^4=0.0625$.
Answer: **0.0625**.

**Galti kahan hoti hai:** $y$ ko $0$ se $1$ tak integrate karna: tab $c=4$ aur $f_X=2x$ aata hai, answer $0.25$ — support ignore kar diya.

## Confusions clear karo

**Q:** Joint, marginal, conditional — ek line me farak?
**A:** Joint = "dono ek saath" (cell). Marginal = "sirf ek, doosre ki parwah nahi" (row/column total). Conditional = "ek pata hai, doosra kaisa" (cell / us row ya column ka total).

**Q:** "Given $Y=1$" me kisse divide karu?
**A:** Jo **given** hai uske total se: $p_Y(1)$, yaani $Y=1$ column ka sum.

**Q:** Ek cell me $p(x,y)=p_X(x)p_Y(y)$ mil gaya, to independent?
**A:** Nahi. Saare cells check karo. Ek bhi fail → dependent.

**Q:** Continuous me marginal nikaalte waqt limits kaise decide karu?
**A:** Support ki picture banao. $x$ fix karo, dekho $y$ kahan se kahan tak support ke andar hai — wahi limits.

**Q:** Do uniforms ka sawaal hai — integrate karu ya area?
**A:** Independent uniforms → density constant → seedha area ratio. Integration ki zaroorat nahi.

**Q:** $P(X\ge Y)$ aur $P(X>Y)$ me farak?
**A:** Continuous me nahi; line $y=x$ ka area zero hai.

**Q:** iid $U(0,1)$ me $P(X\ge Y)=\frac12$ kyun?
**A:** Symmetry: $X$ aur $Y$ ka role swap karne se kuch nahi badalta, aur barabari ka chance 0 hai. Isliye dono taraf aadha-aadha.

## Khud try karo

**1.** Lesson ki pehli table (rows $0.10,0.20,0.10$ / $0.15,0.25,0.20$) se $E[Y\mid X=1]$ nikaalo.

<details><summary>Answer dekho</summary>

$p_X(1)=0.60$. $p(y\mid1)=\frac{0.15}{0.6},\frac{0.25}{0.6},\frac{0.20}{0.6}$. $E[Y\mid X=1]=\frac{0\cdot0.15+1\cdot0.25+2\cdot0.20}{0.6}=\frac{0.65}{0.6}\approx1.083$.

</details>

**2.** $X,Y$ iid $U(0,1)$. Find $P(\lvert X-Y\rvert\le0.4)$.

<details><summary>Answer dekho</summary>

Do corner triangles, legs $0.6$: total area $0.36$. Answer $=1-0.36=0.64$.

</details>

**3.** $X,Y$ iid $U(0,1)$. Find $P(X\ge4Y)$.

<details><summary>Answer dekho</summary>

Region: triangle $(0,0),(1,0),(1,\frac14)$, area $\frac12\cdot1\cdot\frac14=\frac18=0.125$.

</details>

**4.** $p(x,y)=c(x+y)$ for $x\in\{1,2\}$, $y\in\{1,2,3\}$. Find $c$ and $P(Y=3\mid X=2)$.

<details><summary>Answer dekho</summary>

1. Weights: $x=1$: $2,3,4$ (sum 9); $x=2$: $3,4,5$ (sum 12). Total 21, $c=\frac1{21}$.
2. $P(Y=3\mid X=2)=\frac{5/21}{12/21}=\frac5{12}\approx0.417$.

</details>

**5.** $X,Y$ iid $U(0,2)$. Find $P(X+Y\le1)$.

<details><summary>Answer dekho</summary>

Square $2\times2$, area 4. Region: triangle with legs 1, area $\frac12$. Answer $=\frac{1/2}{4}=0.125$.

</details>

## Ek page me

- Joint PMF: $p(x,y)\ge0$, saare cells ka sum 1; constant ke liye **weights** add karo, cells nahi.
- Marginal: $p_X$ = row sum, $p_Y$ = column sum.
- Conditional: $p(x\mid y)=\frac{p(x,y)}{p_Y(y)}$ — given wale ke total se divide.
- $E[X\mid Y=y]=\sum x\,p(x\mid y)$.
- Independent $\iff$ **har** cell $=p_X\cdot p_Y$; ek fail → dependent.
- Continuous: $f_X(x)=\int f(x,y)\,dy$, limits support ki picture se.
- Independent uniforms: density $\frac1{ab}$ constant → $P$ = area ratio.
- iid $U(0,1)$: $P(X\ge Y)=\frac12$, $P(X+Y\le c)=\frac{c^2}2$ ($c\le1$), $P(\lvert X-Y\rvert\le d)=1-(1-d)^2$, $P(X\ge kY)=\frac1{2k}$.
- $c>1$: $P(X+Y\le c)=1-\frac{(2-c)^2}{2}$.
- Alag ranges: rectangle + line draw karo, symmetry mat maano.
- Shade first, phir area; triangle me $\frac12$ mat bhoolo.

Revision ke liye **Short note** tab dekho.
