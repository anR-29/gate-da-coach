# ER to relations, keys and integrity

> **Time:** ~30 min · **Pehle aana chahiye:** table kya hota hai (rows aur columns), sets aur subsets ka basic idea · **Day:** 36

## Ye topic kyun?

Database banane se pehle hum duniya ko ek **ER diagram** (Entity–Relationship diagram) me draw karte hain: kaun si cheezein hain (Student, Course) aur unke beech kya rishta hai (Enrolls). Phir is diagram ko actual **tables** me badalna padta hai, aur decide karna padta hai ki kaun sa column har row ko pehchanega (**key**) aur kaun sa column doosri table ko point karega (**foreign key**). GATE DA me isse 1–2 mark ke MCQ/NAT aate hain: "minimum kitni tables lagengi?", "weak entity ki key kya hogi?", "kitne superkeys hain?", aur "ON DELETE CASCADE ke baad kitni rows bachi?".

## Picture se samjho

Socho ek college hai. Har **Student** ek cheez hai, har **Course** ek cheez hai. Ek student kai courses leta hai, aur ek course me kai students hote hain. Ye "kai–kai" wala rishta (many-to-many) kisi ek table ke ek column me fit nahi hota, isliye uske liye alag table banti hai.

<figure class="fig">
<svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg" font-size="14" fill="currentColor">
<defs><marker id="erk1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<text x="10" y="16" style="fill:var(--muted)">ER diagram</text>
<rect x="20" y="30" width="130" height="44" fill="none" stroke="currentColor"/>
<text x="85" y="57" text-anchor="middle">Student</text>
<polygon points="320,22 380,52 320,82 260,52" fill="none" style="stroke:var(--info)"/>
<text x="320" y="57" text-anchor="middle">Enrolls</text>
<rect x="490" y="30" width="130" height="44" fill="none" stroke="currentColor"/>
<text x="555" y="57" text-anchor="middle">Course</text>
<line x1="150" y1="52" x2="260" y2="52" stroke="currentColor"/>
<line x1="380" y1="52" x2="490" y2="52" stroke="currentColor"/>
<text x="205" y="44" text-anchor="middle">M</text>
<text x="435" y="44" text-anchor="middle">N</text>
<line x1="320" y1="82" x2="320" y2="106" stroke="currentColor"/>
<ellipse cx="320" cy="122" rx="42" ry="16" fill="none" stroke="currentColor"/>
<text x="320" y="127" text-anchor="middle">grade</text>
<line x1="10" y1="155" x2="630" y2="155" style="stroke:var(--muted)" stroke-dasharray="5 4"/>
<text x="10" y="178" style="fill:var(--muted)">Tables</text>
<rect x="20" y="195" width="160" height="62" fill="none" stroke="currentColor"/>
<text x="100" y="218" text-anchor="middle" font-weight="bold">Student</text>
<text x="100" y="244" text-anchor="middle">roll*, name</text>
<rect x="240" y="195" width="160" height="62" fill="none" style="stroke:var(--info)"/>
<text x="320" y="218" text-anchor="middle" font-weight="bold">Enrolls</text>
<text x="320" y="244" text-anchor="middle">roll*, cid*, grade</text>
<rect x="460" y="195" width="160" height="62" fill="none" stroke="currentColor"/>
<text x="540" y="218" text-anchor="middle" font-weight="bold">Course</text>
<text x="540" y="244" text-anchor="middle">cid*, title</text>
<line x1="240" y1="226" x2="184" y2="226" stroke="currentColor" marker-end="url(#erk1a)"/>
<line x1="400" y1="226" x2="456" y2="226" stroke="currentColor" marker-end="url(#erk1a)"/>
<text x="212" y="218" text-anchor="middle" font-size="12">FK</text>
<text x="428" y="218" text-anchor="middle" font-size="12">FK</text>
<text x="320" y="282" text-anchor="middle" font-size="12" style="fill:var(--muted)">* = key column. Enrolls ki key = roll + cid (dono sides ki keys)</text>
</svg>
<figcaption>M:N relationship Enrolls apni table banti hai; uske columns dono entities ki keys (foreign keys) hain.</figcaption>
</figure>

