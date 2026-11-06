# SQL: joins, subqueries, grouping and NULL

> **Time:** ~40 min · **Pehle aana chahiye:** tables, keys (Day 36) aur relational algebra ke σ, π, join (Day 37) · **Day:** 38

## Ye topic kyun?

SQL wo language hai jisse asli databases se data nikaala jaata hai. GATE DA me SQL ke sawal almost hamesha ek hi pattern ke hote hain: chhoti tables di hoti hain aur poocha jaata hai "ye query kitni rows / kya value return karegi?" (NAT ya MCQ, 1–2 marks). Trick hamesha chhoti cheezon me hoti hai: NULL, LEFT JOIN ki WHERE condition, `NOT IN`, `ALL/ANY`, aur `COUNT(*)` vs `COUNT(col)`. Is lesson ke baad tum har query ko row-by-row "haath se chala" paoge.

## Picture se samjho

SQL query likhi upar se neeche jaati hai (`SELECT … FROM … WHERE …`), lekin database use ek **alag order** me chalata hai. Ye order samajh liya to aadhe sawal apne aap solve ho jaate hain.

<figure class="fig">
<svg viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" font-size="13" fill="currentColor">
<defs><marker id="sqla" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<rect x="12" y="30" width="76" height="40" rx="6" fill="none" style="stroke:var(--info)"/>
<text x="50" y="55" text-anchor="middle">FROM</text>
<rect x="102" y="30" width="76" height="40" rx="6" fill="none" style="stroke:var(--info)"/>
<text x="140" y="55" text-anchor="middle">WHERE</text>
<rect x="192" y="30" width="76" height="40" rx="6" fill="none" style="stroke:var(--mark)"/>
<text x="230" y="55" text-anchor="middle">GROUP BY</text>
<rect x="282" y="30" width="76" height="40" rx="6" fill="none" style="stroke:var(--mark)"/>
<text x="320" y="55" text-anchor="middle">HAVING</text>
<rect x="372" y="30" width="76" height="40" rx="6" fill="none" style="stroke:var(--good)"/>
<text x="410" y="55" text-anchor="middle">SELECT</text>
<rect x="462" y="30" width="76" height="40" rx="6" fill="none" style="stroke:var(--good)"/>
<text x="500" y="55" text-anchor="middle">DISTINCT</text>
<rect x="552" y="30" width="76" height="40" rx="6" fill="none" style="stroke:var(--good)"/>
<text x="590" y="55" text-anchor="middle">ORDER BY</text>
<line x1="88" y1="50" x2="100" y2="50" stroke="currentColor" marker-end="url(#sqla)"/>
<line x1="178" y1="50" x2="190" y2="50" stroke="currentColor" marker-end="url(#sqla)"/>
<line x1="268" y1="50" x2="280" y2="50" stroke="currentColor" marker-end="url(#sqla)"/>
<line x1="358" y1="50" x2="370" y2="50" stroke="currentColor" marker-end="url(#sqla)"/>
<line x1="448" y1="50" x2="460" y2="50" stroke="currentColor" marker-end="url(#sqla)"/>
<line x1="538" y1="50" x2="550" y2="50" stroke="currentColor" marker-end="url(#sqla)"/>
<text x="50" y="95" text-anchor="middle" font-size="11">tables + join</text>
<text x="140" y="95" text-anchor="middle" font-size="11">rows filter</text>
<text x="230" y="95" text-anchor="middle" font-size="11">groups banao</text>
<text x="320" y="95" text-anchor="middle" font-size="11">groups filter</text>
<text x="410" y="95" text-anchor="middle" font-size="11">columns nikalo</text>
<text x="500" y="95" text-anchor="middle" font-size="11">duplicates hatao</text>
<text x="590" y="95" text-anchor="middle" font-size="11">sort</text>
<text x="320" y="125" text-anchor="middle" style="fill:var(--muted)">WHERE ek-ek row dekhta hai; HAVING poore group ko</text>
</svg>
<figcaption>SQL ka logical execution order. WHERE groups banne se pehle chalta hai, isliye WHERE me SUM/COUNT nahi likh sakte; wo HAVING me jaata hai.</figcaption>
</figure>

