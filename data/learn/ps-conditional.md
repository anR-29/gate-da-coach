# Conditional probability and independence

> **Time:** ~30 min · **Pehle aana chahiye:** Counting and event models (sample space, $P(A\cup B)$, complement) · **Day:** 2

## Ye topic kyun?

Asli duniya me hum aksar kuch jaankari ke baad probability update karte hain: "customer ne kharida hai — ab wo mobile se aaya hoga, iska chance kya?" Yahi **conditional probability** hai. GATE DA me iske 1–2 mark ke MCQ/NAT aate hain (dice ya table se "given" wale sawaal), aur MSQ me "independent hai ya mutually exclusive?" wale statements. Aage Bayes, Naive Bayes aur Markov chains sab isi par khade hain.

## Picture se samjho

Socho poora sample space $S$ ek kamra hai. Kisi ne bataya "$B$ hua hai". Ab $B$ ke bahar ka hissa possible hi nahi raha. To hum $B$ ko hi naya poora kamra maan lete hain, aur dekhte hain ki is naye kamre ka kitna hissa $A$ ke andar hai.

<figure class="fig">
<svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="clipB-cond"><circle cx="320" cy="110" r="75"/></clipPath></defs>
<text x="100" y="20" text-anchor="middle" font-size="12" fill="currentColor">Poora space S</text>
<rect x="10" y="30" width="180" height="150" fill="none" stroke="currentColor"/>
<circle cx="80" cy="105" r="50" style="fill:var(--info);fill-opacity:0.2;stroke:var(--info)"/>
<circle cx="130" cy="105" r="50" style="fill:var(--mark);fill-opacity:0.25;stroke:var(--mark)"/>
<text x="50" y="110" text-anchor="middle" font-size="14" fill="currentColor">A</text>
<text x="160" y="110" text-anchor="middle" font-size="14" fill="currentColor">B</text>
<line x1="195" y1="105" x2="232" y2="105" stroke="currentColor" stroke-width="2"/>
<polygon points="232,100 242,105 232,110" fill="currentColor"/>
<text x="218" y="95" text-anchor="middle" font-size="11" fill="currentColor">given B</text>
<circle cx="320" cy="110" r="75" style="fill:var(--mark);fill-opacity:0.25;stroke:var(--mark)"/>
<circle cx="245" cy="110" r="75" clip-path="url(#clipB-cond)" style="fill:var(--info);fill-opacity:0.45"/>
<text x="282" y="115" text-anchor="middle" font-size="12" fill="currentColor">A∩B</text>
<text x="355" y="115" text-anchor="middle" font-size="14" fill="currentColor">B</text>
<text x="320" y="20" text-anchor="middle" font-size="12" fill="currentColor">Naya space = sirf B</text>
<text x="320" y="203" text-anchor="middle" font-size="12" fill="currentColor">P(A|B) = (A∩B) / B</text>
</svg>
<figcaption>"Given B" ka matlab: B ke bahar sab kuch kaat do, aur B ko hi poora space maano.</figcaption>
</figure>

Dhyan do: right side me $A$ ka sirf wo hissa bacha jo $B$ ke andar tha, yani $A\cap B$. Answer = ye hissa ÷ poora $B$. Isliye denominator **$P(B)$** hota hai, 1 nahi.

Ab **independence** ki picture. Ek unit square lo (area 1 = total probability). $A$ ko left ki ek patti (width 0.3) maano aur $B$ ko upar ki ek patti (height 0.7).

