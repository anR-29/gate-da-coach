# Analytical and logical reasoning

> **Time:** ~35 min · **Pehle aana chahiye:** kuch nahi (Venn diagram aur coordinate (x, y) ka basic idea madad karega) · **Day:** GA rotation me (har din ke page pe us din ka GA topic likha hota hai)

## Ye topic kyun?

GATE GA me reasoning ke 2–3 questions lagbhag pakke hain: ek "if / unless" wala logic statement, ek syllogism (All / Some / No), ek seating ya ranking puzzle, ek series, kabhi data sufficiency ya direction. Zyada tar 1-mark, kuch 2-mark. Yahan English ya maths kam, **sochne ka tareeka** zyada test hota hai. Har type ke liye ek mechanical method hai — diagram banao, rewrite karo, check karo. Ye lesson wahi methods sikhata hai.

## Picture se samjho

**Syllogism** ka matlab: kuch statements diye hain ("All A are B"), aur poocha hai kaunsa conclusion **zaroor** sach hai. Har statement ko circles (Venn diagram) se draw karo. Conclusion tabhi follow karta hai jab woh **har possible drawing** me sach ho.

<figure class="fig">
<svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" font-size="13">
<text x="130" y="18" text-anchor="middle" fill="currentColor">Drawing 1</text>
<circle cx="120" cy="110" r="75" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="100" cy="110" r="35" fill="none" style="stroke:var(--mark)" stroke-width="2"/>
<circle cx="160" cy="110" r="45" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<text x="85" y="114" text-anchor="middle" fill="currentColor">A</text>
<text x="180" y="114" text-anchor="middle" fill="currentColor">C</text>
<text x="120" y="50" text-anchor="middle" fill="currentColor">B</text>
<text x="130" y="200" text-anchor="middle" style="fill:var(--good)">A aur C milte hain</text>
<text x="390" y="18" text-anchor="middle" fill="currentColor">Drawing 2</text>
<circle cx="380" cy="110" r="75" fill="none" style="stroke:var(--info)" stroke-width="2"/>
<circle cx="345" cy="110" r="30" fill="none" style="stroke:var(--mark)" stroke-width="2"/>
<circle cx="450" cy="110" r="40" fill="none" style="stroke:var(--good)" stroke-width="2"/>
<text x="345" y="114" text-anchor="middle" fill="currentColor">A</text>
<text x="465" y="114" text-anchor="middle" fill="currentColor">C</text>
<text x="380" y="50" text-anchor="middle" fill="currentColor">B</text>
<text x="390" y="200" text-anchor="middle" style="fill:var(--bad)">A aur C bilkul alag</text>
</svg>
<figcaption>"All A are B" aur "Some B are C" — dono drawings in statements ko maanti hain. Par "Some A are C" sirf Drawing 1 me sach hai, isliye woh follow NAHI karta.</figcaption>
</figure>

Dono drawings me A poora B ke andar hai (All A are B ✔), aur C ka kuch hissa B me hai (Some B are C ✔). Drawing 2 me C, B ke us hisse se milta hai jahan A nahi hai. Ek bhi drawing jahan conclusion fail ho = conclusion follow nahi karta. "Ho sakta hai" ≠ "zaroor hai".

**Seating** puzzle me sabse pehle seats ko number do. Facing north ho toh tumhara left = page ka left.