Dhyan do: WHERE ke baad jo rows bachi, sirf unhi ke groups bante hain. Agar WHERE ne kisi group ki saari rows hata di, to wo group result me aayega hi nahi.

Doosri picture: **NULL** ka matlab "value pata nahi". Agar salary pata nahi, to "salary > 55?" ka jawab na haan hai na naa — **UNKNOWN** hai. SQL isliye teen values wali logic use karta hai: TRUE, FALSE, UNKNOWN.

<figure class="fig">
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" font-size="15" fill="currentColor">
<rect x="60" y="40" width="176" height="176" fill="none" stroke="currentColor"/>
<line x1="104" y1="40" x2="104" y2="216" stroke="currentColor"/>
<line x1="148" y1="40" x2="148" y2="216" stroke="currentColor"/>
<line x1="192" y1="40" x2="192" y2="216" stroke="currentColor"/>
<line x1="60" y1="84" x2="236" y2="84" stroke="currentColor"/>
<line x1="60" y1="128" x2="236" y2="128" stroke="currentColor"/>
<line x1="60" y1="172" x2="236" y2="172" stroke="currentColor"/>
<text x="82" y="67" text-anchor="middle" font-size="12" font-weight="bold">AND</text>
<text x="126" y="67" text-anchor="middle">T</text><text x="170" y="67" text-anchor="middle">U</text><text x="214" y="67" text-anchor="middle">F</text>
<text x="82" y="111" text-anchor="middle">T</text><text x="82" y="155" text-anchor="middle">U</text><text x="82" y="199" text-anchor="middle">F</text>
<text x="126" y="111" text-anchor="middle" style="fill:var(--good)">T</text><text x="170" y="111" text-anchor="middle" style="fill:var(--muted)">U</text><text x="214" y="111" text-anchor="middle" style="fill:var(--bad)">F</text>
<text x="126" y="155" text-anchor="middle" style="fill:var(--muted)">U</text><text x="170" y="155" text-anchor="middle" style="fill:var(--muted)">U</text><text x="214" y="155" text-anchor="middle" style="fill:var(--bad)">F</text>
<text x="126" y="199" text-anchor="middle" style="fill:var(--bad)">F</text><text x="170" y="199" text-anchor="middle" style="fill:var(--bad)">F</text><text x="214" y="199" text-anchor="middle" style="fill:var(--bad)">F</text>
<rect x="360" y="40" width="176" height="176" fill="none" stroke="currentColor"/>
<line x1="404" y1="40" x2="404" y2="216" stroke="currentColor"/>
<line x1="448" y1="40" x2="448" y2="216" stroke="currentColor"/>
<line x1="492" y1="40" x2="492" y2="216" stroke="currentColor"/>
<line x1="360" y1="84" x2="536" y2="84" stroke="currentColor"/>
<line x1="360" y1="128" x2="536" y2="128" stroke="currentColor"/>
<line x1="360" y1="172" x2="536" y2="172" stroke="currentColor"/>
<text x="382" y="67" text-anchor="middle" font-size="12" font-weight="bold">OR</text>
<text x="426" y="67" text-anchor="middle">T</text><text x="470" y="67" text-anchor="middle">U</text><text x="514" y="67" text-anchor="middle">F</text>
<text x="382" y="111" text-anchor="middle">T</text><text x="382" y="155" text-anchor="middle">U</text><text x="382" y="199" text-anchor="middle">F</text>
<text x="426" y="111" text-anchor="middle" style="fill:var(--good)">T</text><text x="470" y="111" text-anchor="middle" style="fill:var(--good)">T</text><text x="514" y="111" text-anchor="middle" style="fill:var(--good)">T</text>
<text x="426" y="155" text-anchor="middle" style="fill:var(--good)">T</text><text x="470" y="155" text-anchor="middle" style="fill:var(--muted)">U</text><text x="514" y="155" text-anchor="middle" style="fill:var(--muted)">U</text>
<text x="426" y="199" text-anchor="middle" style="fill:var(--good)">T</text><text x="470" y="199" text-anchor="middle" style="fill:var(--muted)">U</text><text x="514" y="199" text-anchor="middle" style="fill:var(--bad)">F</text>
<text x="300" y="234" text-anchor="middle" font-size="13" style="fill:var(--muted)">NOT U = U.  WHERE/HAVING sirf T wali rows rakhte hain.</text>
</svg>
<figcaption>Three-valued logic. AND me F jeet-ta hai, OR me T jeet-ta hai; baaki jagah U ho to result U.</figcaption>
</figure>

