# Relational algebra and tuple calculus

> **Time:** ~35 min · **Pehle aana chahiye:** tables, keys aur foreign keys (Day 36), sets ke union/intersection/difference · **Day:** 37

## Ye topic kyun?

SQL likhne se pehle database theory me queries ko do "maths languages" me likha jaata hai: **relational algebra** (operations ki recipe: pehle ye filter karo, phir ye join karo) aur **tuple relational calculus (TRC)** (sirf condition batao ki answer kaisa dikhe). GATE DA me inse 1–2 mark ke sawal aate hain: chhoti tables pe expression chala kar tuples ginna (NAT), division ka matlab, kaun si equivalence hamesha sahi hai (MSQ), aur TRC formula ko English me padhna (MCQ).

## Picture se samjho

Ek table ko ek grid socho. Algebra ke do sabse basic operations is grid ko do tarah se kaatte hain: **σ (sigma, selection)** horizontal kaat hai — kuch rows rakho; **π (pi, projection)** vertical kaat hai — kuch columns rakho.

<figure class="fig">
<svg viewBox="0 0 600 225" xmlns="http://www.w3.org/2000/svg" font-size="14" fill="currentColor">
<rect x="30" y="68" width="200" height="28" style="fill:var(--mark)" fill-opacity="0.3"/>
<rect x="30" y="124" width="200" height="28" style="fill:var(--mark)" fill-opacity="0.3"/>
<rect x="30" y="40" width="200" height="140" fill="none" stroke="currentColor"/>
<line x1="30" y1="68" x2="230" y2="68" stroke="currentColor"/>
<line x1="30" y1="96" x2="230" y2="96" stroke="currentColor"/>
<line x1="30" y1="124" x2="230" y2="124" stroke="currentColor"/>
<line x1="30" y1="152" x2="230" y2="152" stroke="currentColor"/>
<line x1="80" y1="40" x2="80" y2="180" stroke="currentColor"/>
<line x1="130" y1="40" x2="130" y2="180" stroke="currentColor"/>
<line x1="180" y1="40" x2="180" y2="180" stroke="currentColor"/>
<text x="55" y="59" text-anchor="middle">A</text>
<text x="105" y="59" text-anchor="middle">B</text>
<text x="155" y="59" text-anchor="middle">C</text>
<text x="205" y="59" text-anchor="middle">D</text>
<rect x="400" y="40" width="50" height="140" style="fill:var(--info)" fill-opacity="0.3"/>
<rect x="350" y="40" width="200" height="140" fill="none" stroke="currentColor"/>
<line x1="350" y1="68" x2="550" y2="68" stroke="currentColor"/>
<line x1="350" y1="96" x2="550" y2="96" stroke="currentColor"/>
<line x1="350" y1="124" x2="550" y2="124" stroke="currentColor"/>
<line x1="350" y1="152" x2="550" y2="152" stroke="currentColor"/>
<line x1="400" y1="40" x2="400" y2="180" stroke="currentColor"/>
<line x1="450" y1="40" x2="450" y2="180" stroke="currentColor"/>
<line x1="500" y1="40" x2="500" y2="180" stroke="currentColor"/>
<text x="375" y="59" text-anchor="middle">A</text>
<text x="425" y="59" text-anchor="middle">B</text>
<text x="475" y="59" text-anchor="middle">C</text>
<text x="525" y="59" text-anchor="middle">D</text>
<text x="130" y="205" text-anchor="middle">σ: condition wali rows</text>
<text x="450" y="205" text-anchor="middle">π: chune hue columns, duplicates hatao</text>
</svg>
<figcaption>σ rows chunta hai (horizontal), π columns chunta hai (vertical). π ke baad agar do rows same ban jaayein to ek hi bachti hai.</figcaption>
</figure>

Dhyan do: algebra me table ek **set** hai, yaani ek hi tuple (row) do baar nahi ho sakta. Isliye π ke baad duplicate rows mit jaati hain. Ye SQL se alag hai (SQL by default duplicates rakhta hai), aur GATE ka sabse common trap yahi hai.

Ab ek "every" wala sawal: "kin students ne **saare** core courses liye?" Neeche left me students, right me core courses, line = "is student ne ye course liya".

