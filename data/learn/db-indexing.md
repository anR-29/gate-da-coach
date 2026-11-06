# File organization and indexing

> **Time:** ~35 min · **Pehle aana chahiye:** keys (Day 36), floor/ceiling, $\log_2$, binary search ka idea · **Day:** 40

## Ye topic kyun?

Database ka data disk pe **blocks** me rehta hai, aur disk se ek block padhna (ek **block access**) RAM ke kaam se hazaaron guna slow hai. Isliye query ki speed ka asli naap hai: "kitne blocks padhne pade?" **Index** ek kitaab ke index jaisa hai jo seedha sahi page tak le jaata hai. GATE DA me yahan se pure numerical sawal aate hain (NAT, 1–2 marks): blocking factor, index kitne blocks lega, search me kitne accesses, B+ tree ka order aur height — saath me dense/sparse/B+/hash ke theory MCQ/MSQ.

## Picture se samjho

Ek sorted file socho jisme records key ke order me blocks me rakhe hain. **Sparse index** har block ke sirf pehle key ko yaad rakhta hai — jaise dictionary ke page ke upar likha pehla shabd. **Dense index** har record ka entry rakhta hai — zaroori jab file us column pe sorted hi na ho.

<figure class="fig">
<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" font-size="13" fill="currentColor">
<defs><marker id="idxa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<text x="150" y="20" text-anchor="middle" font-weight="bold">Sparse (primary)</text>
<rect x="20" y="45" width="60" height="30" fill="none" style="stroke:var(--info)"/><text x="50" y="65" text-anchor="middle">10</text>
<rect x="20" y="105" width="60" height="30" fill="none" style="stroke:var(--info)"/><text x="50" y="125" text-anchor="middle">30</text>
<rect x="20" y="165" width="60" height="30" fill="none" style="stroke:var(--info)"/><text x="50" y="185" text-anchor="middle">50</text>
<rect x="170" y="35" width="110" height="50" fill="none" stroke="currentColor"/><text x="225" y="56" text-anchor="middle">10</text><text x="225" y="78" text-anchor="middle">20</text>
<rect x="170" y="95" width="110" height="50" fill="none" stroke="currentColor"/><text x="225" y="116" text-anchor="middle">30</text><text x="225" y="138" text-anchor="middle">40</text>
<rect x="170" y="155" width="110" height="50" fill="none" stroke="currentColor"/><text x="225" y="176" text-anchor="middle">50</text><text x="225" y="198" text-anchor="middle">60</text>
<line x1="80" y1="60" x2="168" y2="51" stroke="currentColor" marker-end="url(#idxa)"/>
<line x1="80" y1="120" x2="168" y2="111" stroke="currentColor" marker-end="url(#idxa)"/>
<line x1="80" y1="180" x2="168" y2="171" stroke="currentColor" marker-end="url(#idxa)"/>
<line x1="310" y1="30" x2="310" y2="210" style="stroke:var(--muted)" stroke-dasharray="4 4"/>
<text x="470" y="20" text-anchor="middle" font-weight="bold">Dense (secondary)</text>
<rect x="340" y="30" width="60" height="180" fill="none" style="stroke:var(--mark)"/>
<line x1="340" y1="60" x2="400" y2="60" style="stroke:var(--mark)"/><line x1="340" y1="90" x2="400" y2="90" style="stroke:var(--mark)"/><line x1="340" y1="120" x2="400" y2="120" style="stroke:var(--mark)"/><line x1="340" y1="150" x2="400" y2="150" style="stroke:var(--mark)"/><line x1="340" y1="180" x2="400" y2="180" style="stroke:var(--mark)"/>
<text x="370" y="50" text-anchor="middle">5</text><text x="370" y="80" text-anchor="middle">17</text><text x="370" y="110" text-anchor="middle">29</text><text x="370" y="140" text-anchor="middle">42</text><text x="370" y="170" text-anchor="middle">63</text><text x="370" y="200" text-anchor="middle">88</text>
<rect x="500" y="35" width="100" height="50" fill="none" stroke="currentColor"/><text x="550" y="56" text-anchor="middle">42</text><text x="550" y="78" text-anchor="middle">17</text>
<rect x="500" y="95" width="100" height="50" fill="none" stroke="currentColor"/><text x="550" y="116" text-anchor="middle">88</text><text x="550" y="138" text-anchor="middle">5</text>
<rect x="500" y="155" width="100" height="50" fill="none" stroke="currentColor"/><text x="550" y="176" text-anchor="middle">63</text><text x="550" y="198" text-anchor="middle">29</text>
<line x1="400" y1="45" x2="530" y2="133" style="stroke:var(--mark)" marker-end="url(#idxa)"/>
<line x1="400" y1="75" x2="530" y2="73" style="stroke:var(--mark)" marker-end="url(#idxa)"/>
<line x1="400" y1="105" x2="530" y2="193" style="stroke:var(--mark)" marker-end="url(#idxa)"/>
<line x1="400" y1="135" x2="530" y2="51" style="stroke:var(--mark)" marker-end="url(#idxa)"/>
<line x1="400" y1="165" x2="530" y2="171" style="stroke:var(--mark)" marker-end="url(#idxa)"/>
<line x1="400" y1="195" x2="530" y2="111" style="stroke:var(--mark)" marker-end="url(#idxa)"/>
</svg>
<figcaption>Left: file key pe sorted hai, to har block ka ek entry kaafi (3 entries, 6 records). Right: file is column pe sorted nahi, to har record ka entry chahiye (6 entries).</figcaption>
</figure>