Dhyan do: U ko "shayad" samjho. "F AND shayad" = pakka F. "T OR shayad" = pakka T. "T AND shayad" = shayad. Aur WHERE "shayad" wali rows ko **phenk** deta hai.

## Concept step-by-step

Poore lesson me ye do tables use karenge (SQLite 3.53 me sab queries chala ke check ki gayi hain):

**Emp**

| eid | name | did | salary | bonus |
|---|---|---|---|---|
| 1 | Asha | 10 | 60 | 5 |
| 2 | Ravi | 20 | 45 | NULL |
| 3 | Meena | 10 | 80 | 10 |
| 4 | Kabir | NULL | 50 | 0 |
| 5 | Nisha | 40 | NULL | 8 |
| 6 | Arjun | 20 | 70 | NULL |

**Dept**

| did | dname |
|---|---|
| 10 | CS |
| 20 | EE |
| 30 | ME |

### 1. SQL tables bags hain

Algebra me relation set hota hai; SQL me **bag (multiset)** — duplicate rows reh sakti hain. `SELECT did FROM Emp` 6 rows deta hai (20 do baar, 10 do baar). Duplicates hatane ke liye `SELECT DISTINCT did FROM Emp` → 10, 20, NULL, 40 = **4** rows.

Dhyan do: `DISTINCT` saare NULLs ko ek maan kar ek NULL row rakhta hai. Lekin `COUNT(DISTINCT did)` NULL ko ginta hi nahi → **3**.

### 2. INNER, LEFT, FULL join

`JOIN … ON cond` (inner) = sirf wo jode jinke liye `cond` **TRUE** hai. Count = har common value ke liye (left me count) × (right me count).

**Example:** did 10: Emp me 2, Dept me 1 → 2. did 20: 2 × 1 → 2. Inner = **4**.

`LEFT JOIN` = inner + left ki har unmatched row, right ke columns NULL ke saath.

```sql
SELECT e.name, e.did, d.dname
FROM Emp e LEFT JOIN Dept d ON e.did = d.did;
```

| name | e.did | dname |
|---|---|---|
| Asha | 10 | CS |
| Ravi | 20 | EE |
| Meena | 10 | CS |
| Kabir | NULL | NULL |
| Nisha | 40 | NULL |
| Arjun | 20 | EE |

6 rows = 4 matches + 2 unmatched (Kabir, Nisha). `FULL OUTER JOIN` me ME (30) bhi aata hai: **7**.

**Kabir match kyun nahi hua?** `NULL = 10` UNKNOWN hai, aur `NULL = NULL` bhi UNKNOWN. Join sirf TRUE pe judta hai. Isliye do NULL values kabhi join nahi hoti.

Dhyan do: LEFT join ke rows = matches + unmatched left rows. Left ki koi row kabhi gayab nahi hoti (jab tak WHERE na hataye).

### 3. ON vs WHERE in an outer join

Outer join me `ON` decide karta hai **kaun match hai**; unmatched left rows phir bhi aati hain. `WHERE` join ke **baad** chalta hai aur rows phenk sakta hai.