Dhyan do: rectangle = entity (cheez), diamond = relationship (rishta), ellipse = attribute (property). `grade` na student ki property hai na course ki; ye "is student ne is course me" wali baat hai, isliye Enrolls table me jaata hai. Teen boxes ke neeche teen tables bani: do entities ki, ek M:N relationship ki.

Ab ek doosri situation: ek **Room** tabhi pehchana ja sakta hai jab pata ho ki wo kis **Building** me hai. "Room 101" har building me ho sakta hai. Aisi entity jo apne owner ke bina pehchani nahi jaati, use **weak entity** kehte hain.

<figure class="fig">
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" font-size="14" fill="currentColor">
<rect x="20" y="30" width="130" height="44" fill="none" stroke="currentColor"/>
<text x="85" y="57" text-anchor="middle">Building</text>
<polygon points="280,18 345,52 280,86 215,52" fill="none" style="stroke:var(--info)"/>
<polygon points="280,27 331,52 280,77 229,52" fill="none" style="stroke:var(--info)"/>
<text x="280" y="57" text-anchor="middle">Has</text>
<rect x="410" y="30" width="130" height="44" fill="none" style="stroke:var(--mark)"/>
<rect x="416" y="36" width="118" height="32" fill="none" style="stroke:var(--mark)"/>
<text x="475" y="57" text-anchor="middle">Room</text>
<line x1="150" y1="52" x2="215" y2="52" stroke="currentColor"/>
<line x1="345" y1="50" x2="410" y2="50" stroke="currentColor"/>
<line x1="345" y1="55" x2="410" y2="55" stroke="currentColor"/>
<text x="182" y="44" text-anchor="middle">1</text>
<text x="378" y="42" text-anchor="middle">N</text>
<line x1="475" y1="74" x2="475" y2="104" stroke="currentColor"/>
<ellipse cx="475" cy="120" rx="50" ry="16" fill="none" stroke="currentColor"/>
<text x="475" y="125" text-anchor="middle">room_no</text>
<line x1="447" y1="130" x2="503" y2="130" stroke="currentColor" stroke-dasharray="3 3"/>
<text x="280" y="175" text-anchor="middle">Room table: (bid, room_no, area)   key = bid + room_no</text>
</svg>
<figcaption>Weak entity (double box) Room, identifying relationship (double diamond) Has. Partial key room_no ke neeche dashed line.</figcaption>
</figure>

Dhyan do: Room ki table me owner Building ki key `bid` aana zaroori hai. Sirf `room_no` key nahi ban sakta kyunki do buildings me "101" ho sakta hai. Aur `Has` ke liye alag table nahi banti; uska kaam `bid` column hi kar deta hai.

## Concept step-by-step

### 1. Strong entity aur uske attributes

Strong entity = aisi cheez jiski apni key hoti hai (Student ka `roll`). **Rule:** har strong entity ki ek table.

Attributes ke teen special types:
- **Composite attribute** (tukdon wala), jaise `addr(street, city)`: tukde alag columns ban jaate hain (`street`, `city`). Koi nayi table nahi.
- **Derived attribute** (jo nikala ja sakta hai), jaise `age` jo `dob` se nikalti hai: store hi nahi karte.
- **Multivalued attribute** (ek se zyada values), jaise ek student ke kai `phone`: iski **alag table** banti hai `Student_phone(roll, phone)`, key = (roll, phone).

**Kyun?** Relational model ka pehla rule (**1NF**, First Normal Form) kehta hai ki har cell me ek hi atomic (todi na ja sake) value ho. "98xxx, 97xxx" ek cell me rakhna 1NF todta hai. Isliye multivalued ko alag table me har phone ki alag row banti hai.

