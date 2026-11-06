# Total probability and Bayes theorem

> **Time:** ~35 min · **Pehle aana chahiye:** Conditional probability ($P(A\mid B)=P(A\cap B)/P(B)$) aur multiplication rule · **Day:** 3

## Ye topic kyun?

Kabhi hume "cause" se "result" ki probability pata hoti hai (machine C se bana item 5% defective hota hai), par sawaal ulta hota hai: item defective nikla, to wo machine C se aaya hoga iska chance kya? **Total probability** result ki overall probability deti hai, aur **Bayes theorem** result dekh kar cause ki probability ulat kar nikaalta hai. GATE DA me ye 1–2 mark ke NAT/MCQ me aata hai (machines, urns, medical test, spam filter), aur Naive Bayes classifier ki neev yahi hai.

## Picture se samjho

Ek medical test socho. 1% log beemar hain. Beemar ho to test 90% baar positive aata hai. Theek ho to bhi 5% baar galti se positive aata hai. Isko ek **tree** me likho: pehle "cause" (beemar ya nahi), phir "result" (test + ya −).

<figure class="fig">
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
<circle cx="30" cy="100" r="5" fill="currentColor"/>
<line x1="35" y1="97" x2="145" y2="52" stroke="currentColor"/>
<line x1="35" y1="103" x2="145" y2="148" stroke="currentColor"/>
<text x="70" y="62" font-size="12" fill="currentColor">D 0.01</text>
<text x="70" y="150" font-size="12" fill="currentColor">Dᶜ 0.99</text>
<circle cx="150" cy="50" r="5" fill="currentColor"/>
<circle cx="150" cy="150" r="5" fill="currentColor"/>
<line x1="155" y1="48" x2="265" y2="25" style="stroke:var(--mark)" stroke-width="3"/>
<line x1="155" y1="52" x2="265" y2="75" stroke="currentColor"/>
<line x1="155" y1="148" x2="265" y2="125" style="stroke:var(--mark)" stroke-width="3"/>
<line x1="155" y1="152" x2="265" y2="175" stroke="currentColor"/>
<text x="190" y="28" font-size="12" fill="currentColor">+ 0.90</text>
<text x="190" y="80" font-size="12" fill="currentColor">− 0.10</text>
<text x="190" y="128" font-size="12" fill="currentColor">+ 0.05</text>
<text x="190" y="180" font-size="12" fill="currentColor">− 0.95</text>
<text x="275" y="29" font-size="12" fill="currentColor">D,+ : 0.0090</text>
<text x="275" y="79" font-size="12" fill="currentColor">D,− : 0.0010</text>
<text x="275" y="129" font-size="12" fill="currentColor">Dᶜ,+ : 0.0495</text>
<text x="275" y="179" font-size="12" fill="currentColor">Dᶜ,− : 0.9405</text>
</svg>
<figcaption>Har leaf ki probability = raste ki saari fractions ka product. Moti lines wo do raste hain jo "+" tak pahunchte hain.</figcaption>
</figure>

"+" tak do raste pahunchte hain: beemar-aur-positive (0.0090) aur theek-par-galat-positive (0.0495). Dono jodo to $P(+)=0.0585$ — yahi **total probability** hai. Ab sawaal "positive aaya, to beemar hone ka chance?" ka matlab hai: in do raston me se pehla kitna bada hai? $0.0090/0.0585\approx0.154$. Yahi **Bayes** hai.

Ab yahi baat logon ki ginti me dekho (natural frequencies). 10,000 log lo.