<figure class="fig">
<svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" font-size="14">
<text x="260" y="20" text-anchor="middle" style="fill:var(--muted)">↑ sab NORTH ki taraf dekh rahe hain</text>
<rect x="60" y="40" width="70" height="50" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<rect x="140" y="40" width="70" height="50" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<rect x="220" y="40" width="70" height="50" style="fill:none;stroke:var(--mark)" stroke-width="2"/>
<rect x="300" y="40" width="70" height="50" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<rect x="380" y="40" width="70" height="50" style="fill:none;stroke:var(--info)" stroke-width="2"/>
<text x="95" y="72" text-anchor="middle" fill="currentColor">L</text>
<text x="175" y="72" text-anchor="middle" fill="currentColor">M</text>
<text x="255" y="72" text-anchor="middle" fill="currentColor">N</text>
<text x="335" y="72" text-anchor="middle" fill="currentColor">K</text>
<text x="415" y="72" text-anchor="middle" fill="currentColor">J</text>
<text x="95" y="110" text-anchor="middle" style="fill:var(--muted)">1</text>
<text x="175" y="110" text-anchor="middle" style="fill:var(--muted)">2</text>
<text x="255" y="110" text-anchor="middle" style="fill:var(--muted)">3</text>
<text x="335" y="110" text-anchor="middle" style="fill:var(--muted)">4</text>
<text x="415" y="110" text-anchor="middle" style="fill:var(--muted)">5</text>
<text x="40" y="140" fill="currentColor">← Left end</text>
<text x="480" y="140" text-anchor="end" fill="currentColor">Right end →</text>
</svg>
<figcaption>Seats 1 se 5, left se right. Pehle pakki clues (end, middle) bharo, phir relative clues (immediately right of, not next to).</figcaption>
</figure>

Puzzle: "L left end par. N middle me. K, N ke immediately right. J, L ke paas nahi." → L = 1, N = 3, K = 4. Bache seats 2 aur 5 J, M ke liye. J seat 2 par hota toh L ke paas — mana hai. Toh J = 5, M = 2. Final: **L M N K J**. Agar log **south** ki taraf dekh rahe hote, toh unka "right" page ka left hota — wahan sab clues ulte padhne padte.

**Directions** ko (x, y) coordinates me track karo: east = +x, north = +y.

<figure class="fig">
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" font-size="13">
<circle cx="120" cy="100" r="4" fill="currentColor"/>
<text x="110" y="115" text-anchor="end" fill="currentColor">Start (0,0)</text>
<line x1="120" y1="100" x2="120" y2="16" style="stroke:var(--info)" stroke-width="2"/>
<polygon points="115,26 125,26 120,16" style="fill:var(--info)"/>
<text x="112" y="60" text-anchor="end" style="fill:var(--info)">7 N</text>
<line x1="120" y1="16" x2="192" y2="16" style="stroke:var(--info)" stroke-width="2"/>
<polygon points="182,11 182,21 192,16" style="fill:var(--info)"/>
<text x="156" y="12" text-anchor="middle" style="fill:var(--info)">6 E</text>
<line x1="192" y1="16" x2="192" y2="196" style="stroke:var(--info)" stroke-width="2"/>
<polygon points="187,186 197,186 192,196" style="fill:var(--info)"/>
<text x="200" y="110" style="fill:var(--info)">15 S</text>
<circle cx="192" cy="196" r="4" fill="currentColor"/>
<text x="200" y="208" fill="currentColor">End (6, −8)</text>
<line x1="120" y1="100" x2="192" y2="196" style="stroke:var(--mark)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="140" y="170" text-anchor="end" style="fill:var(--mark)">10 km</text>
<text x="420" y="40" text-anchor="middle" fill="currentColor">N</text>
<text x="420" y="160" text-anchor="middle" fill="currentColor">S</text>
<text x="355" y="104" text-anchor="middle" fill="currentColor">W</text>
<text x="485" y="104" text-anchor="middle" fill="currentColor">E</text>
<line x1="420" y1="50" x2="420" y2="145" stroke="currentColor"/>
<line x1="365" y1="100" x2="475" y2="100" stroke="currentColor"/>
</svg>
<figcaption>7 km north, right mud kar 6 km, phir right mud kar 15 km. End point (6, −8): start se 10 km, south-east me.</figcaption>
</figure>

Total chala 7 + 6 + 15 = 28 km, par start se doori sirf 10 km hai ($\sqrt{6^2 + 8^2}$). Displacement ke liye path lengths **jodte nahi**, net (x, y) nikalte hain.

## Concept step-by-step

### 1. If–then aur uska contrapositive

**Idea:** "If P then Q" ($P \to Q$) ek vaada hai: jab bhi P hoga, Q hoga. Is vaade se kya-kya nikalta hai?

