# Hash tables

> **Time:** ~30 min · **Pehle aana chahiye:** `mod` (remainder), average nikaalna, linked list ka basic idea · **Day:** 30, 35

## Ye topic kyun?

Python ka `dict` aur `set` itne fast kyun hain? Kyunki andar **hash table** hai: key ko ek formula se seedha array ke ek slot par bhej do, to search, insert, delete average me O(1). GATE DA me hashing ke questions almost hamesha **trace + average count** hote hain: "key kis slot me gaya?", "kitne probes lage?", "successful/unsuccessful search ka average kitna?", aur load factor wale MCQ/MSQ. Ye NAT me bahut aate hain aur sirf saaf table banane se solve hote hain.

## Picture se samjho

Socho ek hostel me 5 kamre hain (slots 0–4) aur har student (key) ka kamra uske roll number ka **last digit mod 5** decide karta hai. Ye rule **hash function** hai: $h(k) = k \bmod 5$. Problem: do students ka same kamra aa gaya to? Ise **collision** kehte hain. Isko sambhalne ke do tareeke hain.

**Tareeka 1 — Chaining:** har kamre me ek line (linked list) lag jaati hai. Jitne log us kamre ke hain, sab usi line me.

<figure class="fig">
<svg viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="hs-a1" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<rect x="40" y="20" width="50" height="40" style="fill:none;stroke:currentColor"/>
<rect x="40" y="60" width="50" height="40" style="fill:none;stroke:currentColor"/>
<rect x="40" y="100" width="50" height="40" style="fill:none;stroke:currentColor"/>
<rect x="40" y="140" width="50" height="40" style="fill:none;stroke:currentColor"/>
<rect x="40" y="180" width="50" height="40" style="fill:none;stroke:currentColor"/>
<text x="30" y="45" text-anchor="end" style="fill:var(--muted)">0</text>
<text x="30" y="85" text-anchor="end" style="fill:var(--muted)">1</text>
<text x="30" y="125" text-anchor="end" style="fill:var(--muted)">2</text>
<text x="30" y="165" text-anchor="end" style="fill:var(--muted)">3</text>
<text x="30" y="205" text-anchor="end" style="fill:var(--muted)">4</text>
<text x="65" y="85" text-anchor="middle" style="fill:var(--muted)">–</text>
<text x="65" y="165" text-anchor="middle" style="fill:var(--muted)">–</text>
<line x1="65" y1="40" x2="128" y2="40" style="stroke:currentColor" marker-end="url(#hs-a1)"/>
<rect x="130" y="26" width="50" height="28" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="155" y="45" text-anchor="middle" style="fill:currentColor">20</text>
<line x1="65" y1="120" x2="128" y2="120" style="stroke:currentColor" marker-end="url(#hs-a1)"/>
<rect x="130" y="106" width="50" height="28" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="155" y="125" text-anchor="middle" style="fill:currentColor">7</text>
<line x1="180" y1="120" x2="208" y2="120" style="stroke:currentColor" marker-end="url(#hs-a1)"/>
<rect x="210" y="106" width="50" height="28" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="235" y="125" text-anchor="middle" style="fill:currentColor">12</text>
<line x1="260" y1="120" x2="288" y2="120" style="stroke:currentColor" marker-end="url(#hs-a1)"/>
<rect x="290" y="106" width="50" height="28" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="315" y="125" text-anchor="middle" style="fill:currentColor">17</text>
<line x1="65" y1="200" x2="128" y2="200" style="stroke:currentColor" marker-end="url(#hs-a1)"/>
<rect x="130" y="186" width="50" height="28" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="155" y="205" text-anchor="middle" style="fill:currentColor">9</text>
<line x1="180" y1="200" x2="208" y2="200" style="stroke:currentColor" marker-end="url(#hs-a1)"/>
<rect x="210" y="186" width="50" height="28" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<text x="235" y="205" text-anchor="middle" style="fill:currentColor">4</text>
<text x="360" y="125" style="fill:var(--info)">chain length 3</text>
<text x="280" y="205" style="fill:var(--info)">length 2</text>
<text x="200" y="85" style="fill:var(--muted)">n = 6, m = 5, α = 1.2</text>
</svg>
<figcaption>Chaining, m = 5, h(k) = k mod 5. Keys 7, 12, 20, 9, 17, 4 (is order me, chain ke end me jode gaye).</figcaption>
</figure>

