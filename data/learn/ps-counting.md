# Counting and event models

> **Time:** ~35 min · **Pehle aana chahiye:** Class 12 wala permutation–combination ($\binom{n}{r}$ ka matlab), fractions aur basic log · **Day:** 1 (hypergeometric Day 5 me dobara aata hai)

## Ye topic kyun?

Probability ka sabse pehla tareeka hai **ginna**: kitne outcomes hamare kaam ke hain, aur total kitne hain. GATE DA me 1–2 mark ke kaafi sawaal isi par hote hain: do dice ka sum, "4 ya 6 se divisible", "at least one fail", bina wapas daale balls nikalna, committee chunna. Ye sawaal aasaan dikhte hain, par galti hamesha ginti me hoti hai — overlap do baar gin liya, ya order wala numerator unordered denominator se divide kar diya. Ye lesson wahi galtiyan rokta hai.

## Picture se samjho

Socho do dice phenke — ek laal, ek neela. Laal par 1 aaye aur neele par 6, ye ek outcome hai. Laal par 6 aur neele par 1, ye **alag** outcome hai. Isliye saare outcomes ek 6×6 grid banate hain: 36 khaane, har khaana barabar chance wala.

<figure class="fig">
<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
<text x="170" y="20" text-anchor="middle" font-size="13" fill="currentColor">Die 2 →</text>
<text x="25" y="145" text-anchor="middle" font-size="13" fill="currentColor">Die 1 ↓</text>
<rect x="230" y="50" width="30" height="30" style="fill:var(--mark)"/>
<rect x="200" y="80" width="30" height="30" style="fill:var(--mark)"/>
<rect x="170" y="110" width="30" height="30" style="fill:var(--mark)"/>
<rect x="140" y="140" width="30" height="30" style="fill:var(--mark)"/>
<rect x="110" y="170" width="30" height="30" style="fill:var(--mark)"/>
<rect x="80" y="200" width="30" height="30" style="fill:var(--mark)"/>
<path d="M80 50V230M110 50V230M140 50V230M170 50V230M200 50V230M230 50V230M260 50V230M80 50H260M80 80H260M80 110H260M80 140H260M80 170H260M80 200H260M80 230H260" fill="none" stroke="currentColor" stroke-width="1"/>
<text x="95" y="42" text-anchor="middle" font-size="12" fill="currentColor">1</text>
<text x="125" y="42" text-anchor="middle" font-size="12" fill="currentColor">2</text>
<text x="155" y="42" text-anchor="middle" font-size="12" fill="currentColor">3</text>
<text x="185" y="42" text-anchor="middle" font-size="12" fill="currentColor">4</text>
<text x="215" y="42" text-anchor="middle" font-size="12" fill="currentColor">5</text>
<text x="245" y="42" text-anchor="middle" font-size="12" fill="currentColor">6</text>
<text x="68" y="70" text-anchor="middle" font-size="12" fill="currentColor">1</text>
<text x="68" y="100" text-anchor="middle" font-size="12" fill="currentColor">2</text>
<text x="68" y="130" text-anchor="middle" font-size="12" fill="currentColor">3</text>
<text x="68" y="160" text-anchor="middle" font-size="12" fill="currentColor">4</text>
<text x="68" y="190" text-anchor="middle" font-size="12" fill="currentColor">5</text>
<text x="68" y="220" text-anchor="middle" font-size="12" fill="currentColor">6</text>
<text x="170" y="252" text-anchor="middle" font-size="12" fill="currentColor">6 shaded cells: sum = 7  →  6/36</text>
</svg>
<figcaption>Do dice ke 36 ordered outcomes. Shaded diagonal par sum 7 hai.</figcaption>
</figure>

Dhyan do: sum 7 wale khaane ek diagonal par hain, aur aise 6 khaane hain. Sum 2 ke liye sirf ek khaana (1,1) hai, sum 12 ke liye bhi sirf ek (6,6). Matlab sums 2 se 12 **barabar chance wale nahi** hain — khaane barabar hain, sums nahi.

Ab doosri picture: 60 students me 35 Python padhte hain, 28 Statistics, aur 12 dono. Do gol ghere (Venn diagram) banao.