**Rule:**
| Form | Statement | Follow karta hai? |
|---|---|---|
| Original | $P \to Q$ | given |
| Contrapositive | $\neg Q \to \neg P$ | **haan, hamesha** |
| Converse | $Q \to P$ | nahi |
| Inverse | $\neg P \to \neg Q$ | nahi |

($\neg$ = "not".)

**Kyun contrapositive sahi:** Maan lo Q nahi hua. Agar P hota, toh vaade ke hisaab se Q hota — contradiction. Toh P bhi nahi hua.
**Kyun converse galat:** "If it rains, the ground is wet." Ground geela hai — par sprinkler se bhi ho sakta hai. Q hone se P sabit nahi hota.

**Example:** "If a student scores above 90, she gets a medal." Medal nahi mila → score 90 se upar nahi tha ✔ (contrapositive). Medal mila → score 90+ tha? Zaroori nahi (converse) ✘.

**Dhyan do:** Inverse aur converse aapas me equivalent hain — dono ek saath galat hote hain.

### 2. "Unless" aur "only if" ko if–then me badlo

**Idea:** "unless" = "if not". Isse rewrite karo, phir step 1 lagao.

**Rule:**
- "A unless B" → $\neg B \to A$.
- "Not A unless B" → $\neg B \to \neg A$, jiska contrapositive $A \to B$.
- "A only if B" → $A \to B$ (B zaroori hai A ke liye).

**Example 1:** "The match will be played unless it rains." → $\neg\text{rain} \to \text{played}$. Match **nahi** hua → contrapositive: baarish hui ✔.
**Example 2:** "The server will not restart unless the admin approves." → $\text{restart} \to \text{approved}$. Server restart hua → admin ne approve kiya tha ✔. Admin ne approve kiya → restart hoga? **Nahi** (converse).

**Dhyan do:** Approval yahan **necessary** condition hai, sufficient nahi. "Approve hua toh restart hoga" sabse common trap hai.

### 3. Syllogisms: Venn diagram

**Idea:** Har category ek circle hai.
- **All A are B:** A ka circle poora B ke andar.
- **No A is B:** A aur B alag, overlap nahi.
- **Some A are B:** kam se kam thoda overlap (A poora B me ho sakta hai, ho bhi na).
- **Some A are not B:** A ka kuch hissa B ke bahar.

**Method:** (1) Har statement ka circle banao. (2) Conclusion ko todne ki koshish karo — ek aisi drawing banao jo statements maane par conclusion ko galat kare. (3) Ban gayi → "does not follow". Nahi ban saki → "follows".

**Example:** "All analysts are graduates. Some graduates are managers." I: Some analysts are managers — upar Drawing 2 jaisa case me fail ✘. II: Some managers are graduates — "Some graduates are managers" ko ulta padha, same baat ✔. Answer: **only II**.

**Dhyan do:** "Ho sakta hai" (possible) ko "zaroor" (certain) mat samjho. GATE "must follow" poochta hai.

### 4. Conversions aur ek pakka combination

**Rule:**
- "Some A are B" ⇔ "Some B are A" (overlap dono taraf se same).
- "No A is B" ⇔ "No B is A".
- "All A are B" ⇏ "All B are A" (sab doctors graduates hain, sab graduates doctors nahi). Haan, "Some B are A" nikalta hai (agar A khaali nahi).
- **No A is B + Some C are A ⇒ Some C are not B.** Kyun: jo C, A me hain, woh B me nahi ho sakte (A aur B alag hain). Toh woh C "not B" hain.

**Example:** "No sensor is cheap. Some devices are sensors." → Some devices are not cheap ✔. "No device is cheap" ✘ — baaki devices (jo sensor nahi) cheap ho sakte hain.

**Dhyan do:** "Some" ko "all" ya "no" me upgrade mat karo. Sirf overlap wale hisse ke baare me pata hai.

### 5. Ranking / ordering

**Idea:** Har comparison ko ek line par arrow ki tarah lagao, sabse bada upar.

**Method:** Har clue ko ">" me likho, phir ek chain banao.

**Example:** "A is taller than B. C is shorter than B. D is taller than A." → A > B, B > C, D > A → **D > A > B > C**. Second tallest = A.