Dhyan do: sparse index tabhi chalta hai jab file **usi field** pe sorted ho — tabhi "30 aur 50 ke beech wala block" bolna meaningful hai. Right side me 29 kahin bhi ho sakta hai, isliye har value ka pointer chahiye.

Bade data ke liye index bhi bada ho jaata hai, to index ka index banate hain — yahi idea **B+ tree** hai: ek balanced tree jiske upar ke nodes sirf "raasta" dikhate hain aur neeche ke leaves me saari keys + record pointers hote hain, aur leaves ek doosre se linked hote hain.

<figure class="fig">
<svg viewBox="0 0 600 225" xmlns="http://www.w3.org/2000/svg" font-size="14" fill="currentColor">
<defs><marker id="idxb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<rect x="230" y="20" width="140" height="40" fill="none" style="stroke:var(--info)"/>
<line x1="276" y1="20" x2="276" y2="60" style="stroke:var(--info)"/>
<line x1="323" y1="20" x2="323" y2="60" style="stroke:var(--info)"/>
<text x="276" y="15" text-anchor="middle" font-size="12">30</text>
<text x="323" y="15" text-anchor="middle" font-size="12">60</text>
<text x="253" y="45" text-anchor="middle" font-size="11">&lt;30</text>
<text x="300" y="45" text-anchor="middle" font-size="11">30–59</text>
<text x="347" y="45" text-anchor="middle" font-size="11">≥60</text>
<line x1="253" y1="60" x2="100" y2="128" stroke="currentColor" marker-end="url(#idxb)"/>
<line x1="300" y1="60" x2="300" y2="128" stroke="currentColor" marker-end="url(#idxb)"/>
<line x1="347" y1="60" x2="500" y2="128" stroke="currentColor" marker-end="url(#idxb)"/>
<text x="390" y="35" font-size="12" style="fill:var(--muted)">internal: keys + child pointers</text>
<rect x="30" y="130" width="140" height="40" fill="none" style="stroke:var(--good)"/>
<text x="100" y="155" text-anchor="middle">10   20</text>
<rect x="230" y="130" width="140" height="40" fill="none" style="stroke:var(--good)"/>
<text x="300" y="155" text-anchor="middle">30   40   50</text>
<rect x="430" y="130" width="140" height="40" fill="none" style="stroke:var(--good)"/>
<text x="500" y="155" text-anchor="middle">60   70</text>
<line x1="170" y1="150" x2="228" y2="150" style="stroke:var(--mark)" marker-end="url(#idxb)"/>
<line x1="370" y1="150" x2="428" y2="150" style="stroke:var(--mark)" marker-end="url(#idxb)"/>
<text x="199" y="143" text-anchor="middle" font-size="11" style="fill:var(--mark)">next</text>
<text x="399" y="143" text-anchor="middle" font-size="11" style="fill:var(--mark)">next</text>
<text x="300" y="200" text-anchor="middle" font-size="12" style="fill:var(--muted)">leaves: har key + record pointer; range query = ek leaf dhoondo, phir next-next chalo</text>
</svg>
<figcaption>B+ tree. Root ke 3 child pointers aur 2 keys (pointers = keys + 1). Saari keys leaves me, leaves linked.</figcaption>
</figure>