<figure class="fig">
<svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg">
<text x="95" y="20" text-anchor="middle" font-size="12" fill="currentColor">Independent</text>
<rect x="20" y="30" width="45" height="105" style="fill:var(--mark);fill-opacity:0.5"/>
<rect x="20" y="30" width="150" height="150" fill="none" stroke="currentColor"/>
<line x1="65" y1="30" x2="65" y2="180" style="stroke:var(--info)" stroke-width="2"/>
<line x1="20" y1="135" x2="170" y2="135" style="stroke:var(--good)" stroke-width="2"/>
<text x="42" y="86" text-anchor="middle" font-size="11" fill="currentColor">0.21</text>
<text x="42" y="196" text-anchor="middle" font-size="11" fill="currentColor">A = 0.3</text>
<text x="196" y="86" text-anchor="middle" font-size="11" fill="currentColor">B = 0.7</text>
<text x="325" y="20" text-anchor="middle" font-size="12" fill="currentColor">Mutually exclusive</text>
<rect x="250" y="30" width="150" height="150" fill="none" stroke="currentColor"/>
<rect x="250" y="30" width="45" height="150" style="fill:var(--info);fill-opacity:0.35"/>
<rect x="325" y="30" width="75" height="150" style="fill:var(--good);fill-opacity:0.35"/>
<text x="272" y="110" text-anchor="middle" font-size="11" fill="currentColor">A 0.3</text>
<text x="362" y="110" text-anchor="middle" font-size="11" fill="currentColor">B 0.5</text>
<text x="325" y="196" text-anchor="middle" font-size="11" fill="currentColor">A∩B = 0</text>
</svg>
<figcaption>Left: B ki patti A ke andar bhi utna hi hissa (0.7) leti hai jitna poore square me. Right: A aur B kabhi saath nahi hote.</figcaption>
</figure>

Left square me $A$ ke andar jaao: $A$ ki patti ka 70% hissa $B$ me hai — bilkul utna jitna poore square me. Matlab "$A$ hua" jaanne se $B$ ka chance nahi badla. Ye independence hai, aur overlap ka area $0.3\times0.7=0.21$. Right square me $A$ aur $B$ alag hain: agar $A$ hua to $B$ ka chance **zero** ho gaya. Ye bahut badi jaankari hai, isliye mutually exclusive events independent **nahi** hote.

## Concept step-by-step

### 1. Conditional probability ka formula

**Idea:** "Given $B$" = sample space ko $B$ tak chhota karo.

$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(B)>0.$$

$P(A\mid B)$ ko padhte hain "probability of $A$ given $B$". Agar outcomes equally likely hain to probabilities ki jagah ginti:

$$P(A\mid B)=\frac{|A\cap B|}{|B|}.$$

**Kyun?** Equally likely outcomes me $P(A\cap B)=|A\cap B|/|S|$ aur $P(B)=|B|/|S|$. Divide karo, $|S|$ cut ho jaata hai.

**Example:** Ek die. Given ki number even hai, number $>3$ hone ka chance? Naya space $\{2,4,6\}$ (3 outcomes). Usme $>3$: $\{4,6\}$. Answer $2/3$. (Bina condition ke $P(>3)=1/2$ tha.)

**Example (formula se):** $P(A)=0.6$, $P(B)=0.25$, $P(A\cap B)=0.1$. $P(A\mid B)=0.1/0.25=0.4$, aur $P(B\mid A)=0.1/0.6\approx0.167$. Dono alag hain!

Dhyan do: "given" ke baad jo event likha hai wahi denominator me jaata hai. Dice ke sawaal me "given" ke baad 36 se divide karna sabse common galti hai.

### 2. Multiplication rule

Formula ko ulta karo:

$$P(A\cap B)=P(B)\,P(A\mid B)=P(A)\,P(B\mid A).$$

Ye "pehle ek hua, phir uske hone ke baad doosra" wali soch hai. Teen events ke liye chain: $P(A\cap B\cap C)=P(A)P(B\mid A)P(C\mid A\cap B)$.

**Example:** 10 bulbs me 3 kharab. Bina replacement 2 bulbs nikale. Dono kharab: $P(\text{1st kharab})=3/10$, phir $P(\text{2nd kharab}\mid\text{1st kharab})=2/9$. Multiply: $\frac3{10}\cdot\frac29=\frac{6}{90}=\frac1{15}$.

Dhyan do: without replacement wale sequential fractions (pichhla lesson) asal me yahi multiplication rule hai — doosri fraction ek conditional probability hai.

### 3. Table se conditional — aur "reverse" ka jaal

Data aksar table me milta hai. Example: 150 customers.

| | Bought | Not bought | Total |
|---|---|---|---|
| Mobile | 30 | 70 | 100 |
| Desktop | 20 | 30 | 50 |
| Total | 50 | 100 | 150 |