**Example:** Student(roll, name, addr(street, city), age derived, phone multivalued). Tables: `Student(roll, name, street, city)` aur `Student_phone(roll, phone)`. Kul 2.

Dhyan do: composite = columns (0 nayi table), multivalued = nayi table (1). Dono ko ulta mat karna.

### 2. Relationship ki cardinality aur participation

**Cardinality** batati hai ek side ki ek row doosri side ki kitni rows se jud sakti hai: 1:1, 1:N (one-to-many), M:N (many-to-many).

**Participation** batati hai ki kya har row ka judna zaroori hai. **Total** participation = har row ko kam se kam ek partner chahiye (ER me double line). **Partial** = kuch rows bina partner ke bhi reh sakti hain.

**Example:** "Har employee exactly ek department me kaam karta hai, ek department me kai employees." Ye Dept–Emp 1:N hai, aur Employee ki participation total hai.

Dhyan do: cardinality "kitne", participation "zaroori hai ya nahi". Dono alag sawal hain.

### 3. 1:N relationship — koi nayi table nahi

**Rule:** "one" side ki key ko "many" side ki table me **foreign key** (FK) column bana do.

**Kyun?** Many side (Employee) ki har row ka sirf **ek** partner (Department) hai, to ek column `did` kaafi hai. Agar ulta karte (Department me `eid` rakhte), to ek department ke kai employees ke liye ek cell me kai values chahiye hoti — 1NF toot jaata.

**Example:** `Emp(eid, name, did)` jahan `did` → `Dept(did)`. Agar Employee ki participation total hai to `did` ko `NOT NULL` declare kar sakte hain.

Dhyan do: FK hamesha **many** side me jaata hai. "One" side me rakhna galat hai.

### 4. 1:1 relationship — FK kisi bhi side, ya merge

**Rule:** FK kisi bhi ek side me daal do (behtar: jis side ki participation total hai, taaki NULLs na aayein). Agar **dono** sides total hain, to dono entities ko **ek hi table** me merge kar sakte hain.

**Kyun merge?** Dono total + 1:1 matlab har A ka exactly ek B aur har B ka exactly ek A. Rows perfectly jode me aati hain, koi akeli row nahi bachti, to ek hi row me dono ki info rakh do.

**Example:** Doctor–Cabin, 1:1, har doctor ke paas ek cabin aur har cabin kisi doctor ka: ek table `Doctor(did, name, cabin_no, floor)`.

Dhyan do: sirf ek side total ho to merge nahi; FK lagao. Merge tabhi jab **dono** total.

### 5. M:N aur n-ary relationship — apni table

**Rule:** M:N (ya teen entities wali **ternary**, ya n-ary) relationship ki apni table. Columns = har participating entity ki key (FK) + relationship ke apne attributes (descriptive attributes). **Key = participating keys ka union**; descriptive attribute key me nahi aata.

**Kyun?** Kisi bhi side me FK rakhoge to us side ki ek row ke kai partners honge — ek cell me kai values. Isliye alag table jisme har jode ki ek row ho.

**Example:** `Enrolls(roll, cid, grade)`, key = (roll, cid). Ternary Prescribes(Doctor, Patient, Drug) → `Prescribes(did, pid, code)`, key = (did, pid, code).

Dhyan do: `grade` jaisa attribute key me nahi jaata (jab ek jodi ek hi baar aati hai).

### 6. Weak entity — key = owner key + partial key

**Partial key** (discriminator) = weak entity ka wo attribute jo **ek owner ke andar** rows ko alag karta hai (room_no ek building ke andar unique).

**Rule:** weak entity ki apni table; key = owner ki key + partial key. Identifying relationship (double diamond) ki koi table nahi.

**Example:** `Room(bid, room_no, area)`, key = (bid, room_no). Agar Room aur Guest ke beech M:N `Booked` ho, to `Booked(bid, room_no, gid, date)` ki key = (bid, room_no, gid) — Room ki poori key (dono columns) + Guest ki key.

