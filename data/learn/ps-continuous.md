# PDFs, CDFs, uniform and exponential models

> **Time:** ~35 min · **Pehle aana chahiye:** basic integration (Class 12), discrete random variable ka PMF aur $E[X]$ · **Day:** 6

## Ye topic kyun?

Ab tak humne aise random variables dekhe jo gin-ne wale values lete the (0, 1, 2, …). Lekin height, waiting time, bulb ki life — ye kisi bhi decimal value pe ho sakte hain. Inke liye probability "area under a curve" se aati hai. GATE DA me is topic se seedhe 1–2 mark ke NAT aate hain: constant $k$ nikaalo, $P(a<X<b)$ nikaalo, median nikaalo, ya exponential/uniform pe "given" wala sawaal. Formula chhote hain, par traps bahut hain.

## Picture se samjho

Socho ek dartboard ki tarah number line hai aur tum ek point bilkul random pheko. Exactly $0.5000000\ldots$ pe girne ka chance? Itne saare points hain ki kisi ek exact point ka chance zero hai. Isliye continuous variable me hum **intervals** ki probability poochte hain, aur wo ek curve ke neeche ke **area** se milti hai.

<figure class="fig">
<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
<polygon points="140,170 140,100 240,30 240,170" style="fill:var(--mark);opacity:0.35"/>
<line x1="40" y1="170" x2="290" y2="170" stroke="currentColor"/>
<line x1="40" y1="170" x2="40" y2="20" stroke="currentColor"/>
<line x1="40" y1="170" x2="240" y2="30" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="240" y1="30" x2="240" y2="170" style="stroke:var(--info)" stroke-dasharray="4 3"/>
<line x1="140" y1="100" x2="140" y2="170" stroke="currentColor" stroke-dasharray="3 3"/>
<text x="36" y="174" text-anchor="end" font-size="11" fill="currentColor">0</text>
<text x="36" y="104" text-anchor="end" font-size="11" fill="currentColor">1</text>
<text x="36" y="34" text-anchor="end" font-size="11" fill="currentColor">2</text>
<text x="140" y="186" text-anchor="middle" font-size="11" fill="currentColor">0.5</text>
<text x="240" y="186" text-anchor="middle" font-size="11" fill="currentColor">1</text>
<text x="292" y="174" font-size="11" fill="currentColor">x</text>
<text x="70" y="50" font-size="12" style="fill:var(--info)">f(x) = 2x</text>
<text x="196" y="150" text-anchor="middle" font-size="11" fill="currentColor">area 0.75</text>
<text x="160" y="204" text-anchor="middle" font-size="11" fill="currentColor">P(0.5 &lt; X ≤ 1) = shaded area</text>
</svg>
<figcaption>PDF f(x)=2x on [0,1]. Probability = curve ke neeche ka area, height nahi.</figcaption>
</figure>

Dekho: curve ki height 2 tak jaati hai, phir bhi koi probability 1 se zyada nahi hai — kyunki height probability hai hi nahi. Poora triangle ka area $\frac12\cdot1\cdot2=1$ hai. Shaded part (0.5 se 1) ka area $1-0.25=0.75$ hai, yahi $P(0.5<X\le1)$ hai.