<figure class="fig">
<svg viewBox="0 0 420 225" xmlns="http://www.w3.org/2000/svg">
<text x="40" y="22" text-anchor="middle" font-size="11" fill="currentColor">Sick 100</text>
<text x="230" y="22" text-anchor="middle" font-size="11" fill="currentColor">Healthy 9900</text>
<rect x="20" y="30" width="40" height="126" style="fill:var(--bad);fill-opacity:0.5"/>
<rect x="60" y="30" width="340" height="20" style="fill:var(--mark);fill-opacity:0.6"/>
<rect x="20" y="30" width="380" height="140" fill="none" stroke="currentColor"/>
<line x1="60" y1="30" x2="60" y2="170" stroke="currentColor"/>
<text x="40" y="98" text-anchor="middle" font-size="11" fill="currentColor">90 +</text>
<text x="40" y="167" text-anchor="middle" font-size="9" fill="currentColor">10 −</text>
<text x="230" y="44" text-anchor="middle" font-size="11" fill="currentColor">495 false +</text>
<text x="230" y="115" text-anchor="middle" font-size="11" fill="currentColor">9405 sahi −</text>
<text x="210" y="192" text-anchor="middle" font-size="12" fill="currentColor">Positive: 90 + 495 = 585 log</text>
<text x="210" y="212" text-anchor="middle" font-size="12" fill="currentColor">P(sick | +) = 90/585 ≈ 0.15   (scale nahi)</text>
</svg>
<figcaption>Shaded hisse = test positive. Healthy log itne zyada hain ki unka 5% bhi (495) beemaron ke 90 se bahut bada hai.</figcaption>
</figure>

Dhyan do: test "90% accurate" hai, phir bhi positive aaye logon me sirf ~15% beemar hain. Wajah: beemari rare hai (**base rate** chhota), to galat positives ki bheed asli positives ko dabaa deti hai. Ye GATE ka favourite jaal hai.

## Concept step-by-step

### 1. Partition: saare possible "causes"

**Partition** matlab events $H_1,H_2,\dots,H_k$ jo:
- aapas me disjoint hon (do ek saath nahi ho sakte), aur
- milkar sab kuch cover karein (koi na koi zaroor hoga).

Isliye $P(H_1)+\dots+P(H_k)=1$. In probabilities ko **prior** kehte hain — result dekhne se pehle ka belief.

Example: factory ka har item machine A, B ya C me se exactly ek se bana: $P(A)=0.5$, $P(B)=0.3$, $P(C)=0.2$; sum $=1$. ✓ Beemar/theek ($D$, $D^c$) bhi ek partition hai.

Dhyan do: priors ka sum 1 na aaye to koi cause chhoot gaya ya number galat padha.

### 2. Likelihood aur branch weight

**Likelihood** $P(E\mid H_i)$: agar cause $H_i$ hai, to result $E$ ka chance. Example: defect rates — $P(\text{def}\mid A)=0.02$, $P(\text{def}\mid B)=0.04$, $P(\text{def}\mid C)=0.05$.

Multiplication rule se har branch ka weight:

$$P(E\cap H_i)=P(E\mid H_i)\,P(H_i).$$

A: $0.02\times0.5=0.010$. B: $0.04\times0.3=0.012$. C: $0.05\times0.2=0.010$.

Dhyan do: likelihoods ka sum 1 hona zaroori **nahi** (0.02+0.04+0.05=0.11). Sirf priors ka sum 1 hota hai.

### 3. Total probability theorem

$E$ kisi na kisi cause ke saath hi hota hai, aur causes disjoint hain. To $E$ ke tukde $E\cap H_1,\dots,E\cap H_k$ bhi disjoint hain aur milkar poora $E$ banate hain. Isliye unhe jodo:

$$P(E)=\sum_i P(E\mid H_i)\,P(H_i).$$

Example: $P(\text{def})=0.010+0.012+0.010=0.032$.

Ye ek **weighted average** hai: har rate ko uske share se weight kiya. Simple average $(0.02+0.04+0.05)/3\approx0.037$ galat hai, kyunki machine A (sabse kam defect rate wali) sabse zyada items banati hai.

Dhyan do: "ek urn coin se chuno, phir ball nikaalo" jaise sawaal bhi isi formula ke hain — coin ke probabilities priors hain.