<figure class="fig">
<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" font-size="15" fill="currentColor">
<line x1="100" y1="40" x2="380" y2="90" style="stroke:var(--muted)"/>
<line x1="100" y1="40" x2="380" y2="170" style="stroke:var(--muted)"/>
<line x1="100" y1="80" x2="380" y2="90" style="stroke:var(--muted)"/>
<line x1="100" y1="80" x2="380" y2="170" style="stroke:var(--muted)"/>
<line x1="100" y1="120" x2="380" y2="170" style="stroke:var(--muted)"/>
<line x1="100" y1="160" x2="380" y2="170" style="stroke:var(--muted)"/>
<line x1="100" y1="200" x2="380" y2="90" style="stroke:var(--muted)"/>
<line x1="100" y1="200" x2="380" y2="170" style="stroke:var(--muted)"/>
<text x="80" y="45" text-anchor="end" style="fill:var(--good)">s1 ✓</text>
<text x="80" y="85" text-anchor="end" style="fill:var(--good)">s2 ✓</text>
<text x="80" y="125" text-anchor="end" style="fill:var(--bad)">s3 ✗</text>
<text x="80" y="165" text-anchor="end" style="fill:var(--bad)">s4 ✗</text>
<text x="80" y="205" text-anchor="end" style="fill:var(--good)">s5 ✓</text>
<rect x="380" y="74" width="60" height="32" fill="none" style="stroke:var(--info)"/>
<text x="410" y="95" text-anchor="middle">c1</text>
<rect x="380" y="154" width="60" height="32" fill="none" style="stroke:var(--info)"/>
<text x="410" y="175" text-anchor="middle">c3</text>
<text x="260" y="245" text-anchor="middle">Takes ÷ Core = {s1, s2, s5}: jinki line dono courses tak hai</text>
</svg>
<figcaption>Division: wahi student bachta hai jo Core ke har course se juda ho. s3, s4 ka c1 se link nahi, isliye bahar.</figcaption>
</figure>

Dhyan do: s3 ne c2 aur c4 bhi liye hain, par divisor (Core) sirf {c1, c3} hai; extra courses se koi farak nahi padta. Ye "for every" wala sawal join se nahi, **division** (÷) se hota hai.

## Concept step-by-step

Is section me ye tables use karenge:

**R**

| A | B |
|---|---|
| 1 | p |
| 2 | q |
| 3 | p |
| 4 | r |
| 5 | p |

**S**

| B | C |
|---|---|
| p | x |
| q | y |
| q | z |
| s | w |

### 1. Selection σ

$\sigma_p(R)$ = R ki wo rows jinke liye condition $p$ **true** hai. Columns waise hi rehte hain.

**Example:** $\sigma_{B = p}(R)$ = {(1, p), (3, p), (5, p)} — 3 rows.

Conditions jodne ke rules:
- $\sigma_{p \land q}(R) = \sigma_p(\sigma_q(R))$ — AND matlab do filter ek ke baad ek (**cascade**). Order badal sakte ho (**commute**).
- $\sigma_{p \lor q}(R) = \sigma_p(R) \cup \sigma_q(R)$ — OR matlab dono filters ke results ka union.

**Kyun?** Ek row AND paas karti hai jab dono filter paas kare; OR paas karti hai jab kam se kam ek filter paas kare, yaani wo $\sigma_p$ me ho ya $\sigma_q$ me.

Dhyan do: OR ↔ ∪, AND ↔ ∩. OR ko ∩ padhna common galti hai.

### 2. Projection π aur set semantics

$\pi_L(R)$ = sirf list $L$ wale columns rakho, aur **duplicate tuples hatao**.

**Example:** $\pi_B(R)$: B values p, q, p, r, p → set {p, q, r} = **3** tuples, 5 nahi.

Dhyan do: "σ ke baad kitni rows thi" aur "π ke baad kitne tuples" alag cheezein hain. π ke baad hamesha distinct gino.

### 3. Cartesian product, natural join, theta join

- **Product** $R \times S$: R ki har row S ki har row ke saath. Size = $|R| \cdot |S| = 5 \times 4 = 20$.
- **Natural join** $R \bowtie S$: product me se sirf wo jode jinki **saare common columns** ki values barabar hain; common column ek hi baar dikhta hai.
- **Theta join** $R \bowtie_{\theta} S$: product pe koi bhi condition θ (jaise $A < C$).