Dhyan do: weak entity ka partial key akela kabhi key nahi; hamesha owner key jodo.

### 7. Minimum tables ka formula

Upar ke saare rules jod do:

$$\text{min tables} = \#\text{strong} + \#\text{weak} + \#\text{multivalued attrs} + \#\text{M:N/n-ary rels}$$

1:N aur 1:1 relationships 0 tables dete hain (FK), aur 1:1 dono-total case me do entities ek ho jaati hain (count 1 kam).

| Construct | Tables added |
|---|---|
| Strong entity | 1 |
| Weak entity | 1 (key: owner + partial) |
| Multivalued attribute | 1 |
| M:N, ternary | 1 |
| 1:N, 1:1 | 0 (FK) |
| 1:1 total on both sides | do entities merge |

**Example:** 3 strong entities, 1 multivalued attribute, 1 M:N, 1 1:N → 3 + 1 + 1 + 0 = 5.

Dhyan do: composite aur derived attribute 0 tables dete hain.

### 8. Superkey, candidate key, primary key

- **Superkey:** columns ka koi bhi set jiski values se har row unique pehchani jaaye (yaani wo set baaki saare attributes ko determine karta hai).
- **Candidate key:** **minimal** superkey — usme se koi bhi column hatao to wo superkey nahi rehta.
- **Primary key (PK):** candidate keys me se jo ek hum chun lete hain.

Ek relation me kai candidate keys ho sakti hain (Student me `roll` aur `email` dono).

**Example:** Student(roll, name, email). Agar {roll} key hai, to {roll, name} bhi superkey hai, par candidate nahi (name hatao, phir bhi unique hai, yaani minimal nahi).

Dhyan do: har candidate key superkey hai, par har superkey candidate key nahi.

### 9. Superkeys ginna (counting)

Agar R me $n$ attributes hain aur ek hi key $K$ hai jisme $k$ attributes hain, to superkey = koi bhi set jo $K$ ko poora contain kare. $K$ ke $k$ columns to fixed hain; baaki $n-k$ columns me har ek ke liye 2 choice (lo ya mat lo):

$$\#\text{superkeys} = 2^{\,n-k}$$

Do keys $K_1, K_2$ hon to "$K_1$ contain kare **ya** $K_2$ contain kare". Dono ko jodne par jo sets dono ko contain karte hain wo do baar gine gaye, unhe ek baar ghatao (**inclusion–exclusion**). Jo set $K_1$ aur $K_2$ dono contain kare, wo $K_1 \cup K_2$ contain karta hai:

$$\#\text{superkeys} = 2^{\,n-|K_1|} + 2^{\,n-|K_2|} - 2^{\,n-|K_1 \cup K_2|}$$

<figure class="fig">
<svg viewBox="0 0 520 290" xmlns="http://www.w3.org/2000/svg" font-size="14" fill="currentColor">
<circle cx="200" cy="150" r="100" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="320" cy="150" r="100" fill="none" style="stroke:var(--mark)" stroke-width="2"/>
<text x="140" y="35" text-anchor="middle" style="fill:var(--info)">A contain kare: 2⁴ = 16</text>
<text x="390" y="35" text-anchor="middle" style="fill:var(--mark)">B,C contain kare: 2³ = 8</text>
<text x="145" y="150" text-anchor="middle" font-size="22">12</text>
<text x="145" y="172" text-anchor="middle" font-size="12">sirf A wale</text>
<text x="260" y="150" text-anchor="middle" font-size="22">4</text>
<text x="260" y="172" text-anchor="middle" font-size="12">A,B,C sab</text>
<text x="375" y="150" text-anchor="middle" font-size="22">4</text>
<text x="375" y="172" text-anchor="middle" font-size="12">sirf B,C wale</text>
<text x="260" y="280" text-anchor="middle">Total = 16 + 8 − 4 = 20</text>
</svg>
<figcaption>R(A, B, C, D, E), keys {A} aur {B, C}. Beech wale 4 sets dono circles me hain, isliye ek baar ghatate hain.</figcaption>
</figure>