### 4. Bayes theorem

Ab ulta sawaal: defective mila, machine C se hone ka chance? Conditional ki definition:

$$P(H_j\mid E)=\frac{P(E\cap H_j)}{P(E)}=\frac{P(E\mid H_j)\,P(H_j)}{\sum_i P(E\mid H_i)\,P(H_i)}.$$

Upar: sirf **wo ek branch** jiske baare me poochha. Neeche: $E$ tak pahunchne wali **saari** branches.

Example: $P(C\mid\text{def})=\frac{0.010}{0.032}=0.3125$. Similarly $P(A\mid\text{def})=0.010/0.032=0.3125$, $P(B\mid\text{def})=0.012/0.032=0.375$.

**Check:** $0.3125+0.375+0.3125=1$. Posteriors (result ke baad wale beliefs) ka sum hamesha 1, kyunki sab ka denominator same hai aur numerators jod kar denominator ban jaate hain.

Dhyan do: C ka prior sirf 0.2 tha, par defective dekh kar 0.3125 ho gaya — C ka defect rate sabse zyada hai, isliye evidence C ki taraf jhukta hai. A ka prior 0.5 tha, wo ghat kar 0.3125 reh gaya.

### 5. Paanch step ki recipe

1. Priors $P(H_i)$ likho (sum 1 check).
2. Likelihoods $P(E\mid H_i)$ likho.
3. Products = branch weights.
4. $P(E)$ = products ka sum.
5. Posterior = poochhi gayi branch ÷ sum.

Tree hamesha pehle banao, phir numbers daalo. Bahut se sawaal (total probability) step 4 par hi khatam hote hain; Bayes wale step 5 tak jaate hain.

Dhyan do: step 3 ka product (joint) answer nahi hai. "Given $E$" hai to step 5 tak jaana zaroori hai.

### 6. Medical test ki bhasha

- **Prevalence** $\pi=P(D)$: kitne log beemar hain (base rate).
- **Sensitivity** $s=P(+\mid D)$: beemar ko pakadne ki shakti.
- **Specificity** $c=P(-\mid D^c)$: theek ko theek kehne ki shakti.
- **False-positive rate** $=P(+\mid D^c)=1-c$.

Recipe lagao:

$$P(D\mid+)=\frac{s\,\pi}{s\,\pi+(1-c)(1-\pi)}.$$

Example (picture wala): $s=0.90$, $c=0.95$, $\pi=0.01$: $\frac{0.009}{0.009+0.05\times0.99}=\frac{0.009}{0.0585}\approx0.154$.

**Base rate effect:** $\pi$ chhota ho to neeche $(1-c)(1-\pi)$ wala term bada rehta hai, aur $P(D\mid+)$ chhota. $\pi$ badhe to $P(D\mid+)$ badhta hai. Agar $\pi=0.5$ aur $s=c$, to $P(D\mid+)=\frac{0.5s}{0.5s+0.5(1-s)}=s$.

Dhyan do: sensitivity $P(+\mid D)$ hai, posterior $P(D\mid+)$ hai. "Test 95% sensitive hai to positive wala 95% beemar" — ye reverse conditional wali galti hai.

### 7. Odds form (jaldi calculation)

**Odds** $=\frac{P(H)}{P(H^c)}$. Bayes ko $H$ aur $H^c$ dono ke liye likh kar divide karo; $P(E)$ cut ho jaata hai:

$$\underbrace{\frac{P(H\mid E)}{P(H^c\mid E)}}_{\text{posterior odds}}=\underbrace{\frac{P(H)}{P(H^c)}}_{\text{prior odds}}\times\underbrace{\frac{P(E\mid H)}{P(E\mid H^c)}}_{\text{likelihood ratio}}.$$

Odds se probability: $P=\frac{\text{odds}}{1+\text{odds}}$.