Notice karo: 7, 12, 17 teeno ka remainder 2 hai, to teeno slot 2 ki chain me. Slots 1 aur 3 khaali hain. Table me 6 keys hain par sirf 5 slots — chaining me ye allowed hai.

**Tareeka 2 — Open addressing:** har kamre me sirf ek student. Apna kamra bhara ho to agle kamre try karo (**probing**), jab tak khaali na mile.

<figure class="fig">
<svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="hs-a2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" style="fill:currentColor"/></marker></defs>
<rect x="40" y="80" width="55" height="40" style="fill:none;stroke:currentColor"/>
<rect x="95" y="80" width="55" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<rect x="150" y="80" width="55" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<rect x="205" y="80" width="55" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<rect x="260" y="80" width="55" height="40" style="fill:var(--mark);fill-opacity:0.25;stroke:currentColor"/>
<rect x="315" y="80" width="55" height="40" style="fill:var(--good);fill-opacity:0.25;stroke:var(--good)"/>
<rect x="370" y="80" width="55" height="40" style="fill:none;stroke:currentColor"/>
<rect x="425" y="80" width="55" height="40" style="fill:none;stroke:currentColor"/>
<text x="122" y="105" text-anchor="middle" style="fill:currentColor">9</text>
<text x="177" y="105" text-anchor="middle" style="fill:currentColor">17</text>
<text x="232" y="105" text-anchor="middle" style="fill:currentColor">25</text>
<text x="287" y="105" text-anchor="middle" style="fill:currentColor">3</text>
<text x="342" y="105" text-anchor="middle" style="fill:currentColor">11</text>
<text x="67" y="138" text-anchor="middle" style="fill:var(--muted)">0</text>
<text x="122" y="138" text-anchor="middle" style="fill:var(--muted)">1</text>
<text x="177" y="138" text-anchor="middle" style="fill:var(--muted)">2</text>
<text x="232" y="138" text-anchor="middle" style="fill:var(--muted)">3</text>
<text x="287" y="138" text-anchor="middle" style="fill:var(--muted)">4</text>
<text x="342" y="138" text-anchor="middle" style="fill:var(--muted)">5</text>
<text x="397" y="138" text-anchor="middle" style="fill:var(--muted)">6</text>
<text x="452" y="138" text-anchor="middle" style="fill:var(--muted)">7</text>
<path d="M 232 78 Q 260 48 284 76" style="fill:none;stroke:var(--bad)" marker-end="url(#hs-a2)"/>
<path d="M 287 78 Q 315 48 339 76" style="fill:none;stroke:var(--bad)" marker-end="url(#hs-a2)"/>
<text x="287" y="30" text-anchor="middle" style="fill:var(--bad)">11: home 3 → 4 → 5 (3 probes)</text>
<line x1="97" y1="152" x2="368" y2="152" style="stroke:var(--info)"/>
<line x1="97" y1="146" x2="97" y2="158" style="stroke:var(--info)"/>
<line x1="368" y1="146" x2="368" y2="158" style="stroke:var(--info)"/>
<text x="232" y="174" text-anchor="middle" style="fill:var(--info)">ek lamba cluster (slots 1–5)</text>
</svg>
<figcaption>Linear probing, m = 8, h(k) = k mod 8. Keys 9, 17, 25, 3, 11. Ghar 1 aur ghar 3 wale keys mil kar ek hi lamba run bana dete hain.</figcaption>
</figure>