**Join size ka formula:** har common value $v$ ke liye (R me $v$ kitni baar) × (S me $v$ kitni baar), phir sab jodo:

$$|R \bowtie S| = \sum_v \text{count}_R(v)\cdot \text{count}_S(v)$$

**Kyun?** $v$ wali har R row, $v$ wali har S row ke saath judti hai — ek chhota product.

**Example:** B = p: R me 3, S me 1 → 3. B = q: R me 1, S me 2 → 2. r aur s ka koi partner nahi. Total = **5**.

| A | B | C |
|---|---|---|
| 1 | p | x |
| 2 | q | y |
| 2 | q | z |
| 3 | p | x |
| 5 | p | x |

**Bound:** agar B, S ki key hai, to har R row ko zyada se zyada ek partner milta hai → $|R \bowtie S| \le |R|$.

Dhyan do: natural join **saare** same-naam columns pe match karta hai. Agar dono tables me `name` column bhi ho, to wo bhi match hoga — anjaane me rows gayab ho sakti hain.

### 4. Outer joins

Inner join me partner-less rows gayab ho jaati hain. Outer join unhe NULL laga ke wapas laata hai:
- **Left outer** (⟕): inner + R ki unmatched rows (S ke columns NULL).
- **Right outer** (⟖): inner + S ki unmatched rows.
- **Full outer** (⟗): inner + dono ki unmatched rows.

**Example:** Inner = 5. R ki unmatched: (4, r). S ki unmatched: (s, w). Left outer = 5 + 1 = 6, full outer = 5 + 1 + 1 = **7**. Full outer ki extra rows: (4, r, NULL) aur (NULL, s, w).

Dhyan do: full outer = inner + unmatched R + unmatched S. Unmatched rows ek-ek baar hi aati hain.

### 5. Set operations: ∪, ∩, −

Ye tabhi chalti hain jab dono relations **union-compatible** hon: same number of columns, same domains. Aur ye **poore tuple** ko compare karti hain.

**R2** = {(1, x), (2, y), (3, z)}, **S2** = {(2, y), (3, x), (5, z)}

- $R2 \cap S2$ = {(2, y)} — sirf 1. (3, z) aur (3, x) ka A same hai par poora tuple nahi.
- $R2 - S2$ = {(1, x), (3, z)} — 2.
- $R2 \cup S2$ = 5 tuples.
- $\pi_A(R2) \cap \pi_A(S2)$ = {1,2,3} ∩ {2,3,5} = {2, 3} — 2.
- $\pi_B(R2) - \pi_B(S2)$ = {x,y,z} − {x,y,z} = ∅.

Useful identities:
- $R \cap S = R - (R - S)$ (R me se wo hatao jo S me nahi; bacha wo jo dono me hai). Symmetric: $S - (S - R)$.
- $|R \cup S|$ hamesha $\max(|R|, |S|)$ se $|R| + |S|$ ke beech.
- π ∪ pe distribute hota hai: $\pi_A(R \cup S) = \pi_A(R) \cup \pi_A(S)$. Par − aur ∩ pe **nahi**.

**Counterexample (π over −):** R = {(1, a), (2, b)}, S = {(1, b)}. $R - S = R$, to $\pi_A(R - S) = \{1, 2\}$. Lekin $\pi_A(R) - \pi_A(S) = \{1,2\} - \{1\} = \{2\}$. Alag!

Dhyan do: ∩ me ek column match hona kaafi nahi; saare columns match hone chahiye.

### 6. Division ÷ ("for every")

$R(A, B) \div S(B)$ = R ke wo A values jo S ke **har** B ke saath R me paired hain.

**Formula (sirf basic operations se):**

$$R \div S = \pi_A(R) - \pi_A\big((\pi_A(R) \times S) - R\big)$$

**Kyun?** Step by step padho:
1. $\pi_A(R) \times S$ = "agar har A ne har B kiya hota" — saare ideal jode.
2. Usme se R ghatao → wo jode jo **missing** hain.
3. In missing jodon ke A values = "fail" hone wale.
4. Saare A me se fail wale hatao → pass wale.

**Example:** Takes(sid, cid) aur Core(cid) = {c1, c3}.

**Takes**