Example: $\pi=0.02$, $s=0.90$, false-positive 0.10. Prior odds $=2/98=1/49$, LR $=0.90/0.10=9$, posterior odds $=9/49$. $P(D\mid+)=\frac{9}{49+9}=\frac{9}{58}\approx0.155$. (Recipe se check: $\frac{0.018}{0.018+0.098}\approx0.155$. ✓)

Dhyan do: odds aur probability alag hain. Odds 9/49 ka matlab probability 9/58 hai, 9/49 nahi.

### 8. Transfer problems

"Urn A se ek ball urn B me daali, phir B se nikaali" — yahan **cause** hai "kaunsi ball transfer hui". Do branches: white transfer hui ya black. Har branch me B ka naya content alag hai (aur B me ab ek ball zyada hai). Dono branches ko weight karke jodo.

Dhyan do: B ka size badal jaata hai. Agar B me pehle 6 balls thi to ab 7 hain — denominator 7 lo.

## Solved examples

**Example 1 (NAT, easy):** Teen suppliers 40%, 35% aur 25% parts dete hain; unke defect rates 1%, 2% aur 4% hain. Random part ke defective hone ki probability (3 decimal)?

**Soch:** Kai sources + har source ka alag rate + "random part" → total probability.

**Solution:**
1. Branch weights: $0.40\times0.01=0.004$, $0.35\times0.02=0.007$, $0.25\times0.04=0.010$.
2. Sum: $0.004+0.007+0.010=0.021$. **Answer: 0.021.**

**Galti kahan hoti hai:** rates ka simple average $(1+2+4)/3\approx2.33\%$, yani 0.023 likhna. Shares ignore ho gaye.

**Example 2 (MCQ, easy):** Urn I me 2 laal, 3 neeli; urn II me 4 laal, 1 neeli. Ek die phenka: 1 ya 2 aaye to urn I, warna urn II. Chune gaye urn se ek ball nikaali. $P(\text{laal})$?
(A) 3/5 (B) 2/3 (C) 8/15 (D) 1/3

**Soch:** Pehle urn chuna (cause), phir ball (result) → total probability. Priors: $P(I)=2/6=1/3$, $P(II)=2/3$.

**Solution:**
1. $P(R\mid I)=2/5$, $P(R\mid II)=4/5$.
2. $P(R)=\frac13\cdot\frac25+\frac23\cdot\frac45=\frac2{15}+\frac8{15}=\frac{10}{15}=\frac23$. **Answer (B).**

**Galti kahan hoti hai:** urns ko barabar maan kar $(2/5+4/5)/2=3/5$ (A). Ya sirf ek branch $8/15$ (C) likh kar ruk jaana.

**Example 3 (MCQ, medium):** Example 1 ke suppliers me, ek part defective mila. Probability ki wo teesre supplier (25% share, 4% rate) se aaya, closest to:
(A) 0.333 (B) 0.250 (C) 0.571 (D) 0.476

**Soch:** "Defective mila, kahan se aaya?" → Bayes. Numerator = teesre supplier ki branch.

**Solution:**
1. Branch weights (Example 1 se): 0.004, 0.007, 0.010; total 0.021.
2. $P(\text{3rd}\mid\text{def})=0.010/0.021\approx0.476$. **Answer (D).**
3. Check: $0.004/0.021+0.007/0.021+0.010/0.021=1$. ✓

**Galti kahan hoti hai:** (A) 0.333 = galat branch (doosre supplier ki 0.007) numerator me. (B) 0.25 = sirf prior, evidence ignore. (C) 0.571 = $4/(1+2+4)$, sirf rates se, shares ignore.

**Example 4 (NAT, medium):** Ek beemari 2% logon me hai. Test ki sensitivity 0.90 hai aur false-positive rate 0.08. Ek vyakti positive aaya. $P(\text{beemar}\mid +)$ (3 decimal)?

