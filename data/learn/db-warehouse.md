# Data warehousing, OLAP and data transformation

> **Time:** ~35 min · **Pehle aana chahiye:** tables aur foreign keys (Day 36), SQL GROUP BY (Day 38), mean aur standard deviation, $\binom{n}{r}$ · **Day:** 41

## Ye topic kyun?

Roz ke transactions (billing, orders) chalane wala database (OLTP) analysis ke liye theek nahi — manager ko "pichle 3 saal, har state, har category ki sales" chahiye. Iske liye data ko ek **data warehouse** me alag dhang (star/snowflake schema) se rakha jaata hai, aur **OLAP** operations (roll-up, slice, dice) se ghuma-ghuma ke dekha jaata hai. Data load karne se pehle use **transform** (normalize, bins me baantna) aur **reduce** (sampling) bhi karte hain. GATE DA me yahan se seedhe sawal aate hain: fact vs dimension (MCQ), measure ka type (MSQ), cuboids/CUBE/ROLLUP ki rows (NAT), min-max / z-score / bins (NAT), sampling probability (NAT).

## Picture se samjho

Ek retail company socho. Har bikri ek **fact** hai: "kab, kya, kahan, kisko, kitne units, kitne rupaye". "Kab/kya/kahan/kisko" **dimensions** hain (inke baare me detail alag tables me), aur "kitne units, kitne rupaye" **measures** hain (numbers jinka SUM/AVG banta hai).

<figure class="fig">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" font-size="13" fill="currentColor">
<rect x="210" y="105" width="180" height="100" rx="6" fill="none" style="stroke:var(--mark)" stroke-width="2"/>
<text x="300" y="127" text-anchor="middle" font-weight="bold">Sales (fact)</text>
<text x="300" y="150" text-anchor="middle" font-size="12">time_key, prod_key,</text>
<text x="300" y="166" text-anchor="middle" font-size="12">store_key, cust_key</text>
<text x="300" y="190" text-anchor="middle" font-size="12" style="fill:var(--mark)">units, amount</text>
<rect x="20" y="20" width="150" height="60" rx="6" fill="none" style="stroke:var(--info)"/>
<text x="95" y="44" text-anchor="middle" font-weight="bold">Time</text>
<text x="95" y="64" text-anchor="middle" font-size="11">day, month, quarter, year</text>
<rect x="430" y="20" width="150" height="60" rx="6" fill="none" style="stroke:var(--info)"/>
<text x="505" y="44" text-anchor="middle" font-weight="bold">Product</text>
<text x="505" y="64" text-anchor="middle" font-size="11">name, brand, category</text>
<rect x="20" y="225" width="150" height="60" rx="6" fill="none" style="stroke:var(--info)"/>
<text x="95" y="249" text-anchor="middle" font-weight="bold">Store</text>
<text x="95" y="269" text-anchor="middle" font-size="11">city, state, country</text>
<rect x="430" y="225" width="150" height="60" rx="6" fill="none" style="stroke:var(--info)"/>
<text x="505" y="249" text-anchor="middle" font-weight="bold">Customer</text>
<text x="505" y="269" text-anchor="middle" font-size="11">name, age_group</text>
<line x1="210" y1="120" x2="170" y2="70" stroke="currentColor"/>
<line x1="390" y1="120" x2="430" y2="70" stroke="currentColor"/>
<line x1="210" y1="190" x2="170" y2="235" stroke="currentColor"/>
<line x1="390" y1="190" x2="430" y2="235" stroke="currentColor"/>
<rect x="455" y="118" width="110" height="40" rx="6" fill="none" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<text x="510" y="143" text-anchor="middle" font-size="12" style="fill:var(--muted)">Category</text>
<line x1="510" y1="80" x2="510" y2="118" style="stroke:var(--muted)" stroke-dasharray="4 3"/>
<text x="300" y="20" text-anchor="middle" font-size="11" style="fill:var(--muted)">dashed = snowflake me alag table</text>
</svg>
<figcaption>Star schema: beech me fact table (dimension keys + measures), chaaron taraf dimension tables. Snowflake me dimension ke hisse (jaise Category) alag normalized tables ban jaate hain.</figcaption>
</figure>

Dhyan do: foreign keys **fact table** me hain jo dimensions ko point karti hain — dimension table fact ko point nahi karti. Measures (units, amount) bhi fact me hain; descriptive cheezein (city, brand) dimensions me.