- $P(\text{bought}\mid\text{mobile})$: given mobile → mobile **row** total (100) se divide: $30/100=0.3$.
- $P(\text{mobile}\mid\text{bought})$: given bought → bought **column** total (50) se divide: $30/50=0.6$.
- $P(\text{mobile}\cap\text{bought})=30/150=0.2$ (ye joint hai, conditional nahi).

Teeno alag numbers hain! Rule: jo "given" hai, uska row/column total denominator.

Dhyan do: $P(A\mid B)\ne P(B\mid A)$ aam taur par. "Kharidne walon me se mobile wale" aur "mobile walon me se kharidne wale" alag sawaal hain.

### 4. Independence

**Idea:** $B$ ke hone ki khabar se $A$ ka chance na badle: $P(A\mid B)=P(A)$.

Formula me daalo: $\frac{P(A\cap B)}{P(B)}=P(A)$, yani

$$A,B \text{ independent} \iff P(A\cap B)=P(A)\,P(B).$$

Ye wala form symmetric hai (A aur B ki jagah badlo, kuch nahi badalta) aur $P(B)=0$ par bhi chalta hai, isliye ise definition maante hain. Iska matlab ye bhi hai ki $P(B\mid A)=P(B)$ apne aap.

**Check karne ka tareeka:** $P(A\cap B)$ nikaalo, $P(A)P(B)$ nikaalo, compare karo.

**Example:** Ek fair die, $A=\{2,4,6\}$ (even), $B=\{1,2\}$, $C=\{2,3,4\}$.
- $A\cap B=\{2\}$: $1/6$. $P(A)P(B)=\frac12\cdot\frac13=\frac16$. Equal → **independent**.
- $A\cap C=\{2,4\}$: $2/6=1/3$. $P(A)P(C)=\frac12\cdot\frac12=\frac14$. Not equal → **dependent** (yahan $P(A\mid C)=2/3>1/2$).

Dekho, $A$ aur $B$ overlap karte hain phir bhi independent hain.

Dhyan do: Sawaal me independence na diya ho to $P(A)P(B)$ seedha mat lagao. Pehle check karo ya diye hue data se overlap nikaalo.

### 5. Mutually exclusive ≠ independent

**Mutually exclusive** (disjoint) matlab dono saath nahi ho sakte: $A\cap B=\varnothing$, $P(A\cap B)=0$.

Agar $P(A)>0$ aur $P(B)>0$, to $P(A)P(B)>0$, jabki $P(A\cap B)=0$. Dono barabar nahi → **dependent**. Seedhi soch: $B$ hua to $A$ pakka nahi hua, $P(A\mid B)=0\ne P(A)$.

Ulta bhi: independent events (dono positive probability) me $P(A\cap B)=P(A)P(B)>0$, to unhe **overlap karna hi padega**.

**Example:** Disjoint, $P(A)=0.2$, $P(B)=0.5$: $P(A\cup B)=0.7$ (overlap 0), $P(A\mid B)=0$, aur ye dependent hain (kyunki $P(A)P(B)=0.1\ne0$).

Dhyan do: "Exclusive" ek picture ki baat hai (ghere alag). "Independent" ek number ki baat hai (overlap exactly $P(A)P(B)$). Dono ko mix mat karo.

### 6. Complements bhi independent

Agar $A,B$ independent hain to $A,B^c$ bhi:

$$P(A\cap B^c)=P(A)-P(A\cap B)=P(A)-P(A)P(B)=P(A)\,(1-P(B))=P(A)P(B^c).$$

Pehla step isliye ki $A$ ke do hisse hain: jo $B$ me hai aur jo $B$ me nahi. Isi tarah $A^c,B$ aur $A^c,B^c$ bhi independent hain.

**Iska fayda — union:** "kam se kam ek" = 1 − "dono nahi":

$$P(A\cup B)=1-P(A^c\cap B^c)=1-P(A^c)P(B^c).$$