<figure class="fig">
<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="10" width="340" height="195" fill="none" stroke="currentColor"/>
<text x="20" y="28" font-size="12" fill="currentColor">U = 60 students</text>
<circle cx="140" cy="115" r="70" style="fill:var(--info);fill-opacity:0.15;stroke:var(--info)"/>
<circle cx="220" cy="115" r="70" style="fill:var(--good);fill-opacity:0.15;stroke:var(--good)"/>
<text x="95" y="38" text-anchor="middle" font-size="12" fill="currentColor">Python (35)</text>
<text x="270" y="38" text-anchor="middle" font-size="12" fill="currentColor">Stats (28)</text>
<text x="105" y="120" text-anchor="middle" font-size="16" fill="currentColor">23</text>
<text x="180" y="120" text-anchor="middle" font-size="16" fill="currentColor">12</text>
<text x="255" y="120" text-anchor="middle" font-size="16" fill="currentColor">16</text>
<text x="180" y="138" text-anchor="middle" font-size="10" fill="currentColor">both</text>
<text x="315" y="195" text-anchor="middle" font-size="12" fill="currentColor">neither 9</text>
</svg>
<figcaption>Overlap (12) dono gheron ke andar hai. 35 + 28 karoge to ye 12 do baar gin jayenge.</figcaption>
</figure>

Python ghere me 35 log hain, Stats ghere me 28. Agar seedha jod do (63), to beech wale 12 students do baar gine gaye. Isliye ek baar ghatao: $35+28-12=51$. Bache hue $60-51=9$ kisi ghere me nahi hain. Yahi **inclusion–exclusion** ki poori soch hai.

Teesri picture: dabbe me 4 laal (R) aur 3 neeli (B) balls. Do balls **bina wapas daale** (without replacement) nikalo.

<figure class="fig">
<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="30" cy="100" r="5" fill="currentColor"/>
<line x1="35" y1="97" x2="145" y2="52" stroke="currentColor"/>
<line x1="35" y1="103" x2="145" y2="148" stroke="currentColor"/>
<text x="75" y="62" font-size="12" fill="currentColor">R 4/7</text>
<text x="75" y="148" font-size="12" fill="currentColor">B 3/7</text>
<circle cx="150" cy="50" r="5" fill="currentColor"/>
<circle cx="150" cy="150" r="5" fill="currentColor"/>
<line x1="155" y1="48" x2="285" y2="25" style="stroke:var(--mark)" stroke-width="3"/>
<line x1="155" y1="52" x2="285" y2="75" stroke="currentColor"/>
<line x1="155" y1="148" x2="285" y2="125" stroke="currentColor"/>
<line x1="155" y1="152" x2="285" y2="175" stroke="currentColor"/>
<text x="200" y="28" font-size="12" fill="currentColor">R 3/6</text>
<text x="200" y="80" font-size="12" fill="currentColor">B 3/6</text>
<text x="200" y="128" font-size="12" fill="currentColor">R 4/6</text>
<text x="200" y="180" font-size="12" fill="currentColor">B 2/6</text>
<text x="295" y="29" font-size="12" fill="currentColor">RR = 12/42</text>
<text x="295" y="79" font-size="12" fill="currentColor">RB = 12/42</text>
<text x="295" y="129" font-size="12" fill="currentColor">BR = 12/42</text>
<text x="295" y="179" font-size="12" fill="currentColor">BB = 6/42</text>
</svg>
<figcaption>Bina replacement ke draws ka tree. Har draw ke baad dabba chhota ho jata hai, isliye doosri fractions badal jaati hain.</figcaption>
</figure>

Pehli ball laal hone ka chance $4/7$. Ek laal nikal gayi, ab 6 balls me 3 laal bachi, to doosri laal ka chance $3/6$. Dono laal: $\frac47\cdot\frac36=\frac{12}{42}=\frac{2}{7}$. Charon leaves ka total $42/42=1$ hai — ye check hamesha karo.

## Concept step-by-step

### 1. Sample space aur "equally likely"

**Sample space** matlab saare possible outcomes ki list. **Event** us list ka ek hissa (subset) hai. Agar har outcome ka chance barabar ho (equally likely), tab:

$$P(A)=\frac{\text{favourable outcomes}}{\text{total outcomes}}=\frac{|A|}{|S|}$$

Example: ek fair die par even number: $A=\{2,4,6\}$, $S=\{1,\dots,6\}$, to $P(A)=3/6=1/2$.