<figure class="fig">
<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
<polygon points="160,170 160,151 190,158 220,163 250,166 280,167 280,170" style="fill:var(--mark);opacity:0.45"/>
<line x1="40" y1="170" x2="295" y2="170" stroke="currentColor"/>
<line x1="40" y1="170" x2="40" y2="20" stroke="currentColor"/>
<polyline points="40,30 70,85 100,118 130,139 160,151 190,158 220,163 250,166 280,167" fill="none" style="stroke:var(--info)" stroke-width="2.5"/>
<line x1="160" y1="151" x2="160" y2="170" stroke="currentColor" stroke-dasharray="3 3"/>
<text x="36" y="34" text-anchor="end" font-size="11" fill="currentColor">λ</text>
<text x="160" y="186" text-anchor="middle" font-size="11" fill="currentColor">t</text>
<text x="297" y="174" font-size="11" fill="currentColor">x</text>
<text x="80" y="60" font-size="12" style="fill:var(--info)">f(x) = λe^(−λx)</text>
<line x1="230" y1="130" x2="220" y2="158" stroke="currentColor"/>
<text x="232" y="126" font-size="11" fill="currentColor">tail = e^(−λt)</text>
<text x="160" y="204" text-anchor="middle" font-size="11" fill="currentColor">P(X &gt; t) = area to the right of t</text>
</svg>
<figcaption>Exponential density: shuru me sabse oonchi, phir dheere-dheere girti hai. Right tail ka area e^(−λt).</figcaption>
</figure>

Exponential waiting time ka model hai: "kab tak bulb chalega", "agla customer kab aayega". Chhote waiting time zyada common hain, lambe kam — isliye curve girta hai. Right side ka area (tail) batata hai "t se zyada wait" ki probability.

<figure class="fig">
<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg">
<line x1="30" y1="70" x2="290" y2="70" stroke="currentColor"/>
<rect x="134" y="54" width="156" height="12" style="fill:var(--info);opacity:0.35"/>
<rect x="212" y="74" width="78" height="12" style="fill:var(--good);opacity:0.6"/>
<line x1="30" y1="64" x2="30" y2="76" stroke="currentColor"/>
<line x1="134" y1="64" x2="134" y2="76" stroke="currentColor"/>
<line x1="212" y1="64" x2="212" y2="76" stroke="currentColor"/>
<line x1="290" y1="64" x2="290" y2="76" stroke="currentColor"/>
<text x="30" y="102" text-anchor="middle" font-size="11" fill="currentColor">0</text>
<text x="134" y="102" text-anchor="middle" font-size="11" fill="currentColor">4</text>
<text x="212" y="102" text-anchor="middle" font-size="11" fill="currentColor">7</text>
<text x="290" y="102" text-anchor="middle" font-size="11" fill="currentColor">10</text>
<text x="212" y="46" text-anchor="middle" font-size="11" style="fill:var(--info)">given X &gt; 4 : length 6</text>
<text x="251" y="118" text-anchor="middle" font-size="11" style="fill:var(--good)">X &gt; 7 : length 3</text>
<text x="80" y="118" text-anchor="middle" font-size="11" fill="currentColor">answer = 3/6</text>
</svg>
<figcaption>X ~ U(0,10). "Given X &gt; 4" ke baad duniya sirf (4,10] hai; usme (7,10] ka hissa = 3/6.</figcaption>
</figure>

Uniform me har jagah density barabar hai, isliye probability sirf **length** pe depend karti hai. "Given" lagate hi nayi duniya chhoti ho jaati hai, aur answer = favourable length / nayi duniya ki length.

## Concept step-by-step

### 1. Continuous random variable aur $P(X=x)=0$

Continuous random variable wo hai jo ek interval ki koi bhi real value le sakta hai (jaise $[0,1]$ me koi bhi number). Kisi ek exact value ki probability zero hoti hai: $P(X=x)=0$. Kyun? Area of a line (width 0) = 0.

Iska fayda: $P(a<X<b)=P(a\le X\le b)=P(a<X\le b)$. Endpoints include karo ya nahi, answer same.

**Example:** $X$ uniform on $[0,1]$. $P(X=0.3)=0$, lekin $P(0.2<X<0.4)=0.2$.

**Dhyan do:** $P(X=x)=0$ ka matlab "impossible" nahi hai; bas ek point ka area zero hai.

### 2. PDF (probability density function)