```sql
-- P
SELECT COUNT(*) FROM Emp e LEFT JOIN Dept d
  ON e.did = d.did AND d.dname = 'EE';
-- Q
SELECT COUNT(*) FROM Emp e LEFT JOIN Dept d
  ON e.did = d.did
WHERE d.dname = 'EE';
```

P = **6** (sirf Ravi, Arjun ko partner mila; baaki 4 NULL padding ke saath reh gaye). Q = **2** (join ke 6 rows me se sirf dname = 'EE' wali; NULL-padded rows ka `NULL = 'EE'` UNKNOWN → phenk di).

Dhyan do: right table pe WHERE filter LEFT JOIN ko practically inner join bana deta hai.

### 4. NATURAL JOIN

`NATURAL JOIN` **har** same-naam column pe equality lagata hai. Agar Emp(eid, name, did, …) aur kisi table D2(did, name) dono me `name` ho (ek me person ka naam, doosre me dept ka), to condition banegi `did = did AND name = name` → koi row match nahi → **0**.

Dhyan do: natural join se pehle dono tables ke saare column names compare karo.

### 5. Subqueries: IN, EXISTS, scalar

- `x IN (subquery)`: x list me hai? Ye **membership test** hai, duplicate list values se kuch nahi badalta.
- `EXISTS (subquery)`: subquery ne kam se kam ek row di? TRUE/FALSE (kabhi UNKNOWN nahi).
- **Scalar subquery**: ek hi value lautata hai, jaise `(SELECT MAX(salary) …)`.
- **Correlated subquery**: andar ki query bahar ki row ko use karti hai (`WHERE did = e.did`), to har bahari row ke liye dobara chalti hai.

**IN vs JOIN:** `SELECT COUNT(*) FROM Dept WHERE did IN (SELECT did FROM Emp)` → CS, EE → **2**. Lekin `SELECT COUNT(*) FROM Dept d JOIN Emp e ON e.did = d.did` → **4**, kyunki har dept apne har employee ke saath ek baar aata hai.

Dhyan do: IN outer rows ko duplicate nahi karta; join karta hai.

### 6. ALL aur ANY

- `x > ALL (S)`: x, S ki **har** value se bada → $x > \max(S)$.
- `x > ANY (S)` (ya `SOME`): x kam se kam ek value se bada → $x > \min(S)$.

**Example:** EE salaries S = {45, 70}.
- `salary > ALL (S)` ⇔ salary > 70 → sirf Meena (80) → **1**.
- `salary > ANY (S)` ⇔ salary > 45 → Asha 60, Meena 80, Kabir 50, Arjun 70 → **4**. Ravi (45) barabar hai, bada nahi. Nisha NULL → UNKNOWN.

**Kyun?** Sabse bade se bada ho to sab se bada hai; sabse chhote se bada ho to kam se kam ek se bada hai.

Dhyan do: `<` vs `≤` boundary (45 > 45 false). Aur `ALL` ko max, `ANY` ko min se jodo — ulta nahi.

### 7. NOT IN aur NULL — sabse bada trap

`x NOT IN (a, b, NULL)` ka matlab hai `x <> a AND x <> b AND x <> NULL`. Aakhri part hamesha UNKNOWN hai, to poora AND kabhi TRUE nahi ho sakta (best case UNKNOWN).

```sql
SELECT dname FROM Dept WHERE did NOT IN (SELECT did FROM Emp);
```

Emp.did me NULL (Kabir) hai → result **khaali** (0 rows), jabki ME ka koi employee nahi!

```sql
SELECT dname FROM Dept d
WHERE NOT EXISTS (SELECT * FROM Emp e WHERE e.did = d.did);
```

Ye **ME** deta hai. NOT EXISTS sirf poochta hai "koi matching row hai?"; NULL wali rows bas match nahi hoti, poori query kharab nahi karti. Isliye NOT EXISTS **NULL-safe** hai.

Dhyan do: NOT IN ki list me ek bhi NULL → result empty. (Fix: subquery me `WHERE did IS NOT NULL`.)