Yahan 9, 17, 25 teeno ka ghar (home slot) 1 hai, to wo 1, 2, 3 me baith gaye. Ab 3 ka ghar 3 hai par wo bhara hai, to 3 slot 4 me gaya. 11 ka ghar bhi 3 → 4 → 5. Dekho, alag-alag ghar wale keys bhi ek bade **cluster** (lagataar bhare slots ka run) me jud gaye — ye linear probing ki sabse badi kamzori hai.

## Concept step-by-step

### 1. Hash function, slots aur load factor

**Idea:** table me m slots (index 0 se m−1). Hash function $h(k)$ har key ko ek slot number deta hai — exam me almost hamesha $h(k) = k \bmod m$. n keys store hain.

**Load factor:**
$$\alpha = \frac{n}{m} \quad (\text{ek slot par average kitni keys})$$

**Example:** figure 1 me n = 6, m = 5 → α = 1.2. Figure 2 me n = 5, m = 8 → α = 0.625.

Dhyan do: α = n/m hai, m/n nahi. Chaining me α > 1 ho sakta hai (chain lambi ho jaati hai); open addressing me har key ko apna slot chahiye, to α ≤ 1.

### 2. Chaining: insert, search, delete

- **Insert:** slot $h(k)$ ki chain me jod do (stem batata hai front par ya end par).
- **Search:** slot $h(k)$ ki chain me ek-ek key compare karo.
- **Delete:** chain se node hata do — bas. Koi special marker nahi chahiye.

**Worst case:** saari n keys ek hi slot me → ek chain of length n → search Θ(n). Isliye hashing "expected O(1)" hai, worst-case O(1) nahi.

Dhyan do: "average O(1)" ka matlab hai keys acche se bikhri hon (simple uniform hashing — har key har slot me barabar probability se jaaye).

### 3. Chaining me average search cost (given table se)

Do alag sawaal hain, aur dono ka average alag cheez par hota hai.

**Successful search** (key table me hai): har stored key barabar probability se dhoondi jaati hai. Chain me **k-th key tak pahunchne me k comparisons**. Saari n keys ka cost jodo, n se divide karo.

**Unsuccessful search** (key table me nahi): uska hash har slot par barabar probability se. Us slot ki **poori chain** compare hoti hai (khaali slot = 0). Saare m slots ka chain length jodo, m se divide karo.

**Example (figure 1):** chains: slot 0 [20], slot 2 [7, 12, 17], slot 4 [9, 4].
- Successful: slot 0 → 1; slot 2 → 1 + 2 + 3 = 6; slot 4 → 1 + 2 = 3. Total 10, average $10/6 \approx 1.67$.
- Unsuccessful: (1 + 0 + 3 + 0 + 2)/5 = 6/5 = 1.2.

**Formulas (simple uniform hashing):**
- Unsuccessful ≈ α — kyunki average chain length hi α hai, aur poori chain dekhni padti hai. Upar: 1.2 = α ✓.
- Successful ≈ $1 + \alpha/2$ — kyunki key khud 1 comparison, plus uske pehle jitni keys us chain me hain; average me chain ki aadhi keys (≈ α/2) usse pehle hoti hain.

Dhyan do: successful = average over **n keys**; unsuccessful = average over **m slots** (khaali slots bhi gino). Sirf non-empty slots par average lena common galti hai.

### 4. Linear probing

**Rule:** probe number i = 0, 1, 2, … par slot
$$h(k, i) = (h(k) + i) \bmod m$$
Pehla khaali slot milte hi key wahan rakh do.

**Example (figure 2):** m = 8. 11: h = 3 → i=0 slot 3 (bhara), i=1 slot 4 (bhara), i=2 slot 5 (khaali) → slot 5, **3 probes** (final slot bhi gina).

**Wrap-around:** end ke baad slot 0: m = 10 me ghar 9 bhara ho to agla probe (9+1) % 10 = 0.