**Example:** R(A, B, C, D, E), keys {A}, {B, C}: $2^4 + 2^3 - 2^{2} = 16 + 8 - 4 = 20$. ($K_1 \cup K_2 = \{A,B,C\}$, baaki 2 columns.)

Dhyan do: overlap ghatana bhoolne par 24 aata hai — sabse common galti.

### 10. Instance se key prove nahi hoti

Table ka ek **instance** = kisi ek waqt pe uski rows. Agar kisi column me duplicate dikh gaya (do rows me name = "Anu"), to wo column key **nahi** ho sakta — instance ne key ko **disprove** kar diya. Par agar duplicate nahi dikha, to bhi wo key hai ye **prove** nahi hota; kal nayi row aa sakti hai. Key ek rule hai (schema ka), data ka accident nahi.

Dhyan do: "is instance se kaun sa set key **nahi** ho sakta" — ye poocha ja sakta hai; "kaun sa key hai" sirf instance se nahi bata sakte.

### 11. Integrity constraints

- **Entity integrity:** PK ka koi bhi column NULL nahi ho sakta. Composite PK (A, B) me bhi A aur B dono NOT NULL, aur (A, B) ka combination unique.
- **Referential integrity:** har FK value ya to **NULL** ho, ya referenced table me exist kare. NULL FK ka matlab "abhi koi partner nahi" — ye violation nahi (jab tak column `NOT NULL` declare na ho).
- FK apni hi table ko bhi point kar sakta hai (**self-reference**), jaise `Emp.mgr → Emp.eid`.

**Kaun si operation violation kar sakti hai?** Socho: violation tab hota hai jab referencing side (Emp) ke paas aisi value aa jaaye jiska match nahi, ya referenced side (Dept) se aisi value chali jaaye jo use ho rahi hai.

| Operation | Violation ho sakta hai? |
|---|---|
| Emp me insert, did = non-existent | Haan |
| Emp me insert, did = NULL | Nahi |
| Emp se delete | Nahi |
| Dept me insert | Nahi (kabhi nahi) |
| Dept se delete (did use ho raha) | Haan (RESTRICT) |
| Dept ki did update | Haan |

Ye maine SQLite me `PRAGMA foreign_keys=ON` ke saath check kiya: Dept se used row delete karne par aur Emp me `'D9'` daalne par "FOREIGN KEY constraint failed" aaya; baaki teen chal gaye.

### 12. Referential actions: CASCADE aur SET NULL

Referenced row delete hone par kya ho, ye FK ke saath likhte hain:
- **RESTRICT / NO ACTION** (default): delete hi reject.
- **ON DELETE CASCADE:** referencing rows bhi delete.
- **ON DELETE SET NULL:** referencing column NULL ho jaata hai.

Cascade ek **chain** hai: ek delete se doosri table ki rows delete hoti hain, aur un deletes se teesri table ke actions fire hote hain. Isliye row-by-row trace karo.

Dhyan do: cascade se delete hui row ke apne FKs bhi trigger hote hain; ek level pe ruk mat jao.

## Solved examples

**Example 1 (MCQ, easy):** ER diagram me strong entities Author (key `aid`, multivalued `email`), Book (key `isbn`, derived attribute `age`), Publisher (key `pid`, composite `addr(city, pin)`). Author–Book many-to-many (Writes). Publisher–Book one-to-many (ek publisher, kai books), partial participation. 1NF me minimum tables?
(A) 4 (B) 5 (C) 6 (D) 7

**Soch:** "minimum tables" → table count wala formula.

**Solution:**
1. Strong entities: Author, Book, Publisher → 3.
2. Multivalued `email` → `Author_email(aid, email)` → +1.
3. Writes M:N → `Writes(aid, isbn)` → +1.
4. Publishes 1:N → `pid` FK Book me → +0. Composite `addr` → columns; derived `age` → store nahi.
5. Total = 3 + 1 + 1 = **5**. Answer (B).