### 8. Aggregates aur NULL

| Function | Kya ginta hai |
|---|---|
| `COUNT(*)` | saari rows (NULL ho ya na ho) |
| `COUNT(col)` | sirf non-NULL values |
| `COUNT(DISTINCT col)` | alag non-NULL values |
| `SUM`, `AVG`, `MAX`, `MIN` | NULL ko ignore karke |

$$\text{AVG(col)} = \frac{\text{SUM(col)}}{\text{COUNT(col)}} \quad (\text{COUNT(*) nahi})$$

**Example:** `COUNT(*)` = 6, `COUNT(salary)` = 5, `COUNT(bonus)` = 4. `AVG(salary)` = (60 + 45 + 80 + 50 + 70)/5 = 305/5 = **61**. `AVG(bonus)` = (5 + 10 + 0 + 8)/4 = 23/4 = **5.75** (6 se divide karte to 3.83, galat).

Isliye hamesha: `COUNT(*) ≥ COUNT(col) ≥ COUNT(DISTINCT col)`.

**Khaali input pe:** GROUP BY ke bina aggregate query hamesha **exactly ek row** deti hai. `SELECT COUNT(*), SUM(salary), MAX(salary) FROM Emp WHERE did = 30` → (0, NULL, NULL). COUNT 0, baaki NULL.

Dhyan do: bonus = 0 (Kabir) NULL nahi hai; wo ginta bhi hai aur average me bhi aata hai.

### 9. GROUP BY aur HAVING

GROUP BY same value wali rows ka ek group banata hai; **saare NULL keys ek hi group** me jaate hain.

```sql
SELECT did, COUNT(*), SUM(salary) FROM Emp GROUP BY did;
```

| did | COUNT(*) | SUM(salary) |
|---|---|---|
| NULL | 1 | 50 |
| 10 | 2 | 140 |
| 20 | 2 | 115 |
| 40 | 1 | NULL |

4 groups. Did 40 ka SUM NULL kyunki uski ek hi salary NULL hai.

HAVING groups ko filter karta hai (WHERE ke baad):

```sql
SELECT did, SUM(salary) FROM Emp
WHERE salary >= 50
GROUP BY did
HAVING COUNT(*) >= 2;
```

1. WHERE: Asha (10, 60), Meena (10, 80), Kabir (NULL, 50), Arjun (20, 70). Ravi (45) aur Nisha (NULL) bahar.
2. Groups: 10 → 2 rows, NULL → 1, 20 → 1.
3. HAVING: sirf did 10 → result **(10, 140)**.

Dhyan do: HAVING WHERE se pehle nahi chalta. Group 20 me originally 2 rows thi, par WHERE ke baad 1 bachi.

### 10. Three-valued logic, boundaries

- `NULL = NULL` → UNKNOWN. NULL check ke liye `IS NULL` / `IS NOT NULL` (ye two-valued: TRUE/FALSE).
- TRUE OR UNKNOWN = TRUE; FALSE AND UNKNOWN = FALSE; NOT UNKNOWN = UNKNOWN.
- `x BETWEEN a AND b` = `x >= a AND x <= b` (dono ends **inclusive**).

**Example:** `WHERE salary > 55 OR salary <= 55` lagta hai sab rows dega, par Nisha (NULL) ke liye U OR U = U → bahar. Result **5**, 6 nahi.

**Example:** `WHERE salary BETWEEN 50 AND 70` → 60, 50, 70 → **3** (50 aur 70 dono included).

Dhyan do: NOT lagane se pehle U ko F mat banao. NOT U = U, aur wo row phir bhi nahi aati.

## Solved examples

Saare examples upar wali **Emp** aur **Dept** tables pe hain.

**Example 1 (MCQ, easy):** `SELECT COUNT(*), COUNT(bonus), COUNT(DISTINCT did) FROM Emp;` kya return karega?
(A) 6, 6, 4 (B) 6, 4, 3 (C) 6, 4, 4 (D) 4, 4, 3