Dhyan do: root me 30 aur 60 dobara leaves me bhi hain — B+ tree me internal keys sirf signboard hain. Range query (30 se 65) ke liye ek baar neeche jao, phir "next" pointers pe chalo.

## Concept step-by-step

Running example: file me $r$ = 20,000 records, har record $R$ = 120 bytes, block size $B$ = 1024 bytes. Key 12 bytes, block pointer 8 bytes.

### 1. Blocking factor aur data blocks

**Blocking factor** (bfr) = ek block me kitne poore records aate hain. **Unspanned** (ek record do blocks me nahi toot-ta) me:

$$bfr = \left\lfloor \frac{B}{R} \right\rfloor, \qquad \text{data blocks } b = \left\lceil \frac{r}{bfr} \right\rceil$$

**Kyun floor aur ceiling?** Aadha record block me nahi aa sakta → neeche round (floor). Par aakhri aadha bhara block bhi ek block hai → upar round (ceiling).

**Example:** bfr = ⌊1024/120⌋ = ⌊8.53⌋ = 8. b = ⌈20000/8⌉ = **2500** blocks.

Dhyan do: blocks aur levels me hamesha ceiling; capacity (bfr, order) me floor.

### 2. Bina index: linear vs binary search

- Unsorted (heap) file: worst case saare $b$ blocks padho; average ~$b/2$.
- Key pe sorted file: blocks pe binary search → $\lceil \log_2 b \rceil$ accesses.

**Example:** $\lceil \log_2 2500 \rceil$: $2^{11} = 2048 < 2500 \le 4096 = 2^{12}$ → **12** accesses.

Dhyan do: $\log_2 2500 \approx 11.3$ ko 11 mat likho; ceiling = 12.

### 3. Primary index (sparse)

File **ordering key** (jis key pe sorted hai, aur values unique) pe index. Har data block ka ek entry: (block ka pehla key, block pointer). Isliye **sparse**.

- Entries = data blocks = $b$.
- Index entry size = key + pointer = 12 + 8 = 20 bytes → index bfr = ⌊1024/20⌋ = 51.
- Index blocks = ⌈2500/51⌉ = ⌈49.02⌉ = **50**.

Single-level index pe search: index pe binary search + 1 data block = $\lceil \log_2 50 \rceil + 1 = 6 + 1 = 7$ accesses (12 se kaafi kam).

Dhyan do: sparse = entries per **block**, dense = entries per **record**.

### 4. Clustering index

File kisi **non-key** field pe sorted ho (jaise `dept`, jisme repeat values hain). Har **distinct value** ka ek entry, jo us value ke pehle block ko point kare.

**Example:** 400 alag depts → 400 entries → ⌈400/51⌉ = **8** index blocks.

Dhyan do: clustering index key field pe nahi hota; key field pe ho to wo primary index hai.

### 5. Secondary index (dense)

Kisi bhi **non-ordering** field pe. File us field pe sorted nahi, isliye har record ka entry: **dense**.

**Example:** 20,000 entries → ⌈20000/51⌉ = ⌈392.2⌉ = **393** index blocks.

**Ek file pe kitne?** File ka physical order ek hi ho sakta hai, isliye **zyada se zyada ek** primary *ya* clustering index. Secondary indexes jitne chaho.

Dhyan do: secondary index hamesha dense hota hai; sparse ke liye sorted order chahiye jo sirf ek field ka ho sakta hai.

### 6. Multilevel index

Index khud bada hai to uske blocks pe ek aur sparse index banao, phir uska, … jab tak top level **ek block** me na aa jaaye. Har level pe entries = neeche wale level ke blocks, aur divide by index bfr.

**Search cost = levels + 1** (har level ka ek block, phir ek data block).

**Example (sparse primary):** level 1: ⌈2500/51⌉ = 50 blocks → level 2: ⌈50/51⌉ = 1. Levels = 2 → accesses = 2 + 1 = **3**.

**Example (dense secondary):** level 1: 393 → level 2: ⌈393/51⌉ = 8 → level 3: 1. Levels = 3 → accesses = **4**.

Dhyan do: aakhri "+1" (data block) bhoolna classic galti hai.

### 7. B+ tree node ka order

**Order p** = internal node ke maximum child pointers. Internal node me p pointers aur **p − 1** keys (do pointers ke beech ek key — figure dekho):

$$p \cdot P_{block} + (p-1)\cdot K \le B$$

**Example:** $8p + 12(p - 1) \le 1024$ → $20p \le 1036$ → $p \le 51.8$ → **p = 51**.