**Example:** $P(A)=0.2$, $P(B)=0.5$, independent. $1-0.8\times0.5=0.6$. Check: $0.2+0.5-0.2\cdot0.5=0.6$. ✓

Dhyan do: ye shortcut sirf independent events ke liye hai.

### 7. Positive aur negative association

$$P(A\mid B)>P(A)\iff P(A\cap B)>P(A)P(B)\iff P(B\mid A)>P(B).$$

**Kyun?** Pehli inequality ko $P(B)$ se multiply karo (positive hai, sign nahi badalta): $P(A\cap B)>P(A)P(B)$. Ab is ko $P(A)$ se divide karo: $P(B\mid A)>P(B)$. Matlab agar $B$ jaanne se $A$ ka chance badhta hai, to $A$ jaanne se $B$ ka chance bhi badhta hai. "<" ke liye bhi same chalta hai.

**Example:** Upar wale table me $P(\text{bought})=50/150\approx0.333$, $P(\text{bought}\mid\text{mobile})=0.3<0.333$. To $P(\text{mobile}\mid\text{bought})=0.6$ bhi $P(\text{mobile})=100/150\approx0.667$ se kam hona chahiye. ✓

Dhyan do: ek taraf badhe aur doosri taraf ghate — ye kabhi nahi hota.

### 8. "Given" ke baad enumeration karo, shortcut mat socho

"3 coins, given at least one head, teeno heads ki probability?" — log sochte hain "ek head ho gaya, do toss bache, to $\frac12\cdot\frac12=\frac14$". Galat, kyunki ye nahi bataya ki **kaunsa** toss head tha. Restricted space likho: TTT ko chhod kar baaki sab — $\{HTT, THT, TTH, HHT, HTH, THH, HHH\}$ (7 outcomes). Teeno heads: 1. Answer $1/7$.

Dhyan do: condition "kam se kam" wali ho to restricted space ko poora list karo.

## Solved examples

**Example 1 (MCQ, easy):** Do fair dice phenke. Given ki sum 9 hai, kam se kam ek die par 6 hone ki probability?
(A) 1/18 (B) 11/36 (C) 1/2 (D) 1/9

**Soch:** "Given" → sample space ko sum 9 wale outcomes tak chhota karo.

**Solution:**
1. Sum 9: (3,6), (4,5), (5,4), (6,3) → 4 outcomes.
2. Inme 6 wale: (3,6), (6,3) → 2.
3. $P=2/4=1/2$. **Answer (C).**

**Galti kahan hoti hai:** 36 se divide karna: $2/36=1/18$ (A). Ya condition hi ignore karke $P(\text{at least one 6})=11/36$ (B) likh dena.

**Example 2 (NAT, easy):** $P(A)=0.6$, $P(B)=0.5$, $P(A\cap B)=0.2$. $P(B\mid A)$ nikalo (3 decimal).

**Soch:** Seedha formula; given $A$ hai, to denominator $P(A)$.

**Solution:**
1. $P(B\mid A)=\frac{P(A\cap B)}{P(A)}$.
2. $=0.2/0.6=0.333$. **Answer: 0.333.**

**Galti kahan hoti hai:** $P(B)$ se divide karna: $0.2/0.5=0.4$. Wo $P(A\mid B)$ hai.

**Example 3 (NAT, medium):** Ek fair coin 4 baar uchhala. Given ki kam se kam 3 heads aaye, chaaro heads hone ki probability?

**Soch:** "At least" wali condition → restricted space ko gino, "bacha hua toss" wala shortcut nahi.

**Solution:**
1. Exactly 3 heads: $\binom43=4$ outcomes (HHHT, HHTH, HTHH, THHH).
2. Exactly 4 heads: 1 outcome (HHHH).
3. Restricted space = 5 outcomes, favourable = 1.
4. $P=1/5=0.2$. **Answer: 0.2.**

**Galti kahan hoti hai:** "3 heads ho gaye, ek toss bacha, $1/2$." Condition ye nahi kehti ki pehle teen heads the.

**Example 4 (MCQ, medium):** 150 customers me 100 ne mobile use kiya (unme 30 ne kharida) aur 50 ne desktop (unme 20 ne kharida). Kharidne walon me se ek random customer chuna. Uske mobile user hone ki probability?
(A) 0.3 (B) 0.2 (C) 0.6 (D) 0.667