| sid | cid |
|---|---|
| s1 | c1 |
| s1 | c2 |
| s1 | c3 |
| s2 | c1 |
| s2 | c3 |
| s3 | c2 |
| s3 | c3 |
| s3 | c4 |
| s4 | c3 |
| s5 | c1 |
| s5 | c3 |
| s5 | c4 |

1. $\pi_{sid}$(Takes) = {s1, s2, s3, s4, s5}.
2. × Core = 10 jode.
3. − Takes → missing: (s3, c1), (s4, c1).
4. Fail = {s3, s4}. Result = {s1, s2, s5} → **3** tuples.

**Empty divisor:** agar S = ∅, to step 1 ka product ∅, missing ∅, kuch nahi hatta → $R \div \emptyset = \pi_A(R)$ (yahan 5). Logic: "har element of empty set" wali condition hamesha true hoti hai (vacuous truth).

Dhyan do: σ, ⋈, π se sirf "kam se kam ek" milta hai. "Every / all" ke liye ÷ (ya TRC me ∀) chahiye.

### 7. Expressions ko padhna

Jab ek σ, join ke **baad** lagta hai, to uski saari conditions **ek hi joined tuple** pe check hoti hain. Example: Student ⋈ Enrolled ⋈ Course pe $\sigma_{credits > 3 \land grade = 'A'}$ ka matlab: "ek hi enrolment jisme course > 3 credits ka hai **aur** usi me grade A aaya". Ye nahi ki "kahin A aaya aur kahin aur 4-credit course liya".

"No / kabhi nahi" type sawal ke liye difference: "jo kisi course me enrolled nahi" = $\pi_{sid}(\text{Student}) - \pi_{sid}(\text{Enrolled})$.

Dhyan do: theta join me $<$ aur $\le$ ka farak gino; boundary values (barabar wale) se answer badalta hai.

### 8. Tuple relational calculus (TRC)

TRC me hum likhte hain $\{\, t \mid P(t) \,\}$ = "wo saare tuples $t$ jinke liye $P(t)$ true hai". $P$ me use hote hain:
- $t \in R$ ("t, R ki row hai"), comparisons ($t.sid = e.sid$), ∧, ∨, ¬.
- $\exists e \in R\,(\dots)$ = "R me **kam se kam ek** row aisi hai ki …".
- $\neg\exists e \in R\,(\dots)$ = "R me **koi bhi** row aisi nahi".
- $\forall x \in R\,(P(x) \Rightarrow Q(x))$ = "R ki **har** row jo P satisfy kare, wo Q bhi satisfy kare".

**Pairing rule:** ∀ ke saath ⇒, ∃ ke saath ∧.

**Kyun?** $\forall c\,(red(c) \land supplies(t,c))$ kehta hai "har part red hai **aur** t use supply karta hai" — agar ek bhi part blue hai to ye false, chahe t ne saare red parts diye hon. Sahi: $\forall c\,(red(c) \Rightarrow supplies(t,c))$ — blue part ke liye implication apne aap true (false ⇒ kuch bhi = true), sirf red parts check hote hain.

**"Every" vs "only":**
- Every red part: $\forall p\,(red(p) \Rightarrow supplies(t, p))$.
- Only red parts: $\forall u \in \text{Supplies}\,(u.sid = t.sid \Rightarrow red(u.pid))$ — t ke har supply ka part red ho. Ye implication ulta hai.

**Example:** $\{\, t.name \mid t \in \text{Student} \land \neg\exists e \in \text{Enrolled}\,(e.sid = t.sid) \,\}$ = un students ke naam jinka ek bhi enrolment nahi.

Dhyan do: implication ki direction badalne se "every" ka "only" ban jaata hai.

### 9. Safety aur expressive power

Ek query **safe** hai agar uska har answer database me maujood values (ya query ke constants) se hi bane. $\{\, t \mid \neg(t \in R) \,\}$ unsafe hai: "jo R me nahi" — aise to infinite tuples hain (duniya ki har cheez).

**Rule of thumb:** har ¬ ya ∨ wala part tabhi safe hai jab $t$ pehle kisi positive atom (jaise $t \in R$) se **∧** ke through bandha ho.
- $\{t \mid t \in R \land \neg(t \in S)\}$ — safe (ye $R - S$ hai).
- $\{t \mid t \in R \lor \neg(t \in S)\}$ — unsafe (∨ ka doosra hissa akele infinite).
- $\{t \mid t \in R \lor t \in S\}$ — safe ($R \cup S$).