**Leaf node:** har key ke saath **record pointer** $P_r$, aur ek **next-leaf** pointer:

$$n\,(K + P_r) + P_{next} \le B$$

**Example** ($P_r$ = 10, $P_{next}$ = 8): $22n + 8 \le 1024$ → $n \le 46.18$ → **n = 46**.

**B-tree** (B+ nahi) me har internal node bhi har key ke saath data pointer rakhta hai:

$$p \cdot P_{block} + (p-1)(K + P_r) \le B$$

**Example:** $8p + 22(p-1) \le 1024$ → $30p \le 1046$ → **p = 34**. B+ tree (51) se kam — isliye B+ tree ka fanout zyada aur height kam hoti hai.

Dhyan do: p pointers ke saath p keys nahi, **p − 1** keys. Aur leaf me next pointer gino.

### 8. B+ tree: maximum aur minimum keys, height

Tree me $h$ levels (root se leaves tak), fanout p, leaf capacity m.

**Maximum:** har node full. Root ke p children, unke $p^2$, … leaf level pe $p^{h-1}$ leaves, har ek me m keys:

$$\text{max keys} = p^{h-1}\cdot m$$

**Minimum:** root ke kam se kam **2** children; baaki internal nodes ke kam se kam $\lceil p/2 \rceil$; har leaf me kam se kam $\lceil m/2 \rceil$ keys:

$$\text{min keys} = 2\cdot\lceil p/2\rceil^{\,h-2}\cdot\lceil m/2\rceil$$

**Kyun root alag?** Root ko half-full hone ki shart nahi; tree ki shuruaat me root ke bas 2 children hote hain.

**Toy example:** p = 4, m = 3, h = 3. Max = $4^2 \cdot 3 = 48$. Min = $2 \cdot 2 \cdot 2 = 8$.

**Running example:** p = 51, m = 46, h = 3: max = $51^2 \cdot 46 = 119{,}646$; min = $2 \cdot 26 \cdot 23 = 1196$.

**N keys ke liye minimum levels:** leaves = ⌈N/m⌉, phir baar-baar ⌈÷p⌉ jab tak 1. 20,000 keys: ⌈20000/46⌉ = 435 leaves → ⌈435/51⌉ = 9 → 1. **3 levels**.

Dhyan do: B-tree ka formula ($p^h - 1$ keys, kyunki har node me keys hain) B+ tree pe mat lagao.

### 9. B+ tree vs B-tree vs hash

| | B+ tree | B-tree | Hash index |
|---|---|---|---|
| Data pointers | sirf leaves | har node | bucket me |
| Fanout | zyada | kam | — |
| Equality search | height jitne accesses | kabhi upar hi mil jaaye | expected ~constant |
| Range / sorted scan | badhiya (linked leaves) | mushkil | **nahi** |
| Key kitni baar | internal + leaf (repeat ho sakti) | ek baar | — |

**Kyun hash range nahi kar sakta?** Hash function pass-pass values ko random buckets me phenkta hai (50000 aur 50001 kahin bhi). "40,000 se 60,000" ke liye saare buckets dekhne padenge.

Dhyan do: B+ tree me search hamesha leaf tak jaata hai; B-tree me key internal node pe hi mil sakti hai.

## Solved examples

**Example 1 (NAT, easy):** Ek file key pe sorted hai aur 6000 blocks leti hai, koi index nahi. Binary search ke worst case me kitne block accesses?

**Soch:** sorted + no index → $\lceil \log_2 b \rceil$.

**Solution:**
1. $2^{12} = 4096 < 6000 \le 8192 = 2^{13}$.
2. $\lceil \log_2 6000 \rceil$ = **13**.

**Galti kahan hoti hai:** $\log_2 6000 \approx 12.55$ ko 12 likh dena (floor). Ya records ki ginti pe log lena — search **blocks** pe hoti hai.

**Example 2 (NAT, medium):** B+ tree, block 2048 bytes, key 16 bytes, child (block) pointer 8 bytes. Internal node me maximum kitne child pointers?

**Soch:** "internal node, maximum child pointers" → $pP + (p-1)K \le B$.

**Solution:**
1. $8p + 16(p - 1) \le 2048$.
2. $24p - 16 \le 2048$ → $24p \le 2064$ → $p \le 86$.
3. **p = 86**. Check: $8 \cdot 86 + 16 \cdot 85 = 688 + 1360 = 2048$ — block exactly bhar gaya.