**Galti kahan hoti hai:** 1:N ko bhi table de di to 6; composite `addr` ko bhi table di to 7. Multivalued `email` ko column maan liya to 4.

**Example 2 (MCQ, medium):** Course (key `cid`) weak entity Section ka owner hai; Section ka partial key (sec_no, year) hai. Instructor ki key `iid`. Teaches, Section aur Instructor ke beech M:N hai, attribute `hours` ke saath (ek instructor ek section ko ek hi baar padhata hai). Teaches table ki primary key?
(A) {sec_no, year, iid} (B) {cid, sec_no, year, iid, hours} (C) {cid, sec_no, year, iid} (D) {cid, iid}

**Soch:** weak entity + M:N → pehle Section ki poori key banao, phir union.

**Solution:**
1. Section ki key = owner key + partial key = (cid, sec_no, year).
2. Teaches M:N → key = Section ki key ∪ Instructor ki key = (cid, sec_no, year, iid).
3. `hours` descriptive hai, key me nahi. Answer **(C)**.

**Galti kahan hoti hai:** (A) me owner key `cid` bhool gaye — "Sec 1, 2025" har course me ho sakta hai. (B) me `hours` ko key me daal diya.

**Example 3 (MSQ, medium):** `Emp(eid, did)` me `did` FK hai jo `Dept(did)` ko refer karta hai, koi referential action nahi (default). Dept me 'D1' hai, Emp me ('e1', 'D1') aur ('e2', NULL). Kaun si operations referential integrity tod sakti hain (alag-alag try karo)?
(A) `DELETE FROM Dept WHERE did='D1'`
(B) `INSERT INTO Emp VALUES ('e3','D9')` (D9 Dept me nahi)
(C) `INSERT INTO Emp VALUES ('e4', NULL)`
(D) `INSERT INTO Dept VALUES ('D5')`

**Soch:** violation = referencing side ko unmatched value mile, ya referenced side se used value chali jaaye.

**Solution:**
1. (A) D1 ko e1 use kar raha hai; delete karne se e1 ka FK dangling ho jaayega → violation.
2. (B) D9 exist nahi karta → violation.
3. (C) NULL FK allowed hai → theek.
4. (D) Referenced table me insert kabhi violate nahi karta → theek.
5. Answer **(A), (B)**. (SQLite me check kiya: A aur B par "FOREIGN KEY constraint failed".)

**Galti kahan hoti hai:** NULL FK ko violation samajh kar (C) tick kar dena. NULL ka matlab "match ki zaroorat nahi".

**Example 4 (NAT, medium):** R(A, B, C, D, E) ki exactly do candidate keys hain: {A, B} aur {B, C}. Superkeys kitne hain?

**Soch:** do keys → inclusion–exclusion.

**Solution:**
1. {A, B} contain karne wale: baaki 3 columns free → $2^3 = 8$.
2. {B, C} contain karne wale: $2^3 = 8$.
3. Dono contain karne wale = {A, B, C} contain karne wale: baaki 2 free → $2^2 = 4$.
4. Total = 8 + 8 − 4 = **12**. (Python se saare 32 subsets check kiye: 12.)

**Galti kahan hoti hai:** 8 + 8 = 16 likh dena (overlap nahi ghataya). Ya overlap ko $2^{5-4}$ maan lena — union {A, B, C} me sirf 3 attributes hain (B common hai), 4 nahi.

**Example 5 (NAT, hard):** Tables:

```sql
CREATE TABLE Dept(did TEXT PRIMARY KEY);
CREATE TABLE Emp(eid TEXT PRIMARY KEY,
  did TEXT REFERENCES Dept(did) ON DELETE CASCADE,
  mgr TEXT REFERENCES Emp(eid) ON DELETE SET NULL);
CREATE TABLE Proj(pid TEXT PRIMARY KEY,
  eid TEXT REFERENCES Emp(eid) ON DELETE CASCADE);
```