PDF $f(x)$ ek curve hai jiske neeche ka area probability deta hai:
$$P(a\le X\le b)=\int_a^b f(x)\,dx.$$
Valid PDF ki do shartein:
1. $f(x)\ge0$ har jagah (area negative nahi ho sakta).
2. $\int_{-\infty}^{\infty} f(x)\,dx=1$ (total probability 1). Practically sirf **support** (jahan $f>0$) pe integrate karo.

**Constant nikaalna:** $f(x)=kx$ on $[0,3]$. Area $=k\int_0^3 x\,dx=k\cdot\frac92$. Isse 1 ke barabar rakho: $k=\frac29$.

**Density probability nahi hai:** $U(0,0.5)$ ki density $f(x)=2$ hai — 1 se zyada! Phir bhi area $=2\times0.5=1$. Density = "probability per unit length".

**Dhyan do:** Constant nikaalte waqt **area = 1** karo, peak height = 1 nahi.

### 3. CDF (cumulative distribution function)

CDF batata hai "ab tak kitni probability jama hui":
$$F(x)=P(X\le x)=\int_{-\infty}^{x} f(t)\,dt.$$
Properties: $F$ kabhi girta nahi (non-decreasing), left me 0 se shuru aur right me 1 pe khatam. Calculus ka fundamental theorem kehta hai $F'(x)=f(x)$ — CDF ko differentiate karo to PDF milta hai.

Interval probability: $P(a<X\le b)=F(b)-F(a)$, kyunki "$b$ tak ka area" minus "$a$ tak ka area" = "$a$ aur $b$ ke beech ka area".

**Example:** $f(x)=2x$ on $[0,1]$. $F(x)=\int_0^x 2t\,dt=x^2$ (for $0\le x\le1$; $x<0$ pe 0, $x>1$ pe 1). Then $P(0.5<X\le1)=F(1)-F(0.5)=1-0.25=0.75$ (upar wali picture).

Ulta bhi: agar $F(x)=x^3$ diya hai to $f(x)=3x^2$.

**Dhyan do:** CDF diya ho to integrate mat karo — seedha $F(b)-F(a)$ lagao. PDF diya ho to pehle $F$ banao.

### 4. Mean, variance, median aur percentile

Discrete me $\sum$ tha, continuous me $\int$:
$$E[X]=\int x f(x)\,dx,\quad E[X^2]=\int x^2 f(x)\,dx,\quad \mathrm{Var}(X)=E[X^2]-(E[X])^2.$$

**Median** $m$ wo point hai jiske left me exactly aadha area ho: **solve** $F(m)=0.5$. Isi tarah $q$-th percentile: solve $F(x_q)=q$ (90th percentile ke liye $F(x)=0.9$).

**Example:** $f(x)=\frac x2$ on $[0,2]$.
1. $F(x)=\int_0^x \frac t2dt=\frac{x^2}{4}$.
2. Median: $\frac{m^2}{4}=0.5\Rightarrow m^2=2\Rightarrow m=\sqrt2\approx1.414$.
3. 90th percentile: $\frac{x^2}{4}=0.9\Rightarrow x=\sqrt{3.6}\approx1.897$.
4. Mean: $\int_0^2 x\cdot\frac x2dx=\left[\frac{x^3}{6}\right]_0^2=\frac86=\frac43\approx1.333$.
5. $E[X^2]=\int_0^2\frac{x^3}{2}dx=\left[\frac{x^4}{8}\right]_0^2=2$, so $\mathrm{Var}=2-\frac{16}{9}=\frac29$.

Notice: mean $1.333$ aur median $1.414$ alag hain. Jab density ek taraf jhuki (skewed) ho, mean aur median alag aate hain.

**Dhyan do:** Median ka matlab $F(0.5)$ nikaalna **nahi** hai. Unknown $m$ hai, jo $F$ ke andar baitha hai.

### 5. Uniform distribution $U(a,b)$

