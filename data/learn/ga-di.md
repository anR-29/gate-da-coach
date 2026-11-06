# Data interpretation

> **Time:** ~30 min · **Pehle aana chahiye:** percentage aur average (Class 8–10 level) · **Day:** GA rotation me (har din ke page pe us din ka GA topic likha hota hai)

## Ye topic kyun?

Data Interpretation (DI) me tumhe ek bar chart, line chart, pie ya table diya jaata hai, aur usse ek number nikaalna hota hai: percent change, share, weighted average, ya "kaunsa sabse zyada badha". GATE GA me har saal 1–2 DI questions aate hain, 1-mark aur 2-mark dono. Maths aasaan hai; marks **base galat lene**, **absolute aur % change mix karne**, aur **average ka average** lene me jaate hain. Ye lesson un sab ko ek fixed checklist se pakadna sikhata hai.

## Picture se samjho

Neeche ek company ke chaar products ka export (₹ crore) hai, 2023 aur 2024 me. Ek hi chart se do alag sawaal poochhe ja sakte hain: "kiska export sabse **zyada rupaye** badha?" aur "kiska export sabse zyada **percent** badha?" Dono ka jawab alag hai.

<figure class="fig">
<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" font-size="12">
<text x="40" y="18" fill="currentColor" font-size="13">Exports (₹ crore)</text>
<rect x="400" y="8" width="12" height="12" style="fill:var(--info);opacity:0.5"/>
<text x="416" y="19" fill="currentColor">2023</text>
<rect x="455" y="8" width="12" height="12" style="fill:var(--mark);opacity:0.7"/>
<text x="471" y="19" fill="currentColor">2024</text>
<path d="M50 30V200H500" fill="none" stroke="currentColor"/>
<rect x="70" y="118.4" width="36" height="81.6" style="fill:var(--info);opacity:0.5"/>
<rect x="108" y="98" width="36" height="102" style="fill:var(--mark);opacity:0.7"/>
<text x="88" y="114" text-anchor="middle" fill="currentColor">120</text>
<text x="126" y="94" text-anchor="middle" fill="currentColor">150</text>
<text x="107" y="216" text-anchor="middle" fill="currentColor">P</text>
<rect x="180" y="172.8" width="36" height="27.2" style="fill:var(--info);opacity:0.5"/>
<rect x="218" y="161.9" width="36" height="38.1" style="fill:var(--mark);opacity:0.7"/>
<text x="198" y="168" text-anchor="middle" fill="currentColor">40</text>
<text x="236" y="157" text-anchor="middle" fill="currentColor">56</text>
<text x="217" y="216" text-anchor="middle" fill="currentColor">Q</text>
<rect x="290" y="64" width="36" height="136" style="fill:var(--info);opacity:0.5"/>
<rect x="328" y="36.8" width="36" height="163.2" style="fill:var(--mark);opacity:0.7"/>
<text x="308" y="60" text-anchor="middle" fill="currentColor">200</text>
<text x="346" y="33" text-anchor="middle" fill="currentColor">240</text>
<text x="327" y="216" text-anchor="middle" fill="currentColor">R</text>
<rect x="400" y="138.8" width="36" height="61.2" style="fill:var(--info);opacity:0.5"/>
<rect x="438" y="144.9" width="36" height="55.1" style="fill:var(--mark);opacity:0.7"/>
<text x="418" y="134" text-anchor="middle" fill="currentColor">90</text>
<text x="456" y="140" text-anchor="middle" fill="currentColor">81</text>
<text x="437" y="216" text-anchor="middle" fill="currentColor">S</text>
<text x="275" y="234" text-anchor="middle" style="fill:var(--muted)">Product</text>
</svg>
<figcaption>Chaar products, do saal. R ka bar sabse zyada uthta hai, par percent me sabse tez Q badha.</figcaption>
</figure>

Calculate karo:

| Product | 2023 | 2024 | Change (₹ cr) | % change | new/old |
|---|---|---|---|---|---|
| P | 120 | 150 | +30 | +25% | 1.25 |
| Q | 40 | 56 | +16 | **+40%** | 1.40 |
| R | 200 | 240 | **+40** | +20% | 1.20 |
| S | 90 | 81 | −9 | −10% | 0.90 |

R ne sabse zyada rupaye jode (40), par uska base bhi sabse bada tha (200), isliye percent sirf 20%. Q chhota tha (40), 16 jodne se 40% badh gaya. Aankh R par jaati hai — yahi trap hai. Aur S ka bar **gira** hai; "largest change" poochha ho toh pehle sign (+/−) dekho.