**Expressive power:** safe TRC = safe DRC (domain calculus) = relational algebra. Is property ko **relational completeness** kehte hain. Aggregates (COUNT, AVG) aur recursion teeno me se kisi me nahi.

Dhyan do: ∀ hone se TRC zyada powerful nahi hota; algebra me wahi kaam ÷ (ya −) karta hai.

## Solved examples

**Example 1 (NAT, easy):** T(A, B, C):

| A | B | C |
|---|---|---|
| 1 | x | 0 |
| 2 | y | 1 |
| 3 | x | 1 |
| 1 | y | 1 |
| 4 | z | 0 |
| 2 | x | 1 |

$\pi_B\big(\sigma_{A \ge 2 \,\lor\, C = 0}(T)\big)$ me kitne tuples hain?

**Soch:** σ row by row, phir π me distinct.

**Solution:**
1. Har row check: (1,x,0): C = 0 ✓. (2,y,1): A ≥ 2 ✓. (3,x,1) ✓. (1,y,1): A = 1 aur C = 1 ✗. (4,z,0) ✓. (2,x,1) ✓.
2. σ ke baad 5 rows. B values: x, y, x, z, x.
3. π distinct: {x, y, z} → **3**.

**Galti kahan hoti hai:** 5 likh dena (π ka duplicate removal bhool gaye). Ya ∨ ko ∧ padh kar sirf (4, z, 0) → 1.

**Example 2 (NAT, easy–medium):** Upar wale R(A, B) aur S(B, C) (Concept section) ka full outer join on B — kitne tuples?

**Soch:** full outer = inner + dono taraf ke unmatched.

**Solution:**
1. Inner: p → 3 × 1 = 3, q → 1 × 2 = 2. Total 5.
2. R unmatched: B = r → (4, r, NULL). 1 row.
3. S unmatched: B = s → (NULL, s, w). 1 row.
4. Total = 5 + 1 + 1 = **7**.

**Galti kahan hoti hai:** inner join ko $3 + 1$ gin lena (S me q do baar hai, to 2 ko 2 se multiply karna tha). Ya left outer (6) pe ruk jaana.

**Example 3 (MSQ, medium):** R, S union-compatible relations, $p, q$ R ke attributes pe conditions. Kaun si equivalences **hamesha** sahi hain?
(A) $\sigma_{p \lor q}(R) = \sigma_p(R) \cup \sigma_q(R)$
(B) $\pi_A(R \cup S) = \pi_A(R) \cup \pi_A(S)$
(C) $\pi_A(R - S) = \pi_A(R) - \pi_A(S)$
(D) $R - (S - R) = R \cap S$

**Soch:** har option ke liye ya to proof soch, ya chhota counterexample.

**Solution:**
1. (A) OR = union of filters ✓.
2. (B) koi row R ya S me ho to uska A projection ke union me hoga, aur ulta bhi ✓.
3. (C) Counterexample R = {(1,a),(2,b)}, S = {(1,b)}: LHS {1,2}, RHS {2} ✗.
4. (D) $S - R$ me R ka koi tuple hai hi nahi, to $R - (S - R) = R$, jo $R \cap S$ se bada ho sakta hai ✗.
5. Answer **(A), (B)**.

**Galti kahan hoti hai:** (C) ko "projection har jagah distribute hota hai" maan kar tick karna. Problem: ek A value R aur S dono me alag B ke saath ho sakti hai.

**Example 4 (NAT, medium):** Concept section ki Takes table aur Core = {c1, c3}. Agar Core me c4 bhi jod dein (Core = {c1, c3, c4}), to Takes ÷ Core me kitne tuples?

**Soch:** "har core course" → division; har student ka check.

**Solution:**
1. s1: c1 ✓, c3 ✓, c4 ✗ → fail.
2. s2: c4 ✗ → fail.
3. s3: c1 ✗ → fail.
4. s4: c1 ✗ → fail.
5. s5: c1 ✓, c3 ✓, c4 ✓ → pass.
6. Answer = **1** ({s5}).

**Galti kahan hoti hai:** s1 ko gin lena kyunki usne "sabse zyada" courses liye — par c4 nahi liya. Division me count nahi, **coverage** dekho.