"Interval $[a,b]$ me koi bhi point, sab barabar likely" — flat density. Height aisi chahiye ki rectangle ka area 1 ho: height $\times(b-a)=1$, isliye
$$f(x)=\frac{1}{b-a},\quad F(x)=\frac{x-a}{b-a}\ (a\le x\le b).$$
Mean beech ka point hai (symmetry): $E[X]=\frac{a+b}{2}$.

Variance ka derivation: $E[X^2]=\frac{1}{b-a}\int_a^b x^2dx=\frac{b^3-a^3}{3(b-a)}=\frac{a^2+ab+b^2}{3}$. Phir
$$\mathrm{Var}=\frac{a^2+ab+b^2}{3}-\frac{(a+b)^2}{4}=\frac{4a^2+4ab+4b^2-3a^2-6ab-3b^2}{12}=\frac{(b-a)^2}{12}.$$

**Example:** $U(2,8)$: mean $=5$, var $=\frac{36}{12}=3$, $P(X\le4)=\frac{4-2}{6}=\frac13$.

**Dhyan do:** Variance me $(b-a)^2/12$ hai, $/2$ ya $/4$ nahi. Aur ye variance hai, SD nahi.

### 6. Uniform me "given" — lengths ka ratio

Conditional probability: $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$. Uniform me har probability = length$/(b-a)$. Upar-neeche dono me $(b-a)$ cancel ho jaata hai:
$$P(X\in A\mid X\in B)=\frac{\text{len}(A\cap B)}{\text{len}(B)}.$$
Matlab "given $X\in B$" ke baad $X$ phir se uniform hai, bas ab $B$ pe.

**Example:** $X\sim U(0,20)$, $P(X<15\mid X>5)$.
1. $B=(5,20]$, length 15.
2. $A\cap B=(5,15)$, length 10.
3. Answer $=\frac{10}{15}=\frac23$.

**Dhyan do:** Cut-off values ko divide mat karo ($15/5=3$ — probability 1 se zyada!). **Lengths** divide karo.

### 7. Exponential distribution

Rate $\lambda>0$ (per unit time kitni baar event hota hai) ke saath:
$$f(x)=\lambda e^{-\lambda x}\ (x\ge0).$$
Survival (tail): $P(X>t)=\int_t^\infty\lambda e^{-\lambda x}dx=\left[-e^{-\lambda x}\right]_t^\infty=e^{-\lambda t}$. Isliye CDF $F(t)=1-e^{-\lambda t}$.

Mean: integration by parts se $E[X]=\int_0^\infty x\lambda e^{-\lambda x}dx=\frac1\lambda$. Do baar by parts se $E[X^2]=\frac{2}{\lambda^2}$, isliye $\mathrm{Var}=\frac2{\lambda^2}-\frac1{\lambda^2}=\frac1{\lambda^2}$.

Median: $1-e^{-\lambda m}=0.5\Rightarrow e^{-\lambda m}=0.5\Rightarrow m=\frac{\ln2}{\lambda}$.

**Example:** Mean life 10 saal. To $\lambda=\frac1{10}=0.1$.
- $P(X>5)=e^{-0.5}\approx0.6065$.
- Median $=10\ln2\approx6.931$ (mean 10 se kam — right tail lamba hai).
- Var $=100$, SD $=10$.

**Dhyan do:** Question "mean 5" bole to $\lambda=1/5$, $\lambda=5$ nahi. Rate aur mean ulte hain.

### 8. Memoryless property

Bulb 600 ghante chal chuka hai. Kya wo "budha" ho gaya? Exponential kehta hai: nahi. Aage ka future bilkul naye bulb jaisa hai.
$$P(X>s+t\mid X>s)=\frac{P(X>s+t)}{P(X>s)}=\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}=e^{-\lambda t}=P(X>t).$$
($X>s+t$ ho to $X>s$ apne aap hai, isliye intersection $=P(X>s+t)$.)

**Example:** Mean 10, $X>4$ diya hai. $P(X>9\mid X>4)=P(X>5)=e^{-0.5}\approx0.6065$. "Clock restart" karo: bas extra 5 dekho.