Ab socho tumhare paas 3 dimensions hain: time, city, item. Tum data ko kisi bhi subset se group kar sakte ho — har ek grouping ko **cuboid** kehte hain.

<figure class="fig">
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" font-size="13" fill="currentColor">
<defs><marker id="dwa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<line x1="300" y1="45" x2="120" y2="95" style="stroke:var(--muted)"/>
<line x1="300" y1="45" x2="300" y2="95" style="stroke:var(--muted)"/>
<line x1="300" y1="45" x2="480" y2="95" style="stroke:var(--muted)"/>
<line x1="120" y1="125" x2="120" y2="175" style="stroke:var(--muted)"/>
<line x1="120" y1="125" x2="300" y2="175" style="stroke:var(--muted)"/>
<line x1="300" y1="125" x2="120" y2="175" style="stroke:var(--muted)"/>
<line x1="300" y1="125" x2="480" y2="175" style="stroke:var(--muted)"/>
<line x1="480" y1="125" x2="300" y2="175" style="stroke:var(--muted)"/>
<line x1="480" y1="125" x2="480" y2="175" style="stroke:var(--muted)"/>
<line x1="120" y1="205" x2="300" y2="255" style="stroke:var(--muted)"/>
<line x1="300" y1="205" x2="300" y2="255" style="stroke:var(--muted)"/>
<line x1="480" y1="205" x2="300" y2="255" style="stroke:var(--muted)"/>
<rect x="240" y="15" width="120" height="30" rx="6" style="fill:var(--good)" fill-opacity="0.15" stroke="currentColor"/>
<text x="300" y="35" text-anchor="middle">( ) apex</text>
<rect x="60" y="95" width="120" height="30" rx="6" fill="none" stroke="currentColor"/><text x="120" y="115" text-anchor="middle">(time)</text>
<rect x="240" y="95" width="120" height="30" rx="6" fill="none" stroke="currentColor"/><text x="300" y="115" text-anchor="middle">(city)</text>
<rect x="420" y="95" width="120" height="30" rx="6" fill="none" stroke="currentColor"/><text x="480" y="115" text-anchor="middle">(item)</text>
<rect x="60" y="175" width="120" height="30" rx="6" fill="none" stroke="currentColor"/><text x="120" y="195" text-anchor="middle">(time, city)</text>
<rect x="240" y="175" width="120" height="30" rx="6" fill="none" stroke="currentColor"/><text x="300" y="195" text-anchor="middle">(time, item)</text>
<rect x="420" y="175" width="120" height="30" rx="6" fill="none" stroke="currentColor"/><text x="480" y="195" text-anchor="middle">(city, item)</text>
<rect x="225" y="255" width="150" height="30" rx="6" style="fill:var(--info)" fill-opacity="0.15" stroke="currentColor"/>
<text x="300" y="275" text-anchor="middle">(time, city, item) base</text>
<line x1="25" y1="260" x2="25" y2="30" style="stroke:var(--good)" marker-end="url(#dwa)"/>
<text x="35" y="150" font-size="12" style="fill:var(--good)">roll-up</text>
<line x1="575" y1="30" x2="575" y2="260" style="stroke:var(--info)" marker-end="url(#dwa)"/>
<text x="565" y="150" text-anchor="end" font-size="12" style="fill:var(--info)">drill-down</text>
</svg>
<figcaption>3 dimensions ke 2³ = 8 cuboids. Base cuboid sabse detailed, apex ( ) = grand total. Upar jaana = roll-up, neeche = drill-down.</figcaption>
</figure>

Dhyan do: har cuboid dimensions ka ek **subset** hai, isliye n dimensions ke $2^n$ cuboids. Khaali subset ( ) bhi gina jaata hai — wahi "grand total" row hai jo log bhool jaate hain.

## Concept step-by-step

### 1. Fact table, dimension tables, star vs snowflake

- **Fact table:** har row ek event (ek sale). Columns = dimension tables ki foreign keys + numeric **measures**.
- **Dimension table:** descriptive attributes aur hierarchy levels (city, state, brand, month).
- **Star schema:** har dimension ki **ek** denormalized table → kam joins, par kuch redundancy (har store row me state ka naam dobara).
- **Snowflake schema:** dimensions ko normalize karke kai tables (Store → City → State) → kam redundancy, **zyada joins**.

**Example:** star me 1 fact + 4 dims = 5 tables. Agar Store ko Store, City, State me aur Product ko Product, Category me tod dein → 1 + 1 (Time) + 1 (Customer) + 3 + 2 = **8** tables.