Doosri picture **base** ki hai. Percent hamesha "kis cheez ka percent" hota hai.

<figure class="fig">
<svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" font-size="13">
<rect x="40" y="55" width="90" height="40" rx="6" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<text x="85" y="80" text-anchor="middle" fill="currentColor">100</text>
<rect x="390" y="55" width="90" height="40" rx="6" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<text x="435" y="80" text-anchor="middle" fill="currentColor">125</text>
<path d="M135 60 Q260 5 385 60" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<polygon points="385,60 373,57 378,49" style="fill:var(--good)"/>
<text x="260" y="25" text-anchor="middle" style="fill:var(--good)">+25 on base 100 = +25%</text>
<path d="M385 90 Q260 145 135 90" fill="none" style="stroke:var(--bad)" stroke-width="2"/>
<polygon points="135,90 147,93 142,101" style="fill:var(--bad)"/>
<text x="260" y="140" text-anchor="middle" style="fill:var(--bad)">−25 on base 125 = −20%</text>
</svg>
<figcaption>Wahi 25 ka farak, par base badla toh percent badla. Base = jis value SE compare kar rahe ho (purani value).</figcaption>
</figure>

100 se 125 jaana +25% hai, par 125 se 100 aana sirf −20% hai. Isliye har division se pehle likho: "base = …".

## Concept step-by-step

### 1. Chart ko pehle padho, numbers baad me

**Idea:** Galat column ya galat unit padhna sabse sasti galti hai.

**Checklist:** (1) Title aur unit (₹ crore? lakh? %?). (2) Legend — kaunsa colour kaunsa saal. (3) Axis labels. (4) Agar bar ke upar value **likhi** hai, toh wahi use karo; bar ki height aankh se mat naapo.

**Example:** Upar wale chart me unit "₹ crore" hai. "Total 2024 exports" = 150 + 56 + 240 + 81 = 527 crore.

**Dhyan do:** Question me "2023" likha ho aur tum 2024 ka bar padh lo — legend ek baar zaroor dekho.

### 2. Percent change aur uska base

**Formula:** $\%\ \text{change} = \dfrac{\text{new} - \text{old}}{\text{old}} \times 100$.

**Kyun old se divide?** Hum poochh rahe hain "purani value ke muqable kitna badla". Purani value hi "100%" hai.

**Example:** Q: $\dfrac{56 - 40}{40} \times 100 = 40\%$.

**Dhyan do:** $\frac{16}{56} = 28.6\%$ — new se divide karna galat base hai. Division se pehle "base = old = 40" likho.

### 3. "Exceeds by x%" vs "is x% of"

**Idea:** Ye do alag sawaal hain.
- "A exceeds B by x%" → $x = \dfrac{A - B}{B} \times 100$ (base B).
- "A is x% of B" → $x = \dfrac{A}{B} \times 100$.

**Example:** A = 60, B = 30. A is **200% of** B. A exceeds B **by 100%**. ("200% of" = "100% more".)

**Dhyan do:** "Kitne percent zyada" me hamesha difference upar aata hai. Sirf ratio lena "% of" deta hai.

### 4. Absolute change vs percentage change

**Idea:** Absolute change = rupaye/units me farak. Percent change = us farak ko base se divide karke. Bada base wala item zyada rupaye jod kar bhi kam percent dikha sakta hai.

**Shortcut:** Sirf compare karna ho toh har item ka $\text{new}/\text{old}$ nikalo. Jiska ratio sabse bada, wahi sabse tez badha.

**Example:** Ratios: P 1.25, Q 1.40, R 1.20, S 0.90 → % growth me Q first, R absolute me first.

**Dhyan do:** Answer me % sign tabhi aata hai jab tumne divide kiya ho. "+40" ko "40%" mat likho.

### 5. Share of total

**Idea:** Share = hissa ÷ poora total. Total ek baar nikal lo aur reuse karo.

**Formula:** $\text{share} = \dfrac{\text{part}}{\text{total}} \times 100$.

**Fixed amount, total badha:** Agar ek amount (jaise rent ₹) same rahe aur total $g$ fraction se badhe, toh
$$\text{new share} = \frac{\text{old share}}{1 + g}.$$
**Kyun:** rent $= s \cdot T$ fixed. Naya total $T(1+g)$. Naya share $= \dfrac{sT}{T(1+g)} = \dfrac{s}{1+g}$.

**Example:** Rent = income ka 30%. Income 20% badhi, rent same → $30/1.2 = 25\%$.