Dhyan do: ye formula **sirf** tab chalta hai jab outcomes equally likely hon. "Sum 2 se 12 tak 11 values hain, to $P(\text{sum}=7)=1/11$" — galat, kyunki sums equally likely nahi hain.

### 2. Dice aur coins: hamesha ordered outcomes

Dice aur coins ko alag-alag pehchana ja sakta hai (pehla die, doosra die). Isliye:
- 2 dice: $6\times6=36$ ordered pairs.
- 3 coins: $2\times2\times2=2^3=8$ outcomes (HHH, HHT, HTH, THH, HTT, THT, TTH, TTT).

**Sum ki ginti:** sum $s$ ke liye ways $=6-|s-7|$ (jab $2\le s\le 12$). Sum 7: $6$ ways, sum 10: $6-3=3$ ways — (4,6), (5,5), (6,4).

**At least 2 heads in 3 coins:** exactly 2 (HHT, HTH, THH = 3 outcomes) + exactly 3 (HHH = 1) = 4, to $4/8=1/2$. "Exactly 2" wale 3 outcomes $\binom{3}{2}$ hain: 3 positions me se 2 heads ke liye jagah chunni hai.

**Max (bada number) $=k$:** "dono dice $\le k$" wale outcomes $k\times k=k^2$ hain (har die ke paas $k$ options). Inme se "dono $\le k-1$" wale $(k-1)^2$ hain. Jo bache, unme kam se kam ek die exactly $k$ hai aur koi bhi $k$ se bada nahi — yani max exactly $k$. Isliye

$$P(\max=k)=\frac{k^2-(k-1)^2}{36}.$$

Example: max $=3$: $(9-4)/36=5/36$. List karke dekho: (3,1),(3,2),(3,3),(1,3),(2,3) = 5. ✓

Dhyan do: {1,6} likhne ka matlab do outcomes hai, (1,6) aur (6,1). Unordered gin loge to probability aadhi aayegi.

### 3. Complement aur "at least one"

**Complement** $A^c$ matlab "$A$ nahi hua". Kyunki ya to $A$ hota hai ya nahi, $P(A^c)=1-P(A)$.

"At least one" (kam se kam ek) ke bahut saare cases hote hain (1, 2, 3, ... ). Uska ulta sirf ek case hai: "ek bhi nahi" (none). Isliye:

$$P(\text{at least one})=1-P(\text{none}).$$

Agar $n$ independent trials hain aur har trial me success ka chance $p$ hai, to har trial me fail ka chance $q=1-p$. Sab fail: $q^n$ (independent hai to multiply). To

$$P(\ge 1 \text{ success})=1-(1-p)^n.$$

Example: 4 pumps, har ek ke fail hone ki prob 0.2, independent. $P(\text{kam se kam ek fail})=1-0.8^4=1-0.4096=0.5904$.

**Kitne trials chahiye?** Chahiye $1-q^n\ge c$, yani $q^n\le 1-c$. Dono taraf $\ln$ lo: $n\ln q\le\ln(1-c)$. Ab $\ln q$ negative hai (kyunki $q<1$), aur negative se divide karne par sign ulat jaata hai:

$$n\ge\frac{\ln(1-c)}{\ln q},\qquad n=\left\lceil\frac{\ln(1-c)}{\ln q}\right\rceil.$$

$\lceil\ \rceil$ matlab **upar ki taraf round** (ceiling). Example: $p=0.3$, $c=0.99$: $\ln0.01/\ln0.7=(-4.605)/(-0.3567)\approx12.91$, to $n=13$. (Check: $1-0.7^{12}\approx0.9862<0.99$, $1-0.7^{13}\approx0.9903$.)

"Kuch repeat hua" type sawaal bhi isi family ka hai: $P(\text{repeat})=1-P(\text{sab alag})$. 4 log, har ek ka birth month random (12 months): sab alag $=\frac{12\cdot11\cdot10\cdot9}{12^4}=\frac{11880}{20736}\approx0.573$, to kam se kam do ka same month $\approx0.427$.

Dhyan do: $n$ ko hamesha **round up** karo. 12.91 ko 12 karoge to 12 trials par probability 0.99 se kam reh jaayegi.

### 4. Union: do events (inclusion–exclusion)

"$A$ ya $B$" (union, $A\cup B$) matlab kam se kam ek hua. Picture me dekha ki $|A|+|B|$ me overlap do baar gina jaata hai, isliye ek baar ghatate hain:

$$|A\cup B|=|A|+|B|-|A\cap B|,\qquad P(A\cup B)=P(A)+P(B)-P(A\cap B).$$

Iske saath teen aur cheezein:
- **Neither** (dono nahi): $P(A^c\cap B^c)=1-P(A\cup B)$.
- **Exactly one**: $P(A)+P(B)-2P(A\cap B)$ (overlap dono me se hata do).
- **Bounds:** $P(A\cup B)\le1$ hona chahiye, isliye $P(A\cap B)\ge P(A)+P(B)-1$. Aur overlap kisi ek event se bada nahi ho sakta: $P(A\cap B)\le\min(P(A),P(B))$.

Example: $P(A)=0.5$, $P(B)=0.3$, $P(A\cap B)=0.1$. Union $=0.7$, neither $=0.3$, exactly one $=0.5+0.3-0.2=0.6$.

**Divisibility:** "1 se $N$ tak, $a$ se divisible" ki ginti $\lfloor N/a\rfloor$ hai ($\lfloor\ \rfloor$ = neeche round). "$a$ **aur** $b$ dono se divisible" matlab $\text{lcm}(a,b)$ ke multiples. Example 1–200, 4 ya 10 se: $50+20-\lfloor200/20\rfloor=50+20-10=60$.

Dhyan do: 4 aur 10 ka overlap 40 ke multiples nahi, **20** ke multiples hain (lcm, product nahi). 20 khud 4 aur 10 dono se divisible hai.

### 5. Union: teen events

Teen sets ke liye:

$$|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|.$$

**Kyun?** Ek student lo jo teeno me hai. Singles jodne par wo 3 baar gina gaya. Teen pairwise overlaps ghatane par 3 baar hata. Ab wo 0 baar gina hai! Isliye triple ko ek baar wapas jodte hain, aur wo exactly 1 baar gina jaata hai. Jo sirf do sets me hai: singles me 2 baar, ek pair me $-1$, total 1. ✓

Example: 80 users; A 40, B 30, C 25; AB 12, AC 8, BC 10; ABC 4. Union $=95-30+4=69$. None $=80-69=11$.

Dhyan do: triple ko jodna mat bhoolna — ye sabse common galti hai.

### 6. Combinations: jaldi recap

$\binom{n}{r}$ = $n$ cheezon me se $r$ chunne ke tareeke, jab **order matter nahi karta**:

$$\binom{n}{r}=\frac{n!}{r!(n-r)!},\quad \binom{n}{2}=\frac{n(n-1)}{2},\quad \binom{n}{3}=\frac{n(n-1)(n-2)}{6}.$$

Example: $\binom{7}{2}=\frac{7\cdot6}{2}=21$, $\binom{8}{3}=\frac{8\cdot7\cdot6}{6}=56$.

Dhyan do: $\binom72$ ko 42 likhna (2 se divide bhool gaye) bahut common hai. 42 to ordered pairs ki ginti hai.

### 7. Without replacement: ek hi route chuno

Bina wapas daale nikalne par do sahi tareeke hain:

**Route 1 — ordered (sequential fractions):** ek ke baad ek, har baar dabba chhota. 4R, 3B se dono laal: $\frac47\cdot\frac36=\frac{12}{42}=\frac27$.

**Route 2 — unordered (combinations):** laal me se 2 chunne ke tareeke / kul 2 chunne ke tareeke: $\frac{\binom42}{\binom72}=\frac{6}{21}=\frac27$. ✓ Same answer.

**Kyun same?** Ordered ginti me har unordered pair $2!$ baar aata hai, upar bhi aur neeche bhi. $\frac{4\cdot3}{7\cdot6}=\frac{\binom42\cdot2!}{\binom72\cdot2!}$, to $2!$ cut ho jaata hai.

**Galat (mixed) route:** upar ordered $4\cdot3=12$, neeche unordered $\binom72=21$: $12/21=4/7$ — double answer. Upar-neeche dono same type ke hone chahiye.

"Exactly 2 white out of 3" jaise sawaal me sequential route lo to har order (WWB, WBW, BWW) alag jodna padta hai; isliye combination route aksar aasaan hai.

Dhyan do: ordered/ordered ya unordered/unordered. Kabhi mix mat karo.