**Soch:** COUNT ke teen roop → NULL kahan hai dekho.

**Solution:**
1. `COUNT(*)` = 6 rows.
2. bonus: 5, NULL, 10, 0, 8, NULL → non-NULL = 4 (0 bhi ginta hai).
3. did distinct non-NULL: 10, 20, 40 → 3.
4. Answer **(B) 6, 4, 3**.

**Galti kahan hoti hai:** (C) — `COUNT(DISTINCT did)` me NULL ko bhi ek value gin liya (DISTINCT SELECT ki tarah). COUNT kabhi NULL nahi ginta.

**Example 2 (NAT, medium):**

```sql
SELECT COUNT(*)
FROM Emp e LEFT JOIN Dept d ON e.did = d.did
WHERE d.dname <> 'EE';
```

**Soch:** LEFT JOIN + right table pe WHERE filter → NULL-padded rows ka kya hoga?

**Solution:**
1. LEFT JOIN ke 6 rows (upar wali table): dname = CS, EE, CS, NULL, NULL, EE.
2. `CS <> 'EE'` TRUE (2 rows). `EE <> 'EE'` FALSE (2 rows).
3. `NULL <> 'EE'` UNKNOWN (Kabir, Nisha) → WHERE phenk deta hai.
4. Answer = **2**.

**Galti kahan hoti hai:** 4 bolna — socha ki Kabir aur Nisha "EE me nahi hain" isliye aayenge. Par unka dname NULL hai, aur NULL ki comparison UNKNOWN deti hai.

**Example 3 (MCQ, medium):**

```sql
-- P
SELECT COUNT(*) FROM Emp
WHERE salary > ALL (SELECT salary FROM Emp WHERE did = 20);
-- Q
SELECT COUNT(*) FROM Emp
WHERE salary > ANY (SELECT salary FROM Emp WHERE did = 20);
```

P aur Q kya return karenge?
(A) 1 aur 4 (B) 2 aur 5 (C) 1 aur 5 (D) 4 aur 1

**Soch:** ALL → max, ANY → min.

**Solution:**
1. did 20 ki salaries: {45, 70}. Max 70, min 45.
2. P: salary > 70 → Meena → 1.
3. Q: salary > 45 → 60, 80, 50, 70 → 4. (45 khud nahi; NULL nahi.)
4. Answer **(A)**.

**Galti kahan hoti hai:** (C) — Q me Ravi (45) ko bhi gin liya, ya Nisha ke NULL ko. Strict `>` me barabar value nahi aati. (SQLite me ALL/ANY nahi hai, isliye maine MAX/MIN wale rewrite se check kiya.)

**Example 4 (NAT, medium–hard):**

```sql
SELECT COUNT(*) FROM Emp e
WHERE e.salary = (SELECT MAX(salary) FROM Emp WHERE did = e.did);
```

**Soch:** correlated scalar subquery → har bahari row ke liye apne dept ka max.

**Solution:**
1. Asha (10): max of dept 10 = 80; 60 ≠ 80 ✗.
2. Ravi (20): max 70; ✗. Meena (10): 80 = 80 ✓. Arjun (20): 70 = 70 ✓.
3. Kabir (did NULL): subquery `WHERE did = NULL` koi row nahi deta → MAX = NULL → `50 = NULL` UNKNOWN ✗.
4. Nisha (40): dept 40 me sirf uski NULL salary → MAX NULL; aur uski salary bhi NULL → UNKNOWN ✗.
5. Answer = **2**.

**Galti kahan hoti hai:** 3 ya 4 bolna — Kabir ko "apne NULL dept ka akela banda, to max wahi" maan lena. Correlated subquery me `did = e.did` NULL ke liye kabhi TRUE nahi hota, isliye uska group bana hi nahi (GROUP BY se ulta!).

**Example 5 (MSQ, hard):** Kaun si queries exactly {ME} return karti hain?

