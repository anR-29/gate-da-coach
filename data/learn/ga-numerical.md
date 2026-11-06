# Numerical ability

> **Time:** ~35 min · **Pehle aana chahiye:** Class 10 arithmetic (fractions, percentage), basic log · **Day:** GA rotation me (har din ke page pe us din ka GA topic likha hota hai)

## Ye topic kyun?

GATE GA ke 10 questions me se lagbhag 3–4 seedhe arithmetic hote hain: ratio, mixture, percentage, average, time–work, log/digits, chhoti probability, growth aur estimation. 1-mark wale ek step ke hote hain; 2-mark wale me 2–3 steps jodne padte hain (jaise election ya mixture). Formulas chhote hain — galti **"kya poocha hai"** padhne me hoti hai (part vs total, final vs added). Ye lesson har method ko "kyun" ke saath sikhata hai taaki tum ratna band karo.

## Picture se samjho

Ratio ko **dabbe (boxes)** ki tarah socho. "Boys : Girls = 5 : 7" ka matlab hai: kuch equal size ke dabbe hain, boys ko 5 mile, girls ko 7. Har dabba ek "part" hai.

<figure class="fig">
<svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="45" fill="currentColor" font-size="14">Boys</text>
<rect x="80" y="25" width="40" height="30" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<rect x="120" y="25" width="40" height="30" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<rect x="160" y="25" width="40" height="30" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<rect x="200" y="25" width="40" height="30" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<rect x="240" y="25" width="40" height="30" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<text x="300" y="45" style="fill:var(--info)" font-size="13">5 parts</text>
<text x="20" y="100" fill="currentColor" font-size="14">Girls</text>
<rect x="80" y="80" width="40" height="30" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<rect x="120" y="80" width="40" height="30" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<rect x="160" y="80" width="40" height="30" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<rect x="200" y="80" width="40" height="30" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<rect x="240" y="80" width="40" height="30" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<rect x="280" y="80" width="40" height="30" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<rect x="320" y="80" width="40" height="30" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<text x="380" y="100" style="fill:var(--mark)" font-size="13">7 parts = 21</text>
<text x="100" y="100" text-anchor="middle" fill="currentColor" font-size="12">3</text>
<text x="100" y="45" text-anchor="middle" fill="currentColor" font-size="12">3</text>
<text x="260" y="145" text-anchor="middle" fill="currentColor" font-size="13">1 part = 21 ÷ 7 = 3 → total = 12 parts = 36</text>
</svg>
<figcaption>Ratio = equal dabbe. Pehle ek dabbe ki value nikalo, phir jitne dabbe poochhe utne se guna karo.</figcaption>
</figure>

Dekho, "21 girls" se seedha "1 part = 3" mil gaya. Ab boys = 5 × 3 = 15, total = 12 × 3 = 36. Question "how many students" poochhta hai — yaani **total** 36, boys 15 nahi.

Doosri picture **alligation** (do strength ko milana) ki hai. Ek kamzor (weak) aur ek strong solution milao, beech ka mean milta hai. Mean jis taraf zyada kheencha jaata hai, us cheez ki quantity zyada hai.

<figure class="fig">
<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">
<text x="110" y="30" text-anchor="middle" fill="currentColor" font-size="14">Weak W = 30%</text>
<text x="410" y="30" text-anchor="middle" fill="currentColor" font-size="14">Strong S = 70%</text>
<text x="260" y="100" text-anchor="middle" style="fill:var(--mark)" font-size="15">Mean M = 40%</text>
<line x1="140" y1="40" x2="380" y2="160" stroke="currentColor" stroke-width="1.5"/>
<line x1="380" y1="40" x2="140" y2="160" stroke="currentColor" stroke-width="1.5"/>
<text x="110" y="180" text-anchor="middle" style="fill:var(--good)" font-size="14">S − M = 30</text>
<text x="410" y="180" text-anchor="middle" style="fill:var(--good)" font-size="14">M − W = 10</text>
<text x="260" y="196" text-anchor="middle" style="fill:var(--muted)" font-size="12">weak : strong = 30 : 10 = 3 : 1</text>
</svg>
<figcaption>Cross (X) diagram: diagonal ke ant me difference likho. Weak ke neeche (S − M), strong ke neeche (M − W).</figcaption>
</figure>