Dhyan do: snowflake me redundancy **kam** hoti hai, star me joins kam.

### 2. Measures ke teen type

| Type | Kis dimension pe SUM valid | Example |
|---|---|---|
| Additive | sab pe | units_sold, sales_amount |
| Semi-additive | kuch pe (time pe nahi) | account balance, stock level |
| Non-additive | kisi pe nahi | profit margin %, average price |

**Kyun balance semi-additive?** Saare accounts ka aaj ka balance jodna sahi hai (bank ka total paisa). Par ek account ka Monday + Tuesday balance jodna bekaar — wahi paisa do baar gina. Time pe AVG ya last value lete hain.

**Kyun % non-additive?** 10% margin + 20% margin = 30% nahi. Sahi tareeka: additive parts (profit, revenue) alag-alag jodo, phir divide.

Dhyan do: "flow" (kitna bika) additive; "level/snapshot" (kitna pada hai) semi-additive; "ratio" non-additive.

### 3. Concept hierarchy aur OLAP operations

**Concept hierarchy** detailed se general: street < city < state < country; day < month < quarter < year.

| Operation | Kya hota hai | Example |
|---|---|---|
| Roll-up | hierarchy me upar (ya ek dimension hata do) | city → country |
| Drill-down | neeche, zyada detail | year → quarter |
| Slice | **ek** dimension ko ek value pe fix → (n−1)-D view | item = 'Laptop' |
| Dice | **do ya zyada** dimensions pe conditions → chhota sub-cube | time ∈ {Q1, Q2} aur city ∈ {Delhi, Pune} |
| Pivot | axes ghumana (rows ↔ columns), data same | |

Dhyan do: slice = ek dimension, ek value. Ek se zyada dimension pe filter = dice.

### 4. Cuboids ki ginti

**Bina hierarchy:** n dimensions → $2^n$ cuboids (har dimension ya to group me hai ya nahi).

**Hierarchy ke saath:** dimension $i$ ke $L_i$ levels hain. Har dimension ke liye choices = $L_i$ levels + 1 "all" (dimension hata diya):

$$\text{cuboids} = \prod_i (L_i + 1)$$

**Example:** time (day < month < quarter < year: 4), product (item < category: 2), store (city < state: 2) → $5 \times 3 \times 3 = 45$.

Dhyan do: "+1" = "all" level. Bina hierarchy wala case iska special case hai: $L_i = 1$ → $2^n$.

### 5. GROUP BY CUBE aur ROLLUP — rows ginna

`GROUP BY CUBE(a, b)` = saare $2^2$ grouping sets: (a, b), (a), (b), ( ). Har grouping set me jitne **distinct groups** data me hain, utni rows.

**Agar saare combinations data me hain** (a ki $n_a$ values, b ki $n_b$):

$$\text{rows} = (n_a + 1)(n_b + 1)$$

**Kyun?** Expand karo: $n_a n_b + n_a + n_b + 1$ = (a,b) groups + (a) groups + (b) groups + 1 grand total. "+1" = "all" value.

**Example:** 3 regions, 4 products, sab combos → $4 \times 5 = 20$ = 12 + 3 + 4 + 1.

`GROUP BY ROLLUP(a, b)` = sirf hierarchy wale prefixes: (a, b), (a), ( ). k columns → k + 1 grouping sets. Same data: 12 + 3 + 1 = **16**.

**Jab kuch combinations missing hon** to formula mat lagao — har grouping set ke distinct groups gino aur jodo (Example 3).

Dhyan do: ROLLUP pe CUBE ka formula mat lagao; aur grand total (1) mat bhoolo.

### 6. Min-max normalization

Values ko naye range [new_min, new_max] me linearly le jaana:

$$v' = \frac{v - \min}{\max - \min}\,(\text{new\_max} - \text{new\_min}) + \text{new\_min}$$

**Kyun?** $\frac{v - \min}{\max - \min}$ batata hai v range me kitna aage hai (0 se 1 ke beech fraction). Phir us fraction ko naye range pe stretch aur shift karo.

**Example:** marks 20 se 95. v = 68 → fraction = 48/75 = 0.64. [0, 1] me **0.64**; [0, 10] me **6.4**; [−1, 1] me $0.64 \times 2 - 1$ = **0.28**.

Dhyan do: naye range ka "+ new_min" bhoolna common hai jab new_min 0 na ho.