**Rank formula:** Agar koi upar se $r_1$-th aur neeche se $r_2$-th hai, toh total $= r_1 + r_2 - 1$ (woh khud dono ginti me aata hai, isliye ek baar ghatao).

**Dhyan do:** "Shorter than" ko ulta karke likho (C < B matlab B > C). Jaldi me direction ulti ho jaati hai.

### 6. Seating arrangement

**Idea:** Pehle **absolute** clues (end, middle, "third from right"), phir **relative** clues (immediately left of, not adjacent), phir "not" clues se options kaato.

**Rule:**
- Linear row, $n$ seats: "k-th from right" = seat $n - k + 1$ from left.
- Facing north: left = page left. Facing south: left = page **right** (ulta).
- Circular table, sab centre ki taraf: clockwise ek fixed direction lo aur ek person ko fix karke baaki rakho.

**Example:** 6 seats, "T third from the right" → seat $6 - 3 + 1 = 4$.

**Dhyan do:** Answer dene se pehle seats 1…n left se number kar lo; "second from right" ko left se ginna common galti hai.

### 7. Number aur letter series

**Idea:** Pattern dhoondhne ki ek fixed list:
1. Differences (aur differences ke differences).
2. Ratios (×2, ×3, ya ×2 + 1).
3. Alternate terms (do series mili hui).
4. Squares/cubes ± kuch: $n^2 + 1$, $n^3 - 1$.
5. Factorials: 1, 2, 6, 24, 120 → agla $6! = 720$.

**Letters:** A = 1, B = 2, …, Z = 26. 26 se upar gaya toh 26 ghatao (wrap).

**Example:** D, H, L, P, ? → 4, 8, 12, 16 → +4 → 20 = **T**.
Wrap: X, A, D, G, ? → 24, 1(=27−26), 4, 7 → +3 → 10 = **J**.

**Dhyan do:** Agar differences badh rahe hain (3, 4, 5, 6), toh agla difference 7 hai — pichhla gap repeat mat karo.

### 8. Data sufficiency

**Idea:** Answer nikalna zaroori nahi; sirf batana hai ki diye gaye statements se **ek unique** answer nikal sakta hai ya nahi.

**Method:** (1) Statement I akela. (2) Statement II akela. (3) Dono saath. Har step me sab possible values list karo; agar do alag answers bachte hain → sufficient nahi.

**Example:** Integer $x$ kya hai? I: $x^2 = 16$ → $x = 4$ ya $-4$ (do values) ✘. II: $x > 0$ → bahut values ✘. Saath: $x = 4$ ✔. Answer: **both together, neither alone**.

**Dhyan do:** Negative root bhoolna. $x^2 = 16$ ke do answer hain.

### 9. Directions

**Idea:** Turns ko yaad rakhna mushkil hai; coordinates aasaan hain.

**Rule:** North = +y, East = +x. Right turn: N → E → S → W → N (clockwise). Left turn ulta. Doori $= \sqrt{x^2 + y^2}$. Direction = x aur y ke signs se (x > 0, y < 0 → south-east).

**Example:** Upar wali figure: (0,7) → (6,7) → (6,−8). Doori $\sqrt{36 + 64} = 10$ km, south-east.

**Dhyan do:** 28 km (sab jodna) displacement nahi hai.

## Solved examples

**Example 1 (MCQ, 1 mark, easy):** Rule: *The library will not issue a book unless the reader shows an ID card.* Which statement must be true?
(A) If a reader shows an ID card, a book is issued.
(B) If a book was issued, the reader showed an ID card.
(C) If no ID card is shown, a book may still be issued.
(D) If a book was not issued, no ID card was shown.

**Soch:** "Not A unless B" → $A \to B$.

**Solution:**
1. A = book issued, B = ID shown. Rule: issued → ID shown.
2. (B) yahi hai ✔.
3. (A) converse (ID → issued) ✘. (D) inverse ✘. (C) rule ke ulta ✘.
4. Answer: **(B)**.

**Galti kahan hoti hai:** (A) — ID ko sufficient maan lena. ID zaroori hai, par ho sakta hai book available hi na ho.