### 8. Hypergeometric

Setup: kul $N$ cheezein, unme $K$ "special" (jaise defective). Bina replacement $n$ nikali. $X$ = kitni special aayi. Tab

$$P(X=k)=\frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}.$$

**Kyun?** Neeche: $n$ chunne ke saare unordered tareeke. Upar: special group se $k$ chuno **aur** baaki group se $n-k$ chuno (multiply, kyunki dono choices saath hoti hain).

Check trick: neeche wale numbers jodo: $k+(n-k)=n$. Upar wale: $K+(N-K)=N$. Dono match hone chahiye.

**Mean:** $E[X]=n\cdot\frac{K}{N}$. Har ek draw ke special hone ka chance (akele dekho to) $K/N$ hai, aur $n$ draws hain.

Example: 8 men, 4 women, committee of 3, exactly 1 woman: $\frac{\binom41\binom82}{\binom{12}3}=\frac{4\cdot28}{220}=\frac{112}{220}\approx0.509$. Check: lower $1+2=3$, upper $4+8=12$. ✓ Mean women $=3\cdot\frac4{12}=1$.

Dhyan do: yahan binomial mat lagao. Har draw ke baad special ka anupaat badalta hai (pehla draw $4/12$, agar woman aayi to agla $3/11$), isliye $p$ constant nahi. Binomial sirf constant $p$ aur independent trials ke liye hai.

## Solved examples

**Example 1 (MCQ, easy):** Do fair dice phenke gaye. Sum kam se kam 9 hone ki probability kya hai?
(A) 1/6 (B) 5/18 (C) 4/11 (D) 1/4

**Soch:** Dice → 36 ordered outcomes. "At least 9" = sums 9, 10, 11, 12 ko alag gin kar jodo.

**Solution:**
1. Sum $s$ ke ways $=6-|s-7|$.
2. Sum 9: 4, sum 10: 3, sum 11: 2, sum 12: 1. Total $=10$.
3. $P=10/36=5/18$. **Answer (B).**

**Galti kahan hoti hai:** sums 2–12 ko equally likely maan kar "4 values me se 11" $=4/11$ (C) likhna. Ya unordered gin kar (4,5) aur (5,4) ko ek maan lena.

**Example 2 (NAT, easy):** 1 se 500 tak (dono shamil) kitne integers 6 ya 8 se divisible hain?

**Soch:** "ya" + overlap → inclusion–exclusion; overlap = lcm ke multiples.

**Solution:**
1. 6 se: $\lfloor500/6\rfloor=83$.
2. 8 se: $\lfloor500/8\rfloor=62$.
3. $\text{lcm}(6,8)=24$; dono se: $\lfloor500/24\rfloor=20$.
4. $83+62-20=125$. **Answer: 125.**

**Galti kahan hoti hai:** overlap ke liye $6\times8=48$ lena: $\lfloor500/48\rfloor=10$, answer 135 aa jaata hai. 24 bhi 6 aur 8 dono se divisible hai, isliye lcm chahiye.

**Example 3 (MSQ, medium):** Events $A$, $B$ ke liye $P(A)=0.7$ aur $P(B)=0.5$. Kaun se statements **zaroor** sahi hain?
(A) $P(A\cap B)\ge0.2$
(B) $A$ aur $B$ mutually exclusive ho sakte hain
(C) $P(A\cup B)\ge0.7$
(D) $P(A\cap B)=0.35$

**Soch:** Sirf $P(A)$, $P(B)$ diye hain, overlap nahi. "Must be true" → bounds wala idea (union $\le1$, overlap $\le$ chhota event).

**Solution:**
1. $P(A\cup B)=0.7+0.5-P(A\cap B)\le1$, to $P(A\cap B)\ge0.2$. (A) sahi.
2. Mutually exclusive matlab $P(A\cap B)=0$; par overlap kam se kam 0.2 hai. (B) galat.
3. $A\cup B$ me poora $A$ hai, to $P(A\cup B)\ge P(A)=0.7$. (C) sahi.
4. 0.35 sirf tab hota jab $A,B$ independent hote; ye diya nahi hai. Overlap 0.2 se 0.5 ke beech kuch bhi ho sakta hai. (D) galat.
**Answer: (A), (C).**

**Galti kahan hoti hai:** (D) tick karna — bina bataye independence maan kar $0.7\times0.5$ kar dena.