**Primary clustering:** jo bhi key cluster ke kisi bhi slot par hash ho, wo cluster ke end par jaakar use aur lamba karti hai. Lamba cluster → aur zyada keys usme girti hain → aur lamba. Runs badhte jaate hain.

Dhyan do: "probes" me final slot gina jaata hai ya sirf collisions — stem padho. 3 probes = 2 collisions.

### 5. Quadratic probing

**Rule:**
$$h(k, i) = (h(k) + i^2) \bmod m, \quad i = 0, 1, 2, \dots$$
Offsets 0, 1, 4, 9, 16, … — har baar mod m lo.

**Example:** m = 7, keys 10, 17, 24, 31 (sab ka ghar 3).
- 10 → slot 3.
- 17: 3 bhara → (3+1) % 7 = 4.
- 24: 3, 4 bhare → (3+4) % 7 = 0.
- 31: 3, 4, 0 bhare → (3+9) % 7 = 12 % 7 = 5.

Linear jaisa lamba lagataar run nahi banta. Par **same ghar wali keys same sequence** (3, 4, 0, 5, …) follow karti hain — ise **secondary clustering** kehte hain.

**Guarantee:** m prime ho aur α ≤ 1/2 ho to insertion ko khaali slot zaroor milta hai. *Kyun?* i aur j dono < m/2 hon aur $i^2 \equiv j^2 \pmod m$ ho, to m divides $(i-j)(i+j)$; m prime hai aur dono factors 0 aur m ke beech hain (i ≠ j) — impossible. To pehle ⌈m/2⌉ probes alag-alag slots hain, aur table aadhi se kam bhari hai, to unme se ek khaali hoga.

Upar ke example me sequence aage dekho: i = 0..6 → 3, 4, 0, 5, 5, 0, 4. Slots 1, 2, 6 kabhi nahi aate! Table zyada bhari ho to khaali slot hote hue bhi insert fail ho sakta hai.

Dhyan do: quadratic me $i^2$ jodo, i nahi; aur har step par mod m.

### 6. Open addressing me search aur delete

**Search:** key ke ghar se wahi probe sequence chalo. Ruko jab (a) key mil jaaye (found), ya (b) ek **truly empty** slot aaye (not found — agar key hoti to yahan tak aate-aate isi khaali slot me baith jaati).

**Delete ka problem:** figure 2 me 25 (slot 3) ko seedha khaali kar diya. Ab 11 dhoondo: ghar 3 khaali mila → "not found"! Jabki 11 slot 5 me baitha hai. Khaali slot ne chain tod di.

**Fix — tombstone:** delete par slot ko "DELETED" mark karo. Search tombstone ko bhara maan kar aage badhta hai; insert use dobara use kar sakta hai.

Dhyan do: chaining me tombstone nahi chahiye — wahan delete sirf list se node hatana hai.

### 7. Open addressing me average probes (given table se)

- **Successful:** har key ke insert me jitne probes lage, wahi uske search me lagenge. Saare n keys ka average.
- **Unsuccessful:** har slot ko ghar maan kar, wahan se chalo aur **pehle khaali slot tak, usko bhi gin kar** probes count karo. m slots ka average.

**Example (figure 2):** table [–, 9, 17, 25, 3, 11, –, –].
- Successful: 9 → 1, 17 → 2, 25 → 3, 3 → 2, 11 → 3. Average $11/5 = 2.2$.
- Unsuccessful (ghar 0..7): 0 → 1; 1 → slots 1,2,3,4,5,6 → 6; 2 → 5; 3 → 4; 4 → 3; 5 → 2; 6 → 1; 7 → 1. Total 23, average $23/8 = 2.875$.

**Uniform-hashing estimates** (har probe random slot jaisa):
- Unsuccessful ≈ $\frac{1}{1-\alpha}$. *Kyun:* har probe bhare slot par α probability se girta hai, to expected probes $1 + \alpha + \alpha^2 + \dots = \frac{1}{1-\alpha}$.
- Successful ≈ $\frac{1}{\alpha}\ln\frac{1}{1-\alpha}$.