### 7. Z-score normalization

$$z = \frac{v - \mu}{\sigma}$$

z batata hai v mean se kitne standard deviations door hai.

**Example:** data 2, 2, 4, 8, 10, 16. μ = 42/6 = 7. Deviations: −5, −5, −3, 1, 3, 9; squares 25, 25, 9, 1, 9, 81 = 150. **Population** σ² = 150/6 = 25 → σ = 5. z(16) = 9/5 = **1.8**. (Sample σ = $\sqrt{150/5} = \sqrt{30} \approx 5.477$ se z ≈ 1.643 — sawal jo bole wahi lo.)

Dhyan do: σ se divide karo, variance (25) se nahi.

### 8. Decimal scaling

$v' = v / 10^j$, jahan j **sabse chhota** integer jisse $\max |v'| < 1$.

**Example:** range −450 se 1230. max|v| = 1230. j = 3 → 1.23 (≥ 1, nahi chalega). j = 4 → 0.123 ✓. To **j = 4**.

Dhyan do: "digits ginke j" sirf tab jab max|v| exactly 10 ki power na ho; condition $< 1$ strict hai (1000 ke liye j = 4).

### 9. Discretization (binning) aur smoothing

- **Equal-width:** k bins, width = (max − min)/k.
- **Equal-frequency (equal-depth):** har bin me lagbhag same number of values.

**Equal-width example:** 5, 7, 12, 18, 21, 25, 30, 33, 41, 45; k = 4 → width = 40/4 = 10. Bins [5, 15), [15, 25), [25, 35), [35, 45]:

| Bin | Values | Count |
|---|---|---|
| [5, 15) | 5, 7, 12 | 3 |
| [15, 25) | 18, 21 | 2 |
| [25, 35) | 25, 30, 33 | 3 |
| [35, 45] | 41, 45 | 2 |

25 boundary pe hai → left-closed rule se teesre bin me.

**Smoothing** (har bin ki values ko ek representative se badlo), bin {4, 9, 11} pe:
- By mean: 24/3 = 8 → {8, 8, 8}.
- By median: {9, 9, 9}.
- By boundaries: har value nearest boundary (min 4 ya max 11) pe: 4 → 4, 9 → 11 (11 sirf 2 door), 11 → 11 → {4, 11, 11}.

Dhyan do: boundary value kis bin me jaayegi, ye sawal ka "closed/open" rule decide karta hai.

### 10. Sampling aur data reduction

N tuples me se s ka sample:
- **SRSWOR** (without replacement): koi tuple do baar nahi. Possible samples $\binom{N}{s}$; ek particular tuple ke chune jaane ki probability $s/N$.
- **SRSWR** (with replacement): har draw me wapas daal do. Ek tuple kabhi na chune jaane ki probability $(1 - 1/N)^s$, to kam se kam ek baar: $1 - (1 - 1/N)^s$.
- **Stratified:** data ko groups (strata) me baanto, har stratum se sample. Proportional share = (stratum size / N) × s. Fayda: rare group bhi represent hota hai.
- **Cluster:** poore groups chuno (jaise poore disk pages).

**Example:** 800 customers: 480 / 240 / 80, s = 40 proportional → 24, 12, **4**.

**Lossless vs lossy reduction:** run-length encoding, dictionary coding se original exact wapas → lossless. PCA ke top-k components, wavelet ke chhote coefficients zero karna, sampling → lossy.

Dhyan do: SRSWR ki probability $s/N$ nahi hoti; repeats ki wajah se thodi kam hoti hai.

## Solved examples

**Example 1 (MCQ, easy):** Cube (time, city, product) pe analyst `product = 'Laptop'` fix karke (time, city) ki 2-D table dekhta hai. Ye kaun sa operation hai?
(A) Roll-up (B) Slice (C) Dice (D) Pivot

**Soch:** ek dimension, ek value → slice.

**Solution:**
1. Sirf product dimension pe condition, aur wo bhi ek value.
2. Result me ek dimension kam (3-D → 2-D).
3. Answer **(B) Slice**.

**Galti kahan hoti hai:** (C) Dice chunna — "filter lagaya to dice". Dice tab jab **do ya zyada** dimensions pe conditions hon.

**Example 2 (MSQ, medium):** Kaun se statements sahi hain?
(A) Warehouse me roz ka inventory (stock level) semi-additive measure hai.
(B) Average selling price ek additive measure hai.
(C) Star schema me fact table, dimension tables ki foreign keys rakhta hai.
(D) Snowflake schema me star ke mukable queries ko kam joins chahiye.