Mean 40 weak (30) ke bahut paas hai, toh weak solution zyada hona chahiye — aur sach me weak : strong = 3 : 1 aaya. Ye "kis taraf paas" wala sense tumhe check deta hai ki ratio ulta toh nahi likh diya.

## Concept step-by-step

### 1. Ratio: ek part nikalo

**Idea:** Ratio $a : b$ batata hai ki cheez $a + b$ equal hisson me bati hai.

**Formula:** Total $T$ ho toh ek part $= \dfrac{T}{a+b}$. Agar sirf ek hissa ($b$ wala) $= B$ diya ho, toh ek part $= B/b$.

**Example:** Boys : Girls = 5 : 7, girls = 21. Ek part = 21/7 = 3. Total = (5+7) × 3 = **36**.

**Dhyan do:** "how many" ke baad wala noun underline karo — students (total), boys (part), ya difference?

### 2. Mixture: jo nahi daala, woh fixed hai

**Idea:** Agar sirf paani daal rahe ho, toh doodh ki quantity **badalti nahi**. Naya ratio usi fixed cheez par set karo.

**Method:** (1) Purani quantities nikalo. (2) Fixed component ko naye ratio me rakho. (3) Doosra component nikalo. (4) Answer = naya − purana.

**Example:** 60 L mixture, milk : water = 7 : 3 → milk 42, water 18. Naya ratio 3 : 2 chahiye, milk 42 fixed. 3 parts = 42 → 1 part = 14 → water = 28. Daalna = 28 − 18 = **10 L**.

**Dhyan do:** 28 likh dena (final water) galat hai — question "how much must be **added**" hai.

### 3. Alligation

**Idea:** Do strength $W$ (weak) aur $S$ (strong) milao, result $M$.

**Formula:** $\text{weak} : \text{strong} = (S - M) : (M - W)$.

**Kyun:** Weak ki quantity $x$, strong ki $y$. Total "strength" balance: $Wx + Sy = M(x+y)$. Rearrange: $x(M - W) = y(S - M)$, isliye $x/y = (S-M)/(M-W)$.

**Example:** 30% acid aur 70% acid se 40% banana hai, strong = 20 L. weak : strong = (70−40) : (40−30) = 3 : 1. Toh weak = 3 × 20 = **60 L**.

**Dhyan do:** Ratio ulta likhna (1 : 3) bahut common hai. Check: mean weak ke paas hai toh weak zyada hona chahiye.

### 4. Successive percentage change: multiply karo

**Idea:** Doosra % change purane value par nahi, **naye** value par lagta hai. Isliye % add nahi hote.

**Formula:** $p$ phir $q$ change → final factor $(1+p)(1+q)$. Net change $= (1+p)(1+q) - 1$.

**Example:** +20% phir −20%: $1.2 \times 0.8 = 0.96$ → net **−4%**, zero nahi.

**Dhyan do:** Revenue wala shortcut bhi isi se aata hai: price $c$ fraction se kam, toh quantity factor $> \dfrac{1}{1-c}$ chahiye (20% cut → quantity 1.25 guna se zyada).

### 5. Digits aur logs

**Idea:** $10^k$ me $k+1$ digits hote hain ($10^2 = 100$ → 3 digits). Jo number $10^k$ aur $10^{k+1}$ ke beech ho, uske bhi $k+1$ digits.

**Formula:** Digits of $N$ $= \lfloor \log_{10} N \rfloor + 1$. ($\lfloor x \rfloor$ = floor = $x$ se chhota ya barabar sabse bada integer.)

**Log rules:** $\log_b 1 = 0$ (kyunki $b^0 = 1$), $\log_b b^k = k$, $\log_b(1/x) = -\log_b x$, $\log(a^n) = n \log a$.

**Example:** $2^{50}$: $\log_{10} 2^{50} = 50 \times 0.301 = 15.05$. Floor = 15, digits = **16**.
Aur: $\log_2 8 + \log_3 \tfrac19 - \log_5 1 = 3 + (-2) - 0 = $ **1**.

**Dhyan do:** 15 likhna (floor bhool kar +1 nahi karna) — sabse common galti.

### 6. Averages: hamesha sum me socho

**Idea:** Average khud ek "jodne layak" cheez nahi hai. Sum jodne/ghatane layak hai.