| α | Unsuccessful $\frac{1}{1-\alpha}$ | Successful $\frac{1}{\alpha}\ln\frac{1}{1-\alpha}$ |
|---|---|---|
| 0.5 | 2 | ≈ 1.39 |
| 0.75 | 4 | ≈ 1.85 |
| 0.9 | 10 | ≈ 2.56 |

Dhyan do: α → 1 hote hi unsuccessful cost tezi se badhti hai; isliye table ko zyada bharne se pehle resize karte hain.

## Solved examples

**Example 1 (MCQ, easy):** Separate chaining, 300 slots, 1200 keys, simple uniform hashing. **Successful** search me expected comparisons approximately?
(A) 4 (B) 3 (C) 0.25 (D) 2

**Soch:** chaining + "successful" → $1 + \alpha/2$.

**Solution:**
1. α = n/m = 1200/300 = 4.
2. Successful ≈ 1 + 4/2 = **3 → (B)**.

**Galti kahan hoti hai:** (A) 4 unsuccessful ka answer hai (α). (C) α = m/n ulta lene se aata hai.

**Example 2 (NAT, easy):** m = 11 slots, $h(k) = k \bmod 11$, linear probing. Keys 14, 25, 36, 3, 47, 15 is order me insert. 15 kis slot me jaayega?

**Soch:** linear probing trace; har key ka ghar nikaalo.

**Solution:**

| Key | Ghar (k mod 11) | Probed slots | Final slot |
|---|---|---|---|
| 14 | 3 | 3 | 3 |
| 25 | 3 | 3, 4 | 4 |
| 36 | 3 | 3, 4, 5 | 5 |
| 3 | 3 | 3, 4, 5, 6 | 6 |
| 47 | 3 | 3, …, 7 | 7 |
| 15 | 4 | 4, 5, 6, 7, 8 | 8 |

Answer **8**.

**Galti kahan hoti hai:** "15 ka ghar 4 hai, aur 4 se pehle wale collision ghar 3 ke the" soch kar 4 likh dena. Cluster 3–7 me 4 bhi bhara hai — primary clustering yahi hai.

**Example 3 (NAT, medium):** m = 7, quadratic probing $h(k, i) = (k \bmod 7 + i^2) \bmod 7$. Keys 10, 17, 24, 31 is order me. 31 kis slot me?

**Soch:** quadratic → offsets 0, 1, 4, 9 aur har baar mod 7.

**Solution:**
1. Sab ka ghar 3. 10 → 3. 17 → 3+1 = 4. 24 → 3+4 = 7 % 7 = 0.
2. 31: i=0 → 3 ✗, i=1 → 4 ✗, i=2 → 0 ✗, i=3 → 12 % 7 = 5 ✓.
Answer **5**.

**Galti kahan hoti hai:** $i^2$ ki jagah i jodna (linear jaisa) → 24 slot 5, 31 slot 6 → answer 6. Ya mod bhool kar 24 ko "slot 7" likhna jo exist hi nahi karta.

**Example 4 (NAT, medium):** m = 7, $h(k) = k \bmod 7$, chaining, nayi key chain ke **end** me. Keys 15, 8, 29, 10, 3, 24, 17, 12. Har stored key barabar probability se search hoti hai. Successful search me average comparisons? Aur unsuccessful (har slot barabar likely, khaali slot = 0)?

**Soch:** successful → over keys (k-th = k); unsuccessful → over slots (chain length).

**Solution:**
1. Ghar: 15→1, 8→1, 29→1, 10→3, 3→3, 24→3, 17→3, 12→5.
2. Chains: slot 1 [15, 8, 29], slot 3 [10, 3, 24, 17], slot 5 [12], baaki khaali.
3. Successful: (1+2+3) + (1+2+3+4) + 1 = 6 + 10 + 1 = 17; 17/8 = **2.125**.
4. Unsuccessful: (3 + 4 + 1)/7 = 8/7 ≈ **1.14**.