**Dhyan do:** Ye property sirf exponential (continuous me) ki hai. Uniform memoryless **nahi** hai: $U(0,10)$ me $P(X>7\mid X>4)=0.5$ par $P(X>3)=0.7$.

### 9. $\lfloor X\rfloor$ geometric hota hai

$N=\lfloor X\rfloor$ ($X$ ka integer part). $N=k$ tab hota hai jab $k\le X<k+1$:
$$P(N=k)=e^{-\lambda k}-e^{-\lambda(k+1)}=\left(e^{-\lambda}\right)^k\left(1-e^{-\lambda}\right),\quad k=0,1,2,\ldots$$
Ye geometric distribution hai (pehli success se pehle $k$ failures), success probability $p=1-e^{-\lambda}$, failure $q=e^{-\lambda}$. Logic: har saal "is saal khatam?" ka chance same hai (memoryless!), isliye har integer step ek independent trial jaisa hai.

**Example:** $\lambda=1$. $P(N=0)=1-e^{-1}\approx0.6321$, $P(N=1)=e^{-1}(1-e^{-1})\approx0.2325$.

**Dhyan do:** Support $\{0,1,2,\ldots\}$ hai, 1 se shuru nahi. Isliye power $k$ hai, $k-1$ nahi.

## Solved examples

**Example 1 (MCQ, easy):** Which function is a valid PDF on $[0,1]$ (zero elsewhere)?
(A) $f(x)=x$  (B) $f(x)=1-2x$  (C) $f(x)=4x^3$  (D) $f(x)=1.5x^2$

**Soch:** "Valid PDF" = do checks: kahin negative nahi, aur area 1.

**Solution:**
1. (A) area $=\int_0^1x\,dx=\frac12\ne1$. Invalid.
2. (B) $x=0.8$ pe $1-1.6=-0.6<0$. Negative, invalid (area bhi $1-1=0$).
3. (C) $4x^3\ge0$, area $=[x^4]_0^1=1$. Valid.
4. (D) area $=[0.5x^3]_0^1=0.5$. Invalid.
Answer: **(C)**.

**Galti kahan hoti hai:** (A) choose karna kyunki "max height 1 hai". Height 1 hona shart nahi hai; area 1 hona shart hai.

**Example 2 (NAT, easy-medium):** $f(x)=k(3-x)$ for $0\le x\le3$, zero elsewhere. Find $P(1<X\le2)$.

**Soch:** Pehle area = 1 se $k$, phir interval ka integral.

**Solution:**
1. Area $=k\int_0^3(3-x)dx=k\left[3x-\frac{x^2}{2}\right]_0^3=k(9-4.5)=4.5k$. So $k=\frac{2}{9}$.
2. $P(1<X\le2)=\frac29\left[3x-\frac{x^2}2\right]_1^2=\frac29\left[(6-2)-(3-0.5)\right]=\frac29(1.5)=\frac13$.
Answer: **0.333**.

**Galti kahan hoti hai:** $k$ nikaale bina $\int_1^2(3-x)dx=1.5$ likh dena. 1.5 probability ho hi nahi sakti — ye check hamesha karo.

**Example 3 (NAT, medium):** $f(x)=4x^3$ on $[0,1]$. Find the median of $X$.

**Soch:** "Median" dekhte hi: $F$ banao, $F(m)=0.5$ solve karo.

**Solution:**
1. $F(x)=\int_0^x4t^3dt=x^4$.
2. $m^4=0.5\Rightarrow m=0.5^{1/4}\approx0.8409$.
Answer: **0.841**.

**Galti kahan hoti hai:** $F(0.5)=0.5^4=0.0625$ likh dena. Ye "0.5 se kam ki probability" hai, median nahi.

**Example 4 (MCQ, medium):** A train arrives at a time uniform on $[0,40]$ minutes. You have waited 15 minutes and it has not come. The probability it comes in the next 5 minutes is
(A) 0.125  (B) 0.2  (C) 0.5  (D) 0.75