**Dept**

| did |
|---|
| D1 |
| D2 |

**Emp**

| eid | did | mgr |
|---|---|---|
| e1 | D1 | NULL |
| e2 | D1 | e1 |
| e3 | D2 | e1 |
| e4 | D2 | e3 |
| e5 | D2 | e2 |

**Proj**

| pid | eid |
|---|---|
| p1 | e1 |
| p2 | e2 |
| p3 | e3 |
| p4 | e5 |
| p5 | e2 |

`DELETE FROM Dept WHERE did = 'D1';` ke baad Emp ki kitni rows me `mgr` NULL hai?

**Soch:** cascade chain → table by table trace karo.

**Solution:**
1. D1 delete → Emp me `did = D1` wale e1, e2 CASCADE se delete.
2. e1 delete → jinka mgr = e1 (e2, e3) unka mgr NULL. e2 to delete ho hi raha hai; e3 ka mgr NULL.
3. e2 delete → e5 ka mgr = e2 tha → NULL.
4. e1, e2 delete → Proj me p1, p2, p5 CASCADE se delete.
5. Bachi Emp:

| eid | did | mgr |
|---|---|---|
| e3 | D2 | NULL |
| e4 | D2 | e3 |
| e5 | D2 | NULL |

6. mgr NULL wali rows = **2** (e3, e5). (SQLite me run karke same result mila; Proj me sirf p3, p4 bache.)

**Galti kahan hoti hai:** sirf e1 ka effect dekh kar 1 (e3) bolna, yaani e2 ke cascade delete se e5 ka SET NULL bhool jaana. Ya e1 ko gin lena (uska mgr NULL tha) — par e1 khud delete ho chuka hai, to 3 galat hai.

**Example 6 (MCQ, hard):** Entities: Doctor (`did`), Cabin (`cno`), Patient (`pid`, multivalued `phone`), Drug (`code`). Doctor–Cabin 1:1, **dono** sides total participation. Prescribes ek ternary relationship hai Doctor, Patient, Drug ke beech, attribute `dose` ke saath. Minimum tables?
(A) 4 (B) 5 (C) 6 (D) 7

**Soch:** 1:1 dono total → merge; ternary → apni table.

**Solution:**
1. Doctor + Cabin merge → 1 table.
2. Patient → 1; Patient_phone → 1; Drug → 1.
3. Prescribes(did, pid, code, dose) → 1, key (did, pid, code).
4. Total = 1 + 1 + 1 + 1 + 1 = **5**. Answer (B).

**Galti kahan hoti hai:** merge bhool kar Doctor aur Cabin alag gin liye → 6. Ya ternary ko teen binary relationships samajh kar 3 tables → 7 ya zyada.

## Confusions clear karo

**Q:** 1:N me FK "one" side pe kyun nahi rakh sakte?
**A:** One side (Dept) ki ek row ke kai partners (employees) hain. Unke saare `eid` ek cell me rakhne padenge, jo 1NF todta hai. Many side ki har row ka ek hi partner hota hai, to wahan ek column kaafi hai.

**Q:** Weak entity aur multivalued attribute dono me alag table banti hai, phir farak kya?
**A:** Weak entity ke apne kai attributes ho sakte hain aur wo doosre relationships me bhi hissa le sakti hai (Room booked by Guest). Multivalued attribute sirf ek value ki list hai (phones). Key dono me "owner key + kuch" hoti hai.

**Q:** NULL foreign key violation kyun nahi hai?
**A:** Referential integrity kehti hai "agar value hai to match honi chahiye". NULL ka matlab value hai hi nahi (abhi koi department assign nahi). Agar business rule ye na chahe, to column ko `NOT NULL` declare karo.

**Q:** Candidate key aur primary key me farak?
**A:** Candidate keys kai ho sakti hain (sab minimal superkeys). Unme se ek ko hum PK choose karte hain. Baaki ko "alternate keys" kehte hain; unpe bhi UNIQUE lagta hai.