**Soch:** measure type + schema ka direction.

**Solution:**
1. (A) Stock level snapshot hai: stores pe jod sakte ho, din pe nahi → semi-additive ✓.
2. (B) Average ratio hai → non-additive ✗.
3. (C) FKs fact me ✓.
4. (D) Snowflake me dimensions tooti hui → **zyada** joins ✗.
5. Answer **(A), (C)**.

**Galti kahan hoti hai:** (D) tick karna kyunki "normalized = efficient". Normalization redundancy kam karta hai, joins badhata hai.

**Example 3 (NAT, medium):**

**Sales**

| city | year | item | qty |
|---|---|---|---|
| Delhi | 2024 | TV | 4 |
| Delhi | 2024 | AC | 2 |
| Delhi | 2025 | TV | 3 |
| Mumbai | 2024 | TV | 5 |
| Mumbai | 2024 | TV | 1 |
| Pune | 2025 | AC | 2 |

```sql
SELECT city, year, item, SUM(qty)
FROM Sales
GROUP BY CUBE (city, year, item);
```

Kitni rows?

**Soch:** combinations missing hain → har grouping set ke distinct groups gino.

**Solution:**

| Grouping set | Distinct groups | Count |
|---|---|---|
| (city, year, item) | (D,24,TV), (D,24,AC), (D,25,TV), (M,24,TV), (P,25,AC) | 5 |
| (city, year) | (D,24), (D,25), (M,24), (P,25) | 4 |
| (city, item) | (D,TV), (D,AC), (M,TV), (P,AC) | 4 |
| (year, item) | (24,TV), (24,AC), (25,TV), (25,AC) | 4 |
| (city) | D, M, P | 3 |
| (year) | 2024, 2025 | 2 |
| (item) | TV, AC | 2 |
| ( ) | grand total | 1 |

Total = 5 + 4 + 4 + 4 + 3 + 2 + 2 + 1 = **25**. (Python se har grouping set ke distinct groups gine.)

**Galti kahan hoti hai:** formula $(3+1)(2+1)(2+1) = 36$ lagana — wo tab hi sahi jab har (city, year, item) combination data me ho. Ya Mumbai ki do rows ko alag groups ginna (wo ek hi group hai).

**Example 4 (NAT, medium):** Cube ke 4 dimensions: time (day < month < year), location (store < city < state < country), product (item < brand), customer (koi hierarchy nahi). "All" level ginte hue kitne cuboids?

**Soch:** hierarchy → $\prod (L_i + 1)$.

**Solution:**
1. time: 3 + 1 = 4. location: 4 + 1 = 5. product: 2 + 1 = 3. customer: 1 + 1 = 2.
2. 4 × 5 × 3 × 2 = **120**.

**Galti kahan hoti hai:** $2^4 = 16$ (hierarchies ignore). Ya "+1" bhool kar 3 × 4 × 2 × 1 = 24.

**Example 5 (NAT, medium):** Ek attribute ka range 15 se 95 hai. Min-max se [−1, 1] me 45 ki nayi value?

**Soch:** min-max with non-zero new_min.

**Solution:**
1. Fraction = (45 − 15)/(95 − 15) = 30/80 = 0.375.
2. Stretch: 0.375 × (1 − (−1)) = 0.75.
3. Shift: 0.75 + (−1) = **−0.25**.

**Galti kahan hoti hai:** 0.375 pe ruk jaana (ye [0,1] ka answer hai). Ya new range ko 1 maan kar 0.375 − 1 = −0.625.

**Example 6 (NAT, hard):** 500 tuples ki table se 25 ka sample **with replacement** (SRSWR) liya. Ek particular tuple ke kam se kam ek baar aane ki probability (4 decimals)?

**Soch:** "at least once" → complement: kabhi nahi.

**Solution:**
1. Ek draw me na chune jaane ki probability = 1 − 1/500 = 0.998.
2. 25 independent draws me kabhi nahi = $0.998^{25} \approx 0.95118$.
3. Kam se kam ek baar = 1 − 0.95118 = **0.0488**.
4. Compare: SRSWOR me ye exactly 25/500 = 0.05 hota.

**Galti kahan hoti hai:** 25/500 = 0.05 likh dena (SRSWOR ka formula). SRSWR me ek tuple do baar bhi aa sakta hai, isliye kisi naye tuple ka chance thoda kam (0.0488).