**Example 5 (MCQ, medium):** Emp(eid), Knows(eid, skill), Skill(skill, kind). Kaun sa formula (saath me $t \in \text{Emp}$) un employees ko deta hai jo **har** 'core' kind wali skill jaante hain?
(A) $\forall s \in \text{Skill}\,\big(s.kind = 'core' \land \exists k \in \text{Knows}\,(k.eid = t.eid \land k.skill = s.skill)\big)$
(B) $\forall s \in \text{Skill}\,\big(s.kind = 'core' \Rightarrow \exists k \in \text{Knows}\,(k.eid = t.eid \land k.skill = s.skill)\big)$
(C) $\exists s \in \text{Skill}\,\big(s.kind = 'core' \land \exists k \in \text{Knows}\,(k.eid = t.eid \land k.skill = s.skill)\big)$
(D) $\forall k \in \text{Knows}\,\big(k.eid = t.eid \Rightarrow \exists s \in \text{Skill}\,(s.skill = k.skill \land s.kind = 'core')\big)$

**Soch:** "har X jo P ho" → ∀ ke saath ⇒.

**Solution:**
1. (B) ∀ + ⇒: har core skill ke liye t ka Knows row ho ✓.
2. (A) ∀ + ∧: "har skill core hai aur …" — ek bhi non-core skill ho to sab ke liye false.
3. (C) = kam se kam ek core skill.
4. (D) = t ki jaani hui har skill core hai, yaani "only core skills".
5. Answer **(B)**.

**Galti kahan hoti hai:** (D) chun lena kyunki usme bhi ∀ aur ⇒ hai — par direction ulti hai; wo "only" hai, "every" nahi.

**Example 6 (NAT, hard):**

**Student**

| sid | name |
|---|---|
| 1 | Asha |
| 2 | Ravi |
| 3 | Meena |
| 4 | Kabir |
| 5 | Nisha |

**Enrolled**

| sid | cid |
|---|---|
| 1 | c1 |
| 1 | c3 |
| 2 | c1 |
| 2 | c2 |
| 3 | c3 |
| 3 | c1 |
| 3 | c4 |
| 4 | c2 |

**Course**

| cid | credits |
|---|---|
| c1 | 4 |
| c2 | 3 |
| c3 | 4 |
| c4 | 2 |

Query ke kitne tuples?

$$\{\, t.name \mid t \in \text{Student} \land \forall e \in \text{Enrolled}\,\big(e.sid = t.sid \Rightarrow \exists c \in \text{Course}\,(c.cid = e.cid \land c.credits = 4)\big) \,\}$$

**Soch:** ∀ Enrolled-rows of t ⇒ "only 4-credit courses". Jiska koi enrolment nahi, uske liye condition vacuously true.

**Solution:**
1. Asha (1): c1 (4), c3 (4) → sab 4 ✓.
2. Ravi (2): c2 (3) ✗.
3. Meena (3): c4 (2) ✗.
4. Kabir (4): c2 (3) ✗.
5. Nisha (5): koi enrolment nahi → $e.sid = t.sid$ kabhi true nahi → implication har e ke liye true ✓.
6. Names {Asha, Nisha} → **2**. (Python se check kiya.)

**Galti kahan hoti hai:** Nisha ko chhod kar 1 bolna. ∀ ke andar implication ka LHS kabhi true na ho to poora ∀ true hota hai. Aur agar ise "har 4-credit course liya" padh lo to Asha, Meena aate (wo alag query hai).

## Confusions clear karo

**Q:** Algebra me π duplicates kyun hata deta hai, SQL me kyun nahi?
**A:** Relational model me relation ek **set** hai, aur set me repeat nahi hota. SQL practical reasons (speed) ke liye **multiset (bag)** use karta hai; duplicates hatane ke liye `DISTINCT` likhna padta hai.

**Q:** Natural join aur theta/equi join me farak?
**A:** Natural join khud hi saare same-naam columns pe equality lagata hai aur common column ek baar dikhata hai. Theta join me condition tum likhte ho, aur dono columns rehte hain.

**Q:** R ∩ S me "kuch columns match" kaafi kyun nahi?
**A:** ∩ tuples ka intersection hai; tuple tab barabar jab har position ki value barabar. (3, z) aur (3, x) do alag tuples hain.