**Formula:** Sum $= n \times$ mean. Removed number $= n \cdot \text{old mean} - (n-1)\cdot\text{new mean}$.

**Example:** 5 numbers ka average 18 → sum 90. Ek hataya, 4 ka average 16 → sum 64. Hataya gaya = 90 − 64 = **26**.

**Dhyan do:** "18 − 16 = 2" — averages ko seedha ghatana bilkul galat hai.

### 7. Time and work: rates add karo

**Idea:** Jo kaam $a$ din me poora karta hai, woh roz $1/a$ kaam karta hai. Ye "rate" hai. Do log saath ho toh **rates** judte hain, din nahi.

**Formula:** Saath rate $= \dfrac1a + \dfrac1b$; time $= \dfrac{1}{\text{rate}}$. Pipe jo khaali kare, uska rate minus.

**Example:** A 12 din, B 18 din. Saath rate $= \frac1{12} + \frac1{18} = \frac{5}{36}$. 4 din me $\frac{20}{36} = \frac59$ kaam. Bacha $\frac49$. B akela: $\frac49 \div \frac1{18} = $ **8 din**.

**Dhyan do:** "(12 + 18)/2 = 15 din saath me" — galat. Do log saath ho toh time kam hona chahiye, dono se kam.

### 8. Speed, distance, time (bonus, same rate idea)

**Idea:** Speed bhi ek rate hai: distance ÷ time.

**Formula:** Equal distance do speeds $a$ aur $b$ se → average speed $= \dfrac{2ab}{a+b}$ (simple average nahi). Kyun: total distance $2d$, total time $\frac da + \frac db$.

**Example:** Jaate 40 km/h, aate 60 km/h → $\frac{2 \times 40 \times 60}{100} = $ **48 km/h**, 50 nahi.

**Dhyan do:** Slow speed par zyada **time** lagta hai, isliye average uski taraf jhukta hai.

### 9. Dice/coin probability: ordered outcomes gino

**Idea:** Do dice = 36 equally likely **ordered** pairs (pehla die, doosra die). Sum equally likely nahi hote.

**Example:** Sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 → $P = \frac5{36}$. Sum 7 me 6 pairs → $\frac6{36} = \frac16$ (sabse likely sum).

**Dhyan do:** "Sum 2 se 12 tak 11 values, toh har ek 1/11" — galat; sum 2 ka sirf ek pair hai, sum 7 ke chhe.

### 10. Compound growth aur rule of 72

**Idea:** Har saal $r$ badhna = har saal $(1+r)$ se guna. $n$ saal baad factor $(1+r)^n$.

**Shortcut:** Double hone me lagbhag $72/r$ saal (r percent me). Ye sirf **estimate** hai — dono paas wale integer years check karo.

**Example:** 10% growth: $72/10 = 7.2$. Check: $1.1^7 = 1.949 < 2$, $1.1^8 = 2.144 > 2$. Pehli baar double se zyada: **8 saal**.

**Dhyan do:** 7 likhna (rule of 72 ko round karke) — off-by-one trap.

### 11. Estimation aur number series

**Estimation:** Har number ko 1–2 significant figures me round karo aur power of 10 alag rakho.
$\dfrac{49.8 \times 0.0198}{0.251} \approx \dfrac{50 \times 2\times10^{-2}}{2.5 \times 10^{-1}} = \dfrac{1}{0.25} = 4$. (Exact ≈ 3.93.)

**Series:** Differences dekho, ya ratio, ya $2^n$ / squares ke paas. 3, 7, 15, 31, 63: differences 4, 8, 16, 32 (double ho rahe) → agla difference 64 → **127**. Ya pattern "×2 + 1" ($2^n - 1$).

**Dhyan do:** Estimation me decimal ka ek place khona = answer 10 guna galat. Isliye $a \times 10^k$ form likho.

## Solved examples

**Example 1 (MCQ, 1 mark, easy):** In a bag, the ratio of red to blue balls is 4 : 9. If there are 36 blue balls, how many balls are in the bag?
(A) 16  (B) 36  (C) 52  (D) 117

**Soch:** Ratio + ek hissa diya → ek part nikalo. Noun "balls in the bag" = total.

**Solution:**
1. Blue = 9 parts = 36 → 1 part = 4.
2. Total = (4 + 9) × 4 = **52**.
3. Answer: **(C)**.