**Galti kahan hoti hai:** $8p + 16p \le 2048$ likhna (p pointers ke saath p keys le liye) → $p \le 85.33$ → 85. Ek kam aaya, kyunki asal me keys p − 1 hain.

**Example 3 (NAT, medium):** 40,000 records, 250 bytes each (unspanned), 4096-byte blocks, file key pe sorted. Multilevel sparse primary index, entry 20 bytes, top level ek block tak. Ek record dhoondhne me kitne block accesses?

**Soch:** bfr → data blocks → index bfr → levels → +1.

**Solution:**
1. bfr = ⌊4096/250⌋ = 16. Data blocks = ⌈40000/16⌉ = 2500.
2. Index bfr = ⌊4096/20⌋ = 204.
3. Level 1 entries = 2500 (sparse) → ⌈2500/204⌉ = 13 blocks.
4. Level 2: ⌈13/204⌉ = 1 block. Levels = 2.
5. Accesses = 2 + 1 = **3**.

**Galti kahan hoti hai:** 2 bolna (data block bhool gaye). Ya sparse index me 40,000 entries le lena (dense samajh ke) — tab bhi yahan 197 → 1 = 2 levels aata, par bade numbers me level badh jaata hai (Khud try 2 dekho).

**Example 4 (NAT, hard):** B+ tree: internal node max 6 children, leaf max 5 keys. Root ke alawa har node kam se kam half full (internal ≥ ⌈6/2⌉ = 3 children, leaf ≥ ⌈5/2⌉ = 3 keys); root ke ≥ 2 children. Exactly 4 levels wale tree me minimum kitni keys?

**Soch:** minimum → root 2, baaki ⌈p/2⌉, leaves ⌈m/2⌉.

**Solution:**
1. Level 1 (root): 2 children.
2. Level 2: 2 nodes × 3 = 6 children.
3. Level 3: 6 nodes × 3 = 18 leaves (level 4).
4. Leaves: 18 × 3 = **54** keys.
5. Formula: $2 \cdot 3^{4-2} \cdot 3 = 54$ ✓. (Max hota $6^3 \cdot 5 = 1080$.)

**Galti kahan hoti hai:** root ko bhi 3 children dena → $3^3 \cdot 3 = 81$. Root ki minimum shart sirf 2 hai.

**Example 5 (MSQ, medium):** Ek data file `emp_id` (key) pe physically sorted hai. Kaun se statements sahi hain?
(A) `emp_id` pe sparse primary index ban sakta hai.
(B) `salary` pe index sparse ho sakta hai, kyunki salary bhi numeric hai.
(C) `dept` pe ek clustering index aur `emp_id` pe primary index dono saath ban sakte hain.
(D) `name` aur `salary` dono pe alag-alag dense secondary indexes ban sakte hain.

**Soch:** physical order ek hi → sparse sirf ordering field pe; secondary jitne chaho.

**Solution:**
1. (A) file `emp_id` pe sorted → sparse primary ✓.
2. (B) file salary pe sorted nahi → secondary → dense hi hoga ✗.
3. (C) clustering index ke liye file `dept` pe sorted honi chahiye; file ek saath do orders me nahi ho sakti ✗.
4. (D) secondary indexes kitne bhi ✓.
5. Answer **(A), (D)**.

**Galti kahan hoti hai:** (C) tick karna — "clustering aur primary alag cheezein hain" sochna. Dono file ki physical ordering pe depend karte hain, aur ordering ek hi hai.

**Example 6 (MCQ, hard):** B+ tree: internal fanout 100, leaf me 99 keys. 10,00,000 (one million) keys index karne ke liye minimum kitne levels (leaf level samet)?
(A) 2 (B) 3 (C) 4 (D) 5

**Soch:** minimum levels → sab nodes full → leaves = ⌈N/m⌉, phir ⌈÷p⌉.

**Solution:**
1. Leaves = ⌈1000000/99⌉ = ⌈10101.01⌉ = 10102.
2. Upar: ⌈10102/100⌉ = 102.
3. Upar: ⌈102/100⌉ = 2.
4. Upar: ⌈2/100⌉ = 1 (root).
5. Levels = 4 (10102, 102, 2, 1). Answer **(C)**.

**Galti kahan hoti hai:** $\log_{100} 10^6 = 3$ seedha likh dena → (B). Leaf me 100 nahi 99 keys hain, aur har step pe ceiling se 102 → 2 bachta hai, jiske liye ek aur root chahiye.