**Q:** Division ki jagah join + π kyun nahi chalega?
**A:** Join + π batata hai "kam se kam ek required course liya". "Saare liye" check karne ke liye missing pairs dhoondhne padte hain — jo division ka formula karta hai.

**Q:** R ÷ ∅ empty kyun nahi?
**A:** "Har course of empty list liya" har student ke liye true hai (koi course hai hi nahi jo fail kare). Formula bhi yahi deta hai: $\pi_A(R) - \emptyset$.

**Q:** TRC me ∀ ke saath ∧ kyun nahi?
**A:** ∀ saare tuples pe chalta hai, sirf interested wale pe nahi. ∧ lagane se non-interested tuples (blue part) pe condition false ho jaati hai aur poora ∀ false. ⇒ unhe "ignore" karta hai.

**Q:** Unsafe query ka practical matlab?
**A:** Answer infinite ya database ke bahar ki values se ban sakta hai, jo compute hi nahi ho sakta. Isliye theory sirf safe queries ko allow karti hai.

## Khud try karo

**1.** R(A) = {1, 3, 5}, S(C) = {2, 3, 4, 6}. $R \bowtie_{A < C} S$ aur $R \bowtie_{A \le C} S$ me kitne tuples?

<details><summary>Answer dekho</summary>

A = 1: C ∈ {2,3,4,6} → 4 (dono me). A = 3: $<$ → {4, 6} = 2; $\le$ → {3, 4, 6} = 3. A = 5: {6} → 1. Total: $<$ me **7**, $\le$ me **8**.

</details>

**2.** R(A, B) me 8 tuples, S(B, C) me 5 tuples, B S ki primary key. $|R \bowtie S|$ ka maximum aur minimum?

<details><summary>Answer dekho</summary>

Har R row ka zyada se zyada 1 partner → max = $|R|$ = **8** (jab R ki har B value S me ho). Min = **0** (koi B match na kare).

</details>

**3.** Kaun si TRC queries unsafe hain? (a) $\{t \mid t \in R \land \neg(t \in S)\}$ (b) $\{t \mid \neg(t \in R) \land \neg(t \in S)\}$ (c) $\{t \mid t \in R \lor t \in S\}$

<details><summary>Answer dekho</summary>

Sirf **(b)** unsafe: t kisi positive atom se bandha nahi, "na R me na S me" wale infinite tuples. (a) = $R - S$, (c) = $R \cup S$, dono safe.

</details>

**4.** Concept section ki Takes table aur Core = ∅. Formula $\pi_{sid}(\text{Takes}) - \pi_{sid}((\pi_{sid}(\text{Takes}) \times \text{Core}) - \text{Takes})$ kitne tuples deta hai?

<details><summary>Answer dekho</summary>

Product ∅, missing ∅, kuch nahi hata. Result = $\pi_{sid}$(Takes) = {s1, s2, s3, s4, s5} → **5**.

</details>

## Ek page me

- Algebra = set semantics: π aur ∪ duplicates hataate hain; π ke baad distinct gino.
- $\sigma_{p\land q} = \sigma_p \circ \sigma_q$; $\sigma_{p\lor q} = \sigma_p \cup \sigma_q$.
- Natural join saare common columns pe; $|R \bowtie S| = \sum_v \text{count}_R(v)\,\text{count}_S(v)$; B key of S ⇒ $\le |R|$.
- Left outer = inner + unmatched R; full outer = inner + unmatched R + unmatched S.
- ∪, ∩, − ke liye union-compatible schema; poore tuple ki equality.
- $R \cap S = R - (R - S)$; $|R \cup S| \in [\max, \text{sum}]$.
- π ∪ pe distribute hota hai, − aur ∩ pe nahi.
- $R \div S = \pi_A(R) - \pi_A((\pi_A(R) \times S) - R)$; $R \div \emptyset = \pi_A(R)$. "Every" ⇒ division.
- Join ke baad σ ki saari conditions ek hi joined tuple pe.
- TRC: ∃ = kam se kam ek, ¬∃ = koi nahi, ∀ ke saath ⇒, ∃ ke saath ∧. Implication ulta = "only".
- Safe: har answer DB ki values se; $\neg(t \in R)$ akela unsafe. Safe TRC = safe DRC = algebra; aggregates kisi me nahi.

Revision ke liye **Short note** tab dekho.