**Galti kahan hoti hai:** 16 (red) likh dena — part nikal kar ruk jaana. Ya 117 (36 × 13/4) — ratio ulta lagana.

**Example 2 (MCQ, 1 mark, easy):** A shirt's price is raised by 30% and then the new price is reduced by 30%. The final price compared to the original is:
(A) the same  (B) 9% lower  (C) 9% higher  (D) 3% lower

**Soch:** Do successive % changes → factors multiply.

**Solution:**
1. Factor $= 1.3 \times 0.7 = 0.91$.
2. Net $= 0.91 - 1 = -0.09$ → **9% lower**.
3. Answer: **(B)**.

**Galti kahan hoti hai:** +30 − 30 = 0 → (A). Doosra 30% bade price par lagta hai, isliye zyada ghatata hai.

**Example 3 (NAT, 1 mark, medium):** An 80-litre mixture contains milk and water in the ratio 3 : 1. How many litres of water must be added so that the ratio becomes 3 : 2?

**Soch:** Sirf water daal rahe → milk fixed.

**Solution:**
1. Milk = 80 × 3/4 = 60 L, water = 20 L.
2. Naya ratio 3 : 2, milk 60 = 3 parts → 1 part = 20 → water = 40 L.
3. Add = 40 − 20 = **20**.

**Galti kahan hoti hai:** 40 likhna (final water). Ya total 80 ko 3 : 2 me baant kar water = 32 lena — total bhi badal raha hai, isliye fixed cheez sirf milk hai.

**Example 4 (MSQ, 1 mark, medium):** Which of the following statements are correct? (Use $\log_{10} 3 = 0.4771$.)
(A) $3^{20}$ has 10 digits.
(B) When two fair dice are rolled, P(sum = 7) = 1/11.
(C) $\log_4 \tfrac{1}{16} = -2$.
(D) If A alone takes 10 days and B alone takes 15 days, together they take 12.5 days.

**Soch:** Char alag mini-rules: digits, ordered outcomes, log rule, rates.

**Solution:**
1. (A) $20 \times 0.4771 = 9.542$ → floor 9 → digits 10 ✔. (Exact: $3^{20} = 3486784401$.)
2. (B) Sum 7 ke 6 ordered pairs / 36 = 1/6 ✘.
3. (C) $16 = 4^2$, toh $\log_4 \frac1{16} = -2$ ✔.
4. (D) Rate $= \frac1{10} + \frac1{15} = \frac16$ → **6 din** ✘.
5. Answer: **(A) and (C)**.

**Galti kahan hoti hai:** (B) — 11 possible sums ko equally likely maanna. (D) — dono ke din ka average lena.

**Example 5 (NAT, 2 marks, medium):** In a two-candidate election, 5% of the voters on the list did not vote, and 100 of the votes cast were invalid. The winner got 55% of the valid votes and won by 180 votes. How many voters were on the list?

**Soch:** Ulta chalna hai: margin → valid → cast → list. Noun = "voters on the list".

**Solution:**
1. Winner 55%, loser 45% of valid $V$. Margin $= 0.10V = 180$ → $V = 1800$.
2. Votes cast = valid + invalid = 1800 + 100 = 1900.
3. Cast = 95% of list → list $= 1900 / 0.95 = $ **2000**.

**Galti kahan hoti hai:** 1800 (valid) ya 1900 (cast) pe ruk jaana. Teen alag "totals" hain; question sabse bada wala maangta hai.

**Example 6 (NAT, 2 marks, hard):** A sum of money grows at 8% per year, compounded yearly. After how many full years does it **first exceed** twice its initial value?

**Soch:** Doubling → rule of 72 se estimate, phir do integer years check.

**Solution:**
1. Estimate: $72/8 = 9$ saal.
2. Check $n = 9$: $1.08^9 = 1.9990$ — 2 se **thoda kam**.
3. Check $n = 10$: $1.08^{10} = 2.1589 > 2$.
4. Answer: **10**.

**Galti kahan hoti hai:** Rule of 72 ka 9 seedha likh dena. $1.08^9$ sirf 1.999 hai — "exceed" nahi karta.

## Confusions clear karo