## Confusions clear karo

**Q:** Order p ka matlab pointers hai ya keys?
**A:** Is lesson (aur GATE ke zyada sawalon) me p = maximum child pointers, keys = p − 1. Agar sawal "order" ko alag define kare (jaise max keys), to wahi definition follow karo — sawal dhyan se padho.

**Q:** Leaf me record pointer aur block pointer ka size alag kyun?
**A:** Record pointer ko block + us block me position batani padti hai, isliye aksar bada hota hai. Sawal jo sizes de, wahi lagao.

**Q:** Primary index aur primary key same cheez hai?
**A:** Nahi. Primary index = file ki **ordering key field** pe sparse index. Table ki primary key kisi aur column pe ho sakti hai; agar file us pe sorted nahi, to us pe index secondary hoga.

**Q:** Multilevel index me pehla level dense ho sakta hai?
**A:** Haan (secondary index me pehla level dense hota hai). Upar ke saare levels sparse hote hain kyunki neeche wala index sorted hai.

**Q:** Spanned records me kya badalta hai?
**A:** Record do blocks me toot sakta hai, to bfr = B/R (fraction allowed) aur blocks = ⌈r·R/B⌉. Jab tak sawal "spanned" na bole, unspanned (floor) maan lo.

**Q:** Hash index kab B+ tree se behtar?
**A:** Sirf equality queries (`salary = 50000`) ke liye — expected ~1–2 accesses. Range, ORDER BY, prefix search me B+ tree.

## Khud try karo

**1.** B-tree (B+ nahi), block 2048 bytes, child pointer 10 bytes, key 14 bytes, data pointer 12 bytes. Maximum order p?

<details><summary>Answer dekho</summary>

$10p + (14 + 12)(p - 1) \le 2048$ → $36p \le 2074$ → $p \le 57.6$ → **p = 57**.

</details>

**2.** 1,00,000 records, 100 bytes each, block 2048 bytes, index entry 16 bytes. (a) sorted key pe multilevel sparse primary index, (b) non-ordering key pe multilevel dense secondary index — dono me accesses?

<details><summary>Answer dekho</summary>

bfr = ⌊2048/100⌋ = 20 → 5000 data blocks. Index bfr = ⌊2048/16⌋ = 128.
(a) 5000 → ⌈5000/128⌉ = 40 → 1. 2 levels → **3** accesses.
(b) 100000 → ⌈100000/128⌉ = 782 → ⌈782/128⌉ = 7 → 1. 3 levels → **4** accesses.

</details>

**3.** B+ tree leaf: block 2048 bytes, key 14 bytes, record pointer 12 bytes, next pointer 10 bytes. Max keys per leaf?

<details><summary>Answer dekho</summary>

$26n + 10 \le 2048$ → $n \le 78.38$ → **78**.

</details>

**4.** B+ tree, internal max 4 children, leaf max 3 keys, 3 levels. Max aur min keys?

<details><summary>Answer dekho</summary>

Max = $4^2 \cdot 3$ = **48**. Min = $2 \cdot \lceil 4/2 \rceil \cdot \lceil 3/2 \rceil = 2 \cdot 2 \cdot 2$ = **8**.

</details>

## Ek page me

- bfr = ⌊B/R⌋ (unspanned); data blocks = ⌈r/bfr⌉.
- Sorted file, no index: binary search = ⌈log₂ b⌉ block accesses.
- Primary index: ordering key pe, sparse, entries = data blocks.
- Clustering index: ordering non-key field pe, entries = distinct values.
- Secondary index: non-ordering field pe, dense, entries = records. Ek file: ≤ 1 primary/clustering, secondary kitne bhi.
- Multilevel: ⌈entries/ibfr⌉ baar-baar jab tak 1; accesses = levels + 1.
- B+ internal: $pP + (p-1)K \le B$. Leaf: $n(K + P_r) + P_{next} \le B$. B-tree: $pP + (p-1)(K + P_r) \le B$.
- Max keys (h levels) = $p^{h-1} m$; min = $2\lceil p/2\rceil^{h-2}\lceil m/2\rceil$ (root ≥ 2).
- Min levels for N: leaves ⌈N/m⌉, phir ⌈÷p⌉ tak 1.
- B+ tree: data sirf linked leaves me → zyada fanout, range queries badhiya. Hash: sirf equality.
- Capacity me floor, blocks/levels/log me ceiling.

Revision ke liye **Short note** tab dekho.