```sql
-- Q1
SELECT dname FROM Dept WHERE did NOT IN (SELECT did FROM Emp);
-- Q2
SELECT dname FROM Dept d
WHERE NOT EXISTS (SELECT * FROM Emp e WHERE e.did = d.did);
-- Q3
SELECT dname FROM Dept
WHERE did NOT IN (SELECT did FROM Emp WHERE did IS NOT NULL);
-- Q4
SELECT d.dname FROM Dept d LEFT JOIN Emp e ON e.did = d.did
WHERE e.eid IS NULL;
```

**Soch:** subquery ki list me NULL hai (Kabir) → NOT IN alarm.

**Solution:**
1. Q1: list = {10, 20, 10, NULL, 40, 20}. Kisi bhi did ke liye `did <> NULL` UNKNOWN → koi row TRUE nahi → **empty** ✗.
2. Q2: CS aur EE ke employees hain; ME ka koi nahi → {ME} ✓.
3. Q3: NULL hata diya, list = {10, 20, 40} → 30 NOT IN → {ME} ✓.
4. Q4: Dept LEFT JOIN Emp me ME ka partner nahi, to uski row me e.eid NULL → {ME} ✓.
5. Answer **Q2, Q3, Q4**.

**Galti kahan hoti hai:** Q1 tick karna — "30 list me nahi hai, to NOT IN TRUE" sochna. Ek NULL poore NOT IN ko UNKNOWN bana deta hai.

**Example 6 (NAT, hard):**

```sql
SELECT COUNT(*) FROM (
  SELECT did FROM Emp
  WHERE salary > 40
  GROUP BY did
  HAVING COUNT(bonus) >= 1
) g;
```

**Soch:** order: WHERE → GROUP BY (NULL group bhi) → HAVING with COUNT(col).

**Solution:**
1. WHERE salary > 40: Asha, Ravi, Meena, Kabir, Arjun. Nisha (salary NULL) bahar.
2. Groups aur COUNT(bonus):

| did | rows | COUNT(bonus) |
|---|---|---|
| 10 | Asha, Meena | 2 |
| 20 | Ravi, Arjun | 0 |
| NULL | Kabir | 1 |

3. HAVING ≥ 1 → did 10 aur NULL group.
4. Outer COUNT = **2**.

**Galti kahan hoti hai:** 3 bolna (COUNT(bonus) ki jagah COUNT(*) socha, to 20 bhi pass). Ya 1 bolna (NULL did ka group bhool gaye; GROUP BY NULLs ka ek group banata hai, aur Kabir ka bonus 0 non-NULL hai). Ya Nisha ko did 40 ka group de dena — WHERE pehle hi use hata chuka hai.

## Confusions clear karo

**Q:** LEFT JOIN me NULL kyun aata hai?
**A:** Left table ki jis row ka right me koi partner nahi, use rakhna hai par right ke columns ke liye koi value nahi — to SQL wahan NULL bhar deta hai.

**Q:** `WHERE col = NULL` kaam kyun nahi karta?
**A:** NULL se koi bhi comparison UNKNOWN hai, aur WHERE sirf TRUE rakhta hai. Sahi likho `WHERE col IS NULL`.

**Q:** NOT IN aur NOT EXISTS hamesha same kyun nahi?
**A:** Jab subquery me NULL ho tab NOT IN UNKNOWN deta hai (empty result), NOT EXISTS nahi. Bina NULL ke dono same answer dete hain.

**Q:** WHERE aur HAVING me farak?
**A:** WHERE har row pe, grouping se pehle; aggregate (SUM, COUNT) use nahi kar sakta. HAVING har group pe, grouping ke baad; aggregates use karta hai.

**Q:** `> ALL` empty subquery pe kya deta hai?
**A:** TRUE (har element of empty set wali condition vacuously true). `> ANY` empty pe FALSE. Aur agar ALL ki list me NULL ho to result kabhi TRUE nahi hota (FALSE ya UNKNOWN).