**Example 2 (MCQ, 1 mark, easy):** Statements: All coders are thinkers. No thinker is lazy.
Conclusions: I. No coder is lazy. II. Some lazy people are coders.
(A) Only I follows (B) Only II follows (C) Both follow (D) Neither follows

**Soch:** All + No → Venn.

**Solution:**
1. Coders circle, thinkers circle ke andar.
2. Lazy circle, thinkers se bilkul alag → coders se bhi alag.
3. I: No coder is lazy ✔ (har drawing me).
4. II: Some lazy are coders — lazy aur coders me overlap ho hi nahi sakta ✘.
5. Answer: **(A)**.

**Galti kahan hoti hai:** "Neither" chunna kyunki I direct statement nahi hai — par woh do statements se zaroor nikalta hai.

**Example 3 (MSQ, 2 marks, medium):** Six friends P, Q, R, S, T, U sit in a row facing north. R is at the left end. T is third from the right. P sits immediately to the right of R. U is not adjacent to T. Q sits somewhere to the right of S. Which statements are correct? (Select all that apply.)
(A) S sits between P and T.
(B) Q is second from the right.
(C) U is immediately to the right of T.
(D) P is third from the left.

**Soch:** Seating → seats 1–6, absolute clues pehle.

**Solution:**
1. R = 1 (left end). P = 2 (immediately right of R).
2. T third from right → $6 - 3 + 1 = 4$.
3. Khali seats: 3, 5, 6 for Q, S, U.
4. U, T (4) ke paas nahi → U ≠ 3, U ≠ 5 → U = 6.
5. Q, S ke right me → S = 3, Q = 5.
6. Arrangement: **R P S T Q U**.
7. (A) S = 3, P = 2, T = 4 ✔. (B) Q = 5 = second from right ✔. (C) Seat 5 par Q hai ✘. (D) P = 2 ✘.
8. Answer: **(A) and (B)**.

**Galti kahan hoti hai:** T ko seat 3 rakhna ("third" ko left se ginna). Tab poora arrangement badal jaata hai.

**Example 4 (NAT, 1 mark, medium):** Find the next term: 3, 10, 29, 66, 127, ?

**Soch:** Differences 7, 19, 37, 61 — badh rahe hain, cubes ke paas lagte hain.

**Solution:**
1. Cubes: 1, 8, 27, 64, 125. Har term = cube + 2.
2. Agla: $6^3 + 2 = 216 + 2 = $ **218**.
3. Check with differences: 7, 19, 37, 61, next 91 (second differences 12, 18, 24, 30). $127 + 91 = 218$ ✔.

**Galti kahan hoti hai:** Last difference 61 repeat karna → 188. Ya second difference 24 repeat karna → $127 + 85 = 212$.

**Example 5 (MCQ, 2 marks, hard):** What is the value of $x$?
I. $x^2 - 5x + 6 = 0$  II. $x$ is a prime number.
(A) I alone is sufficient (B) II alone is sufficient (C) Both together are sufficient, neither alone (D) Not sufficient even together

**Soch:** Data sufficiency → har step me possible values list karo.

**Solution:**
1. I: $(x - 2)(x - 3) = 0$ → $x = 2$ ya $3$ ✘.
2. II: infinite primes ✘.
3. Saath: 2 aur 3 **dono** prime hain → abhi bhi do values ✘.
4. Answer: **(D)**.

**Galti kahan hoti hai:** (C) — lagta hai "prime" ek root hata dega. Har root check karo; dono prime hain.

**Example 6 (NAT, 2 marks, hard):** A woman walks 6 km east, turns left and walks 10 km, turns left again and walks 12 km, then turns left and walks 2 km. How far (in km) is she from the starting point?

**Soch:** Directions → coordinates.

**Solution:**
1. Start (0, 0). 6 km east → (6, 0).
2. Left from east = north. 10 km → (6, 10).
3. Left from north = west. 12 km → (−6, 10).
4. Left from west = south. 2 km → (−6, 8).
5. Doori $= \sqrt{36 + 64} = $ **10**. (Direction: north-west.)