**Dhyan do:** "Rent abhi bhi 30%" maan lena — share tabhi same rehta jab rent bhi 20% badhta.

### 6. Weighted mean (average of groups)

**Idea:** Bade group ka asar average par zyada hona chahiye. Isliye har group ka mean uski size (weight) se guna karo.

**Formula:** $\bar x = \dfrac{\sum w_i x_i}{\sum w_i}$.

**Example:** Class A: 20 students, avg 60. Class B: 30 students, avg 80. Overall $= \dfrac{20 \times 60 + 30 \times 80}{50} = \dfrac{3600}{50} = 72$. Plain mean $(60+80)/2 = 70$ galat hai.

**Shortcut (deviations):** Ek round number (jaise 60) chuno, har group ka farak lo: $60 + \dfrac{20\times 0 + 30 \times 20}{50} = 60 + 12 = 72$. Chhote numbers, kam galti.

**Dhyan do:** Price per kg ka average bhi weighted hai — weight = kg (quantity), na ki items ki ginti.

### 7. Naya value jo naya average banata hai

**Idea:** Average ko sum me badlo.

**Formula:** Added value $= \text{new mean} \times \text{new } n - \text{old sum}$.

**Example:** 5 din ka sum 1300. 6 din ka average 270 chahiye → 6 din ka sum 1620. Chhatha din $= 1620 - 1300 = 320$.

**Dhyan do:** "270 se kitna upar" type shortcut bhi kaam karta hai: purana avg 260, naya din = $270 + 5 \times (270 - 260) = 320$. Par sum wala tareeka kabhi galat nahi hota.

### 8. Derived quantity pehle banao

**Idea:** Profit = revenue − cost. Agar profit ka % change chahiye, toh pehle **dono saal ka profit** nikalo, phir % change.

**Example:** 2023: revenue 400, cost 340 → profit 60. 2024: revenue 450, cost 372 → profit 78. Profit change $= \frac{18}{60} = 30\%$. Revenue change sirf $\frac{50}{400} = 12.5\%$.

**Dhyan do:** Revenue ka % change ya cost ka % change ko profit ka % change mat samjho. Chhoti base (profit) par percent bahut jaldi badalta hai.

### 9. Estimation: kab chalega, kab nahi

**Idea:** Round karke jaldi answer nikalo — par agar options paas-paas hain (jaise 17% aur 20%), toh exact calculate karo.

**Example:** Total exports 450 → 527. Rough: "lagbhag 80 badha, 450 par ≈ 18%". Exact: $77/450 = 17.1\%$. Agar options "more than 15%" aur "more than 20%" hain, toh rough kaafi hai; agar 17% vs 18% hain, exact chahiye.

**Dhyan do:** 36/200 ko "about 20%" bolna galat hai — ye 18% hai. Threshold ke paas rounding mat karo.

### 10. Ratio wale DI: part nahi, jo poocha woh

**Idea:** Kabhi chart ke saath ratio condition hoti hai ("hire only into Sales until Eng : Sales = 5 : 4"). Pehle naya part nikalo, phir dekho **total** poocha hai ya part.

**Example:** Eng 120, Sales 60, HR 30. Eng : Sales = 5 : 4 → Sales $= 120 \times 4/5 = 96$. Firm total $= 120 + 96 + 30 = 246$.

**Dhyan do:** 96 (sirf Sales) ya 216 (Eng + Sales, HR bhool gaye) — dono trap.

## Solved examples

Examples 1 aur 4 upar wale **Exports** bar chart par hain.

**Example 1 (MCQ, 1 mark, easy):** Which product had the highest percentage increase in exports from 2023 to 2024?
(A) P  (B) Q  (C) R  (D) S

**Soch:** "highest percentage increase" → har product ka new/old.

**Solution:**
1. P: 150/120 = 1.25. Q: 56/40 = 1.40. R: 240/200 = 1.20. S: 81/90 = 0.90.
2. Sabse bada ratio Q.
3. Answer: **(B) Q** (+40%).

**Galti kahan hoti hai:** (C) R — sabse lamba bar aur sabse bada absolute jump (+40). Par uska base 200 hai.

**Example 2 (MCQ, 1 mark, easy):** Three batches took a quiz.

| Batch | Students | Average score |
|---|---|---|
| X | 25 | 64 |
| Y | 40 | 70 |
| Z | 35 | 58 |

The average score of all 100 students is:
(A) 64.0  (B) 64.3  (C) 65.0  (D) 63.8