**Soch:** Test + rare condition + "given positive" → Bayes, base rate ke saath.

**Solution:**
1. True positive branch: $0.02\times0.90=0.018$.
2. False positive branch: $0.98\times0.08=0.0784$.
3. $P(+)=0.018+0.0784=0.0964$.
4. $P(D\mid+)=0.018/0.0964\approx0.187$. **Answer: ≈ 0.187.**

**Galti kahan hoti hai:** 0.90 (sensitivity) ko hi answer maan lena. Ya numerator 0.018 par ruk jaana (joint, divide bhool gaye).

**Example 5 (NAT, hard):** Urn A me 3 white, 2 black; urn B me 2 white, 4 black. A se ek random ball B me daali gayi, phir B se ek ball nikaali. $P(\text{B se white})$ (4 decimal)?

**Soch:** Transfer problem → cause = transferred ball ka colour. B me ab 7 balls.

**Solution:**
1. Transfer white: prob $3/5$; B me ab 3W, 4B → $P(W)=3/7$.
2. Transfer black: prob $2/5$; B me ab 2W, 5B → $P(W)=2/7$.
3. $P(W)=\frac35\cdot\frac37+\frac25\cdot\frac27=\frac9{35}+\frac4{35}=\frac{13}{35}\approx0.3714$. **Answer: 0.3714.**

**Galti kahan hoti hai:** transfer bhool kar B ka original $2/6=0.333$ lena, ya denominator 6 hi rakhna ($\frac35\cdot\frac36+\frac25\cdot\frac26=\frac{13}{30}$).

**Example 6 (MSQ, hard):** Ek test ki sensitivity aur specificity dono 0.95 hain. Kaun se sahi hain?
(A) Prevalence 2% ho to $P(D\mid+)<0.5$
(B) Prevalence 50% ho to $P(D\mid+)=0.95$
(C) $P(+)=0.95$, prevalence kuch bhi ho
(D) Prevalence 50% ho to $P(D\mid-)=0.05$

**Soch:** Har prevalence ke liye recipe chalao; base rate ka asar dekho.

**Solution:**
1. (A): $\frac{0.02\cdot0.95}{0.019+0.98\cdot0.05}=\frac{0.019}{0.068}\approx0.279<0.5$. Sahi.
2. (B): $\frac{0.475}{0.475+0.025}=0.95$. Sahi (jab $\pi=0.5$ aur $s=c$, posterior $=s$).
3. (C): $P(+)=s\pi+(1-c)(1-\pi)$ prevalence par depend karta hai; $\pi=0.02$ par $0.068$, $\pi=0.5$ par $0.5$. Galat.
4. (D): $P(D\mid-)=\frac{0.5\cdot0.05}{0.5\cdot0.05+0.5\cdot0.95}=\frac{0.025}{0.5}=0.05$. Sahi.
**Answer: (A), (B), (D).**

**Galti kahan hoti hai:** (C) tick karna — sensitivity $P(+\mid D)$ ko $P(+)$ samajh lena.

## Confusions clear karo

**Q:** Total probability aur Bayes me farak kya hai?
**A:** Total probability result ki overall probability deta hai ($P(E)$) — saari branches ka sum. Bayes cause ki probability deta hai given result ($P(H_j\mid E)$) — ek branch ÷ sum. Bayes ka denominator hi total probability hai.

**Q:** Prior, likelihood, posterior — kaun kya?
**A:** Prior $P(H)$: result se pehle cause ka chance. Likelihood $P(E\mid H)$: cause maan kar result ka chance. Posterior $P(H\mid E)$: result dekhne ke baad cause ka updated chance.

**Q:** Accurate test ke baad bhi $P(D\mid+)$ itna kam kyun?
**A:** Kyunki theek log bahut zyada hain. 9900 ka 5% (495) bhi 100 ke 90% (90) se bada hai. Positive log zyaadatar theek wale galat positives hain.