## Confusions clear karo

**Q:** OLTP aur OLAP me farak?
**A:** OLTP = roz ke chhote transactions (insert/update), normalized tables. OLAP = bade analytical queries (aggregate, compare), warehouse ke star/snowflake schema pe, mostly read-only.

**Q:** Roll-up hamesha hierarchy me upar hi jaata hai?
**A:** Do tarah: hierarchy me upar (city → state) ya ek dimension hi hata dena (dimension reduction). Dono me data zyada summarized hota hai.

**Q:** CUBE ki rows aur cuboids ki ginti same cheez hai?
**A:** Nahi. Cuboids = kitne group-by **types** ($2^n$). CUBE ki rows = har type ke andar kitne **groups** — data pe depend karta hai.

**Q:** Population σ ya sample σ?
**A:** Sawal "population" bole ya pura data diya ho to n se divide; "sample standard deviation" bole to n − 1. Default me sawal ki wording dekho.

**Q:** Equal-width aur equal-frequency me kab kya?
**A:** Equal-width simple hai par outliers ke saath kuch bins khaali aur kuch bhare reh jaate hain. Equal-frequency har bin me barabar values deta hai, skewed data ke liye behtar.

**Q:** Stratified aur cluster sampling ulte kyun lagte hain?
**A:** Stratified: **har** group ke andar se thode-thode tuples. Cluster: **kuch** groups poore ke poore. Stratified representation ke liye, cluster sasta (ek page padho, sab mil gaye).

## Khud try karo

**1.** Sales me 2 years, har year me 4 quarters, har quarter me 3 months, sab data maujood. `GROUP BY ROLLUP(year, quarter, month)` kitni rows dega?

<details><summary>Answer dekho</summary>

Grouping sets: (year, quarter, month) = 2 × 4 × 3 = 24; (year, quarter) = 8; (year) = 2; ( ) = 1. Total **35**.

</details>

**2.** Range −320 se 870. Decimal scaling ka smallest j aur 870 ki nayi value?

<details><summary>Answer dekho</summary>

max|v| = 870. j = 2 → 8.7 (≥ 1, nahi). j = **3** → 870/1000 = **0.87**.

</details>

**3.** Values 3, 6, 11, 14, 19, 22, 27, 31 ko 4 equal-frequency bins me baanto aur smoothing by bin means karo.

<details><summary>Answer dekho</summary>

Bins (2-2 values): {3, 6}, {11, 14}, {19, 22}, {27, 31}. Means: 4.5, 12.5, 20.5, 29. Smoothed: 4.5, 4.5, 12.5, 12.5, 20.5, 20.5, 29, 29.

</details>

**4.** 8 tuples me se SRSWOR size 2 ke kitne alag samples? Aur ek particular tuple ke chune jaane ki probability?

<details><summary>Answer dekho</summary>

$\binom{8}{2}$ = **28** samples. Probability = 2/8 = **0.25**.

</details>

## Ek page me

- Fact table = dimension FKs + numeric measures; dimension = descriptive attributes + hierarchy levels.
- Star: ek table per dimension, kam joins. Snowflake: normalized dimensions, kam redundancy, zyada joins.
- Measures: additive (sales), semi-additive (balance, stock — time pe SUM nahi), non-additive (%, ratio).
- Roll-up upar, drill-down neeche; slice = ek dimension ek value; dice = kai dimensions; pivot = rotate.
- Cuboids: $2^n$; hierarchies ke saath $\prod(L_i + 1)$.
- CUBE rows (sab combos): $\prod(n_i + 1)$; missing combos → har grouping set ke distinct groups jodo.
- ROLLUP(k columns) = k + 1 grouping sets; grand total mat bhoolo.
- Min-max: $\frac{v-\min}{\max-\min}(\text{new range}) + \text{new\_min}$. Z = $(v - \mu)/\sigma$.
- Decimal scaling: smallest j with $\max|v|/10^j < 1$.
- Equal-width = (max − min)/k; boundary rule dhyan se; smoothing by mean/median/boundary.
- SRSWOR: $\binom{N}{s}$, P = s/N. SRSWR: $1 - (1 - 1/N)^s$. Stratified proportional = (size/N)·s.
- Lossless: run-length, dictionary coding. Lossy: PCA, wavelet thresholding, sampling.

Revision ke liye **Short note** tab dekho.