**Q:** Kya superkey me extra column hone se wo galat ho jaata hai?
**A:** Nahi. Superkey me extra column chal jaate hain (uniqueness bani rehti hai). Bas wo minimal nahi, isliye candidate key nahi.

**Q:** Kya FK hamesha doosri table ki PK ko hi point karta hai?
**A:** FK kisi candidate key (PK ya UNIQUE column) ko point karta hai, aur wo apni hi table ho sakti hai: `Emp.mgr → Emp.eid`.

**Q:** Dept table me nayi row insert karne se kabhi problem ho sakti hai?
**A:** Referential integrity ke hisaab se kabhi nahi — nayi did kisi ko break nahi karti. (Haan, agar did duplicate ho to PK/entity integrity tootegi, par wo alag constraint hai.)

## Khud try karo

**1.** R(A, B, C, D) ki candidate keys {A} aur {B} hain. Superkeys kitne?

<details><summary>Answer dekho</summary>

{A} wale: $2^3 = 8$. {B} wale: $2^3 = 8$. {A, B} dono wale: $2^2 = 4$. Total = 8 + 8 − 4 = **12**.

</details>

**2.** R(A, B, C, D, E, F) ki keys {A, B} aur {C, D}. Superkeys kitne?

<details><summary>Answer dekho</summary>

$2^{6-2} + 2^{6-2} - 2^{6-4} = 16 + 16 - 4 = $ **28**. (Union {A, B, C, D} me 4 attributes.)

</details>

**3.** Ek ER diagram: strong entities Hospital (`hid`), Doctor (`did`, multivalued `degree`). Ward ek weak entity hai jiska owner Hospital (partial key `wno`). Doctor–Hospital 1:N (ek hospital, kai doctors). Doctor–Ward M:N (Visits). Minimum tables?

<details><summary>Answer dekho</summary>

Hospital 1, Doctor 1 (FK `hid`), Doctor_degree 1, Ward 1 (key hid + wno), Visits 1 (key did, hid, wno). 1:N ke liye 0. Total = **5**.

</details>

**4.** Instance:

| id | name | city |
|---|---|---|
| 1 | Asha | Pune |
| 2 | Ravi | Pune |
| 3 | Asha | Delhi |

Kaun se sets candidate key **nahi** ho sakte: {name}, {city}, {name, city}, {id}?

<details><summary>Answer dekho</summary>

{name} (Asha do baar) aur {city} (Pune do baar) ruled out. {name, city} aur {id} me duplicate nahi hai, par isse ye **prove** nahi hota ki wo keys hain — sirf itna ki ye instance unhe disprove nahi karta.

</details>

## Ek page me

- Strong entity → 1 table. Composite → columns. Derived → store nahi. Multivalued → alag table (owner key, value).
- 1:N → FK many side me, koi table nahi. Total participation → FK `NOT NULL`.
- 1:1 → FK kisi bhi side; dono sides total → dono entities ek table.
- M:N / ternary → apni table, key = participating keys ka union; descriptive attribute key me nahi.
- Weak entity → apni table, key = owner key + partial key; identifying relationship ki table nahi.
- Min tables = strong + weak + multivalued + M:N/n-ary (1:1 dono-total merge se 1 kam).
- Superkey ⊇ key; candidate = minimal superkey; PK = chuni hui candidate key.
- Ek key (size $k$, $n$ attributes): $2^{n-k}$ superkeys. Do keys: inclusion–exclusion with $K_1 \cup K_2$.
- Instance key ko disprove kar sakta hai, prove kabhi nahi.
- PK: unique + NOT NULL. FK: NULL ya matching value. Self-reference allowed.
- Violation sirf: referencing side me unmatched insert/update, ya referenced side se used value ka delete/update.
- CASCADE / SET NULL chain me fire hote hain — row-by-row trace karo.

Revision ke liye **Short note** tab dekho.