**Example 4 (NAT, medium):** Ek dabbe me 3 achhe aur 2 kharab fuse hain. Fuses ek-ek karke, bina wapas rakhe, test kiye jaate hain. Probability kya hai ki pehle 3 tests ke andar dono kharab fuse mil jaayein?

**Soch:** Without replacement. "Pehle 3 tests me dono kharab" = pehle 3 fuses (unordered set) me dono kharab hain → combination route.

**Solution:**
1. Pehle 3 tested fuses = 5 me se 3 ka random set. Total sets $\binom53=10$.
2. Favourable: dono kharab ($\binom22=1$) aur 1 achha ($\binom31=3$): $1\cdot3=3$.
3. $P=3/10=0.3$. **Answer: 0.3.**
4. Check (doosra tareeka): dono kharab fuses ki positions 5 me se 2 hain, $\binom52=10$ barabar options. Dono $\{1,2,3\}$ me: $\binom32=3$. Phir $3/10$. ✓

**Galti kahan hoti hai:** sirf "pehle do test kharab" $=\frac25\cdot\frac14=\frac1{10}$ nikaal kar ruk jaana. Teesre test tak ka mauka (FGF, GFF) chhoot gaya.

**Example 5 (NAT, medium):** 15 items ke lot me 4 defective hain. 5 items bina replacement nikale gaye. Exactly 1 defective aane ki probability (3 decimal tak) kya hai?

**Soch:** Fixed lot, without replacement, "exactly $k$" → hypergeometric. $N=15$, $K=4$, $n=5$, $k=1$.

**Solution:**
1. $\binom41=4$, $\binom{11}{4}=\frac{11\cdot10\cdot9\cdot8}{24}=330$.
2. $\binom{15}{5}=3003$.
3. $P=\frac{4\cdot330}{3003}=\frac{1320}{3003}\approx0.440$. **Answer: ≈ 0.440.**
4. (Bonus) Expected defectives $=5\cdot4/15\approx1.33$.

**Galti kahan hoti hai:** binomial lagana: $5\cdot\frac4{15}\cdot\left(\frac{11}{15}\right)^4\approx0.385$. Ye galat hai kyunki draws ke saath defective ka anupaat badalta hai.

**Example 6 (NAT, hard):** Har independent attempt me success ka chance 0.15 hai. Sabse chhota $n$ kya hai jisse $P(\text{at least one success})\ge0.9$?

**Soch:** "At least one" → $1-q^n$. "Smallest $n$" → log aur ceiling.

**Solution:**
1. $q=0.85$. Chahiye $1-0.85^n\ge0.9$, yani $0.85^n\le0.1$.
2. $n\ge\frac{\ln0.1}{\ln0.85}=\frac{-2.3026}{-0.1625}\approx14.17$.
3. Round up: $n=15$.
4. Check: $1-0.85^{14}\approx0.897$ (kam), $1-0.85^{15}\approx0.913$ (theek). **Answer: 15.**

**Galti kahan hoti hai:** 14.17 ko 14 kar dena. 14 par probability 0.897 hai jo 0.9 se kam hai.

## Confusions clear karo

**Q:** Do dice me (2,5) aur (5,2) alag kyun gine? Dice to same dikhte hain.
**A:** Dikhne me same hon tab bhi physically do alag dice hain. 36 ordered outcomes equally likely hain; unordered pairs nahi hain — {3,3} ka chance $1/36$ hai jabki {2,5} ka $2/36$.

**Q:** "At least one" aur "exactly one" me kya farak hai?
**A:** At least one = 1 ya zyada (union). Exactly one = sirf ek. Do events ke liye: at least one $=P(A)+P(B)-P(A\cap B)$, exactly one $=P(A)+P(B)-2P(A\cap B)$.

**Q:** Kab multiply karte hain aur kab add?
**A:** "Aur" (ek ke baad ek dono hon, ya do choices saath hon) → multiply. "Ya" jab cases alag-alag (overlap nahi) → add. Overlap ho to add ke baad overlap ghatao.

**Q:** Without replacement me sequential lun ya combinations?
**A:** Dono sahi hain agar consistent raho. Specific order puchha ho (pehla laal, doosra neela) to sequential aasaan. "Exactly $k$ in sample" puchha ho to combinations aasaan, kyunki saare orders apne aap gin jaate hain.