**Soch:** "Kharidne walon me se" = given bought. Denominator = total buyers.

**Solution:**
1. Total buyers $=30+20=50$.
2. Mobile buyers $=30$.
3. $P(\text{mobile}\mid\text{bought})=30/50=0.6$. **Answer (C).**

**Galti kahan hoti hai:** (A) 0.3 = $30/100$ = $P(\text{bought}\mid\text{mobile})$, reverse conditional. (B) 0.2 = $30/150$ = joint probability. (D) 0.667 = $100/150$ = sirf $P(\text{mobile})$.

**Example 5 (MSQ, medium):** $P(A)=0.5$, $P(B)=0.4$, $P(A\cup B)=0.7$. Kaun se sahi hain?
(A) $A$ aur $B$ independent hain
(B) $A$ aur $B$ mutually exclusive hain
(C) $P(A\mid B)=0.5$
(D) $P(A\cap B^c)=0.2$

**Soch:** Union diya hai → pehle overlap nikaalo, phir $P(A)P(B)$ se compare karo.

**Solution:**
1. $P(A\cap B)=0.5+0.4-0.7=0.2$.
2. $P(A)P(B)=0.5\times0.4=0.2$. Equal → (A) sahi.
3. Overlap 0.2 hai, 0 nahi → (B) galat.
4. $P(A\mid B)=0.2/0.4=0.5$ → (C) sahi (independence se bhi $=P(A)$).
5. $P(A\cap B^c)=P(A)-P(A\cap B)=0.5-0.2=0.3$, 0.2 nahi → (D) galat.
**Answer: (A), (C).**

**Galti kahan hoti hai:** (D) tick karna — $P(A\cap B)$ (0.2) aur $P(A\cap B^c)$ ko confuse karna. Ya "union 0.7 = 0.5 + 0.4 nahi hai" dekh kar ghabra jaana; usi farak se overlap milta hai.

**Example 6 (MSQ, hard):** Events ke liye $0<P(A)<1$, $0<P(B)<1$. Kaun se statements **hamesha** sahi hain?
(A) Agar $P(A\mid B)<P(A)$, to $P(B\mid A)<P(B)$
(B) Agar $A,B$ mutually exclusive hain, to independent hain
(C) Agar $A,B$ independent hain, to $A^c,B^c$ bhi independent hain
(D) Agar $A,B$ independent hain, to $P(A\cup B)=P(A)+P(B)$

**Soch:** Har statement ko definitions se test karo: association symmetric hai; disjoint ⇒ dependent; independence complements me jaati hai.

**Solution:**
1. (A): $P(A\mid B)<P(A)\iff P(A\cap B)<P(A)P(B)\iff P(B\mid A)<P(B)$. Sahi.
2. (B): disjoint me $P(A\cap B)=0<P(A)P(B)$ → dependent. Galat.
3. (C): Step 6 wala proof. Sahi.
4. (D): independent me $P(A\cup B)=P(A)+P(B)-P(A)P(B)$, aur $P(A)P(B)>0$. Galat (ye formula disjoint ke liye hai).
**Answer: (A), (C).**

**Galti kahan hoti hai:** (B) aur (D) ko tick karna — "independent" aur "exclusive" ko ek hi cheez samajhna.

## Confusions clear karo

**Q:** $P(A\mid B)$ aur $P(A\cap B)$ me farak kya hai?
**A:** $P(A\cap B)$ poore space me dono saath hone ka chance hai (denominator = sab kuch). $P(A\mid B)$ sirf $B$ ki duniya me $A$ ka chance hai (denominator = $B$). Isliye $P(A\mid B)\ge P(A\cap B)$ hota hai.

**Q:** Independent events overlap kaise kar sakte hain? Overlap matlab connection nahi?
**A:** Nahi. Overlap ka **size** dekho. Agar overlap exactly $P(A)P(B)$ hai to $B$ jaanne se $A$ ka anupaat nahi badalta. Asal me positive probability wale independent events ko overlap karna hi padta hai.