**Q:** Numerator me kaunsi branch lun?
**A:** "Given … probability that it came from X" — X wali branch. Sawaal me jo cause naam se poochha hai, use circle karo. Baaki sab sirf denominator me jaate hain.

**Q:** Likelihoods ka sum 1 kyun nahi hota?
**A:** Kyunki har likelihood alag duniya (alag cause) me hai. 1 ka sum sirf ek hi duniya ke saare results par hota hai, jaise $P(+\mid D)+P(-\mid D)=1$.

**Q:** Odds form kab use karun?
**A:** Jab do hi hypotheses hon ($H$ aur $H^c$) aur ratio aasaan ho. Ek line me answer aata hai; end me odds ko probability me badalna mat bhoolo.

## Khud try karo

**1.** 30% emails spam hain. Ek shabd 40% spam me aur 10% non-spam me aata hai. (a) Random email me shabd aane ki probability? (b) Shabd aaya, email ke spam hone ki probability?

<details><summary>Answer dekho</summary>

(a) $0.3\times0.4+0.7\times0.1=0.12+0.07=0.19$.
(b) $0.12/0.19\approx0.632$.

</details>

**2.** Dibbe me do coins hain: ek fair, ek dono taraf heads wala. Ek random coin uthaya, uchhala, heads aaya. Coin ke two-headed hone ki probability?

<details><summary>Answer dekho</summary>

Priors $1/2$, $1/2$. Likelihoods: $P(H\mid\text{two-headed})=1$, $P(H\mid\text{fair})=1/2$.
Branches: $1/2$ aur $1/4$. Posterior $=\frac{1/2}{1/2+1/4}=\frac23\approx0.667$.

</details>

**3.** 0.5% transactions fraud hain. Detector 98% frauds aur 2% legitimate transactions ko flag karta hai. Flag aaya; fraud hone ki probability (3 decimal)?

<details><summary>Answer dekho</summary>

Fraud branch: $0.005\times0.98=0.0049$. Legit branch: $0.995\times0.02=0.0199$.
$P(\text{flag})=0.0248$. $P(\text{fraud}\mid\text{flag})=0.0049/0.0248\approx0.198$.

</details>

**4.** Prior odds $1:4$ hain aur likelihood ratio 6 hai. Posterior probability?

<details><summary>Answer dekho</summary>

Posterior odds $=\frac14\times6=\frac64=1.5$. $P=\frac{1.5}{1+1.5}=0.6$.

</details>

**5.** Solved Example 5 me, B se white nikli. Transfer hui ball white thi, iski probability?

<details><summary>Answer dekho</summary>

Bayes: white-transfer branch $=\frac9{35}$, total $=\frac{13}{35}$. $P=\frac{9/35}{13/35}=\frac9{13}\approx0.692$.

</details>

## Ek page me

- Partition: disjoint causes jo sab cover karein; priors ka sum 1.
- Tree pehle banao: cause → result; leaf = raste ka product.
- Total probability: $P(E)=\sum P(E\mid H_i)P(H_i)$ — weighted, simple average nahi.
- Bayes: $P(H_j\mid E)=$ poochhi gayi branch ÷ saari branches ka sum.
- Posteriors ka sum 1 — quick check.
- Joint (product) answer nahi; "given" hai to divide karo.
- Sensitivity $P(+\mid D)$, specificity $P(-\mid D^c)$, false-positive $=1-$ specificity.
- $P(D\mid+)=\frac{s\pi}{s\pi+(1-c)(1-\pi)}$; rare condition ⇒ chhota posterior.
- $\pi=0.5$ aur $s=c$ ho to $P(D\mid+)=s$.
- Odds form: posterior odds = prior odds × likelihood ratio; $P=\text{odds}/(1+\text{odds})$.
- Transfer: dono transfer branches weight karo; doosre urn ka size badalta hai.

Revision ke liye **Short note** tab dekho.