**Q:** Hypergeometric aur binomial me kaise pehchanun?
**A:** Bina replacement, fixed lot se → hypergeometric. With replacement, ya har trial independent aur same $p$ → binomial. Bahut bada lot ho aur chhota sample, to dono ka answer kareeb aata hai, par exact answer hypergeometric hi hai.

**Q:** lcm kyun, product kyun nahi?
**A:** "4 aur 6 dono se divisible" ka matlab common multiple hai. Sabse chhota common multiple 12 hai, aur har common multiple 12 ka multiple hota hai. 24 lene par 12, 36, 60, ... chhoot jaate hain.

**Q:** $P(A\cap B)$ diya nahi hai to kya $P(A)P(B)$ le lun?
**A:** Nahi. Wo sirf independence diya ho tab. Warna sirf bounds pata hote hain: $\max(0,P(A)+P(B)-1)\le P(A\cap B)\le\min(P(A),P(B))$.

## Khud try karo

**1.** Do fair dice phenke. Bada number (max) exactly 5 hone ki probability?

<details><summary>Answer dekho</summary>

Formula: $\frac{5^2-4^2}{36}=\frac{25-16}{36}=\frac{9}{36}=0.25$.
List: (5,1)…(5,5) = 5, plus (1,5)…(4,5) = 4, total 9. ✓

</details>

**2.** 120 students: 60 ML, 50 DB, 40 Stats. ML∩DB = 20, ML∩Stats = 15, DB∩Stats = 10, teeno = 6. Kitne students in teeno me se koi nahi padhte?

<details><summary>Answer dekho</summary>

1. Singles: $60+50+40=150$.
2. Pairs: $20+15+10=45$.
3. Union $=150-45+6=111$.
4. None $=120-111=9$.

</details>

**3.** 4 fair coins uchhale. Exactly 2 heads ki probability?

<details><summary>Answer dekho</summary>

Total $2^4=16$ ordered outcomes. 2 heads ki positions: $\binom42=6$. $P=6/16=3/8=0.375$.

</details>

**4.** 3-digit code, har digit 0–9 se random (repetition allowed). Kam se kam ek digit repeat hone ki probability?

<details><summary>Answer dekho</summary>

Complement: sab digits alag $=\frac{10\cdot9\cdot8}{10^3}=0.72$. Repeat $=1-0.72=0.28$.

</details>

**5.** Bag me 6 laal aur 4 neeli balls. 2 bina replacement nikali. Ek laal aur ek neeli aane ki probability?

<details><summary>Answer dekho</summary>

Unordered route: $\frac{\binom61\binom41}{\binom{10}2}=\frac{24}{45}=\frac8{15}\approx0.533$.
Ordered check: RB + BR $=\frac6{10}\cdot\frac49+\frac4{10}\cdot\frac69=\frac{24}{90}+\frac{24}{90}=\frac{48}{90}=\frac8{15}$. ✓

</details>

## Ek page me

- Counting formula $|A|/|S|$ sirf equally likely outcomes par chalta hai.
- Dice/coins ordered: 2 dice = 36, 3 coins = 8. (1,6) aur (6,1) alag.
- Sum $s$ ke ways $=6-|s-7|$; $P(\max=k)=(k^2-(k-1)^2)/36$.
- $P(A\cup B)=P(A)+P(B)-P(A\cap B)$; neither $=1-$ union; exactly one me overlap 2 baar ghatao.
- Teen sets: singles − pairs + triple.
- "Divisible by $a$ ya $b$": overlap = $\text{lcm}(a,b)$ ke multiples.
- Overlap bounds: $\max(0,P(A)+P(B)-1)\le P(A\cap B)\le\min(P(A),P(B))$.
- At least one $=1-P(\text{none})$; independent: $1-(1-p)^n$.
- Smallest $n$: $\lceil\ln(1-c)/\ln q\rceil$ — hamesha round up.
- Without replacement: ordered/ordered ya unordered/unordered, mix kabhi nahi.
- Hypergeometric $\binom Kk\binom{N-K}{n-k}/\binom Nn$, mean $nK/N$; binomial nahi kyunki $p$ badalta hai.
- $\binom n2=n(n-1)/2$ — 2 se divide mat bhoolo.

Revision ke liye **Short note** tab dekho.