**Q:** DISTINCT aur GROUP BY NULL ke saath kaise behave karte hain?
**A:** Dono saare NULLs ko ek saath rakhte hain: DISTINCT ek NULL row, GROUP BY ek NULL group. Ye comparison (`=`) se alag rule hai.

**Q:** Aggregate query ne 0 rows match ki, phir bhi ek row kyun aayi?
**A:** GROUP BY ke bina poori table ek group hai, chahe khaali ho. Us group ka COUNT 0 aur SUM/AVG/MAX NULL. GROUP BY ke saath khaali input pe 0 rows aati hain.

## Khud try karo

**1.** `SELECT COUNT(*) FROM Emp WHERE NOT (salary > 55 AND bonus > 4);`

<details><summary>Answer dekho</summary>

| eid | salary > 55 | bonus > 4 | AND | NOT |
|---|---|---|---|---|
| 1 | T | T | T | F |
| 2 | F | U | F | **T** |
| 3 | T | T | T | F |
| 4 | F | F | F | **T** |
| 5 | U | T | U | U |
| 6 | T | U | U | U |

Answer **2** (eid 2, 4).

</details>

**2.** `SELECT AVG(bonus), SUM(bonus) * 1.0 / COUNT(*) FROM Emp;` dono values?

<details><summary>Answer dekho</summary>

SUM(bonus) = 23. AVG = 23/4 = **5.75**. Doosri = 23/6 ≈ **3.83**. Dono alag kyunki AVG sirf non-NULL (4) se divide karta hai.

</details>

**3.** `SELECT COUNT(*), SUM(salary) FROM Emp WHERE did = 30;`

<details><summary>Answer dekho</summary>

Koi row nahi bachti, par GROUP BY nahi hai to ek row aati hai: **(0, NULL)**.

</details>

**4.** `SELECT COUNT(*) FROM Emp WHERE salary BETWEEN 45 AND 60;`

<details><summary>Answer dekho</summary>

45 (Ravi), 60 (Asha), 50 (Kabir) → **3**. Ends inclusive; Nisha NULL bahar.

</details>

**5.** `SELECT COUNT(*) FROM Dept WHERE did IN (SELECT did FROM Emp WHERE salary >= 50);` aur same cheez JOIN se `SELECT COUNT(*) FROM Dept d JOIN Emp e ON e.did = d.did WHERE e.salary >= 50;`

<details><summary>Answer dekho</summary>

Subquery: Asha (10), Meena (10), Kabir (NULL), Arjun (20) → dids {10, NULL, 20}. IN: CS, EE → **2**. JOIN: (CS, Asha), (CS, Meena), (EE, Arjun) → **3**. Join ne CS ko do baar gina.

</details>

## Ek page me

- Order: FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY.
- SQL = bags; duplicates rehte hain jab tak DISTINCT na ho.
- Inner = Σ matches; LEFT = matches + unmatched left; FULL = + unmatched right bhi.
- NULL kabhi join me match nahi hota (NULL = NULL is UNKNOWN).
- Outer join: condition ON me → rows bachti hain; right table ki condition WHERE me → NULL rows mar jaati hain.
- NATURAL JOIN saare same-naam columns pe.
- `> ALL` = > max, `> ANY` = > min; boundary pe strict/non-strict dekho.
- `NOT IN` + list me NULL → empty. `NOT EXISTS` NULL-safe.
- IN outer rows duplicate nahi karta; JOIN karta hai.
- COUNT(*) sab rows; COUNT(col), SUM, AVG, MAX NULL skip; AVG = SUM/COUNT(col). Khaali pe: COUNT 0, baaki NULL, ek row.
- GROUP BY / DISTINCT: saare NULL ek group/ek row; COUNT(DISTINCT) NULL nahi ginta.
- 3VL: T OR U = T, F AND U = F, NOT U = U; WHERE/HAVING sirf TRUE. BETWEEN inclusive.

Revision ke liye **Short note** tab dekho.