**Galti kahan hoti hai:** unsuccessful ko sirf 3 non-empty slots par average karna: 8/3 ≈ 2.67. Ya successful ko chains par average karna.

**Example 5 (NAT, hard):** m = 10, $h(k) = k \bmod 10$, linear probing. Keys 21, 32, 41, 17, 27, 8, 19 insert hue. Unsuccessful search: ghar har slot barabar likely, khaali slot milne tak probes, **khaali slot bhi gino**. Average probes?

**Soch:** pehle table banao (wrap-around ke saath), phir har ghar se pehle khaali slot tak gino.

**Solution:**
1. Insert: 21 → 1; 32 → 2; 41 → 1 ✗, 2 ✗, 3 ✓; 17 → 7; 27 → 7 ✗, 8 ✓; 8 → 8 ✗, 9 ✓; 19 → 9 ✗, (9+1) % 10 = 0 ✓.
2. Table: [19, 21, 32, 41, –, –, –, 17, 27, 8]. Khaali: 4, 5, 6.
3. Har ghar se count:

| Ghar | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Probes | 5 | 4 | 3 | 2 | 1 | 1 | 1 | 8 | 7 | 6 |

(Ghar 7: 7, 8, 9, 0, 1, 2, 3, 4 = 8 slots.)
4. Total 38, average **3.8**.

**Galti kahan hoti hai:** wrap-around bhool kar ghar 7 ko 7, 8, 9 → "end" par rok dena (4 probes). Ya khaali slot ko na ginna — har count 1 kam, average 2.8.

**Example 6 (MSQ, medium):** Kaunse statements sahi hain?
(A) Separate chaining me load factor 1 se zyada ho sakta hai.
(B) Quadratic probing har tarah ki clustering khatam kar deta hai.
(C) Uniform hashing ke saath open addressing me α = 0.75 par unsuccessful search ≈ 4 probes.
(D) Hash table me search worst case me bhi O(1) hai.

**Soch:** concept facts check karo.

**Solution:**
1. (A) Sahi — chains kitni bhi lambi ho sakti hain.
2. (B) Galat — primary clustering kam hoti hai, par secondary clustering (same ghar → same sequence) rehti hai.
3. (C) Sahi — 1/(1 − 0.75) = 4.
4. (D) Galat — saari keys ek slot me (ya ek cluster me) → Θ(n). O(1) sirf expected hai.
Answer **(A), (C)**.

**Galti kahan hoti hai:** (D) ko sahi maan lena kyunki "hashing O(1) hai" ratta hua hai — wo average case hai.

## Confusions clear karo

**Q:** Successful aur unsuccessful average me kis cheez se divide karun?
**A:** Successful: jo keys dhoondi ja sakti hain, yaani **n stored keys**. Unsuccessful: missing key kisi bhi slot par hash ho sakti hai, to **m slots** (khaali bhi).

**Q:** "Probes" aur "collisions" me farak?
**A:** Probe = har slot jo dekha gaya. Collision = bhara hua slot jisse aage jaana pada. Key final slot par baithi to probes = collisions + 1. Stem me definition dekho.

**Q:** Open addressing me delete ke baad slot khaali kyun nahi kar sakte?
**A:** Search khaali slot par rukta hai. Agar beech ka slot khaali kar diya, to us ke aage baithi keys (jo isi raste se gayi thi) "not found" ho jaayengi. Tombstone raasta khula rakhta hai.

**Q:** Primary aur secondary clustering me kya farak hai?
**A:** Primary (linear): lagataar bhare slots ka run bante jaata hai, aur alag ghar wali keys bhi usme jud jaati hain. Secondary (quadratic): sirf **same ghar** wali keys ek hi probe sequence share karti hain; lamba lagataar run kam banta hai.