**Soch:** Group sizes alag → weighted mean.

**Solution:**
1. $25 \times 64 = 1600$, $40 \times 70 = 2800$, $35 \times 58 = 2030$.
2. Sum $= 6430$, students $= 100$.
3. Mean $= 64.3$.
4. Deviation check (base 60): $\frac{25(4) + 40(10) + 35(-2)}{100} = \frac{430}{100} = 4.3$ → 64.3 ✔.
5. Answer: **(B)**.

**Galti kahan hoti hai:** $(64 + 70 + 58)/3 = 64.0$ → (A). Ye tabhi sahi hota jab teeno batch barabar size ke hote.

**Example 3 (NAT, 1 mark, medium):** A family spends 30% of its monthly income on rent. Next year its income rises by 20%, but the rent (in rupees) stays the same. What percentage of the new income goes to rent?

**Soch:** Fixed amount + total badha → new share = old share / (1 + g).

**Solution:**
1. Maan lo income ₹100 → rent ₹30.
2. Nayi income = ₹120, rent ₹30.
3. Share $= 30/120 = 25\%$.
4. Answer: **25**.

**Galti kahan hoti hai:** 30 (share same maan lena) ya $30 - 20 = 10$ (percent ghatana). Share ek ratio hai — naye total se divide karo.

**Example 4 (MSQ, 2 marks, medium):** Based on the Exports chart, which statements are correct? (Select all that apply.)
(A) R had the largest absolute increase.
(B) Q had the largest percentage increase.
(C) Total exports rose by more than 20%.
(D) Since S's 2024 exports were 10% below 2023, S's 2023 exports were 10% above 2024.

**Soch:** Har statement alag check; base aur absolute vs % ka dhyan.

**Solution:**
1. (A) Changes: +30, +16, +40, −9 → R ✔.
2. (B) Ratios se Q (1.40) ✔.
3. (C) Totals: 2023 $= 450$, 2024 $= 527$. Rise $= 77/450 = 17.1\%$ → 20% se kam ✘.
4. (D) 2023 vs 2024 with base 81: $(90 - 81)/81 = 11.1\%$, 10% nahi ✘.
5. Answer: **(A) and (B)**.

**Galti kahan hoti hai:** (D) ko sahi maanna — "10% kam" ulta karke "10% zyada" sochna. Base 90 se 81 ho gaya, isliye ulti direction me percent alag hai.

**Example 5 (NAT, 2 marks, medium):** The chart shows a shop's orders from Monday to Friday. If Saturday's orders make the six-day average 270, how many orders came on Saturday?

<figure class="fig">
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" font-size="12">
<text x="40" y="16" fill="currentColor" font-size="13">Daily orders</text>
<path d="M40 25V170H400" fill="none" stroke="currentColor"/>
<polyline points="70,82 140,66 210,74 280,50 350,58" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="70" cy="82" r="4" style="fill:var(--info)"/>
<circle cx="140" cy="66" r="4" style="fill:var(--info)"/>
<circle cx="210" cy="74" r="4" style="fill:var(--info)"/>
<circle cx="280" cy="50" r="4" style="fill:var(--info)"/>
<circle cx="350" cy="58" r="4" style="fill:var(--info)"/>
<text x="70" y="74" text-anchor="middle" fill="currentColor">220</text>
<text x="140" y="58" text-anchor="middle" fill="currentColor">260</text>
<text x="210" y="66" text-anchor="middle" fill="currentColor">240</text>
<text x="280" y="42" text-anchor="middle" fill="currentColor">300</text>
<text x="350" y="50" text-anchor="middle" fill="currentColor">280</text>
<text x="70" y="186" text-anchor="middle" fill="currentColor">Mon</text>
<text x="140" y="186" text-anchor="middle" fill="currentColor">Tue</text>
<text x="210" y="186" text-anchor="middle" fill="currentColor">Wed</text>
<text x="280" y="186" text-anchor="middle" fill="currentColor">Thu</text>
<text x="350" y="186" text-anchor="middle" fill="currentColor">Fri</text>
</svg>
<figcaption>Daily orders, Monday to Friday (values printed on the points).</figcaption>
</figure>

**Soch:** Naya average diya → sum me badlo.

**Solution:**
1. Mon–Fri sum $= 220 + 260 + 240 + 300 + 280 = 1300$.
2. 6 din ka sum $= 6 \times 270 = 1620$.
3. Saturday $= 1620 - 1300 = $ **320**.