**Q:** Mixture me kabhi total fixed hota hai, kabhi ek component — kaise pata?
**A:** Dekho kya **daala ya nikala** ja raha hai. Sirf paani daala → doodh fixed. Mixture nikaal kar paani se replace kiya → total fixed, dono component badalte hain.

**Q:** Alligation ka ratio kaunsa kis taraf likhun?
**A:** Weak ke saamne $(S - M)$, yaani **door wale** ka difference. Sense-check: mean jiske paas, woh cheez zyada.

**Q:** Floor kya hota hai?
**A:** Decimal hata do (positive numbers ke liye): $\lfloor 15.05 \rfloor = 15$, $\lfloor 9.99 \rfloor = 9$. Digits = floor + 1.

**Q:** Rule of 72 kab bharosemand hai?
**A:** Sirf estimate ke liye. Exam me answer integer year hota hai, aur boundary ke paas (jaise 8% par 9 vs 10 saal) galti hoti hai. Hamesha do candidate years compute karo.

**Q:** Work questions me "efficiency" ka kya matlab?
**A:** Efficiency = rate. "A, B se do guna efficient" = A ka rate B ka do guna = A aadhe din leta hai.

**Q:** Average speed hamesha $2ab/(a+b)$?
**A:** Sirf jab dono parts me **distance** barabar ho. Agar **time** barabar ho, toh simple average $(a+b)/2$ sahi hai.

## Khud try karo

**1.** The average of six numbers is 20. When one number is removed, the average of the rest is 18. Find the removed number.

<details><summary>Answer dekho</summary>

Sum before = 6 × 20 = 120. Sum after = 5 × 18 = 90. Removed = 120 − 90 = **30**.

</details>

**2.** Rice at ₹40/kg and ₹60/kg is mixed to get ₹52/kg. In what ratio (cheap : costly)?

<details><summary>Answer dekho</summary>

Alligation: cheap : costly = (60 − 52) : (52 − 40) = 8 : 12 = **2 : 3**. Check: 52 costly ke paas hai, toh costly zyada ✔.

</details>

**3.** Pipe A fills a tank in 6 h, pipe B in 9 h, and pipe C empties it in 12 h. All open together — how long to fill?

<details><summary>Answer dekho</summary>

Rate $= \frac16 + \frac19 - \frac1{12} = \frac{6 + 4 - 3}{36} = \frac{7}{36}$. Time $= \frac{36}{7} \approx$ **5.14 h**.

</details>

**4.** Two fair dice are rolled. P(sum = 9)?

<details><summary>Answer dekho</summary>

Ordered pairs: (3,6), (4,5), (5,4), (6,3) = 4. $P = 4/36 = $ **1/9**.

</details>

**5.** $\dfrac{0.0391 \times 5020}{19.8}$ is closest to: 1, 10, 100, 1000?

<details><summary>Answer dekho</summary>

$\approx \dfrac{4\times10^{-2} \times 5\times10^{3}}{2\times10^{1}} = \dfrac{200}{20} = 10$. Exact ≈ 9.91 → **10**.

</details>

## Ek page me

- Ratio $a : b$: ek part $= T/(a+b)$; pehle underline karo ki part, total ya change poocha hai.
- Mixture: jo component nahi daala, woh fixed; answer = naya − purana.
- Alligation: weak : strong $= (S - M) : (M - W)$; mean jiske paas, woh zyada.
- Successive %: factors multiply; +20% −20% = −4%.
- Price $c$ cut → quantity factor $> 1/(1-c)$ chahiye.
- Digits $= \lfloor \log_{10} N \rfloor + 1$; $\log_b 1 = 0$, $\log_b(1/x) = -\log_b x$.
- Averages: sum $= n \times$ mean; removed $= n\cdot$old $- (n-1)\cdot$new.
- Work: rates add ($1/a + 1/b$), time $= 1/\text{rate}$; emptying pipe minus.
- Equal distances: average speed $= 2ab/(a+b)$.
- Two dice: 36 ordered pairs; P(7) = 6/36, P(8) = 5/36.
- Growth: $(1+r)^n$; rule of 72 sirf estimate — $1.1^7 \approx 1.95$, $1.1^8 \approx 2.14$; $1.08^9 \approx 1.999$.
- Estimation: $a \times 10^k$ form me likho, decimal mat khoo.

Revision ke liye **Short note** tab dekho.