**Q:** Chaining me unsuccessful search α kyun aur successful 1 + α/2 kyun? Successful zyada kyun?
**A:** Unsuccessful me poori chain dekhni hai, average length α. Successful me key ke pehle ki keys (≈ α/2) plus key khud (1). Jab α chhota ho (jaise 0.5) to unsuccessful (0.5) successful (1.25) se kam ho sakta hai — kyunki khaali slot par 0 comparisons.

**Q:** Table size prime kyun rakhte hain?
**A:** $k \bmod m$ keys ko zyada barabar bikherta hai jab m prime ho (khaaskar keys me pattern ho, jaise sab even). Aur quadratic probing ki "khaali slot milega" guarantee prime m par hi hai.

## Khud try karo

**1.** Chaining, 400 slots, 1000 keys, simple uniform hashing. Unsuccessful aur successful search ke expected comparisons?

<details><summary>Answer dekho</summary>

α = 1000/400 = 2.5. Unsuccessful ≈ **2.5**. Successful ≈ 1 + 2.5/2 = **2.25**.

</details>

**2.** m = 7, linear probing, $h(k) = k \bmod 7$. Keys 5, 12, 19, 26 insert hue. Phir 12 ko **seedha khaali** kar diya (tombstone nahi). Ab 26 search karo (match ya khaali slot par ruko). Kya hota hai, kitne slots dekhe?

<details><summary>Answer dekho</summary>

Sab ka ghar 5: 5 → 5, 12 → 6, 19 → 0, 26 → 1. 12 hatane par slot 6 khaali.
Search 26: slot 5 (5, match nahi) → slot 6 khaali → ruk gaya. **"Not found" after 2 slots**, jabki 26 slot 1 me hai. Tombstone hota to 5, 6, 0, 1 → found after 4 probes.

</details>

**3.** Figure 2 wale table [–, 9, 17, 25, 3, 11, –, –] me successful search ka average probes? (Har key barabar likely.)

<details><summary>Answer dekho</summary>

Insert ke probes: 9 → 1, 17 → 2, 25 → 3, 3 → 2 (slot 3, 4), 11 → 3 (slot 3, 4, 5). Total 11, average **11/5 = 2.2**.

</details>

**4.** m = 11 (prime), quadratic probing. Kya 6 keys ke baad bhi insertion guaranteed hai? 5 keys ke baad?

<details><summary>Answer dekho</summary>

Guarantee tab hai jab α ≤ 1/2, yaani table me pehle se ≤ 5 keys hon. 5 keys ke baad (α = 5/11 < 1/2) chhathi key ka insert **guaranteed** hai. 6 keys ke baad (6/11 > 1/2) guarantee nahi — ho sakta hai mile, par pakka nahi.

</details>

## Ek page me

- $h(k) = k \bmod m$; load factor α = n/m (m/n nahi).
- Chaining: α > 1 chalta hai; delete = list se hatao; worst case Θ(n).
- Chaining average (uniform): unsuccessful ≈ α, successful ≈ 1 + α/2.
- Table se: successful = k-th key k comparisons, average over n keys; unsuccessful = chain lengths, average over m slots (khaali = 0).
- Linear probing: (h + i) mod m → primary clustering (runs badhte hain).
- Quadratic: (h + i²) mod m → secondary clustering; prime m + α ≤ 1/2 → khaali slot guaranteed.
- Har probe par mod m — wrap-around mat bhoolo.
- Open addressing: α ≤ 1; search match ya pehle **khaali** slot par rukta hai.
- Delete me tombstone; slot khaali karna aage ki searches tod deta hai.
- Unsuccessful (table se): har ghar se pehle khaali slot tak, usko gin kar; average over m.
- Uniform estimates: unsuccessful 1/(1 − α), successful (1/α) ln(1/(1 − α)).
- Hashing O(1) = expected, worst case nahi.

Revision ke liye **Short note** tab dekho.