**Galti kahan hoti hai:** 270 likhna ("Saturday = average"). Ya purana average 260 nikal kar $260 + 10 = 270$ — bhool jaana ki Saturday ko baaki 5 din ka gap bhi bharna hai.

**Example 6 (NAT, 2 marks, hard):** A firm's figures (₹ lakh):

| Year | Revenue | Cost |
|---|---|---|
| 2023 | 400 | 340 |
| 2024 | 450 | 372 |

Profit = Revenue − Cost. By what percentage did profit increase from 2023 to 2024?

**Soch:** Derived quantity → pehle profit dono saal ka, phir % change, base = 2023.

**Solution:**
1. Profit 2023 $= 400 - 340 = 60$.
2. Profit 2024 $= 450 - 372 = 78$.
3. % change $= \frac{78 - 60}{60} \times 100 = \frac{18}{60} \times 100 = $ **30**.

**Galti kahan hoti hai:** Revenue ka change $50/400 = 12.5\%$ likh dena. Ya base 78 lena: $18/78 = 23.1\%$.

## Confusions clear karo

**Q:** "Percentage point" aur "percent" me farak?
**A:** Share 30% se 25% hua → **5 percentage points** ki kami. Percent me kami $= 5/30 = 16.7\%$. GATE options me dono ho sakte hain, isliye wording padho.

**Q:** Kaunsi value "old" hai jab saal nahi diye?
**A:** Jis value **se** compare kar rahe ho ("than B", "compared with B", "from B"), wahi base hai.

**Q:** Pie chart me degree diye hon toh?
**A:** Poora circle = 360°. Share $= \text{angle}/360$. Jaise 90° = 25%. Agar total amount diya ho, toh amount $= \text{share} \times \text{total}$.

**Q:** Weighted mean me weight kya lun?
**A:** Jo cheez "kitni baar" ya "kitni matra" batati ho: students ki ginti, kg, units. Price per kg ke average me kg weight hai.

**Q:** Bar ki height naap kar answer nikalun?
**A:** Sirf tab jab values likhi na hon. Likhi hain toh hamesha printed number use karo; chart scale par draw nahi bhi ho sakta.

**Q:** Do % changes ka average le sakte hain (jaise do saal ka growth)?
**A:** Nahi seedha. Do saal ka total change factors ko multiply karke aata hai: +10% aur +20% → $1.1 \times 1.2 = 1.32$ → +32%, 30% nahi.

## Khud try karo

**1.** Exports chart: by what percentage did S's exports change from 2023 to 2024?

<details><summary>Answer dekho</summary>

$\frac{81 - 90}{90} \times 100 = -10\%$ → **10% decrease**.

</details>

**2.** A firm has Engineering 120, Sales 60, HR 30 employees. It hires only into Sales until Engineering : Sales = 5 : 4. What is the firm's total strength then?

<details><summary>Answer dekho</summary>

Sales $= 120 \times 4/5 = 96$. Total $= 120 + 96 + 30 = $ **246**. (96 sirf Sales hai — trap.)

</details>

**3.** A shop sold 40 kg of rice at ₹50/kg and 60 kg at ₹75/kg. Average price per kg?

<details><summary>Answer dekho</summary>

$\frac{40 \times 50 + 60 \times 75}{100} = \frac{2000 + 4500}{100} = $ **₹65/kg**. (Plain mean 62.5 galat.)

</details>

**4.** In 2024, what share of total exports (Exports chart) came from R? (one decimal)

<details><summary>Answer dekho</summary>

Total 2024 = 527. Share $= 240/527 \times 100 = $ **45.5%**.

</details>

## Ek page me

- Pehle title, unit, legend; printed values use karo, height mat naapo.
- % change $= (\text{new} - \text{old})/\text{old}$; division se pehle "base = …" likho.
- "A exceeds B by x%" → base B; "A is x% of B" → ratio (200% of = 100% more).
- Absolute change ≠ % change; compare karne ke liye new/old ratios.
- Decrease ko "largest change" me mat ginna — sign dekho.
- Share = part/total; fixed amount, total $g$ se badha → new share $= s/(1+g)$.
- Weighted mean $= \sum w x / \sum w$; plain mean of group means galat jab sizes alag.
- Deviation from round number se weighted sum jaldi.
- Added value = new mean × new n − old sum.
- Profit jaisi derived quantity pehle banao, phir % change.
- Options threshold ke paas hon toh exact calculate karo.
- Ratio condition wale DI me dekho part poocha hai ya total.

Revision ke liye **Short note** tab dekho.