**Q:** Mutually exclusive events "alag-alag" hain, to unhe independent kyun nahi kehte?
**A:** Kyunki ek ki khabar doosre ke baare me sab kuch bata deti hai: $A$ hua to $B$ pakka nahi hua. Independent ka matlab hai "khabar se kuch nahi badalta".

**Q:** Kab $P(A\cap B)=P(A)P(B)$ use kar sakta hoon?
**A:** Jab sawaal kahe "independent", ya physical setup independent ho (alag coins, with replacement draws, alag machines). Bina replacement draws me ye nahi chalta.

**Q:** Table me kaunsa total lun?
**A:** "Given" wale event ka. "Mobile walon me se kitne kharide" → mobile row total. "Kharidne walon me se kitne mobile" → bought column total.

**Q:** "Given at least one boy" aur "given the elder child is a boy" me farak?
**A:** Pehle me restricted space {BB, BG, GB} hai (3 outcomes), doosre me {BB, BG} (2 outcomes). Isliye "both boys" ka answer $1/3$ aur $1/2$ — alag. Condition ko dhyan se padho.

## Khud try karo

**1.** Ek fair die. Given ki number even hai, number 3 se bada hone ki probability?

<details><summary>Answer dekho</summary>

Restricted space $\{2,4,6\}$. Isme $>3$: $\{4,6\}$. $P=2/3\approx0.667$.

</details>

**2.** $P(A)=0.3$, $P(B\mid A)=0.5$, $P(B)=0.5$. $P(A\cap B)$ nikalo. Kya $A,B$ independent hain?

<details><summary>Answer dekho</summary>

Multiplication rule: $P(A\cap B)=P(A)P(B\mid A)=0.3\times0.5=0.15$.
$P(A)P(B)=0.3\times0.5=0.15$. Equal → independent. (Seedha bhi: $P(B\mid A)=P(B)$.)

</details>

**3.** Ek fair die, $A=\{1,2,3\}$, $B=\{3,4\}$. Kya ye independent hain?

<details><summary>Answer dekho</summary>

$P(A)=1/2$, $P(B)=1/3$, $A\cap B=\{3\}$ so $P(A\cap B)=1/6$.
$P(A)P(B)=1/6$. Equal → **independent** (overlap hone ke bawajood).

</details>

**4.** Do components independent hain; kaam karne ki probability 0.9 aur 0.8. System chalta hai agar kam se kam ek component kaam kare. System chalne ki probability?

<details><summary>Answer dekho</summary>

Independent ⇒ complements bhi independent. Dono fail: $0.1\times0.2=0.02$.
$P(\text{system chalta})=1-0.02=0.98$.

</details>

**5.** Ek parivaar me 2 bachche (har bachcha boy/girl barabar chance, independent). Given ki kam se kam ek boy hai, dono boys hone ki probability?

<details><summary>Answer dekho</summary>

Saare outcomes: BB, BG, GB, GG. Given "at least one boy": {BB, BG, GB} — 3 outcomes. Dono boys: 1. $P=1/3$.

</details>

## Ek page me

- $P(A\mid B)=P(A\cap B)/P(B)$: "given" ke baad wala event denominator.
- Equally likely: $|A\cap B|/|B|$ — restricted space gino, 36 se nahi.
- Multiplication rule: $P(A\cap B)=P(B)P(A\mid B)=P(A)P(B\mid A)$.
- Table: given event ka row/column total se divide.
- $P(A\mid B)\ne P(B\mid A)$ — reverse conditional ka jaal.
- Independent $\iff P(A\cap B)=P(A)P(B)\iff P(A\mid B)=P(A)$.
- Mutually exclusive: $P(A\cap B)=0$; dono positive ho to **dependent**.
- Independent (positive probabilities) events ko overlap karna padta hai.
- Independence complements me bhi jaati hai; union $=1-P(A^c)P(B^c)$.
- $P(A\mid B)>P(A)\iff P(B\mid A)>P(B)$ — association symmetric hai.
- "At least $k$" condition par restricted space poora list karo.

Revision ke liye **Short note** tab dekho.