**Soch:** Uniform + "given / has not come" → nayi duniya $(15,40]$, lengths ka ratio.

**Solution:**
1. Given $X>15$: length $40-15=25$.
2. Favourable $15<X\le20$: length 5.
3. $\frac5{25}=0.2$. Answer: **(B)**.

**Galti kahan hoti hai:** "Given" ignore karke $\frac5{40}=0.125$ (A) lena. Ya exponential jaisa "memoryless" maan lena — uniform me clock restart nahi hota.

**Example 5 (MSQ, medium):** $X$ is exponential with mean 3. Which statements are true?
(A) $\lambda=\frac13$  (B) $P(X>5\mid X>2)=e^{-1}$  (C) median of $X$ is 3  (D) $\mathrm{Var}(X)=3$

**Soch:** Mean se $\lambda$; "given $X>2$" → memoryless; median aur variance ke formulas.

**Solution:**
1. (A) $\lambda=1/\text{mean}=\frac13$. True.
2. (B) Memoryless: $P(X>5\mid X>2)=P(X>3)=e^{-3/3}=e^{-1}$. True.
3. (C) Median $=\frac{\ln2}{\lambda}=3\ln2\approx2.079\ne3$. False.
4. (D) $\mathrm{Var}=\frac1{\lambda^2}=9$. False.
Answer: **(A), (B)**.

**Galti kahan hoti hai:** (C) — mean ko median samajhna; (D) — variance ko mean ke barabar maan lena (wo Poisson ki property hai, exponential ki nahi).

**Example 6 (NAT, hard):** $X$ is exponential with $P(X>3)=0.4$. Let $N=\lfloor X\rfloor$. Find $P(N=1)$.

**Soch:** Floor of exponential → geometric with $q=e^{-\lambda}$. $q$ ko $\lambda$ nikaale bina bhi pa sakte hain.

**Solution:**
1. $e^{-3\lambda}=0.4\Rightarrow q=e^{-\lambda}=0.4^{1/3}\approx0.7368$.
2. $P(N=1)=q(1-q)=0.7368\times0.2632\approx0.1939$.
Answer: **0.194**.

**Galti kahan hoti hai:** $P(N=1)=P(X\le1)=1-q\approx0.263$ likh dena. $N=1$ ka matlab $1\le X<2$ hai, na ki $X\le1$.

## Confusions clear karo

**Q:** Density 1 se zyada kaise ho sakti hai?
**A:** Density probability nahi, "probability per unit length" hai. Agar interval chhota ho ($U(0,0.5)$), to area 1 banane ke liye height 2 chahiye. Probability hamesha area hai.

**Q:** $P(X<a)$ aur $P(X\le a)$ me farak?
**A:** Continuous me koi farak nahi, kyunki $P(X=a)=0$. Discrete (binomial, Poisson) me farak hota hai — wahan dhyan rakho.

**Q:** Mean aur median kab barabar hote hain?
**A:** Jab density symmetric ho (jaise uniform: dono $\frac{a+b}2$). Skewed ho to alag: exponential me median $\frac{\ln2}{\lambda}\approx0.693\times$mean.

**Q:** $\lambda$ rate hai ya mean?
**A:** Rate. Mean $=1/\lambda$. "Average 4 minute" → $\lambda=0.25$ per minute. "2 per hour" → $\lambda=2$, mean $=0.5$ hour.

**Q:** Uniform me "given" ke baad kya distribution banta hai?
**A:** Phir se uniform, bas chhote interval pe. Isliye answer lengths ka ratio hai.

**Q:** Memoryless sab distributions me kyun nahi hota?
**A:** Formula $\frac{P(X>s+t)}{P(X>s)}=P(X>t)$ tabhi chalega jab survival function $e^{-\lambda t}$ jaisa ho (product rule follow kare). Uniform me survival ek seedhi line hai, wahan ye fail hota hai.