**Galti kahan hoti hai:** Left turn ko right samajhna (east ke baad south) → bilkul alag point. Ya 6 + 10 + 12 + 2 = 30 jodna.

## Confusions clear karo

**Q:** "Only if" aur "if" me farak?
**A:** "A if B" = $B \to A$. "A only if B" = $A \to B$. "only if" ke baad wali cheez **zaroori** condition hai.

**Q:** Syllogism me "possibility" wale conclusions ("Some A may be C")?
**A:** "May / can be" conclusions tab follow karte hain jab koi drawing aisi ho jisme woh sach ho aur statements use **mana na karein**. GATE me usually "must follow" hi poocha jaata hai — wording dekho.

**Q:** "All A are B" se "Some A are B" nikalta hai?
**A:** Haan (maan kar ki A khaali nahi hai). Aur usse "Some B are A" bhi.

**Q:** Circular seating me left/right kaise?
**A:** Agar sab centre ki taraf dekh rahe hain, toh kisi ka right = anticlockwise direction (upar se dekhne par). Ek baar ek person ko fix karke uske hisaab se banao, phir saare clues usi convention se.

**Q:** Data sufficiency me answer bhi nikalna padega?
**A:** Nahi. Sirf itna dekho ki value unique hai ya nahi. Isse time bachta hai.

**Q:** Letter series me Z ke baad?
**A:** Wrap: Z = 26, agla A = 27 − 26 = 1. Ulta jaate hue A se pehle Z (0 → 26).

## Khud try karo

**1.** *Unless the fee is paid, the result will be withheld.* The result was not withheld. What follows?

<details><summary>Answer dekho</summary>

Rewrite: $\neg\text{paid} \to \text{withheld}$. Contrapositive: $\neg\text{withheld} \to \text{paid}$. Result withheld nahi hua → **fee paid thi**.

</details>

**2.** Find the next letter: C, F, J, O, U, ?

<details><summary>Answer dekho</summary>

Positions 3, 6, 10, 15, 21. Gaps 3, 4, 5, 6 → next 7. $21 + 7 = 28 → 28 - 26 = 2$ = **B**.

</details>

**3.** Is $x > y$? I. $x - y = 3$. II. $x^2 > y^2$.

<details><summary>Answer dekho</summary>

I: $x - y = 3 > 0$ → $x > y$ ✔ **I alone sufficient**. II: $x = -5, y = 1$ → $x^2 > y^2$ par $x < y$; $x = 5, y = 1$ → $x > y$. Do answers → II alone ✘.

</details>

**4.** In a queue, Meena is 7th from the front and 18th from the back. How many people are in the queue?

<details><summary>Answer dekho</summary>

Meena ke aage 6 log, peeche 17 log, aur khud Meena. Total $= 6 + 17 + 1 = 24$. Formula: front rank + back rank − 1 $= 7 + 18 - 1 = $ **24**. (25 likhna = Meena ko do baar ginna.)

</details>

## Ek page me

- $P \to Q$ ≡ sirf contrapositive $\neg Q \to \neg P$; converse aur inverse follow nahi karte.
- "A unless B" = $\neg B \to A$; "Not A unless B" = $A \to B$; "A only if B" = $A \to B$.
- Necessary condition ≠ sufficient condition.
- Syllogism: Venn banao; conclusion tabhi follow jab **har** drawing me sach ho.
- Some A are B ⇔ Some B are A; No A is B ⇔ No B is A; All A are B ⇏ All B are A.
- No A is B + Some C are A ⇒ Some C are not B.
- Ranking: sab clues ">" me likh kar ek chain banao.
- Seating: seats 1…n left se; absolute clues pehle; k-th from right = $n - k + 1$; facing south → left/right ulte.
- Series: differences, ratios, alternate terms, $n^2 / n^3 \pm c$, factorials; letters A = 1 … Z = 26, wrap −26.
- Data sufficiency: I alone, II alone, together; do values bachi = not sufficient; negative roots mat bhoolo.
- Directions: (x, y) track karo; doori $= \sqrt{x^2 + y^2}$, path lengths mat jodo.

Revision ke liye **Short note** tab dekho.