**Q:** PDF diya hai ya CDF — kaise pehchaanu?
**A:** CDF $0$ se $1$ tak badhta hai aur $F(\text{end})=1$. PDF ka area 1 hai, value nahi. $F(x)=x^3$ CDF hai (aur $x=1$ pe 1 hai); uska PDF $3x^2$ hai.

## Khud try karo

**1.** $f(x)=k\,x(2-x)$ on $[0,2]$. Find $k$ and $P(X\le0.5)$.

<details><summary>Answer dekho</summary>

1. Area $=k\int_0^2(2x-x^2)dx=k\left(4-\frac83\right)=\frac43k=1\Rightarrow k=\frac34$.
2. $P(X\le0.5)=\frac34\left[x^2-\frac{x^3}{3}\right]_0^{0.5}=\frac34\left(0.25-\frac{0.125}{3}\right)=0.15625$.

</details>

**2.** $f(x)=\frac{x}{18}$ on $[0,6]$. Find the median.

<details><summary>Answer dekho</summary>

$F(x)=\frac{x^2}{36}$. $\frac{m^2}{36}=0.5\Rightarrow m^2=18\Rightarrow m=\sqrt{18}\approx4.243$.

</details>

**3.** $X\sim U(-2,6)$. Find $P(X>0\mid X<4)$, the mean and the variance.

<details><summary>Answer dekho</summary>

1. Given $X<4$: interval $(-2,4)$, length 6. Favourable $(0,4)$, length 4. Answer $=\frac46\approx0.667$.
2. Mean $=\frac{-2+6}2=2$.
3. Var $=\frac{8^2}{12}=\frac{64}{12}\approx5.333$.

</details>

**4.** Bulb lifetime is exponential with mean 200 h. It has run 150 h. Probability it runs at least 100 h more?

<details><summary>Answer dekho</summary>

Memoryless: $P(X>250\mid X>150)=P(X>100)=e^{-100/200}=e^{-0.5}\approx0.6065$. 150 h ka koi role nahi.

</details>

**5.** An exponential variable has median 2. Find $\lambda$ and the mean.

<details><summary>Answer dekho</summary>

$\frac{\ln2}{\lambda}=2\Rightarrow\lambda=\frac{\ln2}{2}\approx0.3466$. Mean $=\frac1\lambda=\frac{2}{\ln2}\approx2.885$.

</details>

## Ek page me

- Continuous: probability = area under PDF; $P(X=x)=0$, endpoints matter nahi karte.
- Valid PDF: $f\ge0$ aur total area 1. Constant ke liye area = 1 rakho (height = 1 nahi).
- $f(x)$ density hai, probability nahi; 1 se zyada ho sakti hai.
- $F(x)=P(X\le x)$, $F'=f$, $P(a<X\le b)=F(b)-F(a)$.
- $E[X]=\int xf$, $\mathrm{Var}=E[X^2]-(E[X])^2$.
- Median: **solve** $F(m)=0.5$; percentile: $F(x_q)=q$.
- $U(a,b)$: $f=\frac1{b-a}$, mean $\frac{a+b}2$, var $\frac{(b-a)^2}{12}$.
- Uniform given: $\frac{\text{len}(A\cap B)}{\text{len}(B)}$ — lengths divide karo, cut-offs nahi.
- Exponential: $P(X>t)=e^{-\lambda t}$, mean $\frac1\lambda$, var $\frac1{\lambda^2}$, median $\frac{\ln2}\lambda$; $\lambda=1/\text{mean}$.
- Memoryless: $P(X>s+t\mid X>s)=P(X>t)$ — clock restart.
- $\lfloor X\rfloor\sim$ Geometric on $\{0,1,\ldots\}$: $P(k)=(e^{-\lambda})^k(1-e^{-\lambda})$.

Revision ke liye **Short note** tab dekho.
